'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Theme = 'dark' | 'light';

/** Coordinates of the click that triggered the toggle, for the wave origin */
export type ToggleCoords = { x: number; y: number };

interface ThemeContextValue {
  theme: Theme;
  /** Call with mouse event coords to launch the wave from the click point */
  toggleTheme: (coords?: ToggleCoords) => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
  isLight: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Read saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('sunad-theme') as Theme | null;
    const preferred =
      saved ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  const toggleTheme = useCallback(
    (coords?: ToggleCoords) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';

      // ── Pin the wave origin on <html> as CSS custom props ──────────────
      const x = coords?.x ?? window.innerWidth / 2;
      const y = coords?.y ?? window.innerHeight / 2;
      // Radius large enough to cover every corner of the viewport from (x, y)
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const root = document.documentElement;
      root.style.setProperty('--theme-clip-x', `${x}px`);
      root.style.setProperty('--theme-clip-y', `${y}px`);
      root.style.setProperty('--theme-clip-radius', `${Math.ceil(radius)}px`);

      // ── Apply theme ────────────────────────────────────────────────────
      const applyTheme = () => {
        root.setAttribute('data-theme', next);
        localStorage.setItem('sunad-theme', next);
        setTheme(next);
      };

      // Use View Transitions API when available (Chrome 111+, Edge 111+, Safari 18+)
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(applyTheme);
      } else {
        // Graceful fallback — instant swap, CSS transitions on body handle smoothness
        applyTheme();
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === 'dark', isLight: theme === 'light' }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

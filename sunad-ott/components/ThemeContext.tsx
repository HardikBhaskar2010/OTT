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
  const [theme] = useState<Theme>('dark');

  // Force dark theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  const toggleTheme = useCallback(
    (_coords?: ToggleCoords) => {
      // Do nothing permanently
    },
    []
  );

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: true, isLight: false }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}


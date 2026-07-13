'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
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
    const preferred = saved ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sunad-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', isLight: theme === 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

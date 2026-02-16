'use client';

import React, { createContext, useEffect, useCallback } from 'react';
import { Theme, DEFAULT_THEME, STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isThemeChanging: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, DEFAULT_THEME);
  const [isThemeChanging, setIsThemeChanging] = React.useState(false);

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const setIsLoading = useCallback((loading: boolean) => {
    setIsThemeChanging(loading);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isThemeChanging, setIsLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

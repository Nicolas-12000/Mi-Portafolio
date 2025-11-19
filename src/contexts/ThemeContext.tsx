'use client';

import React, { createContext, useEffect } from 'react';
import { Theme, DEFAULT_THEME, STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isThemeChanging: boolean;
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
    
    // Agregar clase para Tailwind (opcional)
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    // Activar pantalla de loading
    setIsThemeChanging(true);
    
    // Pequeño delay para que se vea la animación de loading
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      
      // Esperar a que el tema se aplique y los componentes se rendericen
      setTimeout(() => {
        setIsThemeChanging(false);
      }, 1500);
    }, 100);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isThemeChanging }}>
      {children}
    </ThemeContext.Provider>
  );
}

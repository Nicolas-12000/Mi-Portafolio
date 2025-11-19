'use client';

import React, { createContext, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Theme, DEFAULT_THEME, STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LoadingScreen } from '@/components/ui';

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
  const [isThemeChanging, setIsThemeChanging] = React.useState(() => {
    // Verificar si hay un loading activo en sessionStorage
    if (typeof window !== 'undefined') {
      const loadingState = sessionStorage.getItem('_loading_state');
      if (loadingState) {
        const { isLoading, timestamp } = JSON.parse(loadingState);
        // Si el loading fue hace menos de 2 segundos, mantenerlo
        if (isLoading && Date.now() - timestamp < 2000) {
          return true;
        }
        sessionStorage.removeItem('_loading_state');
      }
    }
    return false;
  });
  const loadingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

  // Auto-cerrar loading después de 1.5s cuando se activa
  useEffect(() => {
    if (isThemeChanging) {
      const timer = setTimeout(() => {
        setIsThemeChanging(false);
        sessionStorage.removeItem('_loading_state');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isThemeChanging]);

  const toggleTheme = () => {
    // Limpiar timeout anterior si existe
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    // Activar pantalla de loading inmediatamente
    setIsThemeChanging(true);
    
    // Usar requestAnimationFrame para asegurar que el loading se renderice antes del cambio
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        
        // Esperar a que el tema se aplique y los componentes se rendericen completamente
        loadingTimeoutRef.current = setTimeout(() => {
          setIsThemeChanging(false);
          loadingTimeoutRef.current = null;
        }, 1500);
      });
    });
  };

  const setIsLoading = (loading: boolean) => {
    // Limpiar timeout anterior si existe
    if (!loading && loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    
    // Guardar estado en sessionStorage para persistir entre navegaciones
    if (loading) {
      sessionStorage.setItem('_loading_state', JSON.stringify({
        isLoading: true,
        timestamp: Date.now()
      }));
    } else {
      sessionStorage.removeItem('_loading_state');
    }
    
    setIsThemeChanging(loading);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isThemeChanging, setIsLoading }}>
      <AnimatePresence mode="wait">
        {isThemeChanging && <LoadingScreen />}
      </AnimatePresence>
      {children}
    </ThemeContext.Provider>
  );
}

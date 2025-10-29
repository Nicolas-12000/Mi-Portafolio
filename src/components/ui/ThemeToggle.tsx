'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-surface-elevated/80 border border-border"
        aria-label="Cambiar tema"
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    );
  }
  
  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center group overflow-hidden bg-surface-elevated/80 hover:bg-surface-elevated border border-border hover:border-accent-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {/* Background gradient animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Iconos con animación de rotación y fade */}
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        <Sun 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-accent-primary transition-all duration-500 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-accent-secondary transition-all duration-500 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-50'
          }`}
        />
      </div>

      {/* Ripple effect en hover */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-accent-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
    </button>
  );
}

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-12 h-12 rounded-lg flex items-center justify-center',
        'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
        'border border-[var(--border-primary)] hover:border-[var(--accent-gold)]/50',
        'transition-all duration-300',
        className
      )}
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[var(--accent-gold)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--accent-burgundy)]" />
      )}
    </button>
  );
}

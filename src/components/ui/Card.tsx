import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'bordered';
  hover?: boolean;
  className?: string;
}

export function Card({ 
  children, 
  variant = 'default', 
  hover = false,
  className 
}: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';
  
  const variants = {
    default: 'bg-[var(--bg-card)] backdrop-blur-lg border border-[var(--border-secondary)]',
    glass: 'glass-effect',
    bordered: 'border-2 border-[var(--border-accent)] bg-[var(--bg-secondary)]'
  };
  
  const hoverStyles = hover ? 'hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-gold)]/40 hover:shadow-lg' : '';
  
  return (
    <div className={cn(baseStyles, variants[variant], hoverStyles, className)}>
      {children}
    </div>
  );
}

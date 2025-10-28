'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Code2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import type { Locale } from '@/lib/i18n';

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: t('home') },
    { id: 'cases', label: t('cases') },
    { id: 'tech', label: t('tech') },
    { id: 'profile', label: t('profile') },
    { id: 'contact', label: t('contact') }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64; // altura del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-elevated/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-first header - optimizado para S25 */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base sm:text-lg text-text-primary">
              GARCÍA LABS
            </span>
          </div>

          {/* Desktop Menu - Hidden en mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions - Visible en todas las pantallas */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector currentLocale={locale} />
            
            {/* Mobile Menu Button - Solo visible en mobile/tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Optimizado para pantallas táctiles */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface-elevated/98 backdrop-blur-md border-t border-border">
          <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex w-full px-4 py-3 text-left text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors active:scale-[0.98]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

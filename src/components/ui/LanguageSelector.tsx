'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LOCALES, LOCALE_NAMES, type Locale } from '@/lib/constants';
import { useTheme } from '@/hooks/useTheme';

interface LanguageSelectorProps {
  currentLocale: Locale;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function LanguageSelector({ currentLocale, isOpen: externalIsOpen, onOpenChange }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { setIsLoading } = useTheme();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Usar estado externo si está disponible, sino usar interno
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange ?? setInternalIsOpen;

  const locales = LOCALES;

  const changeLocale = (newLocale: Locale) => {
    // Cerrar dropdown inmediatamente
    setIsOpen(false);

    // Activar loading inmediatamente
    if (setIsLoading) setIsLoading(true);

    // Usar requestAnimationFrame para asegurar que el loading se muestre antes del cambio
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
        router.replace(`/${newLocale}${pathWithoutLocale}`);
        // NO desactivamos el loading aquí; se maneja en el proveedor de theme/layout
      });
    });
  };

  return (
    <div className="relative">
      <button
        id="language-selector-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-selector-menu"
        className="relative flex items-center gap-1.5 h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-surface-elevated/80 hover:bg-surface-elevated border border-border hover:border-accent-primary/40 transition-all duration-300 group hover:scale-105 active:scale-95 overflow-hidden"
        aria-label="Seleccionar idioma"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent-primary relative z-10 transition-transform group-hover:rotate-12" />
        <span className="text-xs sm:text-sm font-bold text-text-primary relative z-10 uppercase tracking-wider">{currentLocale.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-text-secondary relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />

        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-accent-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop para cerrar */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div id="language-selector-menu" role="menu" aria-labelledby="language-selector-button" className="absolute right-0 mt-2 w-32 bg-surface-elevated/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {locales.map((locale) => {
              const isActive = currentLocale === locale;
              return (
                <button
                  key={locale}
                  type="button"
                  role="menuitem"
                  onClick={() => changeLocale(locale as Locale)}
                  className={`w-full px-4 py-2 text-center text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-between gap-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent-primary/10 text-accent-primary' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <span className="flex-1 text-left">{locale.toUpperCase()}</span>
                  <span className="text-[10px] text-text-tertiary">{LOCALE_NAMES[locale as Locale]}</span>
                  {isActive && (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-accent-primary animate-in zoom-in duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

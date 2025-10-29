'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LOCALES, LOCALE_NAMES, type Locale } from '@/lib/constants';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.replace(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-1.5 h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-surface-elevated/80 hover:bg-surface-elevated border border-border hover:border-accent-primary/40 transition-all duration-300 group hover:scale-105 active:scale-95 overflow-hidden"
        aria-label="Seleccionar idioma"
      >
        {/* Background gradient animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent-primary relative z-10 transition-transform group-hover:rotate-12" />
        <span className="text-xs sm:text-sm font-bold text-text-primary relative z-10 uppercase tracking-wider">{currentLocale}</span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-text-secondary relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-accent-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
      </button>

      {/* Dropdown mejorado */}
      {isOpen && (
        <>
          {/* Backdrop para cerrar */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 w-32 bg-surface-elevated/95 backdrop-blur-xl rounded-xl border border-border shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {LOCALES.map((locale) => {
              const isActive = currentLocale === locale;
              return (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`w-full px-4 py-2 text-center text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-between gap-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent-primary/10 text-accent-primary' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <span className="flex-1 text-left">{locale}</span>
                  <span className="text-[10px] text-text-tertiary">{LOCALE_NAMES[locale]}</span>
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

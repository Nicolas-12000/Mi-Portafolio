'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LOCALES, LOCALE_NAMES, type Locale } from '@/lib/constants';

interface LanguageSelectorProps {
  className?: string;
  currentLocale: Locale;
}

export function LanguageSelector({ className, currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // Remover el locale actual del path y agregar el nuevo
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className={cn('relative group', className)}>
      <button
        className={cn(
          'flex items-center space-x-2 px-4 py-2 rounded-lg',
          'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
          'border border-[var(--border-primary)] hover:border-[var(--accent-gold)]/50',
          'transition-all duration-300'
        )}
        aria-label="Seleccionar idioma"
      >
        <Globe className="w-4 h-4 text-[var(--accent-gold)]" />
        <span className="text-sm font-medium">{LOCALE_NAMES[currentLocale]}</span>
      </button>

      {/* Dropdown */}
      <div className={cn(
        'absolute right-0 mt-2 w-40 opacity-0 invisible',
        'group-hover:opacity-100 group-hover:visible',
        'transition-all duration-200',
        'bg-[var(--bg-card)] backdrop-blur-lg rounded-lg',
        'border border-[var(--border-primary)] shadow-lg',
        'py-1 z-50'
      )}>
        {LOCALES.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={cn(
              'w-full px-4 py-2 text-left text-sm',
              'hover:bg-[var(--bg-tertiary)] transition-colors',
              currentLocale === locale && 'text-[var(--accent-gold)] font-semibold'
            )}
          >
            {LOCALE_NAMES[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}

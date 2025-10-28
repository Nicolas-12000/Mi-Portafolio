import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['es', 'en', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

// Configuración de next-intl
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../locales/${locale}.json`)).default
  };
});

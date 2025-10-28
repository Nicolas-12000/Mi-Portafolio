import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['es', 'en', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

// Configuración de next-intl
export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale de la request
  let locale = await requestLocale;
  
  // Validar que el locale sea soportado
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  // Lista de idiomas soportados
  locales,
  
  // Idioma por defecto
  defaultLocale,
  
  // Siempre usar prefijo de idioma en la URL
  localePrefix: 'always'
});

export const config = {
  // Aplicar middleware a todas las rutas excepto las de Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

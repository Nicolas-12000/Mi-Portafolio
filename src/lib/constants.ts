// Idiomas soportados
export const LOCALES = ['es', 'en', 'it'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'es';

// Nombres de los idiomas
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  it: 'Italiano'
};

// Temas disponibles
export const THEMES = ['dark', 'light'] as const;
export type Theme = typeof THEMES[number];

export const DEFAULT_THEME: Theme = 'dark';

// URLs y redes sociales
export const SOCIAL_LINKS = {
  github: 'https://github.com/Nicolas-12000',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1s-alejandro-garc%C3%ADa-pasmi%C3%B1o-82765333b/',
  instagram: 'https://www.instagram.com/nico.gp12/',
  email: 'nikolasg1200@gmail.com'
} as const;

// Navegación
export const MENU_ITEMS = [
  { id: 'hero', labelKey: 'nav.hero' },
  { id: 'cases', labelKey: 'nav.cases' },
  { id: 'tech', labelKey: 'nav.tech' },
  { id: 'profile', labelKey: 'nav.profile' },
  { id: 'contact', labelKey: 'nav.contact' }
] as const;

// LocalStorage keys
export const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  LOCALE: 'portfolio-locale'
} as const;

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-in-out'
} as const;

// Breakpoints (debe coincidir con Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

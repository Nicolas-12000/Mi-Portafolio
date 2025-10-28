# Arquitectura del Portafolio — Nicolás García

Este documento describe la arquitectura escalable y sostenible del portafolio, con soporte para múltiples temas e idiomas.

## 🎯 Objetivos

- **Escalabilidad**: estructura modular que permite agregar features sin refactorizar
- **Sostenibilidad**: código mantenible con separación clara de responsabilidades
- **Temas**: soporte dark/light mode con persistencia de preferencias
- **Internacionalización**: español, inglés e italiano con cambio dinámico

## 📁 Estructura de Carpetas

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Rutas dinámicas por idioma (es, en, it)
│   │   ├── page.tsx              # Página principal localizada
│   │   └── layout.tsx            # Layout por idioma
│   ├── layout.tsx                # Root layout con providers
│   ├── globals.css               # Estilos globales + Tailwind
│   └── favicon.ico
│
├── components/                   # Componentes React reutilizables
│   ├── ui/                       # Componentes base (Button, Card, Badge, etc.)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── sections/                 # Secciones del portfolio
│   │   ├── HeroSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── ProfileSection.tsx
│   │   └── ContactSection.tsx
│   ├── layout/                   # Componentes de layout
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   └── providers/                # Context providers
│       ├── ThemeProvider.tsx
│       └── I18nProvider.tsx
│
├── contexts/                     # React Contexts
│   ├── ThemeContext.tsx          # Gestión de tema (dark/light)
│   └── LanguageContext.tsx       # Gestión de idioma
│
├── hooks/                        # Custom React Hooks
│   ├── useTheme.ts               # Hook para acceder al tema
│   ├── useTranslation.ts         # Hook para traducciones
│   ├── useScrollSpy.ts           # Hook para navegación activa
│   └── useLocalStorage.ts        # Hook para persistencia
│
├── lib/                          # Utilidades y configuración
│   ├── i18n.ts                   # Configuración de i18n
│   ├── constants.ts              # Constantes (URLs, colores, etc.)
│   └── utils.ts                  # Funciones auxiliares
│
├── locales/                      # Archivos de traducción
│   ├── es.json                   # Español
│   ├── en.json                   # Inglés
│   └── it.json                   # Italiano
│
└── types/                        # TypeScript types
    ├── index.ts                  # Types generales
    └── i18n.ts                   # Types de traducciones
```

## 🎨 Sistema de Temas

### Tokens de diseño

Los tokens de color se definen en `globals.css` usando CSS custom properties:

```css
:root {
  /* Dark theme (default) */
  --bg-primary: #050507;
  --bg-secondary: #151520;
  --bg-card: rgba(5, 5, 7, 0.6);
  
  --text-primary: #F2F2F7;
  --text-secondary: #9CA3AF;
  
  --accent-gold: #E6B93D;
  --accent-red: #E63946;
  --accent-burgundy: #4A0E1F;
}

[data-theme="light"] {
  /* Light theme */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F7;
  --bg-card: rgba(255, 255, 255, 0.8);
  
  --text-primary: #1C1C1E;
  --text-secondary: #6B7280;
  
  --accent-gold: #D4AF37;
  --accent-red: #DC2626;
  --accent-burgundy: #7C2D3E;
}
```

### ThemeContext

```typescript
// contexts/ThemeContext.tsx
type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

El tema se persiste en `localStorage` y se aplica al `<html>` con `data-theme` attribute.

### Uso en componentes

```tsx
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

## 🌍 Internacionalización (i18n)

### Estrategia

- **Rutas dinámicas**: `/es`, `/en`, `/it` para SEO optimizado
- **Detección automática**: basada en `Accept-Language` header o preferencia guardada
- **Fallback**: español como idioma por defecto
- **Cambio dinámico**: sin recargar página (client-side)

### Estructura de traducciones

```json
// locales/es.json
{
  "nav": {
    "hero": "Central Lab",
    "cases": "Casos de estudio",
    "tech": "Stack técnico",
    "profile": "Perfil",
    "contact": "Contacto"
  },
  "hero": {
    "title": "NICOLÁS GARCÍA",
    "tagline": "Automatizo procesos para optimizar el tiempo y disfrutar la vida",
    "subtitle": "Ingeniero de software • Especialista en backend • Arquitecto de soluciones"
  }
  // ... más traducciones
}
```

### LanguageContext

```typescript
// contexts/LanguageContext.tsx
type Locale = 'es' | 'en' | 'it';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string; // función de traducción
}
```

### Uso en componentes

```tsx
import { useTranslation } from '@/hooks/useTranslation';

export function Hero() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

## 🧩 Componentes

### Principios

1. **Single Responsibility**: cada componente hace una cosa bien
2. **Composición**: componentes pequeños que se combinan
3. **Props tipadas**: TypeScript para todos los props
4. **Accesibilidad**: ARIA labels, keyboard navigation

### Ejemplo: Card Component

```tsx
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'ghost';
  className?: string;
}

export function Card({ children, variant = 'default', className }: CardProps) {
  return (
    <div className={cn('rounded-xl border p-6', variants[variant], className)}>
      {children}
    </div>
  );
}
```

## 📦 Dependencias

### Actuales
- `next` (15.5.3): framework
- `react` (19.1.0): UI library
- `tailwindcss` (4.x): estilos
- `lucide-react`: iconos

### A instalar
- `next-intl`: i18n para Next.js App Router
- `clsx` + `tailwind-merge`: utilidades para className
- `framer-motion` (opcional): animaciones

## 🚀 Roadmap de Implementación

### Fase 1: Estructura base (sprint 1)
- [x] Crear estructura de carpetas
- [ ] Configurar Tailwind con tokens de tema
- [ ] Implementar ThemeContext + ThemeProvider
- [ ] Crear componente ThemeToggle

### Fase 2: Internacionalización (sprint 2)
- [ ] Instalar y configurar next-intl
- [ ] Crear archivos de traducción (es, en, it)
- [ ] Implementar LanguageContext
- [ ] Crear selector de idioma
- [ ] Configurar rutas dinámicas `[locale]`

### Fase 3: Refactorización (sprint 3-4)
- [ ] Extraer componentes UI base
- [ ] Dividir page.tsx en secciones
- [ ] Implementar Navigation component
- [ ] Implementar Footer component
- [ ] Migrar estilos inline a clases reutilizables

### Fase 4: Testing y optimización (sprint 5)
- [ ] Probar cambios de tema
- [ ] Probar cambios de idioma
- [ ] Verificar responsive design
- [ ] Optimizar performance (lazy loading, code splitting)
- [ ] Lighthouse audit

## 🔧 Guías de Desarrollo

### Agregar nueva traducción

1. Agregar keys en `locales/es.json`, `en.json`, `it.json`
2. Usar `t('key.nested')` en componente
3. Verificar que funciona en los 3 idiomas

### Agregar nuevo color de tema

1. Definir en `globals.css` para ambos temas
2. Usar `bg-[var(--color-name)]` en Tailwind
3. Verificar contraste en modo light

### Crear nuevo componente

```tsx
// 1. Crear archivo en components/[categoria]/ComponentName.tsx
// 2. Definir Props interface
// 3. Exportar como named export
// 4. Agregar a index.ts si es UI component

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div>
      <h2>{t(title)}</h2>
    </div>
  );
}
```

## 📊 Decisiones Técnicas

### ¿Por qué next-intl sobre react-i18next?

- Integración nativa con Next.js App Router
- Soporte para rutas dinámicas por idioma (SEO)
- Server components compatible
- Mejor performance (traducciones en build time)

### ¿Por qué data-theme en lugar de class="dark"?

- Más flexible para múltiples temas futuros
- No colisiona con Tailwind dark: prefix
- Fácil de extender (high-contrast, etc.)

### ¿Por qué Context API y no Zustand/Redux?

- Estado simple (theme + locale)
- No necesitamos middleware complejo
- Menos dependencias
- Context API es suficiente para este caso

## 🎓 Recursos

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19 Features](https://react.dev/blog)

---

**Última actualización**: Enero 2025  
**Mantenedor**: Nicolás Alejandro García Pasmiño

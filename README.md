## Portafolio — Nicolás Alejandro García

Este repositorio contiene el portafolio personal de Nicolás García con arquitectura escalable, soporte para múltiples temas (dark/light) e internacionalización en 3 idiomas (español, inglés, italiano).

### 🎨 Características principales

- **Temas dinámicos**: modo oscuro y claro con persistencia de preferencias
- **Multiidioma (i18n)**: español, inglés e italiano con cambio en tiempo real
- **Arquitectura modular**: componentes reutilizables y código mantenible
- **Performance optimizada**: Next.js 15 con App Router y React 19
- **Responsive design**: adaptado para móviles, tablets y escritorio
- **Accesibilidad**: ARIA labels y navegación por teclado

### 📁 Estructura del proyecto

```
src/
├── app/              # Next.js App Router
├── components/       # Componentes reutilizables (UI, sections, layout)
├── contexts/         # React Contexts (ThemeContext, LanguageContext)
├── hooks/            # Custom hooks (useTheme, useTranslation, etc.)
├── lib/              # Utilidades y configuración
├── locales/          # Archivos de traducción (es.json, en.json, it.json)
└── types/            # TypeScript interfaces
```

### 🚀 Tecnologías

- **Framework**: Next.js 15.5.3 (App Router)
- **UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4 con tokens personalizados
- **Iconos**: Lucide React
- **i18n**: next-intl
- **Utilidades**: clsx + tailwind-merge

### 💻 Instalación y ejecución (Windows — PowerShell)

1. **Clonar el repositorio**:

```powershell
git clone https://github.com/Nicolas-12000/Mi-Portafolio.git
cd Mi-Portafolio
```

2. **Instalar dependencias**:

```powershell
npm install
```

3. **Ejecutar en modo desarrollo**:

```powershell
npm run dev
```

4. **Abrir en el navegador**: [http://localhost:3000](http://localhost:3000)

### 🏗️ Construir para producción

```powershell
npm run build
npm start
```

### 📖 Documentación técnica

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: arquitectura completa, decisiones técnicas y guías de desarrollo
- **[MIGRATION_PROGRESS.md](./MIGRATION_PROGRESS.md)**: estado de la migración y próximos pasos

### 🎨 Sistema de temas

El portafolio soporta modo oscuro (default) y modo claro. El tema se guarda automáticamente en localStorage.

**Cambiar tema**:
- Usar el toggle en la navegación (próximamente)
- Modificar manualmente: `localStorage.setItem('portfolio-theme', 'light')`

Los tokens de color están definidos en `src/app/globals.css` usando CSS custom properties.

### 🌍 Idiomas soportados

- 🇪🇸 Español (es) — idioma por defecto
- 🇬🇧 Inglés (en)
- 🇮🇹 Italiano (it)

**Cambiar idioma**:
- Rutas dinámicas: `/es`, `/en`, `/it`
- Selector de idioma en navegación (próximamente)

### 📝 Cómo agregar traducciones

1. Edita `src/locales/es.json`, `en.json`, `it.json`
2. Agrega la nueva clave siguiendo la estructura existente
3. Usa en componentes con `t('clave.anidada')`

### 🧩 Componentes principales

| Componente | Descripción |
|------------|-------------|
| `HeroSection` | Sección principal con título y llamado a la acción |
| `CaseStudiesSection` | Casos de estudio y proyectos destacados |
| `TechStackSection` | Stack tecnológico y competencias |
| `ProfileSection` | Información personal y profesional |
| `ContactSection` | Formulario de contacto e información |

### 🛠️ Scripts disponibles

```powershell
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Construir para producción
npm start        # Ejecutar build de producción
npm run lint     # Ejecutar linter
```

### 📊 Estado del proyecto

- ✅ **Fase 1**: Estructura base + Temas + Traducciones **COMPLETADA**
- 🔄 **Fase 2**: Configuración i18n + Componentes UI **EN PROGRESO**
- ⏳ **Fase 3**: Refactorización completa (pendiente)
- ⏳ **Fase 4**: Testing y optimización (pendiente)

Ver [MIGRATION_PROGRESS.md](./MIGRATION_PROGRESS.md) para detalles.

### 📄 Licencia y contacto

- **Autor**: Nicolás Alejandro García Pasmiño
- **Email**: nikolasg1200@gmail.com
- **GitHub**: [@Nicolas-12000](https://github.com/Nicolas-12000)
- **LinkedIn**: [Nicolás García](https://www.linkedin.com/in/nicol%C3%A1s-alejandro-garc%C3%ADa-pasmi%C3%B1o-82765333b/)

Portafolio personal — código disponible para referencia. Si deseas reutilizar partes del código, por favor da crédito al autor original.

### 🚀 Próximos pasos

1. Configurar rutas dinámicas `[locale]` con next-intl
2. Crear componentes UI base (Button, Card, Badge)
3. Implementar ThemeToggle y LanguageSelector
4. Refactorizar page.tsx en componentes modulares
5. Agregar animaciones con framer-motion
6. Implementar formulario de contacto funcional

---

**Stack**: Next.js 15 • React 19 • TypeScript • Tailwind CSS v4 • next-intl  
**Última actualización**: Enero 2025
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

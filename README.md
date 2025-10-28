## Portafolio — Nicolás Alejandro García

Este repositorio contiene la base del portafolio personal de Nicolás García. Es una aplicación Next.js (app router) que expone una página principal con secciones: Central Lab (hero), Casos de estudio, Dashboard técnico, Perfil y Contacto.

Lo que encontrarás aquí
- `src/app/page.tsx`: implementación principal del portafolio (diseño, navegación y secciones).
- Estilos y configuración mínima para ejecutar la aplicación con Next.js.

Tecnologías principales
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS (clases utilitarias en los componentes)
- Lucide icons (íconos usados en la UI)

Cómo ejecutar localmente (Windows — PowerShell)
1. Instala dependencias:

```powershell
npm install
```

2. Levanta el servidor de desarrollo:

```powershell
npm run dev
```

3. Abre http://localhost:3000 en tu navegador.

Notas de despliegue
- Puedes desplegar fácilmente en Vercel o en cualquier proveedor que soporte aplicaciones Next.js. Para Vercel, conecta el repositorio y selecciona la rama `main`.

Estructura relevante
- `src/app/page.tsx`: página principal (contenido del portafolio). Edita aquí para cambiar textos, secciones o estilos.

Contacto y licencias
- Autor: Nicolás Alejandro García Pasmiño — información de contacto y enlaces dentro de la página (`/contact`).
- Licencia: contenido personal. Añade una licencia explícita si deseas permitir reutilización.

Resumen de este cambio
- Se añadió la base del portafolio (página principal) y se actualizó este README para documentar cómo ejecutar y qué contiene el proyecto.

---
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

# Klapr — Marketing Website

Sitio web de marketing para Klapr, el CRM para productoras audiovisuales independientes en LATAM.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- Deploy: **Vercel**

## Estructura

```
app/
├── layout.tsx              # Root layout (Navbar + Footer)
├── globals.css             # Tailwind + CSS variables de marca
├── page.tsx                # Landing page (/)
├── precios/
│   ├── page.tsx            # Página de precios (/precios)
│   └── PricingClient.tsx   # Toggle mensual/anual (client component)
├── funcionalidades/
│   └── page.tsx            # Página de funcionalidades (/funcionalidades)
└── registro/
    └── page.tsx            # Redirect a klapr.vercel.app/signup (/registro)

components/
├── Navbar.tsx              # Navbar sticky con hamburger menu
├── Footer.tsx              # Footer con links
└── MockDashboard.tsx       # Mock UI del dashboard para el hero
```

## Variables de marca (CSS)

```css
--brand: #F7CC01   /* Amarillo primario */
--bg:    #0A0A0A   /* Fondo oscuro */
--fg:    #FFFFFF   /* Texto claro */
```

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Este sitio es completamente estático — no requiere ninguna variable de entorno.

## Deploy en Vercel

1. Conectá el repositorio en [vercel.com](https://vercel.com)
2. Framework: **Next.js** (autodetectado)
3. Build command: `next build` (por defecto)
4. Output directory: `.next` (por defecto)
5. Sin variables de entorno requeridas

```bash
# O con Vercel CLI:
npx vercel --prod
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con hero, features, pricing preview y CTA |
| `/funcionalidades` | Detalle de cada módulo con mock UI |
| `/precios` | Pricing con toggle mensual/anual, tabla comparativa y FAQ |
| `/registro` | Redirect a `https://klapr.vercel.app/signup` |

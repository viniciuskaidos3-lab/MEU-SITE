# Ferreira Atemporal

A creative bilingual landing page for a chef specializing in restaurant management. The editorial design pairs warm brown, mustard yellow, and cream with authentic chef photography, gastronomic consulting services, a practical working process, and direct contact channels.

## Features
- English and Brazilian Portuguese switcher in the top bar, with Brazilian Portuguese as the default.
- Footer with the chef’s origin in Registro, São Paulo, and CNPJ 65.565.654/0001-08.
- Responsive desktop and mobile layouts, keyboard-accessible navigation, and reduced-motion support.
- A floating contact speed dial with an embedded Typebot assistant, WhatsApp, and Instagram.
- Direct WhatsApp and Instagram links in the contact section.
- Optimized, responsive photography served through Netlify Image CDN.

## Technology
TanStack Start and TanStack Router, React 19, TypeScript, Vite, custom CSS with Tailwind CSS 4 available, Lucide icons, and Netlify's TanStack Start adapter. Typography uses Libre Caslon Display, DM Sans, and Caveat from Google Fonts.

## Run locally
Prerequisites: Node.js 22 or newer, pnpm, and Netlify CLI.

With Nix, enter the development shell first (flakes must be enabled):

```bash
nix develop
pnpm install
netlify dev --port 8889
```

Without Nix, install the prerequisites yourself, then run:

```bash
pnpm install
netlify dev --port 8889
```

Open the local address printed by Netlify CLI. Netlify Image CDN paths are supported by the Netlify development environment and deployment. Netlify runs the configured production build automatically on deploy.

## Content and integrations
Edit the bilingual copy in `src/data/copy.ts`; page layout lives in `src/routes/index.tsx` and visual styling in `src/styles.css`. The original supplied images are in `public/img/`.

The chatbot loads `https://typebot.co/ferreiraco` in an iframe only when opened. Its responses and language are controlled by the hosted Typebot, independently of the page language. A new-tab fallback remains available if the embed is blocked. Inquiries link directly to `https://wa.me/5513982092071` and `https://www.instagram.com/ferreira_atemporal`; no application database or API credentials are required.

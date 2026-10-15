# V. Ferreira Consultoria Gastronômica

## Architecture
This is a bilingual chef and restaurant-management consulting landing page built with TanStack Start, React 19, TypeScript, and Vite. Netlify's Vite adapter handles deployment. It has no application backend, authentication, or stored user data.

## Key files
- `src/routes/index.tsx`: landing page, navigation, language state, service sections, FAQ, and contact links.
- `src/routes/__root.tsx`: document shell, social metadata, favicon, and not-found page.
- `src/data/copy.ts`: English and Brazilian Portuguese copy; all visible landing-page and concierge text belongs here.
- `src/components/Concierge.tsx`: floating speed dial and lazy-mounted Typebot iframe with loading state and external fallback.
- `src/styles.css`: V. Ferreira brand palette as CSS variables (kit: `#c07020`, `#966432`, `#ea7600`, `#6b5036`, `#41362b`, `#332f2b`; cream `#f0e4d0`), light and dark themes, responsive editorial layouts, reduced-motion support.
- `public/logo.svg`: the user's logo (V. FERREIRA / CONSULTORIA GASTRONÔMICA), vectorised from the supplied artwork. It is applied as a CSS mask (`.brand-logo`) so it takes the current text colour in both themes. Do not redraw or restyle it. `public/favicon.svg`, `favicon.ico` and `apple-touch-icon.png` use the "V." monogram.
- Typography: Bodoni Moda (headings, echoing the logo's high-contrast serif; optical size is capped per heading level for legible hairlines) and Jost (body and labels, echoing the logo's geometric tagline), self-hosted through `@fontsource-variable` packages imported in `__root.tsx`.
- `public/img/`: authentic chef and dish photographs provided by the user. Serve these through Netlify Image CDN, not raw full-resolution assets. Do not use photos that show client names or third-party brand marks.
- `netlify.toml` and `vite.config.ts`: framework/deployment configuration.

## Conventions
Never use em dashes (—) or en dashes (–) in visible copy, in either language: the user reads them as a sign of AI-written text. Use commas, colons, periods or parentheses instead. Body text stays between 13px and 14px on every screen size. Copy supplied by the user keeps its wording and emphasis (words in capitals); only fix spelling, accents and punctuation.

Use functional React components, named state variables, strict TypeScript, and semantic elements. Use CSS variables for colors and typography. Follow the existing custom CSS class naming style. Keep EN and PT-BR copy in sync, including accessible labels. Brazilian Portuguese is the server-rendered default; on mount the client switches to the visitor's browser language (`navigator.languages`, Portuguese or English, PT-BR otherwise) and follows later `languagechange` events, mirroring the system-theme pattern. Selecting a language overrides that and updates document language and title without navigation. Language choice is transient, not persisted.

## Important decisions
The assistant is an embed of `https://typebot.co/ferreiraco`, not a locally managed AI feature. Do not alter the hosted bot or promise that its content changes language with the page. The iframe only loads after the visitor selects the assistant in the speed dial. Always retain the external chat fallback and both contact channels: `https://www.instagram.com/ferreira_atemporal` and `https://wa.me/5513982092071`.

Do not invent experience counts, credentials, client testimonials, or performance claims. The supplied photographs show the actual chef and are preferred to generated portraits. No contact form is needed: inquiries go directly to the supplied channels.

## Local development
Install with `pnpm install`, then use `netlify dev --port 8889` for Netlify-aware development. The deployment pipeline runs the production build. Do not edit generated `src/routeTree.gen.ts`.

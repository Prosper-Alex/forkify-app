# Forkify React (Vite + Tailwind + TanStack Query)

A focused recipe browser that pulls live data from TheMealDB. Search, filter by category, and open a complete recipe with ingredients and steps in one view.

## Stack

- Vite (React 18)
- Tailwind CSS + DaisyUI
- TanStack Query for data fetching/caching
- React Router

## Getting started

```bash
pnpm install
pnpm dev
```

App boots at the URL printed by Vite (default: http://localhost:5173).

## Features

- Live search against TheMealDB (`/search.php?s=`) with graceful fallback.
- Category pills sourced from TheMealDB (`/list.php?c=list`) and client-side filter.
- Card grid + detail pane: select a card to fetch full recipe (`/lookup.php?i=`) and see ingredients/steps without page changes.
- Loading/empty states baked in; safe defaults when API returns null.

## Configuration notes

- No API key needed for development (public key `1` used by default via TheMealDB base URL in `src/pages/index.jsx`).
- To change the default search seed, update `FALLBACK_QUERY` in `src/pages/index.jsx`.

## Scripts

-- `pnpm dev` — start Vite dev server
-- `pnpm build` — production build
-- `pnpm preview` — preview production build
-- `pnpm lint` — eslint with auto-fix

## License

MIT (see LICENSE)

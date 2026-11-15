# Frontend Architecture

## Folder structure

- `src/pages/` — route-level screens; placeholders until their feature phases.
- `src/components/` — shared UI, language toggle, and error fallback.
- `src/components/effects/` — empty React Bits destination; add effects only per project rules.
- `src/layouts/` — public, auth, account, and admin route layouts.
- `src/features/` — feature-specific modules, grouped by feature.
- `src/hooks/` — shared React hooks.
- `src/services/` — API client and future endpoint services.
- `src/utils/` — shared pure helpers.
- `src/styles/` — theme tokens and global styling.
- `src/i18n.js`, `src/router.jsx`, `src/App.jsx`, `src/main.jsx` — app setup.

## Naming conventions

- React components and component files: PascalCase.
- Other JavaScript modules and functions: camelCase.
- Use JavaScript only; document key data shapes and exported service/helper contracts with JSDoc.
- Keep user-facing text in `src/i18n.js` resources; do not hardcode component copy.

## Routing conventions

- Customer routes use root paths; admin routes are under `/admin`.
- Use `src/router.jsx` with public, auth, account, and admin layouts.
- Route guards are UX only; Laravel remains authoritative for authentication and permissions.
- Order status values and API-dependent fields must remain dynamic, not hardcoded.

## Styling approach

- Tailwind CSS v4 through `@tailwindcss/vite`.
- Use logical spacing utilities (`ms-`, `me-`, `ps-`, `pe-`); never use `ml-`, `mr-`, `pl-`, or `pr-`.
- Keep Tailwind's default spacing and breakpoint scales unless design images require otherwise.
- `src/styles/theme.css` holds explicit TBD placeholders for accent, fonts, radius, and shadows; do not select values before design images arrive.

## State management

- TanStack Query is approved and provided at the app root for server state.
- Keep the client free of endpoint-specific data and global state until those features are defined.
- Use component state for local UI state; no separate global client-state library is selected.

## Error-boundary strategy

- A global React ErrorBoundary catches render errors and shows an i18n-backed fallback.
- `src/services/apiClient.js` centralizes base URL handling and normalizes non-success HTTP responses as `ApiError`.
- Network and JSON parsing errors remain explicit; endpoint-specific recovery is TBD.

## Environment variables

- `.env.example` contains only `VITE_API_BASE_URL`; `VITE_*` values are public, never secrets.
- The API client requires the base URL when making requests; it does not invent a fallback endpoint.
- Fetch credentials mode is intentionally unset pending the Sanctum/API contract.
- Language preference is stored in `localStorage`; English is the first-run language.

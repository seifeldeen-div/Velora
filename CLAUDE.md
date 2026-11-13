# Velora Frontend

- React e-commerce frontend; Laravel/Sanctum backend is developed separately.
- Stack: React + Vite, JavaScript only, React Router, centralized Fetch API client,
  react-i18next, react-hook-form, and Tailwind CSS.
- Use JSDoc for key shapes and strict ESLint. TanStack Query is pending confirmation.
- Use mock data until backend endpoints are ready.

## Session start protocol
- Read `docs/PROGRESS.md` first.
- Read other files in `docs/` only when the current task needs them.
- Never scan the whole repo unless asked; work only in files/folders relevant to the task.

## Session end protocol
- Update `docs/PROGRESS.md`: done, in progress, next, and issues.
- Log any decision in `docs/DECISIONS.md`.

## Workflow
- Understand -> Plan -> Review -> Implement -> Verify -> Commit.
- Always provide a plan and affected-files list; wait for approval before significant changes.
- One small feature at a time; never generate the whole store in one go.
- Do not make unexplained changes to unrelated files or dependencies.

## Rules
- Keep the storefront generic: product attributes, variants, filters, governorates,
  and shipping prices come from the API; do not hardcode them.
- Arabic (RTL) and English (LTR) use a language toggle; all UI text goes through
  i18n, never hardcoded in components. API bilingual field names are TBD.
- EGP only; use one price-formatting utility. Backend owns prices, totals, and rules.
- Cash on delivery and online card are UI options only; payment processing is backend/
  gateway-owned. Shipping is by governorate with API-provided options and prices.
- Cart and checkout require login; no guest checkout. Wishlist and coupons are out of MVP.
- Variants are dynamic size/color with per-variant stock. Product images use a
  multi-image gallery and are uploaded by admin.
- Reviews are MVP: verified buyers only (backend enforced), shown immediately;
  admins may hide or delete them.
- Admin is in scope with one full-permission role: dashboard (new orders, total sales,
  low stock, recent orders), products, categories, orders, AR/EN content pages, and
  review moderation.
- Order notifications are an in-site status timeline only.
- Use Tailwind logical spacing utilities (`ms-`, `me-`, `ps-`, `pe-`); never `ml-`/`mr-`.
- Visual direction: minimal modern with a luxury touch; one accent color in one theme
  file; Cairo / IBM Plex Sans Arabic and Inter. Dark mode is postponed.
- React Bits: copy into `src/components/effects/` behind project wrappers; use only
  in hero, section titles, and auth pages. Never use in checkout, forms, large product
  lists, or admin. Respect reduced motion, lazy-load heavy effects, and test Arabic
  text effects for connected letters. No three.js, gsap, or ogl without approval.
- Backend is authoritative for totals, prices, and business rules; never trust client-side calculations.
- Never put secrets in frontend environment variables; `VITE_*` values are public.
- Route guards are UX only; Laravel enforces authentication and permissions.
- Handle loading, empty, error, success, and disabled states, plus accessibility basics, for every feature.
- Use mock data until the real endpoint exists; replace feature by feature.

## Definition of Done
- Acceptance criteria met; responsive behavior checked.
- Errors handled; tests pass; diff reviewed.
- Relevant documentation and API contract updated.

## Documentation
- `docs/PROGRESS.md` — current phase, sprint, and handoff.
- `docs/PRD.md` — product requirements.
- `docs/ARCHITECTURE.md` — frontend conventions and structure.
- `docs/API_CONTRACT.md` — Laravel integration contract.
- `docs/DECISIONS.md` — decision log.

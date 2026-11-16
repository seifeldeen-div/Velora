# Decisions

Use one entry per decision. Keep undecided items TBD elsewhere.

| Date | Decision | Alternatives | Reason |
|---|---|---|---|
| 2026-11-13 | Single-vendor clothing store; keep frontend generic and load product attributes, filters, variants, governorates, and shipping prices from API. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Arabic RTL + English LTR with toggle; all UI text via react-i18next. API bilingual fields use a name_ar/name_en-style shape; exact schema TBD. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | EGP only; one shared price formatter. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Cash on delivery and online card are UI-only; backend/gateway handles processing. Shipping is by governorate with API-provided list and prices. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Login required for cart/checkout; no guest checkout. Wishlist and coupons are postponed, out of MVP. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | MVP reviews: verified buyers only (backend-enforced), shown immediately; admin can hide/delete. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Dynamic size/color variants with per-variant stock; multi-image gallery; admin uploads images. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Admin is in scope, with one full-permission role: dashboard (new orders, total sales, low stock, recent orders), products, categories, orders, AR/EN content pages, and review moderation. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Order notifications are an in-site status timeline only. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | React + Vite, JavaScript only, JSDoc for key shapes, strict ESLint, React Router, Fetch API, react-i18next, react-hook-form, and Tailwind logical utilities (`ms-`/`me-`/`ps-`/`pe-`; no `ml-`/`mr-`). TanStack Query is approved as `@tanstack/react-query`. | TBD | User-confirmed; rationale TBD. |
| 2026-11-13 | Minimal modern style with a luxury touch; dark mode postponed. Font details are TBD pending design images. | Cairo / IBM Plex Sans Arabic + Inter (superseded pending image review). | Confirmed by owner. |
| 2026-11-13 | React Bits copied under `src/components/effects/` behind wrappers; limited to hero, section titles, and auth pages. | Superseded by the 2026-11-15 decision below. | Earlier placement rule; replaced by owner direction. |
| 2026-11-13 | Approved libraries: react-i18next, react-hook-form, @tanstack/react-query. | Custom i18n, Formik, SWR. | Confirmed by owner. |
| 2026-11-13 | Catalog size: thousands of products. Pagination, search, filtering, and sorting are server-side via query params; frontend never loads the full catalog; images are lazy-loaded. | Client-side filtering; infinite scroll (not selected). | Scale; numbered pagination confirmed separately. |
| 2026-11-13 | Customer routes use simple paths at the root without language prefixes; admin routes are under `/admin`. | TBD | Confirmed by owner. |
| 2026-11-13 | After a successful login prompted by session expiry, navigate to the home page. | Return to the originally requested page. | Confirmed by owner. |
| 2026-11-13 | Accent color and hex are TBD until design images are provided; store the selected accent as one variable in the theme file. | TBD | Latest owner direction supersedes the earlier olive-green choice. |
| 2026-11-13 | Use Tailwind default breakpoints: sm 640, md 768, lg 1024, xl 1280. | TBD | Confirmed by owner. |
| 2026-11-13 | Catalog pagination uses numbered pages with the page number in the URL; admin tables use numbered pages. | Infinite scroll for catalog. | Confirmed by owner. |
| 2026-11-13 | Use Tailwind default spacing unless design images show otherwise. Radius and shadow details are TBD until design images are provided. | 8px controls, 12px cards, shadow-sm cards (superseded pending image review). | Latest owner direction makes design images the source of truth. |
| 2026-11-13 | Out-of-stock products remain visible with an out-of-stock badge and disabled add-to-cart. | TBD | Confirmed by owner. |
| 2026-11-13 | Order status values remain TBD with the backend owner; do not hardcode them. | TBD | Confirm with backend owner before implementation. |
| 2026-11-13 | Owner will provide design images with each UI-phase prompt from Phase 04 onward; images are the source of truth for colors, fonts, spacing, radius, shadows, and layout. Do not select TBD values before then. | TBD | Confirmed by owner. |
| 2026-11-13 | Persist language choice in `localStorage`; use English on first visit. | Other persistence locations; another initial language. | Confirmed by owner. |
| 2026-11-15 | Use React Bits across all pages/sections at strong intensity on home, auth, about, and 404; medium on listing, product details, cart, account, orders, and content pages; subtle-only on checkout, all forms, and admin. Choose an appropriate effect per page and record it in `docs/UX.md`. Copy effects under `src/components/effects/` behind swappable wrappers. Honor reduced motion, lazy-load heavy effects without delaying LCP, keep product-list effects to cheap CSS transform/opacity, test text effects in Arabic/RTL and avoid them on Arabic text if they break connected letters, and never block user actions. Ask before adding heavy dependencies (including three.js, gsap, or ogl). | Keep React Bits restricted to hero, section titles, and auth; use heavier effects or dependencies without prior approval. | Owner direction replaces the earlier placement rule while allowing creative effect selection within explicit intensity, performance, accessibility, and interaction constraints. |

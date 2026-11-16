# Project Progress

- Current phase: Phase 05 — Auth & Account Screens (auth screens complete; account screens deferred, see notes; Phase 06 not started)
- Current sprint: Sprint 1 — Discovery / UX / Architecture
- Last updated: 2026-11-17

## Phase checklist

- [ ] Phase 01 — Discovery & Scope (in progress; PRD sections remain TBD)
- [x] Phase 02 — UX Flows & Design
- [x] Phase 03 — Setup & Architecture
- [x] Phase 04 — Design System & Shared Components
- [x] Phase 05 — Auth & Account Screens (auth done; profile/address left as placeholders)
- [ ] Phase 06 — Catalog & Discovery
- [ ] Phase 07 — Cart / Wishlist / Checkout
- [ ] Phase 08 — Customer Account & Order History
- [ ] Phase 09 — Admin Dashboard (optional)
- [ ] Phase 10 — API Contract & Laravel Integration
- [ ] Phase 11 — Testing / Accessibility / Performance
- [ ] Phase 12 — Release & Handover

## Done

- [x] Created project memory and documentation skeletons.
- [x] Completed Phase 02 UX page inventory, flows, wireframes, tokens, states, accessibility expectations, and React Bits placement map.
- [x] Completed Phase 03 Vite/React setup, routes/layouts, i18n, providers, API client skeleton, and architecture documentation.
- [x] Verified Phase 03 formatting, lint, production build, and the forbidden Tailwind utility scan.
- [x] Completed Phase 04 theme tokens, shared UI and layout components, product primitives, feedback states, reduced-motion effects, and the dev-only bilingual responsive component showcase.
- [x] Verified Phase 04 lint/build, modal focus trapping and Escape handling, toast interaction, AR/RTL text rendering, EGP numeral formatting, reduced-motion fallback, and mobile/desktop layout overflow.
- [x] Completed Phase 05 auth service: `AuthAdapter` interface with a mock adapter (default when `VITE_API_BASE_URL` is unset) and an HTTP adapter scaffold, `AuthContext` (user/loading/isAdmin/login/register/logout/reset) on TanStack Query, and a `useAuth` hook.
- [x] Completed Phase 05 screens: Login, Register, Forgot password, Reset password using react-hook-form, i18n copy, client validation, server-error mapping, and disabled/pending states.
- [x] Completed Phase 05 route guards: `ProtectedRoute`, `GuestOnlyRoute`, `AdminRoute` (UX only) with intended-destination return; cart, checkout, and account are protected; admin is role-gated.
- [x] Completed Phase 05 session handling: central 401 handler in `apiClient.js` (with `skipAuthRedirect` for probes), session-expired toast + redirect, and an auth-aware Header with logout.
- [x] Completed Phase 05 strong-intensity auth effect: static ambient gradient plus a CSS-only one-time reveal (`Reveal`), reduced-motion aware; forms remain subtle-only.
- [x] Documented Phase 05 auth endpoints and assumptions in `docs/API_CONTRACT.md` (all marked TBD).

## In progress

- [ ] Phase 01 remains in progress; PRD scope and open questions still need owner review.
- [ ] Phase 05 account screens (Profile, Addresses) intentionally left as placeholders: PRD MVP features are still TBD, so they were out of scope for this phase.

## Next

- [ ] Confirm whether Profile/Addresses are in the PRD MVP; if yes, implement them (Phase 08 or a follow-up).
- [ ] Wait for the Phase 06 prompt. Phase 06 has not started.

## Known issues & notes

- Phase 01 PRD sections remain incomplete; see `docs/PRD.md`.
- UX decisions and backend details remain open; see `docs/UX.md`.
- Backend is separate; use mock data until endpoints are ready.
- Fetch credentials mode remains TBD pending the Sanctum/API contract.
- Auth session mechanism (Sanctum cookie vs token) is undecided; the HTTP adapter stores no tokens and reads/writes no client storage. The mock adapter is in-memory only, so mock sessions do not survive a reload.
- Register auto-login after success is an assumption (common with Sanctum); confirm with the backend owner.
- `npm install` reported 3 moderate audit vulnerabilities; no automatic audit fixes were applied.
- Production build succeeds with upstream `"use client"` directive preservation warnings from React Query and React Router.
- Design tokens were extracted from the reference URL; no screenshots were attached. The reference fonts Inter Tight and Urbanist are not used pending license confirmation.
- React Bits effects use CSS and native browser APIs only; no new dependencies were installed. Auth pages use the CSS-only `Reveal` effect.
- Phase 05 verification: lint/build could not be run in the takeover session because the shell tool was unavailable in the environment; changes were self-reviewed manually. Re-run `npm run lint` and `npm run build` before committing.

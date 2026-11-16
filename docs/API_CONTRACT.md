# API Contract

## Per-endpoint checklist
- [ ] Method and URL
- [ ] Query parameters and pagination
- [ ] Request body
- [ ] Success response shape
- [ ] Validation-error format
- [ ] Status codes
- [ ] Authentication / CSRF / CORS
- [ ] Authorization rules
- [ ] Image representation
- [ ] Edge-case behavior

## Endpoints

| Method | URL | Purpose | Status |
|---|---|---|---|
| GET | `/user` | Return the authenticated user. | TBD (Phase 05) |
| POST | `/login` | Authenticate and start a session. | TBD (Phase 05) |
| POST | `/register` | Create an account. | TBD (Phase 05) |
| POST | `/logout` | End the session. | TBD (Phase 05) |
| POST | `/forgot-password` | Request a password reset link. | TBD (Phase 05) |
| POST | `/reset-password` | Complete a password reset with a token. | TBD (Phase 05) |

## Auth endpoints (Phase 05)

### Integration approach
- The frontend talks to auth only through an adapter interface
  (`src/features/auth/authAdapter.js`). Both implementations satisfy the same
  `AuthAdapter` contract, so swapping backends needs no UI changes.
- **Mock adapter** (`mockAuthAdapter.js`) is used when `VITE_API_BASE_URL` is
  unset. It is in-memory only: sessions do not persist across reloads, and no
  data is written to `localStorage`/`sessionStorage`. Seeded accounts:
  - `customer@velora.test` / `password` (role `customer`)
  - `admin@velora.test` / `password` (role `admin`)
- **HTTP adapter** (`httpAuthAdapter.js`) is used when `VITE_API_BASE_URL` is set.
- Paths below are placeholders and **TBD** with the backend owner.

### Auth model
- Sanctum cookie-based vs token-based is **undecided** and must not be assumed.
  The HTTP adapter does not read or store tokens, and `fetch` `credentials` in
  `src/services/apiClient.js` remains unset pending this decision.
- No tokens or sensitive data are stored on the client.

### Endpoint details (all TBD)

#### GET /user
- Purpose: return the current user, or 401 when unauthenticated.
- Success shape: TBD. The adapter accepts either `{ data: user }` or a bare
  `user` and maps it to `{ id, name, email, role }` (`role` defaults to
  `customer`; `admin` is recognized).
- 401: treated as "no user" by the adapter (probe requests skip the global
  401 handler via `skipAuthRedirect`).
- Request/response field names (bilingual? `name_ar`/`name_en`?) TBD.

#### POST /login
- Body: `{ email, password }`.
- Success: user object (same shape as `/user`).
- 401 → invalid credentials (`invalid_credentials`).
- 422 → validation errors (field-level).
- 419 / CSRF, 429 rate limiting: TBD.

#### POST /register
- Body: `{ name, email, password, password_confirmation }`.
- Success: user object.
- **Assumption (unconfirmed):** the backend logs the user in on success, so the
  UI treats a returned user as signed in. If the backend does not auto-login,
  the adapter should return `null` and the UI must redirect to `/login` instead.
- 422 → validation errors (e.g. duplicate email → `email_taken`).
- Whether registration auto-logs-in is **TBD**.

#### POST /logout
- Body: none.
- Success: 204 (or 200) and session ended.
- Behavior when already signed out: TBD.

#### POST /forgot-password
- Body: `{ email }`.
- Success: always generic success (never reveal whether the email exists).
- Response shape and reset-link delivery: TBD.

#### POST /reset-password
- Body: `{ email, password, password_confirmation, token }`.
- `token` is read from the URL query (`?token=...`) on `/reset-password`.
- Success: password updated; UI shows a success message and links to `/login`.
- Invalid/expired token handling: TBD.

### Error mapping (TBD)
- `422` → `AuthError('validation')`; field errors are mapped to a generic i18n
  key (`auth.errors.invalidInput`) because the exact Laravel message shape is
  undecided. Final per-field copy must come from i18n, not raw server strings.
- `401` → `AuthError('invalid_credentials')` on login.
- `>=500` → `AuthError('server')`; network failure → `AuthError('network')`.

### Cross-cutting (TBD)
- CSRF strategy, CORS origin rules, and cookie vs token storage: TBD.
- Rate limiting and lockout behavior: TBD.
- Session expiry: the central client (`setUnauthorizedHandler`) clears the
  session and routes to `/login`; per DECISIONS, post-session-expiry login
  returns to the home page.

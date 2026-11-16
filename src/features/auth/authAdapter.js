import { createHttpAuthAdapter } from './httpAuthAdapter.js'
import { createMockAuthAdapter } from './mockAuthAdapter.js'

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'customer' | 'admin'} role
 *
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} RegisterPayload
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} password_confirmation
 *
 * @typedef {Object} ResetPasswordPayload
 * @property {string} email
 * @property {string} password
 * @property {string} password_confirmation
 * @property {string} [token]
 *
 * @typedef {Object} AuthAdapter
 * @property {() => Promise<AuthUser | null>} getCurrentUser
 * @property {(credentials: LoginCredentials) => Promise<AuthUser | null>} login
 * @property {(payload: RegisterPayload) => Promise<AuthUser | null>} register
 * @property {() => Promise<void>} logout
 * @property {(email: string) => Promise<void>} requestPasswordReset
 * @property {(payload: ResetPasswordPayload) => Promise<void>} resetPassword
 */

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

/**
 * The active auth adapter. Until a Laravel endpoint exists (no `VITE_API_BASE_URL`),
 * the in-memory mock adapter is used. Swapping to the HTTP adapter requires no UI
 * changes because both satisfy {@link AuthAdapter}.
 *
 * @type {AuthAdapter}
 */
export const authAdapter = apiBaseUrl
  ? createHttpAuthAdapter()
  : createMockAuthAdapter()

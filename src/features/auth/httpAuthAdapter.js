import { ApiError, apiRequest } from '../../services/apiClient.js'
import { AuthError } from './authErrors.js'

/**
 * Translate a Laravel validation error bag into `field -> i18n key` entries.
 * The exact server message shape is TBD (see docs/API_CONTRACT.md); until then
 * field errors point at a generic key rather than echoing server copy, so all
 * user-facing text stays in i18n.
 *
 * @param {unknown} payload
 * @returns {Record<string, string>}
 */
function mapValidationErrors(payload) {
  if (!payload || typeof payload !== 'object' || !('errors' in payload)) {
    return {}
  }
  const errors = /** @type {{ errors?: unknown }} */ (payload).errors
  if (!errors || typeof errors !== 'object') {
    return {}
  }
  return Object.fromEntries(
    Object.keys(errors).map((field) => [field, 'auth.errors.invalidInput']),
  )
}

/**
 * Normalize a Laravel user payload (`{ data: user }` or `user`) into an AuthUser.
 *
 * @param {unknown} payload
 * @returns {import('./authAdapter.js').AuthUser | null}
 */
function unwrapUser(payload) {
  if (!payload || typeof payload !== 'object') {
    return null
  }
  const data = 'data' in payload ? /** @type {{ data: unknown }} */ (payload).data : payload
  if (!data || typeof data !== 'object') {
    return null
  }
  const user = /** @type {{ id?: unknown, name?: unknown, email?: unknown, role?: unknown }} */ (data)
  if (user.id === undefined || user.email === undefined) {
    return null
  }
  return {
    id: String(user.id),
    name: typeof user.name === 'string' ? user.name : '',
    email: String(user.email),
    role: user.role === 'admin' ? 'admin' : 'customer',
  }
}

/**
 * @param {unknown} error
 * @returns {AuthError}
 */
function toAuthError(error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return new AuthError('invalid_credentials', {
        fieldErrors: { email: 'auth.errors.invalidCredentials' },
        status: 401,
      })
    }
    if (error.status === 422) {
      return new AuthError('validation', {
        fieldErrors: mapValidationErrors(error.payload),
        status: 422,
      })
    }
    if (error.status >= 500) {
      return new AuthError('server', { status: error.status })
    }
    return new AuthError('unknown', { status: error.status })
  }
  return new AuthError('network')
}

/**
 * Real HTTP auth adapter. Endpoint paths and the cookie-vs-token decision are
 * TBD (see docs/API_CONTRACT.md). Uses the central fetch client; the session
 * mechanism is left to the backend (no tokens are read or stored on the client).
 *
 * @returns {import('./authAdapter.js').AuthAdapter}
 */
export function createHttpAuthAdapter() {
  return {
    async getCurrentUser() {
      try {
        const payload = await apiRequest('/user', {}, { skipAuthRedirect: true })
        return unwrapUser(payload)
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          return null
        }
        throw toAuthError(error)
      }
    },

    async login({ email, password }) {
      try {
        const payload = await apiRequest(
          '/login',
          { method: 'POST', body: JSON.stringify({ email, password }) },
          { skipAuthRedirect: true },
        )
        return unwrapUser(payload)
      } catch (error) {
        throw toAuthError(error)
      }
    },

    async register(payloadBody) {
      try {
        const payload = await apiRequest(
          '/register',
          { method: 'POST', body: JSON.stringify(payloadBody) },
          { skipAuthRedirect: true },
        )
        return unwrapUser(payload)
      } catch (error) {
        throw toAuthError(error)
      }
    },

    async logout() {
      try {
        await apiRequest('/logout', { method: 'POST' }, { skipAuthRedirect: true })
      } catch (error) {
        throw toAuthError(error)
      }
    },

    async requestPasswordReset(email) {
      try {
        await apiRequest(
          '/forgot-password',
          { method: 'POST', body: JSON.stringify({ email }) },
          { skipAuthRedirect: true },
        )
      } catch (error) {
        throw toAuthError(error)
      }
    },

    async resetPassword({ email, password, password_confirmation, token }) {
      try {
        await apiRequest(
          '/reset-password',
          {
            method: 'POST',
            body: JSON.stringify({ email, password, password_confirmation, token }),
          },
          { skipAuthRedirect: true },
        )
      } catch (error) {
        throw toAuthError(error)
      }
    },
  }
}

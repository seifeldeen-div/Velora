const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

/**
 * @extends {Error}
 * @property {number} status HTTP status code.
 * @property {unknown} payload Parsed error body when available, otherwise null.
 */
export class ApiError extends Error {
  /**
   * @param {string} message Error message.
   * @param {number} status HTTP status code.
   * @param {unknown} [payload] Parsed error body when available.
   */
  constructor(message, status, payload = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

/** @type {(() => void) | null} */
let unauthorizedHandler = null

/**
 * Register the callback invoked when a request returns 401. The auth layer uses
 * this to clear the session and surface the session-expired state. Pass null to
 * unregister.
 *
 * @param {(() => void) | null} handler
 * @returns {void}
 */
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

/**
 * Sends a JSON-oriented request to the configured API base URL.
 *
 * @param {string} path Relative API path.
 * @param {RequestInit} options Fetch options.
 * @param {{ skipAuthRedirect?: boolean }} [meta] Client-only request options.
 *   `skipAuthRedirect` suppresses the global 401 handler (used by auth probes).
 * @returns {Promise<unknown>} Parsed JSON response or null for a no-content response.
 */
export async function apiRequest(path, options = {}, meta = {}) {
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured.')
  }

  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/json')

  const response = await fetch(new URL(path, apiBaseUrl), {
    ...options,
    headers,
    // The credentials mode remains unset until the Sanctum contract is confirmed.
  })

  if (!response.ok) {
    let payload = null
    try {
      payload = await response.json()
    } catch (_error) {
      payload = null
    }

    if (response.status === 401 && !meta.skipAuthRedirect && unauthorizedHandler) {
      unauthorizedHandler()
    }

    throw new ApiError(
      response.statusText || `HTTP ${response.status}`,
      response.status,
      payload,
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

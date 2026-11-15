const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

/**
 * @extends {Error}
 * @property {number} status HTTP status code.
 */
export class ApiError extends Error {
  /**
   * @param {string} message Error message.
   * @param {number} status HTTP status code.
   */
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * Sends a JSON-oriented request to the configured API base URL.
 *
 * @param {string} path Relative API path.
 * @param {RequestInit} options Fetch options.
 * @returns {Promise<unknown>} Parsed JSON response or null for a no-content response.
 */
export async function apiRequest(path, options = {}) {
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
    throw new ApiError(
      response.statusText || `HTTP ${response.status}`,
      response.status,
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

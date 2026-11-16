/**
 * Machine-readable auth failure codes. User-facing copy lives in i18n under
 * `auth.errors.<code>`, so no strings are embedded here.
 *
 * @typedef {'invalid_credentials' | 'email_taken' | 'validation' | 'network' | 'server' | 'unknown'} AuthErrorCode
 */

export class AuthError extends Error {
  /**
   * @param {AuthErrorCode} code Machine-readable failure code.
   * @param {{ fieldErrors?: Record<string, string>, status?: number }} [details]
   *   `fieldErrors` maps a form field name to an i18n key.
   */
  constructor(code, { fieldErrors = {}, status = 0 } = {}) {
    super(code)
    this.name = 'AuthError'
    this.code = code
    this.fieldErrors = fieldErrors
    this.status = status
  }
}

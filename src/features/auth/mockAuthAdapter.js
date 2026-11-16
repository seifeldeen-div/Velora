import { AuthError } from './authErrors.js'

const LATENCY = 450

/**
 * @typedef {{ id: string, name: string, email: string, password: string, role: 'customer' | 'admin' }} MockUser
 */

/** @type {MockUser[]} */
const seedUsers = [
  {
    id: '1',
    name: 'Velora Customer',
    email: 'customer@velora.test',
    password: 'password',
    role: 'customer',
  },
  {
    id: '2',
    name: 'Velora Admin',
    email: 'admin@velora.test',
    password: 'password',
    role: 'admin',
  },
]

/** @type {MockUser[]} */
let users = seedUsers.map((user) => ({ ...user }))

/** @type {import('./authAdapter.js').AuthUser | null} */
let currentUser = null

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * @param {string} email
 * @returns {string}
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

/**
 * @param {MockUser} user
 * @returns {import('./authAdapter.js').AuthUser}
 */
function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

/**
 * In-memory mock auth adapter. Sessions are intentionally not persisted to
 * storage, so a page reload signs the user out. Swapping to the HTTP adapter
 * requires no UI changes.
 *
 * @returns {import('./authAdapter.js').AuthAdapter}
 */
export function createMockAuthAdapter() {
  return {
    async getCurrentUser() {
      await wait(150)
      return currentUser ? { ...currentUser } : null
    },

    async login({ email, password }) {
      await wait(LATENCY)
      const user = users.find(
        (candidate) => normalizeEmail(candidate.email) === normalizeEmail(email),
      )
      if (!user || user.password !== password) {
        throw new AuthError('invalid_credentials', {
          fieldErrors: { email: 'auth.errors.invalidCredentials' },
        })
      }
      currentUser = toPublicUser(user)
      return { ...currentUser }
    },

    async register({ name, email, password }) {
      await wait(LATENCY)
      if (
        users.some(
          (candidate) => normalizeEmail(candidate.email) === normalizeEmail(email),
        )
      ) {
        throw new AuthError('email_taken', {
          fieldErrors: { email: 'auth.errors.emailTaken' },
        })
      }
      /** @type {MockUser} */
      const user = {
        id: String(users.length + 1),
        name: name.trim(),
        email: normalizeEmail(email),
        password,
        role: 'customer',
      }
      users = [...users, user]
      currentUser = toPublicUser(user)
      return { ...currentUser }
    },

    async logout() {
      await wait(150)
      currentUser = null
    },

    async requestPasswordReset() {
      await wait(LATENCY)
      // Always resolves so the UI never reveals whether an email exists.
    },

    async resetPassword({ email, password }) {
      await wait(LATENCY)
      const user = users.find(
        (candidate) => normalizeEmail(candidate.email) === normalizeEmail(email),
      )
      if (!user) {
        throw new AuthError('validation', {
          fieldErrors: { email: 'auth.errors.resetEmailNotFound' },
        })
      }
      user.password = password
    },
  }
}

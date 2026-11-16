import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'

/**
 * Access the current auth session and actions.
 *
 * @returns {import('./AuthContext.jsx').AuthContextValue}
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

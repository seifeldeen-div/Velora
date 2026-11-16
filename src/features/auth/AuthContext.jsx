import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../components/ui/ToastProvider.jsx'
import { setUnauthorizedHandler } from '../../services/apiClient.js'
import { authAdapter } from './authAdapter.js'

/**
 * @typedef {import('./authAdapter.js').AuthUser} AuthUser
 * @typedef {import('./authAdapter.js').LoginCredentials} LoginCredentials
 * @typedef {import('./authAdapter.js').RegisterPayload} RegisterPayload
 * @typedef {import('./authAdapter.js').ResetPasswordPayload} ResetPasswordPayload
 *
 * @typedef {Object} AuthContextValue
 * @property {AuthUser | null} user
 * @property {boolean} loading
 * @property {boolean} isAdmin
 * @property {(credentials: LoginCredentials) => Promise<AuthUser | null>} login
 * @property {(payload: RegisterPayload) => Promise<AuthUser | null>} register
 * @property {() => Promise<void>} logout
 * @property {(email: string) => Promise<void>} requestPasswordReset
 * @property {(payload: ResetPasswordPayload) => Promise<void>} resetPassword
 */

export const AuthContext = createContext(/** @type {AuthContextValue | null} */ (null))

export const authUserQueryKey = ['auth', 'user']

/** @param {{ children: import('react').ReactNode }} props */
export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const showToast = useToast()
  const { t } = useTranslation()
  const sessionExpiredRef = useRef(false)

  const userQuery = useQuery({
    queryKey: authUserQueryKey,
    queryFn: () => authAdapter.getCurrentUser(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const user = userQuery.data ?? null
  const loading = userQuery.isPending

  const loginMutation = useMutation({
    mutationFn: (credentials) => authAdapter.login(credentials),
    onSuccess: (nextUser) => {
      sessionExpiredRef.current = false
      queryClient.setQueryData(authUserQueryKey, nextUser)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (payload) => authAdapter.register(payload),
    onSuccess: (nextUser) => {
      sessionExpiredRef.current = false
      queryClient.setQueryData(authUserQueryKey, nextUser)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => authAdapter.logout(),
    onSettled: () => {
      queryClient.setQueryData(authUserQueryKey, null)
    },
  })

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (sessionExpiredRef.current) {
        return
      }
      sessionExpiredRef.current = true
      queryClient.setQueryData(authUserQueryKey, null)
      showToast({ message: t('auth.sessionExpired'), tone: 'error' })
      navigate('/login', { replace: true, state: { sessionExpired: true } })
    })
    return () => setUnauthorizedHandler(null)
  }, [navigate, queryClient, showToast, t])

  const login = useCallback(
    (credentials) => loginMutation.mutateAsync(credentials),
    [loginMutation],
  )
  const register = useCallback(
    (payload) => registerMutation.mutateAsync(payload),
    [registerMutation],
  )
  const logout = useCallback(() => logoutMutation.mutateAsync(), [logoutMutation])
  const requestPasswordReset = useCallback(
    (email) => authAdapter.requestPasswordReset(email),
    [],
  )
  const resetPassword = useCallback(
    (payload) => authAdapter.resetPassword(payload),
    [],
  )

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      requestPasswordReset,
      resetPassword,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      requestPasswordReset,
      resetPassword,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

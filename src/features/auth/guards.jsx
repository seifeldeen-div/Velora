import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAuth } from './useAuth.js'

function RouteLoading() {
  return (
    <div className="auth-route-loading">
      <Spinner size="lg" />
    </div>
  )
}

/**
 * Renders its children only for authenticated users. Route guards are UX only;
 * Laravel remains authoritative for authentication and permissions.
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <RouteLoading />
  }
  if (!user) {
    const from = `${location.pathname}${location.search}`
    return <Navigate to="/login" replace state={{ from }} />
  }
  return <Outlet />
}

/**
 * Renders its children only for signed-out users. Signed-in users are sent to
 * the destination they were originally heading to, otherwise home.
 */
export function GuestOnlyRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <RouteLoading />
  }
  if (user) {
    const from = location.state?.from
    return <Navigate to={typeof from === 'string' ? from : '/'} replace />
  }
  return <Outlet />
}

/**
 * Renders its children only for admins. Non-admins are sent to the access-denied
 * screen. This is a UX guard only; the backend enforces permissions.
 */
export function AdminRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <RouteLoading />
  }
  if (!user) {
    const from = `${location.pathname}${location.search}`
    return <Navigate to="/login" replace state={{ from }} />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/access-denied" replace />
  }
  return <Outlet />
}

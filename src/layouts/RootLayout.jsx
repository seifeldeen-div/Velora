import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../features/auth/AuthContext.jsx'

/**
 * Root route layout. Lives inside the router so the auth layer can navigate
 * (for example, on session expiry) while remaining available to every route.
 */
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default RootLayout

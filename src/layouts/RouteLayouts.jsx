import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Header from '../components/layout/Header.jsx'

/** @param {{ variant?: 'public' | 'auth' | 'account' | 'admin' }} props */
function RouteLayout({ variant = 'public' }) {
  return (
    <div className={`app-shell app-shell--${variant}`}>
      <Header />
      <main className={`site-main site-main--${variant}`} id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function PublicLayout() {
  return <RouteLayout variant="public" />
}

export function AuthLayout() {
  return <RouteLayout variant="auth" />
}

export function AccountLayout() {
  return <RouteLayout variant="account" />
}

export function AdminLayout() {
  return <RouteLayout variant="admin" />
}

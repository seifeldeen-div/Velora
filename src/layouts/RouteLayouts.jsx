import { Outlet } from 'react-router-dom'
import LanguageToggle from '../components/LanguageToggle.jsx'

function RouteLayout() {
  return (
    <>
      <header className="flex justify-end p-4">
        <LanguageToggle />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export function PublicLayout() {
  return <RouteLayout />
}

export function AuthLayout() {
  return <RouteLayout />
}

export function AccountLayout() {
  return <RouteLayout />
}

export function AdminLayout() {
  return <RouteLayout />
}

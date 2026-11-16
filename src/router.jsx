import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import {
  AccountLayout,
  AdminLayout,
  AuthLayout,
  PublicLayout,
} from './layouts/RouteLayouts.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import {
  AdminRoute,
  GuestOnlyRoute,
  ProtectedRoute,
} from './features/auth/guards.jsx'

const page = (titleKey) => <PagePlaceholder titleKey={titleKey} />

const devRoutes = []
if (import.meta.env.DEV) {
  const LazyComponentsShowcase = lazy(
    () => import('./pages/ComponentsShowcase.jsx'),
  )
  devRoutes.push({
    path: '/dev/components',
    element: (
      <Suspense fallback={<PagePlaceholder titleKey="showcase.title" />}>
        <LazyComponentsShowcase />
      </Suspense>
    ),
  })
}

const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          { index: true, element: page('pages.home') },
          { path: 'products', element: page('pages.products') },
          { path: 'search', element: page('pages.search') },
          { path: 'products/:id', element: page('pages.productDetails') },
          {
            element: <ProtectedRoute />,
            children: [
              { path: 'cart', element: page('pages.cart') },
              { path: 'checkout', element: page('pages.checkout') },
            ],
          },
          { path: 'order-confirmation', element: page('pages.orderConfirmation') },
          { path: 'about', element: page('pages.about') },
          { path: 'contact', element: page('pages.contact') },
          { path: 'policies', element: page('pages.policies') },
          { path: 'access-denied', element: page('pages.accessDenied') },
          { path: '*', element: page('pages.notFound') },
        ],
      },
      {
        element: <GuestOnlyRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: '/login', element: <LoginPage /> },
              { path: '/register', element: <RegisterPage /> },
              { path: '/forgot-password', element: <ForgotPasswordPage /> },
              { path: '/reset-password', element: <ResetPasswordPage /> },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/account',
            element: <AccountLayout />,
            children: [
              { index: true, element: page('pages.account') },
              { path: 'profile', element: page('pages.profile') },
              { path: 'addresses', element: page('pages.addresses') },
              { path: 'orders', element: page('pages.orders') },
              { path: 'orders/:id', element: page('pages.orderDetails') },
            ],
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: '/admin',
            element: <AdminLayout />,
            children: [
              { index: true, element: <Navigate to="/admin/dashboard" replace /> },
              { path: 'dashboard', element: page('pages.adminDashboard') },
              { path: 'products', element: page('pages.adminProducts') },
              { path: 'products/new', element: page('pages.adminProductCreate') },
              { path: 'products/:id/edit', element: page('pages.adminProductEdit') },
              { path: 'categories', element: page('pages.adminCategories') },
              { path: 'orders', element: page('pages.adminOrders') },
              { path: 'orders/:id', element: page('pages.adminOrderDetails') },
              { path: 'content', element: page('pages.adminContent') },
              { path: 'reviews', element: page('pages.adminReviews') },
            ],
          },
        ],
      },
      ...devRoutes,
    ],
  },
]

export const router = createBrowserRouter(routes)

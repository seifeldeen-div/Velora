import { createBrowserRouter, Navigate } from 'react-router-dom'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import {
  AccountLayout,
  AdminLayout,
  AuthLayout,
  PublicLayout,
} from './layouts/RouteLayouts.jsx'

const page = (titleKey) => <PagePlaceholder titleKey={titleKey} />

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: page('pages.home') },
      { path: 'products', element: page('pages.products') },
      { path: 'search', element: page('pages.search') },
      { path: 'products/:id', element: page('pages.productDetails') },
      { path: 'cart', element: page('pages.cart') },
      { path: 'checkout', element: page('pages.checkout') },
      { path: 'order-confirmation', element: page('pages.orderConfirmation') },
      { path: 'about', element: page('pages.about') },
      { path: 'contact', element: page('pages.contact') },
      { path: 'policies', element: page('pages.policies') },
      { path: 'access-denied', element: page('pages.accessDenied') },
      { path: '*', element: page('pages.notFound') },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: page('pages.login') },
      { path: '/register', element: page('pages.register') },
      { path: '/forgot-password', element: page('pages.forgotPassword') },
      { path: '/reset-password', element: page('pages.resetPassword') },
    ],
  },
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
])

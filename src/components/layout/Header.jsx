import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../Icon.jsx'
import LanguageToggle from '../LanguageToggle.jsx'
import { useAuth } from '../../features/auth/useAuth.js'
import { useToast } from '../ui/ToastProvider.jsx'
import MobileNavigation from './MobileNavigation.jsx'

/** @param {{ forceMobile?: boolean, mainId?: string }} props */
function Header({ forceMobile = false, mainId = 'main-content' }) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const showToast = useToast()
  const { user, loading, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const links = [
    { to: '/products', label: t('layout.shop') },
    { to: '/about', label: t('layout.about') },
    { to: '/contact', label: t('layout.contact') },
  ]

  useEffect(() => {
    setMobileOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await logout()
      showToast({ message: t('auth.logout.success'), tone: 'success' })
      navigate('/')
    } catch (_error) {
      showToast({ message: t('auth.errors.unknown'), tone: 'error' })
    } finally {
      setUserMenuOpen(false)
    }
  }

  return (
    <>
      <a className="skip-link" href={`#${mainId}`}>
        {t('layout.skipToContent')}
      </a>
      <header
        className={`site-header ${forceMobile ? 'site-header--forced-mobile' : ''}`.trim()}
      >
        <div className="site-header__inner">
          <Link className="site-brand" to="/" aria-label={t('layout.home')}>
            <span className="site-brand__mark" aria-hidden="true">
              V
            </span>
            <span>{t('common.brand')}</span>
          </Link>

          <nav className="desktop-navigation" aria-label={t('layout.primaryNavigation')}>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <LanguageToggle />
            <Link
              className="header-action"
              to="/cart"
              aria-label={t('layout.cart')}
              title={t('layout.cart')}
            >
              <Icon name="cart" />
            </Link>
            <div className="user-menu">
              <button
                type="button"
                className="header-action user-menu__trigger"
                aria-label={t('layout.userMenu')}
                aria-expanded={userMenuOpen}
                aria-controls={userMenuOpen ? 'user-menu-options' : undefined}
                onClick={() => setUserMenuOpen((open) => !open)}
              >
                <Icon name="user" />
                <span className="user-menu__label">{t('layout.account')}</span>
              </button>
              {userMenuOpen && (
                <nav
                  className="user-menu__options"
                  id="user-menu-options"
                  aria-label={t('layout.userMenu')}
                >
                  {loading ? (
                    <p className="user-menu__status">{t('common.loading')}</p>
                  ) : user ? (
                    <>
                      <Link to="/account">{t('auth.menu.account')}</Link>
                      <Link to="/account/orders">{t('auth.menu.orders')}</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard">{t('auth.menu.admin')}</Link>
                      )}
                      <button
                        type="button"
                        className="user-menu__action"
                        onClick={handleLogout}
                      >
                        {t('auth.actions.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">{t('auth.menu.login')}</Link>
                      <Link to="/register">{t('auth.menu.register')}</Link>
                    </>
                  )}
                </nav>
              )}
            </div>
            <button
              type="button"
              className="header-action mobile-menu-trigger"
              aria-label={mobileOpen ? t('layout.closeNavigation') : t('layout.openNavigation')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        <MobileNavigation
          open={mobileOpen}
          links={links}
          label={t('layout.primaryNavigation')}
          onNavigate={() => setMobileOpen(false)}
        />
      </header>
    </>
  )
}

export default Header

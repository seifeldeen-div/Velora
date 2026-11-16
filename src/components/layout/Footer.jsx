import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link className="site-brand" to="/">
            <span className="site-brand__mark" aria-hidden="true">
              V
            </span>
            <span>{t('common.brand')}</span>
          </Link>
          <p>{t('layout.footerDescription')}</p>
        </div>
        <nav className="site-footer__links" aria-label={t('layout.footerNavigation')}>
          <Link to="/products">{t('layout.shop')}</Link>
          <Link to="/about">{t('layout.about')}</Link>
          <Link to="/contact">{t('layout.contact')}</Link>
          <Link to="/policies">{t('layout.policies')}</Link>
        </nav>
      </div>
      <div className="site-footer__copyright">
        {t('layout.copyright', { year })}
      </div>
    </footer>
  )
}

export default Footer

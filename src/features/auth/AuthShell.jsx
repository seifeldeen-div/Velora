import { useTranslation } from 'react-i18next'
import Card from '../../components/ui/Card.jsx'
import { Reveal } from '../../components/effects/Effects.jsx'

/**
 * Shared shell for auth screens (login, register, forgot/reset password).
 * Provides the strong-intensity ambient gradient plus a one-time heading/content
 * reveal; the form area itself stays subtle.
 *
 * @param {{ titleKey: string, subtitleKey?: string, children: import('react').ReactNode, footer?: import('react').ReactNode }} props
 */
function AuthShell({ titleKey, subtitleKey, children, footer }) {
  const { t } = useTranslation()

  return (
    <section className="auth-shell">
      <div className="auth-shell__ambient" aria-hidden="true" />
      <Card className="auth-card">
        <Reveal className="auth-card__intro">
          <h1 className="auth-card__title">{t(titleKey)}</h1>
          {subtitleKey && <p className="auth-card__subtitle">{t(subtitleKey)}</p>}
        </Reveal>
        {children}
        {footer && <div className="auth-card__footer">{footer}</div>}
      </Card>
    </section>
  )
}

export default AuthShell

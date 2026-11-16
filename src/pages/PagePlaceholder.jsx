import { useTranslation } from 'react-i18next'
import { ShinyText } from '../components/effects/Effects.jsx'

/** @param {{ titleKey: string }} props */
function PagePlaceholder({ titleKey }) {
  const { t } = useTranslation()
  const title = t(titleKey)

  return (
    <section className="page-placeholder">
      <h1 className="page-placeholder__title">
        {titleKey === 'pages.home' ? <ShinyText>{title}</ShinyText> : title}
      </h1>
      <p className="page-placeholder__description">{t('app.placeholder')}</p>
    </section>
  )
}

export default PagePlaceholder

import { useTranslation } from 'react-i18next'

/** @param {{ titleKey: string }} props */
function PagePlaceholder({ titleKey }) {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{t(titleKey)}</h1>
      <p>{t('app.placeholder')}</p>
    </section>
  )
}

export default PagePlaceholder

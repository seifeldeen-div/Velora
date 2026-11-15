import { useTranslation } from 'react-i18next'

function ErrorFallback() {
  const { t } = useTranslation()

  return (
    <main className="p-4" role="alert">
      <p>{t('app.error')}</p>
    </main>
  )
}

export default ErrorFallback

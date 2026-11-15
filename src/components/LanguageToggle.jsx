import { useTranslation } from 'react-i18next'

function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const nextLanguage = i18n.resolvedLanguage === 'ar' ? 'en' : 'ar'

  return (
    <button
      type="button"
      aria-label={t('language.toggle')}
      className="border px-3 py-2"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
    >
      {t(`language.${nextLanguage === 'ar' ? 'arabic' : 'english'}`)}
    </button>
  )
}

export default LanguageToggle

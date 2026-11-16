import { useTranslation } from 'react-i18next'
import { formatPrice } from '../../utils/formatPrice.js'

/** @param {{ amount: number, locale?: 'ar' | 'en', className?: string }} props */
function PriceDisplay({ amount, locale, className = '' }) {
  const { i18n } = useTranslation()
  const language = locale || i18n.resolvedLanguage || 'en'

  return (
    <span className={`price-display ${className}`.trim()}>
      {formatPrice(amount, language)}
    </span>
  )
}

export default PriceDisplay

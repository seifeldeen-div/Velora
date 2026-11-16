import { useTranslation } from 'react-i18next'
import Icon from '../Icon.jsx'

/** @param {{ rating: number, reviewCount?: number, className?: string }} props */
function RatingDisplay({ rating, reviewCount = 0, className = '' }) {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || 'en'
  const formattedRating = new Intl.NumberFormat(language, {
    maximumFractionDigits: 1,
  }).format(rating)

  return (
    <span
      className={`rating-display ${className}`.trim()}
      aria-label={t('rating.label', {
        rating: formattedRating,
        max: 5,
        count: reviewCount,
      })}
    >
      <span className="rating-display__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            className={star <= rating ? 'rating-display__star--filled' : ''}
          />
        ))}
      </span>
      <span>{formattedRating}</span>
      <span className="rating-display__count">
        ({new Intl.NumberFormat(language).format(reviewCount)})
      </span>
    </span>
  )
}

export default RatingDisplay

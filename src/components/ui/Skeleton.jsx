import { useTranslation } from 'react-i18next'

/** @param {{ variant?: 'text' | 'circle' | 'media' | 'card', lines?: number, label?: string, className?: string }} props */
function Skeleton({
  variant = 'text',
  lines = 1,
  label,
  className = '',
}) {
  const { t } = useTranslation()
  const accessibleLabel = label || t('common.loading')

  if (variant !== 'text') {
    return (
      <span
        className={`ui-skeleton ui-skeleton--${variant} ${className}`.trim()}
        role="status"
        aria-label={accessibleLabel}
      />
    )
  }

  return (
    <span
      className={`ui-skeleton-lines ${className}`.trim()}
      role="status"
      aria-label={accessibleLabel}
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <span className="ui-skeleton" key={index} aria-hidden="true" />
      ))}
    </span>
  )
}

export default Skeleton

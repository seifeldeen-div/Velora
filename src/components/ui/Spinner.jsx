import { useTranslation } from 'react-i18next'

/** @param {{ size?: 'sm' | 'md' | 'lg', label?: string, className?: string }} props */
function Spinner({ size = 'md', label, className = '' }) {
  const { t } = useTranslation()

  return (
    <span
      className={`ui-spinner ui-spinner--${size} ${className}`.trim()}
      role={label === '' ? undefined : 'status'}
      aria-label={label || t('common.loading')}
      aria-hidden={label === '' ? true : undefined}
    />
  )
}

export default Spinner

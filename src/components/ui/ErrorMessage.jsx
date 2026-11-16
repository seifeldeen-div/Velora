import { useTranslation } from 'react-i18next'
import Button from './Button.jsx'

/** @param {{ title?: string, message: string, retryLabel?: string, onRetry?: () => void, className?: string }} props */
function ErrorMessage({
  title,
  message,
  retryLabel,
  onRetry,
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <section
      className={`ui-state ui-error-message ${className}`.trim()}
      role="alert"
    >
      <h2>{title || t('feedback.errorTitle')}</h2>
      <p>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {retryLabel || t('feedback.retry')}
        </Button>
      )}
    </section>
  )
}

export default ErrorMessage

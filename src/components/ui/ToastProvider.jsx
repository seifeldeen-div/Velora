import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../Icon.jsx'

const ToastContext = createContext(null)

/** @param {{ id: number, message: string, tone: 'info' | 'success' | 'error', duration: number, onDismiss: (id: number) => void }} props */
function ToastItem({ id, message, tone, duration, onDismiss }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (duration <= 0) {
      return undefined
    }
    const timeout = window.setTimeout(() => onDismiss(id), duration)
    return () => window.clearTimeout(timeout)
  }, [duration, id, onDismiss])

  return (
    <div
      className={`ui-toast ui-toast--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <span>{message}</span>
      <button
        type="button"
        className="ui-icon-button"
        onClick={() => onDismiss(id)}
        aria-label={t('common.dismiss')}
      >
        <Icon name="close" />
      </button>
    </div>
  )
}

/** @param {{ children: import('react').ReactNode }} props */
export function ToastProvider({ children }) {
  const { t } = useTranslation()
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ message, tone = 'info', duration = 5000 }) => {
    const id = ++nextId.current
    setToasts((current) => [...current, { id, message, tone, duration }])
    return id
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className="ui-toast-region"
        role="region"
        aria-label={t('toast.region')}
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** @returns {(toast: { message: string, tone?: 'info' | 'success' | 'error', duration?: number }) => number} */
export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return showToast
}

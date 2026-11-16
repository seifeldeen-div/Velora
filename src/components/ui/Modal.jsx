import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../Icon.jsx'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** @param {{ open: boolean, title?: string, onClose: () => void, children: import('react').ReactNode, className?: string }} props */
function Modal({ open, title, onClose, children, className = '' }) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current
    document.body.style.overflow = 'hidden'

    const focusable = () =>
      [...dialog.querySelectorAll(FOCUSABLE)].filter(
        (element) =>
          element.getClientRects().length > 0 &&
          !element.closest('[aria-hidden="true"]'),
      )
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const items = focusable()
      if (!items.length) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        const target = event.shiftKey ? last : first
        target.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const initialFocus = focusable()[0] || dialog
    initialFocus.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className="ui-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        ref={dialogRef}
        className={`ui-modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        dir={i18n.dir()}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : t('dialog.defaultTitle')}
        tabIndex={-1}
      >
        <header className="ui-modal__header">
          {title && (
            <h2 className="ui-modal__title" id={titleId}>
              {title}
            </h2>
          )}
          <button
            type="button"
            className="ui-icon-button"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="ui-modal__body">{children}</div>
      </section>
    </div>,
    document.body,
  )
}

export default Modal

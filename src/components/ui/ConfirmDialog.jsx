import { useTranslation } from 'react-i18next'
import Button from './Button.jsx'
import Modal from './Modal.jsx'

/** @param {{ open: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void, confirmLabel?: string, cancelLabel?: string, loading?: boolean, destructive?: boolean }} props */
function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  loading = false,
  destructive = false,
}) {
  const { t } = useTranslation()

  return (
    <Modal open={open} title={title} onClose={onCancel} className="ui-confirm-dialog">
      <p className="ui-confirm-dialog__message">{message}</p>
      <div className="ui-confirm-dialog__actions">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel || t('common.cancel')}
        </Button>
        <Button
          variant={destructive ? 'danger' : 'primary'}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel || t('common.confirm')}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog

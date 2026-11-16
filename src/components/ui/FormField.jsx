import { cloneElement, isValidElement } from 'react'

/** @param {{ id: string, label: string, error?: string, hint?: string, required?: boolean, children: import('react').ReactNode }} props */
function FormField({ id, label, error, hint, required = false, children }) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const control = isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': [
          children.props['aria-describedby'],
          messageId,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
        'aria-invalid': error ? true : children.props['aria-invalid'],
      })
    : children

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {control}
      {error ? (
        <p className="form-field__message form-field__message--error" id={messageId} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="form-field__message" id={messageId}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}

export default FormField

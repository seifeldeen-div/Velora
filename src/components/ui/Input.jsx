import { forwardRef } from 'react'

/** @typedef {{ invalid?: boolean, className?: string } & import('react').InputHTMLAttributes<HTMLInputElement>} InputProps */

/** @type {import('react').ForwardRefExoticComponent<InputProps & import('react').RefAttributes<HTMLInputElement>>} */
const Input = forwardRef(function Input(
  { invalid = false, className = '', ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`ui-input ${invalid ? 'ui-input--invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
    />
  )
})

export default Input

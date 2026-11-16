import { forwardRef } from 'react'
import Spinner from './Spinner.jsx'

/** @typedef {{ variant?: 'primary' | 'secondary' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg', loading?: boolean, className?: string, children: import('react').ReactNode } & import('react').ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps */

/** @type {import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>} */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className = '',
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner size="sm" label="" />}
      {children}
    </button>
  )
})

export default Button

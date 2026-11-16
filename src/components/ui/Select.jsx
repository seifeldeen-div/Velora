import { forwardRef } from 'react'

/** @typedef {{ value: string, label: string, disabled?: boolean }} SelectOption */
/** @typedef {{ options?: SelectOption[], invalid?: boolean, className?: string } & import('react').SelectHTMLAttributes<HTMLSelectElement>} SelectProps */

/** @type {import('react').ForwardRefExoticComponent<SelectProps & import('react').RefAttributes<HTMLSelectElement>>} */
const Select = forwardRef(function Select(
  { options = [], invalid = false, className = '', children, ...props },
  ref,
) {
  return (
    <select
      {...props}
      ref={ref}
      className={`ui-input ui-select ${invalid ? 'ui-input--invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
    >
      {children ||
        options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
    </select>
  )
})

export default Select

/** @param {{ tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger', children: import('react').ReactNode, className?: string }} props */
function Badge({ tone = 'neutral', children, className = '' }) {
  return (
    <span className={`ui-badge ui-badge--${tone} ${className}`.trim()}>
      {children}
    </span>
  )
}

export default Badge

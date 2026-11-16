/** @param {{ as?: import('react').ElementType, variant?: 'default' | 'outlined', className?: string, children: import('react').ReactNode } & Record<string, unknown>} props */
function Card({ as: Element = 'section', variant = 'default', className = '', children, ...props }) {
  return (
    <Element
      {...props}
      className={`ui-card ui-card--${variant} ${className}`.trim()}
    >
      {children}
    </Element>
  )
}

export default Card

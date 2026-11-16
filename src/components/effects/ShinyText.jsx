/** @param {{ children: string, className?: string }} props */
function ShinyText({ children, className = '' }) {
  return (
    <span className={`effect-shiny-text ${className}`.trim()}>
      <span>{children}</span>
      <span className="effect-shiny-text__overlay" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

export default ShinyText

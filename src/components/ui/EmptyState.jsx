/** @param {{ title: string, description?: string, action?: import('react').ReactNode, className?: string }} props */
function EmptyState({ title, description, action, className = '' }) {
  return (
    <section className={`ui-state ui-empty-state ${className}`.trim()}>
      <span className="ui-empty-state__mark" aria-hidden="true" />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </section>
  )
}

export default EmptyState

/**
 * CSS-only, one-time entrance reveal. Used on strong-intensity pages (auth)
 * where a single heading/content reveal is wanted. The global
 * `prefers-reduced-motion` rule disables the animation, so it stays static.
 *
 * @param {{ children: import('react').ReactNode, className?: string }} props
 */
function Reveal({ children, className = '' }) {
  return <div className={`effect-reveal ${className}`.trim()}>{children}</div>
}

export default Reveal

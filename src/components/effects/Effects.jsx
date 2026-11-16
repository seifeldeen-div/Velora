import { lazy, Suspense } from 'react'

const LazyShinyText = lazy(() => import('./ShinyText.jsx'))
const LazyScrollReveal = lazy(() => import('./ScrollReveal.jsx'))

/** @param {{ children: string, className?: string }} props */
export function ShinyText({ children, className = '' }) {
  return (
    <Suspense fallback={<span className={className}>{children}</span>}>
      <LazyShinyText className={className}>{children}</LazyShinyText>
    </Suspense>
  )
}

/** @param {{ children: import('react').ReactNode, className?: string }} props */
export function ScrollReveal({ children, className = '' }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <LazyScrollReveal className={className}>{children}</LazyScrollReveal>
    </Suspense>
  )
}

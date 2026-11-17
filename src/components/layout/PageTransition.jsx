import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '@/lib/motion'
import { useAutoReveal } from '@/hooks/useAutoReveal'

/**
 * Short fade between pages, then the content of the page appears one item at a
 * time (see useAutoReveal). Under prefers-reduced-motion all of it is removed,
 * so pages simply swap.
 * Must be rendered inside <AnimatePresence> with a key that changes per route.
 */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  useAutoReveal(ref)

  if (reduce) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.18, ease: EASE_OUT } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      {children}
    </motion.div>
  )
}

import { useEffect, useRef, useState } from 'react'

/**
 * Returns true while the user is scrolling down past `threshold`.
 * Scrolling up, or being near the top of the page, returns false.
 */
export function useHideOnScroll({ threshold = 96, delta = 6 } = {}) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY

    const update = () => {
      const y = Math.max(window.scrollY, 0)
      const diff = y - lastY.current

      if (y < threshold) {
        setHidden(false)
        lastY.current = y
      } else if (Math.abs(diff) > delta) {
        setHidden(diff > 0)
        lastY.current = y
      }
      ticking.current = false
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, delta])

  return hidden
}

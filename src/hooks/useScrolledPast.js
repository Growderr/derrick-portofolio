import { useEffect, useState } from 'react'

/**
 * Returns true once the page has been scrolled further than `threshold` pixels.
 * Scroll events are coalesced into one update per frame, and React only
 * re-renders when the boolean actually flips.
 */
export function useScrolledPast(threshold = 480) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      setPast(window.scrollY > threshold)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return past
}

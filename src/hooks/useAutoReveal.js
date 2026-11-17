import { useLayoutEffect } from 'react'

// Elements that appear one by one. The outermost match wins, so a whole card
// animates as one block instead of every line inside it.
const CANDIDATES =
  'h1,h2,h3,h4,p,li,figure,article,blockquote,dt,dd,table,form,hr,img,picture,a,button,[class*="aspect-"],[data-reveal]'
// Never animated: menus, dialogs, screen-reader text, and anything that
// already has its own animation (mark it with data-no-reveal).
const SKIP = 'nav,[role="dialog"],[aria-modal="true"],[data-no-reveal],.sr-only'

const STEP_MS = 80
const MAX_STEPS = 9

/**
 * Makes everything inside `rootRef` slide in from the right one after another,
 * on first load, on every page change and while scrolling (and fade out when
 * it leaves the screen). Does nothing under
 * prefers-reduced-motion.
 */
export function useAutoReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (
      !root ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    // A block taller than the screen (a whole article) is a container, not a unit.
    const isUnit = (el) =>
      el.matches(CANDIDATES) && !el.closest(SKIP) && el.offsetHeight <= window.innerHeight * 1.2

    const hasUnitAncestor = (el) => {
      for (let p = el.parentElement; p && p !== root; p = p.parentElement) {
        if (isUnit(p)) return true
      }
      return false
    }

    // Toggles both ways: items slide in from the right when they enter the
    // screen and fade out when they leave, then slide in again on return.
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach((entry, index) => {
            const el = entry.target
            if (el.classList.contains('rv-in')) return
            el.style.setProperty('--rv-delay', `${Math.min(index, MAX_STEPS) * STEP_MS}ms`)
            el.classList.remove('rv-out')
            el.classList.add('rv-in')
          })

        entries.forEach((entry) => {
          const el = entry.target
          if (entry.isIntersecting || !el.classList.contains('rv-in')) return
          el.classList.remove('rv-in')
          el.classList.add('rv-out')
        })
      },
      // Shrunk at the top and bottom so the fade is visible near the screen edges.
      { rootMargin: '-10% 0px -6% 0px', threshold: 0.05 },
    )

    const seen = new WeakSet()
    const scan = (scope) => {
      const found = scope.matches?.(CANDIDATES) ? [scope] : []
      found.push(...scope.querySelectorAll(CANDIDATES))
      found.forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        if (!isUnit(el) || hasUnitAncestor(el)) return
        el.classList.add('rv')
        io.observe(el)
      })
    }

    scan(root)

    // Content that appears later (filters, lists changing) animates in too.
    let queued = []
    let frame = 0
    const mo = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => node.nodeType === 1 && queued.push(node)),
      )
      if (frame || queued.length === 0) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const nodes = queued
        queued = []
        nodes.forEach((node) => node.isConnected && scan(node))
      })
    })
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      io.disconnect()
    }
  }, [rootRef])
}

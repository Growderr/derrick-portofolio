import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { secondaryNav } from '@/data/routes'
import { EASE_OUT } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * Desktop "Lainnya" disclosure that holds the secondary pages (certificates,
 * testimonials, guestbook, blog), so every page is reachable from the navbar.
 *
 * Keyboard: Enter/Space toggles, Tab moves through the links, Escape closes and
 * returns focus to the button. Clicking outside or tabbing out also closes it.
 * It shares the sliding `nav-active` marker with the primary links.
 */
export default function MoreMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const panelId = useId()
  const { pathname } = useLocation()

  const hasActive = secondaryNav.some(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
  )

  // Always close after navigating.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined

    const closeIfOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeIfOutside)
    document.addEventListener('focusin', closeIfOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', closeIfOutside)
      document.removeEventListener('focusin', closeIfOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="relative flex items-center gap-1 px-3 py-2 text-[0.9375rem] font-semibold"
      >
        {hasActive && (
          <motion.span
            layoutId="nav-active"
            aria-hidden="true"
            className="absolute inset-x-2 bottom-1.5 h-2.5 bg-accent"
            transition={{ duration: 0.3, ease: EASE_OUT }}
          />
        )}
        <span className="relative">Lainnya</span>
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={2.5}
          className={cn('relative transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            className="absolute top-full right-0 z-50 mt-2 w-56 border-2 border-ink bg-paper py-1"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
          >
            {secondaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center gap-3 px-4 py-2 font-semibold transition-colors duration-150 hover:bg-accent hover:text-on-accent',
                      isActive && 'bg-surface',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'block size-2.5 shrink-0',
                          isActive ? 'bg-accent outline outline-2 -outline-offset-2 outline-ink' : 'bg-transparent',
                        )}
                      />
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

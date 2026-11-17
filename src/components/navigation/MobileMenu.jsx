import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, secondaryNav } from '@/data/routes'
import { cn } from '@/lib/cn'

const mainItems = navItems.filter((item) => item.group !== 'secondary')

function MenuLink({ item, onClose, large }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClose}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-4 border-b border-line py-3',
          large ? 'font-display text-4xl font-extrabold tracking-tight' : 'text-xl font-semibold',
          isActive && 'text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden="true"
            className={cn('block size-3 shrink-0', isActive ? 'bg-accent outline outline-2 -outline-offset-2 outline-ink' : 'bg-transparent')}
          />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

/**
 * Full-height menu below the navbar. It is rendered outside the animated
 * <header> so `fixed` positioning is relative to the viewport.
 */
export default function MobileMenu({ open, onClose, onEscape, id }) {
  // While open: Escape closes (and hands focus back via onEscape), page scroll is
  // locked, and the page behind is made inert so Tab cannot wander into it.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') (onEscape ?? onClose)()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const behind = document.querySelectorAll('[data-menu-inert]')
    behind.forEach((element) => {
      element.inert = true
    })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = previousOverflow
      behind.forEach((element) => {
        element.inert = false
      })
    }
  }, [open, onClose, onEscape])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          key="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <nav aria-label="Navigasi seluler" className="mx-auto max-w-page px-5 pt-4 pb-12 sm:px-8">
            <ul>
              {mainItems.map((item) => (
                <li key={item.to}>
                  <MenuLink item={item} onClose={onClose} large />
                </li>
              ))}
            </ul>

            <p className="mt-10 mb-1 font-mono text-xs tracking-wide text-muted uppercase">Lainnya</p>
            <ul>
              {secondaryNav.map((item) => (
                <li key={item.to}>
                  <MenuLink item={item} onClose={onClose} />
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

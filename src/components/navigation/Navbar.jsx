import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from '@/components/layout/Container'
import DesktopNav from '@/components/navigation/DesktopNav'
import MobileMenu from '@/components/navigation/MobileMenu'
import Wordmark from '@/components/navigation/Wordmark'
import { useHideOnScroll } from '@/hooks/useHideOnScroll'
import { EASE_OUT } from '@/lib/motion'

const MENU_ID = 'mobile-menu'

/**
 * Sticky header. It slides away while scrolling down and returns on any
 * upward scroll, on keyboard focus, or while the mobile menu is open.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const scrolledDown = useHideOnScroll()
  const { pathname } = useLocation()
  const menuButtonRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  // Escape: close and return focus to the toggle, so keyboard users keep their place.
  const closeMenuAndRefocus = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  // Always close the menu after navigating.
  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  // Leaving the mobile breakpoint with the menu open would strand the scroll lock.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => event.matches && closeMenu()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [closeMenu])

  const hidden = scrolledDown && !menuOpen && !focused

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 border-b border-line bg-paper print:hidden"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Wordmark onClick={closeMenu} />
          <DesktopNav />

          <button
            ref={menuButtonRef}
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-none lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" size={26} /> : <Menu aria-hidden="true" size={26} />}
          </button>
        </Container>
      </motion.header>

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} onEscape={closeMenuAndRefocus} />
    </>
  )
}

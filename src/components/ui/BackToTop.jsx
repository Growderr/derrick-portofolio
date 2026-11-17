import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { EASE_OUT } from '@/lib/motion'
import { scrollToTop } from '@/lib/scroll'

/**
 * Floating "back to top" button. It fades in after the visitor has scrolled
 * a little, sits above the mobile safe area, and stays below the mobile menu
 * (z-30 vs z-40). Under prefers-reduced-motion the slide is dropped by
 * <MotionConfig reducedMotion="user"> and only the fade remains.
 */
export default function BackToTop() {
  const visible = useScrolledPast(480)

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          data-menu-inert
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-none border-2 border-ink bg-accent text-on-accent transition-colors duration-150 hover:bg-ink hover:text-accent sm:right-8 sm:bottom-[max(2rem,env(safe-area-inset-bottom))] print:hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <ArrowUp aria-hidden="true" size={22} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'

/**
 * Persistent page chrome: skip link, navbar, main landmark, footer and the
 * floating back-to-top button. Elements marked `data-menu-inert` are made
 * inert while the mobile menu is open (see MobileMenu).
 */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
      >
        Lewati ke konten
      </a>
      <Navbar />
      {/* tabIndex -1: programmatic focus target for the skip link and back-to-top. */}
      <main id="main" tabIndex={-1} data-menu-inert className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

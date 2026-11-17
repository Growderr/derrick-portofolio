import { lazy, Suspense } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import PageTransition from '@/components/layout/PageTransition'
import { LoadingState } from '@/components/ui/DataGate'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Skills from '@/pages/Skills'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Certificates from '@/pages/Certificates'
import Experience from '@/pages/Experience'
import Resume from '@/pages/Resume'
import Contact from '@/pages/Contact'
import Guestbook from '@/pages/Guestbook'
import Testimonials from '@/pages/Testimonials'
import Blog from '@/pages/Blog'
import BlogDetail from '@/pages/BlogDetail'
import NotFound from '@/pages/NotFound'

// The admin area is a separate chunk: visitors never download it.
const AdminApp = lazy(() => import('@/admin/AdminApp'))

export default function App() {
  const location = useLocation()

  if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<LoadingState label="Memuat panel admin" />}>
        <AdminApp />
      </Suspense>
    )
  }

  return (
    // "user" honors prefers-reduced-motion for every Framer Motion animation.
    <MotionConfig reducedMotion="user">
      <Layout>
        {/* Scroll to top only after the outgoing page has faded out. */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guestbook" element={<Guestbook />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  )
}

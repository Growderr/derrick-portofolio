import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ExternalLink, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/admin/auth/AuthProvider'
import { countRows } from '@/admin/lib/crud'
import { cn } from '@/lib/cn'

export const adminNav = [
  { to: '/admin/dashboard', label: 'Ringkasan' },
  { to: '/admin/profile', label: 'Profil' },
  { to: '/admin/projects', label: 'Proyek' },
  { to: '/admin/skills', label: 'Keahlian' },
  { to: '/admin/education', label: 'Pendidikan' },
  { to: '/admin/experiences', label: 'Pengalaman' },
  { to: '/admin/certificates', label: 'Sertifikat' },
  { to: '/admin/testimonials', label: 'Testimoni' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/messages', label: 'Pesan', badge: 'messages' },
  { to: '/admin/guestbook', label: 'Buku Tamu', badge: 'guestbook' },
]

/** Admin chrome. Same white / black / yellow language as the public site, laid out as a work tool. */
export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const [badges, setBadges] = useState({})

  useEffect(() => {
    let alive = true
    Promise.all([countRows('contact_messages', { is_read: false }), countRows('guestbook', { is_published: false })])
      .then(([messages, guestbook]) => alive && setBadges({ messages, guestbook }))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="min-h-screen">
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent">
        Lewati ke konten
      </a>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 sm:px-8">
          <p className="flex items-center gap-3 font-display text-lg font-extrabold tracking-tight">
            <span aria-hidden="true" className="block size-3.5 bg-accent outline outline-2 -outline-offset-2 outline-ink" />
            Panel Admin
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden max-w-[16rem] truncate font-mono text-xs text-muted sm:inline" title={user?.email}>
              {user?.email}
            </span>
            <Button size="sm" variant="secondary" href="/" icon={ExternalLink} target="_blank">
              Lihat situs
            </Button>
            <Button size="sm" icon={LogOut} onClick={signOut}>
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Menu admin" className="border-b-2 border-ink lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-r-2 lg:border-b-0">
          <ul className="flex overflow-x-auto lg:block">
            {adminNav.map((item) => (
              <li key={item.to} className="shrink-0 lg:border-b lg:border-line">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-12 items-center justify-between gap-3 px-5 font-semibold whitespace-nowrap hover:bg-surface',
                      isActive && 'bg-accent text-on-accent hover:bg-accent lg:border-l-4 lg:border-ink',
                    )
                  }
                >
                  {item.label}
                  {item.badge && badges[item.badge] > 0 && (
                    <span className="border border-ink bg-paper px-1.5 font-mono text-xs text-ink" aria-label={`${badges[item.badge]} perlu perhatian`}>
                      {badges[item.badge]}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main id="admin-main" tabIndex={-1} className="min-w-0 px-5 py-10 focus:outline-none sm:px-8 lg:px-12">
          <Outlet context={{ setBadges }} />
        </main>
      </div>
    </div>
  )
}

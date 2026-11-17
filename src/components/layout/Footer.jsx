import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Container from '@/components/layout/Container'
import { navItems } from '@/data/routes'
import { useContactLinks, useProfile } from '@/lib/content'
import { scrollToTop } from '@/lib/scroll'

function SocialItem({ label, icon: Icon, url }) {
  const inner = (
    <>
      <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
      <span>{label}</span>
    </>
  )

  if (!url) {
    // Not provided yet: shown, but clearly not a live link.
    return (
      <span className="inline-flex items-center gap-3 text-paper/60" title="Tautan belum ditambahkan">
        {inner}
      </span>
    )
  }

  const isMail = url.startsWith('mailto:')
  return (
    <a
      href={url}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className="inline-flex items-center gap-3 hover:text-accent"
    >
      {inner}
    </a>
  )
}

// Footer order: GitHub, LinkedIn, Instagram, Email.
const socialOrder = ['github', 'linkedin', 'instagram', 'email']

export default function Footer() {
  const year = new Date().getFullYear()
  const profile = useProfile()
  const links = useContactLinks()
  const socials = socialOrder.map((id) => links.find((link) => link.id === id))

  return (
    <footer data-menu-inert className="surface-inverse bg-ink text-paper print:hidden">
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-h2">{profile.name}</p>
          <p className="mt-4 font-mono text-xs tracking-wide text-accent uppercase">{profile.role}</p>
          <p className="text-paper/80">{profile.school}</p>
          <p className="text-paper/80">{profile.location}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="mb-4 border-b border-paper/20 pb-2 font-mono text-xs tracking-wide text-paper/60 uppercase">Halaman</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-block py-1 hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mb-4 border-b border-paper/20 pb-2 font-mono text-xs tracking-wide text-paper/60 uppercase">Temukan saya</p>
          <ul className="space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <SocialItem {...social} />
              </li>
            ))}
          </ul>
          {socials.some((social) => !social.url) && (
            <p className="mt-5 max-w-[16rem] text-sm text-paper/60">
              Placeholder sampai tautan ditambahkan di Panel Admin.
            </p>
          )}
        </div>
      </Container>

      <div className="border-t border-paper/20">
        <Container className="flex flex-col gap-4 py-6 font-mono text-xs text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {profile.name}. Hak cipta dilindungi.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 self-start py-2 hover:text-accent sm:self-auto"
          >
            <ArrowUp aria-hidden="true" size={16} />
            Kembali ke atas
          </button>
        </Container>
      </div>
    </footer>
  )
}

/**
 * Navigation map.
 *  - home:      only appears in the mobile menu and footer
 *  - primary:   shown in the desktop navbar
 *  - secondary: reachable from the mobile menu and footer
 */
export const navItems = [
  { label: 'Beranda', to: '/', group: 'home', end: true },
  { label: 'Tentang', to: '/about', group: 'primary' },
  { label: 'Keahlian', to: '/skills', group: 'primary' },
  { label: 'Proyek', to: '/projects', group: 'primary' },
  { label: 'Pengalaman', to: '/experience', group: 'primary' },
  { label: 'CV', to: '/resume', group: 'primary' },
  { label: 'Kontak', to: '/contact', group: 'primary' },
  { label: 'Sertifikat', to: '/certificates', group: 'secondary' },
  { label: 'Testimoni', to: '/testimonials', group: 'secondary' },
  { label: 'Buku Tamu', to: '/guestbook', group: 'secondary' },
  { label: 'Blog', to: '/blog', group: 'secondary' },
]

export const primaryNav = navItems.filter((item) => item.group === 'primary')
export const secondaryNav = navItems.filter((item) => item.group === 'secondary')

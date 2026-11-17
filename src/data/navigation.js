/**
 * Page-level navigation that is not part of the global navbar.
 * Global routes stay in routes.js.
 */

/** Hero buttons on the home page. */
export const heroActions = [
  { label: 'Lihat Portofolio', to: '/projects', variant: 'primary' },
  { label: 'Lihat CV', to: '/resume', variant: 'secondary' },
  { label: 'Hubungi Saya', to: '/contact', variant: 'text' },
]

/** In-page anchors on /about. `id` must match the section id. */
export const aboutSections = [
  { id: 'biography', label: 'Biografi' },
  { id: 'education', label: 'Pendidikan' },
  { id: 'interests', label: 'Minat' },
  { id: 'organizations', label: 'Organisasi' },
  { id: 'plk', label: 'PLK' },
  { id: 'goals', label: 'Tujuan karier' },
]

/** In-page anchors on /skills. */
export const skillsSections = [
  { id: 'hard-skills', label: 'Keahlian teknis' },
  { id: 'soft-skills', label: 'Soft skill' },
  { id: 'tools', label: 'Alat' },
  { id: 'learning', label: 'Minat belajar' },
]

/** In-page anchors on /experience. */
export const experienceSections = [
  { id: 'journey', label: 'Linimasa' },
  { id: 'plk', label: 'PLK' },
  { id: 'organizations', label: 'Organisasi' },
  { id: 'competitions', label: 'Lomba' },
  { id: 'education', label: 'Pendidikan' },
]

/** In-page anchors on /projects/:slug. */
export const projectDetailSections = [
  { id: 'overview', label: 'Ikhtisar' },
  { id: 'problem-solution', label: 'Masalah & solusi' },
  { id: 'stack', label: 'Teknologi & fitur' },
  { id: 'role', label: 'Peran saya' },
  { id: 'documentation', label: 'Dokumentasi' },
  { id: 'gallery', label: 'Tangkapan layar' },
  { id: 'feedback', label: 'Masukan' },
  { id: 'related', label: 'Terkait' },
]

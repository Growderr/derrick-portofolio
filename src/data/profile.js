/**
 * Single source of truth for personal information.
 * Only facts supplied for the project are filled in. Everything else is null
 * so the UI can show a clear placeholder instead of invented content.
 */
export const profile = {
  name: 'Derrick Adilla Rahman',
  firstName: 'Derrick',
  role: 'Siswa Fullstack Developer',
  school: 'SMKN 2 Banjarmasin',
  className: 'XII PPLG A',
  competency: 'Pengembangan Perangkat Lunak dan Gim',
  competencyShort: 'PPLG',
  location: 'Banjarmasin, Indonesia',

  // Hero headline, one string per line (indents are set in the Hero section).
  headline: ['Merancang', 'dan membangun', 'pengalaman', 'digital.'],

  // Personal branding statement, as supplied.
  brand:
    'Siswa yang antusias terhadap teknologi, pengembangan perangkat lunak, dan pembuatan pengalaman digital yang bermakna.',

  // Short hero introduction. Edit freely.
  intro:
    'Saya belajar pengembangan perangkat lunak di SMKN 2 Banjarmasin dan senang mengubah ide menjadi website dan aplikasi yang benar-benar dapat digunakan orang.',

  // Placeholders: fill these in later.
  email: null,
}

/** Kept for pages that still show a placeholder when `profile.intro` is empty. */
export const introPlaceholder =
  'Perkenalan akan ditambahkan. Tulis dua atau tiga kalimat tentang diri Anda di src/data/profile.js.'

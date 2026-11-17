import { projects } from '@/data/projects'

/**
 * Home page content that is not personal identity (see profile.js for that).
 */

export const introStatement =
  'Saya suka memahami cara kerja perangkat lunak, lalu memanfaatkannya untuk membuat sesuatu yang berguna bagi orang lain.'

export const introParagraphs = [
  'Saya berada di tahun terakhir PPLG di SMKN 2 Banjarmasin. Saya tertarik pada kedua sisi aplikasi web: frontend, tempat keputusan desain menjadi sesuatu yang dapat digunakan orang, dan backend, tempat logika serta data berada. Bekerja di keduanya membuat saya tertarik pada pengembangan fullstack.',
  'Teknologi terus berubah, jadi saya menganggap belajar sebagai bagian dari pekerjaan. Tujuan saya sederhana: membuat produk digital yang menyelesaikan masalah nyata bagi orang-orang, dan menjadi lebih baik di setiap proyek.',
]

/**
 * Technical interests preview. `items` is empty on purpose: add technology
 * names here (strings) and they appear automatically. No proficiency levels.
 * Later phases can replace this with data from the Skills page.
 */
export const skillsPreview = [
  {
    title: 'Frontend',
    description: 'Antarmuka, tata letak, responsivitas, dan aksesibilitas.',
    items: [],
  },
  {
    title: 'Backend',
    description: 'Logika aplikasi, data, dan API.',
    items: [],
  },
  {
    title: 'Desain UI/UX',
    description: 'Tampilan produk dan kenyamanan saat menggunakannya.',
    items: [],
  },
  {
    title: 'Rekayasa perangkat lunak',
    description: 'Menjaga kode dan proyek tetap rapi serta mudah dirawat.',
    items: [],
  },
]

/**
 * Featured projects for the home page: every published project with `featured: true`.
 * Takes the project list so it works with data from the database too.
 */
export function buildFeaturedProjects(list) {
  return list
    .filter((project) => project.featured)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      tech: project.tech ?? [],
      image: (project.thumbnail ?? project.screenshots?.[0])?.src,
      imageAlt: (project.thumbnail ?? project.screenshots?.[0])?.alt,
    }))
}

/** Local fallback (used when Supabase is not configured). */
export const featuredProjects = buildFeaturedProjects(projects)

/** How many slots the home page shows. */
export const FEATURED_SLOT_COUNT = 3

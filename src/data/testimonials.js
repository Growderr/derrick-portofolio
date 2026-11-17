/**
 * Testimonials, shown on /testimonials.
 *
 * Empty on purpose: only real feedback, used with the person's permission,
 * belongs here. Until then the page shows an empty state.
 *
 * Shape of one entry (only `id` and `category` are required, every other
 * field may be null and then renders as a dashed placeholder):
 *
 *   {
 *     id: 'unique-slug',
 *     name: 'Person’s name',
 *     role: 'Role or relationship',
 *     organization: 'Organization or school',
 *     message: 'The feedback, in their words.',
 *     avatar: '/images/testimonials/name.jpg', // optional, initials are shown without it
 *     category: 'teacher',                      // an id from testimonialCategories below
 *   }
 *
 * Put avatar files in public/images/testimonials/.
 */

/** Groups, in the order they appear on the page. */
export const testimonialCategories = [
  {
    id: 'teacher',
    label: 'Guru pembimbing',
    description: 'Masukan dari guru yang membimbing pekerjaan saya.',
  },
  {
    id: 'plk',
    label: 'Instansi PLK',
    description: 'Kesan dari Kantor Kecamatan Anjir Muara, tempat saya menjalani PLK.',
  },
  {
    id: 'user',
    label: 'Pengguna proyek',
    description: 'Tanggapan dari orang-orang yang menggunakan karya saya.',
  },
  {
    id: 'friend',
    label: 'Teman',
    description: 'Dari teman sekelas dan teman yang pernah bekerja sama dengan saya.',
  },
]

export const testimonials = []

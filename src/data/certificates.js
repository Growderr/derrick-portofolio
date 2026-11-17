/**
 * Certificates and achievements, shown on /certificates.
 *
 * Empty on purpose: nothing is listed until a real certificate is added, and
 * the page shows an empty state until then. Do not add entries that cannot be
 * verified.
 *
 * Shape of one entry (only `id` and `category` are required, every other
 * field may be null and then renders as a dashed placeholder):
 *
 *   {
 *     id: 'unique-slug',
 *     title: 'Certificate or achievement title',
 *     issuer: 'Issuer or organizer',
 *     date: '2026-07',            // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'
 *     category: 'course',         // an id from certificateCategories below
 *     description: 'One or two sentences.',
 *     image: { src: '/images/certificates/example.jpg', alt: 'Describe the certificate' },
 *     documentUrl: '/images/certificates/example.pdf', // optional PDF or link
 *   }
 *
 * Put image files in public/images/certificates/ and reference them with a
 * path that starts with /images/certificates/.
 */

/** Filter categories. Only categories that have entries appear in the filter. */
export const certificateCategories = [
  { id: 'course', label: 'Kursus' },
  { id: 'competition', label: 'Lomba' },
  { id: 'achievement', label: 'Prestasi' },
  { id: 'training', label: 'Pelatihan' },
  { id: 'organization', label: 'Organisasi' },
]

export const certificates = []

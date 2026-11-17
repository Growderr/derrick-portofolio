/**
 * About page content. Anything set to null or [] renders as a clearly
 * labelled placeholder or empty state. Nothing here is invented.
 */

/** Biography, refined from the supplied text (no added facts). */
export const biography = [
  'Derrick Adilla Rahman adalah siswa kelas XII PPLG A di SMKN 2 Banjarmasin yang memiliki ketertarikan pada dunia teknologi, khususnya pengembangan perangkat lunak dan website.',
  'Ia terus mengembangkan kemampuan di bidang frontend dan backend development, serta tertarik mempelajari bagaimana teknologi dapat dimanfaatkan untuk membangun solusi digital yang bermanfaat.',
]

/** Education now lives in src/data/education.js (shared with /experience). */
export { education } from './education'

/** Areas of interest. Descriptions are short and editable; they are not skill ratings. */
export const interests = [
  {
    title: 'Pengembangan Frontend',
    description:
      'Bagian website yang dilihat dan disentuh pengguna: tata letak, interaksi, responsivitas, dan aksesibilitas.',
  },
  {
    title: 'Pengembangan Backend',
    description: 'Logika, data, dan API yang membuat aplikasi berjalan di balik antarmuka.',
  },
  {
    title: 'Pengembangan Fullstack',
    description: 'Menghubungkan kedua sisi menjadi satu produk utuh, dari antarmuka hingga basis data.',
  },
  {
    title: 'Pengembangan Aplikasi Web',
    description: 'Aplikasi interaktif yang berjalan di peramban, lebih dari sekadar halaman statis.',
  },
  {
    title: 'Desain UI/UX',
    description: 'Merencanakan tampilan produk dan kenyamanan saat menggunakannya.',
  },
  {
    title: 'Rekayasa Perangkat Lunak',
    description: 'Menyusun kode dan proyek agar tetap mudah dibaca dan dirawat.',
  },
]

/** Organizations and PLK now live in src/data/experiences.js (shared with /experience). */
export { plk, organizations } from './experiences'

export const careerStatement =
  'Saya ingin berkembang sebagai pengembang perangkat lunak dan membuat produk digital yang benar-benar bermanfaat bagi penggunanya.'

export const careerGoals = [
  {
    title: 'Menjadi fullstack developer yang andal',
    description:
      'Membangun kemampuan yang kuat di frontend dan backend, serta memahami bagaimana keduanya saling terhubung.',
  },
  {
    title: 'Mengembangkan solusi perangkat lunak nyata',
    description: 'Beralih dari latihan menuju perangkat lunak yang menyelesaikan masalah nyata bagi pengguna sesungguhnya.',
  },
  {
    title: 'Terus belajar',
    description: 'Tetap penasaran seiring perubahan alat dan praktik, serta berkembang di setiap proyek.',
  },
  {
    title: 'Membuat produk digital yang bermanfaat',
    description: 'Peduli pada kegunaan dan kemudahan penggunaan, bukan hanya pada apakah sesuatu berfungsi.',
  },
]

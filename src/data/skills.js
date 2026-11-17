/**
 * Skills page content. EDIT THIS FILE to change anything on /skills.
 *
 * `value` is a SELF-ASSESSED learning indicator from 0 to 100. It is not a test
 * score or a verified measurement. All values below are reasonable PLACEHOLDERS
 * until Derrick confirms his own numbers. Nothing is rated as expert.
 *
 * `icon` is a key from src/lib/skillIcons.js (Lucide icons).
 */

export const skillsIntro = {
  title: 'Keahlian, Alat & Kemampuan.',
  description:
    'Saya seorang siswa pengembang yang menyukai kedua sisi aplikasi web: antarmuka yang digunakan orang dan logika di baliknya. Halaman ini memuat apa saja yang saya kerjakan, seberapa nyaman saya saat ini dengan masing-masing, dan ke mana saya ingin berkembang berikutnya.',
  // Shown next to the numbers so they are never read as official measurements.
  scaleNote:
    'Persentase adalah perkiraan saya sendiri tentang sejauh mana saya mempelajari setiap keahlian. Angka ini bukan hasil tes dan akan berubah seiring saya berlatih.',
}

/** Words shown next to a percentage. A value belongs to the highest `min` it reaches. */
export const skillLevels = [
  { min: 0, label: 'Menjajaki', range: '0 sampai 39' },
  { min: 40, label: 'Sedang belajar', range: '40 sampai 59' },
  { min: 60, label: 'Cukup nyaman', range: '60 sampai 79' },
  { min: 80, label: 'Percaya diri', range: '80 sampai 100' },
]

/** Hard skills, grouped. Order here is the order on the page. */
export const skillCategories = [
  {
    id: 'frontend',
    title: 'Pengembangan Frontend',
    description: 'Membangun antarmuka yang dilihat, disentuh, dan dibaca pengguna.',
    items: [
      { name: 'HTML', value: 75, icon: 'html' },
      { name: 'CSS', value: 70, icon: 'css' },
      { name: 'JavaScript', value: 60, icon: 'javascript' },
      { name: 'React.js', value: 55, icon: 'react' },
      { name: 'Tailwind CSS', value: 65, icon: 'tailwind' },
    ],
  },
  {
    id: 'backend',
    title: 'Pengembangan Backend',
    description: 'Logika aplikasi dan tempat data disimpan.',
    items: [
      { name: 'PHP', value: 50, icon: 'php' },
      { name: 'MySQL', value: 50, icon: 'mysql' },
      { name: 'Supabase', value: 40, icon: 'supabase' },
    ],
  },
  {
    id: 'tools',
    title: 'Pemrograman & Alat',
    description: 'Kontrol versi dan editor tempat pekerjaan dilakukan.',
    items: [
      { name: 'Git', value: 55, icon: 'git' },
      { name: 'GitHub', value: 55, icon: 'github' },
      { name: 'VS Code', value: 70, icon: 'vscode' },
    ],
  },
  {
    id: 'design',
    title: 'Desain',
    description: 'Merencanakan tampilan produk dan kenyamanan saat menggunakannya.',
    items: [
      { name: 'Desain UI/UX', value: 55, icon: 'uiux' },
      { name: 'Figma', value: 50, icon: 'figma' },
    ],
  },
]

/** Learning interests. Interests only: no proficiency is implied. Placeholders, edit freely. */
export const learningInterests = [
  { title: 'Pengembangan fullstack', description: 'Menghubungkan antarmuka, logika, dan basis data menjadi satu produk.' },
  { title: 'Arsitektur aplikasi web', description: 'Menyusun aplikasi yang lebih besar agar tetap mudah dirawat.' },
  { title: 'Perancangan basis data', description: 'Memodelkan data agar andal dan mudah diakses.' },
  { title: 'Aksesibilitas web', description: 'Membuat antarmuka dapat digunakan oleh lebih banyak orang.' },
  { title: 'Riset UI/UX', description: 'Mempelajari bagaimana orang benar-benar menggunakan hasil karya.' },
  { title: 'Pengujian perangkat lunak', description: 'Menemukan masalah sebelum pengguna menemukannya.' },
]

/** Category headings without their items. Used when skills come from the database. */
export const skillCategoryDefs = skillCategories.map(({ id, title, description }) => ({ id, title, description }))

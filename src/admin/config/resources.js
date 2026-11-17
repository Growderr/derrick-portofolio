import { blogCategories } from '@/data/blog'
import { certificateCategories } from '@/data/certificates'
import { projectCategories } from '@/data/projects'
import { skillCategoryDefs } from '@/data/skills'
import { testimonialCategories } from '@/data/testimonials'

/**
 * One definition per managed table. The generic ResourcePage and ContentForm
 * build the list, the form, validation and saving from these, so adding a
 * field means adding one line here (plus a column in the SQL).
 *
 * field.type: text | textarea | number | select | checkbox | url | email | slug |
 *   date | partial-date | lines | paragraphs | objects | image | gallery |
 *   url-or-file | blocks | relation
 */
const options = (list) => list.map(({ id, label }) => ({ value: id, label }))
const today = () => new Date().toISOString().slice(0, 10)

const publish = {
  name: 'is_published',
  label: 'Tampilkan di situs',
  type: 'checkbox',
  group: 'Publikasi',
  hint: 'Matikan untuk menyembunyikan dari pengunjung tanpa menghapus.',
  default: true,
}
const order = {
  name: 'sort_order',
  label: 'Urutan',
  type: 'number',
  group: 'Publikasi',
  width: 'half',
  min: 0,
  max: 100000,
  default: 0,
  hint: 'Angka kecil tampil lebih dulu.',
}
const statusFilter = {
  key: 'is_published',
  label: 'Status',
  options: [
    { value: 'true', label: 'Terbit' },
    { value: 'false', label: 'Draf' },
  ],
}

export const projectsConfig = {
  key: 'projects',
  table: 'projects',
  cache: 'projects',
  title: 'Proyek',
  singular: 'proyek',
  description: 'Karya yang tampil di halaman Proyek dan Beranda.',
  searchColumns: ['title', 'slug'],
  orderBy: [['sort_order', true], ['created_at', false]],
  columns: [
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori', options: options(projectCategories) },
    { key: 'year', label: 'Tahun' },
  ],
  filters: [{ key: 'category', label: 'Kategori', options: options(projectCategories) }, statusFilter],
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true, max: 160, group: 'Dasar' },
    { name: 'slug', label: 'Slug (alamat halaman)', type: 'slug', from: 'title', required: true, max: 120, group: 'Dasar', width: 'half', hint: 'Dipakai di /projects/slug. Huruf kecil dan tanda hubung.' },
    { name: 'category', label: 'Kategori', type: 'select', required: true, options: options(projectCategories), group: 'Dasar', width: 'half', default: 'web-app' },
    { name: 'description', label: 'Deskripsi singkat', type: 'textarea', rows: 3, required: true, max: 600, group: 'Dasar', hint: 'Tampil di kartu galeri.' },
    { name: 'year', label: 'Tahun', type: 'text', max: 4, group: 'Dasar', width: 'half', pattern: /^\d{4}$/, patternMessage: 'Gunakan 4 angka, contoh 2026.' },
    { name: 'progress_status', label: 'Status pengerjaan', type: 'text', max: 40, group: 'Dasar', width: 'half', placeholder: 'Selesai, Dalam pengerjaan…' },
    { name: 'featured', label: 'Tampilkan sebagai proyek pilihan di Beranda', type: 'checkbox', group: 'Dasar' },
    { name: 'experience_id', label: 'Dikerjakan saat pengalaman', type: 'relation', table: 'experiences', labelColumn: 'title', group: 'Dasar', hint: 'Opsional, misalnya PLK.' },
    { name: 'thumbnail', label: 'Gambar sampul', type: 'image', bucket: 'project-images', folder: 'thumbnails', ratio: 'aspect-[16/10]', group: 'Gambar', hint: 'Rasio 16:10 paling pas.' },
    { name: 'screenshots', label: 'Tangkapan layar', type: 'gallery', bucket: 'project-images', folder: 'screenshots', maxItems: 20, group: 'Gambar' },
    { name: 'tech', label: 'Teknologi', type: 'lines', maxItems: 30, maxItem: 40, group: 'Isi', hint: 'Satu teknologi per baris.' },
    { name: 'overview', label: 'Ringkasan', type: 'textarea', rows: 6, max: 6000, group: 'Isi', hint: 'Baris kosong memulai paragraf baru.' },
    { name: 'objectives', label: 'Tujuan', type: 'lines', maxItems: 20, group: 'Isi' },
    { name: 'problem', label: 'Masalah', type: 'textarea', rows: 4, max: 3000, group: 'Isi' },
    { name: 'solution', label: 'Solusi', type: 'textarea', rows: 4, max: 3000, group: 'Isi' },
    { name: 'features', label: 'Fitur', type: 'lines', maxItems: 30, group: 'Isi' },
    { name: 'role', label: 'Peran saya', type: 'text', max: 160, group: 'Peran' },
    { name: 'contributions', label: 'Kontribusi', type: 'lines', maxItems: 30, group: 'Peran' },
    {
      name: 'documentation',
      label: 'Catatan pengembangan',
      type: 'objects',
      itemLabel: 'catatan',
      maxItems: 20,
      group: 'Peran',
      itemFields: [
        { name: 'title', label: 'Judul', type: 'text', required: true, max: 120 },
        { name: 'body', label: 'Isi', type: 'textarea', rows: 5, required: true, max: 4000 },
      ],
    },
    { name: 'docs_url', label: 'Tautan dokumentasi', type: 'url', group: 'Tautan', width: 'half' },
    { name: 'demo_url', label: 'Tautan demo', type: 'url', group: 'Tautan', width: 'half' },
    { name: 'github_url', label: 'Tautan GitHub', type: 'url', group: 'Tautan', width: 'half' },
    {
      name: 'feedback',
      label: 'Masukan pengguna',
      type: 'objects',
      itemLabel: 'masukan',
      maxItems: 20,
      group: 'Masukan',
      hint: 'Hanya masukan asli dari orangnya langsung.',
      itemFields: [
        { name: 'quote', label: 'Isi masukan', type: 'textarea', rows: 3, required: true, max: 1000 },
        { name: 'name', label: 'Nama', type: 'text', required: true, max: 120 },
        { name: 'role', label: 'Peran atau hubungan', type: 'text', max: 160 },
      ],
    },
    { name: 'related', label: 'Proyek terkait (slug)', type: 'lines', maxItems: 10, group: 'Masukan', hint: 'Opsional. Satu slug per baris; kosongkan agar dipilih otomatis.' },
    order,
    publish,
  ],
}

export const skillsConfig = {
  key: 'skills',
  table: 'skills',
  cache: 'skills',
  title: 'Keahlian',
  singular: 'keahlian',
  description: 'Keahlian teknis dan soft skill. Nilai adalah penilaian mandiri, bukan tingkat keahlian.',
  searchColumns: ['name', 'slug'],
  orderBy: [['kind', true], ['sort_order', true]],
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'kind', label: 'Jenis', options: [{ value: 'hard', label: 'Teknis' }, { value: 'soft', label: 'Soft skill' }] },
    { key: 'value', label: 'Nilai' },
  ],
  filters: [
    { key: 'kind', label: 'Jenis', options: [{ value: 'hard', label: 'Teknis' }, { value: 'soft', label: 'Soft skill' }] },
    statusFilter,
  ],
  fields: [
    { name: 'kind', label: 'Jenis', type: 'select', required: true, options: [{ value: 'hard', label: 'Keahlian teknis' }, { value: 'soft', label: 'Soft skill' }], group: 'Dasar', width: 'half', default: 'hard' },
    { name: 'category', label: 'Kategori', type: 'select', required: true, options: options(skillCategoryDefs.map(({ id, title }) => ({ id, label: title }))), group: 'Dasar', width: 'half', showIf: (v) => v.kind === 'hard', default: 'frontend' },
    { name: 'name', label: 'Nama', type: 'text', required: true, max: 80, group: 'Dasar' },
    {
      name: 'slug',
      label: 'Slug',
      type: 'slug',
      from: 'name',
      required: true,
      max: 120,
      group: 'Dasar',
      width: 'half',
      hint: 'Harus unik. Untuk soft skill, awali dengan "soft-".',
    },
    { name: 'value', label: 'Nilai (0 sampai 100)', type: 'number', required: true, min: 0, max: 100, group: 'Dasar', width: 'half', default: 50 },
    { name: 'icon', label: 'Ikon', type: 'select', group: 'Dasar', width: 'half', showIf: (v) => v.kind === 'hard', options: ['html', 'css', 'javascript', 'react', 'tailwind', 'php', 'mysql', 'supabase', 'git', 'github', 'vscode', 'uiux', 'figma'].map((value) => ({ value, label: value })) },
    { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3, max: 400, group: 'Dasar', showIf: (v) => v.kind === 'soft' },
    order,
    publish,
  ],
  defaults: { kind: 'hard', category: 'frontend', value: 50 },
}

export const educationConfig = {
  key: 'education',
  table: 'education',
  cache: 'education',
  title: 'Pendidikan',
  singular: 'riwayat pendidikan',
  description: 'Riwayat pendidikan, dari yang terbaru. Kosongkan nama sekolah untuk menampilkan placeholder.',
  searchColumns: ['school', 'slug'],
  orderBy: [['sort_order', true], ['created_at', false]],
  columns: [
    { key: 'school', label: 'Sekolah', empty: 'Belum diisi' },
    { key: 'period', label: 'Periode' },
  ],
  filters: [statusFilter],
  fields: [
    { name: 'school', label: 'Nama sekolah', type: 'text', max: 200, group: 'Dasar' },
    { name: 'slug', label: 'Slug', type: 'slug', required: true, from: 'school', max: 120, group: 'Dasar', width: 'half' },
    { name: 'period', label: 'Periode', type: 'text', max: 80, group: 'Dasar', width: 'half', placeholder: '2023 sampai sekarang' },
    { name: 'current', label: 'Pendidikan saat ini', type: 'checkbox', group: 'Dasar' },
    { name: 'lines', label: 'Detail (jenjang, jurusan, dll.)', type: 'lines', maxItems: 10, group: 'Dasar' },
    { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 4, max: 1000, group: 'Dasar' },
    { name: 'tags', label: 'Tag', type: 'lines', maxItems: 20, maxItem: 40, group: 'Dasar' },
    order,
    publish,
  ],
}

const experienceTypes = [
  { value: 'plk', label: 'PLK' },
  { value: 'organization', label: 'Organisasi' },
  { value: 'competition', label: 'Lomba' },
]
const docGallery = { name: 'documentation', label: 'Dokumentasi', type: 'gallery', bucket: 'project-images', folder: 'experiences', maxItems: 12, group: 'Dokumentasi' }

export const experiencesConfig = {
  key: 'experiences',
  table: 'experiences',
  cache: 'experiences',
  title: 'Pengalaman',
  singular: 'pengalaman',
  description: 'PLK, organisasi, dan lomba. Halaman Pengalaman menampilkan PLK pertama yang terbit.',
  searchColumns: ['title', 'slug'],
  orderBy: [['type', true], ['sort_order', true]],
  columns: [
    { key: 'title', label: 'Judul' },
    { key: 'type', label: 'Jenis', options: experienceTypes },
    { key: 'period', label: 'Periode' },
  ],
  filters: [{ key: 'type', label: 'Jenis', options: experienceTypes }, statusFilter],
  fields: [
    { name: 'type', label: 'Jenis', type: 'select', required: true, options: experienceTypes, group: 'Dasar', width: 'half', default: 'organization' },
    { name: 'title', label: 'Instansi / organisasi / nama lomba', type: 'text', required: true, max: 200, group: 'Dasar' },
    { name: 'slug', label: 'Slug', type: 'slug', from: 'title', required: true, max: 120, group: 'Dasar', width: 'half' },
    { name: 'role', label: 'Posisi / jabatan', type: 'text', max: 160, group: 'Dasar', width: 'half', showIf: (v) => v.type !== 'competition' },
    { name: 'organizer', label: 'Penyelenggara', type: 'text', max: 160, group: 'Dasar', width: 'half', showIf: (v) => v.type === 'competition' },
    { name: 'period', label: 'Periode / tanggal', type: 'text', max: 80, group: 'Dasar', width: 'half', placeholder: 'Jan sampai Mar 2026' },
    { name: 'category', label: 'Kategori peserta', type: 'text', max: 80, group: 'Dasar', width: 'half', showIf: (v) => v.type === 'competition' },
    { name: 'result', label: 'Hasil atau prestasi', type: 'text', max: 200, group: 'Dasar', width: 'half', showIf: (v) => v.type === 'competition' },
    { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 5, max: 2000, group: 'Dasar' },
    { name: 'responsibilities', label: 'Tanggung jawab', type: 'lines', maxItems: 30, group: 'Rincian', showIf: (v) => v.type !== 'competition' },
    { name: 'activities', label: 'Kegiatan', type: 'lines', maxItems: 30, group: 'Rincian', showIf: (v) => v.type === 'plk' },
    { name: 'technologies', label: 'Teknologi', type: 'lines', maxItems: 30, maxItem: 40, group: 'Rincian', showIf: (v) => v.type === 'plk' },
    { name: 'tags', label: 'Tag', type: 'lines', maxItems: 20, maxItem: 40, group: 'Rincian' },
    docGallery,
    order,
    publish,
  ],
  defaults: { type: 'organization' },
}

export const certificatesConfig = {
  key: 'certificates',
  table: 'certificates',
  cache: 'certificates',
  title: 'Sertifikat',
  singular: 'sertifikat',
  description: 'Sertifikat dan pencapaian. Hanya yang sudah dikonfirmasi yang perlu ditampilkan.',
  searchColumns: ['title', 'issuer', 'slug'],
  orderBy: [['issued_on', false], ['created_at', false]],
  columns: [
    { key: 'title', label: 'Judul' },
    { key: 'issuer', label: 'Penerbit' },
    { key: 'issued_on', label: 'Tanggal' },
  ],
  filters: [{ key: 'category', label: 'Kategori', options: options(certificateCategories) }, statusFilter],
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true, max: 200, group: 'Dasar' },
    { name: 'slug', label: 'Slug', type: 'slug', from: 'title', required: true, max: 120, group: 'Dasar', width: 'half' },
    { name: 'category', label: 'Kategori', type: 'select', required: true, options: options(certificateCategories), group: 'Dasar', width: 'half', default: 'course' },
    { name: 'issuer', label: 'Penerbit atau penyelenggara', type: 'text', max: 160, group: 'Dasar', width: 'half' },
    { name: 'issued_on', label: 'Tanggal terbit', type: 'partial-date', max: 10, group: 'Dasar', width: 'half', placeholder: '2026-03', hint: 'Format 2026, 2026-03, atau 2026-03-15.' },
    { name: 'description', label: 'Deskripsi singkat', type: 'textarea', rows: 3, max: 1000, group: 'Dasar' },
    { name: 'experience_id', label: 'Terkait pengalaman', type: 'relation', table: 'experiences', labelColumn: 'title', group: 'Dasar', hint: 'Opsional.' },
    { name: 'image', label: 'Gambar sertifikat', type: 'image', bucket: 'certificates', folder: 'images', ratio: 'aspect-[4/3]', group: 'Berkas' },
    { name: 'document_url', label: 'Tautan dokumen (PDF)', type: 'url-or-file', bucket: 'certificates', folder: 'documents', group: 'Berkas', hint: 'Tempel tautan, atau unggah file PDF.' },
    order,
    publish,
  ],
}

export const testimonialsConfig = {
  key: 'testimonials',
  table: 'testimonials',
  cache: 'testimonials',
  title: 'Testimoni',
  singular: 'testimoni',
  description: 'Hanya masukan asli, dengan izin pemberinya.',
  searchColumns: ['name', 'organization', 'message'],
  orderBy: [['category', true], ['sort_order', true]],
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'category', label: 'Kelompok', options: options(testimonialCategories) },
    { key: 'organization', label: 'Asal' },
  ],
  filters: [{ key: 'category', label: 'Kelompok', options: options(testimonialCategories) }, statusFilter],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true, max: 120, group: 'Dasar', width: 'half' },
    { name: 'category', label: 'Kelompok', type: 'select', required: true, options: options(testimonialCategories), group: 'Dasar', width: 'half', default: 'friend' },
    { name: 'role', label: 'Peran atau hubungan', type: 'text', max: 160, group: 'Dasar', width: 'half' },
    { name: 'organization', label: 'Organisasi atau sekolah', type: 'text', max: 160, group: 'Dasar', width: 'half' },
    { name: 'message', label: 'Isi testimoni', type: 'textarea', rows: 5, required: true, max: 1500, group: 'Dasar', hint: 'Dengan kata-kata pemberinya sendiri.' },
    { name: 'project_id', label: 'Terkait proyek', type: 'relation', table: 'projects', labelColumn: 'title', group: 'Dasar', hint: 'Opsional.' },
    { name: 'avatar', label: 'Foto (opsional)', type: 'image', bucket: 'profile-photos', folder: 'testimonials', ratio: 'aspect-square', group: 'Foto' },
    order,
    publish,
  ],
}

export const blogConfig = {
  key: 'blog',
  table: 'blog_posts',
  cache: 'blog',
  title: 'Blog',
  singular: 'artikel',
  description: 'Artikel baru berstatus draf sampai Anda menerbitkannya.',
  searchColumns: ['title', 'slug', 'description'],
  orderBy: [['created_at', false]],
  columns: [
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori', options: options(blogCategories) },
    { key: 'published_on', label: 'Tanggal terbit', empty: 'Belum terbit' },
  ],
  filters: [{ key: 'category', label: 'Kategori', options: options(blogCategories) }, statusFilter],
  statusLabels: ['Terbit', 'Draf'],
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true, max: 200, group: 'Dasar' },
    { name: 'slug', label: 'Slug', type: 'slug', from: 'title', required: true, max: 120, group: 'Dasar', width: 'half' },
    { name: 'category', label: 'Kategori', type: 'select', required: true, options: options(blogCategories), group: 'Dasar', width: 'half', default: 'learning' },
    { name: 'description', label: 'Deskripsi singkat', type: 'textarea', rows: 3, required: true, max: 500, group: 'Dasar' },
    { name: 'published_on', label: 'Tanggal terbit', type: 'date', group: 'Dasar', width: 'half', hint: 'Kosong = hari ini saat diterbitkan.' },
    { name: 'reading_time', label: 'Waktu baca (menit)', type: 'number', min: 1, max: 240, nullable: true, group: 'Dasar', width: 'half', hint: 'Kosong = dihitung otomatis.' },
    { name: 'cover', label: 'Gambar sampul', type: 'image', bucket: 'blog-images', folder: 'covers', ratio: 'aspect-[16/10]', group: 'Sampul' },
    { name: 'content', label: 'Isi artikel', type: 'blocks', bucket: 'blog-images', group: 'Isi', hint: 'Susun artikel dari blok: paragraf, judul bagian, daftar, kutipan, kode, gambar.' },
    {
      name: 'is_published',
      label: 'Terbitkan artikel',
      type: 'checkbox',
      group: 'Publikasi',
      hint: 'Artikel hanya tampil di situs saat diterbitkan. Matikan untuk menyembunyikannya kembali.',
      default: false,
    },
  ],
  defaults: { is_published: false },
  /** Fills the publish date the first time an article goes live. */
  beforeSave(payload) {
    if (payload.is_published && !payload.published_on) return { ...payload, published_on: today() }
    return payload
  },
  /** Used by the quick publish toggle in the list. */
  publishPatch(row, next) {
    return next && !row.published_on ? { is_published: true, published_on: today() } : { is_published: next }
  },
}

export const resourceConfigs = {
  projects: projectsConfig,
  skills: skillsConfig,
  education: educationConfig,
  experiences: experiencesConfig,
  certificates: certificatesConfig,
  testimonials: testimonialsConfig,
  blog: blogConfig,
}

export const profileFields = [
  { name: 'name', label: 'Nama lengkap', type: 'text', required: true, max: 120, group: 'Identitas', width: 'half' },
  { name: 'first_name', label: 'Nama panggilan', type: 'text', max: 60, group: 'Identitas', width: 'half' },
  { name: 'role', label: 'Peran', type: 'text', max: 120, group: 'Identitas', hint: 'Contoh: Pelajar RPL' },
  { name: 'school', label: 'Sekolah', type: 'text', max: 160, group: 'Identitas', width: 'half' },
  { name: 'class_name', label: 'Kelas', type: 'text', max: 60, group: 'Identitas', width: 'half' },
  { name: 'competency', label: 'Kompetensi keahlian', type: 'text', max: 200, group: 'Identitas', width: 'half' },
  { name: 'competency_short', label: 'Singkatan kompetensi', type: 'text', max: 30, group: 'Identitas', width: 'half' },
  { name: 'location', label: 'Lokasi', type: 'text', max: 120, group: 'Identitas' },
  { name: 'avatar', label: 'Foto profil', type: 'image', bucket: 'profile-photos', folder: 'profile', ratio: 'aspect-[4/5]', group: 'Foto', hint: 'Potret 4:5 paling pas.' },
  { name: 'headline', label: 'Judul beranda (satu baris per baris judul)', type: 'lines', maxItems: 8, maxItem: 60, rows: 4, group: 'Beranda', hint: 'Empat baris paling pas dengan tata letak beranda.' },
  { name: 'intro', label: 'Kalimat pengantar beranda', type: 'textarea', rows: 3, max: 800, group: 'Beranda' },
  { name: 'brand', label: 'Ringkasan diri', type: 'textarea', rows: 3, max: 600, group: 'Beranda', hint: 'Tampil di halaman Tentang Saya dan CV.' },
  { name: 'intro_statement', label: 'Kalimat perkenalan besar', type: 'textarea', rows: 3, max: 400, group: 'Beranda' },
  { name: 'intro_paragraphs', label: 'Paragraf perkenalan', type: 'paragraphs', maxItems: 10, group: 'Beranda' },
  { name: 'biography', label: 'Biografi singkat', type: 'paragraphs', maxItems: 10, group: 'Tentang Saya' },
  { name: 'interests', label: 'Minat & teknologi', type: 'objects', itemLabel: 'minat', maxItems: 20, group: 'Tentang Saya', itemFields: [{ name: 'title', label: 'Judul', type: 'text', required: true, max: 80 }, { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3, required: true, max: 400 }] },
  { name: 'career_statement', label: 'Kalimat tujuan karier', type: 'textarea', rows: 3, max: 400, group: 'Tentang Saya' },
  { name: 'career_goals', label: 'Tujuan karier', type: 'objects', itemLabel: 'tujuan', maxItems: 12, group: 'Tentang Saya', itemFields: [{ name: 'title', label: 'Judul', type: 'text', required: true, max: 80 }, { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3, required: true, max: 400 }] },
  { name: 'learning_interests', label: 'Minat belajar', type: 'objects', itemLabel: 'minat belajar', maxItems: 20, group: 'Keahlian', itemFields: [{ name: 'title', label: 'Judul', type: 'text', required: true, max: 80 }, { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3, required: true, max: 400 }] },
  { name: 'email', label: 'Email', type: 'email', max: 254, group: 'Kontak', width: 'half' },
  { name: 'cv_url', label: 'Tautan CV (PDF)', type: 'url', group: 'Kontak', width: 'half', hint: 'Opsional. Kosong = tombol Unduh membuka dialog cetak.' },
  { name: 'github_url', label: 'GitHub: tautan', type: 'url', group: 'Kontak', width: 'half' },
  { name: 'github_handle', label: 'GitHub: nama tampilan', type: 'text', max: 80, group: 'Kontak', width: 'half', placeholder: '@username' },
  { name: 'instagram_url', label: 'Instagram: tautan', type: 'url', group: 'Kontak', width: 'half' },
  { name: 'instagram_handle', label: 'Instagram: nama tampilan', type: 'text', max: 80, group: 'Kontak', width: 'half' },
  { name: 'linkedin_url', label: 'LinkedIn: tautan', type: 'url', group: 'Kontak', width: 'half' },
  { name: 'linkedin_handle', label: 'LinkedIn: nama tampilan', type: 'text', max: 80, group: 'Kontak', width: 'half' },
]


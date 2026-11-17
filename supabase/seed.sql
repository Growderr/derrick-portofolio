-- =============================================================================
-- Data awal: isi yang sama dengan file src/data/*.js sebelum Supabase dipakai.
-- Jalankan SETELAH migrasi skema. Aman dijalankan ulang (tidak menimpa data yang sudah ada).
-- Hanya fakta yang sudah ada di proyek; tidak ada konten karangan.
-- =============================================================================

insert into public.profiles (
  name, first_name, role, school, class_name, competency, competency_short, location,
  headline, brand, intro, email, intro_statement, intro_paragraphs, biography,
  interests, career_statement, career_goals, learning_interests
) values (
  'Derrick Adilla Rahman', 'Derrick', 'Siswa Fullstack Developer', 'SMKN 2 Banjarmasin', 'XII PPLG A',
  'Pengembangan Perangkat Lunak dan Gim', 'PPLG', 'Banjarmasin, Indonesia',
  array['Merancang', 'dan membangun', 'pengalaman', 'digital.']::text[], 'Siswa yang antusias terhadap teknologi, pengembangan perangkat lunak, dan pembuatan pengalaman digital yang bermakna.', 'Saya belajar pengembangan perangkat lunak di SMKN 2 Banjarmasin dan senang mengubah ide menjadi website dan aplikasi yang benar-benar dapat digunakan orang.', null,
  'Saya suka memahami cara kerja perangkat lunak, lalu memanfaatkannya untuk membuat sesuatu yang berguna bagi orang lain.', array['Saya berada di tahun terakhir PPLG di SMKN 2 Banjarmasin. Saya tertarik pada kedua sisi aplikasi web: frontend, tempat keputusan desain menjadi sesuatu yang dapat digunakan orang, dan backend, tempat logika serta data berada. Bekerja di keduanya membuat saya tertarik pada pengembangan fullstack.', 'Teknologi terus berubah, jadi saya menganggap belajar sebagai bagian dari pekerjaan. Tujuan saya sederhana: membuat produk digital yang menyelesaikan masalah nyata bagi orang-orang, dan menjadi lebih baik di setiap proyek.']::text[], array['Derrick Adilla Rahman adalah siswa kelas XII PPLG A di SMKN 2 Banjarmasin yang memiliki ketertarikan pada dunia teknologi, khususnya pengembangan perangkat lunak dan website.', 'Ia terus mengembangkan kemampuan di bidang frontend dan backend development, serta tertarik mempelajari bagaimana teknologi dapat dimanfaatkan untuk membangun solusi digital yang bermanfaat.']::text[],
  '[{"title":"Pengembangan Frontend","description":"Bagian website yang dilihat dan disentuh pengguna: tata letak, interaksi, responsivitas, dan aksesibilitas."},{"title":"Pengembangan Backend","description":"Logika, data, dan API yang membuat aplikasi berjalan di balik antarmuka."},{"title":"Pengembangan Fullstack","description":"Menghubungkan kedua sisi menjadi satu produk utuh, dari antarmuka hingga basis data."},{"title":"Pengembangan Aplikasi Web","description":"Aplikasi interaktif yang berjalan di peramban, lebih dari sekadar halaman statis."},{"title":"Desain UI/UX","description":"Merencanakan tampilan produk dan kenyamanan saat menggunakannya."},{"title":"Rekayasa Perangkat Lunak","description":"Menyusun kode dan proyek agar tetap mudah dibaca dan dirawat."}]'::jsonb, 'Saya ingin berkembang sebagai pengembang perangkat lunak dan membuat produk digital yang benar-benar bermanfaat bagi penggunanya.', '[{"title":"Menjadi fullstack developer yang andal","description":"Membangun kemampuan yang kuat di frontend dan backend, serta memahami bagaimana keduanya saling terhubung."},{"title":"Mengembangkan solusi perangkat lunak nyata","description":"Beralih dari latihan menuju perangkat lunak yang menyelesaikan masalah nyata bagi pengguna sesungguhnya."},{"title":"Terus belajar","description":"Tetap penasaran seiring perubahan alat dan praktik, serta berkembang di setiap proyek."},{"title":"Membuat produk digital yang bermanfaat","description":"Peduli pada kegunaan dan kemudahan penggunaan, bukan hanya pada apakah sesuatu berfungsi."}]'::jsonb, '[{"title":"Pengembangan fullstack","description":"Menghubungkan antarmuka, logika, dan basis data menjadi satu produk."},{"title":"Arsitektur aplikasi web","description":"Menyusun aplikasi yang lebih besar agar tetap mudah dirawat."},{"title":"Perancangan basis data","description":"Memodelkan data agar andal dan mudah diakses."},{"title":"Aksesibilitas web","description":"Membuat antarmuka dapat digunakan oleh lebih banyak orang."},{"title":"Riset UI/UX","description":"Mempelajari bagaimana orang benar-benar menggunakan hasil karya."},{"title":"Pengujian perangkat lunak","description":"Menemukan masalah sebelum pengguna menemukannya."}]'::jsonb
) on conflict (singleton) do nothing;

insert into public.education (slug, current, school, lines, period, description, tags, sort_order) values
  ('smkn2', true, 'SMKN 2 Banjarmasin', array['Kelas XII PPLG A', 'Kompetensi Keahlian: Pengembangan Perangkat Lunak dan Gim']::text[], null, 'Program sekolah menengah kejuruan di bidang pengembangan perangkat lunak dan gim.', array['PPLG', 'Pengembangan perangkat lunak']::text[], 10),
  ('previous', false, null, '{}'::text[], null, null, '{}'::text[], 20)
on conflict (slug) do nothing;

insert into public.skills (slug, kind, category, name, value, icon, description, sort_order) values
  ('html', 'hard', 'frontend', 'HTML', 75, 'html', null, 10),
  ('css', 'hard', 'frontend', 'CSS', 70, 'css', null, 20),
  ('javascript', 'hard', 'frontend', 'JavaScript', 60, 'javascript', null, 30),
  ('reactjs', 'hard', 'frontend', 'React.js', 55, 'react', null, 40),
  ('tailwind-css', 'hard', 'frontend', 'Tailwind CSS', 65, 'tailwind', null, 50),
  ('php', 'hard', 'backend', 'PHP', 50, 'php', null, 60),
  ('mysql', 'hard', 'backend', 'MySQL', 50, 'mysql', null, 70),
  ('supabase', 'hard', 'backend', 'Supabase', 40, 'supabase', null, 80),
  ('git', 'hard', 'tools', 'Git', 55, 'git', null, 90),
  ('github', 'hard', 'tools', 'GitHub', 55, 'github', null, 100),
  ('vs-code', 'hard', 'tools', 'VS Code', 70, 'vscode', null, 110),
  ('desain-ui-ux', 'hard', 'design', 'Desain UI/UX', 55, 'uiux', null, 120),
  ('figma', 'hard', 'design', 'Figma', 50, 'figma', null, 130),
  ('soft-pemecahan-masalah', 'soft', null, 'Pemecahan Masalah', 70, null, 'Memecah masalah menjadi bagian-bagian kecil dan menyelesaikannya satu per satu.', 10),
  ('soft-komunikasi', 'soft', null, 'Komunikasi', 65, null, 'Menjelaskan ide dan mendengarkan orang lain dengan jelas.', 20),
  ('soft-kerja-sama-tim', 'soft', null, 'Kerja Sama Tim', 70, null, 'Membagi pekerjaan dan mengembangkan ide satu sama lain.', 30),
  ('soft-adaptabilitas', 'soft', null, 'Adaptabilitas', 70, null, 'Menyesuaikan diri saat alat, rencana, atau kebutuhan berubah.', 40),
  ('soft-manajemen-waktu', 'soft', null, 'Manajemen Waktu', 60, null, 'Merencanakan pekerjaan agar tenggat terpenuhi tanpa terburu-buru.', 50),
  ('soft-berpikir-kritis', 'soft', null, 'Berpikir Kritis', 65, null, 'Mempertanyakan asumsi sebelum memilih pendekatan.', 60),
  ('soft-belajar-mandiri', 'soft', null, 'Belajar Mandiri', 75, null, 'Mempelajari alat dan konsep baru secara mandiri.', 70)
on conflict (slug) do nothing;

insert into public.experiences (slug, type, title, role, period, description, responsibilities, activities, technologies, tags, sort_order) values
  ('plk-kantor-kecamatan-anjir-muara', 'plk', 'Kantor Kecamatan Anjir Muara', null, null, 'Praktik Lapangan Kerja (PLK) di Kantor Kecamatan Anjir Muara, dengan fokus pada pengembangan website.', '{}'::text[], array['Pengembangan website']::text[], '{}'::text[], array['PLK', 'Pengembangan website']::text[], 10)
on conflict (slug) do nothing;

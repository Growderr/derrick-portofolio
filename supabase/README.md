# Supabase: panduan pemasangan (Phase 08)

Folder ini berisi semua yang dibutuhkan database. Tidak ada kredensial di sini.

| File | Isi |
| --- | --- |
| `migrations/20261114000001_schema.sql` | 10 tabel + `admin_users`, relasi, timestamp, slug, status publikasi, **RLS di semua tabel** |
| `migrations/20261114000002_storage.sql` | 4 bucket (`profile-photos`, `project-images`, `certificates`, `blog-images`) + kebijakan akses |
| `seed.sql` | Data awal: isi yang sama dengan `src/data/*.js` sebelumnya (profil, pendidikan, keahlian, PLK) |

## 1. Buat proyek dan jalankan SQL

1. Buat proyek di <https://supabase.com>.
2. Buka **SQL Editor**, jalankan berurutan: `schema.sql`, lalu `storage.sql`, lalu `seed.sql` (opsional tetapi disarankan agar situs tidak kosong).
3. Semua file aman dijalankan ulang.

## 2. Buat akun admin

1. **Authentication > Users > Add user**: isi email dan kata sandi (centang auto-confirm).
2. **Authentication > Sign In / Providers**: matikan **Allow new users to sign up** supaya orang lain tidak bisa membuat akun.
3. Daftarkan akun itu sebagai admin di SQL Editor:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'EMAIL-ADMIN-ANDA@example.com';
```

Akun yang tidak ada di `admin_users` tidak bisa mengubah apa pun, walaupun berhasil login.

## 3. Isi variabel lingkungan

Salin `.env.example` menjadi `.env`, isi dari **Project Settings > API**:

```
VITE_SUPABASE_URL=https://ID-PROYEK-ANDA.supabase.co
VITE_SUPABASE_ANON_KEY=<anon / publishable key>
```

Hanya anon/publishable key. Jangan pernah memakai `service_role` atau secret key: variabel `VITE_*` ikut terkirim ke browser. Klien (`src/lib/supabase.js`) menolak membuat koneksi jika mendeteksi kunci seperti itu.

Untuk hosting (Vercel, Netlify, dsb.), isi dua variabel yang sama di pengaturan environment hosting.

## 4. Jalankan

```powershell
npm install
npm run dev
```

Buka `/admin/login`. Tanpa `.env`, situs publik tetap berjalan dengan data lokal dan panel admin menampilkan petunjuk.

## Model keamanan

* **Pengunjung (anon)**: hanya membaca baris dengan `is_published = true`; hanya boleh **mengirim** ke `guestbook` (selalu tersembunyi sampai disetujui) dan `contact_messages` (tidak bisa dibaca publik).
* **Admin**: dikenali fungsi `public.is_admin()` (baris di `admin_users`). Semua tulis/ubah/hapus tabel dan file Storage mensyaratkannya, ditegakkan di database, bukan di frontend.
* **Validasi** berlapis: formulir di browser, lalu `CHECK`/domain di database (panjang teks, format email, tautan hanya `http(s)://`, slug, tanggal), lalu batas ukuran dan jenis file di bucket.
* Upload memakai nama acak (bukan nama file pengguna), diperiksa byte awalnya (JPG/PNG/WebP/PDF), SVG tidak diizinkan.
* `contact_messages` punya rem anti-banjir: satu email maksimal 5 pesan per jam. Formulir juga memakai kolom jebakan (honeypot) dan jeda minimum.

## Relasi

`projects.experience_id`, `certificates.experience_id` ke `experiences`; `testimonials.project_id` ke `projects` (semua `on delete set null`); `profile_id` di tabel konten ke `profiles` (diisi otomatis).

## Catatan

* Perubahan dari dashboard tampil di situs saat halaman dibuka lagi atau tab difokuskan ulang (tanpa realtime).
* Lupa kata sandi: ubah lewat **Authentication > Users** di dashboard Supabase.

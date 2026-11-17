  -- =============================================================================
  -- Storage: bucket gambar dan dokumen (Phase 08)
  --
  -- Bucket bersifat publik untuk DIBACA (gambar tampil di situs lewat URL publik),
  -- tetapi hanya admin yang boleh mengunggah, mengganti, dan menghapus.
  -- Batas ukuran dan jenis file ditegakkan oleh Supabase Storage (bukan hanya frontend).
  -- Tidak ada policy select untuk anon, jadi isi bucket tidak bisa di-list publik.
  -- =============================================================================

  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values
    ('profile-photos', 'profile-photos', true, 3145728, array['image/jpeg', 'image/png', 'image/webp']),
    ('project-images', 'project-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
    ('certificates',   'certificates',   true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
    ('blog-images',    'blog-images',    true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
  on conflict (id) do update
    set public = excluded.public,
        file_size_limit = excluded.file_size_limit,
        allowed_mime_types = excluded.allowed_mime_types;

  drop policy if exists "portofolio: admin lihat file" on storage.objects;
  create policy "portofolio: admin lihat file" on storage.objects for select to authenticated
    using (
      bucket_id in ('profile-photos', 'project-images', 'certificates', 'blog-images')
      and (select public.is_admin())
    );

  drop policy if exists "portofolio: admin unggah file" on storage.objects;
  create policy "portofolio: admin unggah file" on storage.objects for insert to authenticated
    with check (
      bucket_id in ('profile-photos', 'project-images', 'certificates', 'blog-images')
      and (select public.is_admin())
    );

  drop policy if exists "portofolio: admin ganti file" on storage.objects;
  create policy "portofolio: admin ganti file" on storage.objects for update to authenticated
    using (
      bucket_id in ('profile-photos', 'project-images', 'certificates', 'blog-images')
      and (select public.is_admin())
    )
    with check (
      bucket_id in ('profile-photos', 'project-images', 'certificates', 'blog-images')
      and (select public.is_admin())
    );

  drop policy if exists "portofolio: admin hapus file" on storage.objects;
  create policy "portofolio: admin hapus file" on storage.objects for delete to authenticated
    using (
      bucket_id in ('profile-photos', 'project-images', 'certificates', 'blog-images')
      and (select public.is_admin())
    );

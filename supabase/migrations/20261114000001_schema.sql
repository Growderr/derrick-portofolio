-- =============================================================================
-- Portofolio Derrick Adilla Rahman: skema database (Phase 08)
--
-- Jalankan sekali di Supabase: SQL Editor > New query > tempel > Run.
-- Aman dijalankan ulang (memakai "if not exists" / "or replace" / "drop policy if exists").
--
-- Prinsip keamanan:
--   * Row Level Security (RLS) aktif di SEMUA tabel.
--   * Pengunjung (anon) hanya boleh MEMBACA konten yang is_published = true,
--     dan hanya boleh MENGIRIM (insert) ke guestbook dan contact_messages.
--   * Hanya pengguna yang ada di tabel admin_users yang boleh mengelola konten.
--   * Hak admin ditegakkan di database (fungsi is_admin()), bukan di frontend.
--   * Service Role Key tidak pernah dipakai di frontend.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Tipe bantu (domain): validasi di sisi database
-- ---------------------------------------------------------------------------
do $$ begin
  create domain public.http_url as text
    check (value ~* '^https?://[^[:space:]]+$' and char_length(value) <= 2048);
exception when duplicate_object then null; end $$;

do $$ begin
  create domain public.slug as text
    check (value ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(value) between 1 and 120);
exception when duplicate_object then null; end $$;

-- Tanggal parsial: 'YYYY', 'YYYY-MM' atau 'YYYY-MM-DD'
do $$ begin
  create domain public.partial_date as text
    check (value ~ '^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Fungsi umum
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Admin: siapa yang boleh mengelola konten
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- security definer: dibaca oleh policy tabel lain tanpa membuka admin_users ke publik.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admin_users: baca baris sendiri" on public.admin_users;
create policy "admin_users: baca baris sendiri"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));
-- Tidak ada policy insert/update/delete: admin baru hanya bisa ditambahkan lewat SQL Editor.

-- ---------------------------------------------------------------------------
-- profiles: biodata dan informasi website (satu baris saja)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id                uuid primary key default gen_random_uuid(),
  singleton         boolean not null default true unique check (singleton),
  name              text not null check (char_length(btrim(name)) between 1 and 120),
  first_name        text check (char_length(first_name) <= 60),
  role              text check (char_length(role) <= 120),
  school            text check (char_length(school) <= 160),
  class_name        text check (char_length(class_name) <= 60),
  competency        text check (char_length(competency) <= 200),
  competency_short  text check (char_length(competency_short) <= 30),
  location          text check (char_length(location) <= 120),
  headline          text[] not null default '{}' check (cardinality(headline) <= 8),
  brand             text check (char_length(brand) <= 600),
  intro             text check (char_length(intro) <= 800),
  email             text check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and char_length(email) <= 254),
  github_url        public.http_url,
  github_handle     text check (char_length(github_handle) <= 80),
  instagram_url     public.http_url,
  instagram_handle  text check (char_length(instagram_handle) <= 80),
  linkedin_url      public.http_url,
  linkedin_handle   text check (char_length(linkedin_handle) <= 80),
  cv_url            public.http_url,
  avatar            jsonb check (avatar is null or jsonb_typeof(avatar) = 'object'),
  intro_statement   text check (char_length(intro_statement) <= 400),
  intro_paragraphs  text[] not null default '{}' check (cardinality(intro_paragraphs) <= 10),
  biography         text[] not null default '{}' check (cardinality(biography) <= 10),
  interests         jsonb not null default '[]' check (jsonb_typeof(interests) = 'array'),
  career_statement  text check (char_length(career_statement) <= 400),
  career_goals      jsonb not null default '[]' check (jsonb_typeof(career_goals) = 'array'),
  learning_interests jsonb not null default '[]' check (jsonb_typeof(learning_interests) = 'array'),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Mengisi profile_id otomatis di tabel konten (relasi ke pemilik portofolio).
create or replace function public.set_profile_id()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.profile_id is null then
    select id into new.profile_id from public.profiles limit 1;
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- education: riwayat pendidikan
-- ---------------------------------------------------------------------------
create table if not exists public.education (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid references public.profiles (id) on delete restrict,
  slug        public.slug not null unique,
  current     boolean not null default false,
  school      text check (char_length(school) <= 200),
  lines       text[] not null default '{}' check (cardinality(lines) <= 10),
  period      text check (char_length(period) <= 80),
  description text check (char_length(description) <= 1000),
  tags        text[] not null default '{}' check (cardinality(tags) <= 20),
  sort_order  integer not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- skills: keahlian teknis (hard) dan soft skill (soft)
-- ---------------------------------------------------------------------------
create table if not exists public.skills (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid references public.profiles (id) on delete restrict,
  slug        public.slug not null unique,
  kind        text not null default 'hard' check (kind in ('hard', 'soft')),
  category    text check (category in ('frontend', 'backend', 'tools', 'design')),
  name        text not null check (char_length(btrim(name)) between 1 and 80),
  value       smallint not null default 50 check (value between 0 and 100),
  icon        text check (char_length(icon) <= 40),
  description text check (char_length(description) <= 400),
  sort_order  integer not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint skills_hard_needs_category check (kind <> 'hard' or category is not null)
);

-- ---------------------------------------------------------------------------
-- experiences: PLK, organisasi dan lomba
-- ---------------------------------------------------------------------------
create table if not exists public.experiences (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid references public.profiles (id) on delete restrict,
  slug            public.slug not null unique,
  type            text not null check (type in ('plk', 'organization', 'competition')),
  title           text not null check (char_length(btrim(title)) between 1 and 200),
  role            text check (char_length(role) <= 160),
  organizer       text check (char_length(organizer) <= 160),
  period          text check (char_length(period) <= 80),
  category        text check (char_length(category) <= 80),
  result          text check (char_length(result) <= 200),
  description     text check (char_length(description) <= 2000),
  responsibilities text[] not null default '{}' check (cardinality(responsibilities) <= 30),
  activities      text[] not null default '{}' check (cardinality(activities) <= 30),
  technologies    text[] not null default '{}' check (cardinality(technologies) <= 30),
  tags            text[] not null default '{}' check (cardinality(tags) <= 20),
  documentation   jsonb not null default '[]' check (jsonb_typeof(documentation) = 'array'),
  sort_order      integer not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects: proyek (opsional terkait ke satu pengalaman, mis. dikerjakan saat PLK)
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid references public.profiles (id) on delete restrict,
  experience_id   uuid references public.experiences (id) on delete set null,
  slug            public.slug not null unique,
  title           text not null check (char_length(btrim(title)) between 1 and 160),
  description     text not null check (char_length(description) between 1 and 600),
  category        text not null default 'web-app' check (category in ('web-app', 'website', 'ui-ux', 'mobile', 'game', 'other')),
  year            text check (year ~ '^\d{4}$'),
  progress_status text check (char_length(progress_status) <= 40),
  featured        boolean not null default false,
  thumbnail       jsonb check (thumbnail is null or jsonb_typeof(thumbnail) = 'object'),
  tech            text[] not null default '{}' check (cardinality(tech) <= 30),
  overview        text check (char_length(overview) <= 6000),
  objectives      text[] not null default '{}' check (cardinality(objectives) <= 20),
  problem         text check (char_length(problem) <= 3000),
  solution        text check (char_length(solution) <= 3000),
  features        text[] not null default '{}' check (cardinality(features) <= 30),
  role            text check (char_length(role) <= 160),
  contributions   text[] not null default '{}' check (cardinality(contributions) <= 30),
  documentation   jsonb not null default '[]' check (jsonb_typeof(documentation) = 'array'),
  docs_url        public.http_url,
  screenshots     jsonb not null default '[]' check (jsonb_typeof(screenshots) = 'array'),
  demo_url        public.http_url,
  github_url      public.http_url,
  feedback        jsonb not null default '[]' check (jsonb_typeof(feedback) = 'array'),
  related         text[] not null default '{}' check (cardinality(related) <= 10),
  sort_order      integer not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- certificates: sertifikat dan pencapaian (opsional terkait ke satu pengalaman)
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid references public.profiles (id) on delete restrict,
  experience_id uuid references public.experiences (id) on delete set null,
  slug          public.slug not null unique,
  title         text not null check (char_length(btrim(title)) between 1 and 200),
  issuer        text check (char_length(issuer) <= 160),
  issued_on     public.partial_date,
  category      text not null default 'course' check (category in ('course', 'competition', 'achievement', 'training', 'organization')),
  description   text check (char_length(description) <= 1000),
  image         jsonb check (image is null or jsonb_typeof(image) = 'object'),
  document_url  public.http_url,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- testimonials: testimoni (opsional terkait ke satu proyek)
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid references public.profiles (id) on delete restrict,
  project_id   uuid references public.projects (id) on delete set null,
  name         text not null check (char_length(btrim(name)) between 1 and 120),
  role         text check (char_length(role) <= 160),
  organization text check (char_length(organization) <= 160),
  message      text not null check (char_length(btrim(message)) between 1 and 1500),
  avatar       jsonb check (avatar is null or jsonb_typeof(avatar) = 'object'),
  category     text not null default 'friend' check (category in ('teacher', 'plk', 'user', 'friend')),
  sort_order   integer not null default 0,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- blog_posts: artikel. content = array blok (paragraph, heading, subheading,
-- list, quote, code, image), lihat src/data/blog.js untuk bentuknya.
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid references public.profiles (id) on delete restrict,
  slug         public.slug not null unique,
  title        text not null check (char_length(btrim(title)) between 1 and 200),
  description  text not null check (char_length(description) between 1 and 500),
  category     text not null default 'learning' check (category in ('learning', 'tutorial', 'project', 'notes')),
  published_on date,
  reading_time smallint check (reading_time is null or reading_time between 1 and 240),
  cover        jsonb check (cover is null or jsonb_typeof(cover) = 'object'),
  content      jsonb not null default '[]' check (jsonb_typeof(content) = 'array'),
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- guestbook: pesan pengunjung (tampil setelah disetujui admin)
-- ---------------------------------------------------------------------------
create table if not exists public.guestbook (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(btrim(name)) between 2 and 80),
  message      text not null check (char_length(btrim(message)) between 3 and 1000),
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_messages: pesan dari formulir kontak (hanya admin yang bisa membaca)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(btrim(name)) between 2 and 100),
  email      text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and char_length(email) <= 254),
  subject    text check (char_length(subject) <= 150),
  message    text not null check (char_length(btrim(message)) between 10 and 5000),
  is_read    boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Rem sederhana anti-banjir: satu email maksimal 5 pesan per jam.
create or replace function public.limit_contact_flood()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (
    select count(*) from public.contact_messages
    where lower(email) = lower(new.email) and created_at > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'Terlalu banyak pesan dari email ini. Coba lagi nanti.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Trigger: updated_at (semua tabel) dan profile_id (tabel konten)
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'profiles', 'education', 'skills', 'experiences', 'projects', 'certificates',
    'testimonials', 'blog_posts', 'guestbook', 'contact_messages'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;

  foreach t in array array[
    'education', 'skills', 'experiences', 'projects', 'certificates', 'testimonials', 'blog_posts'
  ] loop
    execute format('drop trigger if exists set_profile_id on public.%I', t);
    execute format(
      'create trigger set_profile_id before insert on public.%I for each row execute function public.set_profile_id()', t);
  end loop;
end $$;

drop trigger if exists limit_contact_flood on public.contact_messages;
create trigger limit_contact_flood before insert on public.contact_messages
  for each row execute function public.limit_contact_flood();

-- ---------------------------------------------------------------------------
-- Indeks
-- ---------------------------------------------------------------------------
create index if not exists education_order_idx    on public.education (is_published, sort_order);
create index if not exists skills_order_idx       on public.skills (is_published, kind, sort_order);
create index if not exists experiences_order_idx  on public.experiences (is_published, type, sort_order);
create index if not exists projects_order_idx     on public.projects (is_published, sort_order);
create index if not exists projects_featured_idx  on public.projects (featured) where featured;
create index if not exists certificates_order_idx on public.certificates (is_published, issued_on desc);
create index if not exists testimonials_order_idx on public.testimonials (is_published, category, sort_order);
create index if not exists blog_posts_order_idx   on public.blog_posts (is_published, published_on desc);
create index if not exists guestbook_order_idx    on public.guestbook (is_published, created_at desc);
create index if not exists contact_messages_idx   on public.contact_messages (created_at desc);
create index if not exists projects_experience_idx     on public.projects (experience_id);
create index if not exists certificates_experience_idx on public.certificates (experience_id);
create index if not exists testimonials_project_idx    on public.testimonials (project_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.education        enable row level security;
alter table public.skills           enable row level security;
alter table public.experiences      enable row level security;
alter table public.projects         enable row level security;
alter table public.certificates     enable row level security;
alter table public.testimonials     enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.guestbook        enable row level security;
alter table public.contact_messages enable row level security;

-- Hak akses tingkat tabel (RLS menyaring baris di atasnya).
revoke all on public.profiles, public.education, public.skills, public.experiences,
  public.projects, public.certificates, public.testimonials, public.blog_posts,
  public.guestbook, public.contact_messages, public.admin_users from anon, authenticated;

grant select on public.profiles, public.education, public.skills, public.experiences,
  public.projects, public.certificates, public.testimonials, public.blog_posts,
  public.guestbook to anon;
grant insert on public.guestbook, public.contact_messages to anon;

grant select, insert, update, delete on public.profiles, public.education, public.skills,
  public.experiences, public.projects, public.certificates, public.testimonials,
  public.blog_posts, public.guestbook, public.contact_messages to authenticated;
grant select on public.admin_users to authenticated;

-- profiles: semua orang membaca, admin mengelola.
drop policy if exists "profiles: publik baca" on public.profiles;
create policy "profiles: publik baca" on public.profiles for select to anon, authenticated using (true);
drop policy if exists "profiles: admin kelola" on public.profiles;
create policy "profiles: admin kelola" on public.profiles for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Tabel konten: publik hanya membaca baris yang diterbitkan, admin mengelola semuanya.
do $$
declare t text;
begin
  foreach t in array array[
    'education', 'skills', 'experiences', 'projects', 'certificates', 'testimonials', 'blog_posts', 'guestbook'
  ] loop
    execute format('drop policy if exists "%1$s: publik baca terbit" on public.%1$I', t);
    execute format(
      'create policy "%1$s: publik baca terbit" on public.%1$I for select to anon, authenticated using (is_published)', t);
    execute format('drop policy if exists "%1$s: admin kelola" on public.%1$I', t);
    execute format(
      'create policy "%1$s: admin kelola" on public.%1$I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

-- guestbook: pengunjung boleh mengirim, tetapi tidak boleh menerbitkan sendiri.
drop policy if exists "guestbook: pengunjung kirim" on public.guestbook;
create policy "guestbook: pengunjung kirim" on public.guestbook for insert to anon, authenticated
  with check (is_published = false);

-- contact_messages: pengunjung hanya boleh mengirim; membaca hanya admin.
drop policy if exists "contact_messages: pengunjung kirim" on public.contact_messages;
create policy "contact_messages: pengunjung kirim" on public.contact_messages for insert to anon, authenticated
  with check (is_read = false);
drop policy if exists "contact_messages: admin kelola" on public.contact_messages;
create policy "contact_messages: admin kelola" on public.contact_messages for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Menambahkan admin pertama (jalankan SETELAH membuat pengguna di Authentication):
--
--   insert into public.admin_users (user_id)
--   select id from auth.users where email = 'EMAIL-ADMIN-ANDA@example.com';
-- ---------------------------------------------------------------------------

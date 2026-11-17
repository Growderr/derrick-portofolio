# Derrick Adilla Rahman: Portfolio

Phase 01: frontend foundation. Phase 02: Home and About Me pages. Phase 03: Skills and Experience. Phase 04: Projects gallery and detail pages. Phase 05: Certificates and Testimonials. Phase 06: Resume, Contact and Blog. Phase 07 (part 1 of 2): Bahasa Indonesia interface, navigation and back-to-top. React 19, Vite 8, Tailwind CSS 4, React Router 7,
Framer Motion, Lucide React.

## Run

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build into dist/
    npm run preview    # serve the production build

Requires Node 20.19+ or 22.12+.

## Replace the placeholders

| What | Where |
| --- | --- |
| Profile photo | Add `profile.jpg` (4:5 portrait, 800x1000 or larger) to `src/assets/images/`. Detected automatically. |
| Fonts | Installed from Fontsource (see `src/assets/fonts/README.md`); tokens in `src/styles/tokens.css`. |
| Intro text, email | `src/data/profile.js` |
| Social links | `src/data/socials.js` (set `url`) |
| Nav structure | `src/data/routes.js` |

## Design tokens

Defined once in `src/styles/tokens.css`: `paper` (white), `ink` (black), `accent` (#FFED4D),
plus neutrals `muted`, `line`, `surface`. Tailwind's default palette is disabled on purpose,
so only these tokens can be used. The site has a single light theme by design (no dark mode).

## Phase 02: where to edit content

| What | Where |
| --- | --- |
| Name, headline, intro, competency | `src/data/profile.js` |
| Hero buttons, About anchor links | `src/data/navigation.js` |
| Home intro, skills preview, featured projects | `src/data/home.js` |
| Biography, education, interests, organizations, PLK, career goals | `src/data/about.js` |

Empty arrays and `null` values render as clearly labelled placeholders or empty
states. Nothing is invented: fill the data files and the UI updates.

## Phase 04: Projects

| What | Where |
| --- | --- |
| All project content, categories | `src/data/projects.js` (the file documents every field) |
| Project images | `public/images/projects/<slug>/`, referenced as `/images/projects/<slug>/file.jpg` |
| Home "Selected projects" | Set `featured: true` on a project; no separate list to maintain |
| Gallery page, detail page | `src/pages/Projects.jsx`, `src/pages/ProjectDetail.jsx` |
| Components | `src/components/projects/` (ProjectCard, ProjectGrid, ProjectFilter, ProjectGallery, ScreenshotGallery), `src/components/ui/ImageLightbox.jsx`, `src/components/ui/EmptyState.jsx` |

`projects` is empty on purpose. Add a real entry and it gets a gallery card, a filter, and a
page at `/projects/<slug>`. Missing optional fields show dashed "to be added" placeholders;
`demoUrl` / `githubUrl` set to `null` show disabled buttons. The active filter lives in the URL
(`/projects?category=web-app`).

## Phase 05: certificates and testimonials

| What | Where |
| --- | --- |
| Certificates, categories | `src/data/certificates.js` |
| Certificate images / PDFs | `public/images/certificates/`, referenced as `/images/certificates/name.jpg` |
| Testimonials, groups | `src/data/testimonials.js` |
| Testimonial avatars (optional) | `public/images/testimonials/` |

Both lists ship empty, so the pages show empty states until real entries are added. Each entry's
shape is documented at the top of its data file; any field except `id` and `category` may be `null`
and renders as a dashed placeholder. The certificate filter shows only categories that have entries
and is stored in the URL (`/certificates?category=course`). The lightbox supports Esc, arrow keys
and backdrop click. Reusable pieces: `CertificateCard`, `CertificateGallery`, `CertificateFilter`,
`TestimonialCard`, `ImageLightbox`, `EmptyState`.

## Phase 06: resume, contact and blog

| What | Where |
| --- | --- |
| Email, GitHub, Instagram, LinkedIn | `src/data/contact.js` (also feeds the footer and the resume) |
| Resume content | `src/data/resume.js` assembles profile, education, skills, experience, projects and contact from their own data files |
| Ready-made CV PDF (optional) | Put it in `public/cv/` and set `resumeMeta.pdfUrl` in `src/data/resume.js` |
| Blog articles and categories | `src/data/blog.js` (shape and content block types documented at the top) |
| Blog images | `public/images/blog/`, referenced as `/images/blog/name.jpg` |

Until `pdfUrl` is set, "Download CV (PDF)" opens the print dialog, where "Save as PDF" produces the
file from the print layout (`src/styles/print.css`; navbar, footer and buttons are hidden). Blog
reading time is calculated from the content unless `readingTime` is set. The category filter is kept
in the URL (`/blog?category=learning`). Contact details and articles ship empty, so placeholders and
the empty state show until real entries are added.

## Phase 07 (part 1 of 2): Bahasa Indonesia, navigation, back to top

| What | Where |
| --- | --- |
| All interface text | Written directly in the components, sections, pages and `src/data/*.js` (the site is single-language, so there is no translation layer). `<html lang="id">` is set in `index.html`. |
| Dates, reading time | `src/lib/formatDate.js` (`id-ID`), `src/lib/readingTime.js` ("menit baca") |
| Menu labels and groups | `src/data/routes.js` (`primary` = navbar, `secondary` = "Lainnya" menu and mobile menu) |
| Desktop "Lainnya" menu | `src/components/navigation/MoreMenu.jsx` (disclosure: Esc, click outside and Tab-out close it) |
| Mobile menu | `src/components/navigation/MobileMenu.jsx` (Esc returns focus to the toggle; page behind is `inert` while open) |
| Back-to-top button | `src/components/ui/BackToTop.jsx`, `src/hooks/useScrolledPast.js`, shared helper `src/lib/scroll.js` (also used by the footer button) |

Dark mode is intentionally not part of the site: the unused theme scaffolding (`src/lib/theme.js`
and the `[data-theme="dark"]` tokens) was removed. URLs stay as they were (`/about`, `/projects`, ...).
Part 2 adds the project preview modal, hover and click interactions, and the final accessibility pass.

---

## Phase 08: Supabase dan Panel Admin

Konten situs sekarang dibaca dari Supabase dan dikelola lewat panel admin di `/admin`.

* **Pemasangan**: ikuti `supabase/README.md` (SQL, akun admin, `.env`).
* **Tanpa Supabase** (belum ada `.env`): situs publik memakai data lokal di `src/data/*.js` seperti sebelumnya; `/admin` menampilkan petunjuk.
* **Halaman admin**: `/admin/login`, `dashboard`, `profile`, `projects`, `skills`, `education`, `experiences`, `certificates`, `testimonials`, `blog`, `messages`, `guestbook`.
* **Menambah bidang**: tambahkan kolom di SQL, lalu satu baris di `src/admin/config/resources.js` dan pemetaan di `src/lib/content/mappers.js`.
* **Kode**: `src/lib/supabase.js` (klien tunggal), `src/lib/content/` (pengambilan data publik), `src/admin/` (panel, dimuat terpisah dan tidak diunduh pengunjung).

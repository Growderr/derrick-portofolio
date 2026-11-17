import Container from '@/components/layout/Container'
import { useProjects } from '@/lib/content'

/** Page heading. The count on the yellow panel is the real number of published projects. */
export default function ProjectsIntro() {
  const projects = useProjects()
  const count = String(projects.length).padStart(2, '0')

  return (
    <section aria-labelledby="projects-page-heading" className="border-b-2 border-ink">
      <Container className="grid gap-12 py-12 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-wide uppercase">
            <span aria-hidden="true" className="block size-3 border border-ink bg-accent" />
            Proyek Saya
          </p>
          <h1 id="projects-page-heading" className="text-h1">
            Karya yang telah saya buat, dan bagaimana saya membuatnya.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Setiap proyek memiliki halamannya sendiri: masalah, solusi, apa yang saya kerjakan sendiri,
            teknologi yang dipakai, dan catatan yang saya kumpulkan sepanjang jalan.
          </p>
        </div>

        <div className="relative lg:col-span-3 lg:col-start-10">
          <div className="border-2 border-ink bg-accent p-5 text-on-accent">
            <p className="font-mono text-xs font-medium tracking-wide uppercase">
              <span className="sr-only">Jumlah proyek: </span>
              <span aria-hidden="true">Proyek terdaftar</span>
            </p>
            <p
              aria-hidden="true"
              className="mt-2 text-[clamp(4.5rem,9vw,7rem)] font-display leading-none font-extrabold tracking-tight tabular-nums"
            >
              {count}
            </p>
            <p className="sr-only">{projects.length}</p>
          </div>
          <span
            aria-hidden="true"
            className="absolute -bottom-8 left-0 font-accent text-5xl leading-none italic"
          >
            sejauh ini
          </span>
        </div>
      </Container>
    </section>
  )
}

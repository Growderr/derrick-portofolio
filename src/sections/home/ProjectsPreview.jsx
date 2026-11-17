import { Info } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ProjectPreview from '@/components/home/ProjectPreview'
import Reveal from '@/components/ui/Reveal'
import { FEATURED_SLOT_COUNT } from '@/data/home'
import { useFeaturedProjects } from '@/lib/content'

// Two-up row, then one wide row on desktop; stacks in one column below lg.
const placement = ['lg:col-span-6', 'lg:col-span-6', 'lg:col-span-12']

/** Selected projects. Shows labelled empty slots until real projects are added. */
export default function ProjectsPreview() {
  const featuredProjects = useFeaturedProjects()
  const hasProjects = featuredProjects.length > 0
  const slots = hasProjects
    ? featuredProjects.slice(0, FEATURED_SLOT_COUNT)
    : Array.from({ length: FEATURED_SLOT_COUNT }, () => null)

  return (
    <section aria-labelledby="projects-heading" className="border-t border-line py-section">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title={<span id="projects-heading">Proyek pilihan</span>}
            description="Karya yang telah saya buat dan ingin saya tunjukkan, beserta teknologi di balik masing-masing."
          />
          <Button to="/projects" variant="secondary" className="self-start sm:self-auto">
            Lihat semua proyek
          </Button>
        </div>

        {!hasProjects && (
          <p className="mt-8 flex max-w-xl items-start gap-3 border-l-4 border-ink bg-accent p-4 text-on-accent">
            <Info aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
            <span>
              Belum ada proyek unggulan. Slot ini tetap kosong sampai proyek nyata ditandai sebagai unggulan
              di Panel Admin.
            </span>
          </p>
        )}

        <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          {slots.map((project, index) => (
            <Reveal key={project?.slug ?? `slot-${index}`} className={placement[index]}>
              <ProjectPreview project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

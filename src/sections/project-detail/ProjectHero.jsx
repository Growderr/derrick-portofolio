import { ChevronRight, Code, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/layout/Container'
import SectionNav from '@/components/about/SectionNav'
import Button from '@/components/ui/Button'
import Missing from '@/components/projects/Missing'
import ProjectImage from '@/components/projects/ProjectImage'
import { projectDetailSections } from '@/data/navigation'
import { getCategoryLabel, getCover, isHttpUrl } from '@/lib/projects'

/** Title block, key facts, Live Demo / GitHub links and the cover image. */
export default function ProjectHero({ project }) {
  const hasDemo = isHttpUrl(project.demoUrl)
  const hasRepo = isHttpUrl(project.githubUrl)

  const facts = [
    { label: 'Kategori', value: getCategoryLabel(project.category) },
    { label: 'Tahun', value: project.year, placeholder: 'Tahun akan ditambahkan' },
    { label: 'Status', value: project.status, placeholder: 'Status akan ditambahkan' },
    { label: 'Peran saya', value: project.role, placeholder: 'Peran akan ditambahkan' },
  ]

  return (
    <section aria-labelledby="project-title" className="border-b-2 border-ink">
      <Container className="py-10 lg:py-16">
        <nav aria-label="Jejak halaman" className="text-sm">
          <ol className="flex flex-wrap items-center gap-1 text-muted">
            <li>
              <Link to="/projects" className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent">
                Proyek
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="text-ink">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <h1 id="project-title" className="text-h1">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-lead text-muted">{project.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hasDemo ? (
                <Button href={project.demoUrl} icon={ExternalLink}>
                  Demo Langsung
                </Button>
              ) : (
                <Button disabled icon={ExternalLink}>
                  Demo Langsung
                </Button>
              )}
              {hasRepo ? (
                <Button href={project.githubUrl} variant="secondary" icon={Code}>
                  GitHub
                </Button>
              ) : (
                <Button disabled variant="secondary" icon={Code}>
                  GitHub
                </Button>
              )}
            </div>
            {(!hasDemo || !hasRepo) && (
              <p className="mt-4 text-sm">
                <Missing>
                  {!hasDemo && !hasRepo
                    ? 'Tautan demo langsung dan GitHub akan ditambahkan'
                    : !hasDemo
                      ? 'Tautan demo langsung akan ditambahkan'
                      : 'Tautan GitHub akan ditambahkan'}
                </Missing>
              </p>
            )}
          </div>

          <dl className="grid content-start gap-y-5 border-l-2 border-ink pl-5 sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:grid-cols-1">
            {facts.map(({ label, value, placeholder }) => (
              <div key={label}>
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="font-semibold">{value || <Missing>{placeholder}</Missing>}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <ProjectImage
            image={getCover(project)}
            label="Tempat gambar sampul"
            eager
            className="lg:aspect-[21/9]"
          />
        </div>

        <SectionNav sections={projectDetailSections} />
      </Container>
    </section>
  )
}

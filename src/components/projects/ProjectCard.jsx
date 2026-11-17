import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import ProjectImage from '@/components/projects/ProjectImage'
import { getCategoryLabel, getCover } from '@/lib/projects'

const MAX_TECH = 5

/**
 * One project in the gallery: thumbnail, category, name, description,
 * stack and a View Details button. `ratio` sets the thumbnail shape;
 * `number` is the small editorial index (omit it to hide the index).
 */
export default function ProjectCard({ project, ratio = '16/10', number }) {
  const tech = project.tech ?? []
  const shown = tech.slice(0, MAX_TECH)
  const hidden = tech.length - shown.length
  const href = `/projects/${project.slug}`

  return (
    <article className="group flex h-full flex-col">
      {/* The button below is the accessible link; this one is a larger mouse/touch target. */}
      <Link to={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <ProjectImage
          image={getCover(project)}
          ratio={ratio}
          className="border-2 border-ink"
        />
      </Link>

      <div className="mt-5 flex items-center justify-between gap-4 border-t-2 border-ink pt-3 font-mono text-xs tracking-wide uppercase">
        <p className="flex items-center gap-2 font-medium">
          <span aria-hidden="true" className="block size-2.5 border border-ink bg-accent" />
          {getCategoryLabel(project.category)}
        </p>
        {number !== undefined && (
          <p className="text-muted tabular-nums" aria-hidden="true">
            {String(number).padStart(2, '0')}
          </p>
        )}
      </div>

      <h3 className="mt-3 text-h3">{project.title}</h3>
      <p className="mt-2 max-w-md text-muted">{project.description}</p>

      {shown.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Teknologi yang digunakan di ${project.title}`}>
          {shown.map((item) => (
            <li key={item} className="border border-ink px-2 py-1 font-mono text-xs">
              {item}
            </li>
          ))}
          {hidden > 0 && <li className="px-1 py-1 text-sm text-muted">+{hidden} lainnya</li>}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <Button
          to={href}
          variant="secondary"
          size="sm"
          icon={ArrowUpRight}
          aria-label={`Lihat detail: ${project.title}`}
        >
          Lihat Detail
        </Button>
      </div>
    </article>
  )
}

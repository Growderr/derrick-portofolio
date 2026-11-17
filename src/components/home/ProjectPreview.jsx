import { Link } from 'react-router-dom'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const placeholderTech = ['Teknologi', 'Teknologi', 'Teknologi']

/**
 * A featured project, or (project = null) a clearly marked empty slot.
 * Real entries link to /projects/:slug once the detail page exists.
 */
export default function ProjectPreview({ project }) {
  const isEmpty = !project
  const tech = isEmpty ? placeholderTech : project.tech ?? []

  return (
    <article>
      {isEmpty ? (
        <ImagePlaceholder label="Tempat gambar proyek" ratio="16/10" />
      ) : project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt ?? ''}
          width={1600}
          height={1000}
          loading="lazy"
          className="aspect-[16/10] w-full border-2 border-ink object-cover"
        />
      ) : (
        <ImagePlaceholder label="Tempat gambar proyek" ratio="16/10" />
      )}

      <h3 className="mt-5 text-h3">
        {isEmpty ? (
          <span className="border-b-2 border-dashed border-ink">Judul proyek</span>
        ) : (
          <Link to={`/projects/${project.slug}`} className="underline decoration-1 underline-offset-[6px] hover:bg-accent">
            {project.title}
          </Link>
        )}
      </h3>

      <p className="mt-2 max-w-md text-muted">
        {isEmpty
          ? 'Deskripsi singkat tentang proyek dan masalah yang diselesaikannya akan tampil di sini.'
          : project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Teknologi">
        {tech.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={
              isEmpty
                ? 'border border-dashed border-ink px-2 py-1 font-mono text-xs text-muted'
                : 'border border-ink px-2 py-1 font-mono text-xs'
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

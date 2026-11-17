import Reveal from '@/components/ui/Reveal'
import ProjectCard from '@/components/projects/ProjectCard'
import { cn } from '@/lib/cn'

/*
 * Editorial rhythm, repeating every four cards on desktop. Edges stay aligned:
 *   row A: wide card (7 cols) + narrow card (5 cols)
 *   row B: narrow card (5 cols) + wide card (7 cols)
 * Below lg everything stacks in one column (two from sm in the "even" variant).
 */
const editorial = [
  { span: 'lg:col-span-7', ratio: '16/10' },
  { span: 'lg:col-span-5', ratio: '4/3' },
  { span: 'lg:col-span-5', ratio: '4/3' },
  { span: 'lg:col-span-7', ratio: '16/10' },
]

/**
 * variant "editorial": asymmetric gallery layout (numbered).
 * variant "even":      plain equal columns, used for related projects.
 */
export default function ProjectGrid({ projects, variant = 'editorial', label = 'Proyek' }) {
  const isEditorial = variant === 'editorial'

  return (
    <ul
      aria-label={label}
      className={cn(
        'grid gap-x-8 gap-y-14',
        isEditorial ? 'lg:grid-cols-12' : 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {projects.map((project, index) => {
        const slot = editorial[index % editorial.length]
        return (
          <li key={project.slug} className={isEditorial ? slot.span : undefined}>
            <Reveal className="h-full">
              <ProjectCard
                project={project}
                ratio={isEditorial ? slot.ratio : '16/10'}
                number={isEditorial ? index + 1 : undefined}
              />
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

import AboutSection from '@/components/about/AboutSection'
import Missing from '@/components/projects/Missing'
import { toParagraphs } from '@/lib/projects'

export default function ProjectOverview({ project }) {
  const paragraphs = toParagraphs(project.overview)
  const objectives = project.objectives ?? []

  return (
    <AboutSection id="overview" title="Ikhtisar & tujuan" description="Apa itu proyek ini dan apa yang ingin dicapainya.">
      {paragraphs.length > 0 ? (
        <div className="max-w-2xl space-y-5 text-lead">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      ) : (
        <p className="text-lead">
          <Missing>Ikhtisar proyek akan ditambahkan</Missing>
        </p>
      )}

      <h3 className="mt-14 text-h3">Tujuan</h3>
      {objectives.length > 0 ? (
        <ol className="mt-5 border-b-2 border-ink">
          {objectives.map((objective, index) => (
            <li key={objective} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t-2 border-ink py-5">
              <span aria-hidden="true" className="text-muted tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{objective}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4">
          <Missing>Tujuan akan ditambahkan</Missing>
        </p>
      )}
    </AboutSection>
  )
}

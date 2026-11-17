import Container from '@/components/layout/Container'
import Missing from '@/components/projects/Missing'
import { toParagraphs } from '@/lib/projects'

function Block({ title, text, placeholder, tone }) {
  const paragraphs = toParagraphs(text)
  return (
    <div className={tone === 'solution' ? 'border-2 border-ink bg-accent p-6 text-on-accent sm:p-8' : 'border-t-2 border-ink pt-6'}>
      <h3 className="text-h2">{title}</h3>
      <div className="mt-5 max-w-xl space-y-4 text-lead">
        {paragraphs.length > 0 ? (
          paragraphs.map((p) => <p key={p}>{p}</p>)
        ) : (
          <p>
            <Missing>{placeholder}</Missing>
          </p>
        )}
      </div>
    </div>
  )
}

/** Asymmetric pair: a narrow plain problem column next to a wider yellow solution panel. */
export default function ProblemSolution({ project }) {
  return (
    <section id="problem-solution" aria-labelledby="problem-solution-title" className="scroll-mt-20 border-b border-line py-section">
      <Container>
        <h2 id="problem-solution-title" className="sr-only">
          Pernyataan masalah dan solusi
        </h2>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <Block title="Masalahnya" text={project.problem} placeholder="Pernyataan masalah akan ditambahkan" />
          </div>
          <div className="lg:col-span-7 lg:mt-16">
            <Block title="Solusinya" text={project.solution} placeholder="Solusi akan ditambahkan" tone="solution" />
          </div>
        </div>
      </Container>
    </section>
  )
}

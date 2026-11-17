import Container from '@/components/layout/Container'
import SectionNav from '@/components/about/SectionNav'
import { skillsIntro, skillLevels } from '@/data/skills'
import { skillsSections } from '@/data/navigation'

export default function SkillsIntro() {
  return (
    <section aria-labelledby="skills-page-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="skills-page-heading" className="text-h1">
            {skillsIntro.title}
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">{skillsIntro.description}</p>
          <SectionNav sections={skillsSections} />
        </div>

        <aside aria-labelledby="scale-heading" className="lg:col-span-4 lg:self-end">
          <div className="border-l-2 border-ink pl-5">
            <h2 id="scale-heading" className="font-semibold">
              Cara membaca angka
            </h2>
            <p className="mt-2 text-sm text-muted">{skillsIntro.scaleNote}</p>
            <dl className="mt-5 space-y-2 text-sm">
              {skillLevels.map((level) => (
                <div key={level.label} className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold">{level.label}</dt>
                  <dd className="text-muted tabular-nums">{level.range}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </Container>
    </section>
  )
}

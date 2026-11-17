import Container from '@/components/layout/Container'
import { profile } from '@/data/profile'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'School', value: profile.school },
  { label: 'Class', value: profile.className },
  { label: 'Focus', value: profile.role },
]

/** Compact location and education facts. Only data supplied for the project. */
export default function AtAGlance() {
  return (
    <section aria-label="Location and education" className="py-12 lg:py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-l-2 border-ink pl-4">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="mt-1 text-h3">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

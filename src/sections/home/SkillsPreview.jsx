import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import AreaRow from '@/components/ui/AreaRow'
import { skillsPreview } from '@/data/home'

function Technologies({ items }) {
  if (items.length === 0) {
    return (
      <p className="text-sm">
        <span className="border-b-2 border-dashed border-ink text-muted">Teknologi akan ditambahkan</span>
      </p>
    )
  }
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Teknologi">
      {items.map((item) => (
        <li key={item} className="border border-ink px-2 py-1 font-mono text-xs">
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Preview of technical interests. No proficiency levels, by design. */
export default function SkillsPreview() {
  return (
    <section aria-labelledby="skills-heading" className="border-t border-line py-section">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title={<span id="skills-heading">Minat teknis</span>}
            description="Gambaran singkat hal-hal yang menjadi fokus saya. Daftar lengkapnya ada di halaman Keahlian."
          />
          <Button to="/skills" variant="secondary" className="self-start sm:self-auto">
            Lihat semua keahlian
          </Button>
        </div>

        <ul className="mt-12 border-b-2 border-ink">
          {skillsPreview.map((area) => (
            <AreaRow
              key={area.title}
              title={area.title}
              description={area.description}
              aside={<Technologies items={area.items} />}
            />
          ))}
        </ul>
      </Container>
    </section>
  )
}

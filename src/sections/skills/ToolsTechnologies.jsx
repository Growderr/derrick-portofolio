import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { useSkills } from '@/lib/content'
import { getSkillIcon } from '@/lib/skillIcons'

/** Technology stack derived from the hard skills, so the list is only edited in one place. */
export default function ToolsTechnologies() {
  const { skillCategories } = useSkills()

  return (
    <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 border-t border-line py-section">
      <Container>
        <SectionHeader
          label="Alat & teknologi"
          title={<span id="tools-title">Stack teknologi</span>}
          description="Semua yang saya gunakan, diurutkan menurut kategori."
        />

        <div className="mt-14 space-y-12">
          {skillCategories.map((category) => (
            <div key={category.id} className="grid gap-5 lg:grid-cols-12 lg:gap-x-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted lg:col-span-3 lg:pt-4">
                {category.title}
              </h3>
              <ul className="grid border-t-2 border-ink sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {category.items.map((item) => {
                  const Icon = getSkillIcon(item.icon)
                  return (
                    <li key={item.name} className="flex items-center gap-4 border-b border-line py-4 pr-4">
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center border-2 border-ink bg-accent text-on-accent"
                      >
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block font-semibold leading-tight">{item.name}</span>
                        <span className="block text-sm text-muted">{category.title}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import SkillCategory from '@/components/skills/SkillCategory'
import { useSkills } from '@/lib/content'

export default function HardSkills() {
  const { skillCategories } = useSkills()

  return (
    <section id="hard-skills" aria-labelledby="hard-skills-title" className="scroll-mt-20 py-section">
      <Container>
        <SectionHeader
          label="Keahlian teknis"
          title={<span id="hard-skills-title">Teknologi yang saya gunakan</span>}
          description="Dikelompokkan menurut fungsinya. Bilah menunjukkan perkembangan menurut penilaian sendiri, bukan tingkat keahlian."
        />
        <div className="mt-14">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

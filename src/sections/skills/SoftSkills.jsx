import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import SkillItem from '@/components/skills/SkillItem'
import { useSkills } from '@/lib/content'

export default function SoftSkills() {
  const { softSkills } = useSkills()

  return (
    <section
      id="soft-skills"
      aria-labelledby="soft-skills-title"
      className="scroll-mt-20 border-t border-line bg-surface py-section"
    >
      <Container>
        <SectionHeader
          label="Soft skill"
          title={<span id="soft-skills-title">Cara saya bekerja</span>}
          description="Kebiasaan yang menyertai pekerjaan menulis kode. Menggunakan skala penilaian mandiri yang sama seperti di atas."
        />
        <ul className="mt-14 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {softSkills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} variant="stat" />
          ))}
        </ul>
      </Container>
    </section>
  )
}

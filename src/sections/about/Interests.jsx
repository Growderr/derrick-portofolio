import AboutSection from '@/components/about/AboutSection'
import AreaRow from '@/components/ui/AreaRow'
import { useProfile } from '@/lib/content'

export default function Interests() {
  const { interests } = useProfile()

  return (
    <AboutSection
      id="interests"
      title="Minat & teknologi"
      description="Bidang yang ingin saya pelajari dan kembangkan. Ini adalah minat, bukan penilaian kemampuan."
    >
      <ul className="border-b-2 border-ink">
        {interests.map((interest) => (
          <AreaRow key={interest.title} title={interest.title} description={interest.description} />
        ))}
      </ul>
    </AboutSection>
  )
}

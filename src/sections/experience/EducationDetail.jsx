import AboutSection from '@/components/about/AboutSection'
import EducationTimeline from '@/components/experience/EducationTimeline'
import { useEducation } from '@/lib/content'

export default function EducationDetail() {
  const education = useEducation()

  return (
    <AboutSection
      id="education"
      title="Pendidikan"
      description="Dari yang terbaru. Teks bergaris putus-putus menandai detail yang akan ditambahkan."
    >
      <EducationTimeline entries={education} />
    </AboutSection>
  )
}

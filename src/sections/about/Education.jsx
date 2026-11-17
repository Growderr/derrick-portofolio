import AboutSection from '@/components/about/AboutSection'
import TimelineItem from '@/components/about/TimelineItem'
import { useEducation } from '@/lib/content'

export default function Education() {
  const education = useEducation()

  return (
    <AboutSection
      id="education"
      title="Latar belakang pendidikan"
      description="Dari yang terbaru. Teks bergaris putus-putus menandai detail yang akan ditambahkan."
    >
      <ol className="border-l-2 border-ink">
        {education.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </AboutSection>
  )
}

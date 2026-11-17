import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import ExperienceTimeline from '@/components/experience/ExperienceTimeline'
import { useEducation, useExperiences } from '@/lib/content'
import { buildTimeline } from '@/lib/timeline'

export default function Journey() {
  const education = useEducation()
  const experiences = useExperiences()

  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-20 py-section">
      <Container>
        <SectionHeader
          label="Sekilas"
          title={<span id="journey-title">Perjalanan sejauh ini</span>}
          description="Satu garis waktu yang merangkum semua di bawah ini. Entri baru akan muncul di sini secara otomatis."
        />
        <div className="mt-14">
          <ExperienceTimeline
            entries={buildTimeline({ education, ...experiences })}
            endNote="Entri lain akan muncul di sini seiring organisasi, lomba, dan pengalaman lain ditambahkan."
          />
        </div>
      </Container>
    </section>
  )
}

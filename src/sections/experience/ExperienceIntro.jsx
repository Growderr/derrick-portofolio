import Container from '@/components/layout/Container'
import SectionNav from '@/components/about/SectionNav'
import { experienceSections } from '@/data/navigation'

export default function ExperienceIntro() {
  return (
    <section aria-labelledby="experience-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="experience-heading" className="text-h1">
            Pengalaman &amp; Perjalanan Belajar.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Tempat saya belajar dan berlatih sejauh ini: sekolah, PLK, serta organisasi dan lomba yang
            akan ditambahkan seiring waktu. Teks bergaris putus-putus menandai detail yang akan menyusul.
          </p>
          <SectionNav sections={experienceSections} />
        </div>
      </Container>
    </section>
  )
}

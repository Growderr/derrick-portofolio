import Container from '@/components/layout/Container'
import SectionNav from '@/components/about/SectionNav'
import { testimonialCategories } from '@/data/testimonials'
import { useTestimonials } from '@/lib/content'

export default function TestimonialsIntro() {
  const testimonials = useTestimonials()
  const groups = testimonialCategories
    .filter((category) => testimonials.some((item) => item.category === category.id))
    .map(({ id, label }) => ({ id, label }))

  return (
    <section aria-labelledby="testimonials-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="testimonials-heading" className="text-h1">
            Kata mereka.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Masukan dari guru, teman, pengguna proyek, dan instansi tempat saya menjalani PLK. Hanya
            masukan asli yang ditampilkan, dengan kata-kata pemberinya sendiri.
          </p>
          {groups.length > 1 && <SectionNav sections={groups} />}
        </div>
      </Container>
    </section>
  )
}

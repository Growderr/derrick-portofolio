import { MessageSquareQuote } from 'lucide-react'
import Container from '@/components/layout/Container'
import AboutSection from '@/components/about/AboutSection'
import TestimonialCard from '@/components/testimonials/TestimonialCard'
import EmptyState from '@/components/ui/EmptyState'
import Reveal from '@/components/ui/Reveal'
import { testimonialCategories } from '@/data/testimonials'
import { useTestimonials } from '@/lib/content'

/** One section per group that has entries, or a single empty state. */
export default function TestimonialGroups() {
  const testimonials = useTestimonials()
  const groups = testimonialCategories
    .map((category) => ({
      ...category,
      items: testimonials.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0)

  if (groups.length === 0) {
    return (
      <section aria-label="Testimoni" className="py-section">
        <Container>
          <EmptyState
            icon={MessageSquareQuote}
            title="Belum ada testimoni"
            hint={
              <>
                Kelola lewat Panel Admin (<code>/admin</code>).
              </>
            }
          >
            <p>Testimoni akan muncul di sini setelah diterima. Testimoni dikelompokkan berdasarkan pemberinya:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {testimonialCategories.map(({ id, label }) => (
                <li key={id}>{label}</li>
              ))}
            </ul>
          </EmptyState>
        </Container>
      </section>
    )
  }

  return (
    <>
      {groups.map(({ id, label, description, items }) => (
        <AboutSection key={id} id={id} title={label} description={description}>
          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {items.map((item, position) => (
              <li key={item.id}>
                <Reveal delay={(position % 2) * 0.08} className="h-full">
                  <TestimonialCard testimonial={item} />
                </Reveal>
              </li>
            ))}
          </ul>
        </AboutSection>
      ))}
    </>
  )
}

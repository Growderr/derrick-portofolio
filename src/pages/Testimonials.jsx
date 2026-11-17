import TestimonialsIntro from '@/sections/testimonials/TestimonialsIntro'
import TestimonialGroups from '@/sections/testimonials/TestimonialGroups'
import TestimonialsCta from '@/sections/testimonials/TestimonialsCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Testimonials() {
  usePageTitle('Testimoni')

  return (
    <DataGate resources={[resources.testimonials]}>
      <TestimonialsIntro />
      <TestimonialGroups />
      <TestimonialsCta />
    </DataGate>
  )
}

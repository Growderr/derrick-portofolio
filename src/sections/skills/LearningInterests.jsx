import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import { useProfile } from '@/lib/content'

export default function LearningInterests() {
  const { learningInterests } = useProfile()

  return (
    <section id="learning" aria-labelledby="learning-title" className="scroll-mt-20 border-t border-line py-section">
      <Container>
        <SectionHeader
          label="Minat belajar"
          title={<span id="learning-title">Yang ingin saya jelajahi</span>}
          description="Ini minat, bukan penilaian kemampuan. Garis putus-putus menandai hal yang membuat saya penasaran, bukan yang sudah saya kuasai."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningInterests.map((item) => (
            <li key={item.title} className="border-2 border-dashed border-ink p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

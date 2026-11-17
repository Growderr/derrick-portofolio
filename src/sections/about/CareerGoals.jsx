import AboutSection from '@/components/about/AboutSection'
import { useProfile } from '@/lib/content'

export default function CareerGoals() {
  const { careerGoals, careerStatement } = useProfile()

  return (
    <AboutSection id="goals" title="Tujuan karier">
      <p className="max-w-2xl text-h3">{careerStatement}</p>

      <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {careerGoals.map((goal) => (
          <li key={goal.title} className="border-l-4 border-ink pl-4">
            <h3 className="text-h3">{goal.title}</h3>
            <p className="mt-2 text-muted">{goal.description}</p>
          </li>
        ))}
      </ul>
    </AboutSection>
  )
}

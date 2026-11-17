import AboutSection from '@/components/about/AboutSection'
import { useProfile } from '@/lib/content'

export default function Biography() {
  const { biography } = useProfile()

  return (
    <AboutSection id="biography" title="Biografi singkat">
      <div className="max-w-2xl space-y-6 text-lead">
        {biography.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </AboutSection>
  )
}

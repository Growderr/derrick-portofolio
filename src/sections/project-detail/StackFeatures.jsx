import AboutSection from '@/components/about/AboutSection'
import Missing from '@/components/projects/Missing'

export default function StackFeatures({ project }) {
  const tech = project.tech ?? []
  const features = project.features ?? []

  return (
    <AboutSection id="stack" title="Teknologi & fitur" description="Dengan apa proyek dibangun dan apa yang dapat dilakukannya.">
      <h3 className="text-h3">Teknologi</h3>
      {tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Teknologi">
          {tech.map((item) => (
            <li key={item} className="border-2 border-ink px-3 py-1.5 font-semibold">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">
          <Missing>Teknologi akan ditambahkan</Missing>
        </p>
      )}

      <h3 className="mt-14 text-h3">Fitur</h3>
      {features.length > 0 ? (
        <ul className="mt-5 border-b-2 border-ink">
          {features.map((feature) => (
            <li key={feature} className="flex gap-4 border-t-2 border-ink py-4">
              <span aria-hidden="true" className="mt-2 block size-2.5 shrink-0 border border-ink bg-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">
          <Missing>Fitur akan ditambahkan</Missing>
        </p>
      )}
    </AboutSection>
  )
}

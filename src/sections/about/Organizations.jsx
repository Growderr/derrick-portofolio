import AboutSection from '@/components/about/AboutSection'
import ExperienceEntry from '@/components/about/ExperienceEntry'
import EmptyState from '@/components/ui/EmptyState'
import { useExperiences } from '@/lib/content'

const fields = ['Organisasi atau kepanitiaan', 'Peran', 'Periode', 'Kontribusi saya']

export default function Organizations() {
  const { organizations } = useExperiences()

  return (
    <AboutSection
      id="organizations"
      title="Pengalaman organisasi & kepanitiaan"
    >
      {organizations.length > 0 ? (
        <ul className="border-b-2 border-ink">
          {organizations.map((item) => (
            <ExperienceEntry key={`${item.organization}-${item.period}`} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyState
          title="Belum ada entri"
          hint={
            <>
              Kelola lewat Panel Admin (<code>/admin</code>).
            </>
          }
        >
          <p>Organisasi dan kepanitiaan akan ditampilkan di sini setelah datanya tersedia. Setiap entri memuat:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {fields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </EmptyState>
      )}
    </AboutSection>
  )
}

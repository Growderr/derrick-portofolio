import { Trophy } from 'lucide-react'
import AboutSection from '@/components/about/AboutSection'
import ExperienceCard from '@/components/experience/ExperienceCard'
import EmptyState from '@/components/ui/EmptyState'
import { useExperiences } from '@/lib/content'

const fields = [
  'Nama lomba',
  'Penyelenggara',
  'Tanggal',
  'Kategori peserta',
  'Hasil atau prestasi',
  'Dokumentasi',
]

export default function CompetitionsDetail() {
  const { competitions } = useExperiences()

  return (
    <AboutSection id="competitions" title="Pengalaman lomba">
      {competitions.length > 0 ? (
        <div className="space-y-16">
          {competitions.map((item) => (
            <ExperienceCard
              key={`${item.name}-${item.date}`}
              title={item.name}
              subtitle={item.organizer}
              period={item.date}
              description={item.description}
              fields={[
                { label: 'Penyelenggara', value: item.organizer, placeholder: 'Penyelenggara akan ditambahkan' },
                { label: 'Kategori', value: item.category, placeholder: 'Kategori akan ditambahkan' },
                { label: 'Hasil', value: item.result, placeholder: 'Hasil akan ditambahkan' },
              ]}
              documentation={item.documentation}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="Belum ada lomba yang dicantumkan"
          hint={
            <>
              Kelola lewat Panel Admin (<code>/admin</code>).
            </>
          }
        >
          <p>Lomba akan ditampilkan di sini setelah dikonfirmasi. Setiap entri memuat:</p>
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

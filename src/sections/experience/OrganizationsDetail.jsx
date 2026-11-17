import { Users } from 'lucide-react'
import AboutSection from '@/components/about/AboutSection'
import ExperienceCard from '@/components/experience/ExperienceCard'
import EmptyState from '@/components/ui/EmptyState'
import { useExperiences } from '@/lib/content'

const fields = ['Nama organisasi', 'Jabatan', 'Periode', 'Tanggung jawab', 'Deskripsi', 'Dokumentasi']

export default function OrganizationsDetail() {
  const { organizations } = useExperiences()

  return (
    <AboutSection id="organizations" title="Pengalaman organisasi">
      {organizations.length > 0 ? (
        <div className="space-y-16">
          {organizations.map((org) => (
            <ExperienceCard
              key={`${org.organization}-${org.period}`}
              title={org.organization}
              subtitle={org.role}
              period={org.period}
              description={org.description}
              fields={[
                { label: 'Jabatan', value: org.role, placeholder: 'Jabatan akan ditambahkan' },
                {
                  label: 'Tanggung jawab',
                  value: org.responsibilities ?? [],
                  placeholder: 'Tanggung jawab akan ditambahkan',
                },
              ]}
              documentation={org.documentation}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="Belum ada pengalaman organisasi"
          hint={
            <>
              Kelola lewat Panel Admin (<code>/admin</code>).
            </>
          }
        >
          <p>Organisasi dan kepanitiaan akan ditampilkan di sini setelah dikonfirmasi. Setiap entri memuat:</p>
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

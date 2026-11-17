import AboutSection from '@/components/about/AboutSection'
import ExperienceCard from '@/components/experience/ExperienceCard'
import { useExperiences } from '@/lib/content'

export default function PlkDetail() {
  const { plk } = useExperiences()

  return (
    <AboutSection
      id="plk"
      title="Pengalaman PLK"
      description="Praktik Lapangan Kerja. Detail yang sudah pasti telah diisi; sisanya berupa placeholder."
    >
      <ExperienceCard
        title={plk.institution}
        titlePlaceholder="Nama instansi akan ditambahkan"
        subtitle="Praktik Lapangan Kerja"
        period={plk.duration}
        description={plk.description}
        fields={[
          { label: 'Posisi', value: plk.position, placeholder: 'Posisi atau peran akan ditambahkan' },
          { label: 'Durasi', value: plk.duration, placeholder: 'Tanggal mulai dan selesai akan ditambahkan' },
          { label: 'Kegiatan', value: plk.activities, placeholder: 'Kegiatan akan ditambahkan' },
          {
            label: 'Tanggung jawab',
            value: plk.responsibilities,
            placeholder: 'Tanggung jawab akan ditambahkan',
          },
        ]}
        technologies={plk.technologies}
        documentation={plk.documentation}
      />
    </AboutSection>
  )
}

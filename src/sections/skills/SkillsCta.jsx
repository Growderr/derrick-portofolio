import CtaBand from '@/components/ui/CtaBand'

export default function SkillsCta() {
  return (
    <CtaBand
      id="skills-cta-heading"
      title="Keahlian lebih mudah dinilai lewat konteks."
      description="Lihat bagaimana saya menerapkannya di bagian pengalaman, atau hubungi saya."
      actions={[
        { label: 'Lihat Pengalaman', to: '/experience', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

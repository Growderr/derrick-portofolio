import CtaBand from '@/components/ui/CtaBand'

export default function HomeCta() {
  return (
    <CtaBand
      id="home-cta-heading"
      title="Silakan jelajahi, atau hubungi saya."
      description="Proyek, CV, dan cara menghubungi saya hanya berjarak satu klik."
      actions={[
        { label: 'Lihat Portofolio', to: '/projects', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

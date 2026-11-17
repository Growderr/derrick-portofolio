import CtaBand from '@/components/ui/CtaBand'

export default function ProjectDetailCta() {
  return (
    <CtaBand
      id="project-cta-heading"
      title="Lihat karya saya yang lain."
      description="Kembali ke daftar lengkap, atau hubungi saya tentang proyek ini."
      actions={[
        { label: 'Semua Proyek', to: '/projects', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

import CtaBand from '@/components/ui/CtaBand'

export default function ProjectsCta() {
  return (
    <CtaBand
      id="projects-cta-heading"
      title="Punya ide yang layak dibangun?"
      description="Pelajari cara saya bekerja, atau kirim pesan."
      actions={[
        { label: 'Hubungi Saya', to: '/contact', variant: 'primary' },
        { label: 'Lihat Pengalaman', to: '/experience', variant: 'secondary' },
      ]}
    />
  )
}

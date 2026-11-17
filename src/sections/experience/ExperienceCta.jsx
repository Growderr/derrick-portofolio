import CtaBand from '@/components/ui/CtaBand'

export default function ExperienceCta() {
  return (
    <CtaBand
      id="experience-cta-heading"
      title="Mari bicarakan langkah berikutnya."
      description="Baca CV untuk versi ringkasnya, atau kirim pesan."
      actions={[
        { label: 'Lihat CV', to: '/resume', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

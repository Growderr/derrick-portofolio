import CtaBand from '@/components/ui/CtaBand'

export default function AboutCta() {
  return (
    <CtaBand
      id="about-cta-heading"
      title="Ingin tahu lebih banyak?"
      description="Baca CV untuk versi ringkasnya, atau kirim pesan."
      actions={[
        { label: 'Lihat CV', to: '/resume', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

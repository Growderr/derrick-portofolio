import CtaBand from '@/components/ui/CtaBand'

export default function TestimonialsCta() {
  return (
    <CtaBand
      id="testimonials-cta-heading"
      title="Pernah bekerja dengan saya? Ceritakan."
      description="Tinggalkan pesan di buku tamu, atau kirim pesan langsung."
      actions={[
        { label: 'Isi Buku Tamu', to: '/guestbook', variant: 'primary' },
        { label: 'Hubungi Saya', to: '/contact', variant: 'secondary' },
      ]}
    />
  )
}

import CtaBand from '@/components/ui/CtaBand'

export default function BlogCta() {
  return (
    <CtaBand
      id="blog-cta-heading"
      title="Punya pertanyaan atau ide?"
      description="Beri tahu saya topik yang ingin Anda baca, atau apa yang sedang Anda bangun."
      actions={[
        { label: 'Hubungi Saya', to: '/contact', variant: 'primary' },
        { label: 'Lihat Proyek', to: '/projects', variant: 'secondary' },
      ]}
    />
  )
}

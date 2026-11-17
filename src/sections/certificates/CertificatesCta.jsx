import CtaBand from '@/components/ui/CtaBand'

export default function CertificatesCta() {
  return (
    <CtaBand
      id="certificates-cta-heading"
      title="Ingin gambaran lengkapnya?"
      description="Halaman pengalaman menunjukkan asal semua ini, dan CV memuat versi ringkasnya."
      actions={[
        { label: 'Lihat Pengalaman', to: '/experience', variant: 'primary' },
        { label: 'Lihat CV', to: '/resume', variant: 'secondary' },
      ]}
    />
  )
}

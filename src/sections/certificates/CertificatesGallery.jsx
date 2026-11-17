import Container from '@/components/layout/Container'
import CertificateGallery from '@/components/certificates/CertificateGallery'
import { certificateCategories } from '@/data/certificates'
import { useCertificates } from '@/lib/content'

export default function CertificatesGallery() {
  const certificates = useCertificates()

  return (
    <section aria-label="Galeri sertifikat" className="py-section">
      <Container>
        <CertificateGallery certificates={certificates} categories={certificateCategories} />
      </Container>
    </section>
  )
}

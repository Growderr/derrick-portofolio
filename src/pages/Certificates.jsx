import CertificatesIntro from '@/sections/certificates/CertificatesIntro'
import CertificatesGallery from '@/sections/certificates/CertificatesGallery'
import CertificatesCta from '@/sections/certificates/CertificatesCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Certificates() {
  usePageTitle('Sertifikat')

  return (
    <DataGate resources={[resources.certificates]}>
      <CertificatesIntro />
      <CertificatesGallery />
      <CertificatesCta />
    </DataGate>
  )
}

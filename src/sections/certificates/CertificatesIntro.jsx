import Container from '@/components/layout/Container'

export default function CertificatesIntro() {
  return (
    <section aria-labelledby="certificates-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="certificates-heading" className="text-h1">
            Sertifikat &amp; Prestasi.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Kursus, lomba, dan penghargaan, masing-masing dengan penerbit dan tanggalnya. Hanya entri
            yang sudah dikonfirmasi yang dicantumkan, dan teks bergaris putus-putus menandai detail
            yang akan menyusul.
          </p>
        </div>
      </Container>
    </section>
  )
}

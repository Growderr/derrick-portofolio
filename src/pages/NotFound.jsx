import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { usePageTitle } from '@/hooks/usePageTitle'

/** Reusable fallback for any route that does not exist. */
export default function NotFound() {
  usePageTitle('Halaman tidak ditemukan')

  return (
    <section className="py-section">
      <Container>
        <p className="font-display text-display" aria-hidden="true">
          404<span className="text-accent [-webkit-text-stroke:2px_var(--ink)]">.</span>
        </p>
        <h1 className="mt-8 text-h2">Halaman ini tidak ada.</h1>
        <p className="mt-4 max-w-md text-lead text-muted">
          Alamat mungkin salah ketik, atau halaman telah dipindahkan. Kembali ke beranda atau pilih
          bagian dari navigasi.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Kembali ke beranda</Button>
          <Button to="/projects" variant="secondary">
            Lihat Portofolio
          </Button>
        </div>
      </Container>
    </section>
  )
}

import { Mail } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { useContactLinks } from '@/lib/content'

/** Yellow closing band. The main action is email, or a clear note while no email is set. */
export default function ContactCta() {
  const emailLink = useContactLinks()[0]

  return (
    <section aria-labelledby="contact-cta-heading" className="border-y-2 border-ink bg-accent text-on-accent">
      <Container className="grid gap-10 py-section lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-8">
          <h2 id="contact-cta-heading" className="text-h1">
            Punya sesuatu yang ingin dibicarakan?
          </h2>
          <p className="mt-6 max-w-xl text-lead">
            {emailLink.url
              ? 'Kirim pesan kepada saya dan saya akan membalasnya.'
              : 'Alamat email saya belum ditambahkan. Sampai saat itu, buku tamu adalah cara tercepat untuk meninggalkan pesan.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
          {emailLink.url ? (
            <Button href={emailLink.url} icon={Mail} variant="primary">
              Kirim email
            </Button>
          ) : (
            <Button to="/guestbook" variant="primary">
              Isi Buku Tamu
            </Button>
          )}
          <Button to="/resume" variant="secondary">
            Lihat CV
          </Button>
        </div>
      </Container>
    </section>
  )
}

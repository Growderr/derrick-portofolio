import Container from '@/components/layout/Container'
import ContactLinks from '@/components/contact/ContactLinks'
import { useContactLinks } from '@/lib/content'

export default function ContactDetails() {
  const contactLinks = useContactLinks()
  const missing = contactLinks.some((link) => !link.url)

  return (
    <section aria-labelledby="contact-links-heading" className="py-section">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
        <header className="lg:col-span-4">
          <h2 id="contact-links-heading" className="text-h2">
            Email &amp; media sosial
          </h2>
          <p className="mt-4 max-w-xs text-muted">Tautan terbuka di tab baru.</p>
        </header>
        <div className="lg:col-span-8">
          <ContactLinks links={contactLinks} />
          {missing && (
            <p className="mt-6 text-sm text-muted">
              Tambahkan detail yang belum ada di Panel Admin, bagian Profil.
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

import Container from '@/components/layout/Container'
import { useProfile } from '@/lib/content'

export default function ContactIntro() {
  const profile = useProfile()

  return (
    <section aria-labelledby="contact-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="contact-heading" className="text-h1">
            Mari terhubung.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Pertanyaan, masukan, atau sekadar menyapa: berikut tempat-tempat untuk menemukan saya.
            Saya berdomisili di {profile.location}. Teks bergaris putus-putus menandai detail yang
            akan menyusul.
          </p>
        </div>
      </Container>
    </section>
  )
}

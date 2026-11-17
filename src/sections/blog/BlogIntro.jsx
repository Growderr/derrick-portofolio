import Container from '@/components/layout/Container'

export default function BlogIntro() {
  return (
    <section aria-labelledby="blog-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-8">
          <h1 id="blog-heading" className="text-h1">
            Blog Pengembang.
          </h1>
          <p className="mt-6 max-w-xl text-lead text-muted">
            Catatan dari hal-hal yang saya pelajari saat membangun: apa yang berhasil, apa yang tidak,
            dan apa yang akan saya lakukan secara berbeda lain kali.
          </p>
        </div>
      </Container>
    </section>
  )
}

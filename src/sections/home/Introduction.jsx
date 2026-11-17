import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { useProfile } from '@/lib/content'

/** Personal statement: one large sentence, then two quieter paragraphs. */
export default function Introduction() {
  const { introStatement, introParagraphs } = useProfile()

  return (
    <section aria-labelledby="intro-heading" className="py-section">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-8">
        <p className="font-mono text-xs tracking-wide uppercase lg:col-span-12 lg:border-t-2 lg:border-ink lg:pt-3">
          Perkenalan
        </p>
        <h2 id="intro-heading" className="text-h2 lg:col-span-7 lg:text-h1">
          {introStatement}
        </h2>

        <div className="space-y-5 text-lead lg:col-span-5 lg:col-start-8 lg:pt-3">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Button to="/about" variant="text" className="-ml-2">
            Selengkapnya tentang saya
          </Button>
        </div>
      </Container>
    </section>
  )
}

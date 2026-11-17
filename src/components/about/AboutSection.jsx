import Container from '@/components/layout/Container'

/** Two-column About section: sticky heading on the left, content on the right. */
export default function AboutSection({ id, title, description, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-b border-line py-section"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 id={`${id}-title`} className="text-h2">
              {title}
            </h2>
            {description && <p className="mt-4 max-w-xs text-muted">{description}</p>}
          </div>
        </header>
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  )
}

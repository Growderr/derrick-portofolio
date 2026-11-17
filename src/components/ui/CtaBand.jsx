import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

/** Full-width yellow closing block with a heading and up to three actions. */
export default function CtaBand({ id, title, description, actions }) {
  return (
    <section aria-labelledby={id} className="border-y-2 border-ink bg-accent text-on-accent">
      <Container className="grid gap-10 py-section lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-8">
          <h2 id={id} className="text-h1">
            {title}
          </h2>
          {description && <p className="mt-6 max-w-xl text-lead">{description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
          {actions.map(({ label, to, variant }) => (
            <Button key={to} to={to} variant={variant}>
              {label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}

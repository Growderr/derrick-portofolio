import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { usePageTitle } from '@/hooks/usePageTitle'

/**
 * Temporary page used by every route whose content ships in a later phase.
 * `detail` is an optional { label, value } pair, used by slug routes.
 */
export default function PlaceholderPage({ title, description, route, detail }) {
  usePageTitle(title)

  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeader
              as="h1"
              label="Direncanakan untuk tahap berikutnya"
              title={title}
              description={description}
            />
          </div>

          <dl className="space-y-6 border-l-2 border-ink pl-5 lg:col-span-4">
            <div>
              <dt className="font-mono text-xs tracking-wide text-muted uppercase">Rute</dt>
              <dd className="font-semibold">{route}</dd>
            </div>
            {detail && (
              <div>
                <dt className="font-mono text-xs tracking-wide text-muted uppercase">{detail.label}</dt>
                <dd className="font-semibold break-words">{detail.value}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs tracking-wide text-muted uppercase">Status</dt>
              <dd className="font-semibold">Halaman placeholder</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12">
          <Button to="/" variant="secondary">
            Kembali ke beranda
          </Button>
        </div>
      </Container>
    </section>
  )
}

import { TriangleAlert } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { useResource } from '@/lib/content'

/** Page-sized loading placeholder: quiet grey blocks in the site's own style. */
export function LoadingState({ label = 'Memuat konten' }) {
  return (
    <section data-no-reveal role="status" aria-live="polite" className="py-section">
      <Container>
        <p className="mb-8 flex items-center gap-3 font-mono text-xs font-medium tracking-wide uppercase">
          <span aria-hidden="true" className="block size-3 border border-ink bg-accent motion-safe:animate-pulse" />
          {label}…
        </p>
        <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
          <div className="h-12 max-w-xl bg-surface" />
          <div className="h-5 max-w-2xl bg-surface" />
          <div className="h-5 max-w-lg bg-surface" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-44 border-2 border-line bg-surface" />
            <div className="h-44 border-2 border-line bg-surface" />
            <div className="hidden h-44 border-2 border-line bg-surface lg:block" />
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Shown when content could not be loaded. `onRetry` tries again. */
export function ErrorState({ onRetry, title = 'Konten gagal dimuat' }) {
  return (
    <section data-no-reveal className="py-section">
      <Container>
        <EmptyState
          icon={TriangleAlert}
          title={title}
          action={onRetry && <Button onClick={onRetry}>Coba lagi</Button>}
        >
          <p>
            Terjadi masalah saat mengambil data dari server. Periksa koneksi internet Anda, lalu coba lagi.
          </p>
        </EmptyState>
      </Container>
    </section>
  )
}

/**
 * Renders `children` once every listed resource has loaded, with a loading and
 * an error state around it. With no Supabase configured resources are local
 * and ready at once, so nothing flashes.
 *
 *   <DataGate resources={[resources.profile, resources.projects]}> ... </DataGate>
 *
 * The list must keep the same length between renders (it is a hook per entry).
 */
export default function DataGate({ resources, children }) {
  /* eslint-disable-next-line react-hooks/rules-of-hooks -- fixed-length list per call site */
  const states = resources.map((resource) => useResource(resource))

  if (states.some((state) => state.status === 'error')) {
    return <ErrorState onRetry={() => states.forEach((state) => state.reload())} />
  }
  if (states.some((state) => state.status === 'loading')) return <LoadingState />
  return children
}

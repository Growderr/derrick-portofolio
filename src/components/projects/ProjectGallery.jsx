import { useMemo } from 'react'
import { FolderOpen } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import ProjectFilter from '@/components/projects/ProjectFilter'
import ProjectGrid from '@/components/projects/ProjectGrid'
import LoadMore from '@/components/ui/LoadMore'
import { usePaged } from '@/hooks/usePaged'
import { ALL_CATEGORY, filterProjects, getCategoryLabel, getCategoryOptions } from '@/lib/projects'

/**
 * The /projects gallery: category filter, result count, editorial grid and empty states.
 * The active category lives in the address (?category=web-app), so a filtered view
 * can be shared, reloaded, and walked back to with the browser's Back button.
 */
// A multiple of 4 keeps the editorial rhythm of the grid intact between pages.
const PAGE_SIZE = 8

export default function ProjectGallery({ projects }) {
  const [params, setParams] = useSearchParams()
  const options = useMemo(() => getCategoryOptions(projects), [projects])

  const requested = params.get('category')
  const active = options.some((option) => option.id === requested) ? requested : ALL_CATEGORY
  const visible = useMemo(() => filterProjects(projects, active), [projects, active])
  const { shown, hasMore, remaining, loadMore } = usePaged(visible, PAGE_SIZE, active)

  function select(id) {
    setParams(id === ALL_CATEGORY ? {} : { category: id }, { replace: true, preventScrollReset: true })
  }

  return (
    <section aria-labelledby="gallery-heading" className="py-section">
      <Container>
        <h2 id="gallery-heading" className="sr-only">
          Semua proyek
        </h2>

        {projects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="Belum ada proyek yang ditambahkan."
            hint={
              <>
                Tambahkan proyek nyata lewat Panel Admin (<code>/admin</code>) dan proyek tersebut akan
                muncul di sini lengkap dengan filter dan halaman detailnya sendiri.
              </>
            }
            action={
              <>
                <Button to="/experience" variant="secondary">
                  Lihat pengalaman saya
                </Button>
                <Button to="/skills" variant="text">
                  Lihat keahlian saya
                </Button>
              </>
            }
          >
            <p>
              Galeri ini tetap kosong sampai karya nyata ditambahkan. Tidak ada konten rekaan di sini.
            </p>
          </EmptyState>
        ) : (
          <>
            <div className="flex flex-col gap-5 border-b-2 border-ink pb-6 lg:flex-row lg:items-center lg:justify-between">
              <ProjectFilter options={options} active={active} onChange={select} />
              <p role="status" aria-live="polite" className="text-sm text-muted">
                Menampilkan {visible.length} dari {projects.length} proyek
                {active !== ALL_CATEGORY && <> dalam kategori {getCategoryLabel(active)}</>}
              </p>
            </div>

            <div className="mt-12">
              {visible.length > 0 ? (
                // Keyed by category so cards settle in again when the filter changes.
                <>
                  <ProjectGrid key={active} projects={shown} label="Proyek" />
                  <LoadMore hasMore={hasMore} remaining={remaining} onClick={loadMore} />
                </>
              ) : (
                <EmptyState
                  icon={FolderOpen}
                  title="Tidak ada proyek dalam kategori ini."
                  action={<Button variant="secondary" onClick={() => select(ALL_CATEGORY)}>Tampilkan semua proyek</Button>}
                />
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  )
}

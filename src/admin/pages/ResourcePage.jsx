import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import FormNotice from '@/components/ui/FormNotice'
import { inputStyles } from '@/components/ui/FormField'
import ContentForm from '@/admin/ui/ContentForm'
import { AdminHeading, ConfirmDialog, Pager, StatusPill } from '@/admin/ui/Parts'
import { PAGE_SIZE, deleteRow, listRows, patchRow, saveRow } from '@/admin/lib/crud'
import { filesOfRecord, removeFiles } from '@/admin/lib/storage'
import { invalidateContent } from '@/lib/content'
import { friendlyError } from '@/lib/friendlyError'

function cell(column, row) {
  const raw = row[column.key]
  if (raw === null || raw === undefined || raw === '') return column.empty ?? '-'
  if (column.options) return column.options.find((option) => option.value === raw)?.label ?? raw
  return String(raw)
}

/** Debounces a fast-changing value (the search box). */
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

/**
 * Generic list + add/edit screen for one table, driven by an admin/config entry.
 * Every change goes through Supabase, where Row Level Security decides if it is allowed.
 */
export default function ResourcePage({ config }) {
  const [view, setView] = useState({ mode: 'list' })
  const [state, setState] = useState({ status: 'loading', rows: [], count: 0, error: null })
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [reloadKey, setReloadKey] = useState(0)
  const [notice, setNotice] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [busy, setBusy] = useState(false)
  const query = useDebounced(search)

  useEffect(() => {
    document.title = `${config.title} | Panel Admin`
  }, [config.title])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    if (view.mode !== 'list') return undefined
    let alive = true
    listRows(config.table, { page, search: query, searchColumns: config.searchColumns, filters, orderBy: config.orderBy })
      .then(({ rows, count }) => {
        if (!alive) return
        if (rows.length === 0 && count > 0 && page > 0) setPage(Math.max(0, Math.ceil(count / PAGE_SIZE) - 1))
        else setState({ status: 'ready', rows, count, error: null })
      })
      .catch((error) => alive && setState((current) => ({ ...current, status: 'error', error })))
    return () => {
      alive = false
    }
  }, [config, view.mode, page, query, filters, reloadKey])

  const resetPage = () => setPage(0)

  async function handleSave(payload) {
    const body = config.beforeSave ? config.beforeSave(payload) : payload
    await saveRow(config.table, view.record?.id ?? null, body)
    invalidateContent(config.cache)
    setNotice(view.record ? `Perubahan pada ${config.singular} disimpan.` : `${config.singular[0].toUpperCase()}${config.singular.slice(1)} baru ditambahkan.`)
    setView({ mode: 'list' })
  }

  async function togglePublished(row) {
    setNotice(null)
    try {
      const next = !row.is_published
      await patchRow(config.table, row.id, config.publishPatch ? config.publishPatch(row, next) : { is_published: next })
      invalidateContent(config.cache)
      setNotice(next ? 'Sekarang tampil di situs.' : 'Sekarang disembunyikan dari situs.')
      reload()
    } catch (error) {
      setNotice({ error: friendlyError(error) })
    }
  }

  async function confirmDelete() {
    const row = pendingDelete
    setBusy(true)
    try {
      await deleteRow(config.table, row.id)
      await removeFiles(filesOfRecord(config.fields, row))
      invalidateContent(config.cache)
      setNotice(`Data ${config.singular} dihapus.`)
      setPendingDelete(null)
      reload()
    } catch (error) {
      setPendingDelete(null)
      setNotice({ error: friendlyError(error) })
    } finally {
      setBusy(false)
    }
  }

  if (view.mode === 'form') {
    return (
      <div>
        <AdminHeading title={view.record ? `Ubah ${config.singular}` : `Tambah ${config.singular}`} />
        <ContentForm
          key={view.record?.id ?? 'new'}
          fields={config.fields}
          record={view.record}
          defaults={config.defaults}
          onSubmit={handleSave}
          onCancel={() => setView({ mode: 'list' })}
        />
      </div>
    )
  }

  const hasFilter = Boolean(query) || Object.values(filters).some(Boolean)

  return (
    <div>
      <AdminHeading
        title={config.title}
        description={config.description}
        action={
          <Button icon={Plus} onClick={() => { setNotice(null); setView({ mode: 'form', record: null }) }}>
            Tambah {config.singular}
          </Button>
        }
      />

      {notice && (
        <div className="mb-6">
          {typeof notice === 'string' ? <FormNotice>{notice}</FormNotice> : <FormNotice tone="error">{notice.error}</FormNotice>}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="min-w-56 flex-1">
          <label htmlFor="admin-search" className="mb-2 block font-mono text-xs font-medium tracking-wide uppercase">
            Cari
          </label>
          <input id="admin-search" type="search" className={inputStyles} value={search} onChange={(event) => { setSearch(event.target.value); resetPage() }} placeholder={`Cari ${config.singular}…`} />
        </div>
        {config.filters?.map((filter) => (
          <div key={filter.key}>
            <label htmlFor={`filter-${filter.key}`} className="mb-2 block font-mono text-xs font-medium tracking-wide uppercase">
              {filter.label}
            </label>
            <select id={`filter-${filter.key}`} className={inputStyles} value={filters[filter.key] ?? ''} onChange={(event) => { setFilters((current) => ({ ...current, [filter.key]: event.target.value })); resetPage() }}>
              <option value="">Semua</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {state.status === 'loading' && <p role="status" className="font-mono text-xs tracking-wide uppercase">Memuat…</p>}

      {state.status === 'error' && (
        <div role="alert" className="border-2 border-dashed border-ink p-6">
          <p className="text-h3">Data gagal dimuat</p>
          <p className="mt-2 text-muted">{friendlyError(state.error)}</p>
          <Button className="mt-5" variant="secondary" onClick={reload}>
            Coba lagi
          </Button>
        </div>
      )}

      {state.status === 'ready' && state.rows.length === 0 && (
        <EmptyState title={hasFilter ? 'Tidak ada hasil' : `Belum ada ${config.singular}`}>
          <p>{hasFilter ? 'Ubah kata kunci atau filter.' : `Klik "Tambah ${config.singular}" untuk membuat yang pertama.`}</p>
        </EmptyState>
      )}

      {state.status === 'ready' && state.rows.length > 0 && (
        <>
          <ul className="border-b-2 border-ink">
            {state.rows.map((row) => (
              <li key={row.id} className="grid gap-4 border-t-2 border-ink py-5 md:grid-cols-12 md:items-center">
                <div className="min-w-0 md:col-span-6">
                  <p className="text-h3 break-words">{cell(config.columns[0], row)}</p>
                  <p className="mt-1 flex flex-wrap gap-x-4 font-mono text-xs text-muted">
                    {config.columns.slice(1).map((column) => (
                      <span key={column.key}>
                        {column.label}: {cell(column, row)}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <StatusPill on={row.is_published} />
                </div>
                <div className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
                  <Button size="sm" variant="secondary" icon={Pencil} onClick={() => { setNotice(null); setView({ mode: 'form', record: row }) }} aria-label={`Ubah ${cell(config.columns[0], row)}`}>
                    Ubah
                  </Button>
                  <Button size="sm" variant="secondary" icon={row.is_published ? EyeOff : Eye} onClick={() => togglePublished(row)}>
                    {row.is_published ? 'Sembunyikan' : 'Terbitkan'}
                  </Button>
                  <Button size="sm" variant="secondary" icon={Trash2} onClick={() => setPendingDelete(row)} aria-label={`Hapus ${cell(config.columns[0], row)}`}>
                    Hapus
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Pager page={page} pageSize={PAGE_SIZE} total={state.count} onPage={setPage} />
        </>
      )}

      <ConfirmDialog open={Boolean(pendingDelete)} busy={busy} title={`Hapus ${config.singular} ini?`} onConfirm={confirmDelete} onCancel={() => setPendingDelete(null)}>
        <p>
          <strong className="text-ink">{pendingDelete ? cell(config.columns[0], pendingDelete) : ''}</strong> akan dihapus
          permanen beserta gambar yang diunggah untuknya. Tindakan ini tidak bisa dibatalkan.
        </p>
      </ConfirmDialog>
    </div>
  )
}

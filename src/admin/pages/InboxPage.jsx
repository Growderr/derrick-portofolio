import { useCallback, useEffect, useState } from 'react'
import { Eye, EyeOff, Mail, MailOpen, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import FormNotice from '@/components/ui/FormNotice'
import { inputStyles } from '@/components/ui/FormField'
import { AdminHeading, ConfirmDialog, Pager, StatusPill } from '@/admin/ui/Parts'
import { PAGE_SIZE, deleteRow, listRows, patchRow } from '@/admin/lib/crud'
import { invalidateContent } from '@/lib/content'
import { friendlyError } from '@/lib/friendlyError'

const dateTime = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

const kinds = {
  messages: {
    table: 'contact_messages',
    title: 'Pesan masuk',
    singular: 'pesan',
    description: 'Pesan dari formulir kontak. Hanya Anda yang bisa membacanya.',
    searchColumns: ['name', 'email', 'subject', 'message'],
    filterKey: 'is_read',
    filterOptions: [{ value: 'false', label: 'Belum dibaca' }, { value: 'true', label: 'Sudah dibaca' }],
    filterLabel: 'Status',
  },
  guestbook: {
    table: 'guestbook',
    title: 'Buku tamu',
    singular: 'pesan buku tamu',
    description: 'Pesan baru tersembunyi sampai Anda menampilkannya.',
    searchColumns: ['name', 'message'],
    filterKey: 'is_published',
    filterOptions: [{ value: 'false', label: 'Menunggu tinjauan' }, { value: 'true', label: 'Tampil' }],
    filterLabel: 'Status',
    cache: 'guestbook',
  },
}

/** Visitor messages (contact form and guestbook): read, show or hide, delete. */
export default function InboxPage({ kind }) {
  const config = kinds[kind]
  const isMessages = kind === 'messages'
  const [state, setState] = useState({ status: 'loading', rows: [], count: 0, error: null })
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(isMessages ? 'false' : 'false')
  const [openId, setOpenId] = useState(null)
  const [notice, setNotice] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [busy, setBusy] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    document.title = `${config.title} | Panel Admin`
  }, [config.title])

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    let alive = true
    listRows(config.table, { page, search: query, searchColumns: config.searchColumns, filters: { [config.filterKey]: filter }, orderBy: [['created_at', false]] })
      .then(({ rows, count }) => {
        if (!alive) return
        if (rows.length === 0 && count > 0 && page > 0) setPage(Math.max(0, Math.ceil(count / PAGE_SIZE) - 1))
        else setState({ status: 'ready', rows, count, error: null })
      })
      .catch((error) => alive && setState((current) => ({ ...current, status: 'error', error })))
    return () => {
      alive = false
    }
  }, [config, page, query, filter, reloadKey])

  async function patch(row, change, message) {
    setNotice(null)
    try {
      await patchRow(config.table, row.id, change)
      if (config.cache) invalidateContent(config.cache)
      if (message) setNotice(message)
      reload()
    } catch (error) {
      setNotice({ error: friendlyError(error) })
    }
  }

  function toggleOpen(row) {
    const opening = openId !== row.id
    setOpenId(opening ? row.id : null)
    // Opening an unread message marks it as read.
    if (opening && isMessages && !row.is_read) {
      setState((current) => ({ ...current, rows: current.rows.map((item) => (item.id === row.id ? { ...item, is_read: true } : item)) }))
      patchRow(config.table, row.id, { is_read: true }).catch(() => {})
    }
  }

  async function confirmDelete() {
    setBusy(true)
    try {
      await deleteRow(config.table, pendingDelete.id)
      if (config.cache) invalidateContent(config.cache)
      setNotice('Pesan dihapus.')
      setPendingDelete(null)
      reload()
    } catch (error) {
      setPendingDelete(null)
      setNotice({ error: friendlyError(error) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <AdminHeading title={config.title} description={config.description} />

      {notice && (
        <div className="mb-6">
          {typeof notice === 'string' ? <FormNotice>{notice}</FormNotice> : <FormNotice tone="error">{notice.error}</FormNotice>}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="min-w-56 flex-1">
          <label htmlFor="inbox-search" className="mb-2 block font-mono text-xs font-medium tracking-wide uppercase">Cari</label>
          <input id="inbox-search" type="search" className={inputStyles} value={search} onChange={(event) => { setSearch(event.target.value); setPage(0) }} placeholder="Cari nama atau isi pesan…" />
        </div>
        <div>
          <label htmlFor="inbox-filter" className="mb-2 block font-mono text-xs font-medium tracking-wide uppercase">{config.filterLabel}</label>
          <select id="inbox-filter" className={inputStyles} value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0) }}>
            <option value="">Semua</option>
            {config.filterOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {state.status === 'loading' && <p role="status" className="font-mono text-xs tracking-wide uppercase">Memuat…</p>}

      {state.status === 'error' && (
        <div role="alert" className="border-2 border-dashed border-ink p-6">
          <p className="text-h3">Data gagal dimuat</p>
          <p className="mt-2 text-muted">{friendlyError(state.error)}</p>
          <Button className="mt-5" variant="secondary" onClick={reload}>Coba lagi</Button>
        </div>
      )}

      {state.status === 'ready' && state.rows.length === 0 && (
        <EmptyState title="Tidak ada pesan"><p>Tidak ada pesan yang cocok dengan filter ini.</p></EmptyState>
      )}

      {state.status === 'ready' && state.rows.length > 0 && (
        <>
          <ul className="border-b-2 border-ink">
            {state.rows.map((row) => {
              const open = !isMessages || openId === row.id
              const unread = isMessages && !row.is_read
              return (
                <li key={row.id} className="border-t-2 border-ink py-5">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div className="min-w-0">
                      {isMessages ? (
                        <button type="button" aria-expanded={open} onClick={() => toggleOpen(row)} className="text-left hover:bg-accent">
                          <span className={unread ? 'text-h3' : 'text-h3 font-medium'}>{row.subject || 'Tanpa subjek'}</span>
                        </button>
                      ) : (
                        <p className="text-h3">{row.name}</p>
                      )}
                      <p className="mt-1 font-mono text-xs text-muted">
                        {isMessages ? `${row.name} · ${row.email} · ` : ''}
                        {dateTime.format(new Date(row.created_at))}
                      </p>
                    </div>
                    {isMessages ? (
                      <StatusPill on={unread} onLabel="Baru" offLabel="Dibaca" />
                    ) : (
                      <StatusPill on={row.is_published} onLabel="Tampil" offLabel="Menunggu" />
                    )}
                  </div>

                  {open && (
                    <div className="mt-4">
                      <p className="max-w-2xl break-words whitespace-pre-line">{row.message}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {isMessages ? (
                          <>
                            <Button size="sm" href={`mailto:${row.email}?subject=${encodeURIComponent(`Re: ${row.subject || 'Pesan Anda'}`)}`} icon={Mail}>
                              Balas lewat email
                            </Button>
                            <Button size="sm" variant="secondary" icon={row.is_read ? Mail : MailOpen} onClick={() => patch(row, { is_read: !row.is_read })}>
                              {row.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="secondary" icon={row.is_published ? EyeOff : Eye} onClick={() => patch(row, { is_published: !row.is_published }, row.is_published ? 'Pesan disembunyikan.' : 'Pesan sekarang tampil di buku tamu.')}>
                            {row.is_published ? 'Sembunyikan' : 'Tampilkan'}
                          </Button>
                        )}
                        <Button size="sm" variant="secondary" icon={Trash2} onClick={() => setPendingDelete(row)}>
                          Hapus
                        </Button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          <Pager page={page} pageSize={PAGE_SIZE} total={state.count} onPage={setPage} />
        </>
      )}

      <ConfirmDialog open={Boolean(pendingDelete)} busy={busy} title="Hapus pesan ini?" onConfirm={confirmDelete} onCancel={() => setPendingDelete(null)}>
        <p>Pesan dari <strong className="text-ink">{pendingDelete?.name}</strong> akan dihapus permanen dan tidak bisa dikembalikan.</p>
      </ConfirmDialog>
    </div>
  )
}

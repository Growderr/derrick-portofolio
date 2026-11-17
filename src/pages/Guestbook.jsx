import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import CtaBand from '@/components/ui/CtaBand'
import EmptyState from '@/components/ui/EmptyState'
import FormField from '@/components/ui/FormField'
import FormNotice from '@/components/ui/FormNotice'
import { fetchGuestbook, sendGuestbookEntry } from '@/lib/api/visitors'
import { friendlyError } from '@/lib/friendlyError'
import { isSupabaseConfigured } from '@/lib/supabase'
import { usePageTitle } from '@/hooks/usePageTitle'

const PAGE_SIZE = 10
const empty = { name: '', message: '', website: '' }

const dateFormat = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const message = values.message.trim()
  if (name.length < 2) errors.name = 'Nama minimal 2 karakter.'
  if (name.length > 80) errors.name = 'Nama maksimal 80 karakter.'
  if (message.length < 3) errors.message = 'Pesan minimal 3 karakter.'
  if (message.length > 1000) errors.message = 'Pesan maksimal 1000 karakter.'
  return errors
}

function GuestbookForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState({ status: 'idle', error: null })
  const openedAt = useRef(Date.now())

  const set = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault()
    if (state.status === 'sending') return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (values.website || Date.now() - openedAt.current < 2500) {
      setState({ status: 'sent', error: null })
      setValues(empty)
      return
    }

    setState({ status: 'sending', error: null })
    try {
      await sendGuestbookEntry(values)
      setValues(empty)
      setState({ status: 'sent', error: null })
    } catch (error) {
      setState({ status: 'error', error: friendlyError(error) })
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <EmptyState title="Buku tamu belum aktif">
        <p>Buku tamu akan aktif setelah situs ini terhubung ke Supabase.</p>
      </EmptyState>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <FormField label="Nama" required autoComplete="name" maxLength={80} value={values.name} onChange={set('name')} error={errors.name} />
      <FormField
        label="Pesan"
        required
        as="textarea"
        maxLength={1000}
        value={values.message}
        onChange={set('message')}
        error={errors.message}
        hint="Pesan akan tampil setelah saya tinjau."
      />

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Jangan diisi
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      {state.status === 'sent' && <FormNotice>Terima kasih! Pesan Anda akan tampil di sini setelah ditinjau.</FormNotice>}
      {state.status === 'error' && <FormNotice tone="error">{state.error}</FormNotice>}

      <div>
        <Button type="submit" icon={Send} disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Mengirim…' : 'Kirim pesan'}
        </Button>
      </div>
    </form>
  )
}

function Entries() {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState(isSupabaseConfigured ? 'loading' : 'ready')
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (from) => {
    try {
      const { rows: page, count } = await fetchGuestbook({ from, to: from + PAGE_SIZE - 1 })
      setRows((current) => (from === 0 ? page : [...current, ...page]))
      setTotal(count)
      setStatus('ready')
      setError(null)
    } catch (caught) {
      setError(caught)
      setStatus('error')
    } finally {
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load(0)
  }, [load])

  if (!isSupabaseConfigured) return null

  if (status === 'loading') {
    return (
      <p role="status" className="font-mono text-xs tracking-wide uppercase">
        Memuat pesan…
      </p>
    )
  }
  if (status === 'error' && rows.length === 0) {
    return (
      <div role="alert" className="border-2 border-dashed border-ink p-6">
        <p className="text-h3">Pesan gagal dimuat</p>
        <p className="mt-2 text-muted">{friendlyError(error)}</p>
        <Button className="mt-5" variant="secondary" onClick={() => { setStatus('loading'); load(0) }}>
          Coba lagi
        </Button>
      </div>
    )
  }
  if (rows.length === 0) {
    return (
      <EmptyState icon={MessageSquare} title="Belum ada pesan">
        <p>Jadilah yang pertama meninggalkan pesan.</p>
      </EmptyState>
    )
  }

  return (
    <div>
      <ul className="border-b-2 border-ink">
        {rows.map((row) => (
          <li key={row.id} className="border-t-2 border-ink py-6">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="text-h3">{row.name}</span>
              <time dateTime={row.created_at} className="font-mono text-xs tracking-wide text-muted uppercase">
                {dateFormat.format(new Date(row.created_at))}
              </time>
            </p>
            <p className="mt-3 max-w-2xl break-words whitespace-pre-line">{row.message}</p>
          </li>
        ))}
      </ul>
      {rows.length < total && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            disabled={loadingMore}
            onClick={() => {
              setLoadingMore(true)
              load(rows.length)
            }}
          >
            {loadingMore ? 'Memuat…' : `Muat lebih banyak (${total - rows.length} lagi)`}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Guestbook() {
  usePageTitle('Buku Tamu')

  return (
    <>
      <section aria-labelledby="guestbook-heading" className="border-b-2 border-ink">
        <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="lg:col-span-8">
            <h1 id="guestbook-heading" className="text-h1">
              Buku Tamu.
            </h1>
            <p className="mt-6 max-w-xl text-lead text-muted">
              Pernah mampir, bekerja sama, atau sekadar ingin menyapa? Tinggalkan pesan singkat di sini.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Buku tamu" className="py-section">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <h2 className="mb-6 text-h2">Tulis pesan</h2>
            <GuestbookForm />
          </div>
          <div className="lg:col-span-7">
            <h2 className="mb-6 text-h2">Pesan pengunjung</h2>
            <Entries />
          </div>
        </Container>
      </section>

      <CtaBand
        id="guestbook-cta-heading"
        title="Ingin bicara lebih panjang?"
        description="Kirim pesan langsung lewat halaman kontak, atau lihat karya saya."
        actions={[
          { label: 'Hubungi Saya', to: '/contact', variant: 'primary' },
          { label: 'Lihat Proyek', to: '/projects', variant: 'secondary' },
        ]}
      />
    </>
  )
}

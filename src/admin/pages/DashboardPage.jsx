import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { AdminHeading } from '@/admin/ui/Parts'
import { countRows } from '@/admin/lib/crud'
import { friendlyError } from '@/lib/friendlyError'

const content = [
  { table: 'projects', label: 'Proyek', to: '/admin/projects' },
  { table: 'skills', label: 'Keahlian', to: '/admin/skills' },
  { table: 'education', label: 'Pendidikan', to: '/admin/education' },
  { table: 'experiences', label: 'Pengalaman', to: '/admin/experiences' },
  { table: 'certificates', label: 'Sertifikat', to: '/admin/certificates' },
  { table: 'testimonials', label: 'Testimoni', to: '/admin/testimonials' },
  { table: 'blog_posts', label: 'Artikel blog', to: '/admin/blog' },
]

export default function DashboardPage() {
  const [state, setState] = useState({ status: 'loading', stats: [], attention: null, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    document.title = 'Ringkasan | Panel Admin'
    let alive = true
    Promise.all([
      Promise.all(
        content.map(async (item) => ({
          ...item,
          total: await countRows(item.table),
          published: await countRows(item.table, { is_published: true }),
        })),
      ),
      countRows('contact_messages'),
      countRows('contact_messages', { is_read: false }),
      countRows('guestbook'),
      countRows('guestbook', { is_published: false }),
    ])
      .then(([stats, messages, unread, guestbook, pending]) => {
        if (alive) setState({ status: 'ready', stats, attention: { messages, unread, guestbook, pending }, error: null })
      })
      .catch((error) => alive && setState({ status: 'error', stats: [], attention: null, error }))
    return () => {
      alive = false
    }
  }, [attempt])

  const { stats, attention } = state
  const drafts = stats.find((item) => item.table === 'blog_posts')
  const todo = attention
    ? [
        attention.unread > 0 && { text: `${attention.unread} pesan kontak belum dibaca`, to: '/admin/messages' },
        attention.pending > 0 && { text: `${attention.pending} pesan buku tamu menunggu tinjauan`, to: '/admin/guestbook' },
        drafts && drafts.total - drafts.published > 0 && { text: `${drafts.total - drafts.published} artikel masih draf`, to: '/admin/blog' },
      ].filter(Boolean)
    : []

  return (
    <div>
      <AdminHeading title="Ringkasan" description="Jumlah konten yang ada di database dan hal yang perlu perhatian Anda." />

      {state.status === 'loading' && <p role="status" className="font-mono text-xs tracking-wide uppercase">Memuat ringkasan…</p>}

      {state.status === 'error' && (
        <div role="alert" className="border-2 border-dashed border-ink p-6">
          <p className="text-h3">Ringkasan gagal dimuat</p>
          <p className="mt-2 text-muted">{friendlyError(state.error)}</p>
          <p className="mt-2 text-sm text-muted">Jika ini pertama kali, pastikan migrasi SQL di folder supabase/migrations sudah dijalankan.</p>
          <Button className="mt-5" variant="secondary" onClick={() => { setState({ status: 'loading', stats: [], attention: null, error: null }); setAttempt((n) => n + 1) }}>
            Coba lagi
          </Button>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <section aria-labelledby="todo-heading" className="mb-12">
            <h2 id="todo-heading" className="mb-4 font-mono text-xs font-medium tracking-wide uppercase">Perlu perhatian</h2>
            {todo.length > 0 ? (
              <ul className="border-2 border-ink bg-accent text-on-accent">
                {todo.map((item) => (
                  <li key={item.to} className="border-b-2 border-ink last:border-b-0">
                    <Link to={item.to} className="flex min-h-12 items-center justify-between gap-4 px-5 py-3 font-semibold hover:bg-ink hover:text-accent">
                      {item.text}
                      <ArrowUpRight aria-hidden="true" size={20} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-2 border-dashed border-ink p-5 text-muted">Tidak ada yang perlu ditindaklanjuti sekarang.</p>
            )}
          </section>

          <section aria-labelledby="count-heading">
            <h2 id="count-heading" className="mb-4 font-mono text-xs font-medium tracking-wide uppercase">Konten</h2>
            <ul className="grid gap-px border-2 border-ink bg-ink sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <li key={item.table} className="bg-paper">
                  <Link to={item.to} className="group flex h-full flex-col p-5 hover:bg-accent">
                    <span className="font-mono text-xs tracking-wide uppercase">{item.label}</span>
                    <span className="mt-3 font-display text-6xl leading-none font-extrabold tabular-nums">{String(item.total).padStart(2, '0')}</span>
                    <span className="mt-3 text-sm text-muted group-hover:text-on-accent">
                      {item.published} tampil, {item.total - item.published} draf
                    </span>
                  </Link>
                </li>
              ))}
              <li className="bg-paper">
                <Link to="/admin/messages" className="group flex h-full flex-col p-5 hover:bg-accent">
                  <span className="font-mono text-xs tracking-wide uppercase">Pesan kontak</span>
                  <span className="mt-3 font-display text-6xl leading-none font-extrabold tabular-nums">{String(attention.messages).padStart(2, '0')}</span>
                  <span className="mt-3 text-sm text-muted group-hover:text-on-accent">{attention.unread} belum dibaca</span>
                </Link>
              </li>
              <li className="bg-paper">
                <Link to="/admin/guestbook" className="group flex h-full flex-col p-5 hover:bg-accent">
                  <span className="font-mono text-xs tracking-wide uppercase">Buku tamu</span>
                  <span className="mt-3 font-display text-6xl leading-none font-extrabold tabular-nums">{String(attention.guestbook).padStart(2, '0')}</span>
                  <span className="mt-3 text-sm text-muted group-hover:text-on-accent">{attention.pending} menunggu tinjauan</span>
                </Link>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  )
}

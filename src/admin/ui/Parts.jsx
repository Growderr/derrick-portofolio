import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/** Published / draft pill. */
export function StatusPill({ on, onLabel = 'Terbit', offLabel = 'Draf', className }) {
  return (
    <span
      className={cn(
        'inline-block border-2 border-ink px-2 py-0.5 font-mono text-xs tracking-wide uppercase',
        on ? 'bg-accent text-on-accent' : 'border-dashed bg-paper text-muted',
        className,
      )}
    >
      {on ? onLabel : offLabel}
    </span>
  )
}

/** Previous / next with a plain-language range. */
export function Pager({ page, pageSize, total, onPage }) {
  if (total <= pageSize) return null
  const pages = Math.ceil(total / pageSize)
  const first = page * pageSize + 1
  const last = Math.min(total, (page + 1) * pageSize)

  return (
    <nav aria-label="Halaman daftar" className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted" role="status">
        Menampilkan {first} sampai {last} dari {total} (halaman {page + 1} dari {pages})
      </p>
      <div className="flex gap-3">
        <Button size="sm" variant="secondary" icon={ChevronLeft} disabled={page === 0} onClick={() => onPage(page - 1)}>
          Sebelumnya
        </Button>
        <Button size="sm" variant="secondary" disabled={page >= pages - 1} onClick={() => onPage(page + 1)}>
          Berikutnya
          <ChevronRight aria-hidden="true" size={18} strokeWidth={2.25} />
        </Button>
      </div>
    </nav>
  )
}

/** Native <dialog> confirmation: focus is trapped and Escape cancels. */
export function ConfirmDialog({ open, title, children, confirmLabel = 'Hapus', busy = false, onConfirm, onCancel }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onCancel()
      }}
      className="m-auto w-[min(32rem,calc(100vw-2.5rem))] border-2 border-ink bg-paper p-0 text-ink backdrop:bg-ink/60"
    >
      {open && (
        <div className="p-6 sm:p-8">
          <h2 id="confirm-title" className="text-h3">
            {title}
          </h2>
          <div className="mt-3 text-muted">{children}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button autoFocus variant="secondary" disabled={busy} onClick={onCancel}>
              Batal
            </Button>
            <Button disabled={busy} onClick={onConfirm}>
              {busy ? 'Memproses…' : confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}

/** Page title block for admin screens. */
export function AdminHeading({ title, description, action }) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
      <div>
        <h1 className="text-h2">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
      </div>
      {action}
    </header>
  )
}

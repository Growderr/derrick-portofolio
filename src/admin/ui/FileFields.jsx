import { useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ImagePlus, Trash2, Upload } from 'lucide-react'
import Button from '@/components/ui/Button'
import FormField, { inputStyles } from '@/components/ui/FormField'
import { useLedger } from '@/admin/ui/FileLedger'
import { acceptFor, limitLabel, pathFromUrl, typesLabel, uploadFile } from '@/admin/lib/storage'
import { friendlyError } from '@/lib/friendlyError'
import { cn } from '@/lib/cn'

/** Shared upload behaviour: validation, upload, bookkeeping for cleanup, and error text. */
export function useUploader(bucket, folder) {
  const ledger = useLedger()
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState(null)

  async function upload(file) {
    setBusy(true)
    setProblem(null)
    try {
      const url = await uploadFile(bucket, file, folder)
      ledger?.noteUpload(bucket, url)
      return url
    } catch (error) {
      setProblem(error.message && !error.statusCode && !error.status ? error.message : friendlyError(error))
      return null
    } finally {
      setBusy(false)
    }
  }

  return { busy, problem, upload, ledger }
}

const legend = 'px-2 font-mono text-xs font-medium tracking-wide uppercase'

function Problem({ children }) {
  return children ? (
    <p role="alert" className="mt-3 text-sm font-semibold">
      {children}
    </p>
  ) : null
}

/** One image: upload, preview, alt text and removal. Value: { src, alt } or null. */
export function ImageField({ field, value, onChange, error }) {
  const input = useRef(null)
  const { busy, problem, upload, ledger } = useUploader(field.bucket, field.folder ?? 'images')

  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const url = await upload(file)
    if (!url) return
    if (value?.src) ledger?.noteRemoval(field.bucket, value.src)
    onChange({ src: url, alt: value?.alt ?? '' })
  }

  function remove() {
    if (value?.src) ledger?.noteRemoval(field.bucket, value.src)
    onChange(null)
  }

  return (
    <fieldset className="border-2 border-ink p-4">
      <legend className={legend}>
        {field.label}
        {field.required && <span aria-hidden="true"> *</span>}
      </legend>

      <input ref={input} type="file" accept={acceptFor(field.bucket)} onChange={handleFile} className="sr-only" tabIndex={-1} aria-hidden="true" />

      {value?.src ? (
        <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
          <img src={value.src} alt="" className={cn('w-full border-2 border-ink object-cover', field.ratio ?? 'aspect-[4/3]')} />
          <div className="space-y-4">
            <FormField label="Teks alternatif" hint="Jelaskan isi gambar untuk pembaca layar." maxLength={200} value={value.alt ?? ''} onChange={(event) => onChange({ ...value, alt: event.target.value })} />
            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="secondary" icon={Upload} disabled={busy} onClick={() => input.current?.click()}>
                {busy ? 'Mengunggah…' : 'Ganti gambar'}
              </Button>
              <Button size="sm" variant="secondary" icon={Trash2} disabled={busy} onClick={remove}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 border-2 border-dashed border-ink p-5">
          <Button size="sm" icon={ImagePlus} disabled={busy} onClick={() => input.current?.click()}>
            {busy ? 'Mengunggah…' : 'Pilih gambar'}
          </Button>
          <p className="text-sm text-muted">
            {typesLabel(field.bucket)}, maksimal {limitLabel(field.bucket)}.{field.hint ? ` ${field.hint}` : ''}
          </p>
        </div>
      )}

      <Problem>{problem ?? error}</Problem>
    </fieldset>
  )
}

/** Several images with alt text and caption each. Value: [{ src, alt, caption }]. */
export function GalleryField({ field, value, onChange, error }) {
  const input = useRef(null)
  const { busy, problem, upload, ledger } = useUploader(field.bucket, field.folder ?? 'gallery')
  const items = value ?? []
  const [progress, setProgress] = useState(null)
  const max = field.maxItems ?? 20

  async function handleFiles(event) {
    const files = [...(event.target.files ?? [])]
    event.target.value = ''
    const room = max - items.length
    const batch = files.slice(0, Math.max(room, 0))
    const added = []
    for (let i = 0; i < batch.length; i += 1) {
      setProgress(`Mengunggah ${i + 1} dari ${batch.length}…`)
      // eslint-disable-next-line no-await-in-loop -- one at a time keeps the order and the error text clear
      const url = await upload(batch[i])
      if (url) added.push({ src: url, alt: '', caption: '' })
    }
    setProgress(null)
    if (added.length > 0) onChange([...items, ...added])
  }

  const patch = (index, change) => onChange(items.map((item, i) => (i === index ? { ...item, ...change } : item)))
  const move = (index, step) => {
    const next = [...items]
    const target = index + step
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }
  function remove(index) {
    ledger?.noteRemoval(field.bucket, items[index].src)
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <fieldset className="border-2 border-ink p-4">
      <legend className={legend}>{field.label}</legend>
      <input ref={input} type="file" multiple accept={acceptFor(field.bucket)} onChange={handleFiles} className="sr-only" tabIndex={-1} aria-hidden="true" />

      {items.length > 0 && (
        <ul className="mb-5 space-y-4">
          {items.map((item, index) => (
            <li key={item.src} className="grid gap-4 border-2 border-line p-3 sm:grid-cols-[9rem_1fr_auto]">
              <img src={item.src} alt="" className="aspect-[4/3] w-full border-2 border-ink object-cover" />
              <div className="space-y-3">
                <FormField label="Teks alternatif" maxLength={200} value={item.alt ?? ''} onChange={(event) => patch(index, { alt: event.target.value })} />
                <FormField label="Keterangan (opsional)" maxLength={300} value={item.caption ?? ''} onChange={(event) => patch(index, { caption: event.target.value })} />
              </div>
              <div className="flex gap-2 sm:flex-col">
                <button type="button" aria-label={`Naikkan gambar ${index + 1}`} onClick={() => move(index, -1)} disabled={index === 0} className="grid size-11 place-items-center border-2 border-ink hover:bg-accent disabled:opacity-40">
                  <ArrowUp aria-hidden="true" size={16} />
                </button>
                <button type="button" aria-label={`Turunkan gambar ${index + 1}`} onClick={() => move(index, 1)} disabled={index === items.length - 1} className="grid size-11 place-items-center border-2 border-ink hover:bg-accent disabled:opacity-40">
                  <ArrowDown aria-hidden="true" size={16} />
                </button>
                <button type="button" aria-label={`Hapus gambar ${index + 1}`} onClick={() => remove(index)} className="grid size-11 place-items-center border-2 border-ink hover:bg-ink hover:text-paper">
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col items-start gap-3 border-2 border-dashed border-ink p-5">
        <Button size="sm" icon={ImagePlus} disabled={busy || items.length >= max} onClick={() => input.current?.click()}>
          {busy ? (progress ?? 'Mengunggah…') : 'Tambah gambar'}
        </Button>
        <p className="text-sm text-muted">
          {typesLabel(field.bucket)}, maksimal {limitLabel(field.bucket)} per file, hingga {max} gambar ({items.length} terpakai).
        </p>
      </div>
      <Problem>{problem ?? error}</Problem>
    </fieldset>
  )
}

/** A link field that can also upload a file (PDF or image) into the bucket. Value: URL string. */
export function FileUrlField({ field, value, onChange, error }) {
  const input = useRef(null)
  const { busy, problem, upload, ledger } = useUploader(field.bucket, field.folder ?? 'documents')
  const current = typeof value === 'string' ? value : ''
  const stored = Boolean(pathFromUrl(field.bucket, current))

  async function handleFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const url = await upload(file)
    if (!url) return
    if (stored) ledger?.noteRemoval(field.bucket, current)
    onChange(url)
  }

  function clear() {
    if (stored) ledger?.noteRemoval(field.bucket, current)
    onChange('')
  }

  return (
    <div>
      <FormField label={field.label} hint={field.hint} error={problem ?? error} value={current} onChange={(event) => onChange(event.target.value)} inputMode="url" placeholder="https://…" />
      <input ref={input} type="file" accept={acceptFor(field.bucket)} onChange={handleFile} className="sr-only" tabIndex={-1} aria-hidden="true" />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm" variant="secondary" icon={Upload} disabled={busy} onClick={() => input.current?.click()}>
          {busy ? 'Mengunggah…' : 'Unggah file'}
        </Button>
        {current && (
          <Button size="sm" variant="text" icon={Trash2} onClick={clear}>
            {stored ? 'Hapus file' : 'Kosongkan'}
          </Button>
        )}
        <span className="text-sm text-muted">
          {typesLabel(field.bucket)}, maksimal {limitLabel(field.bucket)}.
        </span>
      </div>
    </div>
  )
}

export { inputStyles }

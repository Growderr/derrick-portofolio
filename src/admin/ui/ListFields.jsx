import { useState } from 'react'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { ImageField } from '@/admin/ui/FileFields'
import { useLedger } from '@/admin/ui/FileLedger'
import { BLOCK_TYPES, emptyValues } from '@/admin/lib/validate'

const legend = 'px-2 font-mono text-xs font-medium tracking-wide uppercase'

const iconButton =
  'grid size-11 place-items-center border-2 border-ink hover:bg-accent disabled:opacity-40 disabled:hover:bg-transparent'

/** Up / down / remove buttons shared by repeaters. */
function ItemControls({ index, count, label, onMove, onRemove }) {
  return (
    <div className="flex gap-2">
      <button type="button" aria-label={`Naikkan ${label}`} disabled={index === 0} onClick={() => onMove(-1)} className={iconButton}>
        <ArrowUp aria-hidden="true" size={16} />
      </button>
      <button type="button" aria-label={`Turunkan ${label}`} disabled={index === count - 1} onClick={() => onMove(1)} className={iconButton}>
        <ArrowDown aria-hidden="true" size={16} />
      </button>
      <button type="button" aria-label={`Hapus ${label}`} onClick={onRemove} className="grid size-11 place-items-center border-2 border-ink hover:bg-ink hover:text-paper">
        <Trash2 aria-hidden="true" size={16} />
      </button>
    </div>
  )
}

function reorder(items, index, step) {
  const next = [...items]
  const target = index + step
  if (target < 0 || target >= next.length) return items
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

const parseLines = (raw) => raw.split('\n').map((line) => line.trim()).filter(Boolean)
const parseParagraphs = (raw) => raw.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)

/**
 * One item per line (type 'lines') or per blank-line separated paragraph ('paragraphs').
 * The raw text is kept locally so typing a new line never jumps the cursor.
 */
export function LinesField({ field, value, onChange, error }) {
  const paragraphs = field.type === 'paragraphs'
  const [raw, setRaw] = useState(() => (value ?? []).join(paragraphs ? '\n\n' : '\n'))

  return (
    <FormField
      label={field.label}
      as="textarea"
      required={field.required}
      hint={field.hint ?? (paragraphs ? 'Pisahkan paragraf dengan satu baris kosong.' : 'Satu item per baris.')}
      error={error}
      value={raw}
      rows={field.rows ?? (paragraphs ? 7 : 4)}
      onChange={(event) => {
        setRaw(event.target.value)
        onChange((paragraphs ? parseParagraphs : parseLines)(event.target.value))
      }}
    />
  )
}

/** A repeater of small records, for example { title, description }. Value: array of objects. */
export function ObjectsField({ field, value, onChange, error, renderControl }) {
  const items = value ?? []
  const noun = field.itemLabel ?? 'item'
  const max = field.maxItems ?? 20

  const patch = (index, name, next) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [name]: next } : item)))

  return (
    <fieldset className="border-2 border-ink p-4">
      <legend className={legend}>{field.label}</legend>
      {field.hint && <p className="mb-4 text-sm text-muted">{field.hint}</p>}

      {items.length > 0 && (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="border-2 border-line p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-semibold">
                  {noun[0].toUpperCase() + noun.slice(1)} {index + 1}
                </p>
                <ItemControls
                  index={index}
                  count={items.length}
                  label={`${noun} ${index + 1}`}
                  onMove={(step) => onChange(reorder(items, index, step))}
                  onRemove={() => onChange(items.filter((_, i) => i !== index))}
                />
              </div>
              <div className="grid gap-4">
                {field.itemFields.map((itemField) => (
                  <div key={itemField.name}>
                    {renderControl(itemField, item[itemField.name], (next) => patch(index, itemField.name, next), null, item)}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Button
        className={items.length > 0 ? 'mt-4' : ''}
        size="sm"
        variant="secondary"
        icon={Plus}
        disabled={items.length >= max}
        onClick={() => onChange([...items, emptyValues(field.itemFields)])}
      >
        Tambah {noun}
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold">
          {error}
        </p>
      )}
    </fieldset>
  )
}

const uid = () => crypto.randomUUID()

/** Adds a client-only id to each block so reordering keeps each block's own typing state. */
export function withBlockIds(blocks) {
  return (blocks ?? []).map((block) => ({ _id: uid(), ...block }))
}

function BlockBody({ block, patch, bucket, error }) {
  const [rawList, setRawList] = useState(() => (block.items ?? []).join('\n'))

  switch (block.type) {
    case 'list':
      return (
        <div className="space-y-3">
          <FormField
            label="Isi daftar"
            as="textarea"
            hint="Satu item per baris."
            value={rawList}
            rows={4}
            onChange={(event) => {
              setRawList(event.target.value)
              patch({ items: parseLines(event.target.value) })
            }}
          />
          <label className="inline-flex min-h-11 items-center gap-3 font-semibold">
            <input type="checkbox" className="size-5 accent-ink" checked={Boolean(block.ordered)} onChange={(event) => patch({ ordered: event.target.checked })} />
            Daftar bernomor
          </label>
        </div>
      )
    case 'quote':
      return (
        <div className="space-y-3">
          <FormField label="Kutipan" as="textarea" rows={3} value={block.text ?? ''} onChange={(event) => patch({ text: event.target.value })} />
          <FormField label="Sumber (opsional)" maxLength={200} value={block.cite ?? ''} onChange={(event) => patch({ cite: event.target.value })} />
        </div>
      )
    case 'code':
      return (
        <div className="space-y-3">
          <FormField label="Kode" as="textarea" rows={8} spellCheck={false} className="font-mono" value={block.code ?? ''} onChange={(event) => patch({ code: event.target.value })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField label="Bahasa (opsional)" maxLength={30} placeholder="js, css, sql…" value={block.language ?? ''} onChange={(event) => patch({ language: event.target.value })} />
            <FormField label="Keterangan (opsional)" maxLength={200} value={block.caption ?? ''} onChange={(event) => patch({ caption: event.target.value })} />
          </div>
        </div>
      )
    case 'image':
      return (
        <div className="space-y-3">
          <ImageField
            field={{ label: 'Gambar', bucket, folder: 'content' }}
            value={block.src ? { src: block.src, alt: block.alt ?? '' } : null}
            onChange={(next) => patch({ src: next?.src ?? '', alt: next?.alt ?? '' })}
            error={error}
          />
          <FormField label="Keterangan (opsional)" maxLength={300} value={block.caption ?? ''} onChange={(event) => patch({ caption: event.target.value })} />
        </div>
      )
    default:
      return (
        <FormField
          label={block.type === 'paragraph' ? 'Paragraf' : 'Teks'}
          as={block.type === 'paragraph' ? 'textarea' : 'input'}
          rows={5}
          maxLength={block.type === 'paragraph' ? undefined : 200}
          value={block.text ?? ''}
          onChange={(event) => patch({ text: event.target.value })}
        />
      )
  }
}

/** Article body editor: a list of typed blocks (paragraph, heading, list, quote, code, image). */
export function BlocksField({ field, value, onChange, error }) {
  const blocks = value ?? []
  const ledger = useLedger()
  const [adding, setAdding] = useState('paragraph')
  const labelOf = (type) => BLOCK_TYPES.find((option) => option.value === type)?.label ?? type

  const patch = (index, change) => onChange(blocks.map((block, i) => (i === index ? { ...block, ...change } : block)))

  return (
    <fieldset className="border-2 border-ink p-4">
      <legend className={legend}>{field.label}</legend>
      {field.hint && <p className="mb-4 text-sm text-muted">{field.hint}</p>}

      {blocks.length > 0 && (
        <ol className="space-y-4">
          {blocks.map((block, index) => (
            <li key={block._id ?? index} className="border-2 border-line p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-semibold">
                  {index + 1}. {labelOf(block.type)}
                </p>
                <ItemControls
                  index={index}
                  count={blocks.length}
                  label={`blok ${index + 1}`}
                  onMove={(step) => onChange(reorder(blocks, index, step))}
                  onRemove={() => {
                    if (block.type === 'image' && block.src) ledger?.noteRemoval(field.bucket, block.src)
                    onChange(blocks.filter((_, i) => i !== index))
                  }}
                />
              </div>
              <BlockBody block={block} patch={(change) => patch(index, change)} bucket={field.bucket} />
            </li>
          ))}
        </ol>
      )}

      <div className={`flex flex-wrap items-end gap-3 ${blocks.length > 0 ? 'mt-4' : ''}`}>
        <FormField label="Jenis blok" as="select" value={adding} onChange={(event) => setAdding(event.target.value)} className="min-w-48">
          {BLOCK_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormField>
        <Button size="sm" variant="secondary" icon={Plus} onClick={() => onChange([...blocks, { _id: uid(), type: adding, ...(adding === 'list' ? { items: [], ordered: false } : {}) }])}>
          Tambah blok
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold">
          {error}
        </p>
      )}
    </fieldset>
  )
}

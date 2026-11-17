import { useEffect, useState } from 'react'
import FormField from '@/components/ui/FormField'
import { FileUrlField, GalleryField, ImageField } from '@/admin/ui/FileFields'
import { BlocksField, LinesField, ObjectsField } from '@/admin/ui/ListFields'
import { relationOptions } from '@/admin/lib/crud'

function RelationField({ field, value, onChange, error }) {
  const [options, setOptions] = useState([])
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    relationOptions(field.table, field.labelColumn)
      .then((next) => alive && setOptions(next))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [field.table, field.labelColumn])

  return (
    <FormField
      label={field.label}
      as="select"
      hint={failed ? 'Daftar gagal dimuat.' : field.hint}
      error={error}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value || null)}
    >
      <option value="">Tidak ada</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormField>
  )
}

/**
 * Renders one field of any type from its definition.
 *  value / onChange  the field's own value
 *  error             message to show (or null)
 *  record            all current form values (for fields that depend on others)
 */
export default function FieldControl({ field, value, onChange, error }) {
  const common = { label: field.label, required: field.required, hint: field.hint, error }

  switch (field.type) {
    case 'textarea':
      return <FormField {...common} as="textarea" rows={field.rows ?? 5} maxLength={field.max} value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    case 'number':
      return <FormField {...common} type="number" inputMode="numeric" min={field.min} max={field.max} step={field.integer === false ? 'any' : 1} value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    case 'select':
      return (
        <FormField {...common} as="select" value={value ?? ''} onChange={(event) => onChange(event.target.value)}>
          {!field.required && <option value="">Tidak dipilih</option>}
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormField>
      )
    case 'checkbox':
      return (
        <div>
          <label className="inline-flex min-h-11 items-center gap-3 font-semibold">
            <input type="checkbox" className="size-5 accent-ink" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
            {field.label}
          </label>
          {field.hint && <p className="text-sm text-muted">{field.hint}</p>}
        </div>
      )
    case 'date':
      return <FormField {...common} type="date" value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    case 'url':
      return <FormField {...common} inputMode="url" placeholder="https://…" maxLength={2048} value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    case 'email':
      return <FormField {...common} type="email" inputMode="email" maxLength={254} value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
    case 'lines':
    case 'paragraphs':
      return <LinesField field={field} value={value} onChange={onChange} error={error} />
    case 'objects':
      return <ObjectsField field={field} value={value} onChange={onChange} error={error} renderControl={(itemField, itemValue, itemChange) => <FieldControl field={itemField} value={itemValue} onChange={itemChange} error={null} />} />
    case 'image':
      return <ImageField field={field} value={value} onChange={onChange} error={error} />
    case 'gallery':
      return <GalleryField field={field} value={value} onChange={onChange} error={error} />
    case 'url-or-file':
      return <FileUrlField field={field} value={value} onChange={onChange} error={error} />
    case 'blocks':
      return <BlocksField field={field} value={value} onChange={onChange} error={error} />
    case 'relation':
      return <RelationField field={field} value={value} onChange={onChange} error={error} />
    default:
      // text, slug, partial-date
      return <FormField {...common} maxLength={field.max} placeholder={field.placeholder} value={value ?? ''} onChange={(event) => onChange(event.target.value)} />
  }
}

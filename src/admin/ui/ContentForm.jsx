import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import FormNotice from '@/components/ui/FormNotice'
import FieldControl from '@/admin/ui/FieldControl'
import { createLedger, LedgerContext } from '@/admin/ui/FileLedger'
import { withBlockIds } from '@/admin/ui/ListFields'
import { slugify } from '@/admin/lib/slug'
import { filesOfRecord } from '@/admin/lib/storage'
import { buildPayload, emptyValues, isHidden, validateValues } from '@/admin/lib/validate'
import { friendlyError } from '@/lib/friendlyError'

/** Starting values: the stored record, or blanks plus the resource's defaults. */
function initialValues(fields, record, defaults) {
  const base = { ...emptyValues(fields), ...defaults }
  if (!record) return prepare(fields, base)

  const values = { ...base }
  fields.forEach((field) => {
    const stored = record[field.name]
    if (stored === null || stored === undefined) return
    values[field.name] = field.type === 'number' ? String(stored) : stored
  })
  return prepare(fields, values)
}

function prepare(fields, values) {
  const next = { ...values }
  fields.forEach((field) => {
    if (field.type === 'blocks') next[field.name] = withBlockIds(next[field.name])
  })
  return next
}

const groupOf = (field) => field.group ?? 'Umum'

/**
 * Generic add/edit form. It is driven entirely by `fields` (see admin/config),
 * validates before saving and keeps Storage tidy (see FileLedger).
 *
 *   onSubmit(payload)  must save and resolve; throw to show an error
 */
export default function ContentForm({ fields, record, defaults, onSubmit, onCancel, submitLabel = 'Simpan' }) {
  const [values, setValues] = useState(() => initialValues(fields, record, defaults))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [failure, setFailure] = useState(null)
  const ledger = useMemo(() => createLedger(), [])
  const saved = useRef(false)
  const summary = useRef(null)
  const slugTouched = useRef(Boolean(record))

  // Leaving without saving removes files uploaded during this session.
  useEffect(
    () => () => {
      if (!saved.current) ledger.discard()
    },
    [ledger],
  )

  function setValue(name, next) {
    setValues((current) => {
      const updated = { ...current, [name]: next }
      const slugField = fields.find((field) => field.type === 'slug' && field.from === name)
      if (slugField && !slugTouched.current) updated[slugField.name] = slugify(next)
      return updated
    })
    if (fields.find((field) => field.name === name)?.type === 'slug') slugTouched.current = true
    setErrors((current) => {
      if (!current[name]) return current
      const { [name]: _removed, ...rest } = current
      return rest
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (saving) return

    const found = validateValues(fields, values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setFailure(null)
      requestAnimationFrame(() => summary.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
      return
    }

    setSaving(true)
    setFailure(null)
    try {
      const payload = buildPayload(fields, values)
      await onSubmit(payload)
      saved.current = true
      const kept = new Set(filesOfRecord(fields, payload).map((item) => item.url))
      await ledger.finalize(kept)
      saved.current = false
      setSaving(false)
    } catch (error) {
      setFailure(friendlyError(error))
      setSaving(false)
    }
  }

  const groups = []
  fields.forEach((field) => {
    if (isHidden(field, values)) return
    const title = groupOf(field)
    let group = groups.find((entry) => entry.title === title)
    if (!group) {
      group = { title, fields: [] }
      groups.push(group)
    }
    group.fields.push(field)
  })

  const errorList = Object.entries(errors)

  return (
    <LedgerContext.Provider value={ledger}>
      <form onSubmit={handleSubmit} noValidate className="space-y-12">
        {groups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h3 className="mb-6 border-b-2 border-ink pb-2 font-mono text-xs font-medium tracking-wide uppercase">{group.title}</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {group.fields.map((field) => (
                <div key={field.name} className={field.width === 'half' ? '' : 'sm:col-span-2'}>
                  <FieldControl field={field} value={values[field.name]} onChange={(next) => setValue(field.name, next)} error={errors[field.name]} />
                </div>
              ))}
            </div>
          </section>
        ))}

        <div ref={summary} className="space-y-4">
          {errorList.length > 0 && (
            <FormNotice tone="error">
              Periksa {errorList.length} isian:{' '}
              {errorList.map(([name, message]) => `${fields.find((field) => field.name === name)?.label ?? name} (${message.replace(/\.$/, '')})`).join('; ')}.
            </FormNotice>
          )}
          {failure && <FormNotice tone="error">{failure}</FormNotice>}
        </div>

        <div className="sticky bottom-0 z-10 -mx-5 flex flex-wrap gap-3 border-t-2 border-ink bg-paper px-5 py-4 sm:-mx-8 sm:px-8">
          <Button type="submit" disabled={saving}>
            {saving ? 'Menyimpan…' : submitLabel}
          </Button>
          {onCancel && (
            <Button variant="secondary" disabled={saving} onClick={onCancel}>
              Batal
            </Button>
          )}
        </div>
      </form>
    </LedgerContext.Provider>
  )
}

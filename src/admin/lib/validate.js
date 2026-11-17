import { slugify } from '@/admin/lib/slug'

/**
 * Form validation driven by the field definitions in admin/config.
 * It mirrors the CHECK constraints in the database so people get a clear
 * message first; the database stays the final authority.
 */
const URL_RE = /^https?:\/\/[^\s]+$/i
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DATE_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD' that exists on the calendar. */
function isRealDate(text) {
  const [year, month, day] = text.split('-').map(Number)
  if (month !== undefined && (month < 1 || month > 12)) return false
  if (day !== undefined && day > new Date(Date.UTC(year, month, 0)).getUTCDate()) return false
  return day === undefined || day >= 1
}

export const BLOCK_TYPES = [
  { value: 'paragraph', label: 'Paragraf' },
  { value: 'heading', label: 'Judul bagian' },
  { value: 'subheading', label: 'Sub-judul' },
  { value: 'list', label: 'Daftar' },
  { value: 'quote', label: 'Kutipan' },
  { value: 'code', label: 'Kode' },
  { value: 'image', label: 'Gambar' },
]

export function isHidden(field, values) {
  return typeof field.showIf === 'function' && !field.showIf(values)
}

/** The value a blank field starts with. */
export function emptyValue(field) {
  switch (field.type) {
    case 'checkbox':
      return field.default ?? false
    case 'lines':
    case 'paragraphs':
    case 'objects':
    case 'gallery':
    case 'blocks':
      return []
    case 'number':
      return field.default ?? ''
    case 'select':
      return field.default ?? ''
    case 'image':
    case 'relation':
      return null
    default:
      return field.default ?? ''
  }
}

export function emptyValues(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, emptyValue(field)]))
}

const blank = (value) => value === null || value === undefined || String(value).trim() === ''

function textError(field, value) {
  const text = String(value ?? '').trim()
  if (text === '') return field.required ? 'Wajib diisi.' : null
  if (field.min && text.length < field.min) return `Minimal ${field.min} karakter.`
  if (field.max && text.length > field.max) return `Maksimal ${field.max} karakter.`
  if (field.type === 'url' && !URL_RE.test(text)) return 'Harus berupa tautan yang diawali http:// atau https://.'
  if (field.type === 'email' && !EMAIL_RE.test(text)) return 'Masukkan alamat email yang valid.'
  if (field.type === 'slug' && !SLUG_RE.test(text)) return 'Hanya huruf kecil, angka, dan tanda hubung (contoh: proyek-saya).'
  if (field.type === 'partial-date') {
    if (!DATE_RE.test(text)) return 'Format: 2026, 2026-07, atau 2026-07-15.'
    if (!isRealDate(text)) return 'Tanggal tidak valid (cek bulan dan harinya).'
  }
  if (field.pattern && !field.pattern.test(text)) return field.patternMessage ?? 'Format tidak valid.'
  return null
}

/** Returns an error message for one field, or null. */
export function fieldError(field, value, values = {}) {
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'url':
    case 'email':
    case 'slug':
    case 'partial-date':
    case 'url-or-file':
      return textError(field, typeof value === 'string' ? value : '')
    case 'date':
      if (blank(value)) return field.required ? 'Wajib diisi.' : null
      return /^\d{4}-\d{2}-\d{2}$/.test(value) && isRealDate(value) ? null : 'Tanggal tidak valid.'
    case 'number': {
      if (blank(value)) return field.required ? 'Wajib diisi.' : null
      const n = Number(value)
      if (Number.isNaN(n)) return 'Harus berupa angka.'
      if (field.integer !== false && !Number.isInteger(n)) return 'Harus berupa bilangan bulat.'
      if (field.min !== undefined && n < field.min) return `Minimal ${field.min}.`
      if (field.max !== undefined && n > field.max) return `Maksimal ${field.max}.`
      return null
    }
    case 'select':
      if (blank(value)) return field.required ? 'Wajib dipilih.' : null
      return field.options.some((option) => option.value === value) ? null : 'Pilihan tidak valid.'
    case 'lines':
    case 'paragraphs': {
      const items = Array.isArray(value) ? value : []
      if (field.required && items.length === 0) return 'Wajib diisi.'
      if (field.maxItems && items.length > field.maxItems) return `Maksimal ${field.maxItems} baris.`
      const longest = field.type === 'paragraphs' ? 1500 : (field.maxItem ?? 300)
      if (items.some((item) => item.length > longest)) return `Setiap ${field.type === 'paragraphs' ? 'paragraf' : 'baris'} maksimal ${longest} karakter.`
      return null
    }
    case 'objects': {
      const items = Array.isArray(value) ? value : []
      if (field.required && items.length === 0) return 'Tambahkan minimal satu item.'
      if (field.maxItems && items.length > field.maxItems) return `Maksimal ${field.maxItems} item.`
      for (let i = 0; i < items.length; i += 1) {
        const errors = validateValues(field.itemFields, items[i])
        const first = Object.values(errors)[0]
        if (first) return `Item ${i + 1}: ${first}`
      }
      return null
    }
    case 'gallery': {
      const items = Array.isArray(value) ? value : []
      if (field.maxItems && items.length > field.maxItems) return `Maksimal ${field.maxItems} gambar.`
      if (items.some((item) => (item.alt ?? '').length > 200 || (item.caption ?? '').length > 300)) return 'Teks alternatif maksimal 200 karakter, keterangan maksimal 300.'
      return null
    }
    case 'image':
      if (value && (value.alt ?? '').length > 200) return 'Teks alternatif maksimal 200 karakter.'
      return null
    case 'blocks': {
      const blocks = Array.isArray(value) ? value : []
      for (let i = 0; i < blocks.length; i += 1) {
        const block = blocks[i]
        const where = `Blok ${i + 1}`
        if (['paragraph', 'heading', 'subheading', 'quote'].includes(block.type) && blank(block.text)) return `${where}: teks wajib diisi.`
        if (block.type === 'list' && (!Array.isArray(block.items) || block.items.length === 0)) return `${where}: daftar tidak boleh kosong.`
        if (block.type === 'code' && blank(block.code)) return `${where}: kode wajib diisi.`
        if (block.type === 'image' && blank(block.src)) return `${where}: unggah gambar dulu.`
        if (JSON.stringify(block).length > 20000) return `${where}: terlalu panjang.`
      }
      if (blocks.length > 200) return 'Maksimal 200 blok.'
      return null
    }
    default:
      return null
  }
}

/** { fieldName: message } for every visible field that is invalid. */
export function validateValues(fields, values) {
  const errors = {}
  fields.forEach((field) => {
    if (isHidden(field, values)) return
    const message = fieldError(field, values[field.name], values)
    if (message) errors[field.name] = message
  })
  return errors
}

const trimmedLines = (items) => items.map((item) => String(item).trim()).filter(Boolean)

/** Form values to the object sent to the database: trimmed, blanks become null, hidden fields are cleared. */
export function buildPayload(fields, values) {
  const payload = {}
  fields.forEach((field) => {
    if (field.readOnly) return
    const hidden = isHidden(field, values)
    // A field hidden by showIf is cleared for real: its default must not leak into the saved row.
    const raw = hidden ? emptyValue({ ...field, default: undefined }) : values[field.name]

    switch (field.type) {
      case 'checkbox':
        payload[field.name] = Boolean(raw)
        break
      case 'number':
        payload[field.name] = blank(raw) ? (field.nullable ? null : (field.default ?? 0)) : Number(raw)
        break
      case 'lines':
      case 'paragraphs':
        payload[field.name] = trimmedLines(Array.isArray(raw) ? raw : [])
        break
      case 'objects':
        payload[field.name] = (Array.isArray(raw) ? raw : []).map((item) =>
          buildPayload(field.itemFields, item),
        )
        break
      case 'gallery':
        payload[field.name] = (Array.isArray(raw) ? raw : []).map((item) => ({
          src: item.src,
          alt: String(item.alt ?? '').trim(),
          caption: String(item.caption ?? '').trim() || null,
        }))
        break
      case 'image':
        payload[field.name] = raw?.src ? { src: raw.src, alt: String(raw.alt ?? '').trim() } : null
        break
      case 'blocks':
        payload[field.name] = (Array.isArray(raw) ? raw : []).map((block) => cleanBlock(block))
        break
      case 'relation':
        payload[field.name] = raw || null
        break
      case 'slug':
        payload[field.name] = slugify(raw)
        break
      default: {
        const text = typeof raw === 'string' ? raw.trim() : raw
        payload[field.name] = blank(text) ? (field.emptyAs === '' ? '' : null) : text
      }
    }
  })
  return payload
}

function cleanBlock(block) {
  const { type } = block
  switch (type) {
    case 'list':
      return { type, items: trimmedLines(block.items ?? []), ordered: Boolean(block.ordered) }
    case 'quote':
      return { type, text: block.text.trim(), ...(block.cite?.trim() ? { cite: block.cite.trim() } : {}) }
    case 'code':
      return {
        type,
        code: block.code,
        ...(block.language?.trim() ? { language: block.language.trim() } : {}),
        ...(block.caption?.trim() ? { caption: block.caption.trim() } : {}),
      }
    case 'image':
      return {
        type,
        src: block.src,
        alt: (block.alt ?? '').trim(),
        ...(block.caption?.trim() ? { caption: block.caption.trim() } : {}),
      }
    default:
      return { type, text: (block.text ?? '').trim() }
  }
}

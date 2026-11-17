import { supabase } from '@/lib/supabase'

/**
 * Storage helpers. Limits mirror the buckets created in
 * supabase/migrations/*_storage.sql; Supabase enforces them again server-side.
 * Uploaded names are random, never the visitor's file name, so nothing a user
 * types ends up in a path.
 */
const MB = 1024 * 1024
const IMAGES = ['image/jpeg', 'image/png', 'image/webp']

export const BUCKETS = {
  'profile-photos': { label: 'foto profil', maxBytes: 3 * MB, types: IMAGES },
  'project-images': { label: 'gambar proyek', maxBytes: 5 * MB, types: IMAGES },
  certificates: { label: 'sertifikat', maxBytes: 5 * MB, types: [...IMAGES, 'application/pdf'] },
  'blog-images': { label: 'gambar artikel', maxBytes: 5 * MB, types: IMAGES },
}

const EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }
const TYPE_LABELS = { 'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WebP', 'application/pdf': 'PDF' }

export const acceptFor = (bucket) => BUCKETS[bucket].types.join(',')
export const typesLabel = (bucket) => BUCKETS[bucket].types.map((type) => TYPE_LABELS[type]).join(', ')
export const limitLabel = (bucket) => `${BUCKETS[bucket].maxBytes / MB} MB`

/** The first bytes of a real file match its type, whatever its name or declared type says. */
async function sniffType(file) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  const ascii = (from, to) => String.fromCharCode(...bytes.slice(from, to))
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (bytes[0] === 0x89 && ascii(1, 4) === 'PNG') return 'image/png'
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp'
  if (ascii(0, 4) === '%PDF') return 'application/pdf'
  return null
}

/** Returns an Indonesian error message, or null when the file is acceptable. */
export async function validateFile(bucket, file) {
  const rule = BUCKETS[bucket]
  if (!file || file.size === 0) return 'File kosong atau tidak terbaca.'
  if (file.size > rule.maxBytes) return `Ukuran file terlalu besar. Maksimal ${limitLabel(bucket)}.`
  if (!rule.types.includes(file.type)) return `Format tidak didukung. Gunakan ${typesLabel(bucket)}.`
  const real = await sniffType(file)
  if (real !== file.type) return 'Isi file tidak sesuai dengan formatnya. Gunakan file asli, bukan hasil ganti nama.'
  return null
}

export function publicUrl(bucket, path) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

/** Uploads one validated file. Returns its public URL. */
export async function uploadFile(bucket, file, folder) {
  const problem = await validateFile(bucket, file)
  if (problem) throw new Error(problem)

  const path = `${folder}/${crypto.randomUUID()}.${EXTENSIONS[file.type]}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type,
  })
  if (error) throw error
  return publicUrl(bucket, path)
}

/** The storage path inside `bucket` for one of our public URLs, or null for outside links. */
export function pathFromUrl(bucket, url) {
  if (typeof url !== 'string') return null
  const marker = `/storage/v1/object/public/${bucket}/`
  const at = url.indexOf(marker)
  if (at === -1) return null
  const path = decodeURIComponent(url.slice(at + marker.length).split('?')[0])
  return path || null
}

/** Deletes files given as [{ bucket, url }]. Outside URLs are ignored. Best effort: never throws. */
export async function removeFiles(items) {
  const byBucket = new Map()
  items.forEach(({ bucket, url }) => {
    const path = pathFromUrl(bucket, url)
    if (!path) return
    byBucket.set(bucket, [...(byBucket.get(bucket) ?? []), path])
  })

  await Promise.all(
    [...byBucket.entries()].map(async ([bucket, paths]) => {
      try {
        await supabase.storage.from(bucket).remove([...new Set(paths)])
      } catch {
        // Leftover files are harmless; the row itself is already saved or deleted.
      }
    }),
  )
}

/** Every storage URL a form value points at, for one field. */
export function urlsOfField(field, value) {
  if (!value) return []
  switch (field.type) {
    case 'image':
      return value.src ? [value.src] : []
    case 'gallery':
      return value.map((item) => item.src).filter(Boolean)
    case 'url-or-file':
      return typeof value === 'string' ? [value] : []
    case 'blocks':
      return value.filter((block) => block.type === 'image' && block.src).map((block) => block.src)
    default:
      return []
  }
}

/** [{ bucket, url }] for every file field of a record. */
export function filesOfRecord(fields, record) {
  return fields
    .filter((field) => field.bucket)
    .flatMap((field) => urlsOfField(field, record[field.name]).map((url) => ({ bucket: field.bucket, url })))
}

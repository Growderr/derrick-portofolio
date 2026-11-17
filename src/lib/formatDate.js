const PARTS = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/

/**
 * Formats 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD' for display, keeping only the
 * precision that was supplied. Other strings pass through unchanged.
 * Returns null for empty values so callers can show a placeholder.
 */
export function formatDate(value) {
  if (!value) return null
  const match = PARTS.exec(value)
  if (!match) return value

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), month ? Number(month) - 1 : 0, day ? Number(day) : 1))
  const options = day
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : month
      ? { month: 'long', year: 'numeric' }
      : { year: 'numeric' }

  return new Intl.DateTimeFormat('id-ID', { ...options, timeZone: 'UTC' }).format(date)
}

/** Newest first. Entries without a date go last. */
export function byDateDesc(a, b) {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return a < b ? 1 : a > b ? -1 : 0
}

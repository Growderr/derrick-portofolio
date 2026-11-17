import { projectCategories } from '@/data/projects'

export const ALL_CATEGORY = 'all'

export function getProjectBySlug(slug, list = []) {
  return list.find((project) => project.slug === slug) ?? null
}

/** Readable label for a category id. Unknown ids fall back to a tidied version of the id. */
export function getCategoryLabel(id) {
  const known = projectCategories.find((category) => category.id === id)
  if (known) return known.label
  if (!id) return 'Tanpa kategori'
  return String(id).replace(/[-_]+/g, ' ').replace(/^./, (c) => c.toUpperCase())
}

/**
 * Filter options: "All" first, then only the categories that have projects,
 * in the order of `projectCategories` (unknown ids go last).
 */
export function getCategoryOptions(list) {
  const counts = new Map()
  list.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1))

  const known = projectCategories.map((c) => c.id).filter((id) => counts.has(id))
  const unknown = [...counts.keys()].filter((id) => !projectCategories.some((c) => c.id === id))

  return [
    { id: ALL_CATEGORY, label: 'Semua', count: list.length },
    ...[...known, ...unknown].map((id) => ({ id, label: getCategoryLabel(id), count: counts.get(id) })),
  ]
}

export function filterProjects(list, category) {
  if (!category || category === ALL_CATEGORY) return list
  return list.filter((project) => project.category === category)
}

/**
 * Related projects: explicit `related` slugs first, then the same category,
 * then the most shared technologies. Never includes the project itself.
 */
export function getRelatedProjects(project, limit = 3, list = []) {
  const others = list.filter((p) => p.slug !== project.slug)
  const explicit = (project.related ?? [])
    .map((slug) => others.find((p) => p.slug === slug))
    .filter(Boolean)

  const tech = new Set((project.tech ?? []).map((t) => t.toLowerCase()))
  const shared = (p) => (p.tech ?? []).filter((t) => tech.has(t.toLowerCase())).length

  const rest = others
    .filter((p) => !explicit.includes(p))
    .map((p) => ({ p, score: (p.category === project.category ? 100 : 0) + shared(p) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ p }) => p)

  return [...explicit, ...rest].slice(0, limit)
}

/** Text (a string with blank lines, or an array) as an array of paragraphs. */
export function toParagraphs(text) {
  if (!text) return []
  const parts = Array.isArray(text) ? text : String(text).split(/\n\s*\n/)
  return parts.map((part) => part.trim()).filter(Boolean)
}

/** Only real http(s) links become buttons; anything else counts as "not available". */
export function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim())
}

/** Cover image for a project: the thumbnail, or the first screenshot. */
export function getCover(project) {
  return project.thumbnail?.src ? project.thumbnail : project.screenshots?.[0] ?? null
}

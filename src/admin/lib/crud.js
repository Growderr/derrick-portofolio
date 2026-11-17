import { supabase } from '@/lib/supabase'

export const PAGE_SIZE = 10

/** Characters that would change a PostgREST filter are removed from search text. */
const cleanTerm = (term) => String(term ?? '').replace(/[%,()*\\:"']/g, ' ').trim()

/**
 * One page of rows, with the total count.
 *  filters: { column: value }  exact matches ('' and null are ignored)
 *  search:  text matched (case-insensitive) against `searchColumns`
 */
export async function listRows(table, { page = 0, pageSize = PAGE_SIZE, search = '', searchColumns = [], filters = {}, orderBy = [['created_at', false]], select = '*' } = {}) {
  let query = supabase.from(table).select(select, { count: 'exact' })

  Object.entries(filters).forEach(([column, value]) => {
    if (value === '' || value === null || value === undefined) return
    query = query.eq(column, value)
  })

  const term = cleanTerm(search)
  if (term && searchColumns.length > 0) {
    query = query.or(searchColumns.map((column) => `${column}.ilike.%${term}%`).join(','))
  }

  orderBy.forEach(([column, ascending]) => {
    query = query.order(column, { ascending })
  })

  const from = page * pageSize
  const { data, error, count } = await query.range(from, from + pageSize - 1)
  if (error) throw error
  return { rows: data ?? [], count: count ?? 0 }
}

export async function getRow(table, id) {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

/** Insert (id null) or update. Returns the saved row. */
export async function saveRow(table, id, payload) {
  const query = id
    ? supabase.from(table).update(payload).eq('id', id)
    : supabase.from(table).insert(payload)
  const { data, error } = await query.select().single()
  if (error) throw error
  return data
}

export async function patchRow(table, id, patch) {
  const { error } = await supabase.from(table).update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}

export async function countRows(table, filters = {}) {
  let query = supabase.from(table).select('id', { count: 'exact', head: true })
  Object.entries(filters).forEach(([column, value]) => {
    query = query.eq(column, value)
  })
  const { count, error } = await query
  if (error) throw error
  return count ?? 0
}

/** Options for a relation field: [{ value, label }]. */
export async function relationOptions(table, labelColumn) {
  const { data, error } = await supabase.from(table).select(`id, ${labelColumn}`).order(labelColumn).limit(200)
  if (error) throw error
  return (data ?? []).map((row) => ({ value: row.id, label: row[labelColumn] }))
}

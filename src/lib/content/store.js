import { useEffect, useSyncExternalStore } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase'

/**
 * A tiny stale-while-revalidate store for public content.
 *
 *  - Data is fetched once per resource and shared by every component.
 *  - Each time a page mounts (and when the tab regains focus) it is refreshed in
 *    the background, so changes made in the admin dashboard show up without a reload.
 *  - Without Supabase configured, resources are simply their local fallback.
 *
 * A resource is { name, fetch(): Promise<data>, fallback(): data }.
 */
const MIN_AGE_MS = 4000
const entries = new Map()

export function defineResource(name, fetch, fallback) {
  return { name, fetch, fallback }
}

function getEntry(def) {
  let entry = entries.get(def.name)
  if (entry) return entry

  const fallbackData = def.fallback()
  entry = {
    def,
    listeners: new Set(),
    promise: null,
    fetchedAt: 0,
    stale: false,
    loaded: false,
    snapshot: {
      status: isSupabaseConfigured ? 'loading' : 'ready',
      data: fallbackData,
      error: null,
    },
  }
  entry.subscribe = (listener) => {
    entry.listeners.add(listener)
    return () => entry.listeners.delete(listener)
  }
  entry.getSnapshot = () => entry.snapshot
  entries.set(def.name, entry)
  return entry
}

function publish(entry, snapshot) {
  entry.snapshot = snapshot
  entry.listeners.forEach((listener) => listener())
}

function revalidate(entry, { force = false } = {}) {
  if (!isSupabaseConfigured) return Promise.resolve()
  if (entry.promise) return entry.promise
  if (!force && !entry.stale && Date.now() - entry.fetchedAt < MIN_AGE_MS) return Promise.resolve()

  if (entry.snapshot.status === 'error') publish(entry, { ...entry.snapshot, status: 'loading', error: null })

  entry.promise = entry.def
    .fetch()
    .then((data) => {
      entry.loaded = true
      entry.stale = false
      entry.fetchedAt = Date.now()
      publish(entry, { status: 'ready', data, error: null })
    })
    .catch((error) => {
      // A failed background refresh keeps the data already on screen.
      if (!entry.loaded) publish(entry, { status: 'error', data: entry.snapshot.data, error })
    })
    .finally(() => {
      entry.promise = null
    })
  return entry.promise
}

/** { status: 'loading' | 'ready' | 'error', data, error, reload } */
export function useResource(def) {
  const entry = getEntry(def)
  const snapshot = useSyncExternalStore(entry.subscribe, entry.getSnapshot, entry.getSnapshot)

  useEffect(() => {
    revalidate(entry)
  }, [entry])

  return { ...snapshot, reload: () => revalidate(entry, { force: true }) }
}

/** Marks resources as outdated and refreshes the ones currently on screen. */
export function invalidateContent(...names) {
  entries.forEach((entry, name) => {
    if (names.length > 0 && !names.includes(name)) return
    entry.stale = true
    if (entry.listeners.size > 0) revalidate(entry, { force: true })
  })
}

if (typeof window !== 'undefined') {
  const refreshVisible = () => {
    if (document.visibilityState === 'hidden') return
    entries.forEach((entry) => {
      if (entry.listeners.size > 0) revalidate(entry)
    })
  }
  window.addEventListener('focus', refreshVisible)
  document.addEventListener('visibilitychange', refreshVisible)
}

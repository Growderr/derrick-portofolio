import { createClient } from '@supabase/supabase-js'

/**
 * The one and only Supabase client. Everything else imports `supabase` from here.
 *
 * Configuration comes from environment variables (see .env.example):
 *   VITE_SUPABASE_URL        project URL
 *   VITE_SUPABASE_ANON_KEY   anon / publishable key (safe for browsers, protected by RLS)
 *
 * A service_role / secret key must never be used in the frontend. If one is
 * detected the client is NOT created, so it can never be shipped by accident.
 */
const url = String(import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

function isPrivilegedKey(value) {
  if (value.startsWith('sb_secret_')) return true
  const payload = value.split('.')[1]
  if (!payload) return false
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return json.role === 'service_role'
  } catch {
    return false
  }
}

const privileged = key !== '' && isPrivilegedKey(key)
if (privileged) {
  console.error(
    '[Supabase] VITE_SUPABASE_ANON_KEY berisi service_role/secret key. Kunci ini TIDAK boleh ada di frontend. ' +
      'Gunakan anon/publishable key. Klien Supabase tidak dibuat.',
  )
}

/** Why Supabase is off, for the admin panel to explain: 'ok' | 'missing' | 'service-key'. */
export const supabaseStatus = privileged ? 'service-key' : url && key && /^https?:\/\//.test(url) ? 'ok' : 'missing'

export const isSupabaseConfigured = supabaseStatus === 'ok'

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    })
  : null

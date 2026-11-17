import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

/**
 * Admin session. Authentication is Supabase Auth (no passwords are handled or
 * stored here). "Is this person an admin?" is answered by the database: a row
 * in admin_users that Row Level Security only lets them read for themselves.
 * The frontend check only decides what to SHOW; every write is authorised by
 * RLS in Supabase regardless.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(!isSupabaseConfigured)
  const [admin, setAdmin] = useState({ userId: null, isAdmin: false, checked: !isSupabaseConfigured })

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined
    let alive = true

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      setSession(data.session)
      setReady(true)
    })
    // No Supabase calls inside this callback (the client can deadlock): only store the session.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))

    return () => {
      alive = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const userId = session?.user?.id ?? null

  useEffect(() => {
    if (!isSupabaseConfigured || !ready) return undefined
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when signed out
      setAdmin({ userId: null, isAdmin: false, checked: true })
      return undefined
    }
    let alive = true
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (alive) setAdmin({ userId, isAdmin: !error && Boolean(data), checked: true })
      })
    return () => {
      alive = false
    }
  }, [userId, ready])

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const checking = !ready || (Boolean(userId) && admin.userId !== userId)

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin: admin.isAdmin && admin.userId === userId,
      loading: checking || !admin.checked,
      signIn,
      signOut,
    }),
    [session, admin, userId, checking, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

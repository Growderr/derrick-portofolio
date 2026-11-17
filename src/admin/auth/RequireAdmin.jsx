import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { LoadingState } from '@/components/ui/DataGate'
import { useAuth } from '@/admin/auth/AuthProvider'
import { isSupabaseConfigured } from '@/lib/supabase'

/** Guards every /admin page except the login. Not the real security (RLS is), but keeps the UI honest. */
export default function RequireAdmin() {
  const { session, isAdmin, loading, signOut } = useAuth()
  const location = useLocation()

  if (!isSupabaseConfigured) return <Navigate to="/admin/login" replace />
  if (loading) return <LoadingState label="Memeriksa akses" />
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24">
        <h1 className="text-h2">Akun ini bukan admin</h1>
        <p className="mt-4 text-muted">
          Anda sudah masuk, tetapi akun ini belum terdaftar sebagai admin di database. Minta pemilik situs menambahkan
          akun Anda ke tabel <code>admin_users</code>.
        </p>
        <Button className="mt-8" variant="secondary" onClick={signOut}>
          Keluar
        </Button>
      </main>
    )
  }

  return <Outlet />
}

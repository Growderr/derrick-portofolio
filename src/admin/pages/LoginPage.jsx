import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import FormNotice from '@/components/ui/FormNotice'
import { useAuth } from '@/admin/auth/AuthProvider'
import { friendlyError } from '@/lib/friendlyError'
import { isSupabaseConfigured, supabaseStatus } from '@/lib/supabase'

export default function LoginPage() {
  const { session, isAdmin, loading, signIn, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const target = location.state?.from?.startsWith('/admin') ? location.state.from : '/admin/dashboard'

  if (isSupabaseConfigured && session && !loading && isAdmin) return <Navigate to={target} replace />

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return
    if (!email.trim() || !password) {
      setError('Isi email dan kata sandi.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      await signIn(email.trim(), password)
      navigate(target, { replace: true })
    } catch (caught) {
      setError(friendlyError(caught))
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-12">
      <div className="surface-inverse flex flex-col justify-between bg-ink p-8 text-paper lg:col-span-5 lg:p-14">
        <p className="flex items-center gap-3 font-display text-lg font-extrabold">
          <span aria-hidden="true" className="block size-3.5 bg-accent outline outline-2 -outline-offset-2 outline-paper" />
          Panel Admin
        </p>
        <div className="my-16">
          <h1 className="text-h1">Masuk untuk mengelola portofolio.</h1>
          <p className="mt-6 max-w-sm text-paper/80">Hanya untuk pemilik situs. Pengunjung tidak perlu akun.</p>
        </div>
        <a href="/" className="w-fit border-b border-paper/60 py-1 hover:text-accent">
          Kembali ke situs
        </a>
      </div>

      <div className="flex items-center p-8 lg:col-span-7 lg:p-14">
        <div className="mx-auto w-full max-w-md">
          {!isSupabaseConfigured ? (
            <FormNotice tone="error">
              {supabaseStatus === 'service-key'
                ? 'Variabel VITE_SUPABASE_ANON_KEY berisi service_role/secret key. Ganti dengan anon key, lalu jalankan ulang.'
                : 'Supabase belum dikonfigurasi. Salin .env.example menjadi .env, isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY, lalu jalankan ulang.'}
            </FormNotice>
          ) : session && !loading && !isAdmin ? (
            <div className="space-y-6">
              <FormNotice tone="error">Akun ini belum terdaftar sebagai admin.</FormNotice>
              <Button variant="secondary" onClick={signOut}>
                Keluar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6">
              <h2 className="text-h2">Masuk</h2>
              <FormField label="Email" required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} />
              <FormField label="Kata sandi" required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
              {error && <FormNotice tone="error">{error}</FormNotice>}
              <div>
                <Button type="submit" icon={LogIn} disabled={busy || loading}>
                  {busy ? 'Memproses…' : 'Masuk'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

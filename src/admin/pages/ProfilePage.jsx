import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import FormNotice from '@/components/ui/FormNotice'
import ContentForm from '@/admin/ui/ContentForm'
import { AdminHeading } from '@/admin/ui/Parts'
import { profileFields } from '@/admin/config/resources'
import { saveRow } from '@/admin/lib/crud'
import { invalidateContent } from '@/lib/content'
import { friendlyError } from '@/lib/friendlyError'
import { supabase } from '@/lib/supabase'

/** Singleton profile (biodata and website information). One row, created on first save. */
export default function ProfilePage() {
  const [state, setState] = useState({ status: 'loading', row: null, error: null })
  const [notice, setNotice] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    document.title = 'Profil | Panel Admin'
    let alive = true
    supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!alive) return
        if (error) setState({ status: 'error', row: null, error })
        else setState({ status: 'ready', row: data, error: null })
      })
    return () => {
      alive = false
    }
  }, [attempt])

  async function handleSave(payload) {
    const saved = await saveRow('profiles', state.row?.id ?? null, payload)
    setState({ status: 'ready', row: saved, error: null })
    invalidateContent('profile')
    setNotice('Profil disimpan. Perubahan langsung tampil di situs.')
  }

  return (
    <div>
      <AdminHeading title="Profil" description="Biodata dan teks yang tampil di Beranda, Tentang Saya, Keahlian, Kontak, dan CV." />

      {state.status === 'loading' && <p role="status" className="font-mono text-xs tracking-wide uppercase">Memuat…</p>}

      {state.status === 'error' && (
        <div role="alert" className="border-2 border-dashed border-ink p-6">
          <p className="text-h3">Profil gagal dimuat</p>
          <p className="mt-2 text-muted">{friendlyError(state.error)}</p>
          <Button className="mt-5" variant="secondary" onClick={() => { setState({ status: 'loading', row: null, error: null }); setAttempt((n) => n + 1) }}>
            Coba lagi
          </Button>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          {!state.row && <FormNotice tone="error" className="mb-6">Profil belum dibuat. Isi nama lalu simpan; kolom lain boleh menyusul.</FormNotice>}
          {notice && <FormNotice className="mb-6">{notice}</FormNotice>}
          <ContentForm key={state.row?.id ?? 'new'} fields={profileFields} record={state.row} onSubmit={handleSave} submitLabel="Simpan profil" />
        </>
      )}
    </div>
  )
}

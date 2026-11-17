import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { AuthProvider } from '@/admin/auth/AuthProvider'
import RequireAdmin from '@/admin/auth/RequireAdmin'
import AdminLayout from '@/admin/layout/AdminLayout'
import DashboardPage from '@/admin/pages/DashboardPage'
import InboxPage from '@/admin/pages/InboxPage'
import LoginPage from '@/admin/pages/LoginPage'
import ProfilePage from '@/admin/pages/ProfilePage'
import ResourcePage from '@/admin/pages/ResourcePage'
import { resourceConfigs } from '@/admin/config/resources'

function AdminNotFound() {
  return (
    <div>
      <h1 className="text-h2">Halaman admin tidak ditemukan</h1>
      <Button className="mt-6" to="/admin/dashboard">
        Ke ringkasan
      </Button>
    </div>
  )
}

/**
 * The whole admin area, loaded on demand so visitors never download it.
 * Pages are kept out of search engines.
 */
export default function AdminApp() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            {Object.entries(resourceConfigs).map(([key, config]) => (
              <Route key={key} path={`/admin/${key}`} element={<ResourcePage key={key} config={config} />} />
            ))}
            <Route path="/admin/messages" element={<InboxPage kind="messages" />} />
            <Route path="/admin/guestbook" element={<InboxPage kind="guestbook" />} />
            <Route path="/admin/*" element={<AdminNotFound />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

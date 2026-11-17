import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import FormField from '@/components/ui/FormField'
import FormNotice from '@/components/ui/FormNotice'
import { sendContactMessage } from '@/lib/api/visitors'
import { friendlyError } from '@/lib/friendlyError'
import { isSupabaseConfigured } from '@/lib/supabase'

const empty = { name: '', email: '', subject: '', message: '', website: '' }
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const message = values.message.trim()
  if (name.length < 2) errors.name = 'Nama minimal 2 karakter.'
  if (name.length > 100) errors.name = 'Nama maksimal 100 karakter.'
  if (!EMAIL.test(values.email.trim())) errors.email = 'Masukkan alamat email yang valid.'
  if (values.subject.trim().length > 150) errors.subject = 'Subjek maksimal 150 karakter.'
  if (message.length < 10) errors.message = 'Pesan minimal 10 karakter.'
  if (message.length > 5000) errors.message = 'Pesan maksimal 5000 karakter.'
  return errors
}

/** Contact form. Messages are stored in Supabase and read in the admin panel. */
export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState({ status: 'idle', error: null })
  const openedAt = useRef(Date.now())

  const set = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault()
    if (state.status === 'sending') return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Bots fill the hidden field or submit instantly: pretend it worked, store nothing.
    if (values.website || Date.now() - openedAt.current < 2500) {
      setState({ status: 'sent', error: null })
      setValues(empty)
      return
    }

    setState({ status: 'sending', error: null })
    try {
      await sendContactMessage(values)
      setValues(empty)
      setState({ status: 'sent', error: null })
    } catch (error) {
      setState({ status: 'error', error: friendlyError(error) })
    }
  }

  return (
    <section aria-labelledby="contact-form-heading" className="border-t border-line py-section">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
        <header className="lg:col-span-4">
          <h2 id="contact-form-heading" className="text-h2">
            Kirim pesan
          </h2>
          <p className="mt-4 max-w-xs text-muted">Pesan masuk langsung ke kotak masuk saya. Email Anda hanya dipakai untuk membalas.</p>
        </header>

        <div className="lg:col-span-8">
          {!isSupabaseConfigured ? (
            <EmptyState title="Formulir belum aktif">
              <p>Formulir akan aktif setelah situs ini terhubung ke Supabase.</p>
            </EmptyState>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid max-w-2xl gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField label="Nama" required autoComplete="name" maxLength={100} value={values.name} onChange={set('name')} error={errors.name} />
                <FormField label="Email" required type="email" autoComplete="email" maxLength={254} value={values.email} onChange={set('email')} error={errors.email} />
              </div>
              <FormField label="Subjek" hint="Opsional." maxLength={150} value={values.subject} onChange={set('subject')} error={errors.subject} />
              <FormField label="Pesan" required as="textarea" maxLength={5000} value={values.message} onChange={set('message')} error={errors.message} />

              {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Jangan diisi
                  <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                </label>
              </div>

              {state.status === 'sent' && <FormNotice>Terima kasih! Pesan Anda sudah terkirim dan akan saya baca.</FormNotice>}
              {state.status === 'error' && <FormNotice tone="error">{state.error}</FormNotice>}

              <div>
                <Button type="submit" icon={Send} disabled={state.status === 'sending'}>
                  {state.status === 'sending' ? 'Mengirim…' : 'Kirim pesan'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

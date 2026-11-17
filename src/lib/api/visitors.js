import { supabase } from '@/lib/supabase'

/**
 * Visitor-facing writes and reads. Row Level Security allows exactly this:
 * anyone may INSERT a contact message or a guestbook entry (never read the
 * former, never self-publish the latter) and read PUBLISHED guestbook entries.
 */

export async function sendContactMessage({ name, email, subject, message }) {
  const { error } = await supabase.from('contact_messages').insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim() || null,
    message: message.trim(),
  })
  if (error) throw error
}

export async function sendGuestbookEntry({ name, message }) {
  const { error } = await supabase.from('guestbook').insert({ name: name.trim(), message: message.trim() })
  if (error) throw error
}

export async function fetchGuestbook({ from, to }) {
  const { data, error, count } = await supabase
    .from('guestbook')
    .select('id, name, message, created_at', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to)
  if (error) throw error
  return { rows: data ?? [], count: count ?? 0 }
}

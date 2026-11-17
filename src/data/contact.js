import { Briefcase, Camera, Code, Mail } from 'lucide-react'

/**
 * Contact details and social links, shown on /contact, /resume and in the footer.
 * EDIT THIS FILE to fill them in. Anything left as null renders as a clearly
 * labelled placeholder, never as a live link. Nothing here is invented.
 *
 *   email    'name@example.com'
 *   github   { url: 'https://github.com/username',        handle: 'username' }
 *   instagram{ url: 'https://instagram.com/username',     handle: '@username' }
 *   linkedin { url: 'https://linkedin.com/in/username',   handle: 'Full name' }
 *
 * Lucide no longer ships brand logos, so neutral icons sit beside text labels.
 */
export const contactEmail = null

/**
 * Builds the contact list from profile values. The profile in the database
 * (or the empty defaults below) is the source; nothing is invented.
 */
export function buildContactLinks({ email = null, github = {}, instagram = {}, linkedin = {} } = {}) {
  return [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      display: email,
      url: email ? `mailto:${email}` : null,
      placeholder: 'Alamat email akan ditambahkan',
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Code,
      display: github.handle ?? null,
      url: github.url ?? null,
      placeholder: 'Profil GitHub akan ditambahkan',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Camera,
      display: instagram.handle ?? null,
      url: instagram.url ?? null,
      placeholder: 'Profil Instagram akan ditambahkan',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Briefcase,
      display: linkedin.handle ?? null,
      url: linkedin.url ?? null,
      placeholder: 'Profil LinkedIn akan ditambahkan',
    },
  ]
}

/** In display order. Local fallback, used when Supabase is not configured. */
export const contactLinks = buildContactLinks({ email: contactEmail })

export const emailLink = contactLinks[0]

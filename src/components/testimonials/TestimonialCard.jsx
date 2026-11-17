import { Quote } from 'lucide-react'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

function initials(name) {
  if (!name) return null
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
  return letters.toUpperCase()
}

/** Square avatar: the photo when given, otherwise initials on yellow. */
function Avatar({ src, name }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={96}
        height={96}
        loading="lazy"
        className="size-12 shrink-0 border-2 border-ink object-cover"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center border-2 border-ink bg-accent text-sm font-extrabold text-on-accent"
    >
      {initials(name) ?? '?'}
    </span>
  )
}

/**
 * One testimonial. Missing values render a dashed placeholder.
 *  testimonial  entry from src/data/testimonials.js
 */
export default function TestimonialCard({ testimonial }) {
  const { name, role, organization, message, avatar } = testimonial

  return (
    <figure className="flex h-full flex-col border-2 border-ink bg-paper p-6 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 sm:p-8">
      <Quote aria-hidden="true" size={28} strokeWidth={2} className="shrink-0" />

      <blockquote className="mt-5 flex-1 text-lead">
        {message ? <p>{message}</p> : <p className={dashed}>Pesan masukan akan ditambahkan</p>}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <Avatar src={avatar} name={name} />
        <div className="min-w-0">
          <p className="font-semibold">{name ?? <span className={`${dashed} font-normal`}>Nama akan ditambahkan</span>}</p>
          <p className="text-sm text-muted">
            {role ?? <span className={dashed}>Peran akan ditambahkan</span>}
            {' · '}
            {organization ?? <span className={dashed}>Organisasi akan ditambahkan</span>}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

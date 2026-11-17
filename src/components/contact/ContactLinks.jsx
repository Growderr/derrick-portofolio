import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

function isExternal(url) {
  return /^https?:\/\//.test(url)
}

/**
 * Contact and social links from src/data/contact.js.
 * Links without a url render as plain, clearly labelled placeholders.
 *
 *  links    entries from contactLinks
 *  variant  'rows' (large ruled rows, for /contact) | 'compact' (for the resume)
 */
export default function ContactLinks({ links, variant = 'rows', className }) {
  if (variant === 'compact') {
    return (
      <ul className={cn('grid gap-x-8 gap-y-2 sm:grid-cols-2', className)}>
        {links.map(({ id, label, display, url, placeholder }) => (
          <li key={id} className="flex flex-wrap gap-x-2">
            <span className="font-mono text-xs tracking-wide uppercase">{label}</span>
            {url ? (
              <a
                href={url}
                {...(isExternal(url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="break-all underline decoration-1 underline-offset-4 hover:bg-accent hover:text-on-accent"
              >
                {display ?? url}
              </a>
            ) : (
              <span className={dashed}>{placeholder}</span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={cn('border-b-2 border-ink', className)}>
      {links.map(({ id, label, icon: Icon, display, url, placeholder }) => {
        const inner = (
          <>
            <span className="flex items-center gap-4 sm:col-span-4">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center border-2 border-ink bg-paper transition-colors duration-150 group-hover:bg-ink group-hover:text-accent"
              >
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <span className="text-h3">{label}</span>
            </span>
            <span className="min-w-0 break-words sm:col-span-7">
              {display ?? (url ? url : <span className={dashed}>{placeholder}</span>)}
            </span>
            <span className="hidden justify-end sm:col-span-1 sm:flex">
              {url && (
                <ArrowUpRight
                  aria-hidden="true"
                  size={24}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              )}
            </span>
          </>
        )
        const row =
          'group grid items-center gap-x-6 gap-y-2 border-t-2 border-ink py-5 sm:grid-cols-12'

        return (
          <li key={id}>
            {url ? (
              <a
                href={url}
                {...(isExternal(url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`${label}: ${display ?? url}${isExternal(url) ? ' (terbuka di tab baru)' : ''}`}
                className={cn(row, 'hover:bg-accent hover:text-on-accent')}
              >
                {inner}
              </a>
            ) : (
              <div className={row}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

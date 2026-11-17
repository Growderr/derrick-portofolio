import { cn } from '@/lib/cn'

/**
 * One ruled row: title, short description, optional aside (e.g. technologies).
 * Used for the home skills preview and the About interests.
 */
export default function AreaRow({ title, description, aside, className }) {
  return (
    <li className={cn('grid gap-x-8 gap-y-2 border-t-2 border-ink py-6 md:grid-cols-12', className)}>
      <h3 className={cn('text-h3', aside ? 'md:col-span-4' : 'md:col-span-5')}>{title}</h3>
      <p className={cn('text-muted', aside ? 'md:col-span-5' : 'md:col-span-7')}>{description}</p>
      {aside && <div className="md:col-span-3">{aside}</div>}
    </li>
  )
}

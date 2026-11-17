import { cn } from '@/lib/cn'

/**
 * Category filter. Plain toggle buttons, so it works with keyboard and screen
 * readers: the active one reports aria-pressed.
 *
 *  options  [{ id, label, count }], including the "all" option
 *  active   id of the selected option
 */
export default function CertificateFilter({
  options,
  active,
  onChange,
  label = 'Saring berdasarkan kategori',
  className,
}) {
  return (
    <div role="group" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {options.map(({ id, label, count }) => {
        const selected = id === active
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(id)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-none border-2 border-ink px-4 text-sm font-semibold transition-colors duration-150',
              selected ? 'bg-ink text-paper' : 'bg-transparent text-ink hover:bg-accent hover:text-on-accent',
            )}
          >
            {label}
            <span
              className={cn(
                'text-xs tabular-nums',
                selected ? 'text-accent' : 'text-muted',
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

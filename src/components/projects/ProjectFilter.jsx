import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Category filter. A group of toggle buttons: exactly one is pressed.
 * options: [{ id, label, count }]
 */
export default function ProjectFilter({ options, active, onChange }) {
  return (
    <div role="group" aria-label="Saring proyek berdasarkan kategori" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const pressed = option.id === active
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(option.id)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-none border-2 border-ink px-4 text-sm font-semibold transition-colors duration-150',
              pressed ? 'bg-accent text-on-accent' : 'bg-paper text-ink hover:bg-ink hover:text-paper',
            )}
          >
            {pressed && <Check aria-hidden="true" size={16} strokeWidth={3} />}
            {option.label}
            <span className={cn('tabular-nums font-normal', pressed ? '' : 'opacity-70')}>
              {option.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

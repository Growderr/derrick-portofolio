import { cn } from '@/lib/cn'

/** Inline message for form results. `tone`: 'success' (yellow) | 'error' (dashed). */
export default function FormNotice({ tone = 'success', children, className }) {
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'border-2 border-ink p-4 font-semibold',
        tone === 'success' ? 'bg-accent text-on-accent' : 'border-dashed bg-paper',
        className,
      )}
    >
      {children}
    </p>
  )
}

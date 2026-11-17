import { cn } from '@/lib/cn'

/**
 * Dashed container that says what is missing and where to add it.
 * `action` is an optional node (usually a Button) shown beneath the text.
 */
export default function EmptyState({ title, children, hint, icon: Icon, action, className }) {
  return (
    <div className={cn('border-2 border-dashed border-ink p-6 sm:p-8', className)}>
      {Icon && (
        <span
          aria-hidden="true"
          className="mb-5 grid size-11 place-items-center border-2 border-ink bg-accent text-on-accent"
        >
          <Icon size={20} strokeWidth={1.75} />
        </span>
      )}
      <p className="text-h3">{title}</p>
      {children && <div className="mt-3 max-w-lg text-muted">{children}</div>}
      {hint && <p className="mt-5 text-sm">{hint}</p>}
      {action && <div className="mt-6 flex flex-wrap gap-3">{action}</div>}
    </div>
  )
}

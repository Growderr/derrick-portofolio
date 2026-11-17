import { useId } from 'react'
import { cn } from '@/lib/cn'

export const inputStyles =
  'block w-full rounded-none border-2 border-ink bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus-visible:outline-offset-2 disabled:opacity-50 aria-[invalid=true]:border-dashed'

/**
 * Labelled input, textarea or select with an optional hint and error message.
 * Wires `id`, `aria-describedby` and `aria-invalid` so screen readers read them.
 *
 *   as: 'input' (default) | 'textarea' | 'select'
 */
export default function FormField({ label, hint, error, as: Control = 'input', required, className, children, ...props }) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-mono text-xs font-medium tracking-wide uppercase">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <Control
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={cn(inputStyles, Control === 'textarea' && 'min-h-36 resize-y')}
        {...props}
      >
        {children}
      </Control>
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm font-semibold">
          {error}
        </p>
      )}
    </div>
  )
}

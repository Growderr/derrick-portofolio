import { cn } from '@/lib/cn'

/**
 * Small label, main heading, optional description.
 * Use `as="h1"` when the header is the page's primary heading.
 */
export default function SectionHeader({
  label,
  title,
  description,
  as: Heading = 'h2',
  className,
}) {
  const isPrimary = Heading === 'h1'

  return (
    <header className={cn('max-w-4xl', className)}>
      {label && (
        <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-wide uppercase">
          <span aria-hidden="true" className="block size-3 border border-ink bg-accent" />
          {label}
        </p>
      )}
      <Heading className={isPrimary ? 'text-h1' : 'text-h2'}>{title}</Heading>
      {description && <p className="mt-6 max-w-xl text-lead text-muted">{description}</p>}
    </header>
  )
}

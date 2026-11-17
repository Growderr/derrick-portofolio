const dashed = 'border-b-2 border-dashed border-ink text-muted'

/**
 * One entry inside a resume section (a school, a placement, a project).
 * `title` and `period` fall back to dashed placeholders when null.
 */
export default function ResumeEntry({
  title,
  titlePlaceholder = 'Nama akan ditambahkan',
  subtitle,
  period,
  periodPlaceholder = 'Tanggal akan ditambahkan',
  description,
  bullets = [],
  tags = [],
}) {
  return (
    <article className="print-avoid border-b border-line pb-6 last:border-b-0 last:pb-0 [&:not(:first-child)]:pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-h3">{title ?? <span className={dashed}>{titlePlaceholder}</span>}</h3>
        <p className="font-mono text-xs text-muted">{period ?? <span className={dashed}>{periodPlaceholder}</span>}</p>
      </div>
      {subtitle && <p className="mt-1 font-semibold">{subtitle}</p>}
      {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
      {bullets.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Label">
          {tags.map((tag) => (
            <li key={tag} className="border border-ink px-2 py-1 font-mono text-xs">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

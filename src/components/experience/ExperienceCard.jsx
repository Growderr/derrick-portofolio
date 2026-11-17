import FieldRow from '@/components/about/FieldRow'
import Documentation from '@/components/experience/Documentation'
import { cn } from '@/lib/cn'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

/**
 * One detailed experience entry (PLK, organization, or competition).
 * Ruled, not boxed. Missing values render a dashed placeholder.
 *
 *  title, titlePlaceholder  main heading
 *  subtitle                 line under the heading
 *  period                   date or duration, or null for a placeholder
 *  description              paragraph, or null to omit
 *  fields                   [{ label, value, placeholder }] shown as a definition list
 *  technologies             array to show a tag row (empty array shows a placeholder); undefined hides it
 *  documentation            array of { src, alt, caption }
 */
export default function ExperienceCard({
  title,
  titlePlaceholder = 'Nama akan ditambahkan',
  subtitle,
  period,
  description,
  fields = [],
  technologies,
  documentation = [],
  className,
}) {
  return (
    <article className={cn('grid gap-x-8 gap-y-3 border-t-2 border-ink pt-6 lg:grid-cols-12', className)}>
      <p className="font-mono text-xs tracking-wide text-muted uppercase lg:col-span-3 lg:pt-3">
        {period ?? <span className={dashed}>Tanggal akan ditambahkan</span>}
      </p>
      <div className="lg:col-span-9">
      <h3 className="text-h2">{title ?? <span className={dashed}>{titlePlaceholder}</span>}</h3>
      {subtitle && <p className="mt-1 font-semibold">{subtitle}</p>}
      {description && <p className="mt-5 max-w-2xl text-lead text-muted">{description}</p>}

      {fields.length > 0 && (
        <dl className="mt-8 border-b-2 border-ink">
          {fields.map((field) => (
            <FieldRow key={field.label} {...field} />
          ))}
        </dl>
      )}

      {technologies && (
        <div className="mt-8">
          <h4 className="mb-3 font-mono text-xs font-medium tracking-wide uppercase">Teknologi</h4>
          {technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Teknologi">
              {technologies.map((tech) => (
                <li key={tech} className="border border-ink px-2 py-1 font-mono text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">
              <span className={dashed}>Teknologi akan ditambahkan</span>
            </p>
          )}
        </div>
      )}

      <Documentation items={documentation} />
      </div>
    </article>
  )
}

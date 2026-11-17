import { Briefcase, GraduationCap, Trophy, Users } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

const kinds = {
  education: { label: 'Pendidikan', icon: GraduationCap },
  plk: { label: 'PLK', icon: Briefcase },
  organization: { label: 'Organisasi', icon: Users },
  competition: { label: 'Lomba', icon: Trophy },
}

function Period({ period }) {
  return period ? <>{period}</> : <span className={dashed}>Tanggal akan ditambahkan</span>
}

/**
 * Vertical journey timeline.
 * Desktop: period in a left column, a rail with square markers, content on the right.
 * Mobile: one column, the period moves inside the entry. Current entries get a yellow marker.
 *
 * entries: [{ id, kind, period, title, role, description, tags, current }]
 */
export default function ExperienceTimeline({ entries, endNote }) {
  return (
    <ol aria-label="Linimasa pengalaman">
      {entries.map((entry) => {
        const kind = kinds[entry.kind] ?? kinds.education
        const Icon = kind.icon

        return (
          <li key={entry.id} className="group">
            <Reveal className="grid md:grid-cols-12">
              <div className="hidden md:col-span-3 md:block md:pr-10 md:text-right">
                <p className="text-h3 tabular-nums">
                  <Period period={entry.period} />
                </p>
              </div>

              <div className="relative border-l-2 border-ink pb-14 pl-6 group-last:pb-0 md:col-span-9 md:pl-10">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-1.5 -left-[9px] size-4 border-2 border-ink',
                    entry.current ? 'bg-accent' : 'bg-paper',
                  )}
                />

                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                    <Icon aria-hidden="true" size={16} strokeWidth={2} />
                    {kind.label}
                  </span>
                  <span className="md:hidden">
                    <Period period={entry.period} />
                  </span>
                  {entry.current && (
                    <span className="border border-ink bg-accent px-2 py-0.5 text-on-accent">Saat ini</span>
                  )}
                </p>

                <h3 className="mt-2 text-h2">{entry.title}</h3>
                <p className="mt-1 font-semibold">
                  {entry.role ?? <span className={cn(dashed, 'font-normal')}>Peran akan ditambahkan</span>}
                </p>
                {entry.description && <p className="mt-4 max-w-xl text-muted">{entry.description}</p>}

                {entry.tags?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Label">
                    {entry.tags.map((tag) => (
                      <li key={tag} className="border border-ink px-2 py-1 font-mono text-xs">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        )
      })}

      {endNote && (
        <li className="group">
          <div className="grid md:grid-cols-12">
            <div className="hidden md:col-span-3 md:block" />
            <div className="relative border-l-2 border-dashed border-ink pt-10 pl-6 md:col-span-9 md:pl-10">
              <span
                aria-hidden="true"
                className="absolute top-0 -left-[9px] size-4 border-2 border-dashed border-ink bg-paper"
              />
              <p className="max-w-md text-sm text-muted">{endNote}</p>
            </div>
          </div>
        </li>
      )}
    </ol>
  )
}

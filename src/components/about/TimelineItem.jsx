import { cn } from '@/lib/cn'

const dashed = 'border-b-2 border-dashed border-ink'

/** One education entry on a vertical line. The current school gets a yellow marker. */
export default function TimelineItem({ entry }) {
  const { school, lines, period, current } = entry

  return (
    <li className="relative pb-12 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className={cn('absolute top-2 -left-[7px] size-3 border-2 border-ink', current ? 'bg-accent' : 'bg-paper')}
      />
      <p className="font-mono text-xs tracking-wide text-muted uppercase">
        {period ?? (
          <span className={dashed}>Tanggal akan ditambahkan</span>
        )}
        {current && <span className="ml-3 border border-ink bg-accent px-2 py-0.5 text-on-accent">Saat ini</span>}
      </p>

      <h3 className="mt-1 text-h3">
        {school ?? <span className={dashed}>Nama sekolah sebelumnya</span>}
      </h3>

      {lines.length > 0 ? (
        <ul className="mt-2 space-y-1 text-muted">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-muted">Jenjang dan detail pendidikan akan ditambahkan lewat Panel Admin.</p>
      )}
    </li>
  )
}

import TimelineItem from '@/components/about/TimelineItem'

/** Vertical education line, newest first. Reuses the About timeline item. */
export default function EducationTimeline({ entries }) {
  return (
    <ol className="border-l-2 border-ink">
      {entries.map((entry) => (
        <TimelineItem key={entry.id} entry={entry} />
      ))}
    </ol>
  )
}

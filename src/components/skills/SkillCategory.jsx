import SkillItem from '@/components/skills/SkillItem'

/** One hard-skill group: numbered title on the left, ruled skill list on the right. */
export default function SkillCategory({ category, index }) {
  const { id, title, description, items } = category
  const number = String(index + 1).padStart(2, '0')

  return (
    <section
      aria-labelledby={`skill-cat-${id}`}
      className="grid gap-8 border-t-2 border-ink py-10 lg:grid-cols-12 lg:gap-x-8"
    >
      <header className="lg:col-span-4">
        <p className="mb-3 inline-block bg-accent px-2 py-0.5 font-mono text-xs font-semibold text-on-accent tabular-nums">
          {number}
        </p>
        <h3 id={`skill-cat-${id}`} className="text-h2">
          {title}
        </h3>
        {description && <p className="mt-4 max-w-xs text-muted">{description}</p>}
      </header>

      <ul className="lg:col-span-8" aria-label={`Keahlian ${title}`}>
        {items.map((skill) => (
          <SkillItem key={skill.name} skill={skill} />
        ))}
      </ul>
    </section>
  )
}

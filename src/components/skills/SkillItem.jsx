import SkillBar from '@/components/skills/SkillBar'
import { getSkillIcon } from '@/lib/skillIcons'
import { clampValue, getSkillLevel } from '@/lib/skillLevel'

/**
 * One skill.
 *  - variant "row":  name, level word, percentage, bar (hard skills)
 *  - variant "stat": number first, then name, bar, definition (soft skills)
 */
export default function SkillItem({ skill, variant = 'row' }) {
  const { name, value, description, icon } = skill
  const v = clampValue(value)
  const level = getSkillLevel(v)

  if (variant === 'stat') {
    return (
      <li className="border-t-2 border-ink pt-5 pb-8">
        <p className="flex items-baseline gap-1" aria-hidden="true">
          <span className="text-h1 tabular-nums">{v}</span>
          <span className="text-h3">%</span>
        </p>
        <h3 className="mt-3 text-h3">{name}</h3>
        <p className="mt-1 text-sm text-muted">{level}</p>
        <SkillBar name={name} value={v} className="mt-4" />
        {description && <p className="mt-4 text-muted">{description}</p>}
      </li>
    )
  }

  const Icon = icon ? getSkillIcon(icon) : null

  return (
    <li className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon aria-hidden="true" size={20} strokeWidth={1.75} className="shrink-0" />}
          <div>
            <h4 className="text-lg font-semibold leading-tight">{name}</h4>
            <p className="text-sm text-muted">{level}</p>
          </div>
        </div>
        <p className="text-h2 tabular-nums" aria-hidden="true">
          {v}
          <span className="text-h3">%</span>
        </p>
      </div>
      <SkillBar name={name} value={v} className="mt-3" />
    </li>
  )
}

import { skillLevels } from '@/data/skills'

/** Keeps a value inside 0 to 100 so a typo in the data file cannot break the layout. */
export function clampValue(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return 0
  return Math.min(100, Math.max(0, Math.round(n)))
}

/** Word label for a percentage, taken from the editable `skillLevels` table. */
export function getSkillLevel(value) {
  const v = clampValue(value)
  return [...skillLevels].reverse().find((level) => v >= level.min)?.label ?? skillLevels[0].label
}

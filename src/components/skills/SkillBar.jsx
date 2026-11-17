import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '@/lib/motion'
import { clampValue, getSkillLevel } from '@/lib/skillLevel'
import { cn } from '@/lib/cn'

/**
 * Horizontal self-assessment bar.
 * Exposed to assistive tech as a meter with a spoken value, so the information
 * never depends on the yellow fill alone. The fill grows once, and not at all
 * under prefers-reduced-motion.
 */
export default function SkillBar({ name, value, className }) {
  const reduce = useReducedMotion()
  const v = clampValue(value)
  const level = getSkillLevel(v)

  const fillClass = cn('h-full bg-accent', v > 0 && v < 100 && 'border-r-2 border-ink')

  return (
    <div
      role="meter"
      aria-label={`${name}, penilaian mandiri`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-valuetext={`${v} persen, ${level}`}
      className={cn('relative h-3.5 border-2 border-ink bg-paper', className)}
    >
      {reduce ? (
        <div className={fillClass} style={{ width: `${v}%` }} />
      ) : (
        <motion.div
          className={cn(fillClass, 'origin-left')}
          style={{ width: `${v}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
      )}
      {/* Quarter ticks give the bar a scale without adding labels */}
      <span aria-hidden="true" className="absolute inset-y-0 left-1/4 w-px bg-ink/30" />
      <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-ink/30" />
      <span aria-hidden="true" className="absolute inset-y-0 left-3/4 w-px bg-ink/30" />
    </div>
  )
}

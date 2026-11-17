import { cn } from '@/lib/cn'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold leading-none whitespace-nowrap select-none transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  // Solid black. Turns yellow on hover.
  primary:
    'rounded-none border-2 border-ink bg-ink text-paper hover:bg-accent hover:text-on-accent',
  // Outlined. Fills black on hover.
  secondary:
    'rounded-none border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  // Underlined link. Gets a yellow highlight on hover.
  text: 'rounded-none px-2 text-ink underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent',
}

const sizes = {
  md: 'min-h-12 text-base',
  sm: 'min-h-11 text-sm',
}

const padding = {
  md: 'px-6',
  sm: 'px-4',
}

export function buttonStyles({ variant = 'primary', size = 'md', className } = {}) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    variant !== 'text' && padding[size],
    className,
  )
}

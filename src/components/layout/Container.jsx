import { cn } from '@/lib/cn'

/** Consistent horizontal spacing and responsive max width. */
export default function Container({ as: Tag = 'div', className, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12', className)} {...props} />
  )
}

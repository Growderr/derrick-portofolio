import { Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const ratios = {
  '4/3': 'aspect-[4/3]',
  '16/10': 'aspect-[16/10]',
  '4/5': 'aspect-[4/5]',
}

/** Replaceable image frame. Fixed aspect ratio so layouts never shift. */
export default function ImagePlaceholder({ label = 'Tempat gambar', ratio = '4/3', className }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-ink bg-surface p-4 text-center',
        ratios[ratio],
        className,
      )}
    >
      <ImageIcon aria-hidden="true" size={28} strokeWidth={1.5} />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  )
}

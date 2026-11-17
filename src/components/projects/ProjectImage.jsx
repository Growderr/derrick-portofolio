import { useState } from 'react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { cn } from '@/lib/cn'

const ratios = { '16/10': 'aspect-[16/10]', '4/3': 'aspect-[4/3]', '4/5': 'aspect-[4/5]' }

/** Project image with a fixed ratio. Missing or broken files fall back to a labelled placeholder. */
export default function ProjectImage({ image, ratio = '16/10', label = 'Tempat gambar proyek', eager = false, className }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!image?.src || failedSrc === image.src) {
    return <ImagePlaceholder label={label} ratio={ratio} className={className} />
  }

  return (
    <img
      src={image.src}
      alt={image.alt ?? ''}
      width={1600}
      height={1000}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedSrc(image.src)}
      className={cn('w-full border-2 border-ink object-cover', ratios[ratio], className)}
    />
  )
}

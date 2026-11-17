import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import ImageLightbox from '@/components/ui/ImageLightbox'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Missing from '@/components/projects/Missing'

// Staggered widths on a 12-column grid: 8+4, then 4+8, repeating.
const spans = ['sm:col-span-8', 'sm:col-span-4', 'sm:col-span-4', 'sm:col-span-8']

/** Screenshot grid. Each image opens in the accessible lightbox. Empty list shows placeholders. */
export default function ScreenshotGallery({ images = [], projectTitle }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (images.length === 0) {
    return (
      <div>
        <p className="mb-4">
          <Missing>Tangkapan layar akan ditambahkan</Missing>
        </p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <ImagePlaceholder label="Tempat tangkapan layar" ratio="16/10" />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <ul className="grid items-start gap-4 sm:grid-cols-12">
        {images.map((image, index) => (
          <li key={`${index}-${image.src}`} className={spans[index % spans.length]}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Buka gambar ${index + 1} dari ${images.length}${image.alt ? `: ${image.alt}` : ''}`}
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full cursor-zoom-in overflow-hidden border-2 border-ink text-left"
            >
              <img
                src={image.src}
                alt=""
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 grid size-10 place-items-center border-2 border-ink bg-accent text-on-accent"
              >
                <Maximize2 size={16} strokeWidth={2.25} />
              </span>
            </button>
            {image.caption && <p className="mt-2 text-sm text-muted">{image.caption}</p>}
          </li>
        ))}
      </ul>

      <ImageLightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        label={`Tangkapan layar ${projectTitle}`}
      />
    </>
  )
}

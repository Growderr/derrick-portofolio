import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

const control =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-none border-2 border-paper px-3 font-semibold transition-colors duration-150 hover:bg-accent hover:text-on-accent hover:border-accent'

/**
 * Accessible image viewer built on the native <dialog> element.
 *
 *  - showModal() gives a real modal: focus is trapped, the page behind is inert,
 *    and Escape closes it.
 *  - Focus moves to the close button on open and returns to the element that
 *    opened it on close.
 *  - Left/Right arrows (and the buttons) move between images; Home/End jump.
 *  - Page scrolling is locked while open; the current image is announced politely.
 *
 * images: [{ src, alt, caption, href }]   (href: optional "Open document" link)   index: number | null (null = closed)
 */
export default function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
  label = 'Penampil gambar',
}) {
  const dialogRef = useRef(null)
  const image = index !== null && index !== undefined ? images[index] : null
  const isOpen = Boolean(image)
  const total = images.length

  // Open as a modal, lock scroll, and give focus back to the opener afterwards.
  useEffect(() => {
    if (!isOpen) return undefined
    const opener = document.activeElement
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    return () => {
      root.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [isOpen])

  // Warm the cache for the neighbouring images so arrow keys feel instant.
  useEffect(() => {
    if (!isOpen || total < 2) return
    ;[index - 1, index + 1].forEach((i) => {
      const neighbour = images[(i + total) % total]
      if (neighbour?.src) new Image().src = neighbour.src
    })
  }, [isOpen, index, images, total])

  if (!isOpen) return null

  const go = (step) => onIndexChange((index + step + total) % total)

  function handleKeyDown(event) {
    if (total < 2) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      onIndexChange(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      onIndexChange(total - 1)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className="surface-inverse m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-ink p-0 text-paper backdrop:bg-ink"
    >
      <motion.div
        className="flex h-full flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <p className="text-sm tabular-nums" aria-hidden="true">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className={control}
          >
            <X aria-hidden="true" size={18} strokeWidth={2.25} />
            Tutup
          </button>
        </div>

        {/* Clicking the dark area around the image closes the viewer. */}
        <figure
          className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close()
          }}
        >
          <motion.img
            key={`${index}-${image.src}`}
            src={image.src}
            alt={image.alt ?? ''}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="max-h-full max-w-full object-contain"
          />
        </figure>

        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm">{image.caption ?? image.alt}</p>
            {image.href && (
              <a
                href={image.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-none text-sm font-semibold underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent"
              >
                Buka dokumen
                <ExternalLink aria-hidden="true" size={16} strokeWidth={2.25} />
                <span className="sr-only">(terbuka di tab baru)</span>
              </a>
            )}
          </div>
          {total > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className={control}>
                <ChevronLeft aria-hidden="true" size={18} strokeWidth={2.25} />
                Sebelumnya
              </button>
              <button type="button" onClick={() => go(1)} className={control}>
                Berikutnya
                <ChevronRight aria-hidden="true" size={18} strokeWidth={2.25} />
              </button>
            </div>
          )}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Gambar {index + 1} dari {total}
          {image.alt ? `: ${image.alt}` : ''}
        </p>
      </motion.div>
    </dialog>
  )
}

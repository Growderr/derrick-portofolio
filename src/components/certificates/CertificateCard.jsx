import { ExternalLink, Maximize2 } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { formatDate } from '@/lib/formatDate'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

/**
 * One certificate or achievement. Ruled, not boxed, like the rest of the site.
 * Missing values render a dashed placeholder instead of being invented.
 *
 *  certificate  entry from src/data/certificates.js
 *  categoryLabel  display name of its category
 *  onPreview    called when the image is activated; omit to disable the preview
 */
export default function CertificateCard({ certificate, categoryLabel, onPreview }) {
  const { title, issuer, date, description, image, documentUrl } = certificate
  const displayTitle = title ?? 'Sertifikat tanpa judul'
  const displayDate = formatDate(date)

  return (
    <article className="group flex h-full flex-col border-t-2 border-ink pt-5">
      {image?.src ? (
        <button
          type="button"
          onClick={onPreview}
          aria-label={`Pratinjau gambar: ${displayTitle}`}
          className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden border-2 border-ink bg-surface"
        >
          <img
            src={image.src}
            alt={image.alt ?? displayTitle}
            width={1200}
            height={900}
            loading="lazy"
            className="size-full object-contain p-2 "
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 inline-flex items-center gap-1.5 border-t-2 border-r-2 border-ink bg-accent px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-on-accent uppercase"
          >
            <Maximize2 size={14} strokeWidth={2.25} />
            Pratinjau
          </span>
        </button>
      ) : (
        <ImagePlaceholder label="Gambar sertifikat akan ditambahkan" ratio="4/3" />
      )}

      <div className="mt-5 flex flex-1 flex-col">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide uppercase">
          {categoryLabel && (
            <span className="border border-ink px-2 py-0.5 font-medium">{categoryLabel}</span>
          )}
          <span className="text-muted">
            {displayDate ?? <span className={dashed}>Tanggal akan ditambahkan</span>}
          </span>
        </p>

        <h3 className="mt-3 text-h3">
          {title ?? <span className={dashed}>Judul akan ditambahkan</span>}
        </h3>
        <p className="mt-1 font-semibold">
          {issuer ?? <span className={`${dashed} font-normal`}>Penerbit akan ditambahkan</span>}
        </p>

        <p className="mt-3 text-muted">
          {description ?? <span className={dashed}>Deskripsi akan ditambahkan</span>}
        </p>

        {documentUrl && (
          <a
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-none pt-4 font-semibold underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent"
          >
            Buka dokumen
            <ExternalLink aria-hidden="true" size={16} strokeWidth={2.25} />
            <span className="sr-only">(terbuka di tab baru)</span>
          </a>
        )}
      </div>
    </article>
  )
}

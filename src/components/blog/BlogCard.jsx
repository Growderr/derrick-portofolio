import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { formatDate } from '@/lib/formatDate'
import { readingLabel } from '@/lib/readingTime'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

/**
 * Article preview. The whole card is one link (the title carries it), so
 * there is a single tab stop per article.
 */
export default function BlogCard({ post, categoryLabel }) {
  const date = formatDate(post.date)

  return (
    <article className="group relative flex h-full flex-col border-t-2 border-ink pt-5">
      {post.cover?.src ? (
        <div className="aspect-[16/10] overflow-hidden border-2 border-ink bg-surface">
          <img
            src={post.cover.src}
            alt={post.cover.alt ?? ''}
            width={1600}
            height={1000}
            loading="lazy"
            className="size-full object-cover "
          />
        </div>
      ) : (
        <ImagePlaceholder label="Gambar sampul akan ditambahkan" ratio="16/10" />
      )}

      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide uppercase">
        {categoryLabel && <span className="border border-ink px-2 py-0.5 font-medium">{categoryLabel}</span>}
        <span className="text-muted">{date ?? <span className={dashed}>Tanggal akan ditambahkan</span>}</span>
        <span aria-hidden="true" className="text-muted">
          ·
        </span>
        <span className="text-muted">{readingLabel(post)}</span>
      </p>

      <h3 className="mt-3 text-h3">
        <Link
          to={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
        >
          {post.title ?? <span className={dashed}>Judul akan ditambahkan</span>}
        </Link>
      </h3>
      <p className="mt-3 text-muted">
        {post.description ?? <span className={dashed}>Deskripsi akan ditambahkan</span>}
      </p>

      <span
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold"
      >
        Baca artikel
        <ArrowUpRight
          size={18}
          strokeWidth={2.25}
          className=""
        />
      </span>
    </article>
  )
}

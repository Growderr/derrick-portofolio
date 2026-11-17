import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { formatDate } from '@/lib/formatDate'
import { readingLabel } from '@/lib/readingTime'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

/** Turns `backtick` spans into inline code. */
function Inline({ text = '' }) {
  return text.split('`').map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))
}

/** Renders one content block (see the shape list in src/data/blog.js). */
function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="mt-14 text-h2 first:mt-0"><Inline text={block.text} /></h2>
    case 'subheading':
      return <h3 className="mt-10 text-h3"><Inline text={block.text} /></h3>
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className={`space-y-2 pl-6 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
          {(block.items ?? []).map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'quote':
      return (
        <blockquote className="border-l-4 border-ink bg-accent py-4 pr-5 pl-6 text-on-accent">
          <p className="text-lead font-semibold"><Inline text={block.text} /></p>
          {block.cite && <footer className="mt-2 text-sm">{block.cite}</footer>}
        </blockquote>
      )
    case 'code':
      return (
        <figure>
          <pre
            tabIndex={0}
            className="overflow-x-auto border-2 border-ink bg-surface p-4 text-sm leading-relaxed"
          >
            <code>{block.code}</code>
          </pre>
          {block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      )
    case 'image':
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt ?? ''}
            loading="lazy"
            className="w-full border-2 border-ink"
          />
          {block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      )
    default:
      return (
        <p>
          <Inline text={block.text} />
        </p>
      )
  }
}

function Neighbour({ post, direction }) {
  if (!post) return <span />
  const next = direction === 'next'
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 border-2 border-ink p-5 transition-colors duration-150 hover:bg-accent hover:text-on-accent ${next ? 'sm:text-right sm:items-end' : ''}`}
    >
      <span className="inline-flex items-center gap-2 text-sm font-semibold">
        {!next && <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.25} />}
        {next ? 'Artikel lebih baru' : 'Artikel lebih lama'}
        {next && <ArrowRight aria-hidden="true" size={16} strokeWidth={2.25} />}
      </span>
      <span className="text-h3">{post.title}</span>
    </Link>
  )
}

/**
 * Full article: header, cover and structured body.
 *  post           entry from src/data/blog.js
 *  categoryLabel  display name of its category
 *  older, newer   neighbouring posts for the footer links (optional)
 */
export default function BlogArticle({ post, categoryLabel, older, newer }) {
  const date = formatDate(post.date)
  const blocks = post.content ?? []

  return (
    <article aria-labelledby="article-title" className="py-12 lg:py-20">
      <Container>
        <Link
          to="/blog"
          className="inline-flex min-h-11 items-center gap-2 rounded-none font-semibold underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent"
        >
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.25} />
          Semua artikel
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {categoryLabel && <span className="border border-ink px-2 py-0.5 font-semibold">{categoryLabel}</span>}
            <span className="text-muted">{date ?? <span className={dashed}>Tanggal akan ditambahkan</span>}</span>
            <span aria-hidden="true" className="text-muted">
              ·
            </span>
            <span className="text-muted">{readingLabel(post)}</span>
          </p>
          <h1 id="article-title" className="mt-5 text-h1">
            {post.title}
          </h1>
          {post.description && <p className="mt-6 max-w-2xl text-lead text-muted">{post.description}</p>}
        </header>

        <div className="mt-12 max-w-5xl">
          {post.cover?.src ? (
            <img
              src={post.cover.src}
              alt={post.cover.alt ?? ''}
              width={1600}
              height={1000}
              className="aspect-[16/10] w-full border-2 border-ink object-cover"
            />
          ) : (
            <ImagePlaceholder label="Gambar sampul akan ditambahkan" ratio="16/10" />
          )}
        </div>

        <div className="mt-12 max-w-[42rem] space-y-6 text-lg leading-8 [&_code]:bg-surface [&_code]:px-1 [&_pre_code]:bg-transparent [&_pre_code]:px-0">
          {blocks.length > 0 ? (
            blocks.map((block, index) => <Block key={index} block={block} />)
          ) : (
            <p>
              <span className={dashed}>Isi artikel akan ditambahkan</span>
            </p>
          )}
        </div>

        {(older || newer) && (
          <nav aria-label="Artikel lainnya" className="mt-20 grid max-w-5xl gap-4 border-t-2 border-ink pt-10 sm:grid-cols-2">
            <Neighbour post={older} direction="older" />
            <Neighbour post={newer} direction="next" />
          </nav>
        )}
      </Container>
    </article>
  )
}

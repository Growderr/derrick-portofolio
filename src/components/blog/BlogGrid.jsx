import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'
import BlogCard from '@/components/blog/BlogCard'
import BlogFilter from '@/components/blog/BlogFilter'
import EmptyState from '@/components/ui/EmptyState'
import LoadMore from '@/components/ui/LoadMore'
import { usePaged } from '@/hooks/usePaged'
import { byDateDesc } from '@/lib/formatDate'
import { EASE_OUT } from '@/lib/motion'

const ALL = 'all'
const PAGE_SIZE = 9
const fields = ['Judul', 'Gambar sampul', 'Tanggal terbit', 'Kategori', 'Deskripsi singkat', 'Waktu baca']

/**
 * Filterable article grid, newest first. The selected category lives in the
 * URL (?category=learning) so a filtered view can be linked to.
 */
export default function BlogGrid({ posts, categories }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sorted = useMemo(() => [...posts].sort((a, b) => byDateDesc(a.date, b.date)), [posts])

  const options = useMemo(() => {
    const used = categories
      .map((category) => ({
        ...category,
        count: sorted.filter((post) => post.category === category.id).length,
      }))
      .filter((category) => category.count > 0)
    return [{ id: ALL, label: 'Semua', count: sorted.length }, ...used]
  }, [categories, sorted])

  const requested = searchParams.get('category')
  const active = options.some((option) => option.id === requested) ? requested : ALL
  const visible = active === ALL ? sorted : sorted.filter((post) => post.category === active)
  const { shown, hasMore, remaining, loadMore } = usePaged(visible, PAGE_SIZE, active)
  const labelFor = (id) => categories.find((category) => category.id === id)?.label

  function selectCategory(id) {
    const next = new URLSearchParams(searchParams)
    if (id === ALL) next.delete('category')
    else next.set('category', id)
    setSearchParams(next, { replace: true })
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={PenLine}
        title="Belum ada artikel"
        hint={
          <>
            Kelola lewat Panel Admin (<code>/admin</code>).
          </>
        }
      >
        <p>Artikel akan diterbitkan di sini setelah ditulis. Setiap artikel memuat:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
        <p className="mt-3">
          Dapat disaring berdasarkan kategori: {categories.map((category) => category.label).join(', ')}.
        </p>
      </EmptyState>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BlogFilter options={options} active={active} onChange={selectCategory} />
        <p className="text-sm text-muted" role="status">
          Menampilkan {visible.length} dari {sorted.length}
        </p>
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, position) => (
          <motion.li
            key={`${active}-${post.slug}`}
            data-no-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, delay: Math.min(position, 8) * 0.04, ease: EASE_OUT },
            }}
          >
            <BlogCard post={post} categoryLabel={labelFor(post.category)} />
          </motion.li>
        ))}
      </ul>
      <LoadMore hasMore={hasMore} remaining={remaining} onClick={loadMore} />
    </div>
  )
}

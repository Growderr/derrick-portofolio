import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import CertificateCard from '@/components/certificates/CertificateCard'
import CertificateFilter from '@/components/certificates/CertificateFilter'
import EmptyState from '@/components/ui/EmptyState'
import ImageLightbox from '@/components/ui/ImageLightbox'
import LoadMore from '@/components/ui/LoadMore'
import { usePaged } from '@/hooks/usePaged'
import { byDateDesc, formatDate } from '@/lib/formatDate'
import { EASE_OUT } from '@/lib/motion'

const ALL = 'all'
const PAGE_SIZE = 12

const fields = ['Judul', 'Penerbit atau penyelenggara', 'Tanggal terbit', 'Gambar sertifikat', 'Deskripsi singkat']

/**
 * Filterable certificate grid with an image lightbox.
 * The selected category lives in the URL (?category=course) so a filtered
 * view can be linked to and survives a refresh.
 */
export default function CertificateGallery({ certificates, categories }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const sorted = useMemo(
    () => [...certificates].sort((a, b) => byDateDesc(a.date, b.date)),
    [certificates],
  )

  // Only categories that actually have entries are offered as filters.
  const options = useMemo(() => {
    const used = categories
      .map((category) => ({
        ...category,
        count: sorted.filter((item) => item.category === category.id).length,
      }))
      .filter((category) => category.count > 0)
    return [{ id: ALL, label: 'Semua', count: sorted.length }, ...used]
  }, [categories, sorted])

  const requested = searchParams.get('category')
  const active = options.some((option) => option.id === requested) ? requested : ALL

  const visible = useMemo(
    () => (active === ALL ? sorted : sorted.filter((item) => item.category === active)),
    [active, sorted],
  )

  const { shown, hasMore, remaining, loadMore } = usePaged(visible, PAGE_SIZE, active)
  const labelFor = (id) => categories.find((category) => category.id === id)?.label
  const previewable = useMemo(() => visible.filter((item) => item.image?.src), [visible])
  const lightboxItems = useMemo(
    () =>
      previewable.map((item) => ({
        src: item.image.src,
        alt: item.image.alt ?? item.title ?? '',
        caption: [
          item.title ?? 'Sertifikat tanpa judul',
          [item.issuer, formatDate(item.date)].filter(Boolean).join(' · '),
        ]
          .filter(Boolean)
          .join(' — '),
        href: item.documentUrl,
      })),
    [previewable],
  )

  function selectCategory(id) {
    const next = new URLSearchParams(searchParams)
    if (id === ALL) next.delete('category')
    else next.set('category', id)
    setSearchParams(next, { replace: true })
  }

  if (certificates.length === 0) {
    return (
      <EmptyState
        icon={Award}
        title="Belum ada sertifikat yang dicantumkan"
        hint={
          <>
            Kelola lewat Panel Admin (<code>/admin</code>).
          </>
        }
      >
        <p>
          Sertifikat dan prestasi akan muncul di sini setelah dikonfirmasi. Setiap entri memuat:
        </p>
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
        <CertificateFilter options={options} active={active} onChange={selectCategory} />
        <p className="text-sm text-muted" role="status">
          Menampilkan {visible.length} dari {sorted.length}
        </p>
      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, position) => {
          const previewIndex = previewable.indexOf(item)
          return (
            // Keyed by filter so cards settle in again whenever the filter changes.
            <motion.li
              key={`${active}-${item.id}`}
              data-no-reveal
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: Math.min(position, 8) * 0.04, ease: EASE_OUT },
              }}
            >
              <CertificateCard
                certificate={item}
                categoryLabel={labelFor(item.category)}
                onPreview={previewIndex >= 0 ? () => setLightboxIndex(previewIndex) : undefined}
              />
            </motion.li>
          )
        })}
      </ul>
      <LoadMore hasMore={hasMore} remaining={remaining} onClick={loadMore} />

      <ImageLightbox
        images={lightboxItems}
        index={lightboxIndex}
        label="Penampil sertifikat"
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  )
}

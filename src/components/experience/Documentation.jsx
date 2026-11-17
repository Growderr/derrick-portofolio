import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

/** Documentation photos, or three labelled placeholders when none exist yet. */
export default function Documentation({ items = [] }) {
  const hasItems = items.length > 0

  return (
    <div className="mt-10">
      <h4 className="text-h3">Dokumentasi</h4>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {hasItems
          ? items.map((item) => (
              <li key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full border-2 border-ink object-cover"
                />
                {item.caption && <p className="mt-2 text-sm text-muted">{item.caption}</p>}
              </li>
            ))
          : [1, 2, 3].map((n) => (
              <li key={n}>
                <ImagePlaceholder label="Tempat foto dokumentasi" ratio="4/3" />
              </li>
            ))}
      </ul>
    </div>
  )
}

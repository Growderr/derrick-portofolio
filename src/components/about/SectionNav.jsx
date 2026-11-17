import { aboutSections } from '@/data/navigation'

/** In-page anchors. Smooth scrolling comes from base.css and honors reduced motion. */
export default function SectionNav({ sections = aboutSections }) {
  return (
    <nav aria-label="Di halaman ini" className="mt-10">
      <p className="mb-2 text-sm text-muted">Di halaman ini</p>
      <ul className="-mx-2 flex flex-wrap">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="inline-flex min-h-11 items-center rounded-none px-2 underline decoration-1 underline-offset-[6px] hover:bg-accent hover:text-on-accent"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** One resume section: title on the left, content on the right, ruled above. Keeps together when printed. */
export default function ResumeSection({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="print-avoid grid gap-x-8 gap-y-4 border-t-2 border-ink py-8 md:grid-cols-12"
    >
      <h2 id={`${id}-title`} className="text-h3 md:col-span-3">
        {title}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  )
}

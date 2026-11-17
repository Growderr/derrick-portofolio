/** One organization or committee entry. Rendered only when real data exists. */
export default function ExperienceEntry({ organization, role, period, description }) {
  return (
    <li className="grid gap-x-8 gap-y-2 border-t-2 border-ink py-6 md:grid-cols-12">
      <div className="md:col-span-4">
        <h3 className="text-h3">{organization}</h3>
        {role && <p className="text-muted">{role}</p>}
      </div>
      <div className="md:col-span-8">
        {period && <p className="text-sm text-muted">{period}</p>}
        {description && <p className="mt-1">{description}</p>}
      </div>
    </li>
  )
}

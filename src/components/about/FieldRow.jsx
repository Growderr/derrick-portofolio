const dashed = 'border-b-2 border-dashed border-ink text-muted'

/**
 * Label/value row. `value` may be a string, a list of strings, or empty.
 * Empty values render the given placeholder, clearly marked as such.
 */
export default function FieldRow({ label, value, placeholder }) {
  const isList = Array.isArray(value)
  const empty = isList ? value.length === 0 : !value

  return (
    <div className="grid gap-x-8 gap-y-1 border-t-2 border-ink py-5 md:grid-cols-12">
      <dt className="font-mono text-xs font-medium tracking-wide uppercase md:col-span-4 md:pt-1">{label}</dt>
      <dd className="md:col-span-8">
        {empty ? (
          <span className={dashed}>{placeholder}</span>
        ) : isList ? (
          <ul className="list-disc space-y-1 pl-5">
            {value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

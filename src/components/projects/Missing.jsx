/** Dashed "to be added" marker, the same convention used on Experience and About. */
export default function Missing({ children }) {
  return <span className="border-b-2 border-dashed border-ink text-muted">{children}</span>
}

/**
 * Kept as a thin wrapper so call sites do not change. The site is static by
 * design, so this renders a plain div with no scroll animation.
 */
export default function Reveal({ children, className }) {
  return <div className={className}>{children}</div>
}

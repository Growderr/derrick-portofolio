import { Link } from 'react-router-dom'
import { buttonStyles } from '@/lib/buttonStyles'

/**
 * Renders a router <Link> when `to` is given, an <a> when `href` is given,
 * and a <button> otherwise.
 *
 * variant: 'primary' | 'secondary' | 'text'
 * size:    'md' | 'sm'
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  className,
  children,
  ...rest
}) {
  const classes = buttonStyles({ variant, size, className })
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" size={18} strokeWidth={2.25} />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

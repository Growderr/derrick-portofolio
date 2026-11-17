import { Link } from 'react-router-dom'
import { useProfile } from '@/lib/content'

export default function Wordmark({ onClick }) {
  const profile = useProfile()

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${profile.name}, beranda`}
      className="flex items-center gap-3 font-display text-lg font-extrabold tracking-tight"
    >
      <span aria-hidden="true" className="block size-3.5 bg-accent outline outline-2 -outline-offset-2 outline-ink" />
      <span aria-hidden="true" className="hidden sm:inline">
        {profile.name}
      </span>
      <span aria-hidden="true" className="sm:hidden">
        {profile.firstName} Rahman
      </span>
    </Link>
  )
}

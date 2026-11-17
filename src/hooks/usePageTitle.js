import { useEffect } from 'react'
import { useProfile } from '@/lib/content'

/** Sets document.title. Pass nothing for the home page default. */
export function usePageTitle(title) {
  const profile = useProfile()

  useEffect(() => {
    document.title = title
      ? `${title} | ${profile.name}`
      : `${profile.name} | ${profile.role}`
  }, [title, profile.name, profile.role])
}

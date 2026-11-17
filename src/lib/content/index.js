import { useMemo } from 'react'
import { buildContactLinks } from '@/data/contact'
import { buildFeaturedProjects } from '@/data/home'
import { buildResume } from '@/data/resume'
import { resources } from '@/lib/content/resources'
import { useResource } from '@/lib/content/store'

export { resources }
export { invalidateContent, useResource } from '@/lib/content/store'

/** Each hook returns data in the same shape the old src/data files exported. */
export const useProfile = () => useResource(resources.profile).data
export const useEducation = () => useResource(resources.education).data
/** { skillCategories, softSkills } */
export const useSkills = () => useResource(resources.skills).data
/** { plk, organizations, competitions } */
export const useExperiences = () => useResource(resources.experiences).data
export const useProjects = () => useResource(resources.projects).data
export const useCertificates = () => useResource(resources.certificates).data
export const useTestimonials = () => useResource(resources.testimonials).data
export const useBlogPosts = () => useResource(resources.blog).data

export function useContactLinks() {
  const profile = useProfile()
  return useMemo(
    () =>
      buildContactLinks({
        email: profile.email,
        github: profile.github,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
      }),
    [profile],
  )
}

export function useFeaturedProjects() {
  const projects = useProjects()
  return useMemo(() => buildFeaturedProjects(projects), [projects])
}

/** The CV, assembled from the other resources so it never drifts from the rest of the site. */
export function useResume() {
  const profile = useProfile()
  const education = useEducation()
  const { skillCategories, softSkills } = useSkills()
  const experiences = useExperiences()
  const projects = useProjects()
  const contactLinks = useContactLinks()

  return useMemo(
    () => buildResume({ profile, education, skillCategories, softSkills, experiences, projects, contactLinks }),
    [profile, education, skillCategories, softSkills, experiences, projects, contactLinks],
  )
}

import { supabase } from '@/lib/supabase'
import { defineResource } from '@/lib/content/store'
import {
  defaultProfile,
  mapBlogPosts,
  mapCertificates,
  mapEducation,
  mapExperiences,
  mapProfile,
  mapProjects,
  mapSkills,
  mapTestimonials,
} from '@/lib/content/mappers'
import { education as localEducation } from '@/data/education'
import { plk, organizations, competitions } from '@/data/experiences'
import { skillCategories } from '@/data/skills'
import { softSkills } from '@/data/softSkills'
import { projects as localProjects } from '@/data/projects'
import { certificates as localCertificates } from '@/data/certificates'
import { testimonials as localTestimonials } from '@/data/testimonials'
import { blogPosts as localBlogPosts } from '@/data/blog'

/** Public lists are capped; the pages page through them on the client. */
const MAX_ROWS = 500

/** Published rows only. The explicit filter also hides drafts from a signed-in admin on the public site. */
async function selectPublished(table, orderBy) {
  let query = supabase.from(table).select('*').eq('is_published', true)
  orderBy.forEach(([column, ascending]) => {
    query = query.order(column, { ascending, nullsFirst: false })
  })
  const { data, error } = await query.range(0, MAX_ROWS - 1)
  if (error) throw error
  return data ?? []
}

const byOrder = [['sort_order', true], ['created_at', true]]

export const resources = {
  profile: defineResource(
    'profile',
    async () => {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle()
      if (error) throw error
      return mapProfile(data)
    },
    defaultProfile,
  ),
  education: defineResource(
    'education',
    async () => mapEducation(await selectPublished('education', byOrder)),
    () => localEducation,
  ),
  skills: defineResource(
    'skills',
    async () => mapSkills(await selectPublished('skills', byOrder)),
    () => ({ skillCategories, softSkills }),
  ),
  experiences: defineResource(
    'experiences',
    async () => mapExperiences(await selectPublished('experiences', byOrder)),
    () => ({ plk, organizations, competitions }),
  ),
  projects: defineResource(
    'projects',
    async () => mapProjects(await selectPublished('projects', byOrder)),
    () => localProjects,
  ),
  certificates: defineResource(
    'certificates',
    async () => mapCertificates(await selectPublished('certificates', [['issued_on', false], ['created_at', false]])),
    () => localCertificates,
  ),
  testimonials: defineResource(
    'testimonials',
    async () => mapTestimonials(await selectPublished('testimonials', byOrder)),
    () => localTestimonials,
  ),
  blog: defineResource(
    'blog',
    async () => mapBlogPosts(await selectPublished('blog_posts', [['published_on', false], ['created_at', false]])),
    () => localBlogPosts,
  ),
}

import { profile as localProfile } from '@/data/profile'
import { biography, careerGoals, careerStatement, interests } from '@/data/about'
import { introParagraphs, introStatement } from '@/data/home'
import { learningInterests, skillCategoryDefs } from '@/data/skills'

/**
 * Database rows (snake_case) to the shapes the pages already use (camelCase,
 * identical to the old src/data files). Pages therefore did not need new markup.
 */

const text = (value) => (value === undefined || value === '' ? null : value)
const list = (value) => (Array.isArray(value) ? value : [])
const image = (value) => (value?.src ? { src: value.src, alt: value.alt ?? '' } : null)
const gallery = (value) =>
  list(value)
    .filter((item) => item?.src)
    .map((item) => ({ src: item.src, alt: item.alt ?? '', caption: text(item.caption) }))

/** Empty profile: the project's own facts, nothing invented. */
export function defaultProfile() {
  return {
    ...localProfile,
    avatar: null,
    cvUrl: null,
    github: { url: null, handle: null },
    instagram: { url: null, handle: null },
    linkedin: { url: null, handle: null },
    introStatement,
    introParagraphs,
    biography,
    interests,
    careerStatement,
    careerGoals,
    learningInterests,
  }
}

export function mapProfile(row) {
  const base = defaultProfile()
  if (!row) return base
  const pick = (value, fallback) => (value === null || value === undefined || value === '' ? fallback : value)

  return {
    name: pick(row.name, base.name),
    firstName: pick(row.first_name, base.firstName),
    role: pick(row.role, base.role),
    school: pick(row.school, base.school),
    className: pick(row.class_name, base.className),
    competency: pick(row.competency, base.competency),
    competencyShort: pick(row.competency_short, base.competencyShort),
    location: pick(row.location, base.location),
    headline: list(row.headline).length > 0 ? row.headline : base.headline,
    brand: pick(row.brand, base.brand),
    intro: pick(row.intro, base.intro),
    email: text(row.email),
    avatar: image(row.avatar),
    cvUrl: text(row.cv_url),
    github: { url: text(row.github_url), handle: text(row.github_handle) },
    instagram: { url: text(row.instagram_url), handle: text(row.instagram_handle) },
    linkedin: { url: text(row.linkedin_url), handle: text(row.linkedin_handle) },
    introStatement: pick(row.intro_statement, base.introStatement),
    introParagraphs: list(row.intro_paragraphs),
    biography: list(row.biography),
    interests: list(row.interests),
    careerStatement: pick(row.career_statement, base.careerStatement),
    careerGoals: list(row.career_goals),
    learningInterests: list(row.learning_interests),
  }
}

export function mapEducation(rows) {
  return rows.map((row) => ({
    id: row.slug,
    current: row.current,
    school: text(row.school),
    lines: list(row.lines),
    period: text(row.period),
    description: text(row.description),
    tags: list(row.tags),
  }))
}

export function mapSkills(rows) {
  const hard = rows.filter((row) => row.kind === 'hard')
  return {
    skillCategories: skillCategoryDefs
      .map((category) => ({
        ...category,
        items: hard
          .filter((row) => row.category === category.id)
          .map((row) => ({ name: row.name, value: row.value, icon: row.icon })),
      }))
      .filter((category) => category.items.length > 0),
    softSkills: rows
      .filter((row) => row.kind === 'soft')
      .map((row) => ({ name: row.name, value: row.value, description: text(row.description) ?? '' })),
  }
}

export function emptyPlk() {
  return {
    institution: null,
    position: null,
    duration: null,
    description: null,
    responsibilities: [],
    activities: [],
    technologies: [],
    tags: [],
    documentation: [],
  }
}

export function mapExperiences(rows) {
  const plkRow = rows.find((row) => row.type === 'plk')

  return {
    plk: plkRow
      ? {
          institution: text(plkRow.title),
          position: text(plkRow.role),
          duration: text(plkRow.period),
          description: text(plkRow.description),
          responsibilities: list(plkRow.responsibilities),
          activities: list(plkRow.activities),
          technologies: list(plkRow.technologies),
          tags: list(plkRow.tags),
          documentation: gallery(plkRow.documentation),
        }
      : emptyPlk(),
    organizations: rows
      .filter((row) => row.type === 'organization')
      .map((row) => ({
        organization: row.title,
        role: text(row.role),
        period: text(row.period),
        description: text(row.description),
        responsibilities: list(row.responsibilities),
        tags: list(row.tags),
        documentation: gallery(row.documentation),
      })),
    competitions: rows
      .filter((row) => row.type === 'competition')
      .map((row) => ({
        name: row.title,
        organizer: text(row.organizer),
        date: text(row.period),
        category: text(row.category),
        result: text(row.result),
        description: text(row.description),
        tags: list(row.tags),
        documentation: gallery(row.documentation),
      })),
  }
}

export function mapProjects(rows) {
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    year: text(row.year),
    status: text(row.progress_status),
    featured: Boolean(row.featured),
    thumbnail: image(row.thumbnail),
    tech: list(row.tech),
    overview: text(row.overview),
    objectives: list(row.objectives),
    problem: text(row.problem),
    solution: text(row.solution),
    features: list(row.features),
    role: text(row.role),
    contributions: list(row.contributions),
    documentation: list(row.documentation).filter((item) => item?.title || item?.body),
    docsUrl: text(row.docs_url),
    screenshots: gallery(row.screenshots),
    demoUrl: text(row.demo_url),
    githubUrl: text(row.github_url),
    feedback: list(row.feedback),
    related: list(row.related),
  }))
}

export function mapCertificates(rows) {
  return rows.map((row) => ({
    id: row.slug,
    title: row.title,
    issuer: text(row.issuer),
    date: text(row.issued_on),
    category: row.category,
    description: text(row.description),
    image: image(row.image),
    documentUrl: text(row.document_url),
  }))
}

export function mapTestimonials(rows) {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    role: text(row.role),
    organization: text(row.organization),
    message: row.message,
    avatar: row.avatar?.src ?? null,
    category: row.category,
  }))
}

export function mapBlogPosts(rows) {
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    date: text(row.published_on),
    readingTime: row.reading_time ?? null,
    cover: image(row.cover),
    content: list(row.content),
  }))
}

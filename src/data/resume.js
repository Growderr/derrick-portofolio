import { profile } from './profile'
import { education } from './education'
import { skillCategories } from './skills'
import { softSkills } from './softSkills'
import { plk, organizations, competitions } from './experiences'
import { projects } from './projects'
import { contactLinks } from './contact'

/**
 * Digital CV content for /resume.
 *
 * This file only assembles data that already lives elsewhere, so the resume
 * never drifts from the rest of the site. Edit the source files:
 *   profile.js, education.js, skills.js, softSkills.js, experiences.js,
 *   projects.js, contact.js
 * Missing values (null or []) render as dashed placeholders.
 */

export const resumeMeta = {
  /** Name the browser suggests when saving the CV. */
  fileName: 'Derrick-Adilla-Rahman-CV.pdf',
  /**
   * Path of a finished PDF, e.g. '/cv/Derrick-Adilla-Rahman-CV.pdf' (put the
   * file in public/cv/). While null, "Download CV" opens the print dialog,
   * where "Save as PDF" produces the file from the print layout.
   */
  pdfUrl: null,
}

export function buildResume({ profile, education, skillCategories, softSkills, experiences, projects, contactLinks }) {
  const { plk, organizations, competitions } = experiences
  return {
    name: profile.name,
    role: profile.role,
    summary: profile.brand,

    personalInfo: [
      { label: 'Lokasi', value: profile.location, placeholder: 'Lokasi akan ditambahkan' },
      { label: 'Sekolah', value: profile.school, placeholder: 'Sekolah akan ditambahkan' },
      { label: 'Kelas', value: profile.className, placeholder: 'Kelas akan ditambahkan' },
      { label: 'Kompetensi', value: profile.competency, placeholder: 'Kompetensi akan ditambahkan' },
    ],

    education,

    skills: [
      ...skillCategories.map(({ id, title, items }) => ({
        id,
        title,
        items: items.map((item) => item.name),
      })),
      { id: 'soft', title: 'Soft skill', items: softSkills.map((skill) => skill.name) },
    ],

    experience: {
      plk,
      organizations,
      competitions,
    },

    projects: projects.map(({ slug, title, description, year, tech, role }) => ({
      slug,
      title,
      description,
      year: year ?? null,
      tech: tech ?? [],
      role: role ?? null,
    })),

    contact: contactLinks,
  }
}

/** Local fallback (used when Supabase is not configured). */
export const resume = buildResume({
  profile,
  education,
  skillCategories,
  softSkills,
  experiences: { plk, organizations, competitions },
  projects,
  contactLinks,
})

/**
 * Experience content. Used by /experience and (plk, organizations) by /about.
 * Anything set to null or [] renders as a labelled placeholder or empty state.
 * Do not add dates, roles, or achievements that have not been confirmed.
 */

/** Praktik Lapangan Kerja. Only the institution and the activity are confirmed. */
export const plk = {
  institution: 'Kantor Kecamatan Anjir Muara',
  position: null, // e.g. 'Web Developer Intern'
  duration: null, // e.g. 'July to October 2026'
  description:
    'Praktik Lapangan Kerja (PLK) di Kantor Kecamatan Anjir Muara, dengan fokus pada pengembangan website.',
  responsibilities: [], // array of strings
  activities: ['Pengembangan website'],
  technologies: [], // array of strings, e.g. ['React', 'Tailwind CSS']
  tags: ['PLK', 'Pengembangan website'],
  documentation: [], // array of { src, alt, caption }
}

/**
 * Organizations and committees. Empty on purpose. Shape of one entry:
 *   { organization, role, period, description, responsibilities: [], documentation: [] }
 */
export const organizations = []

/**
 * Competitions. Empty on purpose. Shape of one entry:
 *   { name, organizer, date, category, result, description, documentation: [] }
 */
export const competitions = []

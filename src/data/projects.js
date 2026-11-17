/**
 * Project data. EDIT THIS FILE to change anything on /projects and /projects/:slug.
 *
 * `projects` is empty on purpose: no project is shown until a real one is added.
 * With an empty list the gallery shows a clearly labelled empty state and every
 * /projects/:slug address shows "Project not found". Nothing here is invented.
 *
 * Every field except `slug`, `title`, `description` and `category` is optional.
 * A missing field renders as a dashed "to be added" placeholder on the detail page.
 *
 * Shape of one entry (copy it into `projects`):
 *
 *   {
 *     slug: 'my-project',                 // address: /projects/my-project (lowercase, hyphens)
 *     title: 'Project title',
 *     description: 'One or two sentences for the gallery card.',
 *     category: 'web-app',                // an `id` from projectCategories below
 *     year: '2026',
 *     status: 'Completed',                // free text: 'Completed', 'In progress', ...
 *     featured: true,                     // true = also shown in "Selected projects" on Home
 *
 *     thumbnail: { src: '/images/projects/my-project/cover.jpg', alt: 'Describe the image' },
 *     tech: ['React', 'Tailwind CSS'],
 *
 *     overview: 'Paragraph one.\n\nParagraph two (a blank line starts a new paragraph).',
 *     objectives: ['What the project set out to do'],
 *     problem: 'The problem this project addresses.',
 *     solution: 'How the project solves it.',
 *     features: ['Feature one', 'Feature two'],
 *
 *     role: 'Your role, for example Frontend developer',
 *     contributions: ['What you personally built or decided'],
 *
 *     documentation: [                    // development notes: process, decisions, lessons
 *       { title: 'Planning', body: 'Text. A blank line starts a new paragraph.' },
 *     ],
 *     docsUrl: 'https://...',             // optional link to fuller documentation
 *
 *     screenshots: [                      // opens in the lightbox
 *       { src: '/images/projects/my-project/home.jpg', alt: 'Describe the screenshot', caption: 'Optional' },
 *     ],
 *     demoUrl: 'https://...',             // null = "Live Demo" shown as unavailable
 *     githubUrl: 'https://github.com/...',// null = "GitHub" shown as unavailable
 *
 *     feedback: [                         // REAL feedback only, never written for the person
 *       { quote: 'What they said', name: 'Who said it', role: 'Their role or relation' },
 *     ],
 *     related: ['another-slug'],          // optional; otherwise picked by category and stack
 *   }
 *
 * Images: put files in public/images/projects/<slug>/ and reference them as
 * '/images/projects/<slug>/file.jpg'. Thumbnails work best at 16:10.
 */

/**
 * Category list: the filter order and labels. Only categories that at least one
 * project uses appear as filters. Add or rename freely.
 */
export const projectCategories = [
  { id: 'web-app', label: 'Aplikasi Web' },
  { id: 'website', label: 'Website' },
  { id: 'ui-ux', label: 'Desain UI/UX' },
  { id: 'mobile', label: 'Aplikasi Mobile' },
  { id: 'game', label: 'Gim' },
  { id: 'other', label: 'Lainnya' },
]

export const projects = []

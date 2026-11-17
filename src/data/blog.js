/**
 * Developer blog, shown on /blog and /blog/:slug.
 *
 * Empty on purpose: only real articles belong here. Until one is added the
 * page shows an empty state. Shape of one article:
 *
 *   {
 *     slug: 'my-first-post',            // the URL: /blog/my-first-post
 *     title: 'Article title',
 *     description: 'One or two sentences shown on the card.',
 *     category: 'learning',             // an id from blogCategories below
 *     date: '2026-11-11',               // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'
 *     readingTime: null,                // minutes; null calculates it from the content
 *     cover: { src: '/images/blog/my-first-post.jpg', alt: 'Describe the image' }, // or null
 *     content: [ ...blocks ],
 *   }
 *
 * Content blocks, rendered in order:
 *   { type: 'paragraph', text: '...' }
 *   { type: 'heading',   text: '...' }
 *   { type: 'subheading',text: '...' }
 *   { type: 'list',      items: ['...'], ordered: false }
 *   { type: 'quote',     text: '...', cite: 'optional source' }
 *   { type: 'code',      code: '...', language: 'js', caption: 'optional' }
 *   { type: 'image',     src: '/images/blog/x.jpg', alt: '...', caption: 'optional' }
 *
 * Put cover and inline images in public/images/blog/.
 */

/** Filter categories. Only categories that have articles appear in the filter. */
export const blogCategories = [
  { id: 'learning', label: 'Pembelajaran' },
  { id: 'tutorial', label: 'Tutorial' },
  { id: 'project', label: 'Catatan proyek' },
  { id: 'notes', label: 'Catatan pengembangan' },
]

export const blogPosts = []

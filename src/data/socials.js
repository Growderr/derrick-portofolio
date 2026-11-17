import { contactLinks } from './contact'

/**
 * Footer social links. The source of truth is src/data/contact.js; this file
 * only keeps the footer's order (GitHub, LinkedIn, Instagram, Email).
 * `url: null` renders as an unlinked placeholder.
 */
const order = ['github', 'linkedin', 'instagram', 'email']

export const socials = order.map((id) => contactLinks.find((link) => link.id === id))

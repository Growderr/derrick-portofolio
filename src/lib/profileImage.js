/*
 * Profile photo, loaded from disk when present.
 *
 * Add a file named profile.jpg (or .jpeg / .png / .webp) to
 * src/assets/images/ and the placeholder is replaced automatically.
 */
const images = import.meta.glob('../assets/images/profile.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const profileImageUrl = Object.values(images)[0] ?? null

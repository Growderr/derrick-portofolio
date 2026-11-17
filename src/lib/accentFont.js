/*
 * Tempting: decorative accent font, loaded from disk when present.
 *
 * To enable it, drop the licensed font file into src/assets/fonts/ with
 * "tempting" in the file name (woff2 preferred), for example:
 *
 *   src/assets/fonts/Tempting.woff2
 *
 * It is picked up automatically at build time. Until then, the `font-accent`
 * utility falls back to the script stack defined in styles/tokens.css, and no
 * failing network request is made.
 */
const fontFiles = import.meta.glob('../assets/fonts/*.{woff2,woff,ttf,otf}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function loadAccentFont() {
  if (typeof FontFace === 'undefined') return

  const match = Object.entries(fontFiles).find(([path]) => /tempting/i.test(path))
  if (!match) return

  const face = new FontFace('Tempting', `url(${match[1]})`, { display: 'swap' })
  face
    .load()
    .then((loaded) => document.fonts.add(loaded))
    .catch(() => {
      /* Fallback script stack stays in use. */
    })
}

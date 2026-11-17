function blockText(block) {
  switch (block.type) {
    case 'list':
      return (block.items ?? []).join(' ')
    case 'code':
    case 'image':
      return '' // code and images are skimmed, not read word by word
    default:
      return block.text ?? ''
  }
}

/** Minutes to read an article: the stated value, or ~200 words a minute (at least 1). */
export function readingMinutes(post) {
  if (typeof post.readingTime === 'number' && post.readingTime > 0) return Math.round(post.readingTime)
  const text = [post.description ?? '', ...(post.content ?? []).map(blockText)].join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function readingLabel(post) {
  return `${readingMinutes(post)} menit baca`
}

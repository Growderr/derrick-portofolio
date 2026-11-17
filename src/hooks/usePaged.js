import { useState } from 'react'

/**
 * Client-side "load more" paging. `resetKey` (for example the active filter)
 * sends the list back to the first page when it changes.
 */
export function usePaged(items, pageSize, resetKey = '') {
  const [state, setState] = useState({ key: resetKey, pages: 1 })
  const pages = state.key === resetKey ? state.pages : 1
  const shown = items.slice(0, pages * pageSize)

  return {
    shown,
    hasMore: shown.length < items.length,
    remaining: items.length - shown.length,
    loadMore: () => setState({ key: resetKey, pages: pages + 1 }),
  }
}

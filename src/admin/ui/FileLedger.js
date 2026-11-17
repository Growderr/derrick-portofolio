import { createContext, useContext } from 'react'
import { removeFiles } from '@/admin/lib/storage'

/**
 * Keeps storage tidy without ever deleting a file the saved record still uses.
 *
 *  - Files uploaded while a form is open are remembered. If the form is closed
 *    without saving they are deleted again.
 *  - Files a person removes or replaces are NOT deleted straight away (the old
 *    record still points at them). They are deleted only after a successful save.
 */
export function createLedger() {
  const uploaded = []
  const removed = []

  return {
    noteUpload(bucket, url) {
      uploaded.push({ bucket, url })
    },
    noteRemoval(bucket, url) {
      if (url) removed.push({ bucket, url })
    },
    /** After a successful save: `kept` is the Set of URLs the saved record references. */
    async finalize(kept) {
      const stale = [...removed, ...uploaded].filter((item) => !kept.has(item.url))
      uploaded.length = 0
      removed.length = 0
      await removeFiles(stale)
    },
    /** Form closed without saving: drop what was uploaded during this session. */
    async discard() {
      const stale = uploaded.splice(0)
      removed.length = 0
      await removeFiles(stale)
    },
  }
}

export const LedgerContext = createContext(null)
export const useLedger = () => useContext(LedgerContext)

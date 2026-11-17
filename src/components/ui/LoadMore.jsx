import Button from '@/components/ui/Button'

/** "Load more" button under a paged list. Renders nothing when everything is shown. */
export default function LoadMore({ hasMore, remaining, onClick }) {
  if (!hasMore) return null
  return (
    <div className="mt-14 flex justify-center">
      <Button variant="secondary" onClick={onClick}>
        Muat lebih banyak ({remaining} lagi)
      </Button>
    </div>
  )
}

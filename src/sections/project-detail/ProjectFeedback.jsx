import { MessageSquareQuote } from 'lucide-react'
import AboutSection from '@/components/about/AboutSection'
import EmptyState from '@/components/ui/EmptyState'

/** Real feedback only. Nothing is ever written on someone's behalf. */
export default function ProjectFeedback({ project }) {
  const feedback = project.feedback ?? []

  return (
    <AboutSection id="feedback" title="Masukan pengguna" description="Tanggapan dari orang-orang yang menggunakan atau meninjaunya.">
      {feedback.length > 0 ? (
        <ul className="grid gap-8 md:grid-cols-2">
          {feedback.map((item) => (
            <li key={`${item.name}-${item.quote}`}>
              <figure className="h-full border-t-2 border-ink pt-5">
                <blockquote className="text-lead">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  {item.role && <span className="text-muted">, {item.role}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState icon={MessageSquareQuote} title="Belum ada masukan.">
          <p>
            Masukan akan muncul di sini setelah pengguna atau peninjau yang sebenarnya memberikannya.
            Masukan tidak pernah ditulis atas nama siapa pun.
          </p>
        </EmptyState>
      )}
    </AboutSection>
  )
}

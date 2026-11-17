import { ExternalLink } from 'lucide-react'
import AboutSection from '@/components/about/AboutSection'
import Button from '@/components/ui/Button'
import Missing from '@/components/projects/Missing'
import { isHttpUrl, toParagraphs } from '@/lib/projects'

export default function DevDocumentation({ project }) {
  const notes = project.documentation ?? []

  return (
    <AboutSection id="documentation" title="Dokumentasi pengembangan" description="Catatan tentang bagaimana proyek direncanakan, dibangun, dan apa saja yang berubah selama pengerjaan.">
      {notes.length > 0 ? (
        <div className="border-b-2 border-ink">
          {notes.map((note) => (
            <article key={note.title} className="grid gap-x-8 gap-y-3 border-t-2 border-ink py-6 md:grid-cols-12">
              <h3 className="font-semibold md:col-span-4">{note.title}</h3>
              <div className="max-w-2xl space-y-3 md:col-span-8">
                {toParagraphs(note.body).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>
          <Missing>Catatan pengembangan akan ditambahkan</Missing>
        </p>
      )}

      {isHttpUrl(project.docsUrl) && (
        <div className="mt-8">
          <Button href={project.docsUrl} variant="secondary" icon={ExternalLink}>
            Buka dokumentasi lengkap
          </Button>
        </div>
      )}
    </AboutSection>
  )
}

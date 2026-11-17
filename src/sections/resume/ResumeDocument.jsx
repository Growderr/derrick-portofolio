import { useEffect } from 'react'
import { Download, Printer } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import ContactLinks from '@/components/contact/ContactLinks'
import ResumeEntry from '@/components/resume/ResumeEntry'
import ResumeSection from '@/components/resume/ResumeSection'
import { resumeMeta } from '@/data/resume'
import { useProfile, useResume } from '@/lib/content'

const dashed = 'border-b-2 border-dashed border-ink text-muted'

function Empty({ children }) {
  return (
    <p>
      <span className={dashed}>{children}</span>
    </p>
  )
}

function printResume() {
  window.print()
}

/** The CV itself plus its Download and Print actions (actions are hidden when printing). */
export default function ResumeDocument() {
  const resume = useResume()
  const pdfUrl = useProfile().cvUrl ?? resumeMeta.pdfUrl
  const { plk, organizations, competitions } = resume.experience
  const hasPdf = Boolean(pdfUrl)

  // Suggest a sensible file name when the browser saves the print as PDF.
  useEffect(() => {
    let previous = null
    const before = () => {
      previous = document.title
      document.title = resumeMeta.fileName.replace(/\.pdf$/i, '')
    }
    const after = () => {
      if (previous !== null) document.title = previous
    }
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
      after()
    }
  }, [])

  return (
    <article aria-labelledby="resume-heading" className="py-12 lg:py-20 print:py-0">
      <Container>
        <header className="pb-10">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-wide uppercase">
            <span aria-hidden="true" className="block size-3 border border-ink bg-accent" />
            CV Digital
          </p>
          <h1 id="resume-heading" className="text-h1">
            {resume.name}
          </h1>
          <p className="mt-4 text-lead font-semibold">{resume.role}</p>

          <div className="no-print mt-8 flex flex-wrap items-center gap-3">
            {hasPdf ? (
              <Button href={pdfUrl} download={resumeMeta.fileName} icon={Download}>
                Unduh CV (PDF)
              </Button>
            ) : (
              <Button icon={Download} onClick={printResume}>
                Unduh CV (PDF)
              </Button>
            )}
            <Button variant="secondary" icon={Printer} onClick={printResume}>
              Cetak
            </Button>
          </div>
          {!hasPdf && (
            <p className="no-print mt-3 max-w-xl text-sm text-muted">
              Belum ada PDF siap pakai, jadi tombol Unduh akan membuka dialog cetak peramban Anda.
              Pilih “Simpan sebagai PDF” sebagai tujuan untuk mendapatkan file-nya.
            </p>
          )}
        </header>

        <ResumeSection id="profile" title="Profil">
          {resume.summary ? (
            <p className="max-w-2xl text-lead">{resume.summary}</p>
          ) : (
            <Empty>Ringkasan profil akan ditambahkan</Empty>
          )}
          <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {resume.personalInfo.map(({ label, value, placeholder }) => (
              <div key={label}>
                <dt className="font-mono text-xs tracking-wide text-muted uppercase">{label}</dt>
                <dd className="font-semibold">{value ?? <span className={`${dashed} font-normal`}>{placeholder}</span>}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection id="education" title="Pendidikan">
          {resume.education.map((item) => (
            <ResumeEntry
              key={item.id}
              title={item.school}
              titlePlaceholder="Sekolah akan ditambahkan"
              subtitle={item.lines.join(' · ') || null}
              period={item.period}
              description={item.description}
              tags={item.tags}
            />
          ))}
        </ResumeSection>

        <ResumeSection id="skills" title="Keahlian">
          <dl className="space-y-5">
            {resume.skills.map(({ id, title, items }) => (
              <div key={id}>
                <dt className="font-semibold">{title}</dt>
                <dd>
                  <ul className="mt-2 flex flex-wrap gap-2" aria-label={title}>
                    {items.map((name) => (
                      <li key={name} className="border border-ink px-2 py-1 font-mono text-xs">
                        {name}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection id="experience" title="Pengalaman">
          <ResumeEntry
            title={plk.institution}
            titlePlaceholder="Instansi akan ditambahkan"
            subtitle={
              plk.position
                ? `${plk.position} · Praktik Lapangan Kerja`
                : 'Praktik Lapangan Kerja (PLK)'
            }
            period={plk.duration}
            description={plk.description}
            bullets={plk.responsibilities.length > 0 ? plk.responsibilities : plk.activities}
            tags={plk.technologies}
          />
          {organizations.map((item) => (
            <ResumeEntry
              key={`${item.organization}-${item.period}`}
              title={item.organization}
              subtitle={item.role}
              period={item.period}
              description={item.description}
              bullets={item.responsibilities ?? []}
            />
          ))}
          {competitions.map((item) => (
            <ResumeEntry
              key={`${item.name}-${item.date}`}
              title={item.name}
              subtitle={[item.organizer, item.result].filter(Boolean).join(' · ') || null}
              period={item.date}
              description={item.description}
            />
          ))}
          {organizations.length === 0 && competitions.length === 0 && (
            <p className="mt-6 text-sm">
              <span className={dashed}>Organisasi dan lomba akan ditambahkan</span>
            </p>
          )}
        </ResumeSection>

        <ResumeSection id="projects" title="Proyek">
          {resume.projects.length > 0 ? (
            resume.projects.map((project) => (
              <ResumeEntry
                key={project.slug}
                title={project.title}
                description={project.description}
                subtitle={project.role}
                period={project.year}
                periodPlaceholder="Tahun akan ditambahkan"
                tags={project.tech ?? []}
              />
            ))
          ) : (
            <Empty>Proyek akan ditambahkan</Empty>
          )}
        </ResumeSection>

        <ResumeSection id="contact" title="Kontak">
          <ContactLinks links={resume.contact} variant="compact" />
        </ResumeSection>
      </Container>
    </article>
  )
}

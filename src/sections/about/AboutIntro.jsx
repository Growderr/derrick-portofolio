import Container from '@/components/layout/Container'
import ProfilePhoto from '@/components/ui/ProfilePhoto'
import SectionNav from '@/components/about/SectionNav'
import { useProfile } from '@/lib/content'

export default function AboutIntro() {
  const profile = useProfile()
  const facts = [
    { label: 'Nama lengkap', value: profile.name },
    { label: 'Sekolah', value: profile.school },
    { label: 'Kelas', value: profile.className },
    { label: 'Kompetensi', value: `${profile.competency} (${profile.competencyShort})` },
    { label: 'Lokasi', value: profile.location },
  ]

  return (
    <section aria-labelledby="about-heading" className="border-b-2 border-ink">
      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
        <div className="lg:col-span-7">
          <h1 id="about-heading" className="text-h1">
            Tentang Saya
          </h1>
          <p className="mt-6 max-w-xl text-lead">{profile.brand}</p>

          <dl className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`border-l-2 border-ink pl-4 ${index === 3 ? 'sm:col-span-2' : ''}`}
              >
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <SectionNav />
        </div>

        {/* Yellow block offset behind the photo */}
        <div className="relative mx-auto w-full max-w-sm pr-3 pb-3 lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div aria-hidden="true" className="absolute top-3 right-0 bottom-0 left-3 bg-accent" />
          <ProfilePhoto className="relative" />
        </div>
      </Container>
    </section>
  )
}

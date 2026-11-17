import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import ProfilePhoto from '@/components/ui/ProfilePhoto'
import { heroActions } from '@/data/navigation'
import { useProfile } from '@/lib/content'

// Stagger carried over from Phase 01: each line steps right, the last one returns.
const indents = ['0em', '0.35em', '0.7em', '0em']

/**
 * Asymmetric hero. The headline takes the left two thirds; on desktop the
 * photo column sits on a yellow panel that starts half a gutter before the
 * column and runs to the right edge of the viewport. On mobile the panel
 * becomes a full-width band beneath the copy.
 */
export default function Hero() {
  const profile = useProfile()
  const facts = [
    { label: 'Lokasi', value: profile.location },
    { label: 'Sekolah', value: profile.school },
    { label: 'Kelas', value: profile.className },
  ]

  return (
    <section aria-labelledby="hero-headline" className="relative overflow-hidden border-b-2 border-ink">
      <Container className="relative grid pt-10 lg:grid-cols-12 lg:gap-x-8 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-8">
          <p className="mb-8 lg:mb-12">
            <span className="text-h3">{profile.name}</span>
            <span className="mt-1 block font-mono text-xs tracking-wide text-muted uppercase">{profile.role}</span>
          </p>

          <h1 id="hero-headline" className="text-hero">
            {profile.headline.map((line, index) => (
              <span
                key={line}
                className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
                style={{ marginLeft: indents[index] }}
              >
                <span className="block">{line}</span>
                {/* Real whitespace so assistive tech reads one full sentence */}
                <span className="sr-only"> </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid gap-8 border-t-2 border-ink pt-6 md:grid-cols-5 lg:mt-14">
            <dl className="space-y-4 md:col-span-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-l-2 border-ink pl-4">
                  <dt className="font-mono text-xs tracking-wide text-muted uppercase">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="md:col-span-3">
              <p className="max-w-md text-lead">{profile.intro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                {heroActions.map(({ label, to, variant }) => (
                  <Button key={to} to={to} variant={variant}>
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo: yellow band on mobile, sits on the yellow panel on desktop */}
        <div className="-mx-5 mt-12 bg-accent px-5 pt-10 pb-16 sm:-mx-8 sm:px-8 lg:relative lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mx-0 lg:mt-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-0 lg:before:absolute lg:before:-top-16 lg:before:-bottom-20 lg:before:-left-4 lg:before:right-[-100vw] lg:before:bg-accent">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <ProfilePhoto />
            <span
              aria-hidden="true"
              className="absolute -bottom-10 left-0 font-accent text-6xl leading-none italic sm:text-7xl"
            >
              {profile.firstName}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import ProfilePhoto from '@/components/ui/ProfilePhoto'
import { introPlaceholder, profile } from '@/data/profile'
import { EASE_OUT } from '@/lib/motion'

// Each name line is indented a little further than the one above it.
const nameLines = [
  { text: 'Derrick', indent: '0em' },
  { text: 'Adilla', indent: '0.4em' },
  { text: 'Rahman', indent: '0.8em' },
]

/**
 * Asymmetric hero. On desktop the photo column carries a yellow panel that
 * starts half a gutter before the column and runs to the right edge of the
 * viewport, so its edge always follows the grid. The stacked name takes the
 * left two thirds. On mobile the panel becomes a full-width band beneath
 * the copy.
 */
export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="hero-name" className="relative overflow-hidden border-b-2 border-ink">
      <Container className="relative grid pt-10 lg:grid-cols-12 lg:gap-x-8 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-8">
          <h1 id="hero-name" className="text-display">
            {nameLines.map((line, index) => (
              <span key={line.text} className="block overflow-hidden" style={{ marginLeft: line.indent }}>
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1 + index * 0.09, ease: EASE_OUT }}
                >
                  {line.text}
                </motion.span>
                {/* Real whitespace so assistive tech reads one full name */}
                <span className="sr-only"> </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid gap-6 border-t-2 border-ink pt-6 md:grid-cols-5 lg:mt-14 lg:grid-cols-1 xl:grid-cols-5">
            <p className="text-h3 md:col-span-2 lg:col-span-1 xl:col-span-2">{profile.role}</p>

            <div className="md:col-span-3 lg:col-span-1 xl:col-span-3">
              <p className="max-w-md text-lead">
                {profile.intro ?? (
                  <>
                    Currently in class {profile.className} at {profile.school}, based in{' '}
                    {profile.location}.
                  </>
                )}
              </p>
              {!profile.intro && (
                <p className="mt-3 max-w-md text-sm text-muted">{introPlaceholder}</p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <Button to="/projects">View Portfolio</Button>
                <Button to="/resume" variant="secondary">
                  View Resume
                </Button>
                <Button to="/contact" variant="text">
                  Contact Me
                </Button>
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
              className="absolute -bottom-9 left-4 -rotate-6 font-accent text-5xl leading-none sm:text-6xl"
            >
              {profile.firstName}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

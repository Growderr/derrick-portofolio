import AboutIntro from '@/sections/about/AboutIntro'
import Biography from '@/sections/about/Biography'
import Education from '@/sections/about/Education'
import Interests from '@/sections/about/Interests'
import Organizations from '@/sections/about/Organizations'
import PlkExperience from '@/sections/about/PlkExperience'
import CareerGoals from '@/sections/about/CareerGoals'
import AboutCta from '@/sections/about/AboutCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function About() {
  usePageTitle('Tentang Saya')

  return (
    <DataGate resources={[resources.profile, resources.education, resources.experiences]}>
      <AboutIntro />
      <Biography />
      <Education />
      <Interests />
      <Organizations />
      <PlkExperience />
      <CareerGoals />
      <AboutCta />
    </DataGate>
  )
}

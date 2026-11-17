import ExperienceIntro from '@/sections/experience/ExperienceIntro'
import Journey from '@/sections/experience/Journey'
import PlkDetail from '@/sections/experience/PlkDetail'
import OrganizationsDetail from '@/sections/experience/OrganizationsDetail'
import CompetitionsDetail from '@/sections/experience/CompetitionsDetail'
import EducationDetail from '@/sections/experience/EducationDetail'
import ExperienceCta from '@/sections/experience/ExperienceCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Experience() {
  usePageTitle('Pengalaman')

  return (
    <DataGate resources={[resources.experiences, resources.education]}>
      <ExperienceIntro />
      <Journey />
      <PlkDetail />
      <OrganizationsDetail />
      <CompetitionsDetail />
      <EducationDetail />
      <ExperienceCta />
    </DataGate>
  )
}

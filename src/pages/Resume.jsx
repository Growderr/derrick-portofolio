import ResumeDocument from '@/sections/resume/ResumeDocument'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Resume() {
  usePageTitle('CV')

  return (
    <DataGate resources={[resources.profile, resources.education, resources.skills, resources.experiences, resources.projects]}>
      <ResumeDocument />
    </DataGate>
  )
}

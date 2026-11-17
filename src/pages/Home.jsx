import Hero from '@/sections/home/Hero'
import Introduction from '@/sections/home/Introduction'
import SkillsPreview from '@/sections/home/SkillsPreview'
import ProjectsPreview from '@/sections/home/ProjectsPreview'
import HomeCta from '@/sections/home/HomeCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Home() {
  usePageTitle()

  return (
    <DataGate resources={[resources.profile, resources.projects]}>
      <Hero />
      <Introduction />
      <SkillsPreview />
      <ProjectsPreview />
      <HomeCta />
    </DataGate>
  )
}

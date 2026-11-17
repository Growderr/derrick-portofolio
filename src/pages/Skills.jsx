import SkillsIntro from '@/sections/skills/SkillsIntro'
import HardSkills from '@/sections/skills/HardSkills'
import SoftSkills from '@/sections/skills/SoftSkills'
import ToolsTechnologies from '@/sections/skills/ToolsTechnologies'
import LearningInterests from '@/sections/skills/LearningInterests'
import SkillsCta from '@/sections/skills/SkillsCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Skills() {
  usePageTitle('Keahlian')

  return (
    <DataGate resources={[resources.profile, resources.skills]}>
      <SkillsIntro />
      <HardSkills />
      <SoftSkills />
      <ToolsTechnologies />
      <LearningInterests />
      <SkillsCta />
    </DataGate>
  )
}

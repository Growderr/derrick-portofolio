import ProjectGallery from '@/components/projects/ProjectGallery'
import ProjectsIntro from '@/sections/projects/ProjectsIntro'
import ProjectsCta from '@/sections/projects/ProjectsCta'
import DataGate from '@/components/ui/DataGate'
import { resources, useProjects } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

function ProjectsContent() {
  const projects = useProjects()

  return (
    <>
      <ProjectsIntro />
      <ProjectGallery projects={projects} />
      <ProjectsCta />
    </>
  )
}

export default function Projects() {
  usePageTitle('Proyek')

  return (
    <DataGate resources={[resources.projects]}>
      <ProjectsContent />
    </DataGate>
  )
}

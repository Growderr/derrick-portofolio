import AboutSection from '@/components/about/AboutSection'
import Missing from '@/components/projects/Missing'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { useProjects } from '@/lib/content'
import { getRelatedProjects } from '@/lib/projects'

export default function RelatedProjects({ project }) {
  const projects = useProjects()
  const related = getRelatedProjects(project, 3, projects)

  return (
    <AboutSection id="related" title="Proyek terkait" description="Karya lain di bidang yang sama atau dengan teknologi serupa.">
      {related.length > 0 ? (
        <ProjectGrid projects={related} variant="even" label="Proyek terkait" />
      ) : (
        <p>
          <Missing>Belum ada proyek terkait</Missing>
        </p>
      )}
    </AboutSection>
  )
}

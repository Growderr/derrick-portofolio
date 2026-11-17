import { FolderSearch } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import DataGate from '@/components/ui/DataGate'
import { usePageTitle } from '@/hooks/usePageTitle'
import { resources, useProjects } from '@/lib/content'
import { getProjectBySlug } from '@/lib/projects'
import ProjectHero from '@/sections/project-detail/ProjectHero'
import ProjectOverview from '@/sections/project-detail/ProjectOverview'
import ProblemSolution from '@/sections/project-detail/ProblemSolution'
import StackFeatures from '@/sections/project-detail/StackFeatures'
import RoleContributions from '@/sections/project-detail/RoleContributions'
import DevDocumentation from '@/sections/project-detail/DevDocumentation'
import ProjectScreenshots from '@/sections/project-detail/ProjectScreenshots'
import ProjectFeedback from '@/sections/project-detail/ProjectFeedback'
import RelatedProjects from '@/sections/project-detail/RelatedProjects'
import ProjectDetailCta from '@/sections/project-detail/ProjectDetailCta'

function ProjectDetailContent() {
  const { slug } = useParams()
  const projects = useProjects()
  const project = getProjectBySlug(slug, projects)

  usePageTitle(project ? project.title : 'Proyek tidak ditemukan')

  if (!project) {
    return (
      <section className="py-section">
        <Container>
          <h1 className="text-h1">Proyek tidak ditemukan.</h1>
          <EmptyState
            icon={FolderSearch}
            className="mt-10 max-w-2xl"
            title="Tidak ada proyek di alamat ini."
            action={
              <>
                <Button to="/projects">Semua Proyek</Button>
                <Button to="/" variant="secondary">
                  Kembali ke beranda
                </Button>
              </>
            }
          >
            <p>
              Tautan mungkin salah ketik, atau proyek tersebut belum ditambahkan.
            </p>
          </EmptyState>
        </Container>
      </section>
    )
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProblemSolution project={project} />
      <StackFeatures project={project} />
      <RoleContributions project={project} />
      <DevDocumentation project={project} />
      <ProjectScreenshots project={project} />
      <ProjectFeedback project={project} />
      <RelatedProjects project={project} />
      <ProjectDetailCta />
    </>
  )
}

export default function ProjectDetail() {
  return (
    <DataGate resources={[resources.projects]}>
      <ProjectDetailContent />
    </DataGate>
  )
}

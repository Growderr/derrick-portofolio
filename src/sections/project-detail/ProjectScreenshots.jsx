import AboutSection from '@/components/about/AboutSection'
import ScreenshotGallery from '@/components/projects/ScreenshotGallery'

export default function ProjectScreenshots({ project }) {
  return (
    <AboutSection id="gallery" title="Tangkapan layar" description="Pilih gambar untuk melihatnya dalam ukuran penuh.">
      <ScreenshotGallery images={project.screenshots ?? []} projectTitle={project.title} />
    </AboutSection>
  )
}

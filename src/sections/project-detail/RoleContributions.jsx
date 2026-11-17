import AboutSection from '@/components/about/AboutSection'
import FieldRow from '@/components/about/FieldRow'

export default function RoleContributions({ project }) {
  return (
    <AboutSection id="role" title="Peran & kontribusi saya" description="Apa yang saya kerjakan sendiri pada proyek ini.">
      <dl className="border-b-2 border-ink">
        <FieldRow label="Peran" value={project.role} placeholder="Peran akan ditambahkan" />
        <FieldRow
          label="Kontribusi"
          value={project.contributions ?? []}
          placeholder="Kontribusi akan ditambahkan"
        />
      </dl>
    </AboutSection>
  )
}

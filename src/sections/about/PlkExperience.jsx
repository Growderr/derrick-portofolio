import AboutSection from '@/components/about/AboutSection'
import FieldRow from '@/components/about/FieldRow'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { useExperiences } from '@/lib/content'

export default function PlkExperience() {
  const { plk } = useExperiences()
  const hasDocs = plk.documentation.length > 0

  return (
    <AboutSection
      id="plk"
      title="Pengalaman PLK"
      description="Praktik Lapangan Kerja. Detail berupa placeholder sampai ditambahkan lewat Panel Admin."
    >
      <dl className="border-b-2 border-ink">
        <FieldRow label="Instansi" value={plk.institution} placeholder="Nama instansi akan ditambahkan" />
        <FieldRow label="Posisi" value={plk.position} placeholder="Posisi akan ditambahkan" />
        <FieldRow label="Durasi" value={plk.duration} placeholder="Tanggal mulai dan selesai akan ditambahkan" />
        <FieldRow
          label="Tanggung jawab"
          value={plk.responsibilities}
          placeholder="Tanggung jawab akan ditambahkan"
        />
        <FieldRow label="Kegiatan" value={plk.activities} placeholder="Kegiatan akan ditambahkan" />
      </dl>

      <h3 className="mt-14 text-h3">Dokumentasi</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {hasDocs
          ? plk.documentation.map((item) => (
              <li key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt ?? ''}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full border-2 border-ink object-cover"
                />
                {item.caption && <p className="mt-2 text-sm text-muted">{item.caption}</p>}
              </li>
            ))
          : [1, 2, 3].map((n) => (
              <li key={n}>
                <ImagePlaceholder label="Tempat foto dokumentasi" ratio="4/3" />
              </li>
            ))}
      </ul>
    </AboutSection>
  )
}

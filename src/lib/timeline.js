/**
 * Builds the journey timeline from the shared content (education and experiences), so nothing is typed twice.
 * Order: current education, work placement, organizations, competitions, earlier education.
 * Education entries without a school name are placeholders and are left out here
 * (they still appear in the Education section).
 */
export function buildTimeline({ education, plk, organizations, competitions }) {
  const schools = education.filter((e) => e.school)

  return [
    ...schools
      .filter((e) => e.current)
      .map((e) => ({
        id: `edu-${e.id}`,
        kind: 'education',
        period: e.period,
        title: e.school,
        role: e.lines[0] ?? null,
        description: e.description,
        tags: e.tags,
        current: true,
      })),
    {
      id: 'plk',
      kind: 'plk',
      period: plk.duration,
      title: plk.institution ?? 'Instansi akan ditambahkan',
      role: plk.position,
      description: plk.description,
      tags: plk.tags,
      current: false,
    },
    ...organizations.map((o, i) => ({
      id: `org-${i}`,
      kind: 'organization',
      period: o.period ?? null,
      title: o.organization,
      role: o.role ?? null,
      description: o.description ?? null,
      tags: o.tags ?? [],
      current: false,
    })),
    ...competitions.map((c, i) => ({
      id: `comp-${i}`,
      kind: 'competition',
      period: c.date ?? null,
      title: c.name,
      role: c.category ?? null,
      description: c.result ?? c.description ?? null,
      tags: c.tags ?? [],
      current: false,
    })),
    ...schools
      .filter((e) => !e.current)
      .map((e) => ({
        id: `edu-${e.id}`,
        kind: 'education',
        period: e.period,
        title: e.school,
        role: e.lines[0] ?? null,
        description: e.description,
        tags: e.tags ?? [],
        current: false,
      })),
  ]
}

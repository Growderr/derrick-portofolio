/**
 * Education, newest first. Used by /experience and by /about.
 * `school: null` renders a clearly labelled placeholder. Copy an entry to add more
 * (for example junior high school). Nothing here is invented.
 */
export const education = [
  {
    id: 'smkn2',
    current: true,
    school: 'SMKN 2 Banjarmasin',
    lines: ['Kelas XII PPLG A', 'Kompetensi Keahlian: Pengembangan Perangkat Lunak dan Gim'],
    period: null, // e.g. '2023 to present'
    description: 'Program sekolah menengah kejuruan di bidang pengembangan perangkat lunak dan gim.',
    tags: ['PPLG', 'Pengembangan perangkat lunak'],
  },
  {
    id: 'previous',
    current: false,
    school: null, // e.g. 'SMPN 1 Example'
    lines: [],
    period: null,
    description: null,
    tags: [],
  },
]

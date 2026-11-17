import {
  Atom,
  Braces,
  Cloud,
  Code,
  CodeXml,
  Database,
  FileCode,
  GitBranch,
  GitMerge,
  LayoutTemplate,
  Palette,
  PenTool,
  Server,
  Wind,
} from 'lucide-react'

/**
 * Maps the `icon` key used in src/data/skills.js to a Lucide icon.
 * Lucide has no brand logos, so these are neutral symbols for each tool's role.
 */
const icons = {
  html: FileCode,
  css: Palette,
  javascript: Braces,
  react: Atom,
  tailwind: Wind,
  php: Server,
  mysql: Database,
  supabase: Cloud,
  git: GitBranch,
  github: GitMerge,
  vscode: CodeXml,
  uiux: LayoutTemplate,
  figma: PenTool,
}

export function getSkillIcon(key) {
  return icons[key] ?? Code
}

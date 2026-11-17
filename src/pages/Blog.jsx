import BlogIntro from '@/sections/blog/BlogIntro'
import BlogList from '@/sections/blog/BlogList'
import BlogCta from '@/sections/blog/BlogCta'
import DataGate from '@/components/ui/DataGate'
import { resources } from '@/lib/content'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function Blog() {
  usePageTitle('Blog Pengembang')

  return (
    <DataGate resources={[resources.blog]}>
      <BlogIntro />
      <BlogList />
      <BlogCta />
    </DataGate>
  )
}

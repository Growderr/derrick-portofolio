import Container from '@/components/layout/Container'
import BlogGrid from '@/components/blog/BlogGrid'
import { blogCategories } from '@/data/blog'
import { useBlogPosts } from '@/lib/content'

export default function BlogList() {
  const blogPosts = useBlogPosts()

  return (
    <section aria-label="Artikel" className="py-section">
      <Container>
        <BlogGrid posts={blogPosts} categories={blogCategories} />
      </Container>
    </section>
  )
}

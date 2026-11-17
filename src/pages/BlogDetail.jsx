import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import Container from '@/components/layout/Container'
import BlogArticle from '@/components/blog/BlogArticle'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import DataGate from '@/components/ui/DataGate'
import { blogCategories } from '@/data/blog'
import { usePageTitle } from '@/hooks/usePageTitle'
import { resources, useBlogPosts } from '@/lib/content'
import { byDateDesc } from '@/lib/formatDate'

function BlogDetailContent() {
  const { slug } = useParams()
  const blogPosts = useBlogPosts()

  const sorted = useMemo(() => [...blogPosts].sort((a, b) => byDateDesc(a.date, b.date)), [blogPosts])
  const index = sorted.findIndex((post) => post.slug === slug)
  const post = index >= 0 ? sorted[index] : null

  usePageTitle(post ? post.title : 'Artikel tidak ditemukan')

  if (!post) {
    return (
      <section className="py-section">
        <Container>
          <h1 className="sr-only">Artikel tidak ditemukan</h1>
          <EmptyState
            icon={FileQuestion}
            title="Artikel tidak ditemukan"
            action={<Button to="/blog" variant="secondary">Kembali ke semua artikel</Button>}
          >
            <p>
              Tidak ada artikel di <code>/blog/{slug}</code>. Artikel mungkin telah dipindahkan, atau
              alamatnya salah ketik.
            </p>
          </EmptyState>
        </Container>
      </section>
    )
  }

  return (
    <BlogArticle
      post={post}
      categoryLabel={blogCategories.find((category) => category.id === post.category)?.label}
      newer={sorted[index - 1]}
      older={sorted[index + 1]}
    />
  )
}

export default function BlogDetail() {
  return (
    <DataGate resources={[resources.blog]}>
      <BlogDetailContent />
    </DataGate>
  )
}

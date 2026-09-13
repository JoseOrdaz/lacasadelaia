import { permanentRedirect } from 'next/navigation'

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  permanentRedirect(`/blog/${encodeURIComponent(slug)}`)
}

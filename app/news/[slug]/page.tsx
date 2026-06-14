import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { news } from '@/data/news'
import type { NewsTag } from '@/types'
import NewsletterForm from '@/components/NewsletterForm'

interface Props {
  params: Promise<{ slug: string }>
}

const tagColors: Record<NewsTag, string> = {
  'IA generativa': 'bg-lime-light border-lime text-carbon',
  Automatización: 'bg-parchment border-faded text-ink',
  Herramientas: 'bg-parchment border-faded text-ink',
  Productividad: 'bg-parchment border-faded text-ink',
  Marketing: 'bg-carbon border-carbon text-cream',
  Desarrollo: 'bg-parchment border-faded text-ink',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = news.find((n) => n.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = news.find((n) => n.slug === slug)
  if (!article) notFound()

  const relatedArticles = news
    .filter(
      (n) =>
        n.slug !== article.slug &&
        n.tags.some((t) => article.tags.includes(t))
    )
    .slice(0, 2)

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-4">
          <nav className="flex items-center gap-2 font-body text-xs text-mist">
            <Link href="/" className="hover:text-carbon transition-colors">Inicio</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-carbon transition-colors">Noticias</Link>
            <span>›</span>
            <span className="text-carbon truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="container-main py-12 md:py-16">
        <div className="max-w-2xl">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-body font-semibold px-2.5 py-1 rounded-sm border ${tagColors[tag] ?? 'bg-parchment border-faded text-ink'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 font-body text-sm text-mist mb-10 pb-8 border-b border-faded">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>·</span>
            <span>{article.readTime} de lectura</span>
          </div>

          {/* Key idea callout */}
          <div className="bg-lime-light border-l-4 border-lime rounded-r-sm p-5 mb-10">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-lime-hover mb-2">
              Idea clave
            </p>
            <p className="font-display text-lg text-carbon leading-snug">
              {article.keyIdea}
            </p>
          </div>

          {/* Article content */}
          <div
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Newsletter CTA */}
          <div className="mt-14 bg-carbon text-cream rounded-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-lime opacity-[0.08] rounded-full blur-2xl pointer-events-none" />
            <div className="relative">
              <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-lime/70 border border-lime/30 px-3 py-1 rounded-sm mb-4">
                Newsletter semanal
              </span>
              <h3 className="font-display text-2xl text-cream mb-3">
                ¿Te ha resultado útil?
              </h3>
              <p className="font-body text-sm text-cream/55 mb-6 max-w-sm">
                Cada semana enviamos ideas prácticas como esta. Sin spam, sin promesas vacías.
              </p>
              <NewsletterForm variant="inline" />
            </div>
          </div>

          {/* Back + related */}
          <div className="mt-10 pt-8 border-t border-faded">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-carbon hover:text-ink transition-colors"
            >
              ← Volver a noticias
            </Link>

            {relatedArticles.length > 0 && (
              <div className="mt-10">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-4">
                  También puede interesarte
                </p>
                <div className="space-y-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/news/${related.slug}`}
                      className="block bg-parchment border border-faded rounded-sm p-4 hover:border-carbon hover:shadow-card transition-all duration-150"
                    >
                      <p className="font-display text-base text-carbon leading-tight mb-1">
                        {related.title}
                      </p>
                      <p className="font-body text-xs text-mist">{related.readTime} de lectura</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

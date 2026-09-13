import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNewsBySlug, getAllNews } from '@/lib/payload'
import type { NewsTag } from '@/types'


interface Props {
  params: Promise<{ slug: string }>
}

function absoluteUrl(pathname: string) {
  if (pathname.startsWith('http')) return pathname
  return `https://lacasadelaia.com${pathname.startsWith('/') ? pathname : `/${pathname}`}`
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

export const revalidate = 60

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/blog/${article.slug}`,
      publishedTime: article.date,
      images: [{ url: absoluteUrl(article.image), alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [absoluteUrl(article.image)],
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) notFound()
  const isSvg = article.image.toLowerCase().endsWith('.svg')

  const allNews = await getAllNews()
  const relatedArticles = allNews
    .filter(
      (n) =>
        n.slug !== article.slug &&
        n.tags.some((t) => article.tags.includes(t))
    )
    .slice(0, 2)

  return (
    <div className="bg-cream min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.excerpt, datePublished: article.date, image: absoluteUrl(article.image), mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`), publisher: { '@type': 'Organization', name: 'La Casa de la IA', url: 'https://lacasadelaia.com' } }).replace(/</g, '\\u003c') }} />
      {/* Breadcrumb */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-4">
          <nav className="flex items-center gap-2 font-body text-xs text-mist">
            <Link href="/" className="hover:text-carbon transition-colors">Inicio</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-carbon transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-carbon truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="container-main py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-carbon shadow-card mb-8 bg-parchment">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              className={isSvg ? 'object-contain p-4' : 'object-cover'}
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

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

          <aside className="mt-12 p-7 bg-lime-light rounded-md">
            <h2 className="font-display text-2xl mb-3">¿Quieres llevarlo a tu negocio?</h2>
            <p className="text-sm mb-5">Cuéntame cómo trabajas y buscamos una solución a tu medida.</p>
            <Link href="/#contacto" className="btn-primary">Cuéntame qué quieres automatizar →</Link>
          </aside>

          {/* Back + related */}
          <div className="mt-10 pt-8 border-t border-faded">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-carbon hover:text-ink transition-colors"
            >
              ← Volver al blog
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
                      href={`/blog/${related.slug}`}
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

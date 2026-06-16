import Link from 'next/link'
import Image from 'next/image'
import type { NewsItem, NewsTag } from '@/types'

interface NewsCardProps {
  news: NewsItem
  variant?: 'default' | 'featured'
}

const tagColors: Record<NewsTag, string> = {
  'IA generativa': 'bg-lime-light border-lime text-carbon',
  'Automatización': 'bg-parchment border-faded text-ink',
  'Herramientas': 'bg-parchment border-faded text-ink',
  'Productividad': 'bg-parchment border-faded text-ink',
  'Marketing': 'bg-carbon border-carbon text-cream',
  'Desarrollo': 'bg-parchment border-faded text-ink',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsCard({ news, variant = 'default' }: NewsCardProps) {
  return (
    <article className="group bg-cream border border-carbon rounded-sm shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-carbon bg-parchment">
        <Image
          src={news.image}
          alt={news.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {news.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-xs font-body font-semibold px-2 py-0.5 rounded-sm border ${tagColors[tag] ?? 'bg-parchment border-faded text-ink'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-display text-carbon leading-tight mb-3 ${variant === 'featured' ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          {news.title}
        </h3>

        <p className="font-body text-sm text-ink/70 leading-relaxed flex-1 mb-4">
          {news.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-faded pt-4">
          <div className="flex items-center gap-3 text-xs font-body text-mist">
            <time dateTime={news.date}>{formatDate(news.date)}</time>
            <span>·</span>
            <span>{news.readTime} de lectura</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/news/${news.slug}`}
          className="block w-full text-center text-sm font-body font-semibold text-carbon border border-carbon rounded-sm py-2.5 hover:bg-carbon hover:text-cream transition-colors duration-150"
        >
          Leer artículo →
        </Link>
      </div>
    </article>
  )
}

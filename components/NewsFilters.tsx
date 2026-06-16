'use client'

import { useState, useMemo } from 'react'
import type { NewsItem, NewsTag } from '@/types'
import NewsCard from './NewsCard'
import AnimatedReveal from './AnimatedReveal'

const ALL = 'Todas'

export default function NewsFilters({ news }: { news: NewsItem[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>(ALL)

  const allTags = useMemo<string[]>(
    () => [ALL, ...[...new Set(news.flatMap((n) => n.tags))]],
    [news]
  )

  const filtered = useMemo(() => {
    return news.filter((n) => {
      const matchesTag = activeTag === ALL || n.tags.includes(activeTag as NewsTag)
      const matchesQuery =
        !query ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(query.toLowerCase())
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-10 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist text-sm pointer-events-none">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos..."
            className="w-full font-body text-sm text-carbon bg-cream border border-faded rounded-sm pl-9 pr-4 py-3 placeholder:text-mist focus:outline-none focus:border-carbon focus:ring-2 focus:ring-lime/30 transition-all duration-150"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-carbon text-sm transition-colors"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs font-body font-semibold px-3 py-1.5 rounded-sm border transition-all duration-150 ${
                activeTag === tag
                  ? 'bg-carbon text-cream border-carbon'
                  : 'bg-transparent text-ink border-faded hover:border-carbon hover:text-carbon'
              }`}
            >
              {tag}
            </button>
          ))}
          {(query || activeTag !== ALL) && (
            <button
              onClick={() => { setQuery(''); setActiveTag(ALL) }}
              className="text-xs font-body font-medium px-3 py-1.5 rounded-sm text-mist hover:text-carbon underline underline-offset-2 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="font-body text-xs text-mist uppercase tracking-widest mb-6">
        {filtered.length} artículo{filtered.length !== 1 ? 's' : ''}
        {activeTag !== ALL ? ` · ${activeTag}` : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <AnimatedReveal key={item.id} delay={i * 60}>
              <NewsCard news={item} />
            </AnimatedReveal>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-carbon mb-3">Sin resultados</p>
          <p className="font-body text-sm text-mist max-w-sm mx-auto">
            No hemos encontrado noticias con esos filtros. Prueba con otra búsqueda.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveTag(ALL) }}
            className="mt-6 font-body text-sm font-semibold text-carbon border border-carbon rounded-sm px-5 py-2.5 hover:bg-carbon hover:text-cream transition-colors duration-150"
          >
            Ver todos los artículos
          </button>
        </div>
      )}
    </div>
  )
}

import type { Metadata } from 'next'
import NewsFilters from '@/components/NewsFilters'

export const metadata: Metadata = {
  title: 'Noticias sobre IA',
  description:
    'Actualidad, herramientas y cambios importantes en inteligencia artificial explicados de forma práctica para profesionales.',
}

export default function NewsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Noticias sobre IA
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4">
            Actualidad práctica
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Herramientas, cambios importantes y reflexiones explicadas de forma útil.
            Sin hype ni tecnicismos innecesarios.
          </p>
        </div>
      </div>

      <div className="container-main section">
        <NewsFilters />
      </div>
    </div>
  )
}

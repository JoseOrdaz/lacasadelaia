import type { Metadata } from 'next'
import { getAllNews } from '@/lib/payload'
import NewsFilters from '@/components/NewsFilters'

export const metadata: Metadata = {
  title: 'Blog de automatización, IA y n8n',
  alternates: { canonical: '/blog' },
  description:
    'Guías prácticas de automatización con IA, n8n e integraciones para empresas y particulares. Ideas para trabajar mejor.',
}

export const revalidate = 60

export default async function BlogPage() {
  const news = await getAllNews()

  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Blog · IA y automatización
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4">
            Ideas para trabajar mejor
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Automatización, IA e integraciones explicadas con ejemplos.
            Sin hype ni tecnicismos innecesarios.
          </p>
        </div>
      </div>

      <div className="container-main section">
        <NewsFilters news={news} />
      </div>
    </div>
  )
}

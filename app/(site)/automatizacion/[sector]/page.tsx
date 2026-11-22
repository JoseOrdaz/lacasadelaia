import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { sectors, audit, auditHref } from '@/data/offers'

export const dynamicParams = false
export function generateStaticParams() { return sectors.map(({ slug }) => ({ sector: slug })) }

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector: slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) return {}
  return {
    title: `${sector.title} con IA y n8n | La Casa de la IA`,
    description: `${sector.intro} Ejemplos concretos y precios orientativos ${sector.from}.`,
    alternates: { canonical: `/automatizacion/${sector.slug}` },
  }
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: slug } = await params
  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) notFound()
  const contact = (text: string) => `/?mensaje=${encodeURIComponent(text)}#contacto`
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: sector.title, serviceType: 'Automatización de procesos con IA', audience: { '@type': 'BusinessAudience', name: sector.name }, areaServed: { '@type': 'Country', name: 'España' }, provider: { '@type': 'Organization', name: 'La Casa de la IA', url: 'https://lacasadelaia.com' } }
  return <div className="studio">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap audit-hero">
      <p className="eyebrow"><span className="status-dot" /> {sector.name.toUpperCase()}</p>
      <h1>{sector.title}</h1>
      <p className="hero-description">{sector.intro}</p>
      <div className="hero-actions"><a className="action" href={contact(`Tengo un negocio del sector ${sector.name.toLowerCase()} y quiero automatizar: `)}>Cuéntame tu caso →</a><a className="text-link" href={auditHref}>{audit.title} · {audit.price} ↗</a></div>
    </section>
    <section className="wrap section-studio problem-section">
      <div><p className="eyebrow">¿TE SUENA?</p><h2>Lo que más tiempo <br /><em>se lleva.</em></h2></div>
      <div className="problem-list">{sector.pains.map((pain, i) => <div key={pain}><span>0{i + 1}</span><p>{pain}</p><ArrowUpRight size={19} aria-hidden="true" /></div>)}</div>
    </section>
    <section className="section-studio soft-section"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">EJEMPLOS CONCRETOS</p><h2>Así puede funcionar <br /><em>en tu negocio.</em></h2></div><p>Cada proyecto se adapta a tus herramientas. Precio orientativo {sector.from}, según alcance.</p></div>
      <div className="solutions-grid">{sector.examples.map((ex, i) => <article className="solution" key={ex.title}><div className="solution-top"><span>0{i + 1}</span></div><h3>{ex.title}</h3><p>{ex.text}</p><a href={contact(`Me interesa «${ex.title}» para mi negocio (${sector.name.toLowerCase()}). `)}>{ex.saving}<ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
    </div></section>
    <section className="wrap uncertainty"><span className="uncertainty-symbol" aria-hidden="true">?</span><div><p className="eyebrow">SIN COMPROMISO</p><h2>¿No sabes por dónde empezar?</h2><p>{audit.title} ({audit.duration}, {audit.price.toLowerCase()}): revisamos tu caso y te digo qué tiene sentido automatizar primero.</p></div><a className="action" href={auditHref}>Reservar diagnóstico →</a></section>
    <nav className="wrap sector-links" aria-label="Otros sectores"><span>Otros sectores:</span>{sectors.filter((s) => s.slug !== sector.slug).map((s) => <Link key={s.slug} href={`/automatizacion/${s.slug}`}>{s.name}</Link>)}</nav>
  </div>
}

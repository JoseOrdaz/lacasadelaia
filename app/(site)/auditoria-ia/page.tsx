import type { Metadata } from 'next'
import AuditClient from './AuditClient'
import { webAudit } from '@/data/offers'

export const metadata: Metadata = {
  title: '¿Tu web está preparada para la IA? Analizador gratuito | La Casa de la IA',
  description: 'Comprueba gratis si ChatGPT, Claude, Perplexity y Google pueden encontrar, leer y entender tu web: robots.txt, sitemap, llms.txt, datos estructurados y contenido.',
  alternates: { canonical: '/auditoria-ia' },
}

export default function AuditPage() {
  return <div className="studio">
    <section className="wrap audit-hero">
      <p className="eyebrow"><span className="status-dot" /> HERRAMIENTA GRATUITA · SEO, GEO Y AGENTES DE IA</p>
      <h1>¿Tu web está preparada<br /><em>para las IA?</em></h1>
      <p className="hero-description">Cada vez más clientes preguntan a ChatGPT, Perplexity o Gemini antes de buscar en Google. Analiza en segundos si esos asistentes pueden encontrar, leer y entender tu web.</p>
    </section>
    <section className="wrap audit-section"><AuditClient reviewPrice={webAudit.reviewPrice} reviewPrefill={webAudit.reviewPrefill} /></section>
  </div>
}

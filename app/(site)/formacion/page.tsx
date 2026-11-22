import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import { training } from '@/data/offers'

export const metadata: Metadata = {
  title: 'Formación en n8n e IA para pymes y equipos | La Casa de la IA',
  description: 'Taller práctico de n8n + IA para pymes y formación a medida para equipos, online o presencial. Posibilidad de bonificación con FUNDAE.',
  alternates: { canonical: '/formacion' },
}

export default function TrainingPage() {
  const { workshop, company } = training
  const schema = { '@context': 'https://schema.org', '@type': 'Course', name: workshop.title, description: metadata.description, inLanguage: 'es', provider: { '@type': 'Organization', name: 'La Casa de la IA', url: 'https://lacasadelaia.com' } }
  return <div className="studio">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="wrap audit-hero">
      <p className="eyebrow"><span className="status-dot" /> FORMACIÓN PRÁCTICA</p>
      <h1>Aprende a automatizar<br /><em>tu propio trabajo.</em></h1>
      <p className="hero-description">Para quien prefiere entender cómo funciona y hacerlo por su cuenta. Sin teoría de relleno: sales con un flujo funcionando.</p>
    </section>
    <section className="wrap training-grid">
      <article className="offer-card is-highlight">
        <p className="eyebrow">PARA PERSONAS Y PYMES</p>
        <h2>{workshop.title}</h2>
        <p className="offer-meta">{workshop.format}</p>
        <ul className="offer-list">{workshop.outcomes.map((o) => <li key={o}><Check size={16} aria-hidden="true" />{o}</li>)}</ul>
        <p className="offer-price">{workshop.price}</p>
        <p>Apúntate a la lista y te aviso de la próxima fecha antes que a nadie.</p>
        <LeadForm source="training" detail={`Lista de espera: ${workshop.title}`} button="Avisadme →" success={<p><strong>¡Apuntado/a!</strong> Te escribiré con la próxima fecha.</p>} />
      </article>
      <article className="offer-card">
        <p className="eyebrow">PARA EMPRESAS</p>
        <h2>{company.title}</h2>
        <p className="offer-meta">{company.format}</p>
        <ul className="offer-list"><li><Check size={16} aria-hidden="true" />Partimos de vuestras tareas y herramientas reales.</li><li><Check size={16} aria-hidden="true" />Dejamos montados uno o dos flujos útiles durante la formación.</li><li><Check size={16} aria-hidden="true" />Material y grabaciones para el equipo.</li></ul>
        <p className="offer-price">{company.price}</p>
        <p className="offer-note">{company.note}</p>
        <a className="action" href={`/?mensaje=${encodeURIComponent('Me interesa la formación para equipos. Somos … personas y usamos estas herramientas: …')}#contacto`}>Pedir propuesta →</a>
      </article>
    </section>
  </div>
}

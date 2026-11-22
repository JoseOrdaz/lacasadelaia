import type { Metadata } from 'next'
import Link from 'next/link'
import { guide, guideTitle } from '@/data/guide'
import { audit, auditHref } from '@/data/offers'

export const metadata: Metadata = {
  title: `${guideTitle} | La Casa de la IA`,
  description: 'Guía práctica con 10 automatizaciones sencillas para pymes y profesionales: qué resuelven, cómo funcionan y con qué herramientas.',
  robots: { index: false, follow: true },
}

export default function GuidePage() {
  return <div className="studio">
    <section className="wrap guide-hero">
      <p className="eyebrow"><span className="status-dot" /> GUÍA GRATUITA</p>
      <h1>10 automatizaciones<br /><em>que ahorran horas cada semana.</em></h1>
      <p className="hero-description">Ideas concretas para dejar de hacer a mano lo que se repite. Elige una, la que más te moleste, y empieza por ahí.</p>
    </section>
    <ol className="wrap guide-list">{guide.map((item, i) => <li key={item.title}>
      <span>{String(i + 1).padStart(2, '0')}</span>
      <div>
        <h2>{item.title}</h2>
        <p><strong>El problema:</strong> {item.problem}</p>
        <p><strong>Cómo funciona:</strong> {item.how}</p>
        <p className="guide-tools">{item.tools}</p>
        <p className="guide-tip">💡 {item.tip}</p>
      </div>
    </li>)}</ol>
    <section className="wrap uncertainty guide-cta"><div><p className="eyebrow">¿Y AHORA QUÉ?</p><h2>¿Cuál de estas te quitaría más trabajo?</h2><p>{audit.title} · {audit.duration} · {audit.price}. Revisamos tu caso y te digo por dónde empezar.</p></div><Link className="action" href={auditHref}>Reservar diagnóstico →</Link></section>
  </div>
}

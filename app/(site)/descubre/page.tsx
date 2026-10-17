import type { Metadata } from 'next'
import AutomationFinder from '@/components/AutomationFinder'

export const metadata: Metadata = {
  title: 'Descubre qué puedes automatizar',
  description: 'Responde unas preguntas y descubre qué tareas de tu negocio podrías automatizar con IA, integraciones y tus herramientas actuales.',
  alternates: { canonical: '/descubre' },
}

export default function DiscoverPage() {
  return <div className="bg-cream min-h-screen">
    <div className="border-b border-faded bg-parchment">
      <div className="container-main py-12 md:py-16">
        <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">Diagnóstico gratuito</span>
        <h1 className="font-display text-4xl md:text-6xl text-carbon leading-tight mb-5 max-w-3xl">Descubre qué podrías automatizar en tu negocio</h1>
        <p className="font-body text-base md:text-lg text-ink/70 max-w-2xl leading-relaxed">Responde unas preguntas sobre tu día a día y te enseñaremos dónde tiene más sentido empezar. Sin tecnicismos, sin compromiso y sin venderte una herramienta porque sí.</p>
      </div>
    </div>
    <AutomationFinder />
  </div>
}


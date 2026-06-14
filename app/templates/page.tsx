import type { Metadata } from 'next'
import TemplatesClient from './TemplatesClient'

export const metadata: Metadata = {
  title: 'Plantillas gratis de IA | La Casa de la IA',
  description:
    'Descarga plantillas gratuitas de prompts, documentos y automatizaciones con IA para profesionales. Fáciles de usar desde el primer día.',
}

export default function TemplatesPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Recursos gratuitos
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4">
            5 plantillas gratis
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Prompts, checklists y flujos de trabajo listos para copiar y adaptar.
            Sin necesitar experiencia previa con IA.
          </p>
        </div>
      </div>

      <TemplatesClient />
    </div>
  )
}

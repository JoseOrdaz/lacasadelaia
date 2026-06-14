import type { Metadata } from 'next'
import AutomationCard from '@/components/AutomationCard'
import AnimatedReveal from '@/components/AnimatedReveal'
import NewsletterForm from '@/components/NewsletterForm'
import { automations } from '@/data/automations'

export const metadata: Metadata = {
  title: 'Automatizaciones con IA',
  description:
    'Diseñamos e implementamos automatizaciones con IA para pymes y freelancers. Ahorra tiempo, elimina tareas repetitivas y escala tu negocio sin ampliar el equipo.',
}

export default function AutomationsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Automatizaciones con IA
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4 max-w-xl">
            Tu negocio trabaja solo en lo que más tiempo te roba
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Implementamos automatizaciones prácticas y personalizadas para que tú y tu equipo
            podáis enfocaos en lo que de verdad importa.
          </p>
        </div>
      </div>

      {/* Automations grid */}
      <div className="container-main section">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {automations.map((automation, i) => (
            <AnimatedReveal key={automation.id} delay={i * 80}>
              <AutomationCard automation={automation} />
            </AnimatedReveal>
          ))}
        </div>

        {/* Custom CTA */}
        <AnimatedReveal>
          <div className="bg-parchment border border-faded rounded-sm p-8 md:p-12 text-center max-w-2xl mx-auto">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-5">
              ¿No encuentras lo que buscas?
            </span>
            <h2 className="font-display text-3xl text-carbon mb-4 leading-tight">
              Diseñamos tu automatización a medida
            </h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed mb-8 max-w-md mx-auto">
              Cuéntanos qué tareas te roban más tiempo y te proponemos una solución.
              La consulta inicial es gratis.
            </p>
            <a
              href="mailto:hola@lacasadelaia.com?subject=Consulta sobre automatización personalizada"
              className="btn-lime inline-flex"
            >
              Solicitar consulta gratuita →
            </a>
          </div>
        </AnimatedReveal>
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-faded bg-parchment">
        <div className="container-main py-10">
          <AnimatedReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="font-display text-xl text-carbon mb-1">
                  Recibe ideas prácticas de automatización cada semana
                </p>
                <p className="font-body text-sm text-ink/60">Sin spam. Cancela cuando quieras.</p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <NewsletterForm variant="inline" />
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </div>
  )
}

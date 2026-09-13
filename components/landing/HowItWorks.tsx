'use client'

import { LifeBuoy, Rocket, Search, Workflow } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Diagnóstico',
    duration: '1 sesión · gratis',
    description:
      'Revisamos contigo dónde se va el tiempo del equipo y qué procesos se repiten. Salimos con una lista priorizada por horas ahorradas, no por lo llamativo que suene.',
  },
  {
    icon: Workflow,
    step: '02',
    title: 'Diseño del flujo',
    duration: '3-5 días',
    description:
      'Dibujamos el flujo completo antes de tocar nada: qué lo dispara, qué decide la IA, dónde escribe y qué pasa cuando algo falla. Lo validas tú antes de construir.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Implementación',
    duration: '1-2 semanas',
    description:
      'Montamos el flujo en n8n, lo conectamos con tus herramientas y lo probamos con datos reales. Tu equipo recibe formación y una guía de uso en su idioma.',
  },
  {
    icon: LifeBuoy,
    step: '04',
    title: 'Soporte y ajustes',
    duration: 'Continuo',
    description:
      'Monitorizamos que todo siga funcionando cuando cambian las APIs o tu proceso. Ajustamos, ampliamos y te avisamos antes de que lo notes.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section bg-parchment border-y border-faded" id="proceso">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="Cómo trabajamos"
            title="Sin proyectos eternos ni sorpresas"
            description="Un proceso de cuatro pasos donde ves el flujo funcionando antes de pagar la implementación completa."
          />
        </Reveal>

        <div className="relative">
          {/* Línea de progreso */}
          <div className="hidden lg:block absolute top-[30px] left-[8%] right-[8%] h-px bg-gradient-to-r from-electric/30 via-violet/30 to-lime" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map(({ icon: Icon, step, title, duration, description }, i) => (
              <Reveal key={step} delay={i * 110}>
                <div className="relative h-full">
                  <span className="relative z-10 flex items-center justify-center w-[60px] h-[60px] rounded-sm bg-cream border border-carbon shadow-card mb-5">
                    <Icon className="w-6 h-6 text-carbon" strokeWidth={1.6} aria-hidden />
                    <span className="absolute -top-2 -right-2 font-body text-[10px] font-bold text-cream bg-carbon px-1.5 py-0.5 rounded-sm">
                      {step}
                    </span>
                  </span>

                  <h3 className="font-display text-xl text-carbon leading-tight mb-1">{title}</h3>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-electric mb-3">
                    {duration}
                  </p>
                  <p className="font-body text-sm text-ink/70 leading-relaxed">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

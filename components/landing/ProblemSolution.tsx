'use client'

import { ArrowRight, Check, X } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

const pairs = [
  {
    problem: 'Los leads llegan a un correo compartido y alguien los pasa a mano al CRM.',
    solution: 'Entran cualificados, asignados y con el primer mensaje ya enviado.',
  },
  {
    problem: 'Instagram se actualiza cuando alguien encuentra un hueco, o sea, casi nunca.',
    solution: 'Publica según calendario y responde comentarios y DMs con tu tono.',
  },
  {
    problem: 'Cada creatividad nueva depende de que diseño tenga disponibilidad.',
    solution: 'Veinte piezas coherentes con tu marca listas para revisar en una tarde.',
  },
  {
    problem: 'El cierre de mes se come tres días entre facturas y recordatorios de cobro.',
    solution: 'Se emite, se envía y se reclama solo. Tú revisas las excepciones.',
  },
]

export default function ProblemSolution() {
  return (
    <section className="section bg-parchment border-y border-faded">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="El problema"
            title="No te falta gente. Te sobra trabajo repetitivo."
            description="Las tareas que más tiempo consumen casi nunca son las que aportan valor. Son las que nadie ha parado a automatizar todavía."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {pairs.map((pair, i) => (
            <Reveal key={pair.problem} delay={i * 80}>
              <div className="h-full bg-cream border border-faded rounded-sm p-6 hover:border-carbon hover:shadow-card transition-all duration-200">
                {/* Antes */}
                <div className="flex gap-3 mb-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-sm bg-parchment border border-faded mt-0.5">
                    <X className="w-3.5 h-3.5 text-mist" strokeWidth={2.2} aria-hidden />
                  </span>
                  <p className="font-body text-sm text-ink/60 leading-relaxed line-through decoration-faded decoration-1">
                    {pair.problem}
                  </p>
                </div>

                <div className="flex items-center gap-2 pl-1 mb-4 text-electric">
                  <ArrowRight className="w-4 h-4 rotate-90" strokeWidth={1.8} aria-hidden />
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest">
                    Automatizado
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-electric/40 to-transparent" />
                </div>

                {/* Después */}
                <div className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-sm bg-lime border border-carbon mt-0.5">
                    <Check className="w-3.5 h-3.5 text-carbon" strokeWidth={2.4} aria-hidden />
                  </span>
                  <p className="font-body text-sm font-medium text-carbon leading-relaxed">
                    {pair.solution}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

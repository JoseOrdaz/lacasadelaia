'use client'

import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { UseCase, UseCaseNodeKind } from '@/types'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

const kindStyles: Record<UseCaseNodeKind, { dot: string; label: string; edge: string }> = {
  trigger: { dot: 'bg-lime-hover', label: 'Disparador', edge: 'border-l-lime-hover' },
  ai: { dot: 'bg-electric', label: 'IA', edge: 'border-l-electric' },
  action: { dot: 'bg-violet', label: 'Acción', edge: 'border-l-violet' },
  output: { dot: 'bg-carbon', label: 'Salida', edge: 'border-l-carbon' },
}

export default function UseCases({ useCases }: { useCases: UseCase[] }) {
  const [active, setActive] = useState(0)
  const current = useCases[active]

  if (!current) return null

  return (
    <section className="section" id="casos">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="Casos reales"
            title="Así queda un proceso cuando lo automatizas"
            description="Cada caso es un flujo que está funcionando ahora mismo en un negocio real. Elige uno para ver sus nodos."
          />
        </Reveal>

        {/* Selector de caso */}
        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Casos de uso">
            {useCases.map((useCase, i) => (
              <button
                key={useCase.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`font-body text-sm font-semibold px-4 py-2.5 rounded-sm border transition-colors duration-150 ${
                  i === active
                    ? 'bg-carbon text-cream border-carbon'
                    : 'bg-cream text-ink/60 border-faded hover:border-carbon hover:text-carbon'
                }`}
              >
                {useCase.title}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="border border-faded rounded-sm bg-cream overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* Cabecera del caso */}
                <div className="p-6 md:p-8 border-b border-faded">
                  <span className="inline-block font-body text-[10px] font-bold uppercase tracking-widest text-mist border border-faded px-2 py-0.5 rounded-sm mb-4">
                    {current.sector}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-carbon leading-tight mb-3">
                    {current.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-ink/70 leading-relaxed max-w-2xl">
                    {current.problem}
                  </p>
                </div>

                {/* Canvas de nodos */}
                <div
                  className="relative p-6 md:p-10 bg-parchment/60"
                  style={{
                    backgroundImage: 'radial-gradient(#C8C8C2 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                  }}
                >
                  <div className="relative flex flex-col md:flex-row md:items-stretch">
                    {current.nodes.map((node, i) => {
                      const style = kindStyles[node.kind]
                      return (
                        <Fragment key={`${current.id}-${node.label}`}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: i * 0.12, ease: 'easeOut' }}
                            className={`md:flex-1 bg-cream border border-faded border-l-[3px] rounded-sm px-4 py-3 shadow-sm ${style.edge}`}
                          >
                            <span className="flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-widest text-mist mb-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                              {style.label}
                            </span>
                            <span className="block font-body text-sm font-semibold text-carbon leading-snug">
                              {node.label}
                            </span>
                          </motion.div>

                          {/* Conector entre nodos */}
                          {i < current.nodes.length - 1 && (
                            <motion.span
                              aria-hidden
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
                              className="flex items-center justify-center self-center flex-shrink-0 h-6 w-full md:h-full md:w-10 md:py-0"
                            >
                              <span className="hidden md:block w-full h-[2px] bg-gradient-to-r from-electric to-violet rounded-sm" />
                              <span className="md:hidden w-[2px] h-full bg-gradient-to-b from-electric to-violet rounded-sm" />
                            </motion.span>
                          )}
                        </Fragment>
                      )
                    })}
                  </div>
                </div>

                {/* Resultados */}
                <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-t border-faded">
                  <div className="flex flex-wrap gap-8">
                    {current.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="font-display text-3xl text-carbon">{metric.value}</p>
                        <p className="font-body text-xs text-mist uppercase tracking-widest mt-1">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {current.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-body text-[11px] text-mist border border-faded px-2 py-0.5 rounded-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Mail } from 'lucide-react'
import Reveal from './Reveal'

const promises = [
  '30 minutos, sin compromiso ni presentación comercial',
  'Salimos con 3 procesos concretos priorizados por horas ahorradas',
  'Si no vemos recorrido, te lo decimos y ahí queda',
]

export default function FinalCTA() {
  return (
    <section className="section bg-parchment border-t border-faded" id="contacto">
      <div className="container-main">
        <Reveal>
          <div className="relative bg-carbon text-cream rounded-sm border border-carbon p-8 md:p-14 overflow-hidden">
            {/* Acentos */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-lime opacity-[0.08] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/4 w-64 h-64 bg-electric opacity-[0.16] rounded-full blur-3xl pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#FAF9F4 1px, transparent 1px)',
                backgroundSize: '26px 26px',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
              <div>
                <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-lime/70 border border-lime/30 px-3 py-1 rounded-sm mb-6">
                  Auditoría gratuita
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-4">
                  Cuéntanos qué tarea te está quitando más horas
                </h2>
                <p className="font-body text-sm md:text-base text-cream/55 leading-relaxed mb-8 max-w-lg">
                  En media hora revisamos tus procesos y te decimos qué se puede automatizar,
                  cuánto tiempo recuperarías y por dónde conviene empezar. Sin humo y sin
                  compromiso.
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="mailto:hola@lacasadelaia.com?subject=Auditor%C3%ADa%20gratuita%20de%20automatizaci%C3%B3n"
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="inline-flex items-center gap-2 font-body font-semibold text-sm bg-lime text-carbon border border-lime rounded-sm px-6 py-3.5 hover:bg-lime-hover transition-colors duration-150 group"
                  >
                    <CalendarCheck className="w-4 h-4" strokeWidth={1.8} aria-hidden />
                    Agendar la llamada
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </motion.a>

                  <a
                    href="mailto:hola@lacasadelaia.com"
                    className="inline-flex items-center gap-2 font-body font-semibold text-sm text-cream border border-cream/25 rounded-sm px-6 py-3.5 hover:bg-cream/10 transition-colors duration-150"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.8} aria-hidden />
                    hola@lacasadelaia.com
                  </a>
                </div>
              </div>

              <ul className="space-y-4 lg:border-l lg:border-cream/10 lg:pl-12">
                {promises.map((promise) => (
                  <li key={promise} className="flex gap-3 font-body text-sm text-cream/70 leading-relaxed">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-lime mt-[7px]" />
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

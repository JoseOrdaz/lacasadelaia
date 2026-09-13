'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import FlowCanvas from './FlowCanvas'

const stats = [
  { value: '4', label: 'Áreas automatizadas' },
  { value: '-12h', label: 'Semanales de media' },
  { value: '2-3', label: 'Semanas de puesta en marcha' },
  { value: '0€', label: 'Auditoría inicial' },
]

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden border-b border-faded">
      {/* Rejilla de puntos */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1A1A18 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Acentos de color */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-lime opacity-[0.12] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-electric opacity-[0.07] rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-main">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-8 items-center min-h-[88vh] lg:min-h-[82vh] py-16 md:py-20"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        >
          {/* ── Contenido ── */}
          <div className="lg:pr-12">
            <motion.div
              variants={rise}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 bg-lime-light border border-lime rounded-sm px-3 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-hover flex-shrink-0 animate-pulse" />
              <span className="font-body text-xs font-semibold text-carbon tracking-wide">
                Automatización de procesos con IA · Para pymes
              </span>
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-carbon leading-[1.04] mb-6 max-w-2xl"
            >
              Tu empresa hace a mano{' '}
              <span className="relative inline-block">
                lo que ya puede hacerse sola.
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-lime opacity-70 -z-10 rounded-sm" />
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-body text-lg md:text-xl text-ink/65 max-w-xl leading-relaxed mb-10"
            >
              Diseñamos e implementamos automatizaciones con n8n e IA que conectan tus
              herramientas, llevan tu Instagram, generan tus creatividades y se ocupan del
              papeleo. Tú te quedas con el trabajo que sí necesita a una persona.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link href="#contacto" className="btn-lime group">
                <CalendarCheck className="w-4 h-4" strokeWidth={1.8} aria-hidden />
                Auditoría gratuita
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </Link>
              <Link href="#servicios" className="btn-secondary">
                Ver qué automatizamos
              </Link>
            </motion.div>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-faded"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-carbon">{stat.value}</p>
                  <p className="font-body text-xs text-mist uppercase tracking-widest mt-1 max-w-[140px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Canvas de flujo ── */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative lg:pl-8 lg:border-l lg:border-faded"
          >
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-6 text-center lg:text-left">
              Así se ve por dentro
            </p>
            <FlowCanvas />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

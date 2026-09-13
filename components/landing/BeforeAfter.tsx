'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Clock, TrendingDown, TrendingUp } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

const rows = [
  { task: 'Alta y cualificación de un lead', manual: '12 min', auto: '8 s', gain: 99 },
  { task: 'Responder una consulta frecuente', manual: '6 min', auto: 'Instantáneo', gain: 100 },
  { task: 'Preparar creatividades de campaña', manual: '2 semanas', auto: '1 tarde', gain: 85 },
  { task: 'Emitir y enviar la facturación', manual: '3 días', auto: '20 min', gain: 96 },
  { task: 'Informe semanal de métricas', manual: '90 min', auto: 'Automático', gain: 100 },
]

const totals = [
  { icon: Clock, value: '12-18 h', label: 'Recuperadas cada semana' },
  { icon: TrendingDown, value: '-94%', label: 'Errores de transcripción' },
  { icon: TrendingUp, value: '3.2x', label: 'Capacidad sin contratar' },
]

export default function BeforeAfter() {
  const reduced = useReducedMotion()

  return (
    <section className="section bg-parchment border-y border-faded">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="Antes y después"
            title="El mismo trabajo, medido en horas"
            description="Tiempos medios reales de nuestros proyectos. La diferencia no es la velocidad de nadie: es que deja de haber alguien haciéndolo."
          />
        </Reveal>

        <Reveal>
          <div className="bg-cream border border-faded rounded-sm overflow-hidden">
            {/* Cabecera */}
            <div className="hidden sm:grid grid-cols-[1fr_120px_120px_1fr] gap-4 px-6 py-4 border-b border-faded bg-parchment/60">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-mist">
                Tarea
              </span>
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-mist">
                A mano
              </span>
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-electric">
                Automatizado
              </span>
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-mist">
                Tiempo eliminado
              </span>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.task}
                className="grid grid-cols-2 sm:grid-cols-[1fr_120px_120px_1fr] gap-x-4 gap-y-2 px-6 py-5 border-b border-faded last:border-b-0 items-center"
              >
                <p className="col-span-2 sm:col-span-1 font-body text-sm font-medium text-carbon">
                  {row.task}
                </p>
                <p className="font-body text-sm text-ink/50 line-through decoration-faded">
                  {row.manual}
                </p>
                <p className="font-body text-sm font-semibold text-carbon">{row.auto}</p>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                  <span className="flex-1 h-1.5 bg-parchment rounded-sm overflow-hidden">
                    <motion.span
                      className="block h-full bg-gradient-to-r from-electric to-violet rounded-sm"
                      initial={reduced ? false : { width: 0 }}
                      whileInView={{ width: `${row.gain}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
                    />
                  </span>
                  <span className="font-body text-xs font-bold text-electric w-10 text-right">
                    {row.gain}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Totales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {totals.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 90}>
              <div className="h-full bg-cream border border-faded rounded-sm p-6 flex items-center gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-sm bg-lime border border-carbon flex-shrink-0">
                  <Icon className="w-5 h-5 text-carbon" strokeWidth={1.7} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-2xl text-carbon leading-none">{value}</p>
                  <p className="font-body text-xs text-mist uppercase tracking-widest mt-1.5">
                    {label}
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

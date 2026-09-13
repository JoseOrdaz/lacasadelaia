'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Camera, FileText, Mail, MessageCircle, Sparkles, Table2, Users } from 'lucide-react'

/**
 * Canvas de nodos del Hero: tres entradas → motor de IA → tres salidas.
 * Las curvas se dibujan al montar y un pulso recorre cada conexión,
 * sugiriendo el flujo de un canvas tipo n8n sin salirse de la marca.
 */

const W = 360
const H = 404

const inputs = [
  { cx: 54, label: 'Formulario', Icon: FileText },
  { cx: 180, label: 'Instagram', Icon: Camera },
  { cx: 306, label: 'Email', Icon: Mail },
]

const outputs = [
  { cx: 54, label: 'CRM', Icon: Users },
  { cx: 180, label: 'WhatsApp', Icon: MessageCircle },
  { cx: 306, label: 'Sheets', Icon: Table2 },
]

const IN_Y = 46
const HUB_Y = 202
const OUT_Y = 358
const NODE_W = 96
const NODE_H = 44

/** Curva en S entre el borde inferior de un nodo y el borde superior del siguiente. */
function link(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
}

const inLinks = inputs.map((n) => link(n.cx, IN_Y + NODE_H / 2, 180, HUB_Y - 30))
const outLinks = outputs.map((n) => link(180, HUB_Y + 30, n.cx, OUT_Y - NODE_H / 2))
const allLinks = [...inLinks, ...outLinks]

export default function FlowCanvas() {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Halo de acento eléctrico detrás del canvas */}
      <div className="absolute inset-6 bg-gradient-to-br from-electric/10 via-violet/10 to-lime/20 blur-2xl rounded-full pointer-events-none" />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full h-auto"
        role="img"
        aria-label="Diagrama de un flujo de automatización: formulario, Instagram y email entran en un motor de IA que escribe en CRM, WhatsApp y hojas de cálculo."
      >
        <defs>
          <linearGradient id="flow-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4C5BF5" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7C4DF0" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="flow-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4C5BF5" />
            <stop offset="100%" stopColor="#7C4DF0" />
          </linearGradient>
        </defs>

        {/* Conexiones */}
        {allLinks.map((d, i) => (
          <g key={d}>
            <motion.path
              d={d}
              fill="none"
              stroke="url(#flow-edge)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: 'easeInOut' }}
            />
            {!reduced && (
              <circle r="3" fill="#4C5BF5">
                <animateMotion
                  dur="2.6s"
                  begin={`${1.4 + i * 0.22}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="2.6s"
                  begin={`${1.4 + i * 0.22}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* Nodos de entrada y salida */}
        {[
          ...inputs.map((n) => ({ ...n, y: IN_Y, delay: 0.15 })),
          ...outputs.map((n) => ({ ...n, y: OUT_Y, delay: 1.05 })),
        ].map(({ cx, y, label, Icon, delay }, i) => (
          <motion.g
            key={`${label}-${y}`}
            initial={reduced ? false : { opacity: 0, y: y > HUB_Y ? 12 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay + (i % 3) * 0.1, ease: 'easeOut' }}
          >
            <rect
              x={cx - NODE_W / 2}
              y={y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="4"
              fill="#FAF9F4"
              stroke="#C8C8C2"
            />
            <foreignObject x={cx - NODE_W / 2} y={y - NODE_H / 2} width={NODE_W} height={NODE_H}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                <Icon className="w-3.5 h-3.5 text-electric" strokeWidth={1.8} aria-hidden />
                <span className="font-body text-[10px] font-semibold text-ink/70 leading-none">
                  {label}
                </span>
              </div>
            </foreignObject>
          </motion.g>
        ))}

        {/* Motor central */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: `180px ${HUB_Y}px` }}
        >
          <rect x="100" y={HUB_Y - 30} width="160" height="60" rx="6" fill="url(#flow-hub)" />
          <rect
            x="100"
            y={HUB_Y - 30}
            width="160"
            height="60"
            rx="6"
            fill="none"
            stroke="#1A1A18"
            strokeOpacity="0.12"
          />
          <foreignObject x="100" y={HUB_Y - 30} width="160" height="60">
            <div className="w-full h-full flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.8} aria-hidden />
              <span className="font-body text-xs font-semibold text-white tracking-wide">
                Tu flujo con IA
              </span>
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  )
}

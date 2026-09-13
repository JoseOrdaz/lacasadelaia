'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /** 'up' desplaza en vertical; 'fade' solo opacidad. */
  variant?: 'up' | 'fade'
}

export default function Reveal({ children, delay = 0, className, variant = 'up' }: RevealProps) {
  const reduced = useReducedMotion()
  const offset = variant === 'up' && !reduced ? 24 : 0

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

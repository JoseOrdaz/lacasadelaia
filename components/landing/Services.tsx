'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Camera, ImageIcon, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Service, ServiceIcon } from '@/types'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

const iconMap: Record<ServiceIcon, LucideIcon> = {
  workflow: Workflow,
  instagram: Camera,
  image: ImageIcon,
  building: Building2,
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="section" id="servicios">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="Qué automatizamos"
            title="Cuatro frentes, un mismo objetivo"
            description="Cada pilar se puede contratar por separado o combinar. Empezamos por el que más tiempo te está costando hoy."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Workflow
            return (
              <Reveal key={service.id} delay={i * 90}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group relative h-full flex flex-col bg-cream border border-faded rounded-sm p-6 md:p-8 overflow-hidden hover:border-carbon hover:shadow-card transition-[border-color,box-shadow] duration-200"
                >
                  {/* Acento eléctrico al pasar el ratón */}
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-electric via-violet to-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="flex items-center justify-center w-11 h-11 rounded-sm bg-electric-soft border border-electric/20 mb-5">
                    <Icon className="w-5 h-5 text-electric" strokeWidth={1.7} aria-hidden />
                  </span>

                  <h3 className="font-display text-2xl text-carbon leading-tight mb-1.5">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm font-semibold text-electric mb-4">
                    {service.tagline}
                  </p>
                  <p className="font-body text-sm text-ink/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 font-body text-sm text-ink/75">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-lime mt-[7px]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="mt-auto inline-flex items-center gap-1.5 font-body text-sm font-semibold text-carbon border-t border-faded pt-4 w-full hover:text-electric transition-colors duration-150"
                  >
                    Ver cómo lo hacemos
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </Link>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

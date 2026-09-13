'use client'

import { Quote } from 'lucide-react'
import type { Testimonial } from '@/types'
import SectionTitle from '@/components/SectionTitle'
import Reveal from './Reveal'

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null

  return (
    <section className="section" id="testimonios">
      <div className="container-main">
        <Reveal>
          <SectionTitle
            label="Lo que dicen"
            title="Negocios que ya dejaron de hacerlo a mano"
            description="Pymes de sectores distintos con el mismo punto de partida: demasiadas horas en tareas que no dan dinero."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 90}>
              <figure className="h-full flex flex-col bg-cream border border-faded rounded-sm p-6 md:p-8 hover:border-carbon hover:shadow-card transition-all duration-200">
                <Quote
                  className="w-6 h-6 text-lime fill-lime mb-5 flex-shrink-0"
                  strokeWidth={1.4}
                  aria-hidden
                />

                <blockquote className="font-body text-base text-ink/80 leading-relaxed mb-6">
                  {testimonial.quote}
                </blockquote>

                <figcaption className="mt-auto pt-5 border-t border-faded flex items-center justify-between gap-4">
                  <div>
                    <p className="font-body text-sm font-semibold text-carbon">
                      {testimonial.author}
                    </p>
                    <p className="font-body text-xs text-mist mt-0.5">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                  <span className="font-body text-[11px] font-bold text-electric bg-electric-soft border border-electric/20 px-2.5 py-1 rounded-sm whitespace-nowrap">
                    {testimonial.result}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

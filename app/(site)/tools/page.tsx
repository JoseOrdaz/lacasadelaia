import type { Metadata } from 'next'
import { getAllTools } from '@/lib/payload'
import type { ToolCategory } from '@/types'
import Image from 'next/image'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: 'Directorio de herramientas de IA',
  description:
    'Las mejores herramientas de inteligencia artificial para escritura, imagen, productividad, automatización, marketing y código.',
  alternates: { canonical: '/tools' },
}

export default async function ToolsPage() {
  const tools = await getAllTools()
  const categories = [...new Set(tools.map((t) => t.category))] as ToolCategory[]

  return (
    <div className="bg-cream min-h-screen">
      <div className="border-b border-faded bg-parchment">
        <div className="container-main tools-hero-grid py-10 md:py-14">
          <div>
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
              Directorio · {tools.length} recursos
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-carbon leading-tight mb-4">
              Menos ruido.<br /><em>Mejores herramientas.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
              Una selección curada para escribir, investigar, crear, automatizar y construir. Elige por el problema que quieres resolver, no por la moda del momento.
            </p>
          </div>
          <div className="tools-hero-art">
            <Image
              src="/tools/directory-still-life.png"
              alt="Tarjetas y objetos de una mesa de trabajo para seleccionar herramientas"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 430px"
            />
            <span>SELECCIÓN CURADA / 01</span>
          </div>
        </div>
      </div>

      <ToolsClient tools={tools} categories={categories} />
    </div>
  )
}

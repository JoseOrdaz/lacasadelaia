import type { Metadata } from 'next'
import { getAllTools } from '@/lib/payload'
import type { ToolCategory } from '@/types'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: 'Directorio de herramientas de IA',
  description:
    'Las mejores herramientas de inteligencia artificial para escritura, imagen, productividad, automatización, marketing y código.',
}

export default async function ToolsPage() {
  const tools = await getAllTools()
  const categories = [...new Set(tools.map((t) => t.category))] as ToolCategory[]

  return (
    <div className="bg-cream min-h-screen">
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Directorio
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4">
            {tools.length} herramientas de IA
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Una selección curada de herramientas que realmente aportan en el trabajo diario.
            Sin rankings patrocinados ni listicles de 200 entradas.
          </p>
        </div>
      </div>

      <ToolsClient tools={tools} categories={categories} />
    </div>
  )
}

import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: 'Directorio de herramientas de IA | La Casa de la IA',
  description:
    'Las 20 mejores herramientas de inteligencia artificial para escritura, imagen, productividad, automatización, marketing y código.',
}

export default function ToolsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-16">
          <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
            Directorio
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-4">
            20 herramientas de IA
          </h1>
          <p className="font-body text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
            Una selección curada de herramientas que realmente aportan en el trabajo diario.
            Sin rankings patrocinados ni listicles de 200 entradas.
          </p>
        </div>
      </div>

      <ToolsClient />
    </div>
  )
}

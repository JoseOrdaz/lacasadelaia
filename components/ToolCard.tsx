import type { Tool } from '@/types'
import CategoryPill from './CategoryPill'

interface ToolCardProps {
  tool: Tool
}

const badgeStyles: Record<Tool['badge'], string> = {
  Gratis: 'bg-lime text-carbon border-lime',
  Freemium: 'bg-lime-light text-carbon border-lime-light',
  Pago: 'bg-carbon text-cream border-carbon',
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="group relative bg-cream border border-carbon rounded-sm shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display text-xl text-carbon leading-tight">{tool.name}</h3>
          <span className={`shrink-0 text-xs font-body font-bold tracking-wide px-2.5 py-1 rounded-sm border ${badgeStyles[tool.badge]}`}>
            {tool.badge}
          </span>
        </div>

        <CategoryPill category={tool.category} />

        <p className="font-body text-sm text-ink/70 leading-relaxed mt-3 mb-4 flex-1">
          {tool.description}
        </p>

        <div className="border-t border-faded pt-4">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-mist mb-1">Caso de uso</p>
          <p className="text-sm font-body text-ink/80 leading-snug">{tool.useCase}</p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-sm font-body font-semibold text-carbon border border-carbon rounded-sm py-2.5 hover:bg-carbon hover:text-cream transition-colors duration-150"
        >
          Visitar herramienta →
        </a>
      </div>
    </article>
  )
}

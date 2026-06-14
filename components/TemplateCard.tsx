'use client'

import type { Template } from '@/types'

interface TemplateCardProps {
  template: Template
  expanded?: boolean
  onDownload?: (template: Template) => void
}

const formatIcon: Record<Template['format'], string> = {
  'PDF': '⬡',
  'Notion': '◻',
  'Google Docs': '◈',
  'Markdown': '◆',
}

const levelStyles: Record<Template['level'], string> = {
  Básico: 'text-carbon bg-lime-light border-lime',
  Medio: 'text-carbon bg-parchment border-faded',
  Avanzado: 'text-cream bg-ink border-ink',
}

export default function TemplateCard({ template, expanded = false, onDownload }: TemplateCardProps) {
  return (
    <article className="group bg-cream border border-carbon rounded-sm shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl leading-none mt-0.5 opacity-40">{formatIcon[template.format]}</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-mist">
                {template.format}
              </span>
              <span className={`text-xs font-body font-bold px-2 py-0.5 rounded-sm border ${levelStyles[template.level]}`}>
                {template.level}
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl text-carbon leading-tight">{template.title}</h3>
          </div>
        </div>

        <p className="font-body text-sm text-ink/70 leading-relaxed mb-4 flex-1">{template.description}</p>

        {expanded && (
          <div className="space-y-4 border-t border-faded pt-4 mb-4">
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-mist mb-1.5">Problema que resuelve</p>
              <p className="text-sm font-body text-ink/80 leading-relaxed">{template.problem}</p>
            </div>
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-mist mb-1.5">Para quién es</p>
              <p className="text-sm font-body text-ink/80 leading-relaxed">{template.audience}</p>
            </div>
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-mist mb-1.5">Cómo usarla</p>
              <p className="text-sm font-body text-ink/80 leading-relaxed">{template.howToUse}</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={() => onDownload?.(template)}
          className="block w-full text-center text-sm font-body font-semibold bg-lime text-carbon border border-carbon rounded-sm py-2.5 hover:bg-lime-hover transition-colors duration-150"
        >
          Descargar plantilla →
        </button>
      </div>
    </article>
  )
}

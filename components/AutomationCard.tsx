import type { Automation } from '@/types'

const categoryColors: Record<string, string> = {
  Marketing: 'bg-carbon text-cream',
  Ventas: 'bg-lime text-carbon',
  Operaciones: 'bg-parchment text-ink border border-faded',
  'Atención al cliente': 'bg-parchment text-ink border border-faded',
  Finanzas: 'bg-parchment text-ink border border-faded',
  Comunicación: 'bg-parchment text-ink border border-faded',
}

const badgeColors: Record<string, string> = {
  'Más popular': 'bg-lime text-carbon',
  Nuevo: 'bg-carbon text-cream',
  Destacado: 'bg-lime-light text-carbon border border-lime',
}

export default function AutomationCard({ automation }: { automation: Automation }) {
  const subject = encodeURIComponent(`Solicitud: ${automation.title}`)
  const mailtoHref = `mailto:hola@lacasadelaia.com?subject=${subject}`

  return (
    <div className="relative flex flex-col bg-cream border border-faded rounded-sm p-6 hover:border-carbon hover:shadow-card transition-all duration-200">
      {automation.badge && (
        <span
          className={`absolute top-4 right-4 font-body text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${badgeColors[automation.badge] ?? 'bg-parchment text-ink'}`}
        >
          {automation.badge}
        </span>
      )}

      {/* Category + header */}
      <div className="mb-4">
        <span
          className={`inline-block font-body text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-3 ${categoryColors[automation.category] ?? 'bg-parchment text-ink border border-faded'}`}
        >
          {automation.category}
        </span>
        <h3 className="font-display text-xl text-carbon leading-tight pr-16">
          {automation.title}
        </h3>
      </div>

      <p className="font-body text-sm text-ink/70 leading-relaxed mb-4">
        {automation.description}
      </p>

      {/* Benefit callout */}
      <div className="bg-lime-light border-l-[3px] border-lime px-3 py-2 rounded-r-sm mb-4">
        <p className="font-body text-xs font-semibold text-carbon">{automation.benefit}</p>
      </div>

      {/* Tools used */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {automation.tools.map((tool) => (
          <span
            key={tool}
            className="font-body text-[11px] text-mist border border-faded px-2 py-0.5 rounded-sm"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-faded flex items-center justify-between gap-3">
        <span className="font-display text-lg text-carbon">{automation.price}</span>
        <a
          href={mailtoHref}
          className="font-body text-[13px] font-semibold bg-carbon text-cream px-4 py-2 rounded-sm hover:bg-ink transition-colors duration-150 whitespace-nowrap"
        >
          Solicitar →
        </a>
      </div>
    </div>
  )
}

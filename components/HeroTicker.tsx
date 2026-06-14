'use client'

interface TickerItem {
  type: 'automation' | 'news'
  label: string
  category: string
  saving?: string
}

const typeIcon: Record<string, string> = {
  automation: '⚡',
  news: '◎',
}

const typeColor: Record<string, string> = {
  automation: 'text-lime-hover',
  news: 'text-mist',
}

const items: TickerItem[] = [
  { type: 'automation', label: 'Leads cualificados solos', category: 'Ventas', saving: '-6h/sem' },
  { type: 'news', label: 'Automatizaciones reales para pymes', category: 'Casos prácticos' },
  { type: 'automation', label: 'Actas de reunión en 2 min', category: 'Operaciones', saving: '-4h/sem' },
  { type: 'automation', label: 'Posts programados toda la semana', category: 'Marketing', saving: '-3h/sem' },
  { type: 'news', label: 'Cómo elegir tu herramienta de IA', category: 'Guía práctica' },
  { type: 'automation', label: 'Follow-ups sin olvidar ninguno', category: 'Ventas', saving: '-2h/sem' },
  { type: 'automation', label: 'Informe semanal enviado solo', category: 'Reporting', saving: '-3h/sem' },
  { type: 'news', label: 'IA para equipos pequeños', category: 'Productividad' },
  { type: 'automation', label: 'Respuestas de soporte 24/7', category: 'Atención al cliente', saving: '-8h/sem' },
  { type: 'automation', label: 'Facturación al cerrar venta', category: 'Finanzas', saving: '-2h/sem' },
  { type: 'news', label: 'Errores comunes con IA en equipos', category: 'Aprendizaje' },
  { type: 'automation', label: 'Onboarding de clientes automático', category: 'Operaciones', saving: '-5h/sem' },
  { type: 'automation', label: 'Contenido adaptado por plataforma', category: 'Marketing', saving: '-4h/sem' },
  { type: 'news', label: 'IA para resumir reuniones', category: 'Productividad' },
  { type: 'automation', label: 'Alertas de pagos vencidos', category: 'Finanzas', saving: '-1h/sem' },
  { type: 'automation', label: 'Encuestas post-entrega procesadas', category: 'Cliente', saving: '-2h/sem' },
]

function TickerCard({ item }: { item: TickerItem }) {
  return (
    <div className="flex items-center gap-3 bg-cream border border-faded rounded-sm px-4 py-3 mb-3 hover:border-carbon hover:shadow-card transition-all duration-200 group cursor-default">
      <span className={`text-base leading-none flex-shrink-0 ${typeColor[item.type]}`}>
        {typeIcon[item.type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-carbon truncate group-hover:text-ink">
          {item.label}
        </p>
        <p className="font-body text-xs text-mist truncate">{item.category}</p>
      </div>
      {item.saving && (
        <span className="flex-shrink-0 font-body text-[11px] font-bold text-carbon bg-lime px-2 py-0.5 rounded-sm">
          {item.saving}
        </span>
      )}
    </div>
  )
}

export default function HeroTicker() {
  const doubled = [...items, ...items]

  return (
    <div className="relative h-full overflow-hidden ticker-pause select-none" aria-hidden="true">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-cream to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent z-10 pointer-events-none" />

      <div className="ticker-inner animate-ticker-y">
        {doubled.map((item, i) => (
          <TickerCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

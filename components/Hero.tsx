import Link from 'next/link'
import HeroTicker from './HeroTicker'

export default function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden border-b border-faded">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1A1A18 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Lime accent blobs */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-lime opacity-[0.12] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-lime opacity-[0.08] rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 min-h-[88vh] lg:min-h-[80vh] items-center">

          {/* ── LEFT: Content ── */}
          <div className="py-16 md:py-20 lg:py-24 pr-0 lg:pr-16">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-lime-light border border-lime rounded-sm px-3 py-1.5 mb-8"
              style={{ animation: 'slideUp 0.5s ease-out 0.1s both' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-hover flex-shrink-0 animate-pulse" />
              <span className="font-body text-xs font-semibold text-carbon tracking-wide">
                Automatizaciones con IA · Para pymes y freelancers
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl text-carbon leading-[1.04] mb-6 max-w-2xl"
              style={{ animation: 'slideUp 0.6s ease-out 0.2s both' }}
            >
              Automatiza lo repetitivo.{' '}
              <span className="relative inline-block">
                Enfócate en crecer.
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-lime opacity-70 -z-10 rounded-sm" />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="font-body text-lg md:text-xl text-ink/65 max-w-lg leading-relaxed mb-10"
              style={{ animation: 'slideUp 0.6s ease-out 0.35s both' }}
            >
              Diseñamos e implementamos automatizaciones con IA para que tu negocio
              trabaje solo en las tareas que más tiempo te roban.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 mb-14"
              style={{ animation: 'slideUp 0.6s ease-out 0.45s both' }}
            >
              <Link href="/automations" className="btn-lime">
                Ver automatizaciones
              </Link>
              <Link href="/newsletter" className="btn-secondary">
                Recursos gratis
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-8 pt-8 border-t border-faded"
              style={{ animation: 'slideUp 0.6s ease-out 0.55s both' }}
            >
              {[
                { value: '6+', label: 'Automatizaciones' },
                { value: '-10h', label: 'Ahorradas/semana' },
                { value: 'Días', label: 'Para ver resultados' },
                { value: '0€', label: 'Consulta inicial' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-carbon">{stat.value}</p>
                  <p className="font-body text-xs text-mist uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Ticker feed ── */}
          <div
            className="hidden lg:block relative h-full py-8"
            style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}
          >
            {/* Vertical divider */}
            <div className="absolute left-0 top-8 bottom-8 w-px bg-faded" />

            {/* Header label */}
            <div className="pl-8 mb-4">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist">
                En marcha ahora
              </p>
            </div>

            {/* Ticker */}
            <div className="pl-8 h-[calc(80vh-120px)]">
              <HeroTicker />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

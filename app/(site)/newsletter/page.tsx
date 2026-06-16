import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'Newsletter de IA para profesionales | La Casa de la IA',
  description:
    'Suscríbete y recibe una idea práctica de IA cada semana. Herramientas, plantillas y flujos de trabajo sin humo.',
}

const contentExamples = [
  {
    week: 'Semana 01',
    topic: 'Cómo resumir reuniones con IA en 2 minutos',
    category: 'Productividad',
  },
  {
    week: 'Semana 02',
    topic: '5 prompts para escribir propuestas comerciales que conviertan',
    category: 'Ventas',
  },
  {
    week: 'Semana 03',
    topic: 'Make vs Zapier: cuál elegir según tu caso de uso',
    category: 'Automatización',
  },
  {
    week: 'Semana 04',
    topic: 'El flujo de trabajo para crear contenido SEO con IA en 45 min',
    category: 'Marketing',
  },
]

const benefits = [
  {
    icon: '◆',
    title: 'Una idea, un recurso',
    description: 'Cada entrega tiene una sola cosa aplicable. Nada de newsletter de 40 ítems que no terminas de leer.',
  },
  {
    icon: '◈',
    title: 'Sin relleno',
    description: 'Si no hay nada útil que contar esa semana, no enviamos. Preferimos calidad a constancia vacía.',
  },
  {
    icon: '◉',
    title: 'Para el trabajo real',
    description: 'Todo pasa por el filtro de "¿esto lo aplicaría yo mañana?". Si no, no entra.',
  },
]

export default function NewsletterPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="border-b border-faded bg-parchment">
        <div className="container-main py-12 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-mist border border-faded px-3 py-1 rounded-sm mb-4">
              Newsletter semanal
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-6">
              Una idea práctica de IA,{' '}
              <span className="relative inline-block">
                cada semana
                <span className="absolute -bottom-1 left-0 w-full h-2.5 bg-lime opacity-60 -z-10" />
              </span>
            </h1>
            <p className="font-body text-base md:text-lg text-ink/70 leading-relaxed mb-8">
              Sin humo. Sin promesas mágicas. Solo herramientas, prompts y flujos de trabajo
              que puedes aplicar de verdad en tu trabajo.
            </p>

            <div className="bg-cream border border-carbon rounded-sm p-6 shadow-card max-w-md">
              <p className="font-body text-sm font-semibold text-carbon mb-4">
                Únete a los primeros suscriptores
              </p>
              <NewsletterForm variant="page" />
              <p className="mt-3 font-body text-xs text-mist">
                Sin spam. Gratis para siempre. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="section border-b border-faded">
        <div className="container-main">
          <h2 className="font-display text-2xl md:text-3xl text-carbon mb-10">
            Por qué merece la pena suscribirse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-parchment border border-faded rounded-sm p-6">
                <span className="text-2xl text-carbon/20 block mb-4">{b.icon}</span>
                <h3 className="font-display text-lg text-carbon mb-2">{b.title}</h3>
                <p className="font-body text-sm text-ink/70 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content examples */}
      <div className="section">
        <div className="container-main">
          <h2 className="font-display text-2xl md:text-3xl text-carbon mb-3">
            Ejemplos de contenido
          </h2>
          <p className="font-body text-sm text-ink/70 mb-10 max-w-md">
            Esto es lo que recibirías en las primeras semanas. Temas reales, aplicables, sin teoría vacía.
          </p>

          <div className="space-y-3 max-w-xl">
            {contentExamples.map((item) => (
              <div
                key={item.week}
                className="flex items-center gap-4 bg-parchment border border-faded rounded-sm p-4 hover:border-carbon transition-colors duration-150"
              >
                <div className="shrink-0 font-body text-xs font-semibold text-mist uppercase tracking-widest w-20">
                  {item.week}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-carbon font-medium leading-snug">{item.topic}</p>
                </div>
                <span className="shrink-0 font-body text-xs text-mist border border-faded px-2 py-1 rounded-sm">
                  {item.category}
                </span>
              </div>
            ))}
          </div>

          {/* Frequency note */}
          <div className="mt-12 max-w-xl">
            <div className="bg-lime-light border border-lime rounded-sm p-5">
              <p className="font-body text-sm text-carbon font-semibold mb-1">Frecuencia: 1 email por semana</p>
              <p className="font-body text-xs text-ink/70">
                Generalmente los jueves por la mañana. Si alguna semana no hay nada útil que contar,
                no enviamos. Preferimos tu atención a tu bandeja de entrada saturada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-carbon py-16 md:py-20">
        <div className="container-main text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            ¿Lo dicho convence?
          </h2>
          <p className="font-body text-sm text-cream/60 mb-8 max-w-sm mx-auto">
            Apúntate ahora y recibe la próxima entrega el jueves.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <NewsletterForm variant="default" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

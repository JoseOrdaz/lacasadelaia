import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import AutomationCard from '@/components/AutomationCard'
import ToolCard from '@/components/ToolCard'
import NewsCard from '@/components/NewsCard'
import NewsletterForm from '@/components/NewsletterForm'
import AnimatedReveal from '@/components/AnimatedReveal'
import { getFeaturedAutomations, getFeaturedNews, getFeaturedTools } from '@/lib/payload'

const whyAutomate = [
  {
    icon: '⚡',
    title: 'Tiempo recuperado de verdad',
    description:
      'Las tareas repetitivas consumen entre 3 y 8 horas semanales por persona. Las automatizaciones las eliminan, no las delegan.',
  },
  {
    icon: '◎',
    title: 'Sin errores humanos',
    description:
      'Los procesos automatizados son consistentes. Sin olvidos, sin retrasos, sin copiar y pegar mal un dato crítico.',
  },
  {
    icon: '◈',
    title: 'Resultados en días, no en meses',
    description:
      'Implementamos automatizaciones con herramientas como Make, Zapier y ChatGPT. Sin código, sin meses de espera.',
  },
]

export default async function Home() {
  const [featuredAutomations, featuredNews, featuredTools] = await Promise.all([
    getFeaturedAutomations(),
    getFeaturedNews(),
    getFeaturedTools(),
  ])

  return (
    <>
      <Hero />

      {/* Why automate */}
      <section className="section bg-parchment border-y border-faded">
        <div className="container-main">
          <AnimatedReveal className="mb-10 md:mb-14">
            <SectionTitle
              label="Por qué automatizar"
              title="Tu equipo hace demasiado a mano"
              description="Si todavía copias datos entre herramientas, escribes actas a mano o haces seguimientos de memoria, tienes una oportunidad enorme."
            />
          </AnimatedReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyAutomate.map((item, i) => (
              <AnimatedReveal key={item.title} delay={i * 100}>
                <div className="bg-cream border border-faded rounded-sm p-6 md:p-8 h-full hover:border-carbon hover:shadow-card transition-all duration-200">
                  <span className="text-3xl block mb-4">{item.icon}</span>
                  <h3 className="font-display text-xl text-carbon mb-3 leading-tight">{item.title}</h3>
                  <p className="font-body text-sm text-ink/70 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Automations — the product */}
      <section className="section" id="automatizaciones">
        <div className="container-main">
          <AnimatedReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
              <SectionTitle
                label="Nuestras automatizaciones"
                title="Empieza a ahorrar tiempo esta semana"
                description="Automatizaciones listas para implementar en tu negocio. Personalizadas, sin código y con resultados rápidos."
              />
              <Link href="/automations" className="shrink-0 self-start sm:self-auto btn-secondary mb-0">
                Ver todas →
              </Link>
            </div>
          </AnimatedReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredAutomations.map((automation, i) => (
              <AnimatedReveal key={automation.id} delay={i * 90}>
                <AutomationCard automation={automation} />
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal className="mt-10 text-center">
            <Link href="/automations" className="btn-primary">
              Ver las 6 automatizaciones →
            </Link>
          </AnimatedReveal>
        </div>
      </section>

      {/* News */}
      <section className="section bg-parchment border-y border-faded">
        <div className="container-main">
          <AnimatedReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
              <SectionTitle
                label="Noticias sobre IA"
                title="Actualidad práctica"
                description="Lo que está pasando en IA explicado de forma útil, sin hype ni tecnicismos innecesarios."
              />
              <Link href="/news" className="shrink-0 self-start sm:self-auto btn-secondary mb-0">
                Ver todas →
              </Link>
            </div>
          </AnimatedReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredNews.map((item, i) => (
              <AnimatedReveal key={item.id} delay={i * 90}>
                <NewsCard news={item} />
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools — supporting resource */}
      <section className="section">
        <div className="container-main">
          <AnimatedReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
              <SectionTitle
                label="Herramientas útiles"
                title="Las mejores herramientas de IA"
                description="Una selección de recursos prácticos para complementar tus automatizaciones."
              />
              <Link href="/tools" className="shrink-0 self-start sm:self-auto btn-secondary mb-0">
                Ver directorio →
              </Link>
            </div>
          </AnimatedReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTools.slice(0, 3).map((tool, i) => (
              <AnimatedReveal key={tool.id} delay={i * 80}>
                <ToolCard tool={tool} />
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-parchment border-t border-faded">
        <div className="container-main">
          <AnimatedReveal>
            <div className="bg-carbon text-cream rounded-sm border border-carbon p-8 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-lime opacity-[0.07] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 left-1/4 w-48 h-48 bg-lime opacity-[0.05] rounded-full blur-2xl pointer-events-none" />

              <div className="relative max-w-lg">
                <span className="inline-block font-body text-xs font-semibold uppercase tracking-widest text-lime/70 border border-lime/30 px-3 py-1 rounded-sm mb-6">
                  Newsletter semanal
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight mb-4">
                  Una automatización nueva cada semana
                </h2>
                <p className="font-body text-sm md:text-base text-cream/55 leading-relaxed mb-8">
                  Ideas prácticas, herramientas y casos reales para ahorrar tiempo con IA.
                  Sin humo. Sin promesas mágicas.
                </p>
                <NewsletterForm variant="inline" />
                <p className="mt-4 font-body text-xs text-cream/30">
                  Sin spam. Cancela cuando quieras.
                </p>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  )
}

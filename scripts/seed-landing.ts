/**
 * Rellena solo las colecciones de la home de servicios (services, use-cases,
 * testimonials) sin tocar noticias, herramientas, plantillas ni automatizaciones.
 * Uso: npm run seed:landing
 *
 * Requiere MongoDB en marcha: docker compose up -d
 */
import { getPayload } from 'payload'
import type { SanitizedConfig } from 'payload'
import config from '../payload.config'
import { services } from '../data/services'
import { useCases } from '../data/use-cases'
import { testimonials } from '../data/testimonials'

async function seedLanding() {
  console.log('Conectando a Payload / MongoDB...')
  const payload = await getPayload({ config: (await config) as SanitizedConfig })

  console.log('\nLimpiando solo las colecciones de la landing...')
  await Promise.all([
    payload.delete({ collection: 'services', where: {} }),
    payload.delete({ collection: 'use-cases', where: {} }),
    payload.delete({ collection: 'testimonials', where: {} }),
  ])

  console.log('Seed: servicios...')
  for (const service of services) {
    await payload.create({
      collection: 'services',
      data: {
        title: service.title,
        slug: service.slug,
        tagline: service.tagline,
        description: service.description,
        icon: service.icon,
        bullets: service.bullets.map((text) => ({ text })),
        href: service.href,
        order: service.order,
      },
    })
  }
  console.log(`  ✓ ${services.length} servicios`)

  console.log('Seed: casos de uso...')
  for (const useCase of useCases) {
    await payload.create({
      collection: 'use-cases',
      data: {
        title: useCase.title,
        sector: useCase.sector,
        problem: useCase.problem,
        nodes: useCase.nodes,
        metrics: useCase.metrics,
        tools: useCase.tools.map((name) => ({ name })),
        order: useCase.order,
      },
    })
  }
  console.log(`  ✓ ${useCases.length} casos de uso`)

  console.log('Seed: testimonios...')
  for (const testimonial of testimonials) {
    await payload.create({
      collection: 'testimonials',
      data: {
        quote: testimonial.quote,
        author: testimonial.author,
        role: testimonial.role,
        company: testimonial.company,
        result: testimonial.result,
        order: testimonial.order,
      },
    })
  }
  console.log(`  ✓ ${testimonials.length} testimonios`)

  console.log('\n✅ Colecciones de la landing actualizadas.')
  process.exit(0)
}

seedLanding().catch((err) => {
  console.error('Error en el seed de la landing:', err)
  process.exit(1)
})

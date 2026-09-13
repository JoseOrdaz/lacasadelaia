/**
 * Migra los datos estáticos de /data a MongoDB vía Payload CMS.
 * Uso: npm run seed
 *
 * Requiere que MongoDB esté corriendo: docker compose up -d
 */
import path from 'path'
import { getPayload } from 'payload'
import type { SanitizedConfig } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import config from '../payload.config'
import { tools } from '../data/tools'
import { templates } from '../data/templates'
import { news } from '../data/news'
import { automations } from '../data/automations'
import { services } from '../data/services'
import { useCases } from '../data/use-cases'
import { testimonials } from '../data/testimonials'

async function seed() {
  console.log('Conectando a Payload / MongoDB...')
  const resolvedConfig = (await config) as SanitizedConfig
  const payload = await getPayload({ config: resolvedConfig })
  const editorConfig = await editorConfigFactory.default({ config: resolvedConfig })

  /* ── Limpiar colecciones ── */
  console.log('\nLimpiando colecciones existentes...')
  await Promise.all([
    payload.delete({ collection: 'media', where: {} }),
    payload.delete({ collection: 'tools', where: {} }),
    payload.delete({ collection: 'templates', where: {} }),
    payload.delete({ collection: 'news', where: {} }),
    payload.delete({ collection: 'automations', where: {} }),
    payload.delete({ collection: 'services', where: {} }),
    payload.delete({ collection: 'use-cases', where: {} }),
    payload.delete({ collection: 'testimonials', where: {} }),
  ])

  /* ── Herramientas ── */
  console.log('\nSeed: herramientas...')
  for (const tool of tools) {
    await payload.create({
      collection: 'tools',
      data: {
        name: tool.name,
        description: tool.description,
        category: tool.category,
        useCase: tool.useCase,
        url: tool.url,
        badge: tool.badge,
        featured: tool.featured,
      },
    })
  }
  console.log(`  ✓ ${tools.length} herramientas`)

  /* ── Plantillas ── */
  console.log('Seed: plantillas...')
  for (const template of templates) {
    await payload.create({
      collection: 'templates',
      data: {
        title: template.title,
        description: template.description,
        format: template.format,
        level: template.level,
        problem: template.problem,
        audience: template.audience,
        howToUse: template.howToUse,
      },
    })
  }
  console.log(`  ✓ ${templates.length} plantillas`)

  /* ── Noticias ── */
  console.log('Seed: noticias...')
  for (const article of news) {
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: article.imageAlt,
      },
      filePath: path.resolve(process.cwd(), 'public', article.image.replace(/^\//, '')),
    })

    const lexicalContent = convertHTMLToLexical({
      editorConfig,
      html: article.content,
      JSDOM,
    })

    await payload.create({
      collection: 'news',
      data: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        image: media.id,
        imageAlt: article.imageAlt,
        content: lexicalContent,
        keyIdea: article.keyIdea,
        date: article.date,
        tags: article.tags,
        readTime: article.readTime,
        featured: article.featured,
      },
    })
  }
  console.log(`  ✓ ${news.length} artículos`)

  /* ── Automatizaciones ── */
  console.log('Seed: automatizaciones...')
  for (const automation of automations) {
    await payload.create({
      collection: 'automations',
      data: {
        title: automation.title,
        description: automation.description,
        problem: automation.problem,
        tools: automation.tools.map((name) => ({ name })),
        category: automation.category,
        price: automation.price,
        badge: automation.badge ?? null,
        benefit: automation.benefit,
        featured: automation.featured,
      },
    })
  }
  console.log(`  ✓ ${automations.length} automatizaciones`)

  /* ── Servicios ── */
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

  /* ── Casos de uso ── */
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

  /* ── Testimonios ── */
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

  console.log('\n✅ Seed completado correctamente.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error en el seed:', err)
  process.exit(1)
})

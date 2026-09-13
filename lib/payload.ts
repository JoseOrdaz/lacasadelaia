import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type {
  Tool,
  Template,
  NewsItem,
  Automation,
  Service,
  UseCase,
  Testimonial,
} from '@/types'
import { newsContentToHTML } from '@/lib/news-content'

async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

/* ── Mappers ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTool(doc: any): Tool {
  return {
    id: String(doc.id),
    name: doc.name,
    description: doc.description,
    category: doc.category,
    useCase: doc.useCase,
    url: doc.url,
    badge: doc.badge,
    featured: doc.featured ?? false,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTemplate(doc: any): Template {
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description,
    format: doc.format,
    level: doc.level,
    problem: doc.problem,
    audience: doc.audience,
    howToUse: doc.howToUse,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNews(doc: any): NewsItem {
  const image = doc.image
  const imageUrl =
    typeof image === 'string'
      ? image
      : image?.url || image?.sizes?.card?.url || '/news/tool-selection.svg'
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: imageUrl,
    imageAlt: doc.imageAlt || image?.alt || doc.title,
    content: doc.content_html ?? newsContentToHTML(doc.content),
    keyIdea: doc.keyIdea,
    date: doc.date,
    tags: doc.tags ?? [],
    readTime: doc.readTime,
    featured: doc.featured ?? false,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAutomation(doc: any): Automation {
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description,
    problem: doc.problem,
    tools: (doc.tools ?? []).map((t: { name: string }) => t.name),
    category: doc.category,
    price: doc.price,
    badge: doc.badge,
    benefit: doc.benefit,
    featured: doc.featured ?? false,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(doc: any): Service {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    tagline: doc.tagline,
    description: doc.description,
    icon: doc.icon,
    bullets: (doc.bullets ?? []).map((b: { text: string }) => b.text),
    href: doc.href,
    order: doc.order ?? 0,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUseCase(doc: any): UseCase {
  return {
    id: String(doc.id),
    title: doc.title,
    sector: doc.sector,
    problem: doc.problem,
    nodes: (doc.nodes ?? []).map((n: { label: string; kind: UseCase['nodes'][number]['kind'] }) => ({
      label: n.label,
      kind: n.kind,
    })),
    metrics: (doc.metrics ?? []).map((m: { value: string; label: string }) => ({
      value: m.value,
      label: m.label,
    })),
    tools: (doc.tools ?? []).map((t: { name: string }) => t.name),
    order: doc.order ?? 0,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTestimonial(doc: any): Testimonial {
  return {
    id: String(doc.id),
    quote: doc.quote,
    author: doc.author,
    role: doc.role,
    company: doc.company,
    result: doc.result,
    order: doc.order ?? 0,
  }
}

/* ── Query helpers ── */

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
  return docs.map(mapService)
}

export async function getUseCases(): Promise<UseCase[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'use-cases', sort: 'order', limit: 20 })
  return docs.map(mapUseCase)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'testimonials', sort: 'order', limit: 20 })
  return docs.map(mapTestimonial)
}

export async function getFeaturedAutomations(): Promise<Automation[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'automations',
    where: { featured: { equals: true } },
    limit: 6,
  })
  return docs.map(mapAutomation)
}

export async function getAllAutomations(): Promise<Automation[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'automations', limit: 100 })
  return docs.map(mapAutomation)
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'news', overrideAccess: false, draft: false,
    where: { featured: { equals: true } },
    sort: '-date',
    depth: 1,
    limit: 3,
  })
  return docs.map(mapNews)
}

export async function getAllNews(): Promise<NewsItem[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'news', overrideAccess: false, draft: false, sort: '-date', depth: 1, pagination: false })
  return docs.map(mapNews)
}

export const getNewsBySlug = cache(async (slug: string): Promise<NewsItem | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'news', overrideAccess: false, draft: false,
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ? mapNews(docs[0]) : null
})

export async function getAllNewsSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'news', overrideAccess: false, draft: false, pagination: false, depth: 0 })
  return docs.map((d) => d.slug as string)
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'tools',
    where: { featured: { equals: true } },
    limit: 6,
  })
  return docs.map(mapTool)
}

export async function getAllTools(): Promise<Tool[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'tools', limit: 200 })
  return docs.map(mapTool)
}

export async function getAllTemplates(): Promise<Template[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'templates', limit: 100 })
  return docs.map(mapTemplate)
}

export async function getProfilePhoto(): Promise<{ url: string; alt: string } | null> {
  try {
    const payload = await getPayloadClient()
    const profile = await payload.findGlobal({ slug: 'profile', depth: 1, overrideAccess: false })
    const photo = profile.photo as { url?: string; alt?: string } | undefined
    return photo?.url ? { url: photo.url, alt: photo.alt || 'El profesional detrás de La Casa de la IA' } : null
  } catch { return null }
}

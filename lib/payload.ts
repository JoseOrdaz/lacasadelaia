import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Tool, Template, NewsItem, Automation } from '@/types'

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
      : image?.sizes?.card?.url || image?.url || '/news/tool-selection.svg'
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: imageUrl,
    imageAlt: doc.imageAlt || image?.alt || doc.title,
    content: doc.content_html ?? doc.content ?? '',
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

/* ── Query helpers ── */

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
    collection: 'news',
    where: { featured: { equals: true } },
    sort: '-date',
    depth: 1,
    limit: 3,
  })
  return docs.map(mapNews)
}

export async function getAllNews(): Promise<NewsItem[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'news', sort: '-date', depth: 1, limit: 100 })
  return docs.map(mapNews)
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ? mapNews(docs[0]) : null
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'news', limit: 200, depth: 1 })
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

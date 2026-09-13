import type { MetadataRoute } from 'next'
import { getAllNewsSlugs } from '@/lib/payload'

export const revalidate = 60

const BASE_URL = 'https://lacasadelaia.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/automations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/tools`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/templates`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/newsletter`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  let newsRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllNewsSlugs()
    newsRoutes = slugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sin base de datos disponible el sitemap se sirve solo con las rutas fijas.
  }

  return [...staticRoutes, ...newsRoutes]
}

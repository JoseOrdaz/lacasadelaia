export type Badge = 'Gratis' | 'Freemium' | 'Pago'
export type TemplateFormat = 'PDF' | 'Notion' | 'Google Docs' | 'Markdown'
export type TemplateLevel = 'Básico' | 'Medio' | 'Avanzado'
export type ToolCategory =
  | 'Escritura'
  | 'Imagen'
  | 'Productividad'
  | 'Automatización'
  | 'Marketing'
  | 'Investigación'
  | 'Código'
  | 'Presentaciones'
  | 'Audio & Vídeo'

export type AutomationCategory =
  | 'Marketing'
  | 'Ventas'
  | 'Operaciones'
  | 'Atención al cliente'
  | 'Finanzas'
  | 'Comunicación'

export interface Automation {
  id: string
  title: string
  description: string
  problem: string
  tools: string[]
  category: AutomationCategory
  price: string
  badge?: 'Más popular' | 'Nuevo' | 'Destacado'
  benefit: string
  featured: boolean
}

export type NewsTag =
  | 'IA generativa'
  | 'Automatización'
  | 'Herramientas'
  | 'Productividad'
  | 'Marketing'
  | 'Desarrollo'

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  useCase: string
  url: string
  badge: Badge
  featured: boolean
}

export interface Template {
  id: string
  title: string
  description: string
  format: TemplateFormat
  level: TemplateLevel
  problem: string
  audience: string
  howToUse: string
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  content: string
  keyIdea: string
  date: string
  tags: NewsTag[]
  readTime: string
  featured: boolean
}

/* ── Servicios (los 4 pilares) ───────────────────────────────────── */

export type ServiceIcon = 'workflow' | 'instagram' | 'image' | 'building'

export interface Service {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  icon: ServiceIcon
  bullets: string[]
  href: string
  order: number
}

/* ── Casos de uso (canvas de nodos) ──────────────────────────────── */

export type UseCaseNodeKind = 'trigger' | 'action' | 'ai' | 'output'

export interface UseCaseNode {
  label: string
  kind: UseCaseNodeKind
}

export interface UseCaseMetric {
  value: string
  label: string
}

export interface UseCase {
  id: string
  title: string
  sector: string
  problem: string
  nodes: UseCaseNode[]
  metrics: UseCaseMetric[]
  tools: string[]
  order: number
}

/* ── Testimonios ─────────────────────────────────────────────────── */

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  result: string
  order: number
}

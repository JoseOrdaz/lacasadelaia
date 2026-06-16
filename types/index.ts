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

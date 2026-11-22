export const LEAD_SOURCES = ['newsletter', 'template', 'web-audit', 'training'] as const
export type LeadSource = (typeof LEAD_SOURCES)[number]

const labels: Record<LeadSource, string> = {
  newsletter: 'Newsletter + guía',
  template: 'Plantilla',
  'web-audit': 'Analizador web IA',
  training: 'Formación',
}

/** Valida un alta corta (solo email) de newsletter, plantillas, analizador o formación. */
export function validateLead(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const data = value as Record<string, unknown>
  if (typeof data.email !== 'string' || typeof data.source !== 'string') return null
  const email = data.email.trim().toLowerCase()
  const source = data.source as LeadSource
  const detail = typeof data.detail === 'string' ? data.detail.trim().slice(0, 1500) : ''
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !LEAD_SOURCES.includes(source) || data.privacy !== true) return null
  return {
    name: email.split('@')[0].slice(0, 100) || 'Sin nombre',
    email,
    source,
    message: `[${labels[source]}] ${detail || 'Alta sin detalle adicional.'}`,
  }
}

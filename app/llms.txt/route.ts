import { sectors, audit, maintenancePlans, training } from '@/data/offers'
import { automations } from '@/data/automations'

const BASE = 'https://lacasadelaia.com'

export function GET() {
  const body = [
    '# La Casa de la IA',
    '',
    '> Automatización de tareas y procesos con IA, n8n e integraciones para empresas y particulares en España. Más de 15 años desarrollando soluciones tecnológicas, con trato directo de principio a fin.',
    '',
    '## Servicios',
    `- [Automatización con IA y n8n](${BASE}/#soluciones): automatizaciones, integraciones entre aplicaciones y desarrollo a medida.`,
    `- [Precios orientativos](${BASE}/#precios): ${automations.filter((a) => a.featured).map((a) => `${a.title} (${a.price.toLowerCase()})`).join('; ')}.`,
    `- [Mantenimiento](${BASE}/#mantenimiento): ${maintenancePlans.map((p) => `${p.name} ${p.price}`).join('; ')}.`,
    `- [${audit.title}](${BASE}/#diagnostico): ${audit.duration}, ${audit.price.toLowerCase()}.`,
    `- [Analizador gratuito de preparación para IA](${BASE}/auditoria-ia): comprueba si los asistentes de IA pueden encontrar y entender una web.`,
    `- [Formación](${BASE}/formacion): ${training.workshop.title} y formación para equipos.`,
    '',
    '## Por sector',
    ...sectors.map((s) => `- [${s.title}](${BASE}/automatizacion/${s.slug}): ${s.intro}`),
    '',
    '## Recursos',
    `- [Descubre qué automatizar](${BASE}/descubre)`,
    `- [Blog](${BASE}/blog)`,
    `- [Directorio de herramientas de IA](${BASE}/tools)`,
    `- [Plantillas](${BASE}/templates)`,
    '',
    '## Contacto',
    `- Email: hola@lacasadelaia.com`,
    `- Formulario: ${BASE}/#contacto`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

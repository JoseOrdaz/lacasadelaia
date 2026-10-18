import { createHash } from 'node:crypto'

export const SITE_URL = 'https://lacasadelaia.com'

const skillDocuments = [
  {
    name: 'discover-services',
    description: 'Find the automation, AI and integration services published by La Casa de la IA.',
    content: `---
name: discover-services
description: Find the automation, AI and integration services published by La Casa de la IA.
---

# Discover services

Use the public catalog at [Automatizaciones](${SITE_URL}/automations), [Herramientas](${SITE_URL}/tools), and [Plantillas](${SITE_URL}/templates) to find published capabilities.

For a tailored recommendation, use the [discovery questionnaire](${SITE_URL}/descubre).
`,
  },
  {
    name: 'request-automation-consultation',
    description: 'Explain an automation problem and find the public contact channel for a consultation.',
    content: `---
name: request-automation-consultation
description: Explain an automation problem and find the public contact channel for a consultation.
---

# Request an automation consultation

Read the [contact instructions](${SITE_URL}/#contacto) and ask the user before sending any personal information. The public contact endpoint is documented at [${SITE_URL}/api/openapi](${SITE_URL}/api/openapi).
`,
  },
] as const

export function getAgentSkillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: skillDocuments.map(({ name, description }) => ({
      name,
      type: 'skill-md',
      description,
      url: `${SITE_URL}/.well-known/agent-skills/${name}/SKILL.md`,
      digest: `sha256:${createHash('sha256').update(skillDocuments.find((skill) => skill.name === name)?.content ?? '').digest('hex')}`,
    })),
  }
}

export function getSkillDocument(name: string) {
  return skillDocuments.find((skill) => skill.name === name)?.content
}

export function getApiCatalog() {
  return {
    linkset: [
      {
        anchor: `${SITE_URL}/api/contact`,
        'service-desc': [{ href: `${SITE_URL}/api/openapi`, type: 'application/json' }],
        'service-doc': [{ href: `${SITE_URL}/#contacto`, type: 'text/html' }],
        status: [{ href: `${SITE_URL}/api/health`, type: 'application/json' }],
      },
    ],
  }
}

export function getAgentCatalog() {
  return {
    specVersion: '1.0',
    host: { displayName: 'La Casa de la IA', documentationUrl: SITE_URL },
    entries: [
      {
        identifier: 'urn:air:lacasadelaia.com:services:automation-directory',
        displayName: 'Automation directory',
        type: 'text/html',
        url: `${SITE_URL}/automations`,
        description: 'Public directory of automation services.',
        capabilities: ['automation-discovery'],
        representativeQueries: ['What automation services are available?', 'Find an AI workflow for a business process.'],
      },
      {
        identifier: 'urn:air:lacasadelaia.com:services:tool-directory',
        displayName: 'Tool directory',
        type: 'text/html',
        url: `${SITE_URL}/tools`,
        description: 'Public directory of tools for AI, automation and integrations.',
        capabilities: ['tool-discovery'],
        representativeQueries: ['Which tools can connect my workflow?', 'Find an integration tool for this process.'],
      },
      {
        identifier: 'urn:air:lacasadelaia.com:apis:contact',
        displayName: 'Contact inquiry API',
        type: 'application/json',
        url: `${SITE_URL}/api/contact`,
        description: 'Public contact inquiry endpoint documented by OpenAPI.',
        capabilities: ['contact-inquiry'],
        representativeQueries: ['How can I contact La Casa de la IA?', 'Where can I request an automation consultation?'],
      },
    ],
  }
}

const markdownPages: Record<string, string> = {
  '/': `# La Casa de la IA

Automatización con IA, n8n e integraciones para empresas y particulares en España.

## Recursos

- [Descubre qué automatizar](${SITE_URL}/descubre)
- [Automatizaciones](${SITE_URL}/automations)
- [Herramientas](${SITE_URL}/tools)
- [Plantillas](${SITE_URL}/templates)
- [Blog](${SITE_URL}/blog)
- [Contacto](${SITE_URL}/#contacto)
`,
  '/automations': `# Automatizaciones

Catálogo de automatizaciones listas para adaptar a la forma de trabajar de cada negocio.

[Ver automatizaciones](${SITE_URL}/automations)
`,
  '/tools': `# Herramientas

Directorio de herramientas para IA, automatización, integraciones y trabajo diario.

[Explorar herramientas](${SITE_URL}/tools)
`,
  '/templates': `# Plantillas

Plantillas para poner en marcha procesos automatizados con menos trabajo repetitivo.

[Explorar plantillas](${SITE_URL}/templates)
`,
  '/descubre': `# Descubre qué automatizar

Cuestionario para identificar tareas repetitivas y oportunidades de automatización.

[Abrir el cuestionario](${SITE_URL}/descubre)
`,
  '/blog': `# Blog

Guías sobre automatización, IA aplicada a negocios e integraciones.

[Leer el blog](${SITE_URL}/blog)
`,
}

export function getMarkdown(pathname: string) {
  return markdownPages[pathname] ?? `# ${pathname === '/' ? 'La Casa de la IA' : pathname.slice(1)}

[Abrir esta página en HTML](${SITE_URL}${pathname})
`
}

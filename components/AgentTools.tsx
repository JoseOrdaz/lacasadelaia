'use client'

import { useEffect } from 'react'

export default function AgentTools() {
  useEffect(() => {
    const modelContext = (document as Document & { modelContext?: { registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => Promise<void> } }).modelContext
    if (!modelContext) return

    const controller = new AbortController()
    void modelContext.registerTool({
      name: 'get_la_casa_de_la_ia_resources',
      description: 'Returns public resources for finding AI automation, integration and development services from La Casa de la IA.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => ({
        resources: [
          { name: 'Automation directory', url: 'https://lacasadelaia.com/automations' },
          { name: 'Tool directory', url: 'https://lacasadelaia.com/tools' },
          { name: 'Discovery questionnaire', url: 'https://lacasadelaia.com/descubre' },
          { name: 'Contact', url: 'https://lacasadelaia.com/#contacto' },
        ],
      }),
    }, { signal: controller.signal }).catch(() => undefined)

    return () => controller.abort()
  }, [])

  return null
}

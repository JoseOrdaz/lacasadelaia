import type { CollectionConfig } from 'payload'

export const UseCases: CollectionConfig = {
  slug: 'use-cases',
  labels: { singular: 'Caso de uso', plural: 'Casos de uso' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sector', 'order'],
    description: 'Automatizaciones reales que se dibujan como flujo de nodos en la home.',
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'sector', type: 'text', required: true, label: 'Sector o tipo de negocio' },
    { name: 'problem', type: 'textarea', required: true, label: 'Problema de partida' },
    {
      name: 'nodes',
      type: 'array',
      label: 'Nodos del flujo',
      minRows: 2,
      maxRows: 6,
      admin: { description: 'En orden de ejecución. Se dibujan conectados en el canvas.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'action',
          options: [
            { label: 'Disparador', value: 'trigger' },
            { label: 'Acción', value: 'action' },
            { label: 'IA', value: 'ai' },
            { label: 'Salida', value: 'output' },
          ],
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Resultados',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'ej: -12h' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'ej: al mes' } },
      ],
    },
    {
      name: 'tools',
      type: 'array',
      label: 'Herramientas',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'order', type: 'number', required: true, defaultValue: 0, label: 'Orden' },
  ],
}

import type { CollectionConfig } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'format', 'level'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'format',
      type: 'select',
      required: true,
      options: [
        { label: 'PDF', value: 'PDF' },
        { label: 'Notion', value: 'Notion' },
        { label: 'Google Docs', value: 'Google Docs' },
        { label: 'Markdown', value: 'Markdown' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Básico', value: 'Básico' },
        { label: 'Medio', value: 'Medio' },
        { label: 'Avanzado', value: 'Avanzado' },
      ],
    },
    { name: 'problem', type: 'text', required: true, label: 'Problema que resuelve' },
    { name: 'audience', type: 'text', required: true, label: 'Para quién es' },
    { name: 'howToUse', type: 'textarea', required: true, label: 'Cómo usarla' },
    { name: 'downloadUrl', type: 'text', label: 'Enlace de descarga (plantillas gratis)', admin: { description: 'Se muestra después de dejar el email. Si está vacío, la petición queda guardada en Consultas para enviarla a mano.' } },
    { name: 'price', type: 'text', label: 'Precio (plantillas de pago)', admin: { description: 'Ej: 29 €. Vacío = gratis.' } },
    { name: 'buyUrl', type: 'text', label: 'Enlace de compra (Lemon Squeezy, Gumroad…)' },
  ],
}

import type { CollectionConfig } from 'payload'

export const Automations: CollectionConfig = {
  slug: 'automations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'featured'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'problem', type: 'text', required: true, label: 'Problema que resuelve' },
    {
      name: 'tools',
      type: 'array',
      label: 'Herramientas utilizadas',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Ventas', value: 'Ventas' },
        { label: 'Operaciones', value: 'Operaciones' },
        { label: 'Atención al cliente', value: 'Atención al cliente' },
        { label: 'Finanzas', value: 'Finanzas' },
        { label: 'Comunicación', value: 'Comunicación' },
      ],
    },
    { name: 'price', type: 'text', required: true, label: 'Precio (ej: Desde 299€)' },
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'Más popular', value: 'Más popular' },
        { label: 'Nuevo', value: 'Nuevo' },
        { label: 'Destacado', value: 'Destacado' },
      ],
    },
    { name: 'benefit', type: 'text', required: true, label: 'Beneficio principal' },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Destacado en home' },
  ],
}

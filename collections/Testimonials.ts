import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonio', plural: 'Testimonios' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'order'],
  },
  defaultSort: 'order',
  fields: [
    { name: 'quote', type: 'textarea', required: true, label: 'Testimonio' },
    { name: 'author', type: 'text', required: true, label: 'Nombre' },
    { name: 'role', type: 'text', required: true, label: 'Cargo' },
    { name: 'company', type: 'text', required: true, label: 'Empresa' },
    { name: 'result', type: 'text', required: true, label: 'Resultado concreto (ej: -14h/semana)' },
    { name: 'order', type: 'number', required: true, defaultValue: 0, label: 'Orden' },
  ],
}

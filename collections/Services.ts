import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
    description: 'Los pilares de servicio que se muestran en la home.',
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'Identificador para anclas y URLs (ej: n8n)' } },
    { name: 'tagline', type: 'text', required: true, label: 'Frase corta bajo el título' },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'workflow',
      label: 'Icono',
      options: [
        { label: 'Flujo / n8n', value: 'workflow' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Imagen IA', value: 'image' },
        { label: 'Procesos de empresa', value: 'building' },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Puntos clave',
      minRows: 1,
      maxRows: 5,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'href', type: 'text', required: true, defaultValue: '/automations', label: 'Enlace de detalle' },
    { name: 'order', type: 'number', required: true, defaultValue: 0, label: 'Orden' },
  ],
}

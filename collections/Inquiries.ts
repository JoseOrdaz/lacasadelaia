import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Consulta', plural: 'Consultas' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'source', 'status', 'createdAt'], description: 'Solicitudes del formulario web. No se envían notificaciones por email.' },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea', required: true, maxLength: 5000 },
    { name: 'source', label: 'Origen', type: 'select', defaultValue: 'contact', options: [{ label: 'Formulario de contacto', value: 'contact' }, { label: 'Newsletter / guía', value: 'newsletter' }, { label: 'Plantilla', value: 'template' }, { label: 'Analizador web IA', value: 'web-audit' }, { label: 'Formación', value: 'training' }], admin: { position: 'sidebar' } },
    { name: 'status', label: 'Estado', type: 'select', defaultValue: 'new', options: [{ label: 'Nueva', value: 'new' }, { label: 'Respondida', value: 'replied' }] },
  ],
}

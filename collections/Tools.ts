import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'badge', 'featured'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Escritura', value: 'Escritura' },
        { label: 'Imagen', value: 'Imagen' },
        { label: 'Productividad', value: 'Productividad' },
        { label: 'Automatización', value: 'Automatización' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Investigación', value: 'Investigación' },
        { label: 'Código', value: 'Código' },
        { label: 'Presentaciones', value: 'Presentaciones' },
        { label: 'Audio & Vídeo', value: 'Audio & Vídeo' },
      ],
    },
    { name: 'useCase', type: 'text', required: true, label: 'Caso de uso' },
    { name: 'url', type: 'text', required: true, label: 'URL' },
    {
      name: 'badge',
      type: 'select',
      required: true,
      options: [
        { label: 'Gratis', value: 'Gratis' },
        { label: 'Freemium', value: 'Freemium' },
        { label: 'Pago', value: 'Pago' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Destacado en home' },
  ],
}

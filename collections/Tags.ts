import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: { singular: 'Etiqueta', plural: 'Etiquetas' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [({ value }) => typeof value === 'string' ? value.trim() : value],
      },
    },
  ],
}

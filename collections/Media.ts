import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt'],
  },
  access: {
    // Las imágenes se sirven en /api/media/file/*; el frontend necesita lectura pública
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // Fuera del repo; metadata en MongoDB, binarios en disco local
    staticDir: 'storage/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 1200, height: 800 },
      { name: 'hero', width: 1600, height: 900 },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Texto alternativo accesible para la imagen' },
    },
  ],
}

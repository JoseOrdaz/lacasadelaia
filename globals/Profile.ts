import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Perfil profesional',
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'photo', label: 'Tu fotografía', type: 'upload', relationTo: 'media', admin: { description: 'Foto real para Sobre mí. Si está vacío, se muestra un bloque tipográfico.' } },
  ],
}

import type { CollectionConfig, FieldHook } from 'payload'
import { lexicalEditor, lexicalHTMLField } from '@payloadcms/richtext-lexical'
import { normalizeNewsContentValue } from '@/lib/news-content'

const normalizeContentHook: FieldHook = async ({ value, req }) => {
  return normalizeNewsContentValue(value, req)
}

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'date'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Identificador de URL, ej: como-elegir-herramienta-ia' },
    },
    { name: 'excerpt', type: 'textarea', required: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Imagen destacada del artículo' },
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Texto alternativo',
      admin: { description: 'Obligatorio si hay imagen destacada' },
      validate: (value: unknown, { siblingData }: { siblingData?: { image?: unknown } }) => {
        if (siblingData?.image && !value) {
          return 'El texto alternativo es obligatorio cuando hay imagen'
        }
        return true
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
      admin: { description: 'Contenido del artículo con editor visual' },
      hooks: {
        beforeValidate: [normalizeContentHook],
        beforeChange: [normalizeContentHook],
        afterRead: [normalizeContentHook],
      },
    },
    lexicalHTMLField({
      htmlFieldName: 'content_html',
      lexicalFieldName: 'content',
    }),
    { name: 'keyIdea', type: 'text', required: true, label: 'Idea clave' },
    { name: 'date', type: 'date', required: true },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'IA generativa', value: 'IA generativa' },
        { label: 'Automatización', value: 'Automatización' },
        { label: 'Herramientas', value: 'Herramientas' },
        { label: 'Productividad', value: 'Productividad' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Desarrollo', value: 'Desarrollo' },
      ],
    },
    { name: 'readTime', type: 'text', required: true, label: 'Tiempo de lectura' },
    { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Destacado en home' },
  ],
}

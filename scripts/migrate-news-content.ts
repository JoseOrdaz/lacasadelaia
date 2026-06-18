/**
 * Convierte el campo content de HTML string a JSON Lexical (formato que exige el editor).
 * Uso: npm run migrate:news-content
 */
import { getPayload } from 'payload'
import type { SanitizedConfig } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import config from '../payload.config'
import { news as staticNews } from '../data/news'

function isLexicalContent(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'root' in value &&
    typeof (value as { root: unknown }).root === 'object'
  )
}

async function migrate() {
  console.log('Conectando a Payload / MongoDB...')
  const resolvedConfig = (await config) as SanitizedConfig
  const payload = await getPayload({ config: resolvedConfig })
  const editorConfig = await editorConfigFactory.default({ config: resolvedConfig })

  const staticBySlug = Object.fromEntries(staticNews.map((a) => [a.slug, a]))
  const { docs } = await payload.find({ collection: 'news', limit: 200 })

  let migrated = 0
  for (const doc of docs) {
    const updates: Record<string, unknown> = {}
    const staticArticle = staticBySlug[doc.slug as string]

    if (typeof doc.content === 'string' && doc.content.trim()) {
      updates.content = convertHTMLToLexical({
        editorConfig,
        html: doc.content,
        JSDOM,
      })
      console.log(`  ↳ ${doc.slug}: content HTML → Lexical`)
    } else if (doc.content && !isLexicalContent(doc.content)) {
      console.warn(`  ⚠ ${doc.slug}: content con formato desconocido, omitido`)
      continue
    }

    if (!doc.imageAlt && staticArticle?.imageAlt) {
      updates.imageAlt = staticArticle.imageAlt
    }

    if (Object.keys(updates).length === 0) continue

    await payload.update({
      collection: 'news',
      id: doc.id,
      data: updates,
    })
    migrated++
  }

  console.log(`\n✅ Migrados ${migrated} artículo(s).`)
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Error en migración:', err)
  process.exit(1)
})

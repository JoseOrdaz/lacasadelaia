import { getPayload } from 'payload'
import config from '../payload.config'

async function migrate() {
  const payload = await getPayload({ config })
  const tagIds = new Map<string, string | number>()
  const { docs } = await payload.find({ collection: 'news', depth: 0, pagination: false })

  for (const article of docs) {
    const names = Array.isArray(article.tags)
      ? article.tags.flatMap((tag) => typeof tag === 'string' ? [tag.trim()] : [])
      : []
    const ids = []

    for (const name of [...new Set(names)].filter(Boolean)) {
      let id = tagIds.get(name)
      if (!id) {
        const existing = await payload.find({ collection: 'tags', where: { name: { equals: name } }, limit: 1 })
        const tag = existing.docs[0] ?? await payload.create({ collection: 'tags', data: { name } })
        id = tag.id
        tagIds.set(name, id)
      }
      ids.push(id)
    }

    await payload.update({ collection: 'news', id: article.id, data: { tags: ids } })
  }

  await payload.destroy()
  console.log(`OK: ${docs.length} artículos migrados y ${tagIds.size} etiquetas disponibles`)
}

migrate().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})

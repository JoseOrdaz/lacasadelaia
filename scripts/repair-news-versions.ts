/** Entradas anteriores a la activación de borradores. Ejecutar con --apply para reparar. */
import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  try {
    const { docs } = await payload.db.find<{
      id: string; createdAt: string; updatedAt: string; _status?: 'draft' | 'published'
    }>({ collection: 'news', pagination: false })
    let missing = 0
    for (const doc of docs) {
      const versions = await payload.findVersions({
        collection: 'news', where: { parent: { equals: doc.id } }, limit: 1,
      })
      if (versions.totalDocs) continue
      missing++
      console.log(`Sin versión: ${doc.id}`)
      if (!process.argv.includes('--apply')) continue

      // Copia sin afterRead ni relaciones pobladas; no modifica el documento publicado.
      const { id, ...versionData } = doc
      await payload.db.createVersion({
        collectionSlug: 'news', parent: id, autosave: false,
        createdAt: doc.createdAt, updatedAt: doc.updatedAt,
        versionData: { ...versionData, _status: doc._status ?? 'published' },
      })
    }
    const admin = await payload.find({ collection: 'news', draft: true, depth: 0, pagination: false })
    const visible = new Set(admin.docs.map(doc => String(doc.id)))
    const after = await payload.db.find({ collection: 'news', pagination: false })
    assert.deepEqual(after.docs, docs, 'Los documentos originales no deben cambiar')
    assert.ok(docs.every(doc => visible.has(String(doc.id))), 'Faltan entradas en el listado del administrador')
    console.log(`OK: ${docs.length} entradas visibles en el administrador; ${missing} versiones ausentes${process.argv.includes('--apply') ? ' reparadas' : ''}. Originales intactos.`)
  } finally {
    await payload.destroy()
  }
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error instanceof assert.AssertionError ? error.message : 'No se pudo completar la reparación de versiones')
  process.exit(1)
})

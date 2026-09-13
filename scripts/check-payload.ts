/** Prueba aislada: usa una base temporal en el mismo servidor MongoDB, nunca la base de la web. */
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'

async function main() {
  process.loadEnvFile('.env')
  const uri = new URL(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lacasadelaia')
  uri.pathname = `/lc_test_${randomUUID().replaceAll('-', '').slice(0, 16)}`
  process.env.MONGODB_URI = uri.toString()
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })
  let postId: string | number | undefined
  let inquiryId: string | number | undefined
  try {
    const post = await payload.create({ collection: 'news', draft: true, data: { title: 'Prueba de borrador', slug: 'prueba-de-borrador', excerpt: 'Contenido exclusivo de la prueba.', content: '<p>Entrada de prueba.</p>', keyIdea: 'Verificar la publicación.', date: new Date().toISOString(), readTime: '1 min' } })
    postId = post.id
    assert.equal((await payload.find({ collection: 'news', overrideAccess: false })).totalDocs, 0, 'El borrador no debe ser público')
    await payload.update({ collection: 'news', id: post.id, data: { _status: 'published' } })
    assert.equal((await payload.find({ collection: 'news', overrideAccess: false })).totalDocs, 1, 'La entrada publicada debe ser pública')
    await payload.update({ collection: 'news', id: post.id, draft: true, data: { title: 'Cambio todavía privado' } })
    const visible = await payload.find({ collection: 'news', overrideAccess: false, draft: false })
    assert.equal(visible.docs[0].title, 'Prueba de borrador', 'Editar un borrador no debe filtrar cambios')
    const { POST } = await import('../app/(site)/api/contact/route')
    const data = { name: 'Prueba automática', email: 'test@example.com', message: 'Verificación aislada del almacenamiento.', privacy: true }
    const request = () => new Request('http://localhost/api/contact', { method: 'POST', headers: { origin: 'http://localhost', 'content-type': 'application/json' }, body: JSON.stringify(data) })
    assert.equal((await POST(request())).status, 201, 'El formulario debe guardar la consulta')
    const inquiry = (await payload.find({ collection: 'inquiries' })).docs[0]
    inquiryId = inquiry.id
    assert.equal((await POST(request())).status, 429, 'Los envíos repetidos deben limitarse')
    assert.equal((await POST(new Request('http://localhost/api/contact', { method: 'POST' }))).status, 403)
    assert.equal((await payload.findByID({ collection: 'inquiries', id: inquiry.id })).message, 'Verificación aislada del almacenamiento.')
    await assert.rejects(payload.find({ collection: 'inquiries', overrideAccess: false }), 'Las consultas no deben ser públicas')
    await assert.rejects(payload.create({ collection: 'inquiries', overrideAccess: false, data: { name: 'Prueba', email: 'test@example.com', message: 'Intento directo' } }), 'La API pública no debe aceptar escrituras directas')
    console.log('OK: borradores privados, publicación, edición pendiente y consultas protegidas')
  } finally {
    if (postId) await payload.delete({ collection: 'news', id: postId })
    if (inquiryId) await payload.delete({ collection: 'inquiries', id: inquiryId })
    await payload.destroy()
  }
}
main().then(() => process.exit(0)).catch((error) => { console.error(error instanceof Error ? error.message.replace(/mongodb[^\s]+/g, '[MongoDB]') : 'Falló la comprobación aislada'); process.exit(1) })

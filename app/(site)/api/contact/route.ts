import { getPayload } from 'payload'
import config from '@payload-config'
import { validateContact } from '@/lib/contact'

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Origen no permitido.' }, { status: 403 })
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({ error: 'Formato no válido.' }, { status: 415 })
  const raw = await request.text()
  if (raw.length > 12000) return Response.json({ error: 'El mensaje es demasiado largo.' }, { status: 413 })
  let body
  try { body = JSON.parse(raw) } catch { return Response.json({ error: 'Solicitud no válida.' }, { status: 400 }) }
  const data = validateContact(body)
  if (!data || body.website) return Response.json({ error: 'Revisa el nombre, el email y el mensaje (mínimo 10 caracteres), y confirma la lectura de privacidad.' }, { status: 400 })
  try {
    const payload = await getPayload({ config })
    // Límite persistente por email: funciona también con varias instancias del servidor.
    const recent = await payload.count({ collection: 'inquiries', overrideAccess: true, where: { and: [{ email: { equals: data.email } }, { createdAt: { greater_than: new Date(Date.now() - 60000).toISOString() } }] } })
    if (recent.totalDocs) return Response.json({ error: 'Ya has enviado una consulta recientemente. Espera un minuto antes de enviar otra.' }, { status: 429 })
    await payload.create({ collection: 'inquiries', overrideAccess: true, data })
    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'No he podido guardar tu consulta. Inténtalo de nuevo o escribe a hola@lacasadelaia.com.' }, { status: 503 })
  }
}

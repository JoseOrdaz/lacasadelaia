import { getPayload } from 'payload'
import config from '@payload-config'
import { validateLead } from '@/lib/lead'
import { sendContactEmail } from '@/lib/contact-mail'

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Origen no permitido.' }, { status: 403 })
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({ error: 'Formato no válido.' }, { status: 415 })
  const raw = await request.text()
  if (raw.length > 4000) return Response.json({ error: 'Solicitud demasiado larga.' }, { status: 413 })
  let body
  try { body = JSON.parse(raw) } catch { return Response.json({ error: 'Solicitud no válida.' }, { status: 400 }) }
  const data = validateLead(body)
  if (!data || body.website) return Response.json({ error: 'Revisa el email y acepta la política de privacidad.' }, { status: 400 })
  try {
    const payload = await getPayload({ config })
    const recent = await payload.count({ collection: 'inquiries', overrideAccess: true, where: { and: [{ email: { equals: data.email } }, { source: { equals: data.source } }, { createdAt: { greater_than: new Date(Date.now() - 60000).toISOString() } }] } })
    if (!recent.totalDocs) {
      await payload.create({ collection: 'inquiries', overrideAccess: true, data })
      try { await sendContactEmail(data) } catch (error) { console.error('No se pudo avisar del alta por SMTP.', error) }
    }
    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'No he podido guardar tu email. Inténtalo de nuevo o escribe a hola@lacasadelaia.com.' }, { status: 503 })
  }
}

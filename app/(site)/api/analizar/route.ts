import { auditWebsite, AuditError } from '@/lib/web-audit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Límite sencillo en memoria: 8 análisis por minuto y dirección IP.
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > 8
}

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Origen no permitido.' }, { status: 403 })
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
  if (limited(ip)) return Response.json({ error: 'Demasiados análisis seguidos. Espera un minuto.' }, { status: 429 })
  let body: { url?: unknown }
  try { body = await request.json() } catch { return Response.json({ error: 'Solicitud no válida.' }, { status: 400 }) }
  if (typeof body.url !== 'string') return Response.json({ error: 'Escribe la dirección de una web.' }, { status: 400 })
  try {
    return Response.json(await auditWebsite(body.url))
  } catch (error) {
    if (error instanceof AuditError) return Response.json({ error: error.message }, { status: 422 })
    console.error('Error en el analizador web', error)
    return Response.json({ error: 'No he podido completar el análisis. Inténtalo de nuevo.' }, { status: 500 })
  }
}

import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

export type CheckStatus = 'pass' | 'warn' | 'fail'
export type AuditCheck = { id: string; group: string; label: string; status: CheckStatus; detail: string; fix: string }
export type AuditResult = { url: string; score: number; checks: AuditCheck[] }

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']
const MAX_BYTES = 1_500_000
const TIMEOUT_MS = 8000

export class AuditError extends Error {}

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 6) {
    const a = address.toLowerCase()
    if (a === '::1' || a === '::' || a.startsWith('fc') || a.startsWith('fd') || a.startsWith('fe80')) return true
    const mapped = a.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
    return mapped ? isPrivateAddress(mapped[1]) : false
  }
  const [a, b] = address.split('.').map(Number)
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224
}

/** Solo URLs públicas http(s) en puertos estándar: evita que el analizador sirva para llegar a la red interna. */
async function assertPublicUrl(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) throw new AuditError('Solo se pueden analizar direcciones http o https.')
  if (url.port && !['80', '443'].includes(url.port)) throw new AuditError('Solo se pueden analizar webs en puertos estándar.')
  if (url.username || url.password) throw new AuditError('La dirección no puede incluir usuario o contraseña.')
  const host = url.hostname.replace(/^\[|\]$/g, '')
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) throw new AuditError('Esa dirección no es pública.')
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => { throw new AuditError('No encuentro ese dominio. Revisa que esté bien escrito.') })
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) throw new AuditError('Esa dirección no es pública.')
}

async function safeFetch(input: string, redirects = 3): Promise<{ url: string; status: number; headers: Headers; body: string } | null> {
  let current = new URL(input)
  for (let i = 0; i <= redirects; i++) {
    await assertPublicUrl(current)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      const response = await fetch(current, { redirect: 'manual', signal: controller.signal, headers: { 'user-agent': 'LaCasaDeLaIA-WebAudit/1.0 (+https://lacasadelaia.com/auditoria-ia)', accept: 'text/html,text/plain,application/xml;q=0.9,*/*;q=0.5' } })
      if (response.status >= 300 && response.status < 400 && response.headers.get('location')) {
        current = new URL(response.headers.get('location')!, current)
        continue
      }
      const reader = response.body?.getReader()
      let received = 0
      const chunks: Uint8Array[] = []
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        received += value.length
        if (received > MAX_BYTES) { await reader.cancel(); break }
        chunks.push(value)
      }
      return { url: current.toString(), status: response.status, headers: response.headers, body: Buffer.concat(chunks).toString('utf8') }
    } catch (error) {
      if (error instanceof AuditError) throw error
      return null
    } finally {
      clearTimeout(timer)
    }
  }
  return null
}

function meta(html: string, attr: 'name' | 'property', key: string) {
  const tag = html.match(new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]*>`, 'i'))?.[0]
  return tag?.match(/content=["']([^"']*)["']/i)?.[1]?.trim() || ''
}

export function blockedBots(robots: string) {
  // Agrupa según el estándar: varias líneas User-agent seguidas comparten las reglas que vienen después.
  const groups: { agents: string[]; disallowAll: boolean }[] = []
  let current: { agents: string[]; disallowAll: boolean } | null = null
  let inRules = false
  for (const rawLine of robots.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim()
    const [key, ...rest] = line.split(':')
    const field = key?.trim().toLowerCase()
    const value = rest.join(':').trim()
    if (field === 'user-agent') {
      if (!current || inRules) { current = { agents: [], disallowAll: false }; groups.push(current); inRules = false }
      current.agents.push(value.toLowerCase())
    } else if (current && (field === 'disallow' || field === 'allow')) {
      inRules = true
      if (field === 'disallow' && value === '/') current.disallowAll = true
    }
  }
  const blocked = new Set<string>()
  for (const bot of AI_BOTS) {
    const specific = groups.find((g) => g.agents.includes(bot.toLowerCase()))
    const group = specific || groups.find((g) => g.agents.includes('*'))
    if (group?.disallowAll) blocked.add(bot)
  }
  return [...blocked]
}

export function normalizeUrl(raw: string) {
  const value = raw.trim()
  if (!value || value.length > 300) throw new AuditError('Escribe la dirección de una web.')
  try {
    return new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`)
  } catch {
    throw new AuditError('Esa dirección no parece válida.')
  }
}

export async function auditWebsite(raw: string): Promise<AuditResult> {
  const start = normalizeUrl(raw)
  const page = await safeFetch(start.toString())
  if (!page) throw new AuditError('No he podido abrir esa web. Puede que esté caída o que bloquee visitas automáticas.')
  const origin = new URL(page.url).origin
  const [robotsRes, llmsRes] = await Promise.all([safeFetch(`${origin}/robots.txt`), safeFetch(`${origin}/llms.txt`)])
  const robots = robotsRes && robotsRes.status === 200 && !/<html/i.test(robotsRes.body) ? robotsRes.body : ''
  const sitemapUrl = robots.match(/^\s*sitemap:\s*(\S+)/im)?.[1] || `${origin}/sitemap.xml`
  const sitemapRes = await safeFetch(sitemapUrl).catch(() => null)

  const html = page.body
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text ? text.split(' ').length : 0
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || ''
  const description = meta(html, 'name', 'description')
  const robotsMeta = `${meta(html, 'name', 'robots')} ${page.headers.get('x-robots-tag') || ''}`.toLowerCase()
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length
  const lang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1] || ''
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html)
  const jsonLd = (html.match(/<script[^>]+application\/ld\+json/gi) || []).length
  const schemaTypes = [...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1])
  const ogTitle = meta(html, 'property', 'og:title')
  const ogImage = meta(html, 'property', 'og:image')
  const blocked = robots ? blockedBots(robots) : []
  const hasLlms = llmsRes?.status === 200 && llmsRes.body.length > 20 && !/<html/i.test(llmsRes.body)
  const hasSitemap = sitemapRes?.status === 200 && /<(urlset|sitemapindex)/i.test(sitemapRes.body)

  const checks: AuditCheck[] = [
    { id: 'status', group: 'Acceso', label: 'La página responde correctamente', status: page.status < 400 ? 'pass' : 'fail', detail: `Código de respuesta ${page.status}.`, fix: 'Asegúrate de que la portada responde con código 200 y no redirige a páginas de error o de inicio de sesión.' },
    { id: 'https', group: 'Acceso', label: 'Usa HTTPS', status: page.url.startsWith('https://') ? 'pass' : 'fail', detail: page.url.startsWith('https://') ? 'La web se sirve con HTTPS.' : 'La web se sirve sin cifrar.', fix: 'Activa un certificado SSL (gratis con Let’s Encrypt) y redirige todo el tráfico a https.' },
    { id: 'noindex', group: 'Acceso', label: 'No bloquea la indexación', status: robotsMeta.includes('noindex') ? 'fail' : 'pass', detail: robotsMeta.includes('noindex') ? 'La página pide no ser indexada (noindex).' : 'No hay ninguna orden noindex.', fix: 'Quita la etiqueta meta robots «noindex» (o la cabecera X-Robots-Tag) de las páginas que quieres que aparezcan.' },
    { id: 'robots', group: 'Rastreo', label: 'Tiene robots.txt', status: robots ? 'pass' : 'warn', detail: robots ? 'Se ha encontrado robots.txt.' : 'No hay robots.txt.', fix: 'Crea un robots.txt que permita el acceso y que indique la ubicación del sitemap.' },
    { id: 'ai-bots', group: 'Rastreo', label: 'Permite a los asistentes de IA', status: blocked.length === 0 ? 'pass' : blocked.length >= 3 ? 'fail' : 'warn', detail: blocked.length ? `Bloquea: ${blocked.join(', ')}.` : 'No se bloquea a ChatGPT, Claude, Perplexity ni Gemini.', fix: 'Si quieres que los asistentes de IA te recomienden, quita los «Disallow: /» para GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot y Google-Extended en robots.txt.' },
    { id: 'sitemap', group: 'Rastreo', label: 'Tiene sitemap XML', status: hasSitemap ? 'pass' : 'warn', detail: hasSitemap ? 'Sitemap encontrado.' : 'No se ha encontrado un sitemap válido.', fix: 'Genera un sitemap.xml con todas las páginas importantes y enlázalo desde robots.txt.' },
    { id: 'llms', group: 'Rastreo', label: 'Tiene llms.txt', status: hasLlms ? 'pass' : 'warn', detail: hasLlms ? 'Archivo llms.txt encontrado.' : 'No hay llms.txt.', fix: 'Añade un /llms.txt con un resumen de quién eres, qué ofreces y enlaces a tus páginas clave. Es una propuesta reciente que ayuda a los modelos a entender tu web.' },
    { id: 'content', group: 'Contenido', label: 'El contenido se lee sin JavaScript', status: words >= 250 ? 'pass' : words >= 80 ? 'warn' : 'fail', detail: `${words} palabras visibles en el HTML inicial.`, fix: 'Muchos rastreadores de IA no ejecutan JavaScript. Sirve el texto principal en el HTML (renderizado en servidor o estático) y no solo tras cargar la app.' },
    { id: 'title', group: 'Contenido', label: 'Título de página claro', status: title.length >= 15 && title.length <= 70 ? 'pass' : title ? 'warn' : 'fail', detail: title ? `«${title.slice(0, 90)}» (${title.length} caracteres).` : 'Sin título.', fix: 'Escribe un título de 30-65 caracteres que diga qué haces y para quién, con tu marca al final.' },
    { id: 'description', group: 'Contenido', label: 'Meta descripción', status: description.length >= 70 && description.length <= 170 ? 'pass' : description ? 'warn' : 'fail', detail: description ? `${description.length} caracteres.` : 'Sin meta descripción.', fix: 'Añade una descripción de 120-160 caracteres que resuma tu oferta y anime a hacer clic.' },
    { id: 'h1', group: 'Contenido', label: 'Un encabezado principal (H1)', status: h1Count === 1 ? 'pass' : 'warn', detail: `${h1Count} encabezados H1.`, fix: 'Usa exactamente un H1 por página que resuma su tema principal.' },
    { id: 'lang', group: 'Contenido', label: 'Idioma declarado', status: lang ? 'pass' : 'warn', detail: lang ? `Idioma: ${lang}.` : 'No se declara el idioma.', fix: 'Añade lang="es" (o el idioma que corresponda) a la etiqueta <html>.' },
    { id: 'schema', group: 'Datos estructurados', label: 'Datos estructurados (schema.org)', status: jsonLd ? 'pass' : 'fail', detail: jsonLd ? `Tipos: ${[...new Set(schemaTypes)].slice(0, 6).join(', ') || 'JSON-LD presente'}.` : 'Sin datos estructurados JSON-LD.', fix: 'Añade JSON-LD de Organization o LocalBusiness (nombre, dirección, contacto) y Service, Product o FAQPage según tu caso. Es lo que usan buscadores e IA para entender quién eres.' },
    { id: 'canonical', group: 'Datos estructurados', label: 'URL canónica', status: canonical ? 'pass' : 'warn', detail: canonical ? 'Tiene etiqueta canonical.' : 'Sin etiqueta canonical.', fix: 'Indica la URL canónica de cada página para evitar contenido duplicado.' },
    { id: 'og', group: 'Datos estructurados', label: 'Vista previa para compartir (Open Graph)', status: ogTitle && ogImage ? 'pass' : ogTitle || ogImage ? 'warn' : 'fail', detail: ogTitle && ogImage ? 'Título e imagen Open Graph presentes.' : 'Faltan etiquetas Open Graph.', fix: 'Añade og:title, og:description y og:image para que tu web se vea bien al compartirla y en algunos asistentes.' },
  ]
  const points = checks.reduce((sum, c) => sum + (c.status === 'pass' ? 1 : c.status === 'warn' ? 0.5 : 0), 0)
  return { url: page.url, score: Math.round((points / checks.length) * 100), checks }
}

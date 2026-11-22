import assert from 'node:assert/strict'
import { validateContact } from '../lib/contact'
import { faqs, solutions } from '../data/home'
import { getAutomationRecommendations } from '../lib/automation-recommendations'
import { validateLead } from '../lib/lead'
import { blockedBots, normalizeUrl } from '../lib/web-audit'
import { sectors } from '../data/offers'
const valid = { name: ' Ana ', email: 'ana@example.com', message: 'Quiero conectar mi CRM con mis formularios.', privacy: true }
assert.deepEqual(validateContact(valid), { name: 'Ana', email: valid.email, message: valid.message })
for (const invalid of [null, {}, { ...valid, privacy: false }, { ...valid, name: ' ' }, { ...valid, email: 'invalid' }, { ...valid, message: 'corto' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, name: 42 }]) assert.equal(validateContact(invalid), null)
assert.equal(solutions.length, 6)
assert.equal(new Set(faqs.map(([question]) => question)).size, faqs.length)
const recommendations = getAutomationRecommendations({ business: 'servicios', tasks: ['emails', 'informes'], tools: ['gmail'], frequency: 'diario' })
assert.equal(recommendations.length, 2)
assert.equal(recommendations[0].title, 'Clasificar emails y extraer lo importante')
assert.ok(getAutomationRecommendations({ business: 'otro', tasks: [], tools: [], frequency: 'ocasional' }).length > 0)
const lead = validateLead({ email: ' Ana@Example.com ', source: 'newsletter', privacy: true })
assert.equal(lead?.email, 'ana@example.com')
assert.equal(lead?.source, 'newsletter')
for (const invalid of [null, { email: 'a@b.co', source: 'newsletter' }, { email: 'mal', source: 'newsletter', privacy: true }, { email: 'a@b.co', source: 'otro', privacy: true }]) assert.equal(validateLead(invalid), null)
assert.deepEqual(blockedBots('User-agent: GPTBot\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: *\nAllow: /'), ['GPTBot', 'ClaudeBot'])
assert.equal(blockedBots('User-agent: *\nDisallow: /admin').length, 0)
assert.ok(!blockedBots('User-agent: *\nDisallow: /\n\nUser-agent: GPTBot\nAllow: /').includes('GPTBot'))
assert.equal(normalizeUrl('ejemplo.com').protocol, 'https:')
assert.equal(normalizeUrl('ftp://ejemplo.com').protocol, 'ftp:')
assert.equal(new Set(sectors.map((sector) => sector.slug)).size, sectors.length)
console.log('OK: validación del contacto, altas, analizador web, recomendaciones y contenido de portada')

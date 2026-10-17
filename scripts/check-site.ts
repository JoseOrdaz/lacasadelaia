import assert from 'node:assert/strict'
import { validateContact } from '../lib/contact'
import { faqs, solutions } from '../data/home'
import { getAutomationRecommendations } from '../lib/automation-recommendations'
const valid = { name: ' Ana ', email: 'ana@example.com', message: 'Quiero conectar mi CRM con mis formularios.', privacy: true }
assert.deepEqual(validateContact(valid), { name: 'Ana', email: valid.email, message: valid.message })
for (const invalid of [null, {}, { ...valid, privacy: false }, { ...valid, name: ' ' }, { ...valid, email: 'invalid' }, { ...valid, message: 'corto' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, name: 42 }]) assert.equal(validateContact(invalid), null)
assert.equal(solutions.length, 6)
assert.equal(new Set(faqs.map(([question]) => question)).size, faqs.length)
const recommendations = getAutomationRecommendations({ business: 'servicios', tasks: ['emails', 'informes'], tools: ['gmail'], frequency: 'diario' })
assert.equal(recommendations.length, 2)
assert.equal(recommendations[0].title, 'Clasificar emails y extraer lo importante')
assert.ok(getAutomationRecommendations({ business: 'otro', tasks: [], tools: [], frequency: 'ocasional' }).length > 0)
console.log('OK: validación del contacto, recomendaciones y contenido de portada')

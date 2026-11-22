'use client'

import { useState } from 'react'
import { Check, AlertTriangle, X } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import type { AuditResult, CheckStatus } from '@/lib/web-audit'

const icons: Record<CheckStatus, React.ReactNode> = {
  pass: <Check size={16} aria-label="Correcto" />,
  warn: <AlertTriangle size={16} aria-label="Mejorable" />,
  fail: <X size={16} aria-label="Falta" />,
}

export default function AuditClient({ reviewPrice, reviewPrefill }: { reviewPrice: string; reviewPrefill: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  async function analyze(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const url = new FormData(event.currentTarget).get('url')
    setStatus('loading'); setError(''); setUnlocked(false)
    try {
      const response = await fetch('/api/analizar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setResult(data); setStatus('done')
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'No he podido analizar esa web.')
      setStatus('error')
    }
  }

  const issues = result?.checks.filter((c) => c.status !== 'pass') ?? []
  const groups = result ? [...new Set(result.checks.map((c) => c.group))] : []
  const verdict = !result ? '' : result.score >= 85 ? 'Muy bien preparada' : result.score >= 60 ? 'Bien encaminada, con mejoras claras' : 'Le cuesta que la encuentren y entiendan'

  return <div className="audit-tool">
    <form className="audit-form" onSubmit={analyze}>
      <label htmlFor="audit-url">Dirección de tu web</label>
      <div><input id="audit-url" name="url" type="text" inputMode="url" autoComplete="url" required placeholder="tuweb.com" maxLength={300} /><button className="action" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Analizando…' : 'Analizar gratis →'}</button></div>
      {status === 'error' && <p className="form-error" role="alert">{error}</p>}
    </form>

    {result && <div className="audit-result" aria-live="polite">
      <div className="audit-score">
        <strong>{result.score}<span>/100</span></strong>
        <div><p className="eyebrow">RESULTADO</p><h2>{verdict}</h2><p>{new URL(result.url).hostname} · {result.checks.length - issues.length} de {result.checks.length} comprobaciones superadas.</p></div>
      </div>
      {groups.map((group) => <section key={group} className="audit-group"><h3>{group}</h3><ul>{result.checks.filter((c) => c.group === group).map((c) => <li key={c.id} className={`audit-check is-${c.status}`}>
        <span className="audit-icon">{icons[c.status]}</span>
        <div><strong>{c.label}</strong><p>{c.detail}</p>{c.status !== 'pass' && unlocked && <p className="audit-fix"><b>Cómo arreglarlo:</b> {c.fix}</p>}</div>
      </li>)}</ul></section>)}

      {issues.length > 0 && !unlocked && <div className="audit-unlock">
        <div><p className="eyebrow">CÓMO ARREGLARLO</p><h3>Recibe las {issues.length} recomendaciones concretas</h3><p>Déjame tu email y te muestro cómo corregir cada punto. También te guardo el resultado para revisarlo contigo si lo necesitas.</p></div>
        <LeadForm source="web-audit" detail={`${result.url} · puntuación ${result.score}/100 · pendientes: ${issues.map((c) => c.label).join('; ')}`} button="Ver recomendaciones →" success={<UnlockDone onShow={() => setUnlocked(true)} />} />
      </div>}

      <div className="audit-upsell">
        <div><p className="eyebrow">¿PREFIERES QUE LO HAGA YO?</p><h3>Revisión y mejoras hechas, {reviewPrice}</h3><p>Reviso tu web a fondo (SEO técnico, datos estructurados, contenido y preparación para asistentes de IA) y aplico las mejoras o te las dejo listas para tu proveedor.</p></div>
        <a className="action" href={`/?mensaje=${encodeURIComponent(`${reviewPrefill}${result.url} (puntuación ${result.score}/100)`)}#contacto`}>Quiero la revisión →</a>
      </div>
    </div>}
  </div>
}

function UnlockDone({ onShow }: { onShow: () => void }) {
  return <div><p><strong>¡Hecho!</strong> Ya puedes ver cómo arreglar cada punto.</p><button type="button" className="action" onClick={onShow}>Mostrar recomendaciones ↓</button></div>
}

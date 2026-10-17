'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  getAutomationRecommendations,
  type AutomationAnswers,
  type AutomationRecommendation,
} from '@/lib/automation-recommendations'

const initialAnswers: AutomationAnswers = { business: '', tasks: [], tools: [], frequency: '' }

const steps = [
  { label: 'Tu negocio', question: '¿A qué te dedicas?', help: 'Así ajustamos los ejemplos a tu día a día.' },
  { label: 'Tus tareas', question: '¿Qué tareas se repiten?', help: 'Puedes elegir varias.' },
  { label: 'Tus herramientas', question: '¿Dónde ocurre ahora?', help: 'No pasa nada si no reconoces alguna.' },
  { label: 'Frecuencia', question: '¿Con qué frecuencia ocurre?', help: 'Nos ayuda a ordenar prioridades.' },
]

const businessOptions = [
  ['servicios', 'Presto servicios profesionales'],
  ['comercio', 'Tengo una tienda o negocio local'],
  ['formacion', 'Trabajo en formación o contenidos'],
  ['salud', 'Trabajo en salud, bienestar o citas'],
  ['otro', 'Otro tipo de negocio'],
]

const taskOptions = [
  ['emails', 'Leer y responder emails'],
  ['formularios', 'Recibir consultas o formularios'],
  ['clientes', 'Hacer seguimiento de clientes'],
  ['documentos', 'Ordenar documentos'],
  ['informes', 'Preparar informes o resúmenes'],
  ['redes', 'Preparar contenido para redes'],
  ['datos', 'Copiar datos entre herramientas'],
  ['citas', 'Coordinar citas y recordatorios'],
]

const toolOptions = [
  ['email', 'Gmail u Outlook'],
  ['excel', 'Excel'],
  ['sheets', 'Google Sheets'],
  ['whatsapp', 'WhatsApp'],
  ['instagram', 'Instagram'],
  ['notion', 'Notion'],
  ['crm', 'CRM'],
  ['other', 'Otras herramientas'],
]

const frequencyOptions = [
  ['diario', 'Todos los días'],
  ['semanal', 'Varias veces por semana'],
  ['ocasional', 'De vez en cuando'],
]

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function recommendationMessage(answers: AutomationAnswers, recommendations: AutomationRecommendation[]) {
  return [
    'He completado el diagnóstico gratuito de automatización.',
    `Tipo de negocio: ${businessOptions.find(([value]) => value === answers.business)?.[1] || answers.business}`,
    `Tareas: ${answers.tasks.map((task) => taskOptions.find(([value]) => value === task)?.[1] || task).join(', ')}`,
    `Herramientas: ${answers.tools.map((tool) => toolOptions.find(([value]) => value === tool)?.[1] || tool).join(', ') || 'No indicadas'}`,
    `Frecuencia: ${frequencyOptions.find(([value]) => value === answers.frequency)?.[1] || answers.frequency}`,
    '',
    'Recomendaciones:',
    ...recommendations.map((recommendation, index) => `${index + 1}. ${recommendation.title} — ${recommendation.tools.join(', ')}`),
  ].join('\n')
}

export default function AutomationFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers)
  const [recommendations, setRecommendations] = useState<AutomationRecommendation[] | null>(null)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [leadError, setLeadError] = useState('')

  const current = steps[step]
  const canContinue = step === 0 ? Boolean(answers.business)
    : step === 1 ? answers.tasks.length > 0
      : step === 2 ? true
        : Boolean(answers.frequency)

  const progress = `${step + 1} / ${steps.length}`

  function next() {
    if (!canContinue) return
    if (step === steps.length - 1) {
      setRecommendations(getAutomationRecommendations(answers))
      return
    }
    setStep((value) => value + 1)
  }

  function back() {
    setStep((value) => Math.max(0, value - 1))
  }

  function restart() {
    setAnswers(initialAnswers)
    setStep(0)
    setRecommendations(null)
    setLeadStatus('idle')
    setLeadError('')
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (leadStatus === 'sending' || !recommendations) return
    const form = event.currentTarget
    const fields = new FormData(form)
    setLeadStatus('sending')
    setLeadError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          email: fields.get('email'),
          message: `${fields.get('message')}\n\n${recommendationMessage(answers, recommendations)}`,
          privacy: fields.get('privacy') === 'on',
          website: fields.get('website'),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setLeadStatus('success')
      form.reset()
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'No se ha podido enviar. Puedes escribir a hola@lacasadelaia.com.')
      setLeadStatus('error')
    }
  }

  if (recommendations) {
    return <section className="container-main section" aria-labelledby="results-title">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-3">Tu mapa inicial</p>
            <h2 id="results-title" className="font-display text-3xl md:text-4xl text-carbon leading-tight">Estas son tus mejores candidatas</h2>
          </div>
          <button type="button" onClick={restart} className="font-body text-sm text-carbon underline underline-offset-4">Empezar de nuevo</button>
        </div>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => <article key={recommendation.title} className="bg-cream border border-carbon rounded-sm shadow-card p-6 md:p-7">
            <div className="flex items-start gap-4">
              <span className="font-body text-xs text-mist pt-1">0{index + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-2xl text-carbon leading-tight">{recommendation.title}</h3>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-carbon bg-lime-light border border-lime rounded-sm px-2 py-1">Esfuerzo: {recommendation.effort}</span>
                </div>
                <p className="font-body text-sm text-ink/70 leading-relaxed mt-3">{recommendation.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {recommendation.tools.map((tool) => <span key={tool} className="font-body text-xs text-ink/70 border border-faded rounded-sm px-2.5 py-1">{tool}</span>)}
                </div>
                <p className="font-body text-xs text-mist mt-4">{recommendation.benefit}</p>
              </div>
            </div>
          </article>)}
        </div>

        <div className="bg-parchment border border-faded rounded-sm p-6 md:p-8 mt-12">
          {leadStatus === 'success' ? <div role="status" className="text-center py-4">
            <p className="font-display text-2xl text-carbon mb-2">Consulta recibida.</p>
            <p className="font-body text-sm text-ink/70 leading-relaxed">Revisaré tus respuestas y te escribiré para valorar la opción más útil.</p>
          </div> : <>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-3">Siguiente paso</p>
            <h2 className="font-display text-3xl text-carbon leading-tight mb-3">¿Quieres que valoremos una de ellas?</h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed mb-6">Cuéntame cuál te interesa y te diré qué necesitaríamos, cuánto puede costar y si merece la pena hacerlo.</p>
            <form onSubmit={submitLead} className="space-y-4" aria-label="Solicitar presupuesto de automatización">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="font-body text-xs font-semibold text-carbon">Nombre<input name="name" required maxLength={100} autoComplete="name" placeholder="¿Cómo te llamas?" className="mt-2 block w-full bg-cream border border-faded rounded-sm px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-lime" /></label>
                <label className="font-body text-xs font-semibold text-carbon">Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="tu@email.com" className="mt-2 block w-full bg-cream border border-faded rounded-sm px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-lime" /></label>
              </div>
              <label className="font-body text-xs font-semibold text-carbon">¿Cuál quieres priorizar?<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="Por ejemplo: quiero empezar por organizar los emails y las consultas de clientes." className="mt-2 block w-full bg-cream border border-faded rounded-sm px-3 py-3 text-sm font-normal outline-none focus:ring-2 focus:ring-lime" /></label>
              <div className="absolute left-[-10000px] w-px h-px overflow-hidden" aria-hidden="true"><label>Tu web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="flex items-start gap-2 font-body text-xs text-ink/70 leading-relaxed"><input type="checkbox" name="privacy" required className="mt-1 accent-carbon" /><span>He leído la <Link href="/privacidad" className="underline underline-offset-2">política de privacidad</Link>. Mis datos se usarán para responder a esta consulta.</span></label>
              <button type="submit" disabled={leadStatus === 'sending'} className="btn-lime disabled:opacity-60">{leadStatus === 'sending' ? 'Enviando…' : 'Quiero valorar esta opción →'}</button>
              <div aria-live="polite" role="status">{leadStatus === 'error' && <p className="font-body text-xs text-red-800">{leadError}</p>}</div>
            </form>
          </>}
        </div>
      </div>
    </section>
  }

  return <section className="container-main section" aria-labelledby="finder-title">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="h-1.5 bg-faded rounded-full flex-1 overflow-hidden" aria-label={`Paso ${progress}`}><div className="h-full bg-lime transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <span className="font-body text-xs text-mist whitespace-nowrap">{progress}</span>
      </div>
      <div className="bg-parchment border border-faded rounded-sm p-6 md:p-10">
        <p className="font-body text-xs font-semibold uppercase tracking-widest text-mist mb-3">{current.label}</p>
        <h2 id="finder-title" className="font-display text-3xl md:text-4xl text-carbon leading-tight mb-3">{current.question}</h2>
        <p className="font-body text-sm text-ink/70 mb-8">{current.help}</p>

        {step === 0 && <div className="grid gap-3">{businessOptions.map(([value, label]) => <label key={value} className={`flex items-center gap-3 border rounded-sm px-4 py-4 cursor-pointer transition-colors ${answers.business === value ? 'border-carbon bg-lime-light' : 'border-faded bg-cream hover:border-carbon'}`}><input type="radio" name="business" value={value} checked={answers.business === value} onChange={() => setAnswers({ ...answers, business: value })} className="accent-carbon" /><span className="font-body text-sm text-carbon">{label}</span></label>)}</div>}
        {step === 1 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{taskOptions.map(([value, label]) => <label key={value} className={`flex items-center gap-3 border rounded-sm px-4 py-4 cursor-pointer transition-colors ${answers.tasks.includes(value) ? 'border-carbon bg-lime-light' : 'border-faded bg-cream hover:border-carbon'}`}><input type="checkbox" value={value} checked={answers.tasks.includes(value)} onChange={() => setAnswers({ ...answers, tasks: toggleValue(answers.tasks, value) })} className="accent-carbon" /><span className="font-body text-sm text-carbon">{label}</span></label>)}</div>}
        {step === 2 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{toolOptions.map(([value, label]) => <label key={value} className={`flex items-center gap-3 border rounded-sm px-4 py-4 cursor-pointer transition-colors ${answers.tools.includes(value) ? 'border-carbon bg-lime-light' : 'border-faded bg-cream hover:border-carbon'}`}><input type="checkbox" value={value} checked={answers.tools.includes(value)} onChange={() => setAnswers({ ...answers, tools: toggleValue(answers.tools, value) })} className="accent-carbon" /><span className="font-body text-sm text-carbon">{label}</span></label>)}</div>}
        {step === 3 && <div className="grid gap-3">{frequencyOptions.map(([value, label]) => <label key={value} className={`flex items-center gap-3 border rounded-sm px-4 py-4 cursor-pointer transition-colors ${answers.frequency === value ? 'border-carbon bg-lime-light' : 'border-faded bg-cream hover:border-carbon'}`}><input type="radio" name="frequency" value={value} checked={answers.frequency === value} onChange={() => setAnswers({ ...answers, frequency: value })} className="accent-carbon" /><span className="font-body text-sm text-carbon">{label}</span></label>)}</div>}

        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-faded">
          <button type="button" onClick={back} disabled={step === 0} className="font-body text-sm text-carbon underline underline-offset-4 disabled:opacity-30 disabled:no-underline">Atrás</button>
          <button type="button" onClick={next} disabled={!canContinue} className="btn-lime disabled:opacity-50 disabled:cursor-not-allowed">{step === steps.length - 1 ? 'Ver mis recomendaciones →' : 'Continuar →'}</button>
        </div>
        <p className="font-body text-xs text-mist mt-5">No necesitas saber de tecnología. El resultado es orientativo y la primera valoración es gratuita.</p>
      </div>
    </div>
  </section>
}


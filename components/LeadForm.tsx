'use client'

import { useId, useState, type ReactNode } from 'react'
import Link from 'next/link'
import type { LeadSource } from '@/lib/lead'

type Props = {
  source: LeadSource
  detail?: string
  button: string
  success: ReactNode
  className?: string
}

/** Formulario corto de email que guarda el alta en Consultas (Payload) y avisa por correo. */
export default function LeadForm({ source, detail, button, success, className = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const inputId = useId()
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const fields = new FormData(event.currentTarget)
    setStatus('sending')
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fields.get('email'), website: fields.get('website'), privacy: fields.get('privacy') === 'on', source, detail }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'No se ha podido enviar. Inténtalo de nuevo.')
      setStatus('error')
    }
  }
  if (status === 'done') return <div className={`lead-form lead-form-done ${className}`} role="status">{success}</div>
  return <form onSubmit={submit} className={`lead-form ${className}`}>
    <div className="lead-form-row">
      <label className="sr-only" htmlFor={inputId}>Email</label>
      <input id={inputId} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="tu@email.com" />
      <button className="action" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : button}</button>
    </div>
    <div className="form-trap" aria-hidden="true"><label>Tu web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="lead-privacy"><input type="checkbox" name="privacy" required /><span>Acepto la <Link href="/privacidad">política de privacidad</Link>. Puedes darte de baja cuando quieras.</span></label>
    {status === 'error' && <p className="form-error" role="alert">{error}</p>}
  </form>
}

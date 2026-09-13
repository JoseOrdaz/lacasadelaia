'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const fields = new FormData(form)
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(fields), privacy: fields.get('privacy') === 'on' }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setStatus('success')
      form.reset()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se ha podido enviar. Puedes escribir a hola@lacasadelaia.com.')
      setStatus('error')
    }
  }
  return <form onSubmit={submit} className="contact-form" aria-label="Cuéntame tu proyecto">
    <div className="form-pair">
      <label>Nombre<input name="name" autoComplete="name" required maxLength={100} placeholder="¿Cómo te llamas?" /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="tu@email.com" /></label>
    </div>
    <label>¿Qué necesitas?<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Por ejemplo: cada día copio los datos de los emails a un Excel y me gustaría dejar de hacerlo a mano." /></label>
    <div className="form-trap" aria-hidden="true"><label>Tu web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="privacy-check"><input type="checkbox" name="privacy" required /><span>He leído la <Link href="/privacidad">política de privacidad</Link>. Mis datos se usarán para responder a esta consulta.</span></label>
    <button className="action" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Enviando…' : 'Cuéntame qué quieres automatizar →'}</button>
    <div aria-live="polite" role="status">{status === 'success' && <p className="form-success">Tu consulta se ha guardado. Te responderé al email que has indicado.</p>}{status === 'error' && <p className="form-error">{error}</p>}</div>
  </form>
}

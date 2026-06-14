'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'page'
}

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Ready to connect with Mailchimp, Brevo or Resend
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    console.log('Newsletter subscription:', email)

    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className={`${variant === 'page' ? 'max-w-md' : ''} animate-fade-in`}>
        <div className="bg-lime-light border border-lime rounded-sm p-4 flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-body font-semibold text-carbon text-sm">¡Ya estás dentro!</p>
            <p className="font-body text-xs text-ink/70 mt-0.5">
              Te llegará un email de confirmación en breve.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const isInline = variant === 'inline'

  return (
    <form
      onSubmit={handleSubmit}
      className={`${variant === 'page' ? 'max-w-md' : ''} ${isInline ? 'flex gap-2' : 'space-y-3'}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={status === 'loading'}
        className={`
          ${isInline ? 'flex-1' : 'w-full'}
          font-body text-sm text-carbon bg-cream border border-carbon rounded-sm
          px-4 py-3 outline-none
          placeholder:text-mist
          focus:border-carbon focus:ring-2 focus:ring-lime/40
          disabled:opacity-50 transition-all duration-150
        `}
      />
      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className={`
          ${isInline ? 'shrink-0' : 'w-full'}
          font-body font-semibold text-sm
          bg-carbon text-cream border border-carbon rounded-sm
          px-6 py-3
          hover:bg-ink transition-colors duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {status === 'loading' ? 'Enviando...' : 'Apuntarme'}
      </button>
    </form>
  )
}

import Link from 'next/link'

export default function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'inline' | 'page' }) {
  return <div className={variant === 'page' ? 'max-w-md' : ''}><p className="text-sm leading-relaxed mb-4">La suscripción a la newsletter todavía no está disponible. Puedes leer las guías en el blog.</p><Link href="/blog" className="btn-lime">Leer el blog →</Link></div>
}

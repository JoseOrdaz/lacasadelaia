import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import { guideTitle } from '@/data/guide'

export default function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'inline' | 'page' }) {
  return <div className={variant === 'page' ? 'max-w-md' : ''}>
    <LeadForm
      source="newsletter"
      detail={`Alta en newsletter y guía «${guideTitle}»`}
      button="Quiero la guía →"
      success={<p><strong>¡Bienvenido/a!</strong> Aquí tienes tu guía: <Link href="/guia-automatizaciones">{guideTitle} →</Link></p>}
    />
  </div>
}

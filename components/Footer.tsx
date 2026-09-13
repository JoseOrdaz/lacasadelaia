import Link from 'next/link'

export default function Footer() {
  return <footer className="site-footer"><div className="wrap"><div className="footer-top"><Link href="/" className="footer-brand">La Casa de la IA<span>Cuéntame qué haces. Buscamos cómo mejorarlo.</span></Link><a href="mailto:hola@lacasadelaia.com">hola@lacasadelaia.com ↗</a></div><nav aria-label="Recursos" className="footer-resources"><Link href="/blog">Blog</Link><Link href="/automations">Automatizaciones</Link><Link href="/tools">Herramientas</Link><Link href="/templates">Plantillas</Link><Link href="/newsletter">Newsletter</Link></nav><div className="footer-bottom"><p>© {new Date().getFullYear()} La Casa de la IA · Tecnología con trato directo.</p><nav aria-label="Información legal"><Link href="/privacidad">Privacidad</Link><Link href="/aviso-legal">Aviso legal</Link></nav></div></div></footer>
}

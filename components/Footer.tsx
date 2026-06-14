import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/tools', label: 'Herramientas' },
  { href: '/templates', label: 'Plantillas' },
  { href: '/news', label: 'Noticias' },
  { href: '/newsletter', label: 'Newsletter' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-carbon text-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream/10">

          {/* Brand col (spans 2 on lg) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 bg-lime rounded-sm flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logo-lacasadelaia.png"
                  alt="La Casa de la IA"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="font-display text-xl text-cream group-hover:text-cream/80 transition-colors">
                La Casa de la IA
              </span>
            </Link>
            <p className="font-body text-sm text-cream/55 leading-relaxed max-w-xs mb-6">
              Recursos prácticos de IA para trabajar mejor, ahorrar tiempo y descubrir
              herramientas útiles sin humo.
            </p>
            <div className="inline-flex items-center gap-2 border border-cream/15 rounded-sm px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
              <span className="font-body text-xs text-cream/40">
                Proyecto independiente en fase MVP
              </span>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-cream/35 mb-5">
              Secciones
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-cream/55 hover:text-cream transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter col */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-cream/35 mb-5">
              Newsletter
            </p>
            <p className="font-body text-sm text-cream/55 leading-relaxed mb-4">
              Una idea útil de IA cada semana. Sin spam.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full font-body text-sm text-carbon bg-cream/95 border border-cream/20 rounded-sm px-3 py-2.5 placeholder:text-mist outline-none focus:border-lime transition-colors"
              />
              <Link
                href="/newsletter"
                className="block w-full text-center font-body text-sm font-semibold bg-lime text-carbon rounded-sm py-2.5 hover:bg-lime-hover transition-colors duration-150"
              >
                Apuntarme →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/30">
            © {year} lacasadelaia.com — Todos los derechos reservados
          </p>
          <p className="font-body text-xs text-cream/20">
            Hecho con curiosidad y demasiadas pestañas abiertas
          </p>
        </div>
      </div>
    </footer>
  )
}

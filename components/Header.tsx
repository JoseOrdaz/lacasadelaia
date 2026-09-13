'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  ['/#soluciones', 'Soluciones'], ['/#ejemplos', 'Así funciona'], ['/#sobre-mi', 'Sobre mí'], ['/blog', 'Blog'],
]
export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return <header className="site-header" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus() } }}>
    <div className="wrap header-inner">
      <Link href="/" aria-label="La Casa de la IA — Inicio" onClick={() => setOpen(false)}><Image src="/logo-lacasadelaia.png" alt="La Casa de la IA" width={244} height={74} priority className="brand-logo" /></Link>
      <nav aria-label="Navegación principal" className="desktop-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={href === '/blog' && pathname.startsWith('/blog') ? 'page' : undefined}>{label}</Link>)}</nav>
      <Link href="/#contacto" className="header-cta" onClick={() => setOpen(false)}>Hablemos <span aria-hidden="true">↗</span></Link>
      <button id="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="menu-toggle">{open ? 'Cerrar −' : 'Menú +'}</button>
    </div>
    {open && <nav id="mobile-nav" aria-label="Navegación móvil" className="mobile-nav">{[...links, ['/automations', 'Catálogo de automatizaciones'], ['/tools', 'Herramientas'], ['/templates', 'Plantillas'], ['/#contacto', 'Cuéntame qué quieres automatizar →']].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}
  </header>
}

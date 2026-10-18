'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  ['/#soluciones', 'Soluciones'], ['/descubre', 'Descubre qué automatizar'], ['/#sobre-mi', 'Sobre mí'], ['/blog', 'Blog'], ['/tools', 'Herramientas'],
]
export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return <header className="site-header" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus() } }}>
    <div className="wrap header-inner">
      <Link href="/" aria-label="La Casa de la IA — Inicio" onClick={() => setOpen(false)}><Image src="/logo-lacasadelaia.png" alt="La Casa de la IA" width={244} height={74} priority className="brand-logo" /></Link>
      <nav aria-label="Navegación principal" className="desktop-nav">{links.map(([href, label]) => <Link key={href} href={href} aria-current={(href === '/blog' && pathname.startsWith('/blog')) || (href === '/descubre' && pathname === '/descubre') || (href === '/tools' && pathname.startsWith('/tools')) ? 'page' : undefined}>{label}</Link>)}</nav>
      <nav aria-label="Síguenos en redes sociales" className="header-socials"><a href="https://www.instagram.com/lacasadelaia_com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Image src="/social/instagram-logo.svg" alt="" width={16} height={16} aria-hidden="true" className="social-icon" /></a><a href="https://x.com/lacasadelaiacom" target="_blank" rel="noopener noreferrer" aria-label="X"><Image src="/social/X_logo_2023.svg" alt="" width={16} height={16} aria-hidden="true" className="social-icon" /></a></nav>
      <Link href="/#contacto" className="header-cta" onClick={() => setOpen(false)}>Hablemos <span aria-hidden="true">↗</span></Link>
      <button id="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="menu-toggle">{open ? 'Cerrar −' : 'Menú +'}</button>
    </div>
    {open && <nav id="mobile-nav" aria-label="Navegación móvil" className="mobile-nav">{[...links, ['/automations', 'Catálogo de automatizaciones'], ['/templates', 'Plantillas'], ['/#contacto', 'Cuéntame qué quieres automatizar →']].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<div className="mobile-socials"><span>Síguenos en redes</span><div><a href="https://www.instagram.com/lacasadelaia_com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Image src="/social/instagram-logo.svg" alt="" width={16} height={16} aria-hidden="true" className="social-icon" /></a><a href="https://x.com/lacasadelaiacom" target="_blank" rel="noopener noreferrer" aria-label="X"><Image src="/social/X_logo_2023.svg" alt="" width={16} height={16} aria-hidden="true" className="social-icon" /></a></div></div></nav>}
  </header>
}

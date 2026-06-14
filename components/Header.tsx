'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

/* ── SVG icons ─────────────────────────────────────────────────────── */
const icons = {
  home: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 5.5L7 1l6 4.5V13H9V9H5v4H1V5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  tools: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M8.5 2A3.5 3.5 0 0 0 5.3 7L1.5 10.8a1.2 1.2 0 1 0 1.7 1.7L7 8.7A3.5 3.5 0 0 0 8.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="5.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  templates: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="11" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5h11M5 5v7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  news: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="2" width="11" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 5.5h6M4 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  newsletter: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 4.5L7 8l5.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  automations: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M8 1.5L2.5 8h3.8L5 12.5 11.5 6H7.7L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    </svg>
  ),
}

const navLinks = [
  { href: '/automations', label: 'Automatizaciones', icon: icons.automations },
  { href: '/news',        label: 'Noticias',          icon: icons.news },
  { href: '/tools',       label: 'Herramientas',      icon: icons.tools },
  { href: '/templates',   label: 'Plantillas',        icon: icons.templates },
]

const drawerLinks = [
  { href: '/',           label: 'Inicio',       icon: icons.home },
  ...navLinks,
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function Header() {
  const pathname  = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-cream/96 backdrop-blur-md transition-all duration-200 ${
          scrolled ? 'shadow-[0_1px_14px_rgba(0,0,0,0.08)]' : 'border-b border-faded'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" aria-label="La Casa de la IA — Inicio" className="flex-shrink-0 group">
              <Image
                src="/logo-lacasadelaia.png"
                alt="La Casa de la IA"
                width={244}
                height={74}
                priority
                className="h-[74px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-70"
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-0.5" role="navigation">
              {navLinks.map(({ href, label, icon }) => {
                const active = isActive(href, pathname)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center gap-1.5 font-body text-[16px] font-medium px-3.5 py-2 rounded-sm transition-all duration-150 ${
                      active
                        ? 'text-carbon bg-parchment'
                        : 'text-ink/50 hover:text-carbon hover:bg-parchment/70'
                    }`}
                  >
                    {icon}
                    {label}
                    {active && (
                      <span className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── CTA + hamburger ── */}
            <div className="flex items-center gap-2">
              <Link
                href="/newsletter"
                className="hidden md:inline-flex items-center gap-1.5 font-body text-[13px] font-semibold bg-lime text-black rounded-sm px-4 py-2.5 group hover:bg-lime/80 transition-colors duration-150"
            
              >
                Recibir recursos gratis
                <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
              </Link>

              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Abrir menú"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm hover:bg-parchment transition-colors duration-150"
              >
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" aria-hidden="true">
                  <line x1="0" y1="0.75"  x2="20" y2="0.75"  stroke="#1A1A18" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="6.5"   x2="14" y2="6.5"   stroke="#1A1A18" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="12.25" x2="20" y2="12.25" stroke="#1A1A18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Overlay ─────────────────────────────────────────────── */}
      <div
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-carbon/35 backdrop-blur-[3px] transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Drawer ──────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[90vw] bg-cream flex flex-col transition-transform duration-300 ease-out md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-[72px] px-5 border-b border-faded flex-shrink-0">
          <Image
            src="/logo-lacasadelaia.png"
            alt="La Casa de la IA"
            width={130}
            height={43}
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Cerrar menú"
            className="flex items-center justify-center w-9 h-9 rounded-sm hover:bg-parchment transition-colors duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#1A1A18" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-5 pt-3 pb-2 flex flex-col">
          {drawerLinks.map(({ href, label, icon }) => {
            const active = isActive(href, pathname)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 py-3.5 border-b border-faded/60 transition-colors duration-150 group ${
                  active ? 'text-carbon' : 'text-ink/40 hover:text-carbon'
                }`}
              >
                {/* Icon circle */}
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-sm flex-shrink-0 transition-colors duration-150 ${
                    active ? 'bg-lime text-carbon' : 'bg-parchment text-ink/50 group-hover:bg-lime-light group-hover:text-carbon'
                  }`}
                >
                  {icon}
                </span>
                <span className={`font-display text-[20px] leading-none ${active ? '' : ''}`}>
                  {label}
                </span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 pt-4 pb-8 flex-shrink-0 space-y-3">
          <Link
            href="/newsletter"
            className="flex items-center justify-center gap-1.5 w-full font-body text-sm font-semibold bg-lime text-carbon border border-carbon rounded-sm py-3.5 hover:bg-lime-hover transition-colors duration-150"
          >
            Recibir recursos gratis →
          </Link>
          <p className="font-body text-xs text-mist text-center">Sin spam. Gratis para siempre.</p>
        </div>
      </div>
    </>
  )
}

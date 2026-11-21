'use client'

import { useEffect, useState } from 'react'

/** Barra fija en móvil: aparece tras el hero y se oculta cuando el formulario ya está a la vista. */
export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const contact = document.getElementById('contacto')
    let contactInView = false
    const update = () => setVisible(window.scrollY > 700 && !contactInView)
    const observer = contact ? new IntersectionObserver(([entry]) => { contactInView = entry.isIntersecting; update() }) : null
    if (contact && observer) observer.observe(contact)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', update); observer?.disconnect() }
  }, [])
  return <div className={`mobile-sticky-cta ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
    <span>¿Una tarea que se repite?</span>
    <a className="action" href="#contacto" tabIndex={visible ? 0 : -1}>Cuéntamela →</a>
  </div>
}

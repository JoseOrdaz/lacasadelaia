'use client'

import type { ReactNode } from 'react'

export const PREFILL_EVENT = 'lcia:prefill-contact'

/** Lleva al formulario de contacto con el mensaje ya rellenado, sin salir de la página. */
export default function PrefillContactLink({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  return <a
    href="#contacto"
    className={className}
    onClick={() => window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: message }))}
  >{children}</a>
}

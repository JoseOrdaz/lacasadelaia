'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'lacasadelaia_cookie_consent'
const ANALYTICS_ID = 'G-S7H8MG63L8'
type Consent = 'accepted' | 'rejected' | null

export default function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [consent, setConsent] = useState<Consent>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'rejected') setConsent(stored)
    setReady(true)
  }, [])

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
  }

  return <>
    {ready && consent === 'accepted' && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_ID}');`}
      </Script>
    </>}
    {ready && consent === null && <aside className="cookie-banner" aria-label="Aviso de cookies">
      <div className="cookie-banner-copy">
        <strong>Usamos cookies</strong>
        <p>Google Analytics nos ayuda a entender cómo se utiliza la web. Solo se activa si aceptas. <Link href="/privacidad">Más información</Link>.</p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-reject" onClick={() => saveConsent('rejected')}>Rechazar</button>
        <button type="button" className="cookie-banner-accept" onClick={() => saveConsent('accepted')}>Aceptar</button>
      </div>
    </aside>}
  </>
}

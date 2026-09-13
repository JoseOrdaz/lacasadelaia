import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lacasadelaia.com'),
  title: { default: 'Automatización con IA y n8n | La Casa de la IA', template: '%s | La Casa de la IA' },
  description: 'Automatización con IA, n8n e integraciones para empresas y particulares en España. Más de 15 años desarrollando soluciones tecnológicas. Trato directo.',
  authors: [{ name: 'La Casa de la IA' }],
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: 'La Casa de la IA',
    title: 'Cuéntame qué haces. Buscamos cómo mejorarlo.',
    description: 'Automatización con IA y desarrollo a medida. Más de 15 años de experiencia. Tecnología con trato directo.',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'La Casa de la IA — Automatización con IA y desarrollo a medida' }],
  },
  twitter: { card: 'summary_large_image', title: 'La Casa de la IA — Automatización con IA y n8n', description: 'Cuéntame qué haces. Buscamos cómo mejorarlo.', images: ['/og'] },
  robots: { index: true, follow: true },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <Header />
        <main id="contenido" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S7H8MG63L8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S7H8MG63L8');
          `}
        </Script>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
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
  title: {
    default: 'La Casa de la IA | Herramientas, plantillas y noticias de IA',
    template: '%s | La Casa de la IA',
  },
  description:
    'Recursos prácticos de inteligencia artificial para profesionales: herramientas, plantillas, noticias y automatizaciones para ahorrar tiempo.',
  keywords: [
    'herramientas IA',
    'inteligencia artificial',
    'plantillas IA',
    'automatización',
    'productividad',
    'ChatGPT',
    'Claude',
    'freelancers',
    'pymes',
    'noticias IA',
  ],
  authors: [{ name: 'La Casa de la IA' }],
  creator: 'La Casa de la IA',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lacasadelaia.com',
    siteName: 'La Casa de la IA',
    title: 'La Casa de la IA | Herramientas, plantillas y noticias de IA',
    description:
      'Recursos prácticos de inteligencia artificial para profesionales: herramientas, plantillas, noticias y automatizaciones para ahorrar tiempo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Casa de la IA | Herramientas, plantillas y noticias de IA',
    description:
      'Recursos prácticos de inteligencia artificial para profesionales: herramientas, plantillas, noticias y automatizaciones para ahorrar tiempo.',
  },
  robots: { index: true, follow: true },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import { ImageResponse } from 'next/og'
export const dynamic = 'force-static'
const size = { width: 1200, height: 630 }
export function GET() {
  return new ImageResponse(<div style={{ background: '#faf9f4', color: '#262c20', display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '65px 80px', fontFamily: 'sans-serif' }}><div style={{ fontSize: 27, marginBottom: 60 }}>La Casa de la IA</div><div style={{ fontSize: 68, letterSpacing: '-3px', lineHeight: 1.1, maxWidth: 980 }}>Cuéntame qué haces.</div><div style={{ fontSize: 68, letterSpacing: '-3px', color: '#607343', lineHeight: 1.1 }}>Buscamos cómo mejorarlo.</div><div style={{ display: 'flex', marginTop: 55, fontSize: 25, background: '#d4ed9b', padding: '20px 25px' }}>IA · Automatización · n8n · Desarrollo a medida</div><div style={{ fontSize: 21, marginTop: 25 }}>Más de 15 años desarrollando soluciones tecnológicas.</div></div>, size)
}

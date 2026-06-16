import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>404 — Página no encontrada</h1>
      <Link href="/admin">Volver al panel</Link>
    </div>
  )
}

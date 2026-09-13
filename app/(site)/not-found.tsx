import Link from 'next/link'
export default function NotFound() {
  return <section className="container-main section"><p className="text-sm mb-5">404 · Esta página no está aquí</p><h1 className="font-display text-5xl mb-6">Volvamos a lo importante.</h1><p className="mb-8">Puedes explorar las soluciones o contarme qué necesitas.</p><Link className="btn-primary" href="/">Volver al inicio →</Link><Link className="btn-secondary ml-3" href="/#contacto">Hablemos</Link></section>
}

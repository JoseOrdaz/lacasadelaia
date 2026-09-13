'use client'
export default function BlogError({ reset }: { reset: () => void }) {
  return <section className="container-main section"><h2 className="font-display text-3xl mb-5">El blog no está disponible en este momento.</h2><p className="mb-6">No hemos podido cargar los artículos. Puedes volver a intentarlo.</p><button className="btn-primary" onClick={reset}>Volver a cargar</button></section>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal y condiciones de uso del sitio lacasadelaia.com.',
  robots: { index: false, follow: true },
}

export default function AvisoLegalPage() {
  return (
    <section className="section">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-6">
          Aviso legal
        </h1>

        <div className="bg-lime-light border border-lime rounded-sm p-5 mb-10">
          <p className="font-body text-sm text-carbon leading-relaxed">
            <strong>Pendiente de completar.</strong> Este documento necesita los datos
            identificativos reales del titular (nombre o razón social, NIF, domicilio y registro
            mercantil si procede) y una revisión legal antes de publicarse.
          </p>
        </div>

        <div className="prose-editorial">
          <h2>Titular del sitio</h2>
          <p>Datos identificativos pendientes de incorporar.</p>

          <h2>Objeto</h2>
          <p>
            Este sitio web ofrece información sobre servicios de automatización de procesos con
            inteligencia artificial, así como recursos gratuitos (noticias, herramientas y
            plantillas).
          </p>

          <h2>Condiciones de uso</h2>
          <p>
            El acceso al sitio implica la aceptación de estas condiciones. El contenido publicado
            tiene carácter informativo y no constituye asesoramiento profesional.
          </p>

          <h2>Propiedad intelectual</h2>
          <p>
            Los contenidos, marcas y elementos gráficos del sitio pertenecen a sus respectivos
            titulares y no pueden reproducirse sin autorización.
          </p>

          <h2>Contacto</h2>
          <p>
            Para cualquier cuestión relacionada con este aviso legal:{' '}
            <a href="mailto:hola@lacasadelaia.com" className="underline">
              hola@lacasadelaia.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

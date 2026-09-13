import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo se tratan los datos personales en lacasadelaia.com.',
  robots: { index: false, follow: true },
}

export default function PrivacidadPage() {
  return (
    <section className="section">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-carbon leading-tight mb-6">
          Política de privacidad
        </h1>

        <div className="bg-lime-light border border-lime rounded-sm p-5 mb-10">
          <p className="font-body text-sm text-carbon leading-relaxed">
            <strong>Pendiente de completar.</strong> Falta indicar el responsable del tratamiento,
            los encargados reales (proveedor de email marketing, hosting y analítica) y los plazos
            de conservación. Revísalo con un profesional antes de publicarlo.
          </p>
        </div>

        <div className="prose-editorial">
          <h2>Responsable del tratamiento</h2>
          <p>Datos identificativos pendientes de incorporar.</p>

          <h2>Qué datos recogemos</h2>
          <ul>
            <li>Email, cuando te suscribes a la newsletter.</li>
            <li>Los datos que nos escribas al solicitar una auditoría o contactar por correo.</li>
          </ul>

          <h2>Para qué los usamos</h2>
          <p>
            Para responder a tu solicitud, enviarte los contenidos a los que te has suscrito y
            gestionar la relación comercial. No vendemos ni cedemos tus datos a terceros con
            fines publicitarios.
          </p>

          <h2>Base legal</h2>
          <p>
            Tu consentimiento en el caso de la newsletter, y la ejecución de un contrato o medidas
            precontractuales en el caso de las solicitudes de servicio.
          </p>

          <h2>Tus derechos</h2>
          <p>
            Puedes acceder, rectificar, suprimir, limitar u oponerte al tratamiento de tus datos,
            así como solicitar su portabilidad, escribiendo a{' '}
            <a href="mailto:hola@lacasadelaia.com" className="underline">
              hola@lacasadelaia.com
            </a>
            . También puedes reclamar ante la Agencia Española de Protección de Datos.
          </p>
        </div>
      </div>
    </section>
  )
}

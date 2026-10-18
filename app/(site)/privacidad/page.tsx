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
            <strong>Pendiente de completar antes de publicar.</strong> Falta facilitar el NIF,
            confirmar el nombre legal exacto y concretar los plazos y condiciones de los
            proveedores. Revísalo con un profesional.
          </p>
        </div>

        <div className="prose-editorial">
          <h2>Responsable del tratamiento</h2>
          <p>
            La Casa de la IA, persona autónoma. Domicilio: Carrer Sant Vicent Ferrer, Alboraya,
            Valencia, España. Email: <a href="mailto:hola@lacasadelaia.com" className="underline">hola@lacasadelaia.com</a>.
            Teléfono: <a href="tel:+34680851926" className="underline">680 851 926</a>. NIF: pendiente de facilitar.
          </p>

          <h2>Qué datos recogemos</h2>
          <ul>
            <li>Nombre, email y mensaje cuando utilizas el formulario de contacto.</li>
            <li>Los datos que nos escribas al contactar por correo electrónico.</li>
            <li>Datos de uso agregados mediante Google Analytics, solo si aceptas las cookies analíticas.</li>
          </ul>

          <h2>Para qué los usamos</h2>
          <p>
            Para responder a tu solicitud y gestionar la relación comercial. La newsletter no está
            activa actualmente. No vendemos ni cedemos tus datos a terceros con fines publicitarios.
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

          <h2>Proveedores y conservación</h2>
          <p>
            La web utiliza Vercel para el alojamiento, MongoDB para la base de datos, Arsys para
            el correo y Google Analytics para la analítica, únicamente con consentimiento. Las
            consultas se conservarán durante el tiempo necesario para atenderlas y, si existe una
            relación comercial, durante los plazos legales aplicables. Falta confirmar las entidades
            jurídicas, ubicaciones y garantías de cada proveedor.
          </p>

          <h2>Cookies</h2>
          <p>
            El sitio utiliza cookies técnicas necesarias y cookies analíticas de Google Analytics
            únicamente cuando las aceptas en el banner. Puedes rechazar las cookies analíticas sin
            perder el acceso al sitio.
          </p>
        </div>
      </div>
    </section>
  )
}

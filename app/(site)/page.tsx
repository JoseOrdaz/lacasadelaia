import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Braces, Workflow as FlowIcon, Mail, FileText, Check, Building2, Sparkles, Camera, UserRound } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Workflow from '@/components/landing/Workflow'
import { solutions, examples, faqs } from '@/data/home'
import { getProfilePhoto } from '@/lib/payload'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Automatización con IA y n8n en España | La Casa de la IA',
  description: 'Automatizo tareas y conecto tus herramientas con IA, n8n y desarrollo a medida. Más de 15 años de experiencia. Cuéntame qué haces y buscamos cómo mejorarlo.',
  alternates: { canonical: '/' },
}
const icons = [Building2, Sparkles, FlowIcon, Camera, UserRound, Braces]
const steps = [
  ['Me cuentas el problema', 'Como se lo contarías a alguien que se sienta a tu lado. Sin tecnicismos.'],
  ['Analizamos el proceso', 'Vemos qué repites, dónde pierdes tiempo y qué merece la pena cambiar.'],
  ['Diseñamos la solución', 'Te propongo un alcance y presupuesto: IA, integración, desarrollo o una combinación.'],
  ['Lo construyo', 'Implemento y pruebo el proceso, también cuando algo no sale como esperamos.'],
  ['Lo dejamos funcionando', 'Te explico cómo usarlo, lo documento y acordamos mantenimiento si lo necesitas.'],
]
export default async function Home() {
  const photo = await getProfilePhoto()
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Automatización con IA y desarrollo tecnológico', serviceType: 'Automatización de procesos, integraciones y desarrollo a medida', areaServed: { '@type': 'Country', name: 'España' }, provider: { '@type': 'Organization', name: 'La Casa de la IA', url: 'https://lacasadelaia.com', email: 'hola@lacasadelaia.com' } }
  return <div className="studio">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="hero-studio wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Tecnología útil. Trato directo.</p>
        <h1>Menos tareas.<br />Más tiempo.<br /><em>Así de sencillo.</em></h1>
        <p className="hero-description">Automatizo tareas y procesos con <strong>IA, n8n e integraciones</strong> para empresas y particulares. Para que dediques tu tiempo a lo que realmente importa.</p>
        <div className="hero-actions"><a className="action" href="#contacto">Cuéntame qué quieres automatizar <span aria-hidden="true">→</span></a><a className="text-link" href="#soluciones">Ver soluciones <span aria-hidden="true">↗</span></a></div>
        <p className="hero-proof"><span>+15</span> años desarrollando soluciones tecnológicas.<br className="mobile-break" /> Hablas conmigo, de principio a fin.</p>
      </div>
      <div className="hero-board" aria-label="Ejemplo de un email convertido en información organizada">
        <div className="board-top"><span>DE REPETITIVO A RESUELTO</span><span className="board-dots" aria-hidden="true">•••</span></div>
        <div className="board-note">“Otra vez pasando<br />emails a Excel…”<span aria-hidden="true">↘</span></div>
        <div className="board-flow">
          <div className="board-node"><span className="node-icon"><Mail size={20} /></span><div><small>01 · EL PUNTO DE PARTIDA</small><strong>Llega un email</strong></div></div>
          <div className="board-connector" aria-hidden="true">↓</div>
          <div className="board-node ai-node"><span className="node-icon"><Sparkles size={20} /></span><div><small>02 · IA + AUTOMATIZACIÓN</small><strong>Lee, clasifica y extrae</strong></div><span className="node-chip">n8n</span></div>
          <div className="board-connector" aria-hidden="true">↓</div>
          <div className="board-node"><span className="node-icon"><FileText size={20} /></span><div><small>03 · TODO EN SU SITIO</small><strong>Datos guardados. Tú, al día.</strong></div><Check size={17} /></div>
        </div>
        <div className="board-result"><span className="result-check"><Check size={18} /></span><div><strong>Un paso menos en tu lista.</strong><p>Y más espacio para lo importante.</p></div></div>
        <p className="board-caption">Ejemplo ilustrativo · Reglas y revisión a tu medida</p>
      </div>
    </section>
    <div className="expertise-strip"><div className="wrap"><span>El problema primero.<br /><strong>La tecnología, después.</strong></span><span>Inteligencia artificial</span><span>n8n & integraciones</span><span>Desarrollo a medida</span><span>Empresas & particulares</span></div></div>
    <section className="section-studio wrap problem-section">
      <div><p className="eyebrow">¿TE SUENA?</p><h2>Si lo haces una<br />y otra vez,<br /><em>hablemos.</em></h2><p>No necesitas otra herramienta que aprender. Necesitas que las que ya usas trabajen mejor juntas.</p></div>
      <div className="problem-list">{['Copias datos de una aplicación a otra.', 'Publicas a mano en tus redes sociales.', 'Respondes siempre las mismas preguntas.', 'Pierdes horas preparando informes.', 'Tienes información repartida entre emails, Excel y otras herramientas.'].map((text, i) => <div key={text}><span>0{i + 1}</span><p>{text}</p><ArrowUpRight size={19} aria-hidden="true" /></div>)}<p className="problem-close">Si haces lo mismo una y otra vez, probablemente podamos automatizarlo.</p></div>
    </section>
    <section className="section-studio soft-section" id="soluciones"><div className="wrap" id="servicios"><div className="section-heading"><div><p className="eyebrow">CÓMO PUEDO AYUDARTE</p><h2>No vendo herramientas.<br /><em>Resuelvo problemas.</em></h2></div><p>Desde una tarea que te quita tiempo hasta una aplicación que necesita tu negocio. Empezamos por lo que necesitas resolver.</p></div><div className="solutions-grid">{solutions.map((solution, i) => { const Icon = icons[i]; return <article className="solution" key={solution.title}><div className="solution-top"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span>0{i + 1}</span></div><h3>{solution.title}</h3><p>{solution.text}</p><a href="#contacto">{solution.tag}<ArrowUpRight size={17} aria-hidden="true" /></a></article> })}</div></div></section>
    <section className="section-studio wrap" id="ejemplos"><div className="section-heading"><div><p className="eyebrow">DEL “¿Y SI…?” AL “YA ESTÁ”</p><h2>Así podría funcionar<br /><em>en tu día a día.</em></h2></div><p>Ejemplos de lo que podemos construir. El flujo final depende de tus herramientas, tus datos y tu forma de trabajar.</p></div><div className="example-list">{examples.map((example, i) => <article className="example" key={example.title}><div className="example-heading"><span className="example-index">0{i + 1}</span><div><h3>{example.title}</h3><p>{example.description}</p></div><ArrowUpRight aria-hidden="true" /></div><Workflow nodes={example.nodes} /><p className="example-benefit"><Check size={16} aria-hidden="true" />{example.benefit}</p></article>)}</div><div className="tools-line"><strong>Conectar todas tus herramientas</strong><p>CRM · Email · Excel / Sheets · APIs · Slack / Teams · Bases de datos</p></div></section>
    <section className="section-studio soft-section" id="n8n"><div className="wrap technology-grid"><div><p className="eyebrow">BAJO EL CAPÓ, SIN COMPLICACIONES</p><h2>n8n conecta.<br /><em>La IA interpreta.</em><br />Tú mantienes el control.</h2><p>n8n permite conectar aplicaciones y crear automatizaciones para que no tengas que hacer cada tarea manualmente. Es el hilo que une tus herramientas.</p><p>La IA añade la capacidad de entender información: leer un email, identificar una petición o preparar una respuesta. Yo diseño cómo se combinan y cuándo necesitas revisar el resultado.</p><a href="#contacto" className="text-link">Hablemos de tu proceso ↗</a></div><div className="comparison"><article><span className="eyebrow">AUTOMATIZACIÓN TRADICIONAL</span><h3>Si pasa esto, haz aquello.</h3><Workflow nodes={['Llega un formulario', 'Guarda los datos', 'Envía un aviso']} /><p>Ideal cuando las reglas están claras.</p></article><article><span className="eyebrow">AUTOMATIZACIÓN + IA</span><h3>Entiende antes de actuar.</h3><Workflow nodes={['Llega un email', 'IA interpreta la petición', 'Prepara la respuesta']} /><p>Con reglas, revisión y avisos para los casos dudosos.</p></article></div></div></section>
    <section className="section-studio wrap about-section" id="sobre-mi"><div className={`portrait-block ${photo ? 'has-photo' : ''}`}>{photo ? <Image src={photo.url} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 440px" className="portrait" /> : <div className="experience-art"><span>TECNOLOGÍA CON EXPERIENCIA</span><strong>15<span>+</span></strong><p>Años construyendo.<br />Aprendiendo. Resolviendo.</p><Braces size={44} strokeWidth={1} aria-hidden="true" /></div>}<span className="portrait-caption">Una persona. De la idea a la solución.</span></div><div><p className="eyebrow">TRATO DIRECTO, DE VERDAD</p><h2>Detrás de<br />La Casa de la IA<br /><em>estoy yo.</em></h2><p>Llevo más de 15 años trabajando en tecnología y desarrollo. La IA y las automatizaciones son una parte de lo que hago, pero mi experiencia va mucho más allá.</p><p>Si tienes un problema informático, una tarea repetitiva, una aplicación que necesitas conectar o simplemente no sabes cómo mejorar un proceso, cuéntamelo.</p><p><strong>Si puedo ayudarte, te explicaré cómo. Y si algo no tiene sentido automatizarlo, también te lo diré.</strong></p><a className="text-link" href="#contacto">Hablemos de tu proyecto ↗</a></div></section>
    <section className="uncertainty wrap"><span className="uncertainty-symbol" aria-hidden="true">?</span><div><p className="eyebrow">NO HACE FALTA TENER LA RESPUESTA</p><h2>¿No sabes exactamente qué necesitas?</h2><p>No pasa nada. Explícame qué haces, qué te lleva tiempo o qué tarea te gustaría dejar de hacer manualmente. Yo estudio si podemos automatizarla.</p></div><a href="#contacto" className="action">Quiero contarte mi problema →</a></section>
    <section className="section-studio wrap" id="proceso"><div className="section-heading"><div><p className="eyebrow">ASÍ TRABAJAMOS</p><h2>De tu problema<br /><em>a una solución que funciona.</em></h2></div><p>Sin cajas negras. Sabes qué vamos a hacer, por qué y qué necesitas para mantenerlo en marcha.</p></div><ol className="process-grid">{steps.map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section className="section-studio soft-section"><div className="wrap faq-grid"><div><p className="eyebrow">ANTES DE DAR EL PASO</p><h2>Preguntas normales.<br /><em>Respuestas claras.</em></h2><p>Y si la tuya no está aquí, escríbeme.</p><a className="text-link" href="#contacto">Cuéntame tu duda ↗</a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="blog-teaser wrap"><div><p className="eyebrow">IDEAS PARA TRABAJAR MEJOR</p><h2>La tecnología,<br /><em>explicada sin rodeos.</em></h2><p>Guías sobre automatización, IA aplicada a negocios e integraciones. Para entender qué tiene sentido para ti.</p></div><Link className="text-link" href="/blog">Explorar el blog <ArrowUpRight size={22} aria-hidden="true" /></Link></section>
    <section className="section-studio contact-section" id="contacto"><div className="wrap contact-grid"><div><p className="eyebrow"><span className="status-dot" /> EMPECEMOS POR UNA CONVERSACIÓN</p><h2>Cuéntame qué haces.<br /><em>Buscamos cómo<br />mejorarlo.</em></h2><p>¿Tienes una tarea que te roba demasiado tiempo? Explícame cómo trabajas ahora y vemos qué podemos hacer.</p><a className="contact-email" href="mailto:hola@lacasadelaia.com">hola@lacasadelaia.com <ArrowUpRight size={18} aria-hidden="true" /></a><p className="contact-note">Contacto directo · Sin tecnicismos · Sin compromiso</p></div><ContactForm /></div></section>
  </div>
}

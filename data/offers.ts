/**
 * Ofertas comerciales de la web. Precios y textos se editan aquí.
 * Revisa especialmente los valores marcados con «REVISAR».
 */

/** Enlace de reserva (Cal.com, Calendly…). Si no se define, los botones llevan al formulario. */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || ''

/** Texto de plazo de respuesta junto al formulario. REVISAR: pon solo lo que puedas cumplir. */
export const responseNote = 'Te respondo yo personalmente, sin comerciales ni respuestas automáticas.'

export const audit = {
  title: 'Diagnóstico de automatización',
  duration: '45 minutos · videollamada',
  price: 'Gratis', // REVISAR: p. ej. '49 € (se descuenta si contratas)'
  points: [
    'Revisamos cómo trabajas hoy y dónde se te va el tiempo.',
    'Te digo qué se puede automatizar, qué no y qué no compensa.',
    'Sales con 2-3 ideas priorizadas y un precio orientativo.',
  ],
  prefill: 'Quiero reservar el diagnóstico de automatización. Mi negocio se dedica a… y la tarea que más tiempo me quita es…',
}

export type MaintenancePlan = { name: string; price: string; for: string; features: string[]; highlight?: boolean }

/** REVISAR precios y condiciones antes de publicarlos. */
export const maintenancePlans: MaintenancePlan[] = [
  {
    name: 'Vigilancia',
    price: '39 €/mes',
    for: '1-2 automatizaciones sencillas',
    features: ['Revisión de errores y avisos', 'Arreglos cuando cambia una API', 'Respuesta en días laborables'],
  },
  {
    name: 'Tranquilidad',
    price: '79 €/mes',
    for: 'Varias automatizaciones en uso diario',
    features: ['Todo lo de Vigilancia', 'Hasta 2 h/mes de pequeños cambios', 'Revisión mensual de resultados'],
    highlight: true,
  },
  {
    name: 'Mejora continua',
    price: '149 €/mes',
    for: 'Procesos críticos o con IA',
    features: ['Todo lo de Tranquilidad', 'Hasta 5 h/mes de mejoras', 'Ajuste de prompts y costes de IA'],
  },
]

export const webAudit = {
  reviewPrice: 'desde 149 €', // REVISAR
  reviewPrefill: 'He usado el analizador de preparación para IA y quiero que revises y mejores mi web: ',
}

export const training = {
  workshop: {
    title: 'Taller práctico: n8n + IA para pymes',
    format: 'En directo, online · 3 horas · grupos reducidos',
    price: '79 € por persona', // REVISAR
    outcomes: [
      'Entender qué tareas merece la pena automatizar y cuáles no.',
      'Montar tu primer flujo en n8n de principio a fin.',
      'Añadir IA para leer emails, clasificar y redactar con revisión humana.',
      'Saber cuánto cuesta mantenerlo y cómo controlar los costes de IA.',
    ],
  },
  company: {
    title: 'Formación para equipos',
    format: 'Online o presencial · contenido adaptado a vuestras herramientas',
    price: 'Presupuesto a medida',
    note: 'Si sois empresa en España, la formación puede bonificarse a través de FUNDAE según vuestro crédito disponible. Te ayudo a revisar si encaja.',
  },
}

export type Sector = {
  slug: string
  name: string
  title: string
  intro: string
  pains: string[]
  examples: { title: string; text: string; saving: string }[]
  from: string
}

/** Páginas por sector para captar búsquedas con intención de compra. */
export const sectors: Sector[] = [
  {
    slug: 'asesorias',
    name: 'Asesorías y gestorías',
    title: 'Automatización para asesorías y gestorías',
    intro: 'Menos tiempo pidiendo papeles y pasando datos. Más tiempo para asesorar a tus clientes.',
    pains: ['Persigues a clientes por la documentación cada trimestre.', 'Copias datos de facturas y emails a mano.', 'Respondes las mismas dudas por email y WhatsApp.'],
    examples: [
      { title: 'Recogida de documentación', text: 'Recordatorios automáticos por cliente y plazo, con enlace para subir documentos y aviso cuando falta algo.', saving: 'Menos persecución en cierres de trimestre' },
      { title: 'Lectura de facturas con IA', text: 'La IA extrae emisor, importe, IVA y fecha de los PDF que llegan y los deja listos para revisar.', saving: 'De teclear a revisar' },
      { title: 'Respuestas a dudas frecuentes', text: 'Borradores de respuesta con tu criterio para las consultas repetidas. Tú apruebas antes de enviar.', saving: 'Bandeja de entrada más corta' },
    ],
    from: 'desde 249 €',
  },
  {
    slug: 'clinicas',
    name: 'Clínicas y centros de salud',
    title: 'Automatización para clínicas y centros de salud',
    intro: 'Citas, recordatorios y seguimiento sin depender de que alguien se acuerde.',
    pains: ['Pacientes que no se presentan a la cita.', 'Recepción saturada con llamadas y mensajes.', 'Seguimientos post-consulta que se quedan sin hacer.'],
    examples: [
      { title: 'Recordatorios de cita', text: 'Aviso automático por email o WhatsApp con opción de confirmar o cambiar la cita.', saving: 'Menos huecos en la agenda' },
      { title: 'Clasificación de mensajes', text: 'La IA ordena las peticiones entrantes (cita, duda, urgencia) y avisa a quien corresponde.', saving: 'Recepción más despejada' },
      { title: 'Seguimiento y reseñas', text: 'Mensaje posterior a la visita con indicaciones y petición de reseña a pacientes satisfechos.', saving: 'Más reseñas sin pedirlas a mano' },
    ],
    from: 'desde 249 €',
  },
  {
    slug: 'inmobiliarias',
    name: 'Inmobiliarias',
    title: 'Automatización para inmobiliarias',
    intro: 'Que ningún contacto de un portal se quede sin respuesta, aunque estés enseñando un piso.',
    pains: ['Leads de portales que se enfrían antes de contestar.', 'Datos de clientes repartidos entre email, Excel y el CRM.', 'Seguimientos que dependen de la memoria de cada agente.'],
    examples: [
      { title: 'Respuesta inmediata a leads', text: 'Cada contacto de Idealista, Fotocasa o la web recibe respuesta al momento y entra en tu CRM.', saving: 'Ningún lead sin contestar' },
      { title: 'Cualificación con IA', text: 'La IA detecta presupuesto, zona y urgencia y prioriza a quién llamar primero.', saving: 'Llamas antes a quien está listo' },
      { title: 'Seguimiento automático', text: 'Recordatorios y mensajes de seguimiento si un cliente lleva días sin responder.', saving: 'Menos operaciones perdidas' },
    ],
    from: 'desde 299 €',
  },
  {
    slug: 'comercios',
    name: 'Comercios y tiendas online',
    title: 'Automatización para comercios y tiendas online',
    intro: 'Pedidos, stock, redes y atención al cliente conectados para que vendas más con el mismo tiempo.',
    pains: ['Preguntas repetidas sobre envíos, tallas o horarios.', 'Stock y pedidos que hay que cuadrar a mano.', 'Redes sociales que se quedan sin publicar.'],
    examples: [
      { title: 'Atención al cliente con IA', text: 'Respuestas a las preguntas frecuentes en web, email o Instagram, con paso a una persona cuando hace falta.', saving: 'Menos mensajes repetidos' },
      { title: 'Pedidos y stock conectados', text: 'Pedidos de la tienda online sincronizados con tu hoja de stock, facturación y avisos de reposición.', saving: 'Adiós a cuadrar a mano' },
      { title: 'Contenido para redes', text: 'Publicaciones generadas a partir de tus productos nuevos, revisadas por ti y programadas.', saving: 'Redes activas sin esfuerzo diario' },
    ],
    from: 'desde 249 €',
  },
]

/** Enlace de los botones del diagnóstico: la agenda si existe, si no el formulario con el mensaje preparado. */
export const auditHref = bookingUrl || `/?mensaje=${encodeURIComponent(audit.prefill)}#contacto`

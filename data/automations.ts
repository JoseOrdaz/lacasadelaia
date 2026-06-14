import type { Automation } from '@/types'

export const automations: Automation[] = [
  {
    id: 'captura-leads',
    title: 'Captura y cualificación de leads',
    description:
      'Conectamos tus formularios con tu CRM, enviamos un email de bienvenida personalizado y notificamos al equipo de ventas — todo en segundos, sin intervención manual.',
    problem: 'Perder leads porque nadie los introduce a tiempo en el sistema',
    tools: ['Make', 'Airtable', 'Gmail', 'ChatGPT'],
    category: 'Ventas',
    price: 'Desde 299€',
    badge: 'Más popular',
    benefit: 'Ahorra entre 5 y 8 horas semanales',
    featured: true,
  },
  {
    id: 'resumen-reuniones',
    title: 'Resumen automático de reuniones',
    description:
      'Transcribimos cada reunión, generamos un acta estructurada con los próximos pasos y la enviamos a todos los participantes en menos de dos minutos.',
    problem: 'Perder tiempo escribiendo actas o no tener registro de lo acordado',
    tools: ['Zapier', 'ChatGPT', 'Notion', 'Google Meet'],
    category: 'Operaciones',
    price: 'Desde 149€',
    badge: undefined,
    benefit: 'Elimina 3-4 horas de trabajo administrativo por semana',
    featured: true,
  },
  {
    id: 'contenido-redes',
    title: 'Publicación automática en redes',
    description:
      'A partir de un artículo o idea, generamos versiones para LinkedIn, Instagram y X, las programamos y publicamos automáticamente según tu calendario editorial.',
    problem: 'No tener tiempo de mantener activas las redes sociales con regularidad',
    tools: ['Make', 'ChatGPT', 'Buffer', 'Notion'],
    category: 'Marketing',
    price: 'Desde 249€',
    badge: 'Nuevo',
    benefit: 'Una semana de contenido lista en 20 minutos',
    featured: true,
  },
  {
    id: 'seguimiento-comercial',
    title: 'Seguimiento comercial automático',
    description:
      'Detectamos cuándo un prospecto lleva días sin responder y enviamos un follow-up personalizado en tu nombre, escalando al comercial solo si es necesario.',
    problem: 'Perder ventas por no hacer seguimiento a tiempo',
    tools: ['Make', 'ChatGPT', 'Gmail', 'HubSpot'],
    category: 'Ventas',
    price: 'Desde 349€',
    badge: undefined,
    benefit: 'Más cierres sin añadir carga al equipo comercial',
    featured: false,
  },
  {
    id: 'informes-semanales',
    title: 'Informes semanales automáticos',
    description:
      'Recogemos datos de tus herramientas (Analytics, CRM, facturación) y generamos un informe semanal listo para revisar, enviado cada lunes a primera hora.',
    problem: 'Dedicar horas a recopilar datos manualmente para tomar decisiones',
    tools: ['Make', 'Google Sheets', 'ChatGPT', 'Slack'],
    category: 'Operaciones',
    price: 'Desde 199€',
    badge: undefined,
    benefit: 'Decisiones basadas en datos sin esfuerzo manual',
    featured: false,
  },
  {
    id: 'chatbot-atencion',
    title: 'Chatbot de atención al cliente',
    description:
      'Entrenamos un chatbot con tus FAQs y productos. Responde el 80% de las consultas de forma inmediata y deriva al equipo humano solo las que lo requieren.',
    problem: 'Perder tiempo respondiendo siempre las mismas preguntas de soporte',
    tools: ['ChatGPT API', 'Manychat', 'WhatsApp', 'Notion'],
    category: 'Atención al cliente',
    price: 'Desde 499€',
    badge: 'Destacado',
    benefit: 'Atención 24/7 sin ampliar el equipo',
    featured: false,
  },
]

export const featuredAutomations = automations.filter((a) => a.featured)

import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'n8n',
    slug: 'n8n',
    title: 'Automatizaciones con n8n',
    tagline: 'Tus herramientas, por fin hablando entre ellas',
    description:
      'Diseñamos flujos a medida que conectan tu CRM, tu email, tus hojas de cálculo y tu WhatsApp. Lo que hoy es copiar y pegar entre pestañas pasa a ocurrir solo, en segundos y sin que nadie se acuerde de hacerlo.',
    icon: 'workflow',
    bullets: [
      'Conectores con CRM, Gmail, Sheets, Notion, Slack y WhatsApp',
      'Lógica condicional: cada caso sigue su camino',
      'Alojado en tu servidor o en el nuestro, tú decides',
      'Monitorización y avisos si algo falla',
    ],
    href: '/automations',
    order: 1,
  },
  {
    id: 'instagram',
    slug: 'instagram',
    title: 'Automatización de Instagram',
    tagline: 'Presencia constante sin vivir dentro de la app',
    description:
      'Programamos las publicaciones, respondemos comentarios y DMs con criterio propio de tu marca, y convertimos las métricas en un informe que puedes leer en dos minutos. Tu cuenta deja de depender de que alguien tenga un hueco.',
    icon: 'instagram',
    bullets: [
      'Calendario editorial y publicación programada',
      'Respuestas automáticas a comentarios y DMs con tu tono',
      'Captura de leads desde mensajes directos',
      'Informe semanal de métricas que se entiende',
    ],
    href: '/automations',
    order: 2,
  },
  {
    id: 'imagenes-ia',
    slug: 'imagenes-ia',
    title: 'Generación de imágenes con IA',
    tagline: 'Creatividades nuevas sin esperar a diseño',
    description:
      'Montamos un sistema que genera posts, banners y creatividades siguiendo tu identidad visual: mismos colores, misma tipografía, mismo aire. Pides una campaña y tienes veinte piezas coherentes listas para revisar.',
    icon: 'image',
    bullets: [
      'Plantillas visuales alineadas con tu marca',
      'Variaciones masivas para test A/B',
      'Adaptación automática a cada formato y red',
      'Banco de piezas organizado y reutilizable',
    ],
    href: '/automations',
    order: 3,
  },
  {
    id: 'procesos',
    slug: 'procesos',
    title: 'Automatización de procesos',
    tagline: 'El trabajo administrativo que nadie quiere hacer',
    description:
      'Facturación, atención al cliente, gestión de leads y seguimiento comercial. Analizamos dónde se va el tiempo de tu equipo y automatizamos justo esa parte, empezando por la que más duele.',
    icon: 'building',
    bullets: [
      'Facturación y cobros sin intervención manual',
      'Atención al cliente de primer nivel, 24/7',
      'Leads cualificados y repartidos automáticamente',
      'Informes que se generan y envían solos',
    ],
    href: '/automations',
    order: 4,
  },
]

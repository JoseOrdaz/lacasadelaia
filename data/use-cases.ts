import type { UseCase } from '@/types'

export const useCases: UseCase[] = [
  {
    id: 'leads-inmobiliaria',
    title: 'De formulario a visita agendada',
    sector: 'Inmobiliaria · 8 personas',
    problem:
      'Los leads de la web llegaban a un correo compartido. Si el comercial de guardia estaba en una visita, el contacto se enfriaba durante horas.',
    nodes: [
      { label: 'Formulario web', kind: 'trigger' },
      { label: 'Cualificar lead', kind: 'ai' },
      { label: 'Alta en CRM', kind: 'action' },
      { label: 'WhatsApp al comercial', kind: 'output' },
    ],
    metrics: [
      { value: '4 min', label: 'Tiempo de respuesta' },
      { value: '+38%', label: 'Visitas agendadas' },
      { value: '-9h', label: 'Admin/semana' },
    ],
    tools: ['n8n', 'HubSpot', 'WhatsApp Business', 'OpenAI'],
    order: 1,
  },
  {
    id: 'instagram-restaurante',
    title: 'Instagram que responde solo',
    sector: 'Restauración · 3 locales',
    problem:
      'Cada día llegaban decenas de DMs preguntando por horarios, reservas y alérgenos. Se respondían tarde, mal o directamente no se respondían.',
    nodes: [
      { label: 'DM o comentario', kind: 'trigger' },
      { label: 'Clasificar intención', kind: 'ai' },
      { label: 'Responder o reservar', kind: 'action' },
      { label: 'Escalar al equipo', kind: 'output' },
    ],
    metrics: [
      { value: '92%', label: 'Resueltos sin humanos' },
      { value: '+2.4x', label: 'Reservas por DM' },
      { value: '24/7', label: 'Disponibilidad' },
    ],
    tools: ['n8n', 'Instagram API', 'Claude', 'Google Calendar'],
    order: 2,
  },
  {
    id: 'contenido-ecommerce',
    title: 'Una campaña visual en una tarde',
    sector: 'E-commerce · moda',
    problem:
      'Cada lanzamiento exigía semanas de diseño para tener creatividades en todos los formatos. Las campañas salían tarde y sin material para testear.',
    nodes: [
      { label: 'Ficha de producto', kind: 'trigger' },
      { label: 'Generar creatividades', kind: 'ai' },
      { label: 'Adaptar formatos', kind: 'action' },
      { label: 'Subir a Meta Ads', kind: 'output' },
    ],
    metrics: [
      { value: '20+', label: 'Piezas por campaña' },
      { value: '-85%', label: 'Tiempo de diseño' },
      { value: '-31%', label: 'Coste por clic' },
    ],
    tools: ['n8n', 'Nano Banana', 'Cloudinary', 'Meta Ads'],
    order: 3,
  },
  {
    id: 'facturacion-asesoria',
    title: 'Facturación sin tocar una hoja',
    sector: 'Asesoría · 12 personas',
    problem:
      'El cierre de mes se comía tres días completos entre revisar horas, emitir facturas y perseguir cobros pendientes por email.',
    nodes: [
      { label: 'Cierre de mes', kind: 'trigger' },
      { label: 'Revisar horas y conceptos', kind: 'ai' },
      { label: 'Emitir y enviar factura', kind: 'action' },
      { label: 'Recordatorio de cobro', kind: 'output' },
    ],
    metrics: [
      { value: '-3 días', label: 'Por cierre mensual' },
      { value: '0', label: 'Facturas olvidadas' },
      { value: '-22 días', label: 'Periodo medio de cobro' },
    ],
    tools: ['n8n', 'Holded', 'Google Sheets', 'Gmail'],
    order: 4,
  },
]

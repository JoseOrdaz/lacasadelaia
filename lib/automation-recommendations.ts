export type AutomationAnswers = {
  business: string
  tasks: string[]
  tools: string[]
  frequency: string
}

export type AutomationRecommendation = {
  title: string
  description: string
  tools: string[]
  effort: string
  benefit: string
}

const priorityByFrequency: Record<string, string> = {
  diario: 'Prioridad alta',
  semanal: 'Buena candidata',
  ocasional: 'Para una segunda fase',
}

export function getAutomationRecommendations(answers: AutomationAnswers): AutomationRecommendation[] {
  const has = (task: string) => answers.tasks.includes(task)
  const spreadsheet = answers.tools.includes('excel') || answers.tools.includes('sheets')
    ? 'Excel / Google Sheets'
    : 'Google Sheets'
  const priority = priorityByFrequency[answers.frequency] || 'Para revisar'
  const recommendations: AutomationRecommendation[] = []

  if (has('emails')) {
    recommendations.push({
      title: 'Clasificar emails y extraer lo importante',
      description: 'Separar consultas, pedidos o avisos y dejar los datos útiles preparados para la siguiente acción.',
      tools: ['Email', 'IA', spreadsheet],
      effort: 'Media',
      benefit: `${priority} · menos revisión manual de la bandeja de entrada`,
    })
  }

  if (has('formularios') || has('clientes')) {
    recommendations.push({
      title: 'Convertir cada consulta en un seguimiento claro',
      description: 'Guardar los datos de cada persona, preparar una respuesta inicial y avisarte de lo que requiere atención.',
      tools: ['Formulario', 'CRM o Sheets', 'Email'],
      effort: 'Media',
      benefit: `${priority} · menos oportunidades perdidas`,
    })
  }

  if (has('redes')) {
    recommendations.push({
      title: 'Pasar de ideas sueltas a un calendario de contenido',
      description: 'Convertir temas, notas o fuentes en borradores organizados para revisar antes de publicar.',
      tools: ['IA', 'Sheets o Notion', 'Redes sociales'],
      effort: 'Media',
      benefit: `${priority} · más constancia sin empezar de cero`,
    })
  }

  if (has('documentos') || has('informes')) {
    recommendations.push({
      title: 'Resumir documentos y preparar informes',
      description: 'Reunir la información, extraer los puntos importantes y dejar un primer informe listo para revisar.',
      tools: ['Drive', 'IA', 'Docs o PDF'],
      effort: 'Media',
      benefit: `${priority} · menos tiempo ordenando información`,
    })
  }

  if (has('datos')) {
    recommendations.push({
      title: 'Unificar datos que ahora están repartidos',
      description: 'Llevar la información de distintas herramientas a un único lugar y preparar avisos o resúmenes periódicos.',
      tools: [spreadsheet, 'Email', 'n8n o Make'],
      effort: 'Media-alta',
      benefit: `${priority} · una visión más clara del negocio`,
    })
  }

  if (has('citas')) {
    recommendations.push({
      title: 'Reducir el trabajo alrededor de las citas',
      description: 'Centralizar solicitudes, confirmar datos y preparar recordatorios para que haya menos coordinación manual.',
      tools: ['Calendario', 'Formulario', 'Email o WhatsApp'],
      effort: 'Baja-media',
      benefit: `${priority} · menos mensajes de ida y vuelta`,
    })
  }

  if (!recommendations.length) {
    recommendations.push({
      title: 'Empezar por el proceso que más se repite',
      description: 'Revisar una tarea concreta, separar sus pasos y detectar qué parte puede conectarse o prepararse automáticamente.',
      tools: ['Tus herramientas actuales', 'IA', 'n8n o Make'],
      effort: 'Por definir',
      benefit: 'Primer paso · descubrir dónde tiene sentido empezar',
    })
  }

  return recommendations.slice(0, 3)
}


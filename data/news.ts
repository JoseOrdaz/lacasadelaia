import type { NewsItem } from '@/types'

export const news: NewsItem[] = [
  {
    id: 'elegir-herramienta-ia',
    slug: 'como-elegir-herramienta-ia',
    title: 'Cómo elegir una herramienta de IA sin perder horas comparando',
    excerpt:
      'El mercado de herramientas de IA crece cada semana. La clave no es probarlas todas, sino saber qué preguntas hacerse antes de descargar la tarjeta.',
    date: '2025-05-28',
    tags: ['Herramientas', 'Productividad'],
    readTime: '5 min',
    featured: true,
    keyIdea:
      'Antes de probar una herramienta, define el problema concreto que quieres resolver. Si no puedes explicarlo en una frase, la herramienta no lo resolverá por ti.',
    content: `
<p>Cada semana aparecen nuevas herramientas de IA que prometen revolucionar el trabajo. El resultado habitual: acumulas cuentas en diez plataformas distintas, no usas ninguna de forma consistente y pierdes más tiempo comparando que trabajando.</p>

<p>El problema no es la abundancia de opciones. El problema es el orden en el que tomamos decisiones.</p>

<h2>Primero define el problema, después busca la herramienta</h2>

<p>La mayoría de profesionales hace lo contrario: descubren una herramienta que parece interesante y luego buscan un uso para ella. Ese es el camino más largo.</p>

<p>Antes de abrir una sola web de comparativas, responde estas tres preguntas:</p>

<ul>
  <li><strong>¿Qué tarea repetitiva te roba más tiempo cada semana?</strong></li>
  <li><strong>¿Cuánto tiempo ahorrarías si esa tarea desapareciera?</strong></li>
  <li><strong>¿Qué formato de salida necesitas?</strong> (texto, imagen, código, audio, datos)</li>
</ul>

<p>Con esas respuestas, la categoría de herramienta que necesitas se hace evidente sola.</p>

<h2>El checklist de evaluación de 10 minutos</h2>

<p>Una vez que tienes una candidata, evalúala rápido con este filtro:</p>

<ul>
  <li>¿Tiene plan gratuito o prueba sin tarjeta? Si no, descártala hasta tener más contexto.</li>
  <li>¿Resuelve tu caso de uso específico o es demasiado genérica?</li>
  <li>¿Hay una comunidad activa de usuarios? (Reddit, YouTube, foros) Señal de que funciona y evoluciona.</li>
  <li>¿Cuánto cuesta el plan de pago? Compara con el valor de las horas que ahorra.</li>
  <li>¿Se integra con las herramientas que ya usas?</li>
</ul>

<h2>La trampa del "top 10 herramientas de IA"</h2>

<p>Los listicles de internet tienen un sesgo estructural: listan herramientas que existen, no herramientas que encajan con tu caso. Una herramienta de IA para equipos de 50 personas no sirve igual a un freelance.</p>

<p>Usa esas listas para descubrir categorías, no para tomar decisiones. Luego ajusta al contexto real de tu trabajo.</p>

<h2>Comprométete a una prueba de una semana</h2>

<p>Si decides probar algo, úsala exclusivamente durante 5 días laborables para la tarea que identificaste. Sin cambiar a otra en medio. Al final de la semana, la pregunta es simple: ¿lo que hice con esta herramienta lo habría hecho sin ella? ¿Cuánto más rápido?</p>

<p>Si la respuesta no es clara, la herramienta no encaja con tu flujo de trabajo, o el problema que querías resolver no era lo suficientemente doloroso para justificar el cambio.</p>
    `.trim(),
  },
  {
    id: 'automatizaciones-pymes',
    slug: 'automatizaciones-para-pymes',
    title: 'Automatizaciones sencillas que una pyme puede aplicar esta semana',
    excerpt:
      'No hace falta un equipo técnico ni un presupuesto grande. Hay automatizaciones con IA que cualquier empresa pequeña puede montar en horas y empezar a notar el ahorro el mismo día.',
    date: '2025-06-03',
    tags: ['Automatización', 'Productividad'],
    readTime: '6 min',
    featured: false,
    keyIdea:
      'La automatización más rentable no es la más sofisticada, sino la que elimina la tarea que más interrumpe tu semana. Empieza por ahí.',
    content: `
<p>Las pymes tienen un problema de tiempo más que de dinero. Los equipos pequeños hacen muchas cosas a la vez, y las tareas administrativas y repetitivas se comen horas que deberían ir a clientes, producto o ventas.</p>

<p>La buena noticia: la mayoría de esas tareas son automatizables hoy con herramientas sin código y un presupuesto de menos de 50€ al mes.</p>

<h2>Tres automatizaciones de impacto inmediato</h2>

<h3>1. Resumen automático de reuniones</h3>

<p>Herramienta: Fireflies.ai o Otter.ai. Conecta al calendario, entra automáticamente en cada reunión de Zoom o Meet, transcribe y genera un resumen con los puntos de acción al terminar.</p>

<p>Tiempo de setup: 15 minutos. Ahorro estimado: 30-60 minutos por reunión entre escribir actas y recordar qué se decidió.</p>

<h3>2. Respuesta a emails de atención al cliente con IA</h3>

<p>Con Zapier o Make, conecta tu email de contacto a ChatGPT. Cuando llegue un email, la IA genera una respuesta borrador que tú revisas antes de enviar. En la mayoría de consultas repetitivas (precios, disponibilidad, información general), el borrador es 80% válido desde el primer día.</p>

<p>Tiempo de setup: 1-2 horas la primera vez. Ahorro estimado: 20-40 minutos diarios en equipos con volumen de consultas.</p>

<h3>3. Extracción de datos de documentos</h3>

<p>Si recibes facturas, presupuestos o formularios en PDF, herramientas como Nanonets o incluso Claude pueden extraer los datos clave (proveedor, importe, fecha, concepto) y volcarlos en una hoja de cálculo automáticamente.</p>

<p>Esto elimina la introducción manual de datos, que es una de las fuentes más comunes de errores administrativos.</p>

<h2>Antes de automatizar: el inventario de tareas repetitivas</h2>

<p>Pide a cada persona del equipo que anote durante una semana todo lo que hace más de tres veces. Los patrones que emergen son los candidatos a automatizar. Sin ese ejercicio, se automatizan las cosas obvias pero no necesariamente las más costosas en tiempo real.</p>

<h2>Qué no automatizar (todavía)</h2>

<p>La comunicación sensible con clientes, las decisiones estratégicas y cualquier proceso que aún no está bien definido. La IA amplifica lo que ya funciona; si el proceso es caótico, la automatización producirá caos más rápido.</p>
    `.trim(),
  },
  {
    id: 'pagar-herramienta-ia',
    slug: 'que-mirar-antes-de-pagar-herramienta-ia',
    title: 'Qué mirar antes de pagar por una herramienta de IA',
    excerpt:
      'El modelo freemium de muchas herramientas de IA está diseñado para enganchar y luego facturar. Esto no significa que no valgan. Significa que hay que ser más cuidadoso con lo que se paga.',
    date: '2025-06-07',
    tags: ['Herramientas', 'IA generativa'],
    readTime: '4 min',
    featured: false,
    keyIdea:
      'Pagar por una herramienta de IA solo tiene sentido si puedes calcular, aunque sea a ojo, cuántas horas te ahorra al mes. Si no puedes calcularlo, espera más antes de pagar.',
    content: `
<p>Las suscripciones a herramientas de IA se acumulan con facilidad. $10 aquí, $20 allá, $49 de aquel otro que parecía imprescindible en enero. Al final del año, el gasto puede ser considerable y el uso real de la mitad de esas herramientas, escaso.</p>

<p>Hay una forma más ordenada de tomar estas decisiones.</p>

<h2>El ROI de una herramienta de IA</h2>

<p>No hace falta una hoja de cálculo compleja. Solo esta fórmula mental: si la herramienta cuesta 20€ al mes y te ahorra 2 horas al mes, ¿cuánto vale tu hora? Si tu hora vale menos de 10€, puede no merecer la pena. Si tu hora vale 50€, es una decisión fácil.</p>

<p>El problema es que muchas veces compramos herramientas cuyo ahorro es difícil de medir porque no hacíamos la tarea antes, simplemente no la hacíamos bien o la evitábamos.</p>

<h2>Señales de que una herramienta merece el pago</h2>

<ul>
  <li>La has usado en el plan gratuito durante al menos dos semanas de forma consistente.</li>
  <li>Has terminado con el límite del plan gratuito más de una vez.</li>
  <li>Hay una tarea concreta que ya no podrías imaginar hacer sin ella.</li>
  <li>El precio del plan de pago es proporcional al uso que le das.</li>
</ul>

<h2>Señales de que no merece la pena (todavía)</h2>

<ul>
  <li>No has llegado al límite del plan gratuito en el último mes.</li>
  <li>La usas de forma esporádica, no como parte de un flujo de trabajo regular.</li>
  <li>Hay alternativas gratuitas que cubren el 80% de tu caso de uso.</li>
  <li>El plan de pago solo desbloquea funcionalidades que no sabes si necesitas.</li>
</ul>

<h2>Cómo gestionar las suscripciones activas</h2>

<p>Una vez al trimestre, revisa todas tus suscripciones a herramientas de IA y responde por cada una: ¿la he usado esta semana? Si la respuesta es no en más de la mitad del trimestre, cancela. Puedes volver a suscribirte cuando la necesites de verdad.</p>

<p>La mayoría de herramientas de IA permiten cancelar y retomar sin perder la configuración. No hay penalización real por hacer esto de forma sistemática.</p>
    `.trim(),
  },
  {
    id: 'ia-para-marketing',
    slug: 'ia-para-marketing-practico',
    title: 'IA para marketing: usos prácticos más allá de generar posts',
    excerpt:
      'El uso más básico de la IA en marketing es generar texto. Pero hay aplicaciones mucho más valiosas que la mayoría de equipos no está usando todavía: análisis de audiencias, personalización de mensajes y optimización de campañas.',
    date: '2025-06-10',
    tags: ['Marketing', 'IA generativa'],
    readTime: '7 min',
    featured: true,
    keyIdea:
      'La IA no reemplaza la estrategia de marketing, la acelera. El pensamiento crítico sobre la audiencia y el mensaje sigue siendo trabajo humano; la ejecución puede ser mucho más rápida con IA.',
    content: `
<p>Cuando alguien en un equipo de marketing dice "vamos a usar IA", el primer caso que surge es casi siempre el mismo: generar textos para redes sociales. Es el uso más evidente, pero probablemente no el más rentable.</p>

<p>Hay una capa más interesante debajo que pocos equipos están explorando.</p>

<h2>Análisis de clientes y segmentación</h2>

<p>Con herramientas como Claude o ChatGPT, puedes alimentar una colección de reseñas de clientes, respuestas de encuestas o comentarios de soporte y pedir que identifiquen patrones: qué lenguaje usan los clientes satisfechos, qué problemas mencionan los que se van, qué características valoran más.</p>

<p>Este análisis manual tomaría semanas. Con IA, toma horas y produce insights que cambian cómo escribes los copies de tus campañas.</p>

<h2>Creación de variantes para tests A/B</h2>

<p>Una de las tareas más repetitivas en marketing es crear variantes de asuntos de email, headlines o llamadas a la acción para probarlas. La IA puede generar 20 variantes de un asunto en 30 segundos, algo que antes requería sesiones de brainstorming de equipo.</p>

<p>El criterio para elegir las mejores sigue siendo humano. Pero la generación de opciones se hace casi instantánea.</p>

<h2>Personalización de mensajes por segmento</h2>

<p>Si tienes tres perfiles de cliente distintos, puedes tomar un mismo mensaje base y pedir a la IA que lo adapte al lenguaje, las preocupaciones y los casos de uso de cada perfil. El resultado es comunicación más relevante sin multiplicar el tiempo de producción.</p>

<h2>Análisis de competencia y benchmarking</h2>

<p>Perplexity y herramientas similares permiten hacer búsquedas estructuradas sobre competidores: cómo comunican su propuesta de valor, qué lenguaje usan en sus páginas de landing, qué promesas hacen. Esto que antes requería horas de investigación manual se hace en minutos.</p>

<h2>Lo que la IA no puede reemplazar</h2>

<p>La estrategia, el posicionamiento y la comprensión profunda de la audiencia siguen siendo trabajo humano. La IA no sabe quién es tu cliente mejor que tú. Lo que sí puede hacer es ayudarte a ejecutar más rápido una vez que tienes claridad estratégica.</p>

<p>Los equipos que mejor están usando IA en marketing no son los que más la usan, sino los que la usan en los puntos precisos donde el volumen de trabajo bloqueaba la velocidad de ejecución.</p>
    `.trim(),
  },
  {
    id: 'ia-reuniones',
    slug: 'ia-para-resumir-reuniones',
    title: 'Cómo usar IA para resumir reuniones y sacar tareas',
    excerpt:
      'Las reuniones producen decisiones que se olvidan y tareas que nunca se asignan formalmente. La IA puede convertir ese caos en un acta estructurada con responsables y fechas, en menos de dos minutos.',
    date: '2025-06-12',
    tags: ['Productividad', 'Herramientas'],
    readTime: '4 min',
    featured: true,
    keyIdea:
      'El valor real de la IA en reuniones no es la transcripción, es extraer el "qué hay que hacer, quién lo hace y para cuándo" de forma automática.',
    content: `
<p>El problema con las reuniones no es que sean largas. Es que producen compromisos que se pierden. Alguien dijo que se encargaría de algo, nadie lo escribió, y dos semanas después nadie lo hizo.</p>

<p>Este problema tiene solución hoy, con herramientas que ya existen.</p>

<h2>El flujo básico con Fireflies o Otter</h2>

<p>Estas herramientas se conectan a tu calendario y se unen automáticamente a cada reunión de Zoom, Meet o Teams. Al terminar, generan una transcripción completa y un resumen con los temas tratados.</p>

<p>El resumen automático es útil, pero no es el valor diferencial. Lo interesante es poder hacer preguntas sobre la reunión después: "¿qué tareas quedaron pendientes?", "¿quién dijo que se encargaría del presupuesto?", "¿en qué quedamos sobre el lanzamiento?".</p>

<h2>El método con prompt manual</h2>

<p>Si no quieres una herramienta adicional, hay un flujo alternativo:</p>

<ol>
  <li>Durante la reunión, toma notas muy básicas: temas tratados, nombres mencionados, decisiones tomadas.</li>
  <li>Al terminar, pega esas notas en ChatGPT o Claude con este prompt: "Convierte estas notas de reunión en un acta estructurada con: resumen ejecutivo, decisiones tomadas, tareas con responsable y fecha límite, y próximos pasos."</li>
  <li>Revisa el resultado, ajusta lo que sea necesario y compártelo con el equipo.</li>
</ol>

<p>Con práctica, este proceso toma menos de 5 minutos para reuniones de hasta una hora.</p>

<h2>Cómo compartir el acta sin fricción</h2>

<p>El acta más útil es la que el equipo realmente lee. Algunas prácticas que funcionan:</p>

<ul>
  <li>Enviarla por email o Slack en la hora siguiente a la reunión, cuando el contexto aún está fresco.</li>
  <li>Usar un formato fijo para que el equipo sepa dónde mirar cada tipo de información.</li>
  <li>Destacar en negrita las tareas con nombre asignado.</li>
</ul>

<h2>El cambio cultural detrás de la herramienta</h2>

<p>La IA facilita el proceso, pero el cambio real es cultural: aceptar que cada reunión termina con un documento compartido. Esto puede generar resistencia en algunos equipos. La forma de reducirla es hacer que el proceso sea tan rápido y poco invasivo que sea más fácil adoptarlo que evitarlo.</p>
    `.trim(),
  },
  {
    id: 'errores-ia-equipos',
    slug: 'errores-ia-equipos-pequenos',
    title: 'Errores comunes al introducir IA en equipos pequeños',
    excerpt:
      'La adopción de IA en equipos pequeños falla casi siempre por las mismas razones. No son razones técnicas. Son razones de proceso, expectativas y cambio de hábitos.',
    date: '2025-06-14',
    tags: ['IA generativa', 'Automatización'],
    readTime: '5 min',
    featured: false,
    keyIdea:
      'La IA no transforma equipos por sí sola. Necesita un caso de uso concreto, una persona que lidere la adopción y tiempo para que el equipo desarrolle criterio sobre cuándo usarla.',
    content: `
<p>Muchos equipos pequeños han intentado "adoptar la IA" en los últimos dos años con resultados mediocres. No porque las herramientas sean malas, sino porque el enfoque era incorrecto desde el principio.</p>

<p>Estos son los errores que se repiten con más frecuencia.</p>

<h2>Error 1: Empezar con demasiadas herramientas a la vez</h2>

<p>El entusiasmo inicial lleva a probar cinco herramientas en el primer mes. El resultado es que ninguna se usa bien, nadie desarrolla un flujo de trabajo real con ninguna, y a los dos meses se vuelve a trabajar como antes.</p>

<p>La alternativa: elegir una herramienta para un problema concreto, integrarla en el flujo de trabajo hasta que sea natural, y solo entonces añadir otra.</p>

<h2>Error 2: No tener un caso de uso específico</h2>

<p>"Vamos a usar IA para ser más productivos" es una intención, no un plan. Sin un caso de uso concreto —redactar propuestas, resumir reuniones, clasificar emails— no hay forma de medir si la herramienta funciona.</p>

<p>Antes de adoptar cualquier herramienta, el equipo debe poder responder: ¿qué tarea específica va a cambiar y cómo sabremos si mejoró?</p>

<h2>Error 3: Esperar que la IA lo haga todo sola</h2>

<p>Los mejores resultados con IA generativa vienen de un flujo humano-IA, no de delegar completamente. La IA genera un borrador, el humano lo revisa y mejora. La IA extrae datos, el humano interpreta y decide.</p>

<p>Cuando un equipo espera que la IA produzca trabajo final sin intervención humana, el resultado suele ser genérico, descontextualizado y eventualmente descartado.</p>

<h2>Error 4: Ignorar la curva de aprendizaje</h2>

<p>Escribir buenos prompts es una habilidad que se aprende. Los primeros resultados suelen ser decepcionantes no porque la herramienta sea mala, sino porque el equipo aún no sabe pedirle bien lo que necesita.</p>

<p>Dedicar una hora a explorar cómo mejorar los prompts para un caso de uso específico tiene un retorno enorme. La mayoría de equipos se rinde antes de llegar a ese punto.</p>

<h2>Error 5: No involucrar a todo el equipo</h2>

<p>Cuando la adopción de IA queda en manos de una sola persona entusiasta, el conocimiento no se distribuye. Si esa persona se va o cambia de proyecto, el equipo vuelve a cero.</p>

<p>La adopción debe ser un proceso compartido, con tiempo explícito para que todo el equipo experimente, se equivoque y desarrolle criterio propio.</p>
    `.trim(),
  },
]

export const featuredNews = news.filter((n) => n.featured)
export const allNewsTags = [...new Set(news.flatMap((n) => n.tags))]

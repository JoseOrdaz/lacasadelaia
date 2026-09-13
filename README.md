# La Casa de la IA

Sitio web en Next.js dedicado a recursos prácticos sobre inteligencia artificial: automatizaciones, herramientas, plantillas y noticias pensadas para ahorrar tiempo y trabajar mejor.

## Qué incluye

- Página de inicio con secciones destacadas.
- Directorio de automatizaciones.
- Directorio de herramientas de IA.
- Biblioteca de plantillas.
- Sección de noticias y artículos.
- Página de newsletter para captación de suscriptores.
- Navegación responsive con menú móvil.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev
```

Arranca el entorno de desarrollo en local.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run start
```

Sirve la aplicación compilada.

```bash
npm run lint
```

Ejecuta el linter del proyecto.

## Estructura del proyecto

```text
app/          Rutas y páginas de Next.js
components/   Componentes reutilizables de UI
data/         Contenido estático: noticias, herramientas, automatizaciones y plantillas
public/       Imágenes y recursos estáticos
types/        Tipos compartidos de TypeScript
```

## Contenido

El contenido principal vive en archivos de datos dentro de `data/`, lo que facilita actualizar textos, tarjetas y listados sin tocar la lógica de las páginas.

## Diseño

El sitio usa una estética editorial con tipografía serif y sans combinadas, colores cálidos y componentes con animaciones suaves. Está pensado para funcionar bien en móvil y escritorio.

## Notas

- El proyecto no depende de una API externa para el contenido principal.
- Los listados de herramientas, automatizaciones, noticias y plantillas se renderizan desde datos locales.

## Licencia

Proyecto privado. Ajusta esta sección si quieres publicar una licencia concreta.

## Rediseño y gestión de contenidos

La revisión y estrategia están en `docs/rediseno.md`. La portada usa Server Components y mantiene las rutas de recursos existentes.

- **Blog:** `/admin` → **Blog** → Crear entrada. Completa título, slug (minúsculas y guiones), resumen, contenido, idea clave, fecha y tiempo de lectura. Las imágenes se suben a Media y requieren texto alternativo. Puedes guardar borradores o publicar. Se sirve en `/blog` y `/blog/[slug]`; los cambios publicados se reflejan en un máximo aproximado de un minuto tras una visita. Las URL `/news` redirigen permanentemente al blog. Las entradas anteriores sin estado siguen siendo visibles; los borradores nuevos no son públicos.
- **Contacto:** `/admin` → **Consultas**. Los mensajes se guardan en MongoDB; únicamente los usuarios autenticados pueden leerlos. No hay envío de notificaciones por correo. El endpoint valida campos, origen y tamaño; incluye honeypot y límite básico por email. Para un sitio con abuso sostenido, añadir limitación en el proveedor de hosting.
- **Foto:** `/admin` → **Perfil profesional** → Tu fotografía. Se muestra una única vez en Sobre mí. Sin fotografía se usa un bloque tipográfico con la experiencia, no una persona ficticia.
- **Copy de portada:** `data/home.ts` y `app/(site)/page.tsx`. Las colecciones previas de servicios, casos y testimonios permanecen disponibles, pero sus datos de ejemplo no se publican automáticamente en esta portada.
- **Newsletter:** el formulario anterior simulaba altas. Ahora informa de que la suscripción no está disponible y enlaza al blog, hasta conectar un proveedor real.

Antes de publicar: completar los datos reales de privacidad y aviso legal, configurar `MONGODB_URI` y un `PAYLOAD_SECRET` robusto, y asegurar almacenamiento persistente para `storage/media`. No ejecutar los seeds contra datos reales: los scripts existentes eliminan colecciones antes de insertar ejemplos.

Validación: `npm run lint`, `npm test`, `npx tsc --noEmit` y `NEXT_DIST_DIR=.next-build npm run build`. El build requiere acceso a Google Fonts y MongoDB. No hay dependencias nuevas.

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

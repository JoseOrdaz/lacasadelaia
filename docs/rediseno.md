# Revisión y estrategia

La web publicada (13/09/2026) funciona como un portal de recursos. Su titular explica la automatización, pero los CTA llevan al catálogo y la newsletter, no a una conversación. Habla en plural, no presenta al profesional y muestra ahorros sin evidencia aportada. El diseño crema/lima y el logotipo son aprovechables; el ticker distrae y su contenido se corta.

El proyecto local ya tiene una portada distinta, colecciones de servicios/casos/testimonios y cambios sin confirmar en Git. Se conserva este trabajo y las rutas de recursos. Los testimonios y métricas de ejemplo no se muestran en la nueva portada. El contacto anterior era un mailto etiquetado como agenda. La newsletter simula altas sin persistencia: no debe anunciar confirmaciones de correo.

## Implementación

- Portada personal: problema → soluciones → ejemplos → tecnología explicada → profesional → proceso → preguntas → contacto.
- Mantener crema, carbón y lima, espacio amplio y contraste legible. Diagramas HTML accesibles, sin animación continua ni dependencia nueva.
- Una acción principal: contar el problema. Formulario con nombre, email y mensaje; persistencia privada en Payload y errores reales.
- Blog sobre la colección `news` existente, sin copiar entradas. `/news` redirige a `/blog`. Publicación explícita, conservación de entradas anteriores, editor Lexical y rutas indexables.
- Metadata, canonical, imágenes sociales, robots y sitemap. Schema de servicio y artículos sin dirección, reseñas ni credenciales inventadas. FAQ visible sin prometer resultados enriquecidos.
- Foto opcional desde Payload; sin foto de stock ni identidad sintética.

## Límites de publicación

Faltan la fotografía y los datos identificativos para completar los documentos legales existentes. No se ha proporcionado número de WhatsApp ni proveedor de correo: las consultas se consultan en Payload. Verificar hosting con almacenamiento persistente para los archivos de Media y MongoDB accesible.

Referencias técnicas: [acceso de la API local de Payload](https://payloadcms.com/docs/local-api/access-control), [borradores](https://payloadcms.com/docs/versions/drafts), [FAQ en Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

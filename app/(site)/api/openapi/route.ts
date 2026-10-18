export function GET() {
  return Response.json({
    openapi: '3.1.0',
    info: { title: 'La Casa de la IA contact API', version: '1.0.0' },
    servers: [{ url: 'https://lacasadelaia.com' }],
    paths: {
      '/api/contact': {
        post: {
          summary: 'Send a contact inquiry',
          requestBody: { required: true, content: { 'application/json': { schema: { '$ref': '#/components/schemas/ContactInquiry' } } } },
          parameters: [{ name: 'Origin', in: 'header', required: true, schema: { type: 'string', format: 'uri', example: 'https://lacasadelaia.com' } }],
          responses: {
            '201': { description: 'Inquiry stored and mailed' },
            '202': { description: 'Inquiry stored' },
            '400': { description: 'Invalid JSON or validation failure' },
            '403': { description: 'Origin is not the site origin' },
            '413': { description: 'Request body is too large' },
            '415': { description: 'Content-Type must be application/json' },
            '429': { description: 'Rate limited' },
            '503': { description: 'Inquiry could not be stored' },
          },
        },
      },
    },
    components: { schemas: { ContactInquiry: { type: 'object', required: ['name', 'email', 'message', 'privacy'], properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, message: { type: 'string', minLength: 10, maxLength: 5000 }, privacy: { type: 'boolean', const: true } } } } },
  }, { headers: { 'Cache-Control': 'public, max-age=3600' } })
}

export function HEAD() {
  return new Response(null, { status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } })
}

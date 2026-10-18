export function GET() {
  return new Response([
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/',
    'Content-Signal: ai-train=no, search=yes, ai-input=no',
    'Sitemap: https://lacasadelaia.com/sitemap.xml',
    '',
  ].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}

export function HEAD() {
  return new Response(null, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

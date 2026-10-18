import { getMarkdown, SITE_URL } from '@/lib/agent-discovery'

export function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get('path') || '/'
  const body = getMarkdown(pathname)
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Language': 'es',
      'X-Markdown-Tokens': String(Math.ceil(body.length / 4)),
      'Vary': 'Accept',
      'Link': `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
    },
  })
}

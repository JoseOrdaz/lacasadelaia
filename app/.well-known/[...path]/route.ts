import { getAgentCatalog, getAgentSkillsIndex, getApiCatalog, getSkillDocument } from '@/lib/agent-discovery'

const jsonHeaders = { 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' }

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const path = (await params).path.join('/')

  if (path === 'api-catalog') {
    return Response.json(getApiCatalog(), { headers: { ...jsonHeaders, 'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"' } })
  }

  if (path === 'agent-skills/index.json') {
    return Response.json(getAgentSkillsIndex(), { headers: jsonHeaders })
  }

  const skillMatch = path.match(/^agent-skills\/([^/]+)\/SKILL\.md$/)
  if (skillMatch) {
    const content = getSkillDocument(skillMatch[1])
    return content
      ? new Response(content, { headers: { ...jsonHeaders, 'Content-Type': 'text/markdown; charset=utf-8' } })
      : new Response('Not found', { status: 404 })
  }

  if (path === 'ai-catalog.json' || path === 'ard.json') {
    return Response.json(getAgentCatalog(), { headers: jsonHeaders })
  }

  return new Response('Not found', { status: 404 })
}

export async function HEAD(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const response = await GET(request, context)
  return new Response(null, { status: response.status, headers: response.headers })
}

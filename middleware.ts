import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const acceptsMarkdown = request.headers.get('accept')?.match(/(?:^|,)\s*text\/markdown(?:\s*;|,|$)/)

  if (request.method !== 'GET' || !acceptsMarkdown || pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.startsWith('/.well-known/')) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/api/markdown'
  url.searchParams.set('path', pathname)
  return NextResponse.rewrite(url)
}

export const config = { matcher: ['/((?!favicon\.png|.*\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)'] }

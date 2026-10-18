import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // En Vercel hay que usar .next; en local mantenemos .next-dev para evitar conflictos con builds previos.
  distDir: process.env.NEXT_DIST_DIR || (process.env.VERCEL ? '.next' : '.next-dev'),
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ['@monaco-editor/react', 'monaco-editor'],
  async headers() {
    return [{
      source: '/',
      headers: [{
        key: 'Link',
        value: '</.well-known/api-catalog>; rel="api-catalog", </api/openapi>; rel="service-desc"; type="application/json", </api/health>; rel="status"; type="application/json", </.well-known/ard.json>; rel="ard"; type="application/json", </.well-known/ai-catalog.json>; rel="describedby"; type="application/json", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
      }],
    }]
  },
}

export default withPayload(nextConfig)

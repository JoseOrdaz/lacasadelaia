import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // En Vercel hay que usar .next; en local mantenemos .next-dev para evitar conflictos con builds previos.
  distDir: process.env.NEXT_DIST_DIR || (process.env.VERCEL ? '.next' : '.next-dev'),
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ['@monaco-editor/react', 'monaco-editor'],
}

export default withPayload(nextConfig)

import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Evita .next creado como root (p. ej. tras docker); usa carpeta escribible
  distDir: process.env.NEXT_DIST_DIR || '.next-dev',
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ['@monaco-editor/react', 'monaco-editor'],
}

export default withPayload(nextConfig)

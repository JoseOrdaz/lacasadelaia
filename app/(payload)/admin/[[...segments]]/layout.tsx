import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from '../importMap.js'
import config from '@payload-config'
import { serverFunction } from './serverFunction'
import type { ServerFunctionClient } from 'payload'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction as unknown as ServerFunctionClient}
    >
      {children}
    </RootLayout>
  )
}

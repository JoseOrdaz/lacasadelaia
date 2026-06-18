import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import { News } from './collections/News'
import { Media } from './collections/Media'
import { Automations } from './collections/Automations'
import { Tools } from './collections/Tools'
import { Templates } from './collections/Templates'
import { Users } from './collections/Users'

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: '— La Casa de la IA',
    },
  },
  collections: [Media, News, Automations, Tools, Templates, Users],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lacasadelaia',
  }),
  secret: process.env.PAYLOAD_SECRET || 'lacasadelaia-secret',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'generated-schema.graphql'),
  },
})

import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { gridfsStorage } from './lib/storage/gridfs'
import sharp from 'sharp'
import { Inquiries } from './collections/Inquiries'
import { Profile } from './globals/Profile'
import { News } from './collections/News'
import { Media } from './collections/Media'
import { Automations } from './collections/Automations'
import { Tools } from './collections/Tools'
import { Templates } from './collections/Templates'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { UseCases } from './collections/UseCases'
import { Testimonials } from './collections/Testimonials'

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: '— La Casa de la IA',
    },
  },
  globals: [Profile],
  collections: [Inquiries, Media, News, Automations, Services, UseCases, Testimonials, Tools, Templates, Users],
  db: mongooseAdapter({
    // Atlas puede tardar en elegir primario tras un failover; 5s se quedaba corto.
    connectOptions: { serverSelectionTimeoutMS: 15000 },
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lacasadelaia',
  }),
  secret: process.env.PAYLOAD_SECRET || 'lacasadelaia-secret',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: gridfsStorage({ bucketName: 'media_uploads' }),
          disableLocalStorage: true,
        },
      },
    }),
  ],
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'generated-schema.graphql'),
  },
})

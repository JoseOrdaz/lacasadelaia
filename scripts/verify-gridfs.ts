/**
 * Comprueba de extremo a extremo que las subidas van a GridFS (MongoDB) y no
 * al disco: sube una imagen generada al vuelo, lista los binarios del bucket y
 * la borra.
 *
 * Uso: npm run verify:gridfs
 */
import sharp from 'sharp'
import { getPayload } from 'payload'
import config from '../payload.config'

const main = async () => {
  const payload = await getPayload({ config })
  const db = (payload.db as unknown as { connection: { db: any } }).connection.db

  const buffer = await sharp({
    create: { width: 1800, height: 1000, channels: 3, background: '#204020' },
  })
    .png()
    .toBuffer()

  console.log('1) Subiendo imagen de prueba...')
  const doc = await payload.create({
    collection: 'media',
    data: { alt: 'prueba gridfs' },
    file: { name: 'prueba-gridfs.png', data: buffer, mimetype: 'image/png', size: buffer.length },
  })
  console.log('   doc', doc.id, '| url:', doc.url)

  console.log('2) Binarios en media_uploads.files:')
  for (const f of await db.collection('media_uploads.files').find({}).toArray()) {
    console.log('   -', f.filename, f.length, 'bytes')
  }

  console.log('3) Borrando...')
  await payload.delete({ collection: 'media', id: doc.id })
  console.log('   ficheros restantes:', await db.collection('media_uploads.files').countDocuments())
  console.log('   chunks restantes:', await db.collection('media_uploads.chunks').countDocuments())
  process.exit(0)
}

main()

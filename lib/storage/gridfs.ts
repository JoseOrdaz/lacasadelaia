import { Readable } from 'stream'
import { GridFSBucket, MongoClient } from 'mongodb'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

/**
 * Almacena los binarios de las subidas en GridFS, dentro de la misma base de
 * MongoDB que usa Payload (MONGODB_URI). Así no dependemos del disco local,
 * que en Vercel es efímero: cada deploy lo borra.
 *
 * Los metadatos siguen en la colección `media`; los binarios van a las
 * colecciones `<bucket>.files` y `<bucket>.chunks` de la misma base.
 */

type Args = {
  /** Nombre del bucket de GridFS. Por defecto `uploads`. */
  bucketName?: string
}

/**
 * GridFS usa su propio cliente, no el pool de mongoose que lleva Payload.
 * Payload envuelve create/update en una transacción, y escribir los chunks
 * dentro de ella provoca WriteConflict al crearse las colecciones del bucket.
 * Con un cliente aparte la subida es independiente de la transacción.
 */
let clientPromise: Promise<MongoClient> | null = null

const getClient = (): Promise<MongoClient> => {
  if (!clientPromise) {
    const uri = process.env.MONGODB_URI

    if (!uri) {
      throw new Error('GridFS: falta la variable de entorno MONGODB_URI')
    }

    // Si la conexión falla hay que soltar la promesa: cachear una rechazada
    // dejaría el adaptador roto hasta reiniciar el proceso, aunque Atlas
    // vuelva a estar disponible un segundo después.
    clientPromise = new MongoClient(uri, { maxPoolSize: 5 }).connect().catch((err) => {
      clientPromise = null
      throw err
    })
  }

  return clientPromise
}

/**
 * MongoDB no deja crear una colección mientras hay una transacción abierta
 * sobre la misma base, y Payload abre una por cada create/update. Si dejamos
 * que GridFS cree `.files` y `.chunks` de forma implícita en la primera
 * subida, esa subida falla con WriteConflict. Las creamos al arrancar.
 */
let readyPromise: Promise<void> | null = null

const ensureBucket = (bucketName: string): Promise<void> => {
  if (!readyPromise) {
    readyPromise = (async () => {
      const db = (await getClient()).db()
      const existing = (await db.listCollections().toArray()).map((c) => c.name)

      for (const suffix of ['files', 'chunks']) {
        if (!existing.includes(`${bucketName}.${suffix}`)) {
          await db.createCollection(`${bucketName}.${suffix}`)
        }
      }

      // Índices estándar de GridFS: sin ellos las lecturas hacen collscan.
      await db.collection(`${bucketName}.files`).createIndex({ filename: 1, uploadDate: 1 })
      await db
        .collection(`${bucketName}.chunks`)
        .createIndex({ files_id: 1, n: 1 }, { unique: true })
    })().catch((err) => {
      readyPromise = null
      throw err
    })
  }

  return readyPromise
}

const getBucket = async (bucketName: string): Promise<GridFSBucket> => {
  const client = await getClient()
  await ensureBucket(bucketName)
  return new GridFSBucket(client.db(), { bucketName })
}

/** GridFS permite nombres duplicados (versiona); nosotros sobrescribimos. */
const deleteByFilename = async (bucket: GridFSBucket, filename: string): Promise<void> => {
  const existing = await bucket.find({ filename }).toArray()
  await Promise.all(existing.map((file) => bucket.delete(file._id)))
}

export const gridfsStorage =
  ({ bucketName = 'uploads' }: Args = {}): Adapter =>
  (): GeneratedAdapter => ({
    name: 'gridfs',

    onInit: () => {
      // Adelanta la creación de colecciones e índices al arranque, fuera de
      // cualquier transacción.
      void ensureBucket(bucketName)
    },

    handleUpload: async ({ file }) => {
      const bucket = await getBucket(bucketName)
      await deleteByFilename(bucket, file.filename)

      await new Promise<void>((resolve, reject) => {
        const stream = bucket.openUploadStream(file.filename, {
          metadata: { mimeType: file.mimeType },
        })
        Readable.from(file.buffer).pipe(stream).on('finish', resolve).on('error', reject)
      })
    },

    handleDelete: async ({ filename }) => {
      await deleteByFilename(await getBucket(bucketName), filename)
    },

    staticHandler: async (req, { params: { filename } }) => {
      const bucket = await getBucket(bucketName)
      const [file] = await bucket.find({ filename }).sort({ uploadDate: -1 }).limit(1).toArray()

      if (!file) {
        return new Response('Not Found', { status: 404 })
      }

      const etag = `"${file._id.toString()}"`

      if (req.headers.get('if-none-match') === etag) {
        return new Response(null, { status: 304, headers: { ETag: etag } })
      }

      const stream = Readable.toWeb(
        bucket.openDownloadStream(file._id),
      ) as unknown as ReadableStream

      return new Response(stream, {
        headers: {
          'Content-Length': String(file.length),
          'Content-Type': (file.metadata?.mimeType as string) || 'application/octet-stream',
          ETag: etag,
          // Los nombres incluyen las dimensiones, así que una subida nueva
          // genera una URL nueva: es seguro cachear de forma agresiva.
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    },
  })

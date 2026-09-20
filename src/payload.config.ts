import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Companies } from '@/collections/Companies'
import { Concerns } from '@/collections/Concerns'
import { Media } from '@/collections/Media'
import { News } from '@/collections/News'
import { Projects } from '@/collections/Projects'
import { Users } from '@/collections/Users'
import { Wings } from '@/collections/Wings'
import { GroupSettings } from '@/globals/GroupSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required. Copy .env.example to .env and set a secure value.')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — NICI Group',
    },
    components: {},
  },
  collections: [Companies, Wings, Concerns, Projects, News, Media, Users],
  globals: [GroupSettings],
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Local development runs on SQLite so the project needs no database server.
  // For production, swap this for:
  //   import { postgresAdapter } from '@payloadcms/db-postgres'
  //   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./nici.db' },
    push: true,
  }),
  sharp,
  upload: {
    limits: { fileSize: 15_000_000 },
  },
  graphQL: {
    disablePlaygroundInProduction: true,
  },
})

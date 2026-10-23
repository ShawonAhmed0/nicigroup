import { postgresAdapter } from '@payloadcms/db-postgres'
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
const databaseURI = process.env.DATABASE_URI || process.env.POSTGRES_URL || 'file:./nici.db'
const isPostgres = databaseURI.startsWith('postgres://') || databaseURI.startsWith('postgresql://')
const postgresDatabaseURI = isPostgres
  ? (() => {
      const uri = new URL(databaseURI)

      // node-postgres treats `require` as certificate verification, while Supabase's
      // pooler uses it to mean encrypted transport without CA verification.
      if (uri.searchParams.get('sslmode') === 'require') {
        uri.searchParams.set('sslmode', 'no-verify')
      }

      // Supabase's transaction pooler is designed for short-lived serverless
      // functions and avoids exhausting the small session-pool connection limit.
      if (process.env.VERCEL && uri.hostname.endsWith('.pooler.supabase.com')) {
        uri.port = '6543'
      }

      return uri.toString()
    })()
  : databaseURI

if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET is required. Copy .env.example to .env and set a secure value.')
}

if (process.env.VERCEL && !isPostgres) {
  throw new Error('DATABASE_URI must be a PostgreSQL connection string when deploying to Vercel.')
}

const database = isPostgres
  ? postgresAdapter({
      migrationDir: path.resolve(dirname, 'migrations'),
      pool: {
        connectionString: postgresDatabaseURI,
        max: process.env.VERCEL ? 1 : undefined,
      },
    })
  : sqliteAdapter({
      client: { url: databaseURI },
      push: true,
    })

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
  // SQLite keeps local setup simple; production uses the Supabase Postgres URL.
  db: database,
  sharp,
  upload: {
    limits: { fileSize: 15_000_000 },
  },
  graphQL: {
    disablePlaygroundInProduction: true,
  },
})

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedBengaliContent } from '@/lib/bengali-seed'

const payload = await getPayload({ config })
await seedBengaliContent(payload)
process.exit(0)

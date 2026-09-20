/**
 * Seeds the structure from the client brief: the group, its three operating
 * companies, their wings and the two social concerns.
 *
 * Only structural facts are seeded — names, sectors, slugs and the summaries
 * drawn from the brief itself. Overviews, figures, photography and contact
 * details are deliberately left blank: they come from NICI Group (see §11 of
 * the plan), and inventing them here would put guesses in front of the client.
 *
 * The six wings NICI has not yet confirmed are seeded as drafts, so they are
 * visible in the admin panel for review but render nowhere on the public site.
 *
 * Slugs are written out rather than left to the auto-slug hook, because these
 * are the published URLs and they should be reviewable in one place.
 *
 * Run with: npm run seed
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { seedBengaliContent } from '@/lib/bengali-seed'

type WingSeed = {
  name: string
  slug: string
  summary: string
  confirmed: boolean
}

type CompanySeed = {
  name: string
  slug: string
  sector: string
  summary: string
  brandColour: string
  order: number
  wings: WingSeed[]
}

const COMPANIES: CompanySeed[] = [
  {
    name: 'N Islam & Co.',
    slug: 'n-islam',
    sector: 'Building construction & contracting',
    summary:
      'Building construction and contracting across residential, commercial and institutional work.',
    brandColour: '#FF5B1A',
    order: 10,
    wings: [
      {
        name: 'Building Construction',
        slug: 'building-construction',
        summary: 'Ground-up construction of residential, commercial and institutional buildings.',
        confirmed: false,
      },
      {
        name: 'Contracting & Tendering',
        slug: 'contracting-and-tendering',
        summary: 'Contract execution and tender participation for public and private works.',
        confirmed: false,
      },
      {
        name: 'Renovation & Fit-out',
        slug: 'renovation-and-fit-out',
        summary: 'Renovation, extension and interior fit-out of existing structures.',
        confirmed: false,
      },
    ],
  },
  {
    name: 'Paper Star & Co.',
    slug: 'paper-star',
    sector: 'Garments paper, China supply & recycling',
    summary:
      'Paper supply to the garments industry, direct import from China, and recovery of paper wastage.',
    brandColour: '#1B4DE4',
    order: 20,
    wings: [
      {
        name: 'Garments Supporting Paper',
        slug: 'garments-supporting-paper',
        summary:
          'Supporting paper supplied to garment manufacturers for cutting, packing and pattern work.',
        confirmed: true,
      },
      {
        name: 'China Paper Supply',
        slug: 'china-paper-supply',
        summary: 'Direct paper import and supply from Chinese mills and trading partners.',
        confirmed: true,
      },
      {
        name: 'Wastage Recycling',
        slug: 'wastage-recycling',
        summary: 'Collection and recycling of paper wastage recovered from the garments supply chain.',
        confirmed: true,
      },
    ],
  },
  {
    name: 'Smart Car Center',
    slug: 'smart-car',
    sector: 'Green mobility & renewable energy',
    summary: 'Green mobility and renewable energy — electric vehicles, charging and solar.',
    brandColour: '#00A876',
    order: 30,
    wings: [
      {
        name: 'EV Sales & Service',
        slug: 'ev-sales-and-service',
        summary: 'Electric vehicle sales, servicing and parts.',
        confirmed: false,
      },
      {
        name: 'Charging Infrastructure',
        slug: 'charging-infrastructure',
        summary: 'Charging point supply, installation and maintenance.',
        confirmed: false,
      },
      {
        name: 'Solar & Renewables',
        slug: 'solar-and-renewables',
        summary: 'Solar installation and renewable energy systems for homes and businesses.',
        confirmed: false,
      },
    ],
  },
]

const CONCERNS = [
  {
    name: 'Dream Ground',
    slug: 'dream-ground',
    kind: 'csr' as const,
    summary: 'A social initiative of NICI Group.',
    order: 10,
  },
  {
    name: 'Aid for Men Foundation',
    slug: 'aid-for-men',
    kind: 'csr' as const,
    summary: 'A social initiative of NICI Group.',
    order: 20,
  },
]

const seed = async () => {
  const payload = await getPayload({ config })

  const email = process.env.SEED_EMAIL?.trim()
  const password = process.env.SEED_PASSWORD

  if (!email || !password) {
    throw new Error('Set SEED_EMAIL and SEED_PASSWORD before running the seed script.')
  }

  if (password.length < 12) {
    throw new Error('SEED_PASSWORD must be at least 12 characters long.')
  }

  const existingUsers = await payload.count({ collection: 'users' })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'NICI Administrator', role: 'admin' },
    })
    payload.logger.info(`Created administrator ${email}. The password was not written to the log.`)
  } else {
    payload.logger.info('Users already exist — skipping administrator creation.')
  }

  await payload.updateGlobal({
    slug: 'group-settings',
    data: {
      name: 'NICI Group',
      positioning: 'Construction, paper and green energy under one group.',
      summary:
        'NICI Group brings together three operating businesses — building construction, paper supply and recycling, and green mobility — alongside its social initiatives.',
    },
  })

  const existingCompanies = await payload.count({ collection: 'companies' })
  if (existingCompanies.totalDocs > 0) {
    await seedBengaliContent(payload)
    payload.logger.info('Companies already exist — skipping. Delete them first to re-seed.')
    return
  }

  let draftWings = 0

  for (const company of COMPANIES) {
    const created = await payload.create({
      collection: 'companies',
      data: {
        name: company.name,
        slug: company.slug,
        sector: company.sector,
        summary: company.summary,
        brandColour: company.brandColour,
        order: company.order,
        showOnHome: true,
        feedConfig: { enabled: true },
        _status: 'published',
      },
      draft: false,
    })

    for (const [index, wing] of company.wings.entries()) {
      const data = {
        company: created.id,
        name: wing.name,
        slug: wing.slug,
        summary: wing.summary,
        order: (index + 1) * 10,
      }

      // With drafts enabled, a record is created as a draft unless `_status` says
      // otherwise — so publishing has to be explicit. `draft` only accepts the
      // literal `true`, which is why the two cases are separate calls.
      if (wing.confirmed) {
        await payload.create({
          collection: 'wings',
          data: { ...data, _status: 'published' },
          draft: false,
        })
      } else {
        draftWings += 1
        await payload.create({ collection: 'wings', data, draft: true })
      }
    }

    payload.logger.info(`Seeded ${company.name} with ${company.wings.length} wings`)
  }

  for (const concern of CONCERNS) {
    await payload.create({
      collection: 'concerns',
      data: { ...concern, feedConfig: { enabled: false }, _status: 'published' },
      draft: false,
    })
  }
  payload.logger.info(`Seeded ${CONCERNS.length} sister concerns`)

  await seedBengaliContent(payload)

  payload.logger.info(
    `${draftWings} wings are drafts pending client confirmation (N Islam & Co. and Smart Car Center — see plan Q2).`,
  )
}

await seed()
process.exit(0)

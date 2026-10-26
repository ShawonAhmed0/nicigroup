import type { MigrateUpArgs } from '@payloadcms/db-postgres'

import { seedBengaliContent } from '@/lib/bengali-seed'

const COMPANIES = [
  {
    name: 'N Islam & Co.',
    slug: 'n-islam',
    sector: 'Building construction & contracting',
    summary: 'Building construction and contracting across residential, commercial and institutional work.',
    brandColour: '#FF5B1A',
    order: 10,
    wings: [
      ['Building Construction', 'building-construction', 'Ground-up construction of residential, commercial and institutional buildings.', false],
      ['Contracting & Tendering', 'contracting-and-tendering', 'Contract execution and tender participation for public and private works.', false],
      ['Renovation & Fit-out', 'renovation-and-fit-out', 'Renovation, extension and interior fit-out of existing structures.', false],
    ],
  },
  {
    name: 'Paper Star & Co.',
    slug: 'paper-star',
    sector: 'Garments paper, China supply & recycling',
    summary: 'Paper supply to the garments industry, direct import from China, and recovery of paper wastage.',
    brandColour: '#1B4DE4',
    order: 20,
    wings: [
      ['Garments Supporting Paper', 'garments-supporting-paper', 'Supporting paper supplied to garment manufacturers for cutting, packing and pattern work.', true],
      ['China Paper Supply', 'china-paper-supply', 'Direct paper import and supply from Chinese mills and trading partners.', true],
      ['Wastage Recycling', 'wastage-recycling', 'Collection and recycling of paper wastage recovered from the garments supply chain.', true],
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
      ['EV Sales & Service', 'ev-sales-and-service', 'Electric vehicle sales, servicing and parts.', false],
      ['Charging Infrastructure', 'charging-infrastructure', 'Charging point supply, installation and maintenance.', false],
      ['Solar & Renewables', 'solar-and-renewables', 'Solar installation and renewable energy systems for homes and businesses.', false],
    ],
  },
] as const

const CONCERNS = [
  { name: 'Dream Ground', slug: 'dream-ground', summary: 'A social initiative of NICI Group.', order: 10 },
  { name: 'Aid for Men Foundation', slug: 'aid-for-men', summary: 'A social initiative of NICI Group.', order: 20 },
] as const

/**
 * The first production database was migrated without the original local seed.
 * Restore that editorial baseline once, while leaving any populated database
 * untouched so later admin edits can never be reset by a deployment.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const existing = await payload.count({ collection: 'companies' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Business content already exists — restore migration skipped.')
    return
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

  for (const company of COMPANIES) {
    const created = await payload.create({
      collection: 'companies',
      draft: false,
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
    })

    for (const [index, wing] of company.wings.entries()) {
      const [name, slug, summary, published] = wing
      const data = {
        company: created.id,
        name,
        slug,
        summary,
        order: (index + 1) * 10,
      }

      if (published) {
        await payload.create({
          collection: 'wings',
          draft: false,
          data: { ...data, _status: 'published' },
        })
      } else {
        await payload.create({ collection: 'wings', draft: true, data })
      }
    }
  }

  for (const concern of CONCERNS) {
    await payload.create({
      collection: 'concerns',
      draft: false,
      data: {
        ...concern,
        kind: 'csr',
        feedConfig: { enabled: false },
        _status: 'published',
      },
    })
  }

  await seedBengaliContent(payload)
  payload.logger.info('Restored the original NICI Group business directory and Bengali content.')
}

// Content migrations intentionally keep restored editorial records on rollback.
export async function down(): Promise<void> {}

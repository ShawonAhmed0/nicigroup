import type { Company, Concern, News, Project, Wing } from '@/payload-types'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Locale } from '@/lib/locales'

const client = cache(async () => getPayload({ config }))

const hasTranslation = (value: unknown) => {
  if (value == null || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  return true
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Overlay an optional Bengali panel, recursively including populated relations. */
const localizeValue = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(localizeValue)
  if (!isRecord(value)) return value

  const result: Record<string, unknown> = {}
  for (const [key, child] of Object.entries(value)) result[key] = localizeValue(child)

  if (isRecord(value.bengali)) {
    for (const [key, translated] of Object.entries(value.bengali)) {
      if (!hasTranslation(translated)) continue
      const current = result[key]
      if (isRecord(current) && isRecord(translated)) {
        result[key] = { ...current, ...(localizeValue(translated) as Record<string, unknown>) }
      } else {
        result[key] = localizeValue(translated)
      }
    }
  }

  return result
}

const localizeDocument = <T>(doc: T, locale: Locale): T =>
  locale === 'bn' ? (localizeValue(doc) as T) : doc

/**
 * The local API bypasses access control, so every public query filters for
 * published records explicitly. Without this, drafts would render on the site.
 */
const PUBLISHED = { _status: { equals: 'published' } }

export const getGroup = cache(async (locale: Locale = 'en') => {
  const payload = await client()
  const group = await payload.findGlobal({ slug: 'group-settings', depth: 2 })
  return localizeDocument(group, locale)
})

export const getCompanies = cache(async (homeOnly = false, locale: Locale = 'en'): Promise<Company[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'companies',
    where: homeOnly ? { and: [PUBLISHED, { showOnHome: { equals: true } }] } : PUBLISHED,
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return docs.map((doc) => localizeDocument(doc, locale))
})

export const getCompany = cache(async (slug: string, locale: Locale = 'en'): Promise<Company | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'companies',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? localizeDocument(docs[0], locale) : null
})

export const getWings = cache(async (companyId: number | string, locale: Locale = 'en'): Promise<Wing[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'wings',
    where: { and: [PUBLISHED, { company: { equals: companyId } }] },
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return docs.map((doc) => localizeDocument(doc, locale))
})

export const getWing = cache(async (companySlug: string, wingSlug: string, locale: Locale = 'en'): Promise<Wing | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'wings',
    where: {
      and: [PUBLISHED, { slug: { equals: wingSlug } }, { 'company.slug': { equals: companySlug } }],
    },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? localizeDocument(docs[0], locale) : null
})

export const getConcerns = cache(async (locale: Locale = 'en'): Promise<Concern[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'concerns',
    where: PUBLISHED,
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return docs.map((doc) => localizeDocument(doc, locale))
})

export const getConcern = cache(async (slug: string, locale: Locale = 'en'): Promise<Concern | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'concerns',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? localizeDocument(docs[0], locale) : null
})

/** Companies plus their wings — the shape the header menu and footer index need. */
export const getBusinessTree = cache(async (locale: Locale = 'en') => {
  const companies = await getCompanies(false, locale)
  return Promise.all(
    companies.map(async (company) => ({ company, wings: await getWings(company.id, locale) })),
  )
})

export const getProjects = cache(async (companyId?: number | string, locale: Locale = 'en') => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'projects',
    where: companyId ? { and: [PUBLISHED, { company: { equals: companyId } }] } : PUBLISHED,
    sort: '-year',
    limit: 100,
    depth: 1,
  })
  return docs.map((doc) => localizeDocument(doc, locale))
})

export const getProject = cache(async (slug: string, locale: Locale = 'en'): Promise<Project | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? localizeDocument(docs[0], locale) : null
})

export const getNews = cache(async (limit = 50, locale: Locale = 'en') => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'news',
    where: PUBLISHED,
    sort: '-publishedAt',
    limit,
    depth: 1,
  })
  return docs.map((doc) => localizeDocument(doc, locale))
})

export const getNewsItem = cache(async (slug: string, locale: Locale = 'en'): Promise<News | null> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'news',
    where: { and: [PUBLISHED, { slug: { equals: slug } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? localizeDocument(docs[0], locale) : null
})

/**
 * Figures counted from the database rather than typed in by hand. NICI has not
 * supplied headcount, capacity or years in operation, and nothing on this site
 * may state a number they did not give us — so the group's scale is shown with
 * the facts the content model actually knows to be true.
 */
export const getGroupFigures = cache(async () => {
  const payload = await client()
  const [companies, wings, concerns] = await Promise.all([
    payload.count({ collection: 'companies', where: PUBLISHED }),
    payload.count({ collection: 'wings', where: PUBLISHED }),
    payload.count({ collection: 'concerns', where: PUBLISHED }),
  ])
  return {
    companies: companies.totalDocs,
    wings: wings.totalDocs,
    concerns: concerns.totalDocs,
  }
})

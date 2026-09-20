import type { MetadataRoute } from 'next'

import { getBusinessTree, getConcerns, getNews, getProjects } from '@/lib/queries'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** Regenerated from the CMS, so a newly published business is submitted automatically. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tree, concerns, projects, news] = await Promise.all([
    getBusinessTree(),
    getConcerns(),
    getProjects(),
    getNews(100),
  ])

  const entries = (
    path: string,
    priority: number,
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'],
  ): MetadataRoute.Sitemap => {
    const english = `${BASE}${path}`
    const bengali = `${BASE}/bn${path}`
    const alternates = { languages: { en: english, bn: bengali } }
    return [
      { url: english, priority, changeFrequency, alternates },
      { url: bengali, priority, changeFrequency, alternates },
    ]
  }

  const staticRoutes = ['', '/about', '/companies', '/projects', '/news', '/contact'].flatMap((path) =>
    entries(path, path === '' ? 1 : 0.7, 'monthly'),
  )

  const businessRoutes = tree.flatMap(({ company, wings }) => [
    ...entries(`/companies/${company.slug}`, 0.9),
    ...wings.flatMap((wing) => entries(`/companies/${company.slug}/${wing.slug}`, 0.6)),
  ])

  const concernRoutes = concerns.flatMap((concern) => entries(`/concerns/${concern.slug}`, 0.5))

  const projectRoutes = projects.flatMap((project) => entries(`/projects/${project.slug}`, 0.7))

  const newsRoutes = news.flatMap((item) => entries(`/news/${item.slug}`, 0.6))

  return [...staticRoutes, ...businessRoutes, ...concernRoutes, ...projectRoutes, ...newsRoutes]
}

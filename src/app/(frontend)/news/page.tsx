import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { formatDate, getI18n } from '@/lib/i18n'
import { getGroup, getNews } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n()
  return { title: dict.news.title, description: dict.news.description }
}

export default async function NewsPage() {
  const { locale, dict } = await getI18n()
  const [news, group] = await Promise.all([getNews(50, locale), getGroup(locale)])
  const groupName = group?.name ?? 'NICI Group'

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs tone="dark" trail={[{ href: '/', label: groupName }, { label: dict.news.title }]} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {dict.news.title}
              </h1>
            </div>
            <p className="max-w-[44ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
              {dict.news.intro}
            </p>
          </div>
        </div>
      </header>

      <section className="bg-ground" aria-label={dict.news.archive}>
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 lg:py-24">
          {news.length === 0 ? (
            <div className="grid gap-8 border-y border-line py-12 lg:grid-cols-[1fr_.75fr] lg:gap-20">
              <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold leading-tight">
                {dict.news.emptyHeading}
              </h2>
              <p className="max-w-[48ch] text-text-2">
                {dict.news.emptyBody}
              </p>
            </div>
          ) : (
            <ol className="divide-y divide-line border-y border-line">
              {news.map((item) => {
                const company = item.company && typeof item.company === 'object' ? item.company : null
                const hue = company?.brandColour ?? 'var(--signal)'

                return (
                  <li key={item.id} className="group/news relative grid gap-6 py-8 sm:grid-cols-[10rem_1fr] sm:gap-9 lg:grid-cols-[13rem_1fr]">
                    {item.coverImage ? (
                      <MediaFrame
                        media={item.coverImage}
                        tint={hue}
                        label={dict.news.image}
                        size="thumbnail"
                        className="aspect-[4/3] w-full"
                        sizes="(max-width: 640px) 100vw, 13rem"
                      />
                    ) : (
                      <div className="hidden border-t-4 bg-ground-2 sm:block" style={{ borderColor: hue }} aria-hidden="true" />
                    )}

                    <div className="self-center">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[13px] font-semibold text-text-3">
                        <time dateTime={item.publishedAt}>{formatDate(item.publishedAt, locale)}</time>
                        {company && <span>· {company.name}</span>}
                      </div>
                      <h2 className="mt-2 font-display text-[clamp(21px,2.6vw,30px)] font-bold leading-tight">
                        <Link href={`/news/${item.slug}`} className="no-underline">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.title}
                        </Link>
                      </h2>
                      {item.excerpt && <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-text-2">{item.excerpt}</p>}
                      <span className="mt-5 inline-flex items-center gap-2 font-display text-[14px] font-bold">
                        {dict.news.readArticle}
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover/news:translate-x-1" />
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </section>
    </article>
  )
}

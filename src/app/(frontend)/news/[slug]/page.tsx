import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { formatDate, getI18n } from '@/lib/i18n'
import { getNewsItem } from '@/lib/queries'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getI18n()
  const item = await getNewsItem(slug, locale)
  if (!item) return {}

  return {
    title: item.seo?.title || item.title,
    description: item.seo?.description || item.excerpt || undefined,
  }
}

export default async function NewsItemPage({ params }: Params) {
  const { slug } = await params
  const { locale, dict } = await getI18n()
  const item = await getNewsItem(slug, locale)
  if (!item) notFound()

  const company = item.company && typeof item.company === 'object' ? item.company : null
  const hue = company?.brandColour ?? '#FFC93C'

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1080px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs
            tone="dark"
            trail={[
              { href: '/', label: 'NICI Group' },
              { href: '/news', label: dict.news.title },
              { label: item.title },
            ]}
          />

          <div className="mt-10 max-w-[52rem]">
            <span aria-hidden="true" className="mb-7 block h-1.5 w-20" style={{ background: hue }} />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[13px] font-semibold text-on-ink-3">
              <time dateTime={item.publishedAt}>{formatDate(item.publishedAt, locale)}</time>
              {company && <span>· {company.name}</span>}
            </div>
            <h1
              className="mt-4 text-[clamp(34px,6vw,64px)] font-extrabold leading-[1] text-white"
              style={{ fontVariationSettings: '"wdth" 114' }}
            >
              {item.title}
            </h1>
            {item.excerpt && (
              <p className="mt-6 max-w-[60ch] text-[clamp(17px,1.8vw,20px)] leading-relaxed text-on-ink-2">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 lg:py-20">
        {item.coverImage && (
          <MediaFrame
            media={item.coverImage}
            tint={hue}
            label={dict.news.image}
            size="wide"
            className="mb-12 aspect-[16/9] w-full"
            sizes="(max-width: 1080px) 100vw, 1080px"
            priority
          />
        )}

        {item.body ? (
          <div className="mx-auto max-w-[68ch] space-y-5 text-[18px] leading-relaxed text-text-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:text-text [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:text-text [&_a]:font-semibold [&_a]:underline">
            <RichText data={item.body} />
          </div>
        ) : item.excerpt ? (
          <p className="mx-auto max-w-[68ch] text-[18px] leading-relaxed text-text-2">{item.excerpt}</p>
        ) : null}
      </div>

      <section className="border-t border-line bg-ground-2">
        <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center">
          <Link href="/news" className="inline-flex items-center gap-2 font-display text-[15px] font-bold hover:underline">
            <ArrowRight size={16} className="rotate-180" />
            {dict.news.back}
          </Link>
          {company && (
            <Link href={`/companies/${company.slug}`} className="inline-flex items-center gap-2 font-display text-[15px] font-bold hover:underline">
              {dict.project.viewCompany} {company.name}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </article>
  )
}

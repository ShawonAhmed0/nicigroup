import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getI18n } from '@/lib/i18n'
import { getCompany, getWing, getWings } from '@/lib/queries'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string; wing: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, wing: wingSlug } = await params
  const { locale } = await getI18n()
  const wing = await getWing(slug, wingSlug, locale)
  if (!wing) return {}
  return {
    title: wing.seo?.title || wing.name,
    description: wing.seo?.description || wing.summary,
  }
}

export default async function WingPage({ params }: Params) {
  const { slug, wing: wingSlug } = await params
  const { locale, dict } = await getI18n()
  const [company, wing] = await Promise.all([
    getCompany(slug, locale),
    getWing(slug, wingSlug, locale),
  ])
  if (!company || !wing) notFound()

  const siblings = (await getWings(company.id, locale)).filter((w) => w.id !== wing.id)
  const hue = company.brandColour ?? '#1B4DE4'
  const hasBody = Boolean(wing.description || (wing.details?.length ?? 0) > 0)

  return (
    <article
      style={
        {
          '--c': hue,
          '--field': `color-mix(in oklab, ${hue} 30%, #050C16)`,
          '--spark': `color-mix(in oklab, ${hue} 72%, white)`,
        } as React.CSSProperties
      }
    >
      <header className="bg-[var(--field)] text-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-6 sm:px-8 sm:pb-18 sm:pt-8">
          <Breadcrumbs
            tone="dark"
            trail={[
              { href: '/', label: 'NICI Group' },
              { href: `/companies/${company.slug}`, label: company.name },
              { label: wing.name },
            ]}
          />

          <div className="mt-10 max-w-[60ch]">
            <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-[var(--spark)]" />
            <h1
              className="text-[clamp(32px,5.4vw,58px)] font-extrabold leading-[1.02] text-white"
              style={{ fontVariationSettings: '"wdth" 114' }}
            >
              {wing.name}
            </h1>
            <p className="mt-6 text-[clamp(17px,1.8vw,19px)] leading-relaxed text-white/85">{wing.summary}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <div className={`grid gap-12 ${hasBody ? 'lg:grid-cols-[1.4fr_1fr] lg:gap-16' : 'mx-auto max-w-3xl'}`}>
          {hasBody && <div>
            {wing.description && (
              <div className="max-w-[68ch] space-y-5 text-[18px] leading-relaxed text-text-2">
                <RichText data={wing.description} />
              </div>
            )}

            {(wing.details?.length ?? 0) > 0 && (
              <section className="mt-14">
                <h2 className="text-[clamp(22px,2.6vw,30px)] font-extrabold">{dict.wing.specifications}</h2>
                <div className="mt-6 overflow-x-auto" role="region" aria-label={`${wing.name} ${dict.wing.specificationsLabel}`} tabIndex={0}>
                  <table className="w-full min-w-[30rem] border-collapse text-[15.5px]">
                    <tbody className="divide-y divide-line border-y border-line">
                      {wing.details!.map((row) => (
                        <tr key={row.id}>
                          <th scope="row" className="w-[38%] py-4 pr-8 text-left font-display text-[14px] font-bold text-text-3">
                            {row.label}
                          </th>
                          <td className="tnum py-4 text-text">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>}

          <MediaFrame
            media={wing.image}
            tint={hue}
            label={`${wing.name} — ${dict.wing.photography}`}
            className={`aspect-[4/3] w-full ${hasBody ? 'lg:sticky lg:top-24' : ''}`}
            sizes="(max-width: 1024px) 100vw, 36vw"
            priority
          />
        </div>
      </div>

      {/* Sideways within the company, rather than back to the homepage. */}
      {siblings.length > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="siblings">
          <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
            <h2 id="siblings" className="text-[clamp(20px,2.4vw,28px)] font-extrabold">
              {dict.wing.alsoFrom} {company.name}
            </h2>
            <ul className="mt-8 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
              {siblings.map((sibling) => (
                <li key={sibling.id} className="group/s relative flex flex-col bg-ground p-7 transition-colors hover:bg-ground-3">
                  <span aria-hidden="true" className="mb-5 block h-1 w-12" style={{ background: hue }} />
                  <h3 className="font-display text-[19px] font-bold leading-snug">
                    <Link href={`/companies/${company.slug}/${sibling.slug}`} className="no-underline">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {sibling.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-text-2">{sibling.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[14px] font-bold">
                    {dict.common.viewDetails}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/s:translate-x-1" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}

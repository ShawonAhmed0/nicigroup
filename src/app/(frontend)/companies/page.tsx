import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getGeneratedAsset } from '@/lib/generated-assets'
import { getI18n } from '@/lib/i18n'
import { getBusinessTree, getGroup } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n()
  return { title: dict.companies.title, description: dict.companies.description }
}

export default async function CompaniesPage() {
  const { locale, dict } = await getI18n()
  const [tree, group] = await Promise.all([getBusinessTree(locale), getGroup(locale)])
  const groupName = group?.name ?? 'NICI Group'

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs tone="dark" trail={[{ href: '/', label: groupName }, { label: dict.companies.title }]} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {dict.companies.heading}
              </h1>
            </div>
            <p className="max-w-[44ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
              {dict.companies.intro}
            </p>
          </div>
        </div>
      </header>

      <section className="bg-ground-2" aria-label={dict.companies.directory}>
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          {tree.length === 0 ? (
            <div className="border-y border-line py-12">
              <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold">{dict.companies.emptyHeading}</h2>
              <p className="mt-3 max-w-[54ch] text-text-2">
                {dict.companies.emptyBody}
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-display text-[15px] font-bold hover:underline">
                {dict.companies.contactUs}
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-7">
              {tree.map(({ company, wings }) => {
                const hue = company.brandColour ?? '#1B4DE4'
                const fallback = getGeneratedAsset(company.slug, locale)
                return (
                  <li
                    key={company.id}
                    className="group/card relative flex min-h-full flex-col overflow-hidden bg-ground shadow-[var(--shadow-1)] transition-transform duration-300 hover:-translate-y-1"
                    style={{ '--company': hue } as React.CSSProperties}
                  >
                    <MediaFrame
                      media={company.heroImage}
                      fallbackSrc={fallback?.src}
                      fallbackAlt={fallback?.alt}
                      tint={hue}
                      label={`${company.name} — ${dict.company.photography}`}
                      size="card"
                      className="aspect-[16/10] w-full"
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                    <div className="flex flex-1 flex-col border-t-[6px] border-[var(--company)] p-6 sm:p-7">
                      <p className="font-display text-[13px] font-semibold uppercase tracking-[.1em] text-text-3">
                        {company.sector}
                      </p>
                      <h2 className="mt-3 font-display text-[24px] font-extrabold leading-tight">
                        <Link href={`/companies/${company.slug}`} className="no-underline">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {company.name}
                        </Link>
                      </h2>
                      <p className="mt-4 text-[16px] leading-relaxed text-text-2">{company.summary}</p>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                        <span className="font-display text-[13px] font-semibold text-text-3">
                          {wings.length > 0
                            ? `${wings.length} ${wings.length === 1 ? dict.companies.wing : dict.companies.wings}`
                            : dict.common.companyProfile}
                        </span>
                        <ArrowRight
                          size={18}
                          className="shrink-0 transition-transform duration-300 group-hover/card:translate-x-1"
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <h2 className="max-w-[22ch] text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight text-white">
            {dict.companies.closeHeading}
          </h2>
          <Link href="/contact" className="group/c inline-flex shrink-0 items-center gap-2.5 bg-signal px-7 py-4 font-display text-[16px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5">
            {dict.companies.contactGroup}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover/c:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  )
}

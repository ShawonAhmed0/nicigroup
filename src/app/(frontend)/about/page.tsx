import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getI18n } from '@/lib/i18n'
import { getBusinessTree, getGroup } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n()
  const group = await getGroup(locale)
  return {
    title: dict.about.title,
    description: group?.summary || undefined,
  }
}

export default async function AboutPage() {
  const { locale, dict } = await getI18n()
  const [group, tree] = await Promise.all([getGroup(locale), getBusinessTree(locale)])
  const name = group?.name ?? 'NICI Group'
  const chairman = group?.chairman

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs tone="dark" trail={[{ href: '/', label: name }, { label: dict.about.title }]} />

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {dict.about.headingPrefix} {name}
              </h1>
            </div>
            <p className="max-w-[42ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
              {group?.summary || dict.about.fallbackSummary}
            </p>
          </div>
        </div>
      </header>

      {(group?.story || group?.mission) && (
        <section className="bg-ground">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.4fr] lg:gap-20 lg:py-24">
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.about.storyHeading}
            </h2>
            <div className="max-w-[68ch] space-y-10">
              {group.story && (
                <div className="space-y-5 text-[18px] leading-relaxed text-text-2">
                  <RichText data={group.story} />
                </div>
              )}
              {group.mission && (
                <section className="border-l-2 border-signal pl-6">
                  <h3 className="font-display text-[14px] font-bold uppercase tracking-[.12em] text-text-3">
                    {dict.about.mission}
                  </h3>
                  <div className="mt-3 space-y-4 text-[18px] leading-relaxed text-text-2">
                    <RichText data={group.mission} />
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      )}

      {(group?.stats?.length ?? 0) > 0 && (
        <section aria-label={`${name} ${dict.about.figures}`} className="border-y border-line bg-ground-2">
          <dl className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:py-14">
            {group!.stats!.map((stat) => (
              <div key={stat.id ?? `${stat.value}-${stat.label}`}>
                <dd
                  className="tnum font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-none"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {stat.value}
                  {stat.unit && <span className="ml-1.5 text-[.42em] font-bold text-text-2">{stat.unit}</span>}
                </dd>
                <dt className="mt-2.5 font-display text-[13px] font-semibold uppercase tracking-[.12em] text-text-2">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="bg-ground-2" aria-labelledby="businesses-heading">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 id="businesses-heading" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
                {dict.about.businessesHeading}
              </h2>
              <p className="mt-3 max-w-[54ch] text-text-2">
                {dict.about.businessesDescription}
              </p>
            </div>
            <Link href="/companies" className="inline-flex items-center gap-2 font-display text-[14px] font-bold hover:underline">
              {dict.about.directory}
              <ArrowRight size={15} />
            </Link>
          </div>

          <ul className="mt-10 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {tree.map(({ company, wings }) => (
              <li key={company.id} className="group/b relative flex min-h-64 flex-col bg-ground p-7 transition-colors hover:bg-ground-3">
                <span
                  aria-hidden="true"
                  className="mb-7 block h-1.5 w-14"
                  style={{ background: company.brandColour ?? 'var(--signal)' }}
                />
                <h3 className="font-display text-[22px] font-bold leading-tight">
                  <Link href={`/companies/${company.slug}`} className="no-underline">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {company.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[14px] font-semibold text-text-3">{company.sector}</p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-text-2">{company.summary}</p>
                <span className="mt-auto pt-7 font-display text-[13px] font-bold uppercase tracking-[.1em] text-text-3">
                  {wings.length > 0 ? `${wings.length} ${wings.length === 1 ? dict.about.wing : dict.about.wings}` : dict.common.companyProfile}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(group?.chairmanMessage || chairman?.name || chairman?.portrait) && (
        <section className="bg-ink text-on-ink" aria-labelledby="chairman-heading">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-24">
            <div>
              <MediaFrame
                media={chairman?.portrait}
                kind="portrait"
                tint="var(--signal)"
                base="var(--ink-2)"
                labelTone="dark-ground"
                label={dict.home.chairmanPortrait}
                size="card"
                className="aspect-[4/5] w-full border border-line-ink"
                sizes="(max-width: 1024px) 100vw, 32vw"
              />
              <p className="mt-5 font-display text-[16px] font-bold text-white">
                {chairman?.name || dict.home.chairman}
              </p>
              <p className="mt-1 font-display text-[13px] font-semibold uppercase tracking-[.12em] text-on-ink-3">
                {chairman?.title || dict.home.chairman}, {name}
              </p>
            </div>
            <div className="self-center">
              <h2 id="chairman-heading" className="text-[clamp(28px,4vw,48px)] font-extrabold leading-tight text-white">
                {dict.home.fromChairman}
              </h2>
              {chairman?.quote && (
                <blockquote className="mt-6 border-l-2 border-signal pl-5 text-[19px] italic leading-relaxed text-on-ink">
                  “{chairman.quote}”
                </blockquote>
              )}
              {group?.chairmanMessage && (
                <div className="mt-8 max-w-[68ch] space-y-5 text-[18px] leading-relaxed text-on-ink-2 [&_a]:text-signal">
                  <RichText data={group.chairmanMessage} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {(group?.milestones?.length ?? 0) > 0 && (
        <section className="bg-ground" aria-labelledby="milestones-heading">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="milestones-heading" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.about.milestones}
            </h2>
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {group!.milestones!.map((milestone) => (
                <li key={milestone.id ?? `${milestone.year}-${milestone.title}`} className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <p className="tnum font-display text-[24px] font-extrabold">{milestone.year}</p>
                  <div>
                    <h3 className="font-display text-[18px] font-bold">{milestone.title}</h3>
                    {milestone.description && <p className="mt-2 max-w-[58ch] text-text-2">{milestone.description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {(group?.leadership?.length ?? 0) > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="leadership-heading">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="leadership-heading" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.about.leadership}
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {group!.leadership!.map((person) => (
                <li key={person.id ?? `${person.name}-${person.title}`}>
                  <MediaFrame
                    media={person.photo}
                    kind="portrait"
                    tint="var(--signal)"
                    label={`${person.name} — ${dict.media.awaiting}`}
                    size="card"
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <h3 className="mt-4 font-display text-[18px] font-bold">{person.name}</h3>
                  <p className="mt-1 text-[14px] font-semibold text-text-3">{person.title}</p>
                  {person.bio && <p className="mt-3 text-[15px] leading-relaxed text-text-2">{person.bio}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(group?.certifications?.length ?? 0) > 0 && (
        <section className="border-t border-line bg-ground" aria-labelledby="certifications-heading">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.4fr] lg:gap-20 lg:py-24">
            <h2 id="certifications-heading" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.about.certifications}
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {group!.certifications!.map((item) => (
                <li key={item.id ?? item.name} className="py-5">
                  <p className="font-display text-[17px] font-bold">{item.name}</p>
                  {item.issuer && <p className="mt-1 text-[14px] text-text-3">{item.issuer}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <h2 className="max-w-[22ch] text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight text-white">
            {dict.about.closeHeading}
          </h2>
          <Link href="/contact" className="group/c inline-flex shrink-0 items-center gap-2.5 bg-signal px-7 py-4 font-display text-[16px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5">
            {dict.about.contactGroup}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover/c:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  )
}

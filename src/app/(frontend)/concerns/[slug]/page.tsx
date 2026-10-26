import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CuratedUpdates } from '@/components/CuratedUpdates'
import { ArrowRight, Mail, Phone, Pin, SocialIcon } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getGeneratedAsset } from '@/lib/generated-assets'
import { getI18n } from '@/lib/i18n'
import { getConcern } from '@/lib/queries'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getI18n()
  const concern = await getConcern(slug, locale)
  if (!concern) return {}

  return {
    title: concern.seo?.title || concern.name,
    description: concern.seo?.description || concern.summary,
  }
}

export default async function ConcernPage({ params }: Params) {
  const { slug } = await params
  const { locale, dict } = await getI18n()
  const concern = await getConcern(slug, locale)
  if (!concern) notFound()

  const kindLabel = concern.kind === 'csr' ? dict.common.socialInitiative : dict.common.sisterConcern
  const fallback = getGeneratedAsset(concern.slug, locale)
  const hasContact = Boolean(concern.contact?.address || concern.contact?.phone || concern.contact?.email)
  const curatedUpdates = concern.feedConfig?.enabled ? (concern.feedConfig.curated ?? []) : []

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
          <Breadcrumbs
            tone="dark"
            trail={[
              { href: '/', label: 'NICI Group' },
              { label: concern.name },
            ]}
          />

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(36px,6.4vw,68px)] font-extrabold leading-[1] text-white"
                style={{ fontVariationSettings: '"wdth" 114' }}
              >
                {concern.name}
              </h1>
              <p className="mt-4 font-display text-[14px] font-semibold uppercase tracking-[.12em] text-signal">
                {kindLabel}
              </p>
              {concern.tagline && <p className="mt-5 text-[20px] font-semibold text-on-ink">{concern.tagline}</p>}
              <p className="mt-5 max-w-[54ch] text-[clamp(17px,1.8vw,19px)] leading-relaxed text-on-ink-2">
                {concern.summary}
              </p>
            </div>

            <MediaFrame
              media={concern.heroImage}
              fallbackSrc={fallback?.src}
              fallbackAlt={fallback?.alt}
              tint="var(--signal)"
              base="var(--ink-2)"
              labelTone="dark-ground"
              label={`${concern.name} — ${dict.concern.photography}`}
              size="wide"
              className="aspect-[4/3] w-full border border-line-ink"
              sizes="(max-width: 1024px) 100vw, 44vw"
              priority
            />
          </div>
        </div>
      </header>

      {(concern.stats?.length ?? 0) > 0 && (
        <section aria-label={`${concern.name} ${dict.concern.figures}`} className="border-b border-line bg-ground-2">
          <dl className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4">
            {concern.stats!.map((stat) => (
              <div key={stat.id ?? `${stat.value}-${stat.label}`} className="flex flex-col">
                <dt className="order-2 mt-2.5 font-display text-[13px] font-semibold uppercase tracking-[.12em] text-text-2">
                  {stat.label}
                </dt>
                <dd className="tnum order-1 font-display text-[clamp(34px,5vw,54px)] font-extrabold leading-none">
                  {stat.value}
                  {stat.unit && <span className="ml-1.5 text-[.42em] font-bold text-text-2">{stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {(concern.mission || concern.activities) && (
        <section className="bg-ground">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:py-24">
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {concern.name} {dict.concern.workOf}
            </h2>
            <div className="max-w-[68ch] space-y-12">
              {concern.mission && (
                <section>
                  <h3 className="font-display text-[20px] font-bold">{dict.concern.mission}</h3>
                  <div className="mt-4 space-y-5 text-[18px] leading-relaxed text-text-2">
                    <RichText data={concern.mission} />
                  </div>
                </section>
              )}
              {concern.activities && (
                <section className="border-t border-line pt-10">
                  <h3 className="font-display text-[20px] font-bold">{dict.concern.activities}</h3>
                  <div className="mt-4 space-y-5 text-[18px] leading-relaxed text-text-2">
                    <RichText data={concern.activities} />
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      )}

      {(concern.gallery?.length ?? 0) > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="concern-gallery">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="concern-gallery" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.concern.community}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {concern.gallery!.map((image, index) => (
                <li key={typeof image === 'object' ? image.id : image}>
                  <MediaFrame
                    media={image}
                    tint="var(--signal)"
                    label={`${concern.name} ${index + 1} — ${dict.media.awaiting}`}
                    size="wide"
                    className="aspect-[3/2] w-full"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CuratedUpdates updates={curatedUpdates} hue="#FFC93C" heading={`${dict.concern.latestFrom} ${concern.name}`} />

      {(concern.externalUrl || concern.supportUrl || hasContact || (concern.socials?.length ?? 0) > 0) && (
        <section className="bg-ground-2" aria-labelledby="concern-connect">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:py-24">
            <div>
              <h2 id="concern-connect" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
                {dict.concern.connectWith} {concern.name}
              </h2>
              {(concern.externalUrl || concern.supportUrl) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {concern.externalUrl && (
                    <a
                      href={concern.externalUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 font-display text-[15px] font-bold text-on-ink no-underline hover:-translate-y-0.5"
                    >
                      {dict.concern.ownWebsite}
                      <span className="sr-only">{dict.common.openNewTab}</span>
                      <ArrowRight size={16} />
                    </a>
                  )}
                  {concern.supportUrl && (
                    <a
                      href={concern.supportUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center gap-2.5 border border-line-2 px-6 py-3.5 font-display text-[15px] font-bold no-underline hover:border-text"
                    >
                      {dict.concern.supportWork}
                      <span className="sr-only">{dict.common.openNewTab}</span>
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div>
              {hasContact && (
                <address className="space-y-4 border-y border-line py-6 not-italic text-text-2">
                  {concern.contact?.address && (
                    <p className="flex gap-3"><Pin size={19} className="mt-0.5 shrink-0 text-text" /><span className="whitespace-pre-line">{concern.contact.address}</span></p>
                  )}
                  {concern.contact?.phone && (
                    <p className="flex gap-3"><Phone size={19} className="mt-0.5 shrink-0 text-text" /><a href={`tel:${concern.contact.phone}`} className="font-semibold text-text hover:underline">{concern.contact.phone}</a></p>
                  )}
                  {concern.contact?.email && (
                    <p className="flex gap-3"><Mail size={19} className="mt-0.5 shrink-0 text-text" /><a href={`mailto:${concern.contact.email}`} className="break-all font-semibold text-text hover:underline">{concern.contact.email}</a></p>
                  )}
                </address>
              )}

              {(concern.socials?.length ?? 0) > 0 && (
                <ul className={`${hasContact ? 'mt-6' : ''} flex flex-wrap gap-2`}>
                  {concern.socials!.map((social) => (
                    <li key={social.id ?? `${social.platform}-${social.url}`}>
                      <a href={social.url} rel="noopener noreferrer" target="_blank" className="flex h-11 w-11 items-center justify-center border border-line text-text-2 transition-colors hover:border-text hover:text-text">
                        <SocialIcon platform={social.platform} size={18} />
                        <span className="sr-only">{concern.name} — {social.platform}{dict.common.openNewTab}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <h2 className="max-w-[22ch] text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight text-white">
            {dict.concern.connectedTo}
          </h2>
          <Link href="/about" className="group/c inline-flex items-center gap-2.5 bg-signal px-7 py-4 font-display text-[16px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5">
            {dict.concern.learnMore}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover/c:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  )
}

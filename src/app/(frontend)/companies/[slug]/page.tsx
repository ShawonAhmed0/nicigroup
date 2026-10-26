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
import { getCompany, getProjects, getWings } from '@/lib/queries'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getI18n()
  const company = await getCompany(slug, locale)
  if (!company) return {}
  return {
    title: company.seo?.title || company.name,
    description: company.seo?.description || company.summary,
  }
}

export default async function CompanyPage({ params }: Params) {
  const { slug } = await params
  const { locale, dict } = await getI18n()
  const company = await getCompany(slug, locale)
  if (!company) notFound()

  const [wings, projects] = await Promise.all([
    getWings(company.id, locale),
    getProjects(company.id, locale),
  ])
  const hue = company.brandColour ?? '#1B4DE4'
  const fallback = getGeneratedAsset(company.slug, locale)
  const curatedUpdates = company.feedConfig?.enabled ? (company.feedConfig.curated ?? []) : []

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
      {/* ------------------------------------------------------------- masthead */}
      <header className="bg-[var(--field)] text-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
          <Breadcrumbs
            tone="dark"
            trail={[
              { href: '/', label: 'NICI Group' },
              { href: '/companies', label: dict.common.businesses },
              { label: company.name },
            ]}
          />

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-[var(--spark)]" />
              <h1
                className="text-[clamp(34px,6vw,66px)] font-extrabold leading-[1] text-white"
                style={{ fontVariationSettings: '"wdth" 114' }}
              >
                {company.name}
              </h1>
              <p className="mt-4 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-white/85">
                {company.sector}
              </p>
              <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.8vw,19px)] leading-relaxed text-white/85">
                {company.summary}
              </p>
              {company.establishedYear && (
                <p className="mt-6 text-[14px] text-white/60">
                  {dict.company.operatingSince} <span className="tnum font-semibold text-white/90">{company.establishedYear}</span>
                </p>
              )}
            </div>

            <MediaFrame
              media={company.heroImage}
              fallbackSrc={fallback?.src}
              fallbackAlt={fallback?.alt}
              tint={hue}
              label={`${company.name} — ${dict.company.photography}`}
              className="aspect-[4/3] w-full border border-white/15"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------- figures */}
      {(company.stats?.length ?? 0) > 0 && (
        <section aria-label={`${company.name} ${dict.company.figures}`} className="border-b border-line bg-ground-2">
          <dl className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4">
            {company.stats!.map((stat) => (
              <div key={stat.id} className="flex flex-col">
                <dt className="order-2 mt-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-text-2">
                  {stat.label}
                </dt>
                <dd
                  className="tnum order-1 font-display text-[clamp(34px,5vw,54px)] font-extrabold leading-none"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {stat.value}
                  {stat.unit && <span className="ml-1.5 text-[0.42em] font-bold text-text-2">{stat.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* ------------------------------------------------------------- overview */}
      {(company.overview || company.vision) && (
        <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <h2 className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-tight">
              {dict.company.about} {company.name}
            </h2>
            <div className="max-w-[68ch] space-y-6">
              {company.overview && (
                <div className="space-y-5 text-[18px] leading-relaxed text-text-2">
                  <RichText data={company.overview} />
                </div>
              )}
              {company.vision && (
                <div className="border-l-2 border-[var(--c)] pl-6">
                  <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-text-3">
                    {dict.company.vision}
                  </h3>
                  <div className="mt-3 space-y-4 text-[18px] leading-relaxed text-text-2">
                    <RichText data={company.vision} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- wings */}
      {wings.length > 0 && (
        <section className="border-y border-line bg-ground-2" aria-labelledby="wings">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="wings" className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-tight">
              {dict.company.doesPrefix} {company.name} {dict.company.doesSuffix}
            </h2>

            <ul className="mt-10 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
              {wings.map((wing) => (
                <li key={wing.id} className="group/w relative flex flex-col bg-ground p-7 transition-colors hover:bg-ground-3">
                  <span aria-hidden="true" className="mb-5 block h-1 w-12" style={{ background: hue }} />
                  <h3 className="font-display text-[20px] font-bold leading-snug">
                    <Link href={`/companies/${company.slug}/${wing.slug}`} className="no-underline">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {wing.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-text-2">{wing.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[14px] font-bold">
                    {dict.common.viewDetails}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/w:translate-x-1" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- capabilities */}
      {(company.capabilities?.length ?? 0) > 0 && (
        <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <h2 className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-tight">{dict.company.capabilities}</h2>
            <ul className="divide-y divide-line border-y border-line">
              {company.capabilities!.map((item) => (
                <li key={item.id} className="grid gap-2 py-6 sm:grid-cols-[15rem_1fr] sm:gap-8">
                  <h3 className="font-display text-[17px] font-bold">{item.title}</h3>
                  {item.description && (
                    <p className="max-w-[58ch] leading-relaxed text-text-2">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- projects */}
      {projects.length > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="work">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="work" className="text-[clamp(24px,3.2vw,38px)] font-extrabold leading-tight">
                {dict.company.selectedWork}
              </h2>
              <Link href="/projects" className="inline-flex items-center gap-2 font-display text-[14px] font-bold hover:underline">
                {dict.company.allProjects}
                <ArrowRight size={15} />
              </Link>
            </div>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((project) => (
                <li key={project.id} className="group/project relative">
                  <MediaFrame
                    media={project.coverImage}
                    tint={hue}
                    size="card"
                    label={dict.company.projectPhoto}
                    className="aspect-[3/2] w-full"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <h3 className="mt-4 font-display text-[17px] font-bold">
                    <Link href={`/projects/${project.slug}`} className="no-underline hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[14px] text-text-3">
                    {[project.location, project.year].filter(Boolean).join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CuratedUpdates updates={curatedUpdates} hue={hue} />

      {/* --------------------------------------------------------------- close */}
      <section className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <h2
                className="text-[clamp(26px,3.8vw,44px)] font-extrabold leading-[1.05] text-white"
                style={{ fontVariationSettings: '"wdth" 112' }}
              >
                {dict.company.workWith} {company.name}.
              </h2>
              <Link
                href="/contact"
                className="group/c mt-8 inline-flex items-center gap-2.5 bg-signal px-7 py-4 font-display text-[16px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5"
              >
                {dict.company.sendEnquiry}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/c:translate-x-1" />
              </Link>

              {(company.socials?.length ?? 0) > 0 && (
                <ul className="mt-9 flex flex-wrap gap-2">
                  {company.socials!.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="flex h-11 w-11 items-center justify-center rounded border border-line-ink text-on-ink-2 transition-colors hover:border-signal hover:text-signal"
                      >
                        <SocialIcon platform={social.platform} size={19} />
                        <span className="sr-only">
                          {company.name} {dict.company.onPlatform} {social.platform}{dict.common.openNewTab}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {company.contact && (company.contact.address || company.contact.phone || company.contact.email) && (
              <address className="space-y-4 not-italic text-on-ink-2">
                {company.contact.address && (
                  <p className="flex gap-3">
                    <Pin size={19} className="mt-0.5 shrink-0 text-signal" />
                    <span className="whitespace-pre-line">{company.contact.address}</span>
                  </p>
                )}
                {company.contact.phone && (
                  <p className="flex gap-3">
                    <Phone size={19} className="mt-0.5 shrink-0 text-signal" />
                    <a href={`tel:${company.contact.phone}`} className="hover:text-signal">{company.contact.phone}</a>
                  </p>
                )}
                {company.contact.email && (
                  <p className="flex gap-3">
                    <Mail size={19} className="mt-0.5 shrink-0 text-signal" />
                    <a href={`mailto:${company.contact.email}`} className="break-all hover:text-signal">
                      {company.contact.email}
                    </a>
                  </p>
                )}
              </address>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}

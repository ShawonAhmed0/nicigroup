import { RichText } from '@payloadcms/richtext-lexical/react'

import { BusinessBlock } from '@/components/BusinessBlock'
import { ArrowDown, ArrowRight, Mail, Phone, Pin } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getGeneratedAsset } from '@/lib/generated-assets'
import { getI18n } from '@/lib/i18n'
import { getCompanies, getConcerns, getGroup, getGroupFigures, getWings } from '@/lib/queries'

export const revalidate = 3600

export default async function HomePage() {
  const { locale, dict } = await getI18n()
  const [group, companies, concerns, figures] = await Promise.all([
    getGroup(locale),
    getCompanies(true, locale),
    getConcerns(locale),
    getGroupFigures(),
  ])

  const businesses = await Promise.all(
    companies.map(async (company) => ({ company, wings: await getWings(company.id, locale) })),
  )

  const chairman = group?.chairman
  const chairmanFallback = getGeneratedAsset('leadership', locale)

  /* Counted from the database, never typed in. NICI has not supplied headcount,
     turnover or years in operation, so the group's scale is stated with the
     facts the content model actually knows. */
  const counts = [
    { value: figures.companies, label: figures.companies === 1 ? dict.home.operatingCompany : dict.home.operatingCompanies },
    { value: figures.wings, label: figures.wings === 1 ? dict.home.businessWing : dict.home.businessWings },
    { value: new Set(companies.map((c) => c.sector)).size, label: dict.home.industriesServed },
    {
      value: figures.concerns,
      label: figures.concerns === 1 ? dict.home.concernSingle : dict.home.concernsPlural,
    },
  ].filter((c) => c.value > 0)

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div className="rise">
              <h1
                className="text-[clamp(38px,7vw,74px)] font-extrabold leading-[0.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {group?.positioning ?? dict.home.fallbackPositioning}
              </h1>

              <span aria-hidden="true" className="mt-8 block h-1.5 w-24 bg-signal" />

              <p className="mt-8 max-w-[54ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
                {group?.summary}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#businesses"
                  className="group/a inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 font-display text-[15px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5"
                >
                  {dict.home.seeWhatWeDo}
                  <ArrowDown size={17} className="transition-transform duration-300 group-hover/a:translate-y-1" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 border border-on-ink-3 px-6 py-3.5 font-display text-[15px] font-bold text-on-ink no-underline transition-colors hover:border-signal hover:text-signal"
                >
                  {dict.home.talkToUs}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Chairman. The client asked for the portrait here, and on a group
                site it is the right call: the face is what makes a holding
                company feel like a company. */}
            <figure className="rise [animation-delay:.12s]">
              <div className="relative">
                <span aria-hidden="true" className="absolute -top-1.5 left-0 z-10 h-1.5 w-20 bg-signal" />
                <MediaFrame
                  media={chairman?.portrait}
                  fallbackSrc={chairmanFallback?.src}
                  fallbackAlt={chairmanFallback?.alt}
                  kind="portrait"
                  tint="var(--signal)"
                  base="var(--ink-2)"
                  labelTone="dark-ground"
                  label={dict.home.chairmanPortrait}
                  size="card"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[4/5] w-full border border-line-ink sm:aspect-[5/4] lg:aspect-[4/5]"
                  priority
                />
              </div>

              {(chairman?.quote || chairman?.name) && <figcaption className="mt-5">
                {chairman?.quote && (
                  <blockquote className="border-l-2 border-signal pl-4 text-[17px] italic leading-relaxed text-on-ink">
                    “{chairman.quote}”
                  </blockquote>
                )}
                {chairman?.name && (
                  <>
                    <p className="mt-4 font-display text-[15px] font-bold text-white">{chairman.name}</p>
                    <p className="mt-0.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-on-ink-3">
                      {chairman.title || dict.home.chairman}, {group?.name ?? 'NICI Group'}
                    </p>
                  </>
                )}
              </figcaption>}
            </figure>
          </div>
        </div>

        {/* The three businesses named at the foot of the first viewport, so the
            breadth registers before anyone scrolls. */}
        {businesses.length > 0 && (
          <div className="border-t border-line-ink">
            <ul className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))]">
              {businesses.map(({ company }) => (
                <li key={company.id} className="border-b border-line-ink sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <Link
                    href={`/companies/${company.slug}`}
                    className="group/f flex h-full items-start gap-4 px-5 py-6 no-underline transition-colors hover:bg-ink-2 sm:px-8"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 block h-10 w-1 shrink-0"
                      style={{ background: company.brandColour ?? 'var(--signal)' }}
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[16px] font-bold text-white">{company.name}</span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-on-ink-3">{company.sector}</span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="ml-auto mt-1 shrink-0 text-on-ink-3 transition-all duration-300 group-hover/f:translate-x-1 group-hover/f:text-signal"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- figures */}
      {counts.length > 0 && (
        <section aria-label={dict.home.atGlance} className="border-b border-line bg-ground-2">
          <dl className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:py-14">
            {counts.map((count) => (
              <div key={count.label} className="flex flex-col">
                <dt className="order-2 mt-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-text-2">
                  {count.label}
                </dt>
                <dd
                  className="tnum order-1 font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-none text-text"
                  style={{ fontVariationSettings: '"wdth" 108' }}
                >
                  {count.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* ---------------------------------------------------------- businesses */}
      <div id="businesses" className="scroll-mt-16">
        {businesses.map(({ company, wings }, i) => (
          <BusinessBlock key={company.id} company={company} wings={wings} flip={i % 2 === 0} />
        ))}
      </div>

      {/* ------------------------------------------------------ chairman words */}
      {group?.chairmanMessage && (
        <section className="bg-ground" aria-labelledby="chairman-message">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              <h2 id="chairman-message" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
                {dict.home.fromChairman}
              </h2>
              <div className="max-w-[68ch] space-y-5 text-[18px] leading-relaxed text-text-2 [&_strong]:text-text">
                <RichText data={group.chairmanMessage} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ concerns */}
      {concerns.length > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="concerns">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              <div>
                <h2 id="concerns" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
                  {dict.home.beyondBusinesses}
                </h2>
                <p className="mt-4 max-w-[38ch] text-text-2">
                  {dict.home.beyondDescription}
                </p>
              </div>

              <ul className="grid gap-px bg-line sm:grid-cols-2">
                {concerns.map((concern) => (
                  <li key={concern.id} className="bg-ground p-7">
                    <h3 className="font-display text-[19px] font-bold">
                      <Link href={`/concerns/${concern.slug}`} className="no-underline hover:underline">
                        {concern.name}
                      </Link>
                    </h3>
                    <p className="mt-1 font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] text-text-3">
                      {concern.kind === 'csr' ? dict.common.socialInitiative : dict.common.sisterConcern}
                    </p>
                    <p className="mt-3.5 text-[15.5px] leading-relaxed text-text-2">{concern.summary}</p>
                    <Link
                      href={`/concerns/${concern.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-display text-[14px] font-bold no-underline hover:underline"
                    >
                      {dict.common.readMore}
                      <ArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- close */}
      <section className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <h2
                className="text-[clamp(30px,4.6vw,56px)] font-extrabold leading-[1.03] text-white"
                style={{ fontVariationSettings: '"wdth" 114' }}
              >
                {dict.home.closeHeading}
              </h2>
              <Link
                href="/contact"
                className="group/c mt-9 inline-flex items-center gap-2.5 bg-signal px-7 py-4 font-display text-[16px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5"
              >
                {dict.home.contactGroup}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/c:translate-x-1" />
              </Link>
            </div>

            {group?.contact && (group.contact.address || group.contact.phone || group.contact.email) ? (
              <address className="space-y-4 not-italic text-on-ink-2">
                {group.contact.address && (
                  <p className="flex gap-3">
                    <Pin size={19} className="mt-0.5 shrink-0 text-signal" />
                    <span className="whitespace-pre-line">{group.contact.address}</span>
                  </p>
                )}
                {group.contact.phone && (
                  <p className="flex gap-3">
                    <Phone size={19} className="mt-0.5 shrink-0 text-signal" />
                    <a href={`tel:${group.contact.phone}`} className="hover:text-signal">
                      {group.contact.phone}
                    </a>
                  </p>
                )}
                {group.contact.email && (
                  <p className="flex gap-3">
                    <Mail size={19} className="mt-0.5 shrink-0 text-signal" />
                    <a href={`mailto:${group.contact.email}`} className="break-all hover:text-signal">
                      {group.contact.email}
                    </a>
                  </p>
                )}
              </address>
            ) : (
              <p className="max-w-[40ch] text-on-ink-3">{dict.home.contactPending}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight, Mail, Phone, Pin, SocialIcon } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { getI18n } from '@/lib/i18n'
import { getCompanies, getGroup } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n()
  return { title: dict.contact.title, description: dict.contact.description }
}

export default async function ContactPage() {
  const { locale, dict } = await getI18n()
  const [group, companies] = await Promise.all([getGroup(locale), getCompanies(false, locale)])
  const groupName = group?.name ?? 'NICI Group'
  const groupContact = group?.contact
  const hasGroupContact = Boolean(groupContact?.address || groupContact?.phone || groupContact?.email)
  const groupInbox = groupContact?.enquiryInbox || groupContact?.email
  const withContact = companies.filter(
    (company) => company.contact?.address || company.contact?.phone || company.contact?.email,
  )

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs tone="dark" trail={[{ href: '/', label: groupName }, { label: dict.contact.title }]} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {dict.contact.title}: {groupName}
              </h1>
            </div>
            <p className="max-w-[44ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
              {dict.contact.intro}
            </p>
          </div>
        </div>
      </header>

      <section className="bg-ground" aria-labelledby="head-office">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:py-24">
          <div>
            <h2 id="head-office" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
              {dict.contact.headOffice}
            </h2>
            <p className="mt-4 max-w-[36ch] text-text-2">
              {dict.contact.headOfficeBody}
            </p>
          </div>

          {hasGroupContact ? (
            <div className="border-y border-line py-7">
              <address className="space-y-5 not-italic text-text-2">
                {groupContact?.address && (
                  <p className="flex gap-3">
                    <Pin size={20} className="mt-0.5 shrink-0 text-text" />
                    <span className="whitespace-pre-line">{groupContact.address}</span>
                  </p>
                )}
                {groupContact?.phone && (
                  <p className="flex gap-3">
                    <Phone size={20} className="mt-0.5 shrink-0 text-text" />
                    <a href={`tel:${groupContact.phone}`} className="font-semibold text-text hover:underline">
                      {groupContact.phone}
                    </a>
                  </p>
                )}
                {groupContact?.email && (
                  <p className="flex gap-3">
                    <Mail size={20} className="mt-0.5 shrink-0 text-text" />
                    <a href={`mailto:${groupContact.email}`} className="break-all font-semibold text-text hover:underline">
                      {groupContact.email}
                    </a>
                  </p>
                )}
              </address>

              <div className="mt-7 flex flex-wrap gap-3">
                {groupInbox && (
                  <a href={`mailto:${groupInbox}`} className="inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 font-display text-[15px] font-bold text-on-ink no-underline transition-transform hover:-translate-y-0.5">
                    {dict.contact.sendEmail}
                    <ArrowRight size={16} />
                  </a>
                )}
                {groupContact?.mapUrl && (
                  <a
                    href={groupContact.mapUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex items-center gap-2.5 border border-line-2 px-6 py-3.5 font-display text-[15px] font-bold no-underline hover:border-text"
                  >
                    {dict.contact.openMap}
                    <span className="sr-only">{dict.common.openNewTab}</span>
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="border-y border-line py-8">
              <h3 className="font-display text-[20px] font-bold">{dict.contact.pendingHeading}</h3>
              <p className="mt-3 max-w-[52ch] text-text-2">
                {dict.contact.pendingBody}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-ground-2" aria-labelledby="business-contacts">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 id="business-contacts" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight">
                {dict.contact.businessesHeading}
              </h2>
              <p className="mt-3 max-w-[54ch] text-text-2">
                {dict.contact.businessesBody}
              </p>
            </div>
            <Link href="/companies" className="inline-flex items-center gap-2 font-display text-[14px] font-bold hover:underline">
              {dict.contact.exploreBusinesses}
              <ArrowRight size={15} />
            </Link>
          </div>

          {withContact.length > 0 ? (
            <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-px bg-line">
              {withContact.map((company) => (
                <li key={company.id} className="bg-ground p-7">
                  <span aria-hidden="true" className="mb-5 block h-1 w-12" style={{ background: company.brandColour ?? 'var(--signal)' }} />
                  <h3 className="font-display text-[20px] font-bold">
                    <Link href={`/companies/${company.slug}`} className="no-underline hover:underline">{company.name}</Link>
                  </h3>
                  <address className="mt-5 space-y-3 not-italic text-[15px] leading-relaxed text-text-2">
                    {company.contact?.address && <p className="whitespace-pre-line">{company.contact.address}</p>}
                    {company.contact?.phone && (
                      <p><a href={`tel:${company.contact.phone}`} className="font-semibold text-text hover:underline">{company.contact.phone}</a></p>
                    )}
                    {company.contact?.email && (
                      <p><a href={`mailto:${company.contact.email}`} className="break-all font-semibold text-text hover:underline">{company.contact.email}</a></p>
                    )}
                  </address>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 border-y border-line py-8 text-text-2">
              {dict.contact.noBusinessContact}
            </p>
          )}
        </div>
      </section>

      {(group?.socials?.length ?? 0) > 0 && (
        <section className="bg-ink text-on-ink" aria-labelledby="social-heading">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center">
            <h2 id="social-heading" className="text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight text-white">
              {dict.contact.follow} {groupName}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {group!.socials!.map((social) => (
                <li key={social.id ?? `${social.platform}-${social.url}`}>
                  <a
                    href={social.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex h-12 w-12 items-center justify-center border border-line-ink text-on-ink-2 transition-colors hover:border-signal hover:text-signal"
                  >
                    <SocialIcon platform={social.platform} size={19} />
                    <span className="sr-only">{groupName} — {social.platform}{dict.common.openNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}

import { GroupMark } from '@/components/GroupMark'
import { SocialIcon } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { getI18n } from '@/lib/i18n'
import { getBusinessTree, getConcerns, getGroup } from '@/lib/queries'

export async function SiteFooter() {
  const { locale, dict } = await getI18n()
  const [group, tree, concerns] = await Promise.all([
    getGroup(locale),
    getBusinessTree(locale),
    getConcerns(locale),
  ])

  return (
    <footer className="border-t border-line-ink bg-ink text-on-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <GroupMark size={32} className="text-on-ink" />
              <span
                className="font-display text-[18px] font-extrabold text-white"
                style={{ fontVariationSettings: '"wdth" 118' }}
              >
                {group?.name ?? 'NICI Group'}
              </span>
            </Link>
            {group?.positioning && (
              <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-on-ink-3">{group.positioning}</p>
            )}

            {(group?.socials?.length ?? 0) > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {group!.socials!.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded border border-line-ink text-on-ink-2 transition-colors hover:border-signal hover:text-signal"
                    >
                      <SocialIcon platform={social.platform} size={18} />
                      <span className="sr-only">{group?.name ?? 'NICI Group'} {locale === 'bn' ? '—' : 'on'} {social.platform}{dict.common.openNewTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-10">
            {tree.map(({ company, wings }) => (
              <div key={company.id}>
                <span
                  aria-hidden="true"
                  className="mb-3 block h-[3px] w-8"
                  style={{ background: company.brandColour ?? 'var(--signal)' }}
                />
                <h2 className="font-display text-[14.5px] font-bold text-white">
                  <Link href={`/companies/${company.slug}`} className="no-underline hover:text-signal">
                    {company.name}
                  </Link>
                </h2>
                {wings.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {wings.map((wing) => (
                      <li key={wing.id}>
                        <Link
                          href={`/companies/${company.slug}/${wing.slug}`}
                          className="text-[14px] text-on-ink-3 no-underline hover:text-signal"
                        >
                          {wing.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div>
              <span aria-hidden="true" className="mb-3 block h-[3px] w-8 bg-signal" />
              <h2 className="font-display text-[14.5px] font-bold text-white">{dict.footer.group}</h2>
              <ul className="mt-3 space-y-2">
                <li><Link href="/about" className="text-[14px] text-on-ink-3 no-underline hover:text-signal">{dict.common.about}</Link></li>
                <li><Link href="/companies" className="text-[14px] text-on-ink-3 no-underline hover:text-signal">{dict.footer.allBusinesses}</Link></li>
                <li><Link href="/projects" className="text-[14px] text-on-ink-3 no-underline hover:text-signal">{dict.common.projects}</Link></li>
                <li><Link href="/news" className="text-[14px] text-on-ink-3 no-underline hover:text-signal">{dict.common.news}</Link></li>
                <li><Link href="/contact" className="text-[14px] text-on-ink-3 no-underline hover:text-signal">{dict.common.contact}</Link></li>
                {concerns.map((concern) => (
                  <li key={concern.id}>
                    <Link href={`/concerns/${concern.slug}`} className="text-[14px] text-on-ink-3 no-underline hover:text-signal">
                      {concern.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-line-ink pt-6 text-[13px] text-on-ink-3">
          © {new Date().getFullYear()} {group?.name ?? 'NICI Group'}. {dict.footer.copyright}
        </p>
      </div>
    </footer>
  )
}

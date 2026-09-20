import { GroupMark } from '@/components/GroupMark'
import { ArrowRight } from '@/components/Icon'
import { LanguageToggle } from '@/components/LanguageToggle'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { getI18n } from '@/lib/i18n'
import { getBusinessTree, getGroup } from '@/lib/queries'

/**
 * The business index is built from the CMS, so newly published companies and
 * wings enter both navigation variants without a code change.
 */
export async function SiteHeader() {
  const { locale, dict } = await getI18n()
  const [group, tree] = await Promise.all([getGroup(locale), getBusinessTree(locale)])
  const groupName = group?.name ?? 'NICI Group'

  return (
    <header className="sticky top-0 z-40 bg-ink text-on-ink">
      <div className="mx-auto flex min-h-[4rem] max-w-[1280px] items-center gap-2 px-4 py-2 sm:gap-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-on-ink no-underline transition-opacity hover:opacity-80"
        >
          <GroupMark size={28} className="text-on-ink" />
          <span
            className="whitespace-nowrap font-display text-[15px] font-extrabold tracking-[-0.01em] sm:text-[17px]"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {groupName}
          </span>
        </Link>

        <nav aria-label={dict.header.mainNav} className="ml-auto flex items-center gap-1 sm:gap-2">
          <details className="group/mobile-menu relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded px-2 font-display text-[13.5px] font-semibold text-on-ink-2 transition-colors hover:text-on-ink group-open/mobile-menu:text-signal">
              {dict.header.menu}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="transition-transform duration-200 group-open/mobile-menu:rotate-180">
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="fixed inset-x-4 top-[4.5rem] z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-md border border-line-ink bg-ink-2 p-3 shadow-[var(--shadow-2)]">
              <ul className="grid grid-cols-2 gap-1 border-b border-line-ink pb-3">
                {[
                  [dict.common.about, '/about'],
                  [dict.common.businesses, '/companies'],
                  [dict.common.projects, '/projects'],
                  [dict.common.news, '/news'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="block min-h-11 rounded px-3 py-2.5 font-display text-[14px] font-semibold text-on-ink no-underline hover:bg-ink-3 hover:text-signal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {tree.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {tree.map(({ company, wings }) => (
                    <li key={company.id} className="rounded p-3 hover:bg-ink-3">
                      <span aria-hidden="true" className="mb-2 block h-[3px] w-9" style={{ background: company.brandColour ?? 'var(--signal)' }} />
                      <Link href={`/companies/${company.slug}`} className="font-display text-[15px] font-bold text-on-ink no-underline hover:text-signal">
                        {company.name}
                      </Link>
                      {wings.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {wings.map((wing) => (
                            <li key={wing.id}>
                              <Link href={`/companies/${company.slug}/${wing.slug}`} className="block py-1 text-[13px] text-on-ink-2 no-underline hover:text-signal hover:underline">
                                {wing.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <LanguageToggle className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded border border-line-ink px-3 font-display text-[14px] font-bold text-on-ink no-underline hover:border-signal hover:text-signal sm:hidden" />
            </div>
          </details>

          <Link href="/about" className="hidden rounded px-3 py-2 font-display text-sm font-semibold text-on-ink-2 no-underline transition-colors hover:text-on-ink lg:block">
            {dict.common.about}
          </Link>

          <details className="group/menu relative hidden lg:block">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded px-3 py-2 font-display text-sm font-semibold text-on-ink-2 transition-colors hover:text-on-ink group-open/menu:text-signal">
              {dict.common.businesses}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="transition-transform duration-200 group-open/menu:rotate-180">
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="fixed left-4 right-4 top-[4.5rem] z-50 max-h-[calc(100dvh-5.5rem)] w-auto overflow-y-auto rounded-md border border-line-ink bg-ink-2 p-2 shadow-[var(--shadow-2)] lg:absolute lg:left-auto lg:right-0 lg:top-[calc(100%+8px)] lg:w-[min(92vw,660px)]">
              <div className="flex items-center justify-between border-b border-line-ink px-3 py-2">
                <p className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-on-ink-3">{dict.header.operatingBusinesses}</p>
                <Link href="/companies" className="font-display text-[13px] font-bold text-signal no-underline hover:underline">{dict.common.viewAll}</Link>
              </div>
              <ul className="grid gap-1 pt-1 sm:grid-cols-2 lg:grid-cols-3">
                {tree.map(({ company, wings }) => (
                  <li key={company.id} className="rounded p-3 transition-colors hover:bg-ink-3">
                    <span aria-hidden="true" className="mb-2.5 block h-[3px] w-9" style={{ background: company.brandColour ?? 'var(--signal)' }} />
                    <Link href={`/companies/${company.slug}`} className="font-display text-[15px] font-bold text-on-ink no-underline">
                      {company.name}
                    </Link>
                    <p className="mt-1 text-[13px] leading-snug text-on-ink-3">{company.sector}</p>
                    {wings.length > 0 && (
                      <ul className="mt-2.5 space-y-1">
                        {wings.map((wing) => (
                          <li key={wing.id}>
                            <Link href={`/companies/${company.slug}/${wing.slug}`} className="text-[13px] text-on-ink-2 no-underline hover:text-signal hover:underline">
                              {wing.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <Link href="/projects" className="hidden rounded px-3 py-2 font-display text-sm font-semibold text-on-ink-2 no-underline transition-colors hover:text-on-ink lg:block">
            {dict.common.projects}
          </Link>
          <Link href="/news" className="hidden rounded px-3 py-2 font-display text-sm font-semibold text-on-ink-2 no-underline transition-colors hover:text-on-ink lg:block">
            {dict.common.news}
          </Link>
          <LanguageToggle className="hidden min-h-11 shrink-0 items-center gap-1.5 rounded border border-line-ink px-2.5 font-display text-[13px] font-bold text-on-ink-2 no-underline transition-colors hover:border-signal hover:text-signal sm:flex" />
          <Link href="/contact" className="ml-0.5 flex min-h-11 shrink-0 items-center gap-1.5 rounded bg-signal px-3 font-display text-[13.5px] font-bold text-ink no-underline transition-transform hover:-translate-y-px sm:px-4 sm:text-sm">
            {dict.common.contact}
            <ArrowRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

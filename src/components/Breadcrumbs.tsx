import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { getI18n } from '@/lib/i18n'
type Crumb = { href?: string; label: string }

/** The only navigation that tells a visitor where they are inside a group. */
export async function Breadcrumbs({ trail, tone = 'light' }: { trail: Crumb[]; tone?: 'light' | 'dark' }) {
  const { locale } = await getI18n()
  const muted = tone === 'dark' ? 'text-white/60' : 'text-text-3'
  const current = tone === 'dark' ? 'text-white' : 'text-text'
  const hover = tone === 'dark' ? 'hover:text-white' : 'hover:text-text'

  return (
    <nav aria-label={locale === 'bn' ? 'ব্রেডক্রাম্ব' : 'Breadcrumb'} className={`font-display text-[13px] font-semibold ${muted}`}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2.5">
            {i > 0 && (
              <svg width="7" height="11" viewBox="0 0 7 11" aria-hidden="true" className="opacity-50">
                <path d="m1.3 1.3 4 4.2-4 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {crumb.href ? (
              <Link href={crumb.href} className={`no-underline transition-colors ${hover}`}>
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className={current}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

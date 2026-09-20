'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useLocale } from '@/components/LocaleProvider'
import { localizePath } from '@/lib/locales'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname() || '/'
  const nextLocale = locale === 'en' ? 'bn' : 'en'
  const label = locale === 'en' ? 'বাংলা' : 'English'
  const ariaLabel = locale === 'en' ? 'বাংলায় দেখুন' : 'View in English'

  return (
    <Link
      href={localizePath(pathname, nextLocale)}
      hrefLang={nextLocale}
      lang={nextLocale}
      aria-label={ariaLabel}
      className={className}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.4 12h17.2M12 3c2.2 2.45 3.35 5.45 3.35 9S14.2 18.55 12 21c-2.2-2.45-3.35-5.45-3.35-9S9.8 5.45 12 3Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>{label}</span>
    </Link>
  )
}

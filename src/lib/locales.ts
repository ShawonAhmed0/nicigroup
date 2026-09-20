export const LOCALES = ['en', 'bn'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'bn'
}

/** Add or remove the public Bengali URL prefix without touching external URLs. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path

  const withoutBengaliPrefix =
    path === '/bn' ? '/' : path.startsWith('/bn/') ? path.slice(3) || '/' : path

  if (locale === 'en') return withoutBengaliPrefix
  return withoutBengaliPrefix === '/' ? '/bn' : `/bn${withoutBengaliPrefix}`
}

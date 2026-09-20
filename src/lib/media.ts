import type { Media } from '@/payload-types'
import type { Locale } from '@/lib/locales'

type MediaRef = number | string | Media | null | undefined

/** Relationship fields arrive either populated or as a bare id, depending on depth. */
export const asMedia = (ref: MediaRef): Media | null =>
  ref && typeof ref === 'object' ? (ref as Media) : null

/** Payload may populate local uploads with the absolute `serverURL`. Treat its
 * own file endpoint as same-origin so `next/image` does not try to validate the
 * deployment hostname as a remote image provider. External storage URLs (for
 * example S3) are left untouched. */
const normalizeMediaUrl = (url: string): string => {
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/api/media/file/')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`
    }
  } catch {
    // Relative URLs are already safe for same-origin image delivery.
  }

  return url
}

export const mediaUrl = (ref: MediaRef, size?: 'thumbnail' | 'card' | 'wide' | 'share'): string | null => {
  const media = asMedia(ref)
  if (!media) return null
  if (size && media.sizes?.[size]?.url) return normalizeMediaUrl(media.sizes[size].url as string)
  return media.url ? normalizeMediaUrl(media.url) : null
}

export const mediaAlt = (ref: MediaRef, locale: Locale = 'en'): string => {
  const media = asMedia(ref)
  if (!media) return ''
  if (locale === 'bn' && media.bengali?.alt) return media.bengali.alt
  return media.alt ?? ''
}

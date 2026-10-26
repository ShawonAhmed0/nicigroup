import Image from 'next/image'

import { Portrait } from '@/components/Icon'
import { getLocale } from '@/lib/i18n'
import { mediaAlt, mediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

type Ref = number | string | Media | null | undefined

/**
 * An image slot. When NICI has supplied a photograph it renders it; when they
 * have not, it renders an honest, labelled placeholder rather than a decorative
 * shape pretending to be content. Nobody should be able to mistake an empty
 * slot for a finished page.
 */
export async function MediaFrame({
  media,
  label,
  fallbackSrc,
  fallbackAlt,
  tint = 'var(--signal)',
  className = '',
  sizes = '(max-width: 1024px) 100vw, 50vw',
  size = 'wide',
  priority = false,
  kind = 'scene',
  base = 'var(--ground-3)',
  labelTone = 'light-ground',
}: {
  media: Ref
  label: string
  /** A bundled editorial image used until the CMS has a replacement upload. */
  fallbackSrc?: string | null
  fallbackAlt?: string
  tint?: string
  className?: string
  sizes?: string
  size?: 'thumbnail' | 'card' | 'wide' | 'share'
  priority?: boolean
  kind?: 'scene' | 'portrait'
  /** Opaque ground under the placeholder, so it never dissolves into the page. */
  base?: string
  /** Which ground the label sits on, so it is tinted from that surface rather
      than left as a mid-grey that fails contrast on one of them. */
  labelTone?: 'light-ground' | 'dark-ground'
}) {
  const locale = await getLocale()
  const mediaSource = mediaUrl(media, size)
  const url = mediaSource ?? fallbackSrc

  if (url) {
    return (
      <div className={`relative overflow-hidden bg-ground-3 ${className}`}>
        <Image
          src={url}
          alt={mediaSource ? mediaAlt(media, locale) : (fallbackAlt ?? label)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: base,
        backgroundImage: `
          repeating-linear-gradient(90deg, color-mix(in srgb, ${tint} 26%, transparent) 0 1px, transparent 1px 46px),
          repeating-linear-gradient(0deg, color-mix(in srgb, ${tint} 26%, transparent) 0 1px, transparent 1px 46px),
          linear-gradient(150deg, color-mix(in srgb, ${tint} 16%, transparent), transparent 62%)
        `,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6 text-center">
        {kind === 'portrait' ? (
          <Portrait size={34} className="opacity-55" style={{ color: tint }} />
        ) : (
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke={tint}
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="opacity-55"
          >
            <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
            <path d="m2.5 15.5 5-4.5 4 3.5 3.5-3 6.5 5.5" />
            <circle cx="8.5" cy="9.5" r="1.4" />
          </svg>
        )}
        <p
          className={`max-w-[22ch] font-display text-[12.5px] font-semibold uppercase leading-snug tracking-[0.09em] ${
            labelTone === 'dark-ground' ? 'text-on-ink-2' : 'text-text-2'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

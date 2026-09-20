/**
 * Drawn icons, one stroke weight, one grid. Never a unicode glyph or emoji
 * standing in for an icon.
 */
type IconProps = {
  className?: string
  size?: number
  style?: React.CSSProperties
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
})

export const ArrowRight = ({ className, size = 20 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const ArrowDown = ({ className, size = 20 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
)

export const Phone = ({ className, size = 20 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </svg>
)

export const Mail = ({ className, size = 20 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
)

export const Pin = ({ className, size = 20 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Portrait = ({ className, size = 20, style }: IconProps) => (
  <svg {...base(size)} className={className} style={style}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M4.6 20a7.6 7.6 0 0 1 14.8 0" />
  </svg>
)

const PLATFORM_PATHS: Record<string, React.ReactNode> = {
  facebook: <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H17.6V4.4A22 22 0 0 0 15.2 4.3c-2.4 0-4 1.4-4 4v2.2H8.6v3h2.6V21z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V17M8 7.4v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.4" />
      <path d="m10.4 9.6 4.8 2.9-4.8 2.9z" />
    </>
  ),
  x: <path d="m4 4 7.2 9.1L4.4 20h1.9l5.6-5.9L16.6 20H20l-7.6-9.6L19.3 4h-1.9l-5.2 5.5L7.4 4z" />,
  tiktok: <path d="M14.3 3.5v10.9a3.4 3.4 0 1 1-3-3.4M14.3 6.4a4.7 4.7 0 0 0 4.4 3" />,
  whatsapp: <path d="M3.7 20.3 5 16.6a7.7 7.7 0 1 1 3 2.8zM9 9.2c.3 2.2 2.2 4.1 4.4 4.6l1-1.2 2 .9v1.6c-2.9.4-6.6-2.6-7.4-5.8l1.3-.9z" />,
  website: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8M12 3.5c4 4.6 4 12.4 0 17-4-4.6-4-12.4 0-17" />
    </>
  ),
}

export const SocialIcon = ({ platform, className, size = 20 }: IconProps & { platform: string }) => {
  const path = PLATFORM_PATHS[platform] ?? PLATFORM_PATHS.website
  return (
    <svg {...base(size)} className={className}>
      {path}
    </svg>
  )
}

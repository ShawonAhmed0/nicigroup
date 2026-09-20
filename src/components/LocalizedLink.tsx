'use client'

import Link, { type LinkProps } from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

import { useLocale } from '@/components/LocaleProvider'
import { localizePath } from '@/lib/locales'

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: React.ReactNode
  }

export function LocalizedLink({ href, ...props }: Props) {
  const locale = useLocale()
  const localizedHref = typeof href === 'string' ? localizePath(href, locale) : href
  return <Link href={localizedHref} {...props} />
}

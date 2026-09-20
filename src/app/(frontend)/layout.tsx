import type { Metadata } from 'next'

import { Archivo, Literata } from 'next/font/google'
import React from 'react'

import { LocaleProvider } from '@/components/LocaleProvider'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getI18n, getPathname } from '@/lib/i18n'
import { localizePath } from '@/lib/locales'
import { getGroup } from '@/lib/queries'

import './globals.css'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
})

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  display: 'swap',
})

const CONTRACT = `<!--
NICI GROUP — DIRECTION CONTRACT
World: the corporate-group site played straight, built to the craft level of
  VINCI and Skanska (saturated sector fields, site photography, bold figures)
  crossed with Mitsubishi Corporation's composure.
Colour: full palette. The group owns ink navy, paper white and one signal
  yellow; each business owns a saturated field. Breadth is the product, so
  colour carries it. Business hues are structural, never text or state.
Type: Archivo (variable width) for display and UI; Literata for reading.
First viewport: dark ink hero, asymmetric, the chairman's portrait facing the
  group's claim, the three businesses named along the foot.
Truth: no figure, client or credential NICI has not supplied. Counts are read
  from the database; every unsupplied block hides rather than invents.
-->`

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n()
  const [group, pathname] = await Promise.all([getGroup(locale), getPathname()])
  const name = group?.name ?? 'NICI Group'
  const englishPath = localizePath(pathname, 'en')
  const bengaliPath = localizePath(pathname, 'bn')
  return {
    title: {
      default: group?.seo?.title || `${name} — ${group?.positioning ?? ''}`.trim(),
      template: `%s — ${name}`,
    },
    description: group?.seo?.description || group?.summary || undefined,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    alternates: {
      canonical: locale === 'bn' ? bengaliPath : englishPath,
      languages: { en: englishPath, bn: bengaliPath },
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { locale, dict } = await getI18n()

  return (
    <html lang={locale}>
      <body className={`${archivo.variable} ${literata.variable}`}>
        <LocaleProvider locale={locale}>
          <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-ink"
          >
            {dict.layout.skip}
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="scroll-mt-16 outline-none">{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  )
}

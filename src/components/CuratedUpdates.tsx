import { ArrowRight } from '@/components/Icon'
import { MediaFrame } from '@/components/MediaFrame'
import { formatDate, getI18n } from '@/lib/i18n'
import type { Media } from '@/payload-types'

type Update = {
  id?: string | null
  title: string
  excerpt?: string | null
  image?: number | string | Media | null
  date: string
  url?: string | null
  platform?: string | null
}

export async function CuratedUpdates({
  updates,
  hue,
  heading,
}: {
  updates: Update[]
  hue: string
  heading?: string
}) {
  if (updates.length === 0) return null
  const { locale, dict } = await getI18n()
  const resolvedHeading = heading ?? dict.updates.heading

  return (
    <section className="border-t border-line bg-ground-2" aria-labelledby="latest-updates">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <h2 id="latest-updates" className="text-[clamp(26px,3.2vw,38px)] font-extrabold leading-tight">
          {resolvedHeading}
        </h2>
        <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-7">
          {updates.map((update) => {
            const content = (
              <>
                {update.image && (
                  <MediaFrame
                    media={update.image}
                    tint={hue}
                    label={dict.updates.image}
                    size="card"
                    className="aspect-[16/10] w-full"
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                )}
                <div className="flex flex-1 flex-col border-t-4 bg-ground p-6" style={{ borderColor: hue }}>
                  <div className="flex flex-wrap items-center gap-x-2 font-display text-[12.5px] font-semibold text-text-3">
                    <time dateTime={update.date}>{formatDate(update.date, locale)}</time>
                    {update.platform && <span>· {update.platform}</span>}
                  </div>
                  <h3 className="mt-3 font-display text-[19px] font-bold leading-snug">{update.title}</h3>
                  {update.excerpt && <p className="mt-3 text-[15px] leading-relaxed text-text-2">{update.excerpt}</p>}
                  {update.url && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[14px] font-bold">
                      {dict.updates.visit}
                      <span className="sr-only">{dict.common.openNewTab}</span>
                      <ArrowRight size={15} />
                    </span>
                  )}
                </div>
              </>
            )

            return (
              <li key={update.id ?? `${update.date}-${update.title}`} className="flex min-h-full flex-col overflow-hidden shadow-[var(--shadow-1)]">
                {update.url ? (
                  <a href={update.url} rel="noopener noreferrer" target="_blank" className="flex min-h-full flex-col text-inherit no-underline hover:-translate-y-0.5">
                    {content}
                  </a>
                ) : content}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

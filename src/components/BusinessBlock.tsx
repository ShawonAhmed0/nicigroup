import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getI18n } from '@/lib/i18n'
import type { Company, Wing } from '@/payload-types'

/**
 * One operating business, full bleed.
 *
 * The saturated field and its bright accent are both mixed from the single
 * brand colour held in the CMS, so a business added next year gets a correct,
 * legible block from one hex value — nothing here is keyed to a known slug and
 * nothing depends on there being exactly three.
 */
export async function BusinessBlock({
  company,
  wings,
  flip,
}: {
  company: Company
  wings: Wing[]
  flip: boolean
}) {
  const { dict } = await getI18n()
  const hue = company.brandColour ?? '#1B4DE4'

  return (
    <section
      aria-labelledby={`business-${company.slug}`}
      style={
        {
          '--c': hue,
          '--field': `color-mix(in oklab, ${hue} 30%, #050C16)`,
          '--spark': `color-mix(in oklab, ${hue} 72%, white)`,
        } as React.CSSProperties
      }
    >
      <div className="grid lg:grid-cols-2">
        <MediaFrame
          media={company.heroImage}
          tint={hue}
          kind="scene"
          label={`${company.name} — ${dict.company.photography}`}
          className={`aspect-[4/3] lg:aspect-auto lg:min-h-[560px] ${flip ? '' : 'lg:order-2'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        <div className="bg-[var(--field)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto flex h-full max-w-[46ch] flex-col justify-center">
            <span aria-hidden="true" className="mb-7 block h-1.5 w-16 bg-[var(--spark)]" />

            <h2
              id={`business-${company.slug}`}
              className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] text-white"
              style={{ fontVariationSettings: '"wdth" 112' }}
            >
              {company.name}
            </h2>

            <p className="mt-3 font-display text-[15px] font-semibold uppercase tracking-[0.1em] text-white/85">
              {company.sector}
            </p>

            <p className="mt-5 text-[17px] leading-relaxed text-white/85">{company.summary}</p>

            {wings.length > 0 && (
              <>
                <h3 className="mt-9 font-display text-[12.5px] font-bold uppercase tracking-[0.14em] text-white/55">
                  {wings.length} {wings.length === 1 ? dict.about.wing : dict.about.wings}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {wings.map((wing) => (
                    <li key={wing.id}>
                      <Link
                        href={`/companies/${company.slug}/${wing.slug}`}
                        className="inline-block rounded-full border border-white/25 px-3.5 py-1.5 text-[13.5px] text-white/90 no-underline transition-colors hover:border-[var(--spark)] hover:bg-white/10 hover:text-white"
                      >
                        {wing.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              href={`/companies/${company.slug}`}
              className="group/cta mt-10 inline-flex w-fit items-center gap-2.5 bg-white px-6 py-3.5 font-display text-[15px] font-bold text-[var(--field)] no-underline transition-transform hover:-translate-y-0.5"
            >
              {dict.common.viewDetails}: {company.name}
              <ArrowRight size={17} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { getI18n } from '@/lib/i18n'

export default async function NotFound() {
  const { dict } = await getI18n()
  return (
    <section className="bg-ink text-on-ink">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:py-28">
        <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
        <p className="tnum font-display text-[15px] font-bold text-signal">404</p>
        <h1
          className="mt-3 max-w-[14ch] text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
          style={{ fontVariationSettings: '"wdth" 116' }}
        >
          {dict.notFound.heading}
        </h1>
        <p className="mt-7 max-w-[48ch] text-[18px] leading-relaxed text-on-ink-2">
          {dict.notFound.body}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 font-display text-[15px] font-bold text-ink no-underline hover:-translate-y-0.5">
            {dict.notFound.home}
            <ArrowRight size={16} />
          </Link>
          <Link href="/companies" className="inline-flex items-center gap-2.5 border border-on-ink-3 px-6 py-3.5 font-display text-[15px] font-bold text-on-ink no-underline hover:border-signal hover:text-signal">
            {dict.notFound.businesses}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

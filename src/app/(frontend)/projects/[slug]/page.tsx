import type { Metadata } from 'next'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getI18n } from '@/lib/i18n'
import { getProject } from '@/lib/queries'

export const revalidate = 3600

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getI18n()
  const project = await getProject(slug, locale)
  if (!project) return {}

  return {
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.summary || undefined,
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const { locale, dict } = await getI18n()
  const project = await getProject(slug, locale)
  if (!project) notFound()

  const company = typeof project.company === 'object' ? project.company : null
  const wing = project.wing && typeof project.wing === 'object' ? project.wing : null
  const hue = company?.brandColour ?? '#1B4DE4'

  return (
    <article
      style={
        {
          '--field': `color-mix(in oklab, ${hue} 30%, #050C16)`,
          '--spark': `color-mix(in oklab, ${hue} 72%, white)`,
        } as React.CSSProperties
      }
    >
      <header className="bg-[var(--field)] text-white">
        <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-8">
          <Breadcrumbs
            tone="dark"
            trail={[
              { href: '/', label: 'NICI Group' },
              { href: '/projects', label: dict.projects.title },
              { label: project.title },
            ]}
          />

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-[var(--spark)]" />
              <h1
                className="text-[clamp(34px,6vw,64px)] font-extrabold leading-[1] text-white"
                style={{ fontVariationSettings: '"wdth" 114' }}
              >
                {project.title}
              </h1>
              {company && (
                <p className="mt-4 font-display text-[15px] font-semibold uppercase tracking-[.12em] text-white/85">
                  {company.name}{wing ? ` · ${wing.name}` : ''}
                </p>
              )}
              {project.summary && (
                <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.8vw,19px)] leading-relaxed text-white/85">
                  {project.summary}
                </p>
              )}
            </div>

            <MediaFrame
              media={project.coverImage}
              tint={hue}
              label={dict.projects.photo}
              size="wide"
              className="aspect-[3/2] w-full border border-white/15"
              sizes="(max-width: 1024px) 100vw, 44vw"
              priority
            />
          </div>
        </div>
      </header>

      <section className="border-b border-line bg-ground-2" aria-label={dict.project.details}>
        <dl className="mx-auto grid max-w-[1280px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-ground-2 px-5 py-7 sm:px-8">
            <dt className="font-display text-[12.5px] font-bold uppercase tracking-[.12em] text-text-3">{dict.common.year}</dt>
            <dd className="tnum mt-2 font-display text-[18px] font-bold">{project.year}</dd>
          </div>
          {project.location && (
            <div className="bg-ground-2 px-5 py-7 sm:px-8">
              <dt className="font-display text-[12.5px] font-bold uppercase tracking-[.12em] text-text-3">{dict.common.location}</dt>
              <dd className="mt-2 font-display text-[18px] font-bold">{project.location}</dd>
            </div>
          )}
          {project.client && (
            <div className="bg-ground-2 px-5 py-7 sm:px-8">
              <dt className="font-display text-[12.5px] font-bold uppercase tracking-[.12em] text-text-3">{dict.common.client}</dt>
              <dd className="mt-2 font-display text-[18px] font-bold">{project.client}</dd>
            </div>
          )}
        </dl>
      </section>

      {project.description && (
        <section className="bg-ground">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20 lg:py-24">
            <h2 className="text-[clamp(26px,3.2vw,38px)] font-extrabold leading-tight">{dict.project.overview}</h2>
            <div className="max-w-[68ch] space-y-5 text-[18px] leading-relaxed text-text-2">
              <RichText data={project.description} />
            </div>
          </div>
        </section>
      )}

      {(project.gallery?.length ?? 0) > 0 && (
        <section className="border-t border-line bg-ground-2" aria-labelledby="project-gallery">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="project-gallery" className="text-[clamp(26px,3.2vw,38px)] font-extrabold leading-tight">
              {dict.project.gallery}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {project.gallery!.map((image, index) => (
                <li key={typeof image === 'object' ? image.id : image}>
                  <MediaFrame
                    media={image}
                    tint={hue}
                    label={`${dict.projects.photo} ${index + 1}`}
                    size="wide"
                    className="aspect-[3/2] w-full"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-ink text-on-ink">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center">
          <h2 className="max-w-[22ch] text-[clamp(26px,3.4vw,40px)] font-extrabold leading-tight text-white">
            {dict.project.enquiryHeading}
          </h2>
          <div className="flex flex-wrap gap-3">
            {company && (
              <Link href={`/companies/${company.slug}`} className="inline-flex items-center gap-2.5 border border-on-ink-3 px-6 py-3.5 font-display text-[15px] font-bold text-on-ink no-underline hover:border-signal hover:text-signal">
                {dict.project.viewCompany} {company.name}
                <ArrowRight size={16} />
              </Link>
            )}
            <Link href="/contact" className="group/c inline-flex items-center gap-2.5 bg-signal px-6 py-3.5 font-display text-[15px] font-bold text-ink no-underline transition-transform hover:-translate-y-0.5">
              {dict.project.contactGroup}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/c:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}

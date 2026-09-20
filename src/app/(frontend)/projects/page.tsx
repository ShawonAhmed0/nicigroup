import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArrowRight } from '@/components/Icon'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { MediaFrame } from '@/components/MediaFrame'
import { getI18n } from '@/lib/i18n'
import { getGroup, getProjects } from '@/lib/queries'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n()
  return { title: dict.projects.title, description: dict.projects.description }
}

export default async function ProjectsPage() {
  const { locale, dict } = await getI18n()
  const [projects, group] = await Promise.all([getProjects(undefined, locale), getGroup(locale)])
  const groupName = group?.name ?? 'NICI Group'

  return (
    <article>
      <header className="bg-ink text-on-ink">
        <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
          <Breadcrumbs tone="dark" trail={[{ href: '/', label: groupName }, { label: dict.projects.title }]} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <span aria-hidden="true" className="mb-7 block h-1.5 w-20 bg-signal" />
              <h1
                className="text-[clamp(38px,7vw,72px)] font-extrabold leading-[.98] text-white"
                style={{ fontVariationSettings: '"wdth" 116' }}
              >
                {dict.projects.eyebrow}
              </h1>
            </div>
            <p className="max-w-[44ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-on-ink-2">
              {dict.projects.intro}
            </p>
          </div>
        </div>
      </header>

      <section className="bg-ground-2" aria-label={dict.projects.archive}>
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
          {projects.length === 0 ? (
            <div className="grid gap-8 border-y border-line py-12 lg:grid-cols-[1fr_.75fr] lg:gap-20">
              <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold leading-tight">
                {dict.projects.emptyHeading}
              </h2>
              <div>
                <p className="max-w-[48ch] text-text-2">
                  {dict.projects.emptyBody}
                </p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-display text-[15px] font-bold hover:underline">
                  {dict.projects.discuss}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-x-7 gap-y-12">
              {projects.map((project) => {
                const company = typeof project.company === 'object' ? project.company : null
                const hue = company?.brandColour ?? 'var(--signal)'

                return (
                  <li key={project.id} className="group/project relative">
                    <MediaFrame
                      media={project.coverImage}
                      tint={hue}
                      size="card"
                      label={dict.projects.photo}
                      className="aspect-[3/2] w-full"
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                    <div className="border-t-[5px] bg-ground p-6" style={{ borderColor: hue }}>
                      {company && (
                        <p className="font-display text-[12.5px] font-bold uppercase tracking-[.1em] text-text-3">
                          {company.name}
                        </p>
                      )}
                      <h2 className="mt-2 font-display text-[20px] font-bold leading-snug">
                        <Link href={`/projects/${project.slug}`} className="no-underline">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-[14px] text-text-3">
                        {[project.location, project.year].filter(Boolean).join(' · ')}
                      </p>
                      {project.summary && <p className="mt-4 text-[15.5px] leading-relaxed text-text-2">{project.summary}</p>}
                      <span className="mt-6 inline-flex items-center gap-2 font-display text-[14px] font-bold">
                        {dict.projects.viewProject}
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover/project:translate-x-1" />
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </article>
  )
}

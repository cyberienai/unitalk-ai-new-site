'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowLeft, Check, FileText } from 'lucide-react'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getMission, relatedMissions, MISSION_CATEGORIES } from '@/lib/missions-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'

const CREATE_ORG_HREF = '/decouvrir'

type Copy = {
  back: string
  objectiveWord: string
  stepsWord: string
  deliverableWord: string
  producesWord: string
  skillsWord: string
  toolsWord: string
  recommendedWord: string
  profileWord: string
  collaboratorWord: string
  seeProfile: string
  startCta: string
  trialNote: string
  relatedWord: string
  seeAll: string
}

const T: Record<Lang, Copy> = {
  fr: {
    back: 'Toutes les Missions',
    objectiveWord: 'Objectif',
    stepsWord: 'Comment elle se déroule',
    deliverableWord: 'Exemple de livrable',
    producesWord: 'Ce qu’elle produit',
    skillsWord: 'Savoir-faire mobilisés',
    toolsWord: 'Outils possibles',
    recommendedWord: 'Recommandé pour cette Mission',
    profileWord: 'Profil',
    collaboratorWord: 'Collaborateur IA',
    seeProfile: 'Voir le Collaborateur',
    startCta: 'Confier cette Mission',
    trialNote: 'Essai gratuit de 7 jours. Sans engagement.',
    relatedWord: 'Missions liées',
    seeAll: 'Voir toutes les Missions',
  },
  en: {
    back: 'All Missions',
    objectiveWord: 'Objective',
    stepsWord: 'How it unfolds',
    deliverableWord: 'Example deliverable',
    producesWord: 'What it produces',
    skillsWord: 'Know-how mobilized',
    toolsWord: 'Possible tools',
    recommendedWord: 'Recommended for this Mission',
    profileWord: 'Profile',
    collaboratorWord: 'AI Collaborator',
    seeProfile: 'See the Collaborator',
    startCta: 'Hand over this Mission',
    trialNote: '7-day free trial. No commitment.',
    relatedWord: 'Related Missions',
    seeAll: 'See all Missions',
  },
}

export function MissionDetailContent({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const t = T[lang]
  const mission = getMission(slug)

  if (!mission) return null

  const collab = ROLE_DETAILS[mission.collaboratorSlug]
  const category = MISSION_CATEGORIES.find((c) => c.key === mission.category)
  const related = relatedMissions(slug)

  return (
    <main className="bg-[#F3EFE6]">
      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="editorial-shell">
          <Link
            href="/missions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A8175] transition-colors hover:text-[#D10E63]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.back}
          </Link>
          {category && (
            <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{category.label[lang]}</p>
          )}
          <h1 className="mt-3 max-w-3xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl">
            {mission.title[lang]}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{mission.description[lang]}</p>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {/* Objective */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.objectiveWord}</p>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-[#1C1A17]">{mission.objective[lang]}</p>
            </div>

            {/* Steps */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.stepsWord}</p>
              <ol className="mt-4 flex flex-col gap-3">
                {mission.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 font-mono text-xs font-bold text-[#D10E63]">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-[#4E483F]">{s[lang]}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverable */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.deliverableWord}</p>
              <div className="mt-4 flex items-start gap-3 rounded-3xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  <FileText className="h-4 w-4" />
                </span>
                <p className="text-pretty text-sm leading-relaxed text-[#1C1A17]">{mission.deliverable[lang]}</p>
              </div>
            </div>

            {/* Produces */}
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.producesWord}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {mission.produces.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-xl bg-[#FBF9F3] px-4 py-3 text-sm font-medium text-[#1C1A17]">
                    <Check className="h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                    {p[lang]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills + tools */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.skillsWord}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mission.skills.map((s, i) => (
                    <span key={i} className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1 text-xs font-medium text-[#4E483F]">
                      {s[lang]}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.toolsWord}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mission.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-[#EDE7DA] px-3 py-1 text-xs font-medium text-[#4E483F]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column (sticky) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.recommendedWord}</p>

              {collab && (
                <Link href={collaboratorHref(mission.collaboratorSlug)} className="mt-4 flex items-center gap-3 rounded-2xl border border-[#E4DDCE] bg-[#F3EFE6] p-3 transition-colors hover:border-[#D10E63]/40">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={collab.avatar || '/placeholder.svg'} alt={collab.name} fill className="object-cover" sizes="48px" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A8175]">{t.collaboratorWord}</p>
                    <p className="truncate font-sf text-base font-bold text-[#1C1A17]">{collab.name}</p>
                    <p className="truncate text-xs text-[#6E665A]">{mission.profile[lang]}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#8A8175]" />
                </Link>
              )}

              <div className="mt-5 border-t border-[#E4DDCE] pt-5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8A8175]">{t.profileWord}</p>
                <p className="mt-1 text-sm font-semibold text-[#D10E63]">{mission.profile[lang]}</p>
              </div>

              <Link
                href={CREATE_ORG_HREF}
                className="mt-6 flex items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.startCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-[#8A8175]">{t.trialNote}</p>

              {collab && (
                <Link
                  href={collaboratorHref(mission.collaboratorSlug)}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
                >
                  {t.seeProfile}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
          <div className="editorial-shell">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.relatedWord}</h2>
              <Link
                href="/missions"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
              >
                {t.seeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((m) => (
                <Link
                  key={m.slug}
                  href={`/missions/${m.slug}`}
                  className="group flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-300 hover:border-[#D10E63]/30 hover:shadow-[0_20px_50px_rgba(28,26,23,0.07)]"
                >
                  <h3 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{m.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{m.description[lang]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#D10E63]">
                    {m.profile[lang]}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search, MessageSquare, Layers, Cpu, ShieldCheck, Gauge, Eye, GraduationCap, Repeat } from 'lucide-react'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS, MISSION_CATEGORIES } from '@/lib/missions-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'

const CREATE_ORG_HREF = '/decouvrir'

type StepCopy = { icon: typeof MessageSquare; title: string; body: string }

type Copy = {
  kicker: string
  title: string
  lead: string
  searchPlaceholder: string
  searchExamplesLabel: string
  searchExamples: string[]
  seeResults: string
  rolesWord: string
  missionsWord: string
  noResult: string
  clearSearch: string
  conceptKicker: string
  conceptTitle: string
  conceptSteps: StepCopy[]
  benefitsKicker: string
  benefitsTitle: string
  benefits: StepCopy[]
  catalogueKicker: string
  catalogueTitle: string
  allLabel: string
  resultWord: string
  toolsWord: string
  profileWord: string
  discover: string
  proofKicker: string
  proofTitle: string
  proofLead: string
  proofBrief: string
  proofBriefText: string
  proofResult: string
  proofResultText: string
  proofReview: string
  proofValidate: string
  proofCta: string
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Choisissez ce que vous voulez accomplir',
    title: 'Confiez-lui un résultat, pas une tâche.',
    lead: 'Une Mission, c’est un résultat concret que vous confiez à votre Collaborateur IA. Il mobilise le bon savoir-faire, travaille dans votre Workspace et vous rend un livrable prêt à valider.',
    searchPlaceholder: 'Que voulez-vous accomplir ?',
    searchExamplesLabel: 'Exemples',
    searchExamples: ['Trouver des clients', 'Préparer une réunion', 'Créer du contenu', 'Automatiser un processus'],
    seeResults: 'Voir les résultats',
    rolesWord: 'métiers',
    missionsWord: 'Missions',
    noResult: 'Aucune Mission ne correspond à votre recherche. Essayez un autre mot ou explorez toutes les Missions.',
    clearSearch: 'Effacer',
    conceptKicker: 'Comment ça marche',
    conceptTitle: 'Qu’est-ce qu’une Mission ?',
    conceptSteps: [
      { icon: MessageSquare, title: 'Vous décrivez un résultat', body: 'Vous exprimez ce que vous voulez obtenir, en langage clair.' },
      { icon: Layers, title: 'Le bon Profil est mobilisé', body: 'Unitalk active le savoir-faire métier adapté à votre demande.' },
      { icon: Cpu, title: 'Le Collaborateur travaille', body: 'Il agit dans votre Workspace, avec vos outils et votre contexte.' },
      { icon: ShieldCheck, title: 'Vous examinez et validez', body: 'Rien n’est finalisé sans votre accord. Vous gardez la main.' },
    ],
    benefitsKicker: 'Ce que ça vous apporte',
    benefitsTitle: 'Une Mission, c’est vous qui gagnez.',
    benefits: [
      { icon: Gauge, title: 'Accélérez votre expertise', body: 'Obtenez en quelques minutes ce qui vous prenait des heures.' },
      { icon: Eye, title: 'Supervisez votre Collaborateur IA', body: 'Vous suivez chaque étape et validez le résultat avant qu’il ne compte.' },
      { icon: GraduationCap, title: 'Ajoutez les savoir-faire métier', body: 'Mobilisez les compétences nécessaires pour atteindre vos objectifs.' },
      { icon: Repeat, title: 'Déléguez les tâches répétitives', body: 'Libérez votre temps pour ce qui demande vraiment votre attention.' },
    ],
    catalogueKicker: 'Le catalogue',
    catalogueTitle: 'Des Missions pour chaque métier.',
    allLabel: 'Toutes',
    resultWord: 'Résultat',
    toolsWord: 'Outils possibles',
    profileWord: 'Profil',
    discover: 'Découvrir cette Mission',
    proofKicker: 'Une Mission en action',
    proofTitle: 'Du besoin au livrable.',
    proofLead: 'Voici à quoi ressemble une Mission confiée à un Collaborateur IA, du brief jusqu’au résultat prêt à valider.',
    proofBrief: 'La demande',
    proofBriefText: 'Claire : « Hugo, prépare-moi 20 prospects qualifiés dans le secteur de la logistique, avec un message de contact pour chacun. »',
    proofResult: 'Le livrable',
    proofResultText: '20 prospects qualifiés, chacun avec son contact, son contexte et un message personnalisé prêt à envoyer.',
    proofReview: 'Examiner',
    proofValidate: 'Valider',
    proofCta: 'Voir le Workspace',
    ctaTitle: 'Confiez-lui votre première Mission.',
    ctaLead: 'Créez votre organisation et lancez une première Mission. Essai gratuit de 7 jours.',
    ctaPrimary: 'Créer mon organisation',
    ctaSecondary: 'Voir les tarifs',
  },
  en: {
    kicker: 'Choose what you want to accomplish',
    title: 'Hand it an outcome, not a task.',
    lead: 'A Mission is a concrete outcome you hand to your AI Collaborator. It mobilizes the right know-how, works inside your Workspace and hands back a deliverable ready to approve.',
    searchPlaceholder: 'What do you want to accomplish?',
    searchExamplesLabel: 'Examples',
    searchExamples: ['Find clients', 'Prepare a meeting', 'Create content', 'Automate a process'],
    seeResults: 'See results',
    rolesWord: 'roles',
    missionsWord: 'Missions',
    noResult: 'No Mission matches your search. Try another word or explore all Missions.',
    clearSearch: 'Clear',
    conceptKicker: 'How it works',
    conceptTitle: 'What is a Mission?',
    conceptSteps: [
      { icon: MessageSquare, title: 'You describe an outcome', body: 'You express what you want to achieve, in plain language.' },
      { icon: Layers, title: 'The right Profile is mobilized', body: 'Unitalk activates the job know-how that fits your request.' },
      { icon: Cpu, title: 'The Collaborator works', body: 'It acts in your Workspace, with your tools and your context.' },
      { icon: ShieldCheck, title: 'You review and approve', body: 'Nothing is finalized without your go-ahead. You stay in control.' },
    ],
    benefitsKicker: 'What you gain',
    benefitsTitle: 'A Mission works in your favor.',
    benefits: [
      { icon: Gauge, title: 'Accelerate your expertise', body: 'Get in minutes what used to take you hours.' },
      { icon: Eye, title: 'Supervise your AI Collaborator', body: 'You follow every step and approve the result before it counts.' },
      { icon: GraduationCap, title: 'Add the job know-how you need', body: 'Mobilize the exact skills required to reach your goals.' },
      { icon: Repeat, title: 'Delegate repetitive tasks', body: 'Free your time for the work that truly needs your attention.' },
    ],
    catalogueKicker: 'The catalog',
    catalogueTitle: 'Missions for every role.',
    allLabel: 'All',
    resultWord: 'Outcome',
    toolsWord: 'Possible tools',
    profileWord: 'Profile',
    discover: 'Discover this Mission',
    proofKicker: 'A Mission in action',
    proofTitle: 'From need to deliverable.',
    proofLead: 'Here is what a Mission handed to an AI Collaborator looks like, from the brief to the result ready to approve.',
    proofBrief: 'The request',
    proofBriefText: 'Claire: "Hugo, prepare 20 qualified prospects in the logistics sector, with an outreach message for each."',
    proofResult: 'The deliverable',
    proofResultText: '20 qualified prospects, each with their contact, context and a personalized message ready to send.',
    proofReview: 'Review',
    proofValidate: 'Approve',
    proofCta: 'See the Workspace',
    ctaTitle: 'Hand it your first Mission.',
    ctaLead: 'Create your organization and launch a first Mission. 7-day free trial.',
    ctaPrimary: 'Create my organization',
    ctaSecondary: 'See pricing',
  },
}

function matchesQuery(m: (typeof MISSIONS)[number], lang: Lang, q: string) {
  const haystack = `${m.title[lang]} ${m.description[lang]} ${m.profile[lang]} ${m.skills.map((s) => s[lang]).join(' ')}`.toLowerCase()
  return haystack.includes(q)
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [active, setActive] = useState<string>('all')
  const [query, setQuery] = useState<string>('')

  const filters = useMemo(
    () => [{ key: 'all', label: t.allLabel }, ...MISSION_CATEGORIES.map((c) => ({ key: c.key, label: c.label[lang] }))],
    [t, lang],
  )

  const categoryLabel = (key: string) => MISSION_CATEGORIES.find((c) => c.key === key)?.label[lang] ?? ''

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MISSIONS.filter((m) => {
      const matchesCat = active === 'all' || m.category === active
      if (!matchesCat) return false
      if (!q) return true
      return matchesQuery(m, lang, q)
    })
  }, [active, query, lang])

  // Global search count (ignores the active category, used for the hero feedback)
  const searchCount = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return 0
    return MISSIONS.filter((m) => matchesQuery(m, lang, q)).length
  }, [query, lang])

  const goToResults = () => {
    setActive('all')
    document.getElementById('missions-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const matchText =
    lang === 'fr'
      ? `${searchCount} Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'correspondent' : 'correspond'}`
      : `${searchCount} Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'match' : 'matches'}`

  return (
    <main className="bg-[#F3EFE6]">
      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{t.lead}</p>

          {/* Credibility chips */}
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E665A]">
            <span className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1.5">
              {MISSIONS.length} {t.missionsWord}
            </span>
            <span className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1.5">
              {MISSION_CATEGORIES.length} {t.rolesWord}
            </span>
          </div>

          {/* Functional search */}
          <div className="mt-7 max-w-2xl">
            <div className="flex items-center gap-2.5 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-4 py-1 focus-within:border-[#D10E63]/40">
              <Search className="h-4 w-4 shrink-0 text-[#8A8175]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229 && searchCount > 0) goToResults()
                }}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent py-3 text-sm text-[#1C1A17] placeholder:text-[#8A8175] focus:outline-none"
                aria-label={t.searchPlaceholder}
              />
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-[#8A8175] transition-colors hover:text-[#1C1A17]"
                >
                  {t.clearSearch}
                </button>
              )}
            </div>

            {/* Live feedback */}
            {query.trim() ? (
              searchCount > 0 ? (
                <button
                  type="button"
                  onClick={goToResults}
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                >
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D10E63] px-2 text-xs font-bold text-[#FBF9F3]">
                    {searchCount}
                  </span>
                  <span>{matchText.replace(/^\d+\s/, '')}</span>
                  <span className="text-[#8A8175]">·</span>
                  <span className="inline-flex items-center gap-1 text-[#D10E63]">
                    {t.seeResults}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              ) : (
                <p className="mt-3 text-sm text-[#8A8175]">{t.noResult}</p>
              )
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#8A8175]">{t.searchExamplesLabel} :</span>
                {t.searchExamples.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setQuery(ex)}
                    className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1 text-xs font-medium text-[#4E483F] transition-colors hover:border-[#D10E63]/40 hover:text-[#D10E63]"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="border-b border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.conceptKicker}</p>
          <h2 className="mt-3 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.conceptTitle}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.conceptSteps.map((s, i) => {
              const Icon = s.icon
              return (
                <li key={s.title} className="relative rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8A8175]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-sf text-base font-bold tracking-[-0.01em] text-[#1C1A17]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5F594F]">{s.body}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-[#E4DDCE] bg-[#FBF9F3] px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.benefitsKicker}</p>
          <h2 className="mt-3 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.benefitsTitle}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.benefits.map((b) => {
              const Icon = b.icon
              return (
                <li key={b.title} className="rounded-3xl border border-[#E4DDCE] bg-[#F3EFE6] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D10E63]/10 text-[#D10E63]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-sf text-base font-bold tracking-[-0.01em] text-[#1C1A17]">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5F594F]">{b.body}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Catalogue */}
      <section id="missions-grid" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.catalogueKicker}</p>
              <h2 className="mt-3 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.catalogueTitle}</h2>
            </div>
            <p className="font-mono text-xs font-semibold text-[#8A8175]">
              {visible.length} {t.missionsWord}
            </p>
          </div>

          {/* Filters (sticky) */}
          <div className="sticky top-[68px] z-10 -mx-5 mt-6 border-y border-[#E4DDCE]/70 bg-[#F3EFE6]/90 px-5 py-3 backdrop-blur sm:top-[76px]">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.catalogueTitle}>
              {filters.map((f) => {
                const isActive = f.key === active
                return (
                  <button
                    key={f.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(f.key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'border-[#1C1A17] bg-[#1C1A17] text-[#F3EFE6]'
                        : 'border-[#E4DDCE] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40 hover:text-[#D10E63]'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <p className="mt-10 max-w-md text-pretty text-sm leading-relaxed text-[#5F594F]">{t.noResult}</p>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((m) => {
                const collab = ROLE_DETAILS[m.collaboratorSlug]
                return (
                  <Link
                    key={m.slug}
                    href={`/missions/${m.slug}`}
                    className="group flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-300 hover:border-[#D10E63]/30 hover:shadow-[0_20px_50px_rgba(28,26,23,0.07)]"
                  >
                    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-[#EDE7DA] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">
                      {categoryLabel(m.category)}
                    </span>
                    <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{m.title[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{m.description[lang]}</p>

                    <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.resultWord}</p>
                      <p className="mt-2 flex items-start gap-1.5 text-sm leading-relaxed text-[#1C1A17]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                        <span>{m.result[lang]}</span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.toolsWord}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.tools.slice(0, 3).map((tool) => (
                          <span key={tool} className="rounded-full bg-[#EDE7DA] px-2.5 py-1 text-xs font-medium text-[#4E483F]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6">
                      <div className="flex items-center gap-2">
                        {collab && (
                          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                            <Image src={collab.avatar || '/placeholder.svg'} alt={collab.name} fill className="object-cover" sizes="28px" />
                          </span>
                        )}
                        <span className="text-[13px] font-semibold text-[#D10E63]">{m.profile[lang]}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#8A8175] transition-all group-hover:translate-x-0.5 group-hover:text-[#D10E63]" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Proof */}
      <section className="bg-[#1C1A17] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F08FB5]">{t.proofKicker}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#FBF9F3] sm:text-3xl">{t.proofTitle}</h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-[#B8B2A8] md:text-base">{t.proofLead}</p>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
            {/* Brief */}
            <div className="rounded-3xl border border-[#33302B] bg-[#242019] p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.proofBrief}</p>
              <div className="mt-4 flex items-start gap-3">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src="/images/claire-avatar.png" alt="Claire" fill className="object-cover" sizes="36px" />
                </span>
                <p className="text-pretty text-sm leading-relaxed text-[#E7E2D8]">{t.proofBriefText}</p>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-3xl border border-[#33302B] bg-[#242019] p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.proofResult}</p>
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <Image src="/images/hugo-avatar.png" alt="Hugo" fill className="object-cover" sizes="36px" />
                </span>
              </div>
              <p className="mt-4 flex items-start gap-2 text-pretty text-sm leading-relaxed text-[#E7E2D8]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4ADE80]" strokeWidth={2.5} />
                <span>{t.proofResultText}</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full border border-[#4A453D] px-4 py-2 text-sm font-semibold text-[#E7E2D8]">
                  {t.proofReview}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3]">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t.proofValidate}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F3EFE6] underline-offset-4 transition-colors hover:text-[#F08FB5] hover:underline"
            >
              {t.proofCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="rounded-[2rem] border border-[#E4DDCE] bg-[#FBF9F3] p-8 text-center sm:p-14">
            <h2 className="mx-auto max-w-2xl text-balance font-sf text-3xl font-bold tracking-[-0.03em] text-[#1C1A17] sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-[#5F594F]">{t.ctaLead}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={CREATE_ORG_HREF}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
              >
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#DcD4C4] bg-[#F3EFE6] px-6 py-3 text-sm font-bold text-[#1C1A17] transition-colors hover:bg-[#EAE3D4]"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

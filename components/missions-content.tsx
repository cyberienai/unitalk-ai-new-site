'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search } from 'lucide-react'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS, MISSION_CATEGORIES } from '@/lib/missions-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'

const CREATE_ORG_HREF = '/decouvrir'

/** Avatar with a robust initials fallback (images are heavy and can fail to load). */
function Avatar({
  src,
  name,
  size = 28,
  tone = 'light',
}: {
  src?: string
  name: string
  size?: number
  tone?: 'light' | 'dark'
}) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const toneClass = tone === 'dark' ? 'bg-[#33302B] text-[#C9C2B6]' : 'bg-[#EDE7DA] text-[#6E665A]'
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${toneClass}`}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src || '/placeholder.svg'}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-sf font-bold" style={{ fontSize: Math.max(10, Math.round(size * 0.38)) }}>
          {initials}
        </span>
      )}
    </span>
  )
}

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
  catalogueKicker: string
  catalogueTitle: string
  allLabel: string
  resultWord: string
  collaboratorWord: string
  profileWord: string
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
  flowKicker: string
  flowTitle: string
  flow: string[]
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
    catalogueKicker: 'Le catalogue',
    catalogueTitle: 'Des Missions pour chaque métier.',
    allLabel: 'Toutes',
    resultWord: 'Résultat',
    collaboratorWord: 'Collaborateur IA',
    profileWord: 'Profil',
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
    flowKicker: 'Comment ça marche',
    flowTitle: 'D’un objectif à un résultat validé, en cinq temps.',
    flow: ['Vous décrivez un objectif', 'Le bon Profil est mobilisé', 'Le Collaborateur travaille', 'Vous examinez et validez', 'Vous obtenez le résultat'],
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
    catalogueKicker: 'The catalog',
    catalogueTitle: 'Missions for every role.',
    allLabel: 'All',
    resultWord: 'Outcome',
    collaboratorWord: 'AI Collaborator',
    profileWord: 'Profile',
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
    flowKicker: 'How it works',
    flowTitle: 'From a goal to an approved result, in five steps.',
    flow: ['You describe a goal', 'The right Profile is mobilized', 'The Collaborator works', 'You review and approve', 'You get the result'],
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
      ? `Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'correspondent' : 'correspond'}`
      : `Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'match' : 'matches'}`

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
                  <span>{matchText}</span>
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

      {/* Catalogue (product first) */}
      <section id="missions-grid" className="scroll-mt-24 border-b border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
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

                    {/* Clarified: who does it (AI Collaborator) + which Profile */}
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={collab?.avatar} name={collab?.name ?? m.profile[lang]} size={32} />
                        <span className="leading-tight">
                          <span className="block font-sf text-sm font-bold text-[#1C1A17]">{collab?.name ?? m.profile[lang]}</span>
                          <span className="block text-xs text-[#8A8175]">
                            {t.profileWord} · {m.profile[lang]}
                          </span>
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#8A8175] transition-all group-hover:translate-x-0.5 group-hover:text-[#D10E63]" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Proof — a Mission in action */}
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
                <Avatar src="/images/claire-avatar.png" name="Claire Dubois" size={36} tone="dark" />
                <p className="text-pretty text-sm leading-relaxed text-[#E7E2D8]">{t.proofBriefText}</p>
              </div>
            </div>

            {/* Result */}
            <div className="rounded-3xl border border-[#33302B] bg-[#242019] p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.proofResult}</p>
                <div className="flex items-center gap-2">
                  <Avatar src="/images/hugo-avatar.png" name="Hugo" size={28} tone="dark" />
                  <span className="leading-tight">
                    <span className="block font-sf text-xs font-bold text-[#FBF9F3]">Hugo</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#8A8175]">{t.collaboratorWord}</span>
                  </span>
                </div>
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

      {/* How it works — condensed flow */}
      <section className="border-b border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.flowKicker}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.flowTitle}</h2>
          <ol className="mt-8 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-2">
            {t.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2 lg:gap-2">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-4 py-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63] font-mono text-[10px] font-bold text-[#FBF9F3]">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#1C1A17]">{step}</span>
                </span>
                {i < t.flow.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#B7AF9F] lg:block" />}
              </li>
            ))}
          </ol>
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

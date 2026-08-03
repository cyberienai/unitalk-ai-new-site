'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search, Clock, ShieldCheck } from 'lucide-react'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
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
  heroCta: string
  searchExamplesLabel: string
  searchExamples: string[]
  reassurance: string[]
  seeResults: string
  missionsWord: string
  noResult: string
  clearSearch: string
  // hero widget
  widgetMission: string
  widgetCollab: string
  widgetProfileLabel: string
  widgetProfile: string
  widgetProgressLabel: string
  widgetProgress: string[]
  widgetStatus: string
  widgetReview: string
  widgetValidate: string
  // catalogue
  catalogueKicker: string
  catalogueTitle: string
  catalogueLead: string
  allLabel: string
  deliverableWord: string
  deliveryWord: string
  profileWord: string
  collaboratorWord: string
  // proof
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
  // flow
  flowKicker: string
  flowTitle: string
  flow: string[]
  // strategic line + cta
  keepLine: string
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Missions pour Collaborateurs IA',
    title: 'Que voulez-vous faire accomplir ?',
    lead: 'Prospection, support client, contenu, réunions, automatisation ou développement : choisissez un résultat concret. Unitalk mobilise le Collaborateur IA, ses savoir-faire et ses outils pour vous livrer un travail prêt à valider.',
    searchPlaceholder: 'Décrivez le résultat que vous attendez',
    heroCta: 'Trouver une Mission',
    searchExamplesLabel: 'Raccourcis',
    searchExamples: ['Trouver des clients', 'Répondre aux clients', 'Préparer une réunion', 'Créer du contenu', 'Automatiser un processus'],
    reassurance: [
      'Résultat défini avant de commencer',
      'Validation avant toute action sensible',
      'Livrable conservé dans votre Workspace',
    ],
    seeResults: 'Voir les résultats',
    missionsWord: 'Missions',
    noResult: 'Aucune Mission ne correspond à votre recherche. Essayez un autre mot ou explorez toutes les Missions.',
    clearSearch: 'Effacer',
    widgetMission: 'Trouver de nouveaux clients',
    widgetCollab: 'Collaborateur IA',
    widgetProfileLabel: 'Profil mobilisé',
    widgetProfile: 'Commercial',
    widgetProgressLabel: 'Progression',
    widgetProgress: ['Cible confirmée', '36 entreprises analysées', '12 entreprises retenues', 'Messages prêts à valider'],
    widgetStatus: 'À valider',
    widgetReview: 'Examiner',
    widgetValidate: 'Valider',
    catalogueKicker: 'Explorez les Missions',
    catalogueTitle: 'Des résultats concrets pour chaque métier.',
    catalogueLead: 'Chaque Mission précise le résultat attendu, le Profil mobilisé et les validations nécessaires.',
    allLabel: 'Toutes',
    deliverableWord: 'Livrable',
    deliveryWord: 'Délai estimé',
    profileWord: 'Profil',
    collaboratorWord: 'Collaborateur IA',
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
    keepLine: 'Commencez par une Mission. Gardez le Collaborateur IA.',
    ctaTitle: 'Confiez-lui sa première Mission.',
    ctaLead: 'Le travail est livré, et le savoir-faire reste dans votre organisation. Créez votre organisation et lancez une première Mission. Essai gratuit de 7 jours.',
    ctaPrimary: 'Créer mon organisation',
    ctaSecondary: 'Voir les tarifs',
  },
  en: {
    kicker: 'Missions for AI Collaborators',
    title: 'What do you want to accomplish?',
    lead: 'Prospecting, customer support, content, meetings, automation or development: choose a concrete outcome. Unitalk mobilizes the AI Collaborator, its know-how and its tools to hand you work ready to approve.',
    searchPlaceholder: 'Describe the outcome you expect',
    heroCta: 'Find a Mission',
    searchExamplesLabel: 'Shortcuts',
    searchExamples: ['Find clients', 'Answer customers', 'Prepare a meeting', 'Create content', 'Automate a process'],
    reassurance: [
      'Outcome defined before starting',
      'Approval before any sensitive action',
      'Deliverable kept in your Workspace',
    ],
    seeResults: 'See results',
    missionsWord: 'Missions',
    noResult: 'No Mission matches your search. Try another word or explore all Missions.',
    clearSearch: 'Clear',
    widgetMission: 'Find new clients',
    widgetCollab: 'AI Collaborator',
    widgetProfileLabel: 'Profile mobilized',
    widgetProfile: 'Sales Rep',
    widgetProgressLabel: 'Progress',
    widgetProgress: ['Target confirmed', '36 companies analyzed', '12 companies shortlisted', 'Messages ready to approve'],
    widgetStatus: 'To approve',
    widgetReview: 'Review',
    widgetValidate: 'Approve',
    catalogueKicker: 'Explore the Missions',
    catalogueTitle: 'Concrete outcomes for every role.',
    catalogueLead: 'Each Mission spells out the expected outcome, the Profile mobilized and the approvals required.',
    allLabel: 'All',
    deliverableWord: 'Deliverable',
    deliveryWord: 'Estimated delivery',
    profileWord: 'Profile',
    collaboratorWord: 'AI Collaborator',
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
    keepLine: 'Start with a Mission. Keep the AI Collaborator.',
    ctaTitle: 'Hand it its first Mission.',
    ctaLead: 'The work is delivered, and the know-how stays inside your organization. Create your organization and launch a first Mission. 7-day free trial.',
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

  const hugo = ROLE_DETAILS['hugo']

  return (
    <main className="bg-[#F3EFE6]">
      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <div className="editorial-shell">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            {/* Left: intent + search */}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.kicker}</p>
              <h1 className="mt-4 max-w-2xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F594F]">{t.lead}</p>

              {/* Functional search + primary action */}
              <div className="mt-7 max-w-xl">
                <div className="flex items-center gap-2 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] py-1 pl-4 pr-1 focus-within:border-[#D10E63]/40">
                  <Search className="h-4 w-4 shrink-0 text-[#8A8175]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) goToResults()
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent py-2.5 text-sm text-[#1C1A17] placeholder:text-[#8A8175] focus:outline-none"
                    aria-label={t.searchPlaceholder}
                  />
                  <button
                    type="button"
                    onClick={goToResults}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                  >
                    <span className="hidden sm:inline">{t.heroCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Live feedback / shortcuts */}
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

                {/* Reassurance */}
                <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                  {t.reassurance.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-[#4E483F]">
                      <Check className="h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: a real Mission widget */}
            <div
              role="img"
              aria-label={`${t.widgetMission} — ${t.widgetCollab} Hugo, ${t.widgetProfileLabel} ${t.widgetProfile}, ${t.widgetStatus}`}
              className="mission-rise rounded-[1.75rem] border border-[#E4DDCE] bg-[#FBF9F3] p-6 shadow-[0_30px_70px_rgba(28,26,23,0.10)]"
            >
              {/* Widget header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">Mission</p>
                  <p className="mt-1 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.widgetMission}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                  {t.widgetStatus}
                </span>
              </div>

              {/* Collaborator + profile */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F3EFE6] p-3">
                <Avatar src={hugo?.avatar} name={hugo?.name ?? 'Hugo'} size={40} />
                <div className="leading-tight">
                  <span className="block font-sf text-sm font-bold text-[#1C1A17]">
                    {hugo?.name ?? 'Hugo'} · <span className="font-medium text-[#6E665A]">{t.widgetCollab}</span>
                  </span>
                  <span className="block text-xs text-[#8A8175]">
                    {t.widgetProfileLabel} : <span className="font-semibold text-[#4E483F]">{t.widgetProfile}</span>
                  </span>
                </div>
              </div>

              {/* Progress */}
              <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.widgetProgressLabel}</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.widgetProgress.map((step, i) => {
                  const done = i < t.widgetProgress.length - 1
                  return (
                    <li
                      key={step}
                      className="mission-rise flex items-center gap-2.5 text-sm"
                      style={{ animationDelay: `${0.15 + i * 0.12}s` }}
                    >
                      {done ? (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22A06B]/12 text-[#22A06B]">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#D10E63]/50">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                        </span>
                      )}
                      <span className={done ? 'text-[#4E483F]' : 'font-semibold text-[#1C1A17]'}>{step}</span>
                    </li>
                  )
                })}
              </ul>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <span className="inline-flex flex-1 items-center justify-center rounded-full border border-[#DcD4C4] bg-[#F3EFE6] px-4 py-2.5 text-sm font-semibold text-[#1C1A17]">
                  {t.widgetReview}
                </span>
                <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-4 py-2.5 text-sm font-bold text-[#FBF9F3]">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t.widgetValidate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue (product first) */}
      <section id="missions-grid" className="scroll-mt-24 border-b border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">{t.catalogueKicker}</p>
              <h2 className="mt-3 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-3xl">{t.catalogueTitle}</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[#5F594F]">{t.catalogueLead}</p>
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
                const deliverableShort = m.produces.map((p) => p[lang]).join(' · ')
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

                    {/* Prestation summary */}
                    <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.deliverableWord}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#1C1A17]">{deliverableShort}</p>
                      <div className="mt-3 flex items-center gap-1.5 border-t border-[#E4DDCE] pt-3 text-xs text-[#5F594F]">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#8A8175]" />
                        <span className="font-semibold text-[#4E483F]">{t.deliveryWord} :</span>
                        <span>{m.deliveryTime[lang]}</span>
                      </div>
                    </div>

                    {/* Carried out by: AI Collaborator + Profile */}
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

                    {/* Validation note */}
                    <p className="mt-4 flex items-start gap-1.5 border-t border-[#EFE9DC] pt-4 text-xs leading-relaxed text-[#8A8175]">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A8175]" />
                      <span>{m.validation[lang]}</span>
                    </p>
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

          {/* Strategic line */}
          <p className="mt-10 max-w-2xl text-balance font-sf text-xl font-bold tracking-[-0.02em] text-[#FBF9F3] sm:text-2xl">
            {t.keepLine}
          </p>

          <div className="mt-6">
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

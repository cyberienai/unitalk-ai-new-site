'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Search, Clock, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { ROLE_DETAILS, collaboratorHref } from '@/lib/collaborators-catalog'
import {
  MISSIONS,
  MISSION_CATEGORIES,
  missionFacets,
  DELAY_TBD,
  STATUS_LABELS,
  SECTOR_LABELS,
  LANGUAGE_LABELS,
  ZONE_LABELS,
  FREQUENCY_LABELS,
  DELIVERABLE_TYPE_LABELS,
  type Mission,
  type MissionStatus,
} from '@/lib/missions-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'

const CREATE_ORG_HREF = '/decouvrir'
const PROFILES_HREF = '/collaborateurs-ia/roles'

/** A verified delay is one that has been measured (verifiedAt set). Otherwise show TBD. */
function missionDelay(m: Mission, lang: Lang): string {
  return m.verifiedAt && m.deliveryTime ? m.deliveryTime[lang] : DELAY_TBD[lang]
}

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
          alt=""
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

const STATUS_TONE: Record<MissionStatus, string> = {
  available: 'bg-[#22A06B]/12 text-[#1B8253]',
  'on-setup': 'bg-[#EDE7DA] text-[#6E665A]',
  'coming-soon': 'bg-[#E4DDCE] text-[#8A8175]',
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
  clearSearch: string
  exampleBadge: string
  // hero widget
  widgetCollab: string
  widgetProfileLabel: string
  widgetProfile: string
  widgetMission: string
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
  // filters
  moreFilters: string
  hideFilters: string
  resetFilters: string
  facetSector: string
  facetLanguage: string
  facetZone: string
  facetFrequency: string
  facetDeliverable: string
  facetStatus: string
  // empty state
  emptyTitle: string
  emptyLead: string
  emptyCta: string
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
  keepLine: string
  // band (replaces five-step flow)
  bandText: string
  bandLink: string
  // final cta
  ctaKicker: string
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
  ctaReassurance: string
}

const T: Record<Lang, Copy> = {
  fr: {
    kicker: 'Des résultats concrets pour votre entreprise',
    title: 'Confiez vos Missions à un Collaborateur IA.',
    lead: 'Prospection, support client, contenu, réunions, automatisation ou développement : choisissez la Mission dont votre entreprise a besoin et découvrez le Collaborateur IA capable de la mener à bien.',
    searchPlaceholder: 'Ex. Trouver 30 prospects qualifiés pour notre nouvelle offre',
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
    clearSearch: 'Effacer les filtres',
    exampleBadge: 'Exemple de Mission',
    widgetCollab: 'Collaborateur IA',
    widgetProfileLabel: 'Profil mobilisé',
    widgetProfile: 'Commercial',
    widgetMission: 'Trouver de nouveaux clients',
    widgetProgressLabel: 'Progression',
    widgetProgress: ['Cible confirmée', 'Entreprises analysées', 'Entreprises retenues', 'Messages prêts à valider'],
    widgetStatus: 'À valider',
    widgetReview: 'Examiner',
    widgetValidate: 'Valider',
    catalogueKicker: 'Explorez les Missions',
    catalogueTitle: 'Des résultats concrets pour chaque métier.',
    catalogueLead: 'Chaque Mission précise le livrable attendu, le Collaborateur IA responsable, le Profil mobilisé et les validations nécessaires.',
    allLabel: 'Toutes',
    deliverableWord: 'Livrable',
    deliveryWord: 'Délai',
    profileWord: 'Profil mobilisé',
    collaboratorWord: 'Collaborateur IA',
    moreFilters: 'Plus de filtres',
    hideFilters: 'Masquer les filtres',
    resetFilters: 'Réinitialiser',
    facetSector: 'Secteur',
    facetLanguage: 'Langue',
    facetZone: 'Zone',
    facetFrequency: 'Fréquence',
    facetDeliverable: 'Type de livrable',
    facetStatus: 'Statut',
    emptyTitle: 'Aucune Mission ne correspond exactement.',
    emptyLead: 'Décrivez votre besoin à notre conseillère IA. Elle préparera une première proposition.',
    emptyCta: 'Préparer ma Mission',
    proofKicker: 'Une Mission en action',
    proofTitle: 'Du besoin au livrable.',
    proofLead: 'Vous donnez le résultat attendu. Votre Collaborateur IA prépare le travail, utilise les outils autorisés et vous sollicite avant toute action sensible.',
    proofBrief: 'La demande',
    proofBriefText: 'Claire : « Hugo, prépare-moi 20 prospects qualifiés dans le secteur de la logistique, avec un message de contact pour chacun. »',
    proofResult: 'Le livrable',
    proofResultText: '20 prospects qualifiés, chacun avec son contact, son contexte et un message personnalisé prêt à envoyer.',
    proofReview: 'Examiner',
    proofValidate: 'Valider',
    proofCta: 'Voir le Workspace',
    keepLine: 'Commencez par une Mission. Gardez le Collaborateur IA.',
    bandText: 'Chaque Mission mobilise un Profil métier. Votre Collaborateur IA conserve son identité et développe de nouveaux savoir-faire à mesure que vos besoins évoluent.',
    bandLink: 'Explorer les Profils métier',
    ctaKicker: 'Votre première Mission',
    ctaTitle: 'Confiez-lui le résultat que vous attendez.',
    ctaLead: 'Notre conseillère IA analyse votre activité, prépare les savoir-faire nécessaires et configure le cadre de travail de votre Collaborateur IA.',
    ctaPrimary: 'Découvrir mon Collaborateur IA',
    ctaSecondary: 'Voir les tarifs',
    ctaReassurance: 'Analyse de votre activité · Workspace privé · Essai gratuit de 7 jours',
  },
  en: {
    kicker: 'Concrete outcomes for your company',
    title: 'Hand your Missions to an AI Collaborator.',
    lead: 'Prospecting, customer support, content, meetings, automation or development: choose the Mission your company needs and discover the AI Collaborator able to carry it out.',
    searchPlaceholder: 'e.g. Find 30 qualified prospects for our new offer',
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
    clearSearch: 'Clear filters',
    exampleBadge: 'Example Mission',
    widgetCollab: 'AI Collaborator',
    widgetProfileLabel: 'Profile mobilized',
    widgetProfile: 'Sales Rep',
    widgetMission: 'Find new clients',
    widgetProgressLabel: 'Progress',
    widgetProgress: ['Target confirmed', 'Companies analyzed', 'Companies shortlisted', 'Messages ready to approve'],
    widgetStatus: 'To approve',
    widgetReview: 'Review',
    widgetValidate: 'Approve',
    catalogueKicker: 'Explore the Missions',
    catalogueTitle: 'Concrete outcomes for every role.',
    catalogueLead: 'Each Mission spells out the expected deliverable, the AI Collaborator responsible, the Profile mobilized and the approvals required.',
    allLabel: 'All',
    deliverableWord: 'Deliverable',
    deliveryWord: 'Timeline',
    profileWord: 'Profile mobilized',
    collaboratorWord: 'AI Collaborator',
    moreFilters: 'More filters',
    hideFilters: 'Hide filters',
    resetFilters: 'Reset',
    facetSector: 'Sector',
    facetLanguage: 'Language',
    facetZone: 'Zone',
    facetFrequency: 'Frequency',
    facetDeliverable: 'Deliverable type',
    facetStatus: 'Status',
    emptyTitle: 'No Mission matches exactly.',
    emptyLead: 'Describe your need to our AI advisor. She will prepare a first proposal.',
    emptyCta: 'Prepare my Mission',
    proofKicker: 'A Mission in action',
    proofTitle: 'From need to deliverable.',
    proofLead: 'You give the expected outcome. Your AI Collaborator prepares the work, uses the authorized tools and asks you before any sensitive action.',
    proofBrief: 'The request',
    proofBriefText: 'Claire: "Hugo, prepare 20 qualified prospects in the logistics sector, with an outreach message for each."',
    proofResult: 'The deliverable',
    proofResultText: '20 qualified prospects, each with their contact, context and a personalized message ready to send.',
    proofReview: 'Review',
    proofValidate: 'Approve',
    proofCta: 'See the Workspace',
    keepLine: 'Start with a Mission. Keep the AI Collaborator.',
    bandText: 'Every Mission mobilizes a job Profile. Your AI Collaborator keeps its identity and builds new know-how as your needs evolve.',
    bandLink: 'Explore the job Profiles',
    ctaKicker: 'Your first Mission',
    ctaTitle: 'Hand it the result you expect.',
    ctaLead: 'Our AI advisor analyzes your business, prepares the necessary know-how and sets up the working framework of your AI Collaborator.',
    ctaPrimary: 'Discover my AI Collaborator',
    ctaSecondary: 'See pricing',
    ctaReassurance: 'Business analysis · Private Workspace · 7-day free trial',
  },
}

function matchesQuery(m: Mission, lang: Lang, q: string) {
  const haystack = `${m.title[lang]} ${m.description[lang]} ${m.profile[lang]} ${m.skills.map((s) => s[lang]).join(' ')}`.toLowerCase()
  return haystack.includes(q)
}

// Collect the facet values actually present in the data, so we never show an empty option.
function collectFacetValues() {
  const sectors = new Set<string>()
  const languages = new Set<string>()
  const zones = new Set<string>()
  const frequencies = new Set<string>()
  const deliverableTypes = new Set<string>()
  const statuses = new Set<MissionStatus>()
  for (const m of MISSIONS) {
    const f = missionFacets(m)
    f.sectors.forEach((s) => sectors.add(s))
    f.languages.forEach((l) => languages.add(l))
    f.zones.forEach((z) => zones.add(z))
    frequencies.add(f.frequency)
    deliverableTypes.add(f.deliverableType)
    statuses.add(f.status)
  }
  return { sectors, languages, zones, frequencies, deliverableTypes, statuses }
}

type FacetState = {
  sector: string | null
  language: string | null
  zone: string | null
  frequency: string | null
  deliverableType: string | null
  status: MissionStatus | null
}

const EMPTY_FACETS: FacetState = {
  sector: null,
  language: null,
  zone: null,
  frequency: null,
  deliverableType: null,
  status: null,
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const [active, setActive] = useState<string>('all')
  const [query, setQuery] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [facets, setFacets] = useState<FacetState>(EMPTY_FACETS)

  const available = useMemo(() => collectFacetValues(), [])

  // Only keep categories that actually contain at least one Mission.
  const filters = useMemo(() => {
    const nonEmpty = MISSION_CATEGORIES.filter((c) => MISSIONS.some((m) => m.category === c.key))
    return [{ key: 'all', label: t.allLabel }, ...nonEmpty.map((c) => ({ key: c.key, label: c.label[lang] }))]
  }, [t, lang])

  const categoryLabel = (key: string) => MISSION_CATEGORIES.find((c) => c.key === key)?.label[lang] ?? ''

  const activeFacetCount = Object.values(facets).filter(Boolean).length

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MISSIONS.filter((m) => {
      if (active !== 'all' && m.category !== active) return false
      if (q && !matchesQuery(m, lang, q)) return false
      const f = missionFacets(m)
      if (facets.sector && !f.sectors.includes(facets.sector)) return false
      if (facets.language && !f.languages.includes(facets.language)) return false
      if (facets.zone && !f.zones.includes(facets.zone)) return false
      if (facets.frequency && f.frequency !== facets.frequency) return false
      if (facets.deliverableType && f.deliverableType !== facets.deliverableType) return false
      if (facets.status && f.status !== facets.status) return false
      return true
    })
  }, [active, query, lang, facets])

  const searchCount = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return 0
    return MISSIONS.filter((m) => matchesQuery(m, lang, q)).length
  }, [query, lang])

  const goToResults = () => {
    setActive('all')
    document.getElementById('missions-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const resetAll = () => {
    setQuery('')
    setActive('all')
    setFacets(EMPTY_FACETS)
  }

  const matchText =
    lang === 'fr'
      ? `Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'correspondent' : 'correspond'}`
      : `Mission${searchCount > 1 ? 's' : ''} ${searchCount > 1 ? 'match' : 'matches'}`

  const hugo = ROLE_DETAILS['hugo']

  const FacetGroup = ({
    label,
    values,
    labels,
    selected,
    onSelect,
  }: {
    label: string
    values: string[]
    labels: Record<string, { fr: string; en: string }>
    selected: string | null
    onSelect: (v: string | null) => void
  }) => {
    if (values.length === 0) return null
    return (
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{label}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((v) => {
            const isOn = selected === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => onSelect(isOn ? null : v)}
                aria-pressed={isOn}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  isOn
                    ? 'border-[#D10E63] bg-[#D10E63]/10 text-[#D10E63]'
                    : 'border-[#E4DDCE] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40 hover:text-[#D10E63]'
                }`}
              >
                {labels[v]?.[lang] ?? v}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

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
                    <p className="mt-3 text-sm text-[#8A8175]">{t.emptyTitle}</p>
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

                {/* Reassurance — magenta marks, aligned with Unitalk brand */}
                <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                  {t.reassurance.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-[#4E483F]">
                      <Check className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2.5} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: an example Mission widget (illustrative, not a client result) */}
            <div
              role="img"
              aria-label={`${t.exampleBadge} : ${t.widgetMission} — ${t.widgetCollab} Hugo, ${t.widgetProfileLabel} ${t.widgetProfile}, ${t.widgetStatus}`}
              className="mission-rise rounded-[1.75rem] border border-[#E4DDCE] bg-[#FBF9F3] p-6 shadow-[0_30px_70px_rgba(28,26,23,0.10)]"
            >
              {/* Example badge — makes clear this is an illustration */}
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#EDE7DA] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">
                {t.exampleBadge}
              </span>

              {/* Widget header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">Mission</p>
                  <p className="mt-1 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.widgetMission}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 self-center rounded-full bg-[#D10E63]/10 px-3 py-1 text-xs font-bold text-[#D10E63]">
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

              {/* Actions — demonstrative only */}
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
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label={t.catalogueTitle}>
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

              {/* More filters toggle */}
              <button
                type="button"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  showFilters || activeFacetCount > 0
                    ? 'border-[#D10E63] bg-[#D10E63]/10 text-[#D10E63]'
                    : 'border-[#E4DDCE] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40 hover:text-[#D10E63]'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? t.hideFilters : t.moreFilters}
                {activeFacetCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D10E63] px-1.5 text-[10px] font-bold text-[#FBF9F3]">
                    {activeFacetCount}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced filters panel — only facets present in the data are shown */}
            {showFilters && (
              <div className="mt-3 grid gap-4 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4 sm:grid-cols-2 lg:grid-cols-3">
                <FacetGroup
                  label={t.facetSector}
                  values={[...available.sectors]}
                  labels={SECTOR_LABELS}
                  selected={facets.sector}
                  onSelect={(v) => setFacets((f) => ({ ...f, sector: v }))}
                />
                <FacetGroup
                  label={t.facetLanguage}
                  values={[...available.languages]}
                  labels={LANGUAGE_LABELS}
                  selected={facets.language}
                  onSelect={(v) => setFacets((f) => ({ ...f, language: v }))}
                />
                <FacetGroup
                  label={t.facetZone}
                  values={[...available.zones]}
                  labels={ZONE_LABELS}
                  selected={facets.zone}
                  onSelect={(v) => setFacets((f) => ({ ...f, zone: v }))}
                />
                <FacetGroup
                  label={t.facetFrequency}
                  values={[...available.frequencies]}
                  labels={FREQUENCY_LABELS}
                  selected={facets.frequency}
                  onSelect={(v) => setFacets((f) => ({ ...f, frequency: v }))}
                />
                <FacetGroup
                  label={t.facetDeliverable}
                  values={[...available.deliverableTypes]}
                  labels={DELIVERABLE_TYPE_LABELS}
                  selected={facets.deliverableType}
                  onSelect={(v) => setFacets((f) => ({ ...f, deliverableType: v }))}
                />
                <FacetGroup
                  label={t.facetStatus}
                  values={[...available.statuses]}
                  labels={STATUS_LABELS}
                  selected={facets.status}
                  onSelect={(v) => setFacets((f) => ({ ...f, status: v as MissionStatus | null }))}
                />
                {activeFacetCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setFacets(EMPTY_FACETS)}
                    className="inline-flex w-fit items-center gap-1.5 self-end text-xs font-semibold text-[#8A8175] transition-colors hover:text-[#D10E63]"
                  >
                    <X className="h-3.5 w-3.5" />
                    {t.resetFilters}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="mt-10 max-w-lg rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-8">
              <h3 className="text-balance font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.emptyTitle}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[#5F594F]">{t.emptyLead}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`${CREATE_ORG_HREF}${query.trim() ? `?besoin=${encodeURIComponent(query.trim())}` : ''}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                >
                  {t.emptyCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DcD4C4] bg-[#F3EFE6] px-5 py-2.5 text-sm font-semibold text-[#1C1A17] transition-colors hover:bg-[#EAE3D4]"
                >
                  {t.clearSearch}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((m) => {
                const collab = ROLE_DETAILS[m.collaboratorSlug]
                const collabName = collab?.name ?? m.profile[lang]
                const deliverableShort = m.produces.map((p) => p[lang]).join(' · ')
                const f = missionFacets(m)
                const statusLabel = STATUS_LABELS[f.status][lang]
                return (
                  // Card is a flex column so the collaborator/profile block sits at the bottom.
                  <article
                    key={m.slug}
                    className="group relative flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-300 hover:border-[#D10E63]/30 hover:shadow-[0_20px_50px_rgba(28,26,23,0.07)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex w-fit items-center rounded-full bg-[#EDE7DA] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">
                        {categoryLabel(m.category)}
                      </span>
                      <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_TONE[f.status]}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Whole-card link to the Mission (covers title + description + deliverable) */}
                    <Link href={`/missions/${m.slug}`} className="mt-3 flex flex-col outline-none">
                      <span className="absolute inset-0 rounded-3xl" aria-hidden="true" />
                      <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17] group-hover:text-[#D10E63]">
                        {m.title[lang]}
                      </h3>
                      <span className="mt-2 block text-sm leading-relaxed text-[#5F594F]">{m.description[lang]}</span>
                    </Link>

                    {/* Prestation summary */}
                    <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">{t.deliverableWord}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#1C1A17]">{deliverableShort}</p>
                      <div className="mt-3 flex items-center gap-1.5 border-t border-[#E4DDCE] pt-3 text-xs text-[#5F594F]">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-[#8A8175]" />
                        <span className="font-semibold text-[#4E483F]">{t.deliveryWord}</span>
                        <span aria-hidden="true">·</span>
                        <span>{missionDelay(m, lang)}</span>
                      </div>
                    </div>

                    {/* Carried out by: AI Collaborator + Profile — distinct links, pushed to the bottom */}
                    <div className="relative z-10 mt-auto flex items-center gap-2.5 pt-6">
                      <Link
                        href={collaboratorHref(m.collaboratorSlug)}
                        className="flex items-center gap-2.5 rounded-lg outline-none hover:text-[#D10E63] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                      >
                        <Avatar src={collab?.avatar} name={collabName} size={32} />
                        <span className="font-sf text-sm font-bold text-[#1C1A17] group-hover:text-inherit">
                          {collabName} · <span className="font-medium text-[#6E665A]">{t.collaboratorWord}</span>
                        </span>
                      </Link>
                    </div>
                    <div className="relative z-10 mt-1 text-xs text-[#8A8175]">
                      {t.profileWord} :{' '}
                      <Link
                        href={`/collaborateurs-ia/roles/${m.collaboratorSlug}`}
                        className="inline-flex items-center gap-0.5 font-semibold text-[#4E483F] underline-offset-2 hover:text-[#D10E63] hover:underline"
                      >
                        {m.profile[lang]}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Validation note */}
                    <p className="relative z-10 mt-4 flex items-start gap-1.5 border-t border-[#EFE9DC] pt-4 text-xs leading-relaxed text-[#8A8175]">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A8175]" />
                      <span>{m.validation[lang]}</span>
                    </p>
                  </article>
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
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#B8B2A8] md:text-base">{t.proofLead}</p>

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
              {/* Demonstrative controls only — no real sensitive action on the public page */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex cursor-default items-center rounded-full border border-[#4A453D] px-4 py-2 text-sm font-semibold text-[#E7E2D8] transition-colors hover:border-[#6B6459] hover:text-[#FBF9F3]">
                  {t.proofReview}
                </span>
                <span className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-[#D10E63] px-4 py-2 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B80C56]">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t.proofValidate}
                </span>
              </div>
            </div>
          </div>

          {/* Strategic line — emphasized */}
          <p className="mt-12 max-w-3xl text-balance font-sf text-2xl font-bold leading-tight tracking-[-0.02em] text-[#FBF9F3] sm:text-3xl">
            {t.keepLine}
          </p>

          {/* Extra space below "See the Workspace" */}
          <div className="mt-6 pb-2">
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

      {/* Profiles band — replaces the five-step flow (max height ~220px) */}
      <section className="border-b border-[#E4DDCE] px-5 py-10 sm:px-8">
        <div className="editorial-shell">
          <div className="flex flex-col gap-4 rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <p className="max-w-3xl text-pretty font-sf text-base font-semibold leading-relaxed text-[#1C1A17] sm:text-lg">
              {t.bandText}
            </p>
            <Link
              href={PROFILES_HREF}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#DcD4C4] bg-[#F3EFE6] px-5 py-2.5 text-sm font-bold text-[#1C1A17] transition-colors hover:border-[#D10E63]/40 hover:text-[#D10E63]"
            >
              {t.bandLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA — magenta block */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="rounded-[2rem] bg-[#D10E63] p-8 text-center sm:p-14">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FBD3E4]">{t.ctaKicker}</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-balance font-sf text-3xl font-bold tracking-[-0.03em] text-[#FBF9F3] sm:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-[#FBE1EC]">{t.ctaLead}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={CREATE_ORG_HREF}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FBF9F3] px-6 py-3 text-sm font-bold text-[#D10E63] transition-transform hover:-translate-y-0.5"
              >
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#F5A9C8] px-6 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B80C56]"
              >
                {t.ctaSecondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-xs font-medium text-[#FBE1EC]">{t.ctaReassurance}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

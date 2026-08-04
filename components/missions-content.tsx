'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, Search, Sparkles, Clock } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage, type Lang } from '@/lib/language-context'
import type { Bilingual } from '@/lib/collaborators-catalog'

const CREATE_ORG_HREF = '/decouvrir'

/* -------------------------------------------------------------------------- */
/*  Editorial domains (collections) — each maps to real catalog categories.   */
/*  These are the truthful, data-backed groupings used both for the           */
/*  collections rows and the "Domaine" filter.                                */
/* -------------------------------------------------------------------------- */
type DomainKey = 'sales' | 'support' | 'content' | 'operate' | 'automate' | 'build'

const DOMAINS: { key: DomainKey; label: Bilingual; cats: string[] }[] = [
  { key: 'sales', label: { fr: 'Développer vos ventes', en: 'Grow your sales' }, cats: ['ventes'] },
  { key: 'support', label: { fr: 'Soigner vos clients', en: 'Take care of customers' }, cats: ['support'] },
  { key: 'content', label: { fr: 'Produire vos contenus', en: 'Produce your content' }, cats: ['marketing'] },
  { key: 'operate', label: { fr: 'Piloter votre activité', en: 'Run your operations' }, cats: ['reunions', 'analyse', 'finance'] },
  { key: 'automate', label: { fr: 'Automatiser vos opérations', en: 'Automate your operations' }, cats: ['automatisation'] },
  { key: 'build', label: { fr: 'Développer vos produits', en: 'Build your products' }, cats: ['developpement'] },
]

function domainOf(category: string): DomainKey {
  return (DOMAINS.find((d) => d.cats.includes(category))?.key ?? 'operate') as DomainKey
}

/* -------------------------------------------------------------------------- */
/*  Result types — a short, honest tag derived per mission (no fake data).    */
/* -------------------------------------------------------------------------- */
type ResultKey = 'prospection' | 'replies' | 'content' | 'recap' | 'reporting' | 'automation' | 'code'

const RESULT_TYPES: { key: ResultKey; label: Bilingual }[] = [
  { key: 'prospection', label: { fr: 'Prospection', en: 'Prospecting' } },
  { key: 'replies', label: { fr: 'Réponses clients', en: 'Customer replies' } },
  { key: 'content', label: { fr: 'Contenus', en: 'Content' } },
  { key: 'recap', label: { fr: 'Comptes rendus', en: 'Recaps' } },
  { key: 'reporting', label: { fr: 'Reporting', en: 'Reporting' } },
  { key: 'automation', label: { fr: 'Automatisations', en: 'Automations' } },
  { key: 'code', label: { fr: 'Code', en: 'Code' } },
]

const RESULT_OF: Record<string, ResultKey> = {
  'trouver-de-nouveaux-clients': 'prospection',
  'relancer-les-opportunites': 'prospection',
  'repondre-a-mes-clients': 'replies',
  'construire-ma-faq': 'replies',
  'creer-mes-contenus': 'content',
  'animer-mes-reseaux-sociaux': 'content',
  'ameliorer-mon-referencement': 'content',
  'preparer-et-suivre-mes-reunions': 'recap',
  'preparer-mon-reporting-financier': 'reporting',
  'automatiser-mes-operations': 'automation',
  'developper-une-fonctionnalite': 'code',
  'corriger-un-lot-de-bugs': 'code',
}

function resultLabel(slug: string, lang: Lang): string {
  const key = RESULT_OF[slug]
  return RESULT_TYPES.find((r) => r.key === key)?.label[lang] ?? ''
}

/* -------------------------------------------------------------------------- */
/*  Search — never returns zero. Scores missions against the objective query. */
/* -------------------------------------------------------------------------- */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function haystack(m: Mission, lang: Lang): string {
  return normalize(
    [
      m.title[lang],
      m.result[lang],
      m.objective[lang],
      m.description[lang],
      m.profile[lang],
      ...m.skills.map((s) => s[lang]),
      ...m.produces.map((s) => s[lang]),
      ...m.tools,
    ].join(' '),
  )
}

function scoreMission(m: Mission, tokens: string[], lang: Lang): number {
  if (tokens.length === 0) return 0
  const title = normalize(m.title[lang])
  const body = haystack(m, lang)
  let score = 0
  for (const tok of tokens) {
    if (!tok) continue
    if (title.includes(tok)) score += 3
    else if (body.includes(tok)) score += 1
  }
  return score
}

/* -------------------------------------------------------------------------- */

type Copy = {
  kicker: string
  title: string
  lead: string
  searchPlaceholder: string
  searchButton: string
  examplesLabel: string
  examples: string[]
  reassurance: string[]
  // results
  resultsRecommended: string
  resultsMore: string
  resultsFor: string
  noExact: string
  clear: string
  // custom mission
  customTitle: string
  customLead: string
  customCta: string
  // filters
  filtersDomain: string
  filtersResult: string
  filtersAll: string
  // card
  deliverableLabel: string
  chooseMission: string
  resultLabel: string
  // after-choice strip
  stepsKicker: string
  stepsTitle: string
  steps: { title: string; text: string }[]
  // final CTA
  ctaTitle: string
  ctaLead: string
  ctaButton: string
  ctaNote: string
}

const COPY: Record<Lang, Copy> = {
  fr: {
    kicker: 'Le store des missions',
    title: 'Quel résultat voulez-vous obtenir ?',
    lead: 'Décrivez votre objectif. On vous propose la mission qui y répond — et le livrable que vous recevrez.',
    searchPlaceholder: 'Ex. : trouver de nouveaux clients, répondre plus vite au support…',
    searchButton: 'Trouver ma mission',
    examplesLabel: 'Objectifs fréquents',
    examples: [
      'Trouver de nouveaux clients',
      'Répondre plus vite à mes clients',
      'Publier du contenu chaque semaine',
      'Préparer mon reporting mensuel',
      'Automatiser une tâche répétitive',
    ],
    reassurance: ['Un livrable clair à chaque mission', 'Rien n’est envoyé sans votre accord', 'Vous gardez la main à chaque étape'],
    resultsRecommended: 'Mission recommandée',
    resultsMore: 'Autres missions proches',
    resultsFor: 'Pour',
    noExact: 'Aucune mission ne correspond exactement — mais votre objectif peut devenir une mission sur mesure.',
    clear: 'Effacer',
    customTitle: 'Votre objectif ne figure pas dans la liste ?',
    customLead: 'Décrivez-le à Alma : elle prépare une mission sur mesure, avec le profil métier et les outils adaptés.',
    customCta: 'Créer une mission sur mesure',
    filtersDomain: 'Domaine',
    filtersResult: 'Type de résultat',
    filtersAll: 'Tous',
    deliverableLabel: 'Livrable',
    chooseMission: 'Choisir cette mission',
    resultLabel: 'Résultat',
    stepsKicker: 'Après votre choix',
    stepsTitle: 'Ce qui se passe une fois la mission choisie.',
    steps: [
      { title: 'Vous indiquez votre site', text: 'Alma analyse votre activité et prépare la mission à votre contexte.' },
      { title: 'Le Collaborateur IA se prépare', text: 'Il reçoit le profil métier, les compétences et les outils nécessaires.' },
      { title: 'Vous validez avant tout envoi', text: 'La mission avance dans votre espace de travail. Rien ne part sans votre accord.' },
    ],
    ctaTitle: 'Prêt à confier votre première mission ?',
    ctaLead: 'Choisissez une mission ci-dessus ou décrivez votre objectif. Alma s’occupe de la préparation.',
    ctaButton: 'Commencer',
    ctaNote: 'Essai gratuit 7 jours · Mise en place accompagnée',
  },
  en: {
    kicker: 'The mission store',
    title: 'What result do you want?',
    lead: 'Describe your goal. We suggest the mission that delivers it — and the output you’ll receive.',
    searchPlaceholder: 'e.g. find new clients, answer support faster…',
    searchButton: 'Find my mission',
    examplesLabel: 'Common goals',
    examples: [
      'Find new clients',
      'Answer my customers faster',
      'Publish content every week',
      'Prepare my monthly report',
      'Automate a repetitive task',
    ],
    reassurance: ['A clear output for every mission', 'Nothing is sent without your approval', 'You stay in control at every step'],
    resultsRecommended: 'Recommended mission',
    resultsMore: 'Other close missions',
    resultsFor: 'For',
    noExact: 'No mission matches exactly — but your goal can become a tailored mission.',
    clear: 'Clear',
    customTitle: 'Your goal isn’t in the list?',
    customLead: 'Describe it to Alma: she prepares a tailored mission, with the right business profile and tools.',
    customCta: 'Create a tailored mission',
    filtersDomain: 'Domain',
    filtersResult: 'Result type',
    filtersAll: 'All',
    deliverableLabel: 'Output',
    chooseMission: 'Choose this mission',
    resultLabel: 'Result',
    stepsKicker: 'After you choose',
    stepsTitle: 'What happens once the mission is chosen.',
    steps: [
      { title: 'You share your website', text: 'Alma analyzes your business and tailors the mission to your context.' },
      { title: 'The AI Collaborator gets ready', text: 'It receives the business profile, skills and tools it needs.' },
      { title: 'You approve before anything is sent', text: 'The mission moves forward in your workspace. Nothing goes out without your approval.' },
    ],
    ctaTitle: 'Ready to hand over your first mission?',
    ctaLead: 'Pick a mission above or describe your goal. Alma takes care of the setup.',
    ctaButton: 'Get started',
    ctaNote: '7-day free trial · Guided onboarding',
  },
}

/* -------------------------------------------------------------------------- */

function MissionCard({ mission, lang, t }: { mission: Mission; lang: Lang; t: Copy }) {
  return (
    <Link
      href={`/missions/${mission.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 transition-all hover:border-[#D10E63]/40 hover:shadow-[0_12px_40px_-24px_rgba(0,0,0,0.35)]"
    >
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
        {resultLabel(mission.slug, lang)}
      </span>
      <h3 className="mt-2 text-pretty font-sf text-lg font-bold leading-snug text-[#1C1A17]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{mission.result[lang]}</p>
      <div className="mt-4 rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] p-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A8175]">
          {t.deliverableLabel}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#3B362F]">{mission.deliverable[lang]}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
        {t.chooseMission}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

function CustomMissionCard({ query, lang, t }: { query: string; lang: Lang; t: Copy }) {
  const href = query.trim() ? `${CREATE_ORG_HREF}?objectif=${encodeURIComponent(query.trim())}` : CREATE_ORG_HREF
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-dashed border-[#D10E63]/40 bg-[#D10E63]/[0.04] p-5 transition-colors hover:bg-[#D10E63]/[0.08]"
    >
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">
          <Sparkles className="h-3 w-3" />
          {lang === 'fr' ? 'Sur mesure' : 'Tailored'}
        </span>
        <h3 className="mt-3 text-pretty font-sf text-lg font-bold leading-snug text-[#1C1A17]">
          {t.customTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{t.customLead}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]">
        {t.customCta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [domain, setDomain] = useState<DomainKey | 'all'>('all')
  const [resultType, setResultType] = useState<ResultKey | 'all'>('all')
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const activeQuery = submitted.trim()
  const isBrowsing = activeQuery === '' && domain === 'all' && resultType === 'all'

  const ranked = useMemo(() => {
    // Apply the honest, data-backed filters first.
    let base = MISSIONS.slice()
    if (domain !== 'all') {
      const cats = DOMAINS.find((d) => d.key === domain)?.cats ?? []
      base = base.filter((m) => cats.includes(m.category))
    }
    if (resultType !== 'all') {
      base = base.filter((m) => RESULT_OF[m.slug] === resultType)
    }
    // Then rank by the objective query, if any.
    const tokens = normalize(activeQuery).split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return base
    const scored = base
      .map((m) => ({ m, s: scoreMission(m, tokens, lang) }))
      .sort((a, b) => b.s - a.s)
    const matched = scored.filter((x) => x.s > 0).map((x) => x.m)
    // Never zero: if nothing matched, fall back to the current subset.
    return matched.length > 0 ? matched : base
  }, [activeQuery, domain, resultType, lang])

  const hasQuery = activeQuery !== ''
  const recommended = hasQuery && ranked.length > 0 ? ranked[0] : null
  const rest = recommended ? ranked.slice(1) : ranked

  const submit = () => {
    setSubmitted(query)
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const clearAll = () => {
    setQuery('')
    setSubmitted('')
    setDomain('all')
    setResultType('all')
  }

  return (
    <main className="bg-[#F7F4EC]">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden border-b border-[#E4DDCE] px-4 pb-14 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.kicker}
          </p>
          <h1 className="mt-4 text-balance font-sf text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F] sm:text-lg">
            {t.lead}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8175]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full rounded-xl border border-[#D8D0C2] bg-[#FBF9F3] py-3.5 pl-12 pr-4 text-sm text-[#1C1A17] outline-none transition-colors placeholder:text-[#9A9184] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B53]"
            >
              {t.searchButton}
            </button>
          </form>

          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
              {t.examplesLabel}
            </span>
            {t.examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setQuery(ex)
                  setSubmitted(ex)
                  setDomain('all')
                  setResultType('all')
                  requestAnimationFrame(() =>
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  )
                }}
                className="rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-3 py-1.5 text-xs font-medium text-[#4E483F] transition-colors hover:border-[#D10E63]/40 hover:text-[#D10E63]"
              >
                {ex}
              </button>
            ))}
          </div>

          <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {t.reassurance.map((r) => (
              <li key={r} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5F594F]">
                <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------- FILTER BAR ---------------------------- */}
      <div ref={resultsRef} className="scroll-mt-4 border-b border-[#E4DDCE] bg-[#FBF9F3]/70 px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
              {t.filtersDomain}
            </span>
            <button
              type="button"
              onClick={() => setDomain('all')}
              aria-pressed={domain === 'all'}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                domain === 'all' ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'border border-[#D8D0C2] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40'
              }`}
            >
              {t.filtersAll}
            </button>
            {DOMAINS.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDomain(d.key)}
                aria-pressed={domain === d.key}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  domain === d.key
                    ? 'bg-[#1C1A17] text-[#FBF9F3]'
                    : 'border border-[#D8D0C2] bg-[#FBF9F3] text-[#4E483F] hover:border-[#D10E63]/40'
                }`}
              >
                {d.label[lang]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="result-type" className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
              {t.filtersResult}
            </label>
            <select
              id="result-type"
              value={resultType}
              onChange={(e) => setResultType(e.target.value as ResultKey | 'all')}
              className="rounded-lg border border-[#D8D0C2] bg-[#FBF9F3] px-3 py-1.5 text-xs font-semibold text-[#4E483F] outline-none focus:border-[#D10E63]"
            >
              <option value="all">{t.filtersAll}</option>
              {RESULT_TYPES.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label[lang]}
                </option>
              ))}
            </select>
            {!isBrowsing && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#D10E63] underline-offset-2 hover:underline"
              >
                {t.clear}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------- RESULTS AREA --------------------------- */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {isBrowsing ? (
            /* Editorial collections — one row per domain. */
            <div className="flex flex-col gap-14">
              {DOMAINS.map((d) => {
                const items = MISSIONS.filter((m) => d.cats.includes(m.category))
                if (items.length === 0) return null
                return (
                  <div key={d.key}>
                    <div className="mb-5 flex items-baseline justify-between gap-4">
                      <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[#1C1A17] sm:text-2xl">
                        {d.label[lang]}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setDomain(d.key)}
                        className="shrink-0 text-xs font-bold text-[#D10E63] underline-offset-2 hover:underline"
                      >
                        {lang === 'fr' ? 'Tout voir' : 'See all'}
                      </button>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((m) => (
                        <MissionCard key={m.slug} mission={m} lang={lang} t={t} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Filtered / ranked grid — never empty (custom card always shown). */
            <div className="flex flex-col gap-8">
              {hasQuery && recommended && (
                <div>
                  <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t.resultsRecommended}
                    <span className="font-sans normal-case tracking-normal text-[#8A8175]">· {t.resultsFor} “{activeQuery}”</span>
                  </p>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <MissionCard mission={recommended} lang={lang} t={t} />
                    <CustomMissionCard query={activeQuery} lang={lang} t={t} />
                  </div>
                </div>
              )}

              {hasQuery && !recommended && (
                <p className="rounded-xl border border-[#E4DDCE] bg-[#F3EFE6] px-4 py-3 text-sm text-[#4E483F]">
                  {t.noExact}
                </p>
              )}

              {rest.length > 0 && (
                <div>
                  {hasQuery && recommended && (
                    <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                      {t.resultsMore}
                    </p>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((m) => (
                      <MissionCard key={m.slug} mission={m} lang={lang} t={t} />
                    ))}
                    {/* Custom card also closes the grid when there is no dedicated recommended row. */}
                    {(!hasQuery || !recommended) && <CustomMissionCard query={activeQuery} lang={lang} t={t} />}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------- AFTER-CHOICE STRIP ----------------------- */}
      <section className="border-y border-[#E4DDCE] bg-[#FBF9F3] px-4 py-14 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">
            {t.stepsKicker}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-sf text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17]">
            {t.stepsTitle}
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-[#E4DDCE] bg-[#F7F4EC] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C1A17] font-sf text-sm font-bold text-[#FBF9F3]">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-sf text-base font-bold text-[#1C1A17]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------ FINAL CTA --------------------------- */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#33302B] bg-[#1C1A17] p-8 text-center sm:p-12">
          <h2 className="text-balance font-sf text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#FBF9F3]">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-[#C9C2B6]">
            {t.ctaLead}
          </p>
          <Link
            href={CREATE_ORG_HREF}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B53]"
          >
            {t.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#9A9184]">
            <Clock className="h-3.5 w-3.5" />
            {t.ctaNote}
          </p>
        </div>
      </section>
    </main>
  )
}

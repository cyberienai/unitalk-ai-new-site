'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { MISSION_CATEGORIES, ORIGIN_LABELS, STATUS_LABELS, getMissionCategory, getMissionCategoryHref, getMissionGuideHref, type Mission, type MissionCategory } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'

// Ghost-border card, Vercel-marketplace inspired: flat at rest, magenta confirm on hover.
const SHADOW_REST = '0 0 0 1px rgba(36,31,29,0.09), 0 1px 2px rgba(36,31,29,0.02)'
const SHADOW_HOVER =
  '0 0 0 1px rgba(209,14,99,0.32), 0 8px 24px rgba(36,31,29,0.06), 0 6px 28px -6px rgba(209,14,99,0.22)'

function categoryLabel(cats: MissionCategory[], key: string, lang: Lang): string {
  return cats.find((c) => c.key === key)?.label[lang] ?? key
}

// Discreet, secondary metadata shown at the bottom of every card: category,
// creator and — only when it is worth flagging (coming soon) — availability.
// The default available/on-setup states are kept out to avoid visual noise.
function metaParts(mission: Mission, cats: MissionCategory[], lang: Lang): string[] {
  const parts = [categoryLabel(cats, mission.category, lang), ORIGIN_LABELS[mission.origin][lang]]
  if (mission.status === 'coming-soon') parts.push(STATUS_LABELS[mission.status][lang])
  return parts
}

// Small dot-separated meta row, reused by all card variants.
function MetaRow({ parts }: { parts: string[] }) {
  return (
    <p className="pointer-events-none relative z-0 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-medium text-[var(--store-muted)]">
      {parts.map((part, i) => (
        <span key={part} className="inline-flex items-center gap-x-1.5">
          {i > 0 && <span aria-hidden="true">·</span>}
          {part}
        </span>
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Catalog card — whole card loads the mission into Alma (no cold page) */
/* ------------------------------------------------------------------ */
export function StoreCard({
  mission,
  lang,
  onPersonalize,
}: {
  mission: Mission
  lang: Lang
  onPersonalize?: () => void
}) {
  const category = shortCategoryLabel(mission.category, lang)
  const categoryData = getMissionCategory(mission.category)
  const description = actionDescription(mission, lang)
  const tooltipId = `personalize-tooltip-${mission.slug}`
  const personalize = lang === 'fr' ? 'Confier cette mission' : 'Assign this mission'
  const tooltip = lang === 'fr' ? 'Confier cette mission à votre Collaborateur IA' : 'Assign this mission to your AI Collaborator'
  return (
    <article
      data-mission-card={mission.slug}
      style={{ viewTransitionName: `mission-${mission.slug}` }}
      className="group relative grid w-full cursor-pointer grid-rows-[44px_44px_auto] overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-[18px] text-left shadow-[0_12px_35px_-32px_rgba(28,26,23,.55)] transition-[transform,border-color,background-color,box-shadow] duration-200 ease-in-out before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-[#D10E63] before:transition-transform before:duration-200 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:bg-[#FFFDF9] hover:shadow-[0_18px_42px_-28px_rgba(28,26,23,.28)] hover:before:scale-x-100 focus-within:border-[#D10E63]/35 focus-within:before:scale-x-100 sm:min-h-[188px] sm:p-5"
    >
      <h3 className="pointer-events-none relative z-10 line-clamp-2 min-h-[44px] font-sf text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#1C1A17]">
              {mission.title[lang]}
            </h3>
            <p className="pointer-events-none relative z-10 mt-2 line-clamp-2 min-h-[44px] text-sm leading-[1.45] text-[#4E483F]">{description}</p>
            <p className="pointer-events-none relative z-10 mt-1.5 line-clamp-1 text-[11px] leading-[1.3] text-[#948A7C]">
              <span className="mr-1">✓</span> {mission.result[lang]}
            </p>
      {mission.unitalk && <div className="pointer-events-none relative z-10 mt-3 grid grid-cols-2 gap-2 border-t border-[#DED6C8] pt-3 text-[10px] text-[#6E665A]"><p><strong className="block text-[#1C1A17]">Intervenant</strong>{mission.profile[lang]}</p><p><strong className="block text-[#1C1A17]">Crédits Mission</strong>À confirmer</p><p><strong className="block text-[#1C1A17]">Assistance</strong>Après cadrage</p><p><strong className="block text-[#1C1A17]">Crédits IA</strong>Estimés avant exécution</p></div>}
      <footer className="pointer-events-none relative z-20 mt-4 flex min-h-8 flex-col items-start justify-between gap-3 border-t border-[#DED6C8] pt-3 sm:flex-row sm:items-center">
        <div className="flex min-h-8 flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] font-semibold leading-snug text-[#6E665A]">
          {categoryData ? <Link href={getMissionCategoryHref(categoryData)} aria-label={lang === 'fr' ? `Afficher les missions de la catégorie ${category}` : `Show missions in ${category}`} className="pointer-events-auto relative z-30 inline-flex min-h-8 items-center underline decoration-transparent underline-offset-4 outline-none hover:text-[#D10E63] hover:decoration-[#D10E63]/40 focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{category}</Link> : <span className="pointer-events-none">{category}</span>}
          <><span aria-hidden className="pointer-events-none">·</span><Link href={getMissionGuideHref(mission)} aria-label={lang === 'fr' ? `Lire le guide : ${mission.title.fr}` : `Read the guide: ${mission.title.en}`} className="pointer-events-auto relative z-30 text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-3 outline-none hover:text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{lang === 'fr' ? 'Lire le guide' : 'Read the guide'}</Link></>
        </div>
        <div className="group/action pointer-events-auto relative z-30 shrink-0">
                  <Link onClick={onPersonalize} aria-describedby={tooltipId} aria-label={`${tooltip} : ${mission.title[lang]}`} href={`/decouvrir?mission=${mission.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_14px_-6px_rgba(209,14,99,.7)] outline-none transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
                    {personalize}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover/action:translate-x-0.5 group-focus-within/action:translate-x-0.5" />
                                      </Link>
                                    </div>
                          </footer>
      <Link
        href={`/decouvrir?mission=${mission.slug}`}
        onClick={onPersonalize}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 z-0 rounded-[inherit] outline-none"
      >
        <span className="sr-only">{lang === 'fr' ? `Personnaliser la mission ${mission.title.fr}` : `Personalize mission ${mission.title.en}`}</span>
      </Link>
    </article>
  )
}

const DESCRIPTION_OVERRIDES: Record<string, { fr: string; en: string }> = {
  'trouver-de-nouveaux-clients': {
      fr: 'Identifiez et qualifiez les prospects correspondant à vos critères avant toute prise de contact.',
      en: 'Identify and qualify prospects matching your criteria before any outreach.',
    },
  'qualifier-les-demandes-entrantes': {
    fr: 'Enrichissez les demandes entrantes, classez-les et dirigez-les vers la bonne personne.',
    en: 'Enrich inbound requests, classify them and route them to the right person.',
  },
  'repondre-a-mes-clients': {
    fr: 'Préparez des réponses contextualisées et signalez les cas qui exigent une intervention.',
    en: 'Prepare contextual replies and review the cases that require your intervention.',
  },
  'preparer-les-elements-de-facturation': {
    fr: 'Rassemblez et contrôlez les prestations et les montants à facturer.',
    en: 'Gather and review the services and amounts to be invoiced.',
  },
  'rediger-une-fiche-de-poste': {
    fr: 'Formalisez la mission, les responsabilités et les compétences attendues.',
    en: 'Define the mission, responsibilities and expected skills.',
  },
  'resumer-un-dossier': {
    fr: 'Faites ressortir les faits essentiels, les risques et les décisions attendues.',
    en: 'Highlight the key facts, risks and decision points.',
  },
  'construire-un-calendrier-editorial': {
    fr: 'Planifiez les publications selon vos objectifs, vos canaux et vos temps forts.',
    en: 'Plan publications around your goals, channels and key moments.',
  },
  'preparer-l-ordre-du-jour': {
    fr: 'Structurez les sujets, les documents utiles et les décisions attendues avant la réunion.',
    en: 'Structure the topics, useful documents and expected decisions before the meeting.',
  },
  'organiser-les-rendez-vous': {
    fr: 'Planifiez les rendez-vous selon les disponibilités, les priorités et les contraintes de chacun.',
    en: 'Schedule appointments around everyone’s availability, priorities and constraints.',
  },
  'controler-l-execution-d-un-processus': {
    fr: 'Suivez les étapes d’un processus et signalez les retards ou anomalies qui exigent une intervention.',
    en: 'Track each process step and flag delays or anomalies that require attention.',
  },
}

const IMPERATIVE_VERBS: Record<string, { fr: string; en: string }> = {
  analyser: { fr: 'Analysez', en: 'Analyze' },
  automatiser: { fr: 'Automatisez', en: 'Automate' },
  classer: { fr: 'Classez', en: 'Classify' },
  contrôler: { fr: 'Contrôlez', en: 'Review' },
  créer: { fr: 'Créez', en: 'Create' },
  définir: { fr: 'Définissez', en: 'Define' },
  détecter: { fr: 'Détectez', en: 'Detect' },
  extraire: { fr: 'Extrayez', en: 'Extract' },
  générer: { fr: 'Générez', en: 'Generate' },
  gérer: { fr: 'Gérez', en: 'Manage' },
  identifier: { fr: 'Identifiez', en: 'Identify' },
  mettre: { fr: 'Mettez', en: 'Update' },
  organiser: { fr: 'Organisez', en: 'Organize' },
  personnaliser: { fr: 'Personnalisez', en: 'Personalize' },
  préparer: { fr: 'Préparez', en: 'Prepare' },
  qualifier: { fr: 'Qualifiez', en: 'Qualify' },
  rédiger: { fr: 'Rédigez', en: 'Write' },
  relancer: { fr: 'Relancez', en: 'Follow up on' },
  répondre: { fr: 'Répondez', en: 'Answer' },
  résumer: { fr: 'Résumez', en: 'Summarize' },
  suivre: { fr: 'Suivez', en: 'Track' },
  trouver: { fr: 'Identifiez', en: 'Find' },
  vérifier: { fr: 'Vérifiez', en: 'Check' },
}

export function actionDescription(mission: Mission, lang: Lang): string {
  const override = DESCRIPTION_OVERRIDES[mission.slug]
  if (override) return override[lang]

  const title = mission.title[lang].replace(/[.!?]+$/, '')
  const [firstWord, ...rest] = title.split(/\s+/)
  const imperative = IMPERATIVE_VERBS[firstWord.toLowerCase()]?.[lang]
  if (!imperative) return mission.result[lang]

  const action = `${imperative} ${rest.join(' ')}`.trim()
  return `${action.charAt(0).toUpperCase()}${action.slice(1)}. ${mission.result[lang]}`
}

export function shortCategoryLabel(key: string, lang: Lang): string {
  const labels: Record<string, { fr: string; en: string }> = {
    ventes: { fr: 'Ventes', en: 'Sales' },
    'relation-client': { fr: 'Service client', en: 'Customer service' },
    marketing: { fr: 'Marketing', en: 'Marketing' },
    reunions: { fr: 'Réunions', en: 'Meetings' },
    administration: { fr: 'Assistanat', en: 'Assistance' },
    finance: { fr: 'Finance', en: 'Finance' },
    rh: { fr: 'RH', en: 'HR' },
    direction: { fr: 'Direction', en: 'Leadership' },
    documents: { fr: 'Documents', en: 'Documents' },
    analyse: { fr: 'Analyse', en: 'Analysis' },
    operations: { fr: 'Opérations', en: 'Operations' },
    produit: { fr: 'Produit', en: 'Product' },
  }
  return labels[key]?.[lang] ?? categoryLabel(MISSION_CATEGORIES, key, lang)
}

/* ------------------------------------------------------------------ */
/* Featured card — compact, whole-card link, no preview button          */
/* ------------------------------------------------------------------ */
export function FeaturedCard({
  mission,
  categories,
  lang,
}: {
  mission: Mission
  categories: MissionCategory[]
  lang: Lang
}) {
  return (
    <Link
      href={`/missions/${mission.slug}`}
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex flex-col rounded-[10px] bg-[var(--store-surface)] p-6 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[var(--store-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <h3 className="line-clamp-2 font-sf text-[19px] font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 text-sm leading-[1.5] text-[var(--store-muted)]">{mission.result[lang]}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <MetaRow parts={metaParts(mission, categories, lang)} />
        <ArrowRight className="h-4 w-4 shrink-0 text-[#D10E63] transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Recent card — whole-card link, relative date                         */
/* ------------------------------------------------------------------ */
export function RecentCard({
  mission,
  categories,
  lang,
  dateLabel,
}: {
  mission: Mission
  categories: MissionCategory[]
  lang: Lang
  dateLabel?: string
}) {
  return (
    <Link
      href={`/missions/${mission.slug}`}
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex flex-col rounded-[10px] bg-[var(--store-surface)] p-6 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[var(--store-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <h3 className="line-clamp-2 font-sf text-[19px] font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">{mission.result[lang]}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <MetaRow parts={[...metaParts(mission, categories, lang), ...(dateLabel ? [dateLabel] : [])]} />
        <ArrowRight className="h-4 w-4 shrink-0 text-[#D10E63] transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Alma card — dark, native to the grid (no floating widget)            */
/* ------------------------------------------------------------------ */
export function AlmaCard({
  lang,
  query,
  href = '/decouvrir',
}: {
  lang: Lang
  query?: string
  href?: string
}) {
  const hasQuery = Boolean(query && query.trim())
  const title = hasQuery
    ? lang === 'fr'
      ? `Préparer « ${query} » avec Alma`
      : `Prepare "${query}" with Alma`
    : lang === 'fr'
      ? 'Votre mission n’est pas encore ici ?'
      : 'Your mission isn’t here yet?'

  return (
    <Link
      href={href}
      className="group relative flex min-h-[212px] flex-col overflow-hidden rounded-[10px] bg-[#241F1D] p-[22px] text-[#F3EFE6] transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/60"
    >
      <div className="flex items-center gap-2.5">
        <img
          src="/alma-avatar.png"
          alt=""
          aria-hidden="true"
          className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/50"
        />
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F5A9CC]">
          <Sparkles className="h-3.5 w-3.5" />
          {lang === 'fr' ? 'Préparée par Alma' : 'Prepared by Alma'}
        </span>
      </div>
      <h3 className="mt-3 line-clamp-2 font-sf text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[#FBF9F3]">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-[1.5] text-[#C9C1B8]">
        {lang === 'fr'
          ? 'Décrivez votre objectif. Alma prépare la mission, le profil métier et les compétences nécessaires.'
          : 'Describe your goal. Alma prepares the mission, the job profile and the skills needed.'}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-bold text-[#F5A9CC]">
        {lang === 'fr' ? 'Décrire mon objectif' : 'Describe my goal'}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Alma band — full-width horizontal strip below a filtered result set */
/* ------------------------------------------------------------------ */
export function AlmaBand({
  lang,
  query,
  href = '/decouvrir',
}: {
  lang: Lang
  query?: string
  href?: string
}) {
  const hasQuery = Boolean(query && query.trim())
  const title = hasQuery
    ? lang === 'fr'
      ? `Aucune mission pour « ${query} » ?`
      : `No mission for "${query}"?`
    : lang === 'fr'
      ? 'Vous ne trouvez pas la mission recherchée ?'
      : 'Can’t find the mission you’re looking for?'

  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#241F1D] p-6 text-[#F3EFE6] transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/60 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7"
    >
      {/* Subtle brand glow anchored to the CTA side, purely decorative. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#D10E63]/[0.14] blur-3xl"
      />
      <div className="relative min-w-0 flex-1">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5A9CC]">Alma</span>
        <h3 className="mt-1.5 font-sf text-[20px] font-semibold leading-snug tracking-[-0.01em] text-[#FBF9F3] text-balance">
          {title}
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm leading-[1.55] text-[#C9C1B8]">
          {lang === 'fr'
            ? 'Décrivez votre objectif à Alma. Elle préparera le Collaborateur IA adapté à votre organisation.'
            : 'Describe your goal to Alma. She’ll prepare the AI Collaborator suited to your organization.'}
        </p>
      </div>
      <span className="relative inline-flex shrink-0 items-center gap-3 rounded-full bg-[#D10E63] py-1.5 pl-1.5 pr-5 text-sm font-bold text-[#FBF9F3] shadow-[0_8px_24px_-8px_rgba(209,14,99,0.7)] transition-colors group-hover:bg-[#B60C56]">
        <img
          src="/alma-avatar.png"
          alt=""
          aria-hidden="true"
          className="h-9 w-9 rounded-full object-cover ring-2 ring-white/25"
        />
        {lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma'}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

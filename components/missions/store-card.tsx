'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { ORIGIN_LABELS, STATUS_LABELS, type Mission, type MissionCategory } from '@/lib/missions-catalog'
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
  onSelect,
}: {
  mission: Mission
  lang: Lang
  onSelect: (m: Mission, trigger: HTMLElement | null) => void
}) {
  const selectLabel =
    lang === 'fr' ? `Confier « ${mission.title[lang]} » à Alma` : `Hand "${mission.title[lang]}" to Alma`

  // The entire card is a button: clicking it loads the mission into Alma and
  // triggers the flying-card handoff. Deliberately minimal — only title,
  // description and the action; creator/category stay in the data model but are
  // not surfaced until community missions ship.
  return (
    <button
      type="button"
      onClick={(e) => onSelect(mission, e.currentTarget)}
      aria-label={selectLabel}
      data-mission-card={mission.slug}
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-6 text-left transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[var(--store-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <h3 className="line-clamp-2 font-sf text-[19px] font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">{mission.result[lang]}</p>
      {/* Action row: a bare arrow at rest that unfolds into "Préciser avec Alma"
          on hover/focus, so the whole card's purpose stays obvious. */}
      <div className="mt-4 flex items-center justify-end gap-1.5">
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-[#AD0C53] opacity-0 transition-all duration-200 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100">
          {lang === 'fr' ? 'Préciser avec Alma' : 'Refine with Alma'}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#D10E63] transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  )
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

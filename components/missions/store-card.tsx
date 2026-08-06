'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import { missionFacets, type Mission, type MissionCategory } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'
import { StatusBadge } from './status-badge'

// Ghost-border card, Vercel-marketplace inspired: flat at rest, magenta confirm on hover.
const SHADOW_REST = '0 0 0 1px rgba(36,31,29,0.09), 0 1px 2px rgba(36,31,29,0.02)'
const SHADOW_HOVER = '0 0 0 1px rgba(209,14,99,0.32), 0 8px 24px rgba(36,31,29,0.06)'

function categoryLabel(cats: MissionCategory[], key: string, lang: Lang): string {
  return cats.find((c) => c.key === key)?.label[lang] ?? key
}

// Status is only worth showing when it carries information. "Disponible" is the
// default state and would be repetitive across the grid, so we hide it there.
function informativeStatus(m: Mission): boolean {
  return missionFacets(m).status !== 'available'
}

/* ------------------------------------------------------------------ */
/* Catalog card — full detail link + separate preview button           */
/* ------------------------------------------------------------------ */
export function StoreCard({
  mission,
  categories,
  lang,
  onOpen,
}: {
  mission: Mission
  categories: MissionCategory[]
  lang: Lang
  onOpen: (m: Mission, trigger: HTMLElement | null) => void
}) {
  const status = missionFacets(mission).status
  const showStatus = informativeStatus(mission)
  const previewLabel = lang === 'fr' ? `Aperçu de ${mission.title[lang]}` : `Preview ${mission.title[lang]}`

  // Card and preview are SIBLINGS (no button nested in a link). The link owns the
  // whole surface via an inset overlay; the preview button sits above it (z-10).
  return (
    <article
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex h-[212px] w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-[22px] transition-[transform,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-[#D10E63]/40 hover:-translate-y-px"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <Link
        href={`/missions/${mission.slug}`}
        className="absolute inset-0 z-0 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
        aria-label={mission.title[lang]}
      />

      <div className="pointer-events-none relative z-0 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
          {categoryLabel(categories, mission.category, lang)}
        </span>
        {showStatus && <StatusBadge status={status} lang={lang} />}
      </div>
      <h3 className="pointer-events-none relative z-0 mt-2.5 line-clamp-2 font-sf text-[18px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="pointer-events-none relative z-0 mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">
        {mission.result[lang]}
      </p>
      <div className="pointer-events-none relative z-0 mt-auto flex items-center pt-3">
        <ArrowRight className="h-4 w-4 text-[#D10E63] transition-transform group-hover:translate-x-0.5" />
      </div>

      <button
        type="button"
        onClick={(e) => onOpen(mission, e.currentTarget)}
        aria-label={previewLabel}
        title={lang === 'fr' ? 'Aperçu rapide' : 'Quick preview'}
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      >
        <Eye className="h-4 w-4" />
      </button>
    </article>
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
  const status = missionFacets(mission).status
  const showStatus = informativeStatus(mission)
  return (
    <Link
      href={`/missions/${mission.slug}`}
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex h-[188px] flex-col rounded-[10px] bg-[var(--store-surface)] p-5 transition-[transform,box-shadow] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="line-clamp-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
          {categoryLabel(categories, mission.category, lang)}
        </span>
        {showStatus && <StatusBadge status={status} lang={lang} />}
      </div>
      <h3 className="mt-2 line-clamp-2 font-sf text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.5] text-[var(--store-muted)]">{mission.result[lang]}</p>
      <ArrowRight className="mt-auto ml-auto h-4 w-4 text-[#D10E63] transition-transform group-hover:translate-x-0.5" />
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
  dateLabel: string
}) {
  const status = missionFacets(mission).status
  const showStatus = informativeStatus(mission)
  return (
    <Link
      href={`/missions/${mission.slug}`}
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex h-[200px] flex-col rounded-[10px] bg-[var(--store-surface)] p-[22px] transition-[transform,box-shadow] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
          {categoryLabel(categories, mission.category, lang)}
        </span>
        {showStatus && <StatusBadge status={status} lang={lang} />}
      </div>
      <h3 className="mt-2.5 line-clamp-2 font-sf text-[18px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-[1.5] text-[var(--store-muted)]">{mission.result[lang]}</p>
      <span className="mt-auto pt-3 text-xs font-medium text-[var(--store-muted)]">{dateLabel}</span>
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

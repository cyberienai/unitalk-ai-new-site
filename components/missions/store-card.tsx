'use client'

import Link from 'next/link'
import { ArrowRight, Eye, Sparkles } from 'lucide-react'
import { missionFacets, type Mission, type MissionCategory } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'
import { StatusBadge } from './status-badge'

// Ghost-border card, Vercel-marketplace inspired: flat at rest, magenta confirm on hover.
const SHADOW_REST = '0 0 0 1px rgba(36,31,29,0.09), 0 2px 2px rgba(36,31,29,0.025)'
const SHADOW_HOVER = '0 0 0 1px rgba(209,14,99,0.32), 0 8px 24px rgba(36,31,29,0.06)'

function categoryLabel(cats: MissionCategory[], key: string, lang: Lang): string {
  return cats.find((c) => c.key === key)?.label[lang] ?? key
}

export function StoreCard({
  mission,
  categories,
  lang,
  onOpen,
}: {
  mission: Mission
  categories: MissionCategory[]
  lang: Lang
  onOpen: (m: Mission) => void
}) {
  const status = missionFacets(mission).status
  const previewLabel = lang === 'fr' ? `Aperçu de ${mission.title[lang]}` : `Preview ${mission.title[lang]}`

  // Card and preview are SIBLINGS (no button nested in a link). The link owns the
  // whole surface via an inset overlay; the preview button sits above it (z-10).
  return (
    <article
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex h-[228px] w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-[22px] transition-[transform,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-[#D10E63]/40 hover:-translate-y-px"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      {/* Whole-card link → detail page. Absolute overlay makes the entire card clickable. */}
      <Link
        href={`/missions/${mission.slug}`}
        className="absolute inset-0 z-0 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
        aria-label={mission.title[lang]}
      />

      <div className="pointer-events-none relative z-0 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
          {categoryLabel(categories, mission.category, lang)}
        </span>
        <StatusBadge status={status} lang={lang} />
      </div>
      <h3 className="pointer-events-none relative z-0 mt-2.5 line-clamp-2 font-sf text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="pointer-events-none relative z-0 mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">
        {mission.result[lang]}
      </p>
      <div className="pointer-events-none relative z-0 mt-auto flex items-center pt-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D10E63] transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Sibling preview button — above the link overlay, icon-only, accessible label. */}
      <button
        type="button"
        onClick={() => onOpen(mission)}
        aria-label={previewLabel}
        title={lang === 'fr' ? 'Aperçu rapide' : 'Quick preview'}
        className="absolute bottom-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      >
        <Eye className="h-4 w-4" />
      </button>
    </article>
  )
}

// Custom "your mission isn't here yet" card — closes the grid, opens Alma.
export function CustomCard({ lang, onDescribe }: { lang: Lang; onDescribe: () => void }) {
  return (
    <button
      type="button"
      onClick={onDescribe}
      style={{
        boxShadow: '0 0 0 1px rgba(209,14,99,0.22)',
        backgroundImage:
          'radial-gradient(rgba(209,14,99,0.14) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
      className="group flex h-[228px] w-full flex-col rounded-[10px] bg-[#FCEAF2]/50 p-[22px] text-left transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
    >
      <span className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A80B50]">
        <Sparkles className="h-3.5 w-3.5" />
        {lang === 'fr' ? 'Sur mesure' : 'Tailored'}
      </span>
      <h3 className="mt-2.5 line-clamp-2 font-sf text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {lang === 'fr' ? 'Votre mission n’est pas encore ici ?' : 'Your mission isn’t here yet?'}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">
        {lang === 'fr'
          ? 'Décrivez votre objectif. Alma prépare la mission, le profil métier et les compétences nécessaires.'
          : 'Describe your goal. Alma prepares the mission, the job profile and the skills needed.'}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#D10E63]">
        {lang === 'fr' ? 'Décrire mon objectif' : 'Describe my goal'}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}

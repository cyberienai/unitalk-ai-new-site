'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import type { Mission, MissionCategory } from '@/lib/missions-catalog'
import type { Lang } from '@/lib/language-context'

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
  return (
    <button
      type="button"
      onClick={() => onOpen(mission)}
      style={{ boxShadow: SHADOW_REST }}
      className="group flex h-[210px] w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-[22px] text-left transition-[transform,box-shadow] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
      onFocus={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--store-muted)]">
        {categoryLabel(categories, mission.category, lang)}
      </span>
      <h3 className="mt-2.5 font-sf text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {mission.title[lang]}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">
        {mission.result[lang]}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#D10E63]">
        {lang === 'fr' ? 'Voir la mission' : 'View mission'}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
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
      className="group flex h-[210px] w-full flex-col rounded-[10px] bg-[#FCEAF2]/50 p-[22px] text-left transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
    >
      <span className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A80B50]">
        <Sparkles className="h-3.5 w-3.5" />
        {lang === 'fr' ? 'Sur mesure' : 'Tailored'}
      </span>
      <h3 className="mt-2.5 font-sf text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {lang === 'fr' ? 'Votre mission n’est pas encore ici ?' : 'Your mission isn’t here yet?'}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-[1.5] text-[var(--store-muted)]">
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

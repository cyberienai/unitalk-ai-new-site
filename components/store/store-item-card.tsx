'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TYPE_LABELS, storeItemHref, type StoreItem } from '@/lib/store-catalog'
import type { Lang } from '@/lib/language-context'

// Same ghost-border grammar as the Missions cards: flat at rest, magenta
// confirm on hover, subtle lift and arrow nudge.
const SHADOW_REST = '0 0 0 1px rgba(36,31,29,0.09), 0 1px 2px rgba(36,31,29,0.02)'
const SHADOW_HOVER =
  '0 0 0 1px rgba(209,14,99,0.32), 0 8px 24px rgba(36,31,29,0.06), 0 6px 28px -6px rgba(209,14,99,0.22)'

// Deterministic tint for an application monogram tile, keyed off the editor.
const MONO_TINTS = ['#E9E3F5', '#E3EEF5', '#F5E7E0', '#E4F0E6', '#F5E3EE', '#EDEBE2']
function monoTint(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return MONO_TINTS[h % MONO_TINTS.length]
}

// The secondary metadata line: type first, then creator (profil/competence) or
// editor (application). No status, no invented metric (sections 11 & 14).
function creatorLabel(item: StoreItem, lang: Lang): string {
  if (item.type === 'application') return item.editor ?? (lang === 'fr' ? 'Éditeur' : 'Editor')
  return item.creator === 'unitalk'
    ? lang === 'fr'
      ? 'Par Unitalk'
      : 'By Unitalk'
    : lang === 'fr'
      ? 'Par la communauté'
      : 'By the community'
}

export function StoreItemCard({ item, lang }: { item: StoreItem; lang: Lang }) {
  const isApp = item.type === 'application'
  const initial = item.name[lang].replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase() || '·'

  return (
    <article
      style={{ boxShadow: SHADOW_REST }}
      className="group relative flex h-full w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-6 transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-[var(--store-surface-hover)] focus-within:ring-2 focus-within:ring-[#D10E63]/40"
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_REST)}
    >
      <Link
        href={storeItemHref(item)}
        className="absolute inset-0 z-0 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
        aria-label={item.name[lang]}
      />

      {/* Name is always first and most visible. Applications add a small logo tile. */}
      <div className="pointer-events-none relative z-0 flex items-start gap-3">
        {isApp && (
          <span
            aria-hidden="true"
            style={{ backgroundColor: monoTint(item.editor ?? item.slug) }}
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-sf text-[15px] font-bold text-[#3A332E]"
          >
            {initial}
          </span>
        )}
        <h3 className="line-clamp-2 pr-9 font-sf text-[19px] font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
          {item.name[lang]}
        </h3>
      </div>

      <p className="pointer-events-none relative z-0 mt-2 line-clamp-3 text-sm leading-[1.5] text-[var(--store-muted)]">
        {item.description[lang]}
      </p>

      <div className="pointer-events-none relative z-0 mt-4 flex items-end justify-between gap-3">
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-medium text-[var(--store-muted)]">
          <span>{TYPE_LABELS[item.type][lang]}</span>
          <span aria-hidden="true">·</span>
          <span>{creatorLabel(item, lang)}</span>
        </p>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#D10E63] transition-transform group-hover:translate-x-1" />
      </div>
    </article>
  )
}

// Skeleton mirrors the card dimensions exactly (section 18).
export function StoreCardSkeleton() {
  return (
    <div
      style={{ boxShadow: '0 0 0 1px rgba(36,31,29,0.06)' }}
      className="flex h-full min-h-[186px] w-full flex-col rounded-[10px] bg-[var(--store-surface)] p-6"
      aria-hidden="true"
    >
      <div className="h-5 w-3/4 animate-pulse rounded bg-[#E7E1D6]" />
      <div className="mt-3 h-3.5 w-full animate-pulse rounded bg-[#EDE8DE]" />
      <div className="mt-2 h-3.5 w-5/6 animate-pulse rounded bg-[#EDE8DE]" />
      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#EDE8DE]" />
        <div className="h-4 w-4 animate-pulse rounded bg-[#EDE8DE]" />
      </div>
    </div>
  )
}

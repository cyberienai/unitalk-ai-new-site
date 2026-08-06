'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  CATEGORY_FACETS,
  SECTORS,
  ZONES,
  LANGUAGES,
  MODALITIES,
  AVAILABILITIES,
  type Facet,
  type StoreFilters,
} from '@/lib/missions-store'

export type MultiKey = 'secteur' | 'zone' | 'langue' | 'modalite'
export type DiscoverView = 'all' | 'featured' | 'recent'

const DISCOVER: { key: DiscoverView; label: { fr: string; en: string } }[] = [
  { key: 'all', label: { fr: 'Toutes les missions', en: 'All missions' } },
  { key: 'featured', label: { fr: 'À la une', en: 'Featured' } },
  { key: 'recent', label: { fr: 'Ajoutées récemment', en: 'Recently added' } },
]

const FILTER_GROUPS: { key: MultiKey; label: { fr: string; en: string }; items: Facet[] }[] = [
  { key: 'secteur', label: { fr: 'Secteur', en: 'Sector' }, items: SECTORS },
  { key: 'zone', label: { fr: 'Zone', en: 'Zone' }, items: ZONES },
  { key: 'langue', label: { fr: 'Langue', en: 'Language' }, items: LANGUAGES },
  { key: 'modalite', label: { fr: 'Modalité', en: 'Modality' }, items: MODALITIES },
]

export function StoreSidebar({
  filters,
  lang,
  activeDiscover,
  counts,
  onDiscover,
  onCategory,
  onToggleFacet,
  onDisponibilite,
}: {
  filters: StoreFilters
  lang: Lang
  activeDiscover: DiscoverView
  counts: Record<string, number>
  onDiscover: (v: DiscoverView) => void
  onCategory: (key: string) => void
  onToggleFacet: (group: MultiKey, value: string) => void
  onDisponibilite: (value: string) => void
}) {
  return (
    <nav
      aria-label={lang === 'fr' ? 'Navigation des missions' : 'Missions navigation'}
      className="flex max-h-[calc(100vh-7rem)] flex-col gap-7 overflow-y-auto pr-1 [scrollbar-width:thin]"
    >
      {/* GROUP 1 — Découvrir */}
      <Group title={lang === 'fr' ? 'Découvrir' : 'Discover'}>
        <ul className="flex flex-col gap-0.5">
          {DISCOVER.map((d) => (
            <li key={d.key}>
              <RowButton
                label={d.label[lang]}
                active={activeDiscover === d.key && filters.categorie === 'all'}
                onClick={() => onDiscover(d.key)}
              />
            </li>
          ))}
        </ul>
      </Group>

      {/* GROUP 2 — Catégories */}
      <Group title={lang === 'fr' ? 'Catégories' : 'Categories'}>
        <ul className="flex flex-col gap-0.5">
          {CATEGORY_FACETS.map((c) => (
            <li key={c.key}>
              <RowButton
                label={c.label[lang]}
                count={counts[c.key]}
                active={filters.categorie === c.key}
                onClick={() => onCategory(c.key)}
              />
            </li>
          ))}
        </ul>
      </Group>

      {/* GROUP 3 — Filtres */}
      <Group title={lang === 'fr' ? 'Filtres' : 'Filters'}>
        <div className="flex flex-col">
          {FILTER_GROUPS.map((g) => (
            <Accordion
              key={g.key}
              label={g.label[lang]}
              activeCount={filters[g.key].length}
              defaultOpen={filters[g.key].length > 0}
            >
              {g.items.map((f) => (
                <CheckRow
                  key={f.key}
                  label={f.label[lang]}
                  checked={filters[g.key].includes(f.key)}
                  onClick={() => onToggleFacet(g.key, f.key)}
                />
              ))}
            </Accordion>
          ))}
          <Accordion
            label={lang === 'fr' ? 'Disponibilité' : 'Availability'}
            activeCount={filters.disponibilite !== 'all' ? 1 : 0}
            defaultOpen={filters.disponibilite !== 'all'}
          >
            <RadioRow
              label={lang === 'fr' ? 'Toutes' : 'All'}
              checked={filters.disponibilite === 'all'}
              onClick={() => onDisponibilite('all')}
            />
            {AVAILABILITIES.map((a) => (
              <RadioRow
                key={a.key}
                label={a.label[lang]}
                checked={filters.disponibilite === a.key}
                onClick={() => onDisponibilite(a.key)}
              />
            ))}
          </Accordion>
        </div>
      </Group>
    </nav>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--store-muted)]">
        {title}
      </p>
      {children}
    </div>
  )
}

function RowButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-2 rounded-[7px] px-2.5 py-2 text-left text-[13px] leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${
        active
          ? 'bg-[#FCEAF2] font-semibold text-[#AD0C53]'
          : 'text-[var(--store-text)] hover:bg-[var(--store-text)]/[0.04]'
      }`}
    >
      <span className="min-w-0">{label}</span>
      {typeof count === 'number' && (
        <span className={`shrink-0 text-xs tabular-nums ${active ? 'text-[#AD0C53]' : 'text-[var(--store-muted)]'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

function Accordion({
  label,
  activeCount,
  defaultOpen,
  children,
}: {
  label: string
  activeCount: number
  defaultOpen: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[var(--store-line)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-2.5 py-2.5 text-left text-[13px] font-medium text-[var(--store-text)] transition-colors hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      >
        <span className="flex items-center gap-1.5">
          {label}
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D10E63] px-1 text-[10px] font-bold text-[#FBF9F3]">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-[var(--store-muted)] transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && <ul className="flex flex-col gap-0.5 pb-2">{children}</ul>}
    </div>
  )
}

function CheckRow({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--store-text)]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      >
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
            checked ? 'border-[#D10E63] bg-[#D10E63] text-[#FBF9F3]' : 'border-[var(--store-line)] bg-[var(--store-surface)]'
          }`}
        >
          {checked && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
        <span className={checked ? 'font-medium text-[var(--store-text)]' : 'text-[var(--store-text)]'}>{label}</span>
      </button>
    </li>
  )
}

function RadioRow({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-1.5 text-left text-[13px] transition-colors hover:bg-[var(--store-text)]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50"
      >
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
            checked ? 'border-[#D10E63]' : 'border-[var(--store-line)]'
          }`}
        >
          {checked && <span className="h-2 w-2 rounded-full bg-[#D10E63]" />}
        </span>
        <span className={checked ? 'font-medium text-[var(--store-text)]' : 'text-[var(--store-text)]'}>{label}</span>
      </button>
    </li>
  )
}

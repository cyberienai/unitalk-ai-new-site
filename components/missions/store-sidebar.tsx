'use client'

import { useState } from 'react'
import { ChevronDown, Check, Info } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  CATEGORY_FACETS,
  SECTORS,
  ZONES,
  LANGUAGES,
  MODALITIES,
  type Facet,
  type StoreFilters,
} from '@/lib/missions-store'

export type MultiKey = 'secteur' | 'zone' | 'langue' | 'modalite'

const FILTER_GROUPS: { key: MultiKey; label: { fr: string; en: string }; items: Facet[] }[] = [
  { key: 'secteur', label: { fr: 'Secteur', en: 'Sector' }, items: SECTORS },
  { key: 'zone', label: { fr: 'Zone', en: 'Zone' }, items: ZONES },
  { key: 'langue', label: { fr: 'Langue', en: 'Language' }, items: LANGUAGES },
  { key: 'modalite', label: { fr: 'Modalité', en: 'Modality' }, items: MODALITIES },
]

export function StoreSidebar({
  filters,
  lang,
  onCategory,
  onToggleFacet,
  categoryLabels,
}: {
  filters: StoreFilters
  lang: Lang
  onCategory: (key: string) => void
  onToggleFacet: (group: MultiKey, value: string) => void
  /** Optional short labels for the rail only (keyed by category key), so the
   *  sidebar can read more compactly without changing the global taxonomy. */
  categoryLabels?: Record<string, string>
}) {
  return (
    <nav
      aria-label={lang === 'fr' ? 'Navigation des missions' : 'Missions navigation'}
      className="scrollbar-hide flex max-h-[calc(100vh-7rem)] flex-col gap-7 overflow-y-auto pr-1"
    >
      {/* GROUP 1 — Catégories */}
      <Group title={lang === 'fr' ? 'Catégories' : 'Categories'}>
        <ul className="flex flex-col gap-0.5">
          {CATEGORY_FACETS.map((c) => (
            <li key={c.key}>
              <RowButton
                label={categoryLabels?.[c.key] ?? c.label[lang]}
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
        </div>
      </Group>
    </nav>
  )
}

function Group({ title, tooltip, children }: { title: string; tooltip?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 px-2.5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--store-muted)]">{title}</p>
        {tooltip && (
          <span className="group/tip relative inline-flex">
            <button
              type="button"
              tabIndex={0}
              aria-label={tooltip}
              className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[var(--store-muted)]/70 transition-colors hover:text-[#D10E63] focus-visible:text-[#D10E63] focus-visible:outline-none"
            >
              <Info className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <span
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 w-56 -translate-x-1/2 rounded-lg bg-[#241F1D] px-3 py-2 text-[11px] font-medium normal-case leading-snug tracking-normal text-[#F3EFE6] opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
            >
              {tooltip}
            </span>
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function RowButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-2 rounded-[7px] px-2.5 py-1.5 text-left text-[13px] leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${
        active
          ? 'bg-[#FCEAF2] font-semibold text-[#AD0C53]'
          : 'text-[var(--store-muted)] hover:bg-[var(--store-text)]/[0.04] hover:text-[var(--store-text)]'
      }`}
    >
      <span className="min-w-0">{label}</span>
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


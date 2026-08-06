'use client'

import { Info } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  TYPE_FACETS,
  CREATOR_FACETS,
  contextualFacets,
  editorFacets,
  TYPE_LABELS_PLURAL,
  type StoreFilters as Filters,
  type StoreType,
} from '@/lib/store-catalog'

// The filter rail, reused verbatim by the desktop sidebar and the mobile sheet.
// Section 5: never show all three types' own facets at once — the contextual
// group only appears once a single type is selected.
export function StoreFilters({
  filters,
  lang,
  onType,
  onCreator,
  onFacet,
  onEditor,
}: {
  filters: Filters
  lang: Lang
  onType: (key: string) => void
  onCreator: (key: string) => void
  onFacet: (key: string) => void
  onEditor: (key: string) => void
}) {
  const singleType = filters.type !== 'all' ? (filters.type as StoreType) : null
  const facets = singleType ? contextualFacets(singleType) : []
  const editors = filters.type === 'application' ? editorFacets() : []

  const facetTitle =
    singleType === 'profil'
      ? lang === 'fr'
        ? 'Domaine'
        : 'Domain'
      : lang === 'fr'
        ? 'Catégorie'
        : 'Category'

  return (
    <nav
      aria-label={lang === 'fr' ? 'Filtres du Store' : 'Store filters'}
      className="flex flex-col gap-7"
    >
      {/* TYPE — always first (section 5) */}
      <Group title={lang === 'fr' ? 'Type' : 'Type'}>
        <ul className="flex flex-col gap-0.5">
          {TYPE_FACETS.map((o) => (
            <li key={o.key}>
              <RowButton label={o.label[lang]} active={filters.type === o.key} onClick={() => onType(o.key)} />
            </li>
          ))}
        </ul>
      </Group>

      {/* CRÉÉ PAR (section 6) */}
      <Group
        title={lang === 'fr' ? 'Créé par' : 'Created by'}
        tooltip={lang === 'fr' ? 'Filtrez les éléments selon leur créateur.' : 'Filter items by their creator.'}
      >
        <ul className="flex flex-col gap-0.5">
          {CREATOR_FACETS.map((o) => (
            <li key={o.key}>
              <RowButton label={o.label[lang]} active={filters.creator === o.key} onClick={() => onCreator(o.key)} />
            </li>
          ))}
        </ul>
      </Group>

      {/* Contextual facet — only when a single type is selected (section 7) */}
      {singleType && facets.length > 0 && (
        <Group title={facetTitle}>
          <ul className="flex flex-col gap-0.5">
            <li>
              <RowButton
                label={lang === 'fr' ? `Tous les ${TYPE_LABELS_PLURAL[singleType][lang].toLowerCase()}` : 'All'}
                active={filters.facet === 'all'}
                onClick={() => onFacet('all')}
              />
            </li>
            {facets.map((f) => (
              <li key={f.key}>
                <RowButton label={f.label[lang]} active={filters.facet === f.key} onClick={() => onFacet(f.key)} />
              </li>
            ))}
          </ul>
        </Group>
      )}

      {/* ÉDITEUR — applications only, values present in the results (section 7) */}
      {editors.length > 0 && (
        <Group title={lang === 'fr' ? 'Éditeur' : 'Editor'}>
          <ul className="flex flex-col gap-0.5">
            <li>
              <RowButton
                label={lang === 'fr' ? 'Tous' : 'All'}
                active={filters.editor === 'all'}
                onClick={() => onEditor('all')}
              />
            </li>
            {editors.map((e) => (
              <li key={e.key}>
                <RowButton label={e.label[lang]} active={filters.editor === e.key} onClick={() => onEditor(e.key)} />
              </li>
            ))}
          </ul>
        </Group>
      )}
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

function RowButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-[36px] w-full items-center gap-2 rounded-[7px] px-2.5 py-1.5 text-left text-[13px] leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${
        active
          ? 'bg-[#FCEAF2] font-semibold text-[#AD0C53]'
          : 'text-[var(--store-muted)] hover:bg-[var(--store-text)]/[0.04] hover:text-[var(--store-text)]'
      }`}
    >
      <span className="min-w-0">{label}</span>
    </button>
  )
}

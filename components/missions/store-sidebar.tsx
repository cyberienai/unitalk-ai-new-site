'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  NEEDS,
  SECTORS,
  ZONES,
  MODALITIES,
  type Facet,
  type StoreFilters,
} from '@/lib/missions-store'

type GroupKey = keyof StoreFilters

const GROUP_LABELS: Record<GroupKey, { fr: string; en: string }> = {
  need: { fr: 'Besoin', en: 'Need' },
  sector: { fr: 'Secteur', en: 'Sector' },
  zone: { fr: 'Zone', en: 'Zone' },
  modalite: { fr: 'Modalité', en: 'Modality' },
}

const ALL_LABELS: Record<GroupKey, { fr: string; en: string }> = {
  need: { fr: 'Toutes les missions', en: 'All missions' },
  sector: { fr: 'Tous les secteurs', en: 'All sectors' },
  zone: { fr: 'Toutes les zones', en: 'All zones' },
  modalite: { fr: 'Toutes les modalités', en: 'All modalities' },
}

function FilterGroup({
  groupKey,
  items,
  value,
  lang,
  onSelect,
}: {
  groupKey: GroupKey
  items: Facet[]
  value: string
  lang: Lang
  onSelect: (key: GroupKey, val: string) => void
}) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--store-muted)]"
      >
        {GROUP_LABELS[groupKey][lang]}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <ul className="mt-1 flex flex-col gap-0.5">
          <li>
            <FacetButton
              label={ALL_LABELS[groupKey][lang]}
              active={value === 'all'}
              onClick={() => onSelect(groupKey, 'all')}
            />
          </li>
          {items.map((f) => (
            <li key={f.key}>
              <FacetButton
                label={f.label[lang]}
                active={value === f.key}
                onClick={() => onSelect(groupKey, f.key)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FacetButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full rounded-[7px] px-2.5 py-1.5 text-left text-[13px] transition-colors ${
        active
          ? 'bg-[#FCEAF2] font-semibold text-[#AD0C53]'
          : 'text-[var(--store-text)] hover:bg-[var(--store-text)]/[0.04]'
      }`}
    >
      {label}
    </button>
  )
}

export function StoreSidebar({
  filters,
  lang,
  onSelect,
}: {
  filters: StoreFilters
  lang: Lang
  onSelect: (key: GroupKey, val: string) => void
}) {
  return (
    <nav aria-label={lang === 'fr' ? 'Filtres des missions' : 'Mission filters'} className="flex flex-col gap-6">
      <FilterGroup groupKey="need" items={NEEDS as Facet[]} value={filters.need} lang={lang} onSelect={onSelect} />
      <FilterGroup groupKey="sector" items={SECTORS} value={filters.sector} lang={lang} onSelect={onSelect} />
      <FilterGroup groupKey="zone" items={ZONES} value={filters.zone} lang={lang} onSelect={onSelect} />
      <FilterGroup groupKey="modalite" items={MODALITIES} value={filters.modalite} lang={lang} onSelect={onSelect} />
    </nav>
  )
}

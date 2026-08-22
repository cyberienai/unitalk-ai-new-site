'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  SECTORS,
  ZONES,
  LANGUAGES,
  MODALITIES,
  type Facet,
  type StoreFilters,
} from '@/lib/missions-store'
import type { MultiKey } from './store-sidebar'

const GROUPS: { key: MultiKey; label: { fr: string; en: string }; items: Facet[] }[] = [
  { key: 'secteur', label: { fr: 'Secteur', en: 'Sector' }, items: SECTORS },
  { key: 'zone', label: { fr: 'Zone', en: 'Zone' }, items: ZONES },
  { key: 'langue', label: { fr: 'Langue', en: 'Language' }, items: LANGUAGES },
  { key: 'modalite', label: { fr: 'Modalité', en: 'Modality' }, items: MODALITIES },
]

export function FilterSheet({
  open,
  filters,
  lang,
  onToggleFacet,
  onClear,
  onClose,
}: {
  open: boolean
  filters: StoreFilters
  lang: Lang
  onToggleFacet: (group: MultiKey, value: string) => void
  onClear: () => void
  onClose: () => void
}) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#241F1D]/40 lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'fr' ? 'Filtres' : 'Filters'}
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[1.5rem] bg-[var(--store-page)] p-5 lg:hidden"
          >
            <div className="sticky -top-5 -mx-5 mb-4 flex items-center justify-between border-b border-[var(--store-line)] bg-[var(--store-page)] px-5 pb-3 pt-1">
              <h2 className="font-sf text-lg font-bold text-[var(--store-text)]">
                {lang === 'fr' ? 'Filtres' : 'Filters'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
                className="rounded-lg p-1.5 text-[var(--store-muted)] hover:bg-[var(--store-text)]/[0.06]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {GROUPS.map((g) => (
                <div key={g.key}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--store-muted)]">
                    {g.label[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((f) => (
                      <Chip
                        key={f.key}
                        label={f.label[lang]}
                        active={filters[g.key].includes(f.key)}
                        onClick={() => onToggleFacet(g.key, f.key)}
                      />
                    ))}
                  </div>
                </div>
              ))}

            </div>

            <div className="sticky bottom-0 -mx-5 mt-6 flex gap-3 border-t border-[var(--store-line)] bg-[var(--store-page)] px-5 pb-1 pt-3">
              <button
                type="button"
                onClick={onClear}
                className="flex-1 rounded-xl border border-[var(--store-line)] px-4 py-3 text-sm font-semibold text-[var(--store-text)]"
              >
                {lang === 'fr' ? 'Réinitialiser' : 'Reset'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-[#D10E63] px-4 py-3 text-sm font-bold text-[#FBF9F3]"
              >
                {lang === 'fr' ? 'Voir les missions' : 'View missions'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[44px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active ? 'bg-[#FCEAF2] text-[#AD0C53] ring-1 ring-[#D10E63]/25' : 'border border-[var(--store-line)] text-[var(--store-text)]'
      }`}
    >
      {label}
    </button>
  )
}

'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import type { StoreFilters as Filters } from '@/lib/store-catalog'
import { StoreFilters } from './store-filters'

// Mobile bottom sheet: same shell as the Missions filter sheet, but it hosts the
// shared StoreFilters rail so desktop and mobile stay in lockstep.
export function StoreFilterSheet({
  open,
  filters,
  lang,
  onType,
  onCreator,
  onFacet,
  onEditor,
  onClear,
  onClose,
}: {
  open: boolean
  filters: Filters
  lang: Lang
  onType: (key: string) => void
  onCreator: (key: string) => void
  onFacet: (key: string) => void
  onEditor: (key: string) => void
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

            <StoreFilters
              filters={filters}
              lang={lang}
              onType={onType}
              onCreator={onCreator}
              onFacet={onFacet}
              onEditor={onEditor}
            />

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
                {lang === 'fr' ? 'Voir les résultats' : 'View results'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useLanguage } from '@/lib/language-context'
import { AlmaPanel } from './alma-panel'

type AlmaContextValue = { openAlma: () => void; closeAlma: () => void }

const AlmaContext = createContext<AlmaContextValue | undefined>(undefined)

/**
 * Mounts a single Alma panel for the whole homepage and lets any CTA open it
 * via useAlma().openAlma(). Keeping one instance avoids duplicated dialogs and
 * keeps focus/scroll-lock behaviour predictable.
 */
export function AlmaProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <AlmaContext.Provider value={{ openAlma: () => setOpen(true), closeAlma: () => setOpen(false) }}>
      {children}
      <AlmaPanel open={open} onClose={() => setOpen(false)} lang={lang} />
    </AlmaContext.Provider>
  )
}

export function useAlma() {
  const ctx = useContext(AlmaContext)
  if (!ctx) throw new Error('useAlma must be used within an AlmaProvider')
  return ctx
}

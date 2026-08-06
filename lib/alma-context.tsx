'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type AlmaContextValue = {
  isOpen: boolean
  openAlma: () => void
  closeAlma: () => void
  toggleAlma: () => void
  // When true, the floating launcher hides — e.g. a page has a mission preview
  // open or an on-screen Alma CTA that the launcher must not overlap.
  launcherSuppressed: boolean
  setLauncherSuppressed: (v: boolean) => void
}

const AlmaContext = createContext<AlmaContextValue | undefined>(undefined)

export function AlmaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [launcherSuppressed, setLauncherSuppressed] = useState(false)

  return (
    <AlmaContext.Provider
      value={{
        isOpen,
        openAlma: () => setIsOpen(true),
        closeAlma: () => setIsOpen(false),
        toggleAlma: () => setIsOpen((v) => !v),
        launcherSuppressed,
        setLauncherSuppressed,
      }}
    >
      {children}
    </AlmaContext.Provider>
  )
}

export function useAlma() {
  const context = useContext(AlmaContext)
  if (context === undefined) {
    throw new Error('useAlma must be used within an AlmaProvider')
  }
  return context
}

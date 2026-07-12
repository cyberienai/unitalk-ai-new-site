'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type AlmaContextValue = {
  isOpen: boolean
  openAlma: () => void
  closeAlma: () => void
  toggleAlma: () => void
}

const AlmaContext = createContext<AlmaContextValue | undefined>(undefined)

export function AlmaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlmaContext.Provider
      value={{
        isOpen,
        openAlma: () => setIsOpen(true),
        closeAlma: () => setIsOpen(false),
        toggleAlma: () => setIsOpen((v) => !v),
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

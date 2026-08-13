'use client'

import { createContext, useContext, useState } from 'react'
import type { AiCapacityId, PricingDraft } from '@/lib/unitalk-pricing'

type PricingDraftState = {
  draft: PricingDraft
  setCollaborators: (value: number) => void
  setCapacity: (value: AiCapacityId) => void
  setCoCreators: (value: number) => void
}

const PricingDraftContext = createContext<PricingDraftState | null>(null)

export function PricingDraftProvider({ initialDraft, children }: { initialDraft: PricingDraft; children: React.ReactNode }) {
  const [draft, setDraft] = useState(initialDraft)
  return <PricingDraftContext.Provider value={{ draft, setCollaborators: (collaborators) => setDraft((current) => ({ ...current, collaborators })), setCapacity: (capacity) => setDraft((current) => ({ ...current, capacity })), setCoCreators: (coCreators) => setDraft((current) => ({ ...current, coCreators })) }}>{children}</PricingDraftContext.Provider>
}

export function usePricingDraft() {
  const context = useContext(PricingDraftContext)
  if (!context) throw new Error('usePricingDraft must be used within PricingDraftProvider')
  return context
}

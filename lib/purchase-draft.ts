import type { PricingDraft } from '@/lib/unitalk-pricing'
import type { CompanyFact, MissionInfo } from '@/components/discover/types'

export const PURCHASE_DRAFT_COOKIE = 'unitalk_purchase_draft'

export type PurchaseDraft = {
  id: string
  pricing?: PricingDraft
  onboarding?: {
    company: CompanyFact[]
    mission: MissionInfo
    profile: { fr: string; en: string }
    collaboratorName: string
    collaboratorTemplateSlug?: string
    confirmedAt: string
  }
  updatedAt: string
}

export function parsePurchaseDraft(raw: string | undefined): PurchaseDraft | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<PurchaseDraft>
    if (!parsed.id || typeof parsed.id !== 'string') return null
    return parsed as PurchaseDraft
  } catch {
    return null
  }
}

export function onboardingComplete(draft: PurchaseDraft | null): boolean {
  const value = draft?.onboarding
  if (!value) return false
  const domain = value.company.find((fact) => fact.key === 'domain')?.value.trim()
  const company = value.company.find((fact) => fact.key === 'name')?.value.trim()
  return Boolean(domain && company && value.mission.title.trim() && value.mission.target.trim() && value.mission.result.trim() && value.mission.validation.trim() && value.collaboratorName.trim() && value.confirmedAt)
}

export type OrganizationTierId = 'solo' | 'team' | 'business'
export type UsageModeId = 'included' | 'credits' | 'byok' | 'hybrid'
export type AiCapacityId = 'included' | 'byok' | 'quarterTime' | 'halfTime' | 'fullTime'

export const PRICING_DRAFT_COOKIE = 'unitalk_pricing_draft'

export const unitalkPricing = {
  version: '2026-08-22',
  trial: { days: 7, tokens: 1_000_000 },
  organization: {
    solo: { label: 'Solo', users: '1 utilisateur', monthlyPrice: 0, includedCredits: 0, creditFrequency: 'none' },
    team: { label: 'Équipe', users: 'Jusqu’à 10 utilisateurs', monthlyPrice: 49, includedCredits: 0, creditFrequency: 'none' },
    business: { label: 'Entreprise', users: 'Jusqu’à 100 utilisateurs', monthlyPrice: 299, includedCredits: 0, creditFrequency: 'none' },
  },
  aiCollaborator: { monthlyPrice: 49, includedTokens: 5_000_000, includedPhoneMinutes: 60, min: 0, max: 100 },
  aiCocreator: { monthlyPrice: 50, min: 0, max: 20 },
  aiCapacity: {
    included: { label: 'Incluse', tokens: 1_000_000, monthlyPrice: 0 },
    byok: { label: 'BYOK', tokens: 0, monthlyPrice: 0 },
    quarterTime: { label: 'Crédits prépayés', tokens: 1_000_000, monthlyPrice: 25 },
    halfTime: { label: 'Crédits prépayés', tokens: 2_000_000, monthlyPrice: 50 },
    fullTime: { label: 'Crédits prépayés', tokens: 4_000_000, monthlyPrice: 100 },
  },
  credits: { minimumTopUp: 25 },
} as const

export const organizationTierIds = ['solo', 'team', 'business'] as const

export type PricingDraft = {
  source: 'tarifs'
  organizationTier: OrganizationTierId
  collaborators: number
  usageMode: UsageModeId
  creditBudget: number
  capacity: AiCapacityId
  coCreators: number
  selectedProfile?: string
  priceVersion: string
}

export type PricingDraftEnvelope = { id: string; draft: PricingDraft }

const ORGANIZATION_TIERS: readonly OrganizationTierId[] = organizationTierIds
const USAGE_MODES: UsageModeId[] = ['included', 'credits', 'byok', 'hybrid']
const CAPACITIES: AiCapacityId[] = ['included', 'byok', 'quarterTime', 'halfTime', 'fullTime']

export function normalizePricingDraft(input: Partial<PricingDraft> & { capacity?: string; coCreators?: number }): PricingDraft {
  const collaborators = Number.isFinite(input.collaborators)
    ? Math.min(unitalkPricing.aiCollaborator.max, Math.max(unitalkPricing.aiCollaborator.min, Math.floor(input.collaborators!)))
    : 1
  const usageMode: UsageModeId = USAGE_MODES.includes(input.usageMode as UsageModeId) ? input.usageMode as UsageModeId : 'included'
  const requestedBudget = Number.isFinite(input.creditBudget) ? Math.floor(input.creditBudget!) : 0
  const creditBudget = usageMode === 'credits' || usageMode === 'hybrid' ? Math.max(unitalkPricing.credits.minimumTopUp, requestedBudget) : 0
  const capacity = usageMode === 'included'
    ? 'included'
    : usageMode === 'byok'
      ? 'byok'
    : CAPACITIES.includes(input.capacity as AiCapacityId) && input.capacity !== 'byok' && input.capacity !== 'included'
      ? input.capacity as AiCapacityId
      : 'quarterTime'
  const coCreators = Number.isFinite(input.coCreators) ? Math.min(20, Math.max(0, Math.floor(input.coCreators!))) : 0
  const selectedProfile = typeof input.selectedProfile === 'string' && input.selectedProfile.trim() ? input.selectedProfile.trim() : undefined
  return {
    source: 'tarifs',
    organizationTier: ORGANIZATION_TIERS.includes(input.organizationTier as OrganizationTierId) ? input.organizationTier as OrganizationTierId : 'solo',
    collaborators,
    usageMode,
    creditBudget,
    capacity,
    coCreators,
    ...(selectedProfile ? { selectedProfile } : {}),
    priceVersion: unitalkPricing.version,
  }
}

export function parsePricingDraftEnvelope(raw: string | undefined): PricingDraftEnvelope | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<PricingDraftEnvelope>
    if (!parsed.id || typeof parsed.id !== 'string' || !parsed.draft) return null
    return { id: parsed.id, draft: normalizePricingDraft(parsed.draft) }
  } catch {
    return null
  }
}

export function organizationMonthlyPrice(tier: OrganizationTierId): number {
  return unitalkPricing.organization[tier].monthlyPrice
}

export function recurringMonthlyTotal(tier: OrganizationTierId, collaborators: number): number {
  const draft = normalizePricingDraft({ organizationTier: tier, collaborators })
  return organizationMonthlyPrice(draft.organizationTier) + draft.collaborators * unitalkPricing.aiCollaborator.monthlyPrice
}

export function pricingRecurringTotal(draft: Pick<PricingDraft, 'organizationTier' | 'collaborators'> & Partial<Pick<PricingDraft, 'coCreators'>>): number {
  return organizationMonthlyPrice(draft.organizationTier)
    + draft.collaborators * unitalkPricing.aiCollaborator.monthlyPrice
}

export type PricingBreakdown = {
  organizationBase: number
  organizationDiscount: number
  collaboratorsBase: number
  capacityBase: number
  capacityDiscount: number
  coCreatorsBase: number
  subtotal: number
  promotions: number
  total: number
}

export function configurationBreakdownAt(collaborators: number, capacity: AiCapacityId, coCreators: number, _date: Date): PricingBreakdown {
  void _date
  const collaboratorsBase = Math.max(0, collaborators) * unitalkPricing.aiCollaborator.monthlyPrice
  const capacityBase = capacity === 'byok' || capacity === 'included' ? 0 : unitalkPricing.aiCapacity[capacity].monthlyPrice
  const coCreatorsBase = Math.max(0, coCreators) * unitalkPricing.aiCocreator.monthlyPrice
  const organizationBase = unitalkPricing.organization.solo.monthlyPrice
  const subtotal = organizationBase + collaboratorsBase + capacityBase + coCreatorsBase
  return { organizationBase, organizationDiscount: 0, collaboratorsBase, capacityBase, capacityDiscount: 0, coCreatorsBase, subtotal, promotions: 0, total: subtotal }
}

export function configurationTotalAt(collaborators: number, capacity: AiCapacityId, coCreators: number, date: Date): number {
  return configurationBreakdownAt(collaborators, capacity, coCreators, date).total
}

export function configurationTotal(collaborators: number, capacity: AiCapacityId, _alma = false, cocreator = false): number {
  void _alma
  return configurationTotalAt(collaborators, capacity, cocreator ? 1 : 0, new Date())
}

export function capacityMonthlyPrice(id: AiCapacityId): number {
  return unitalkPricing.aiCapacity[id].monthlyPrice
}

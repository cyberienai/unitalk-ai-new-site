export type AiCapacityId = 'byok' | 'quarterTime' | 'halfTime' | 'fullTime'

export const PRICING_DRAFT_COOKIE = 'unitalk_pricing_draft'

export const unitalkPricing = {
  version: '2026-08-13',
  trial: { days: 7, tokens: 1_000_000 },
  organization: { monthlyPrice: 50, freeUntil: '2026-12-21' },
  aiCollaborator: { monthlyPrice: 49, min: 1, max: 20 },
  aiCocreator: { monthlyPrice: 50, min: 0, max: 20 },
  aiCapacity: {
    byok: { label: 'BYOK', tokens: 0, monthlyPrice: 0 },
    quarterTime: { label: 'Quart-temps', tokens: 5_000_000, monthlyPrice: 25, freeUntil: '2026-12-31' },
    halfTime: { label: 'Mi-temps', tokens: 10_000_000, monthlyPrice: 50 },
    fullTime: { label: 'Temps plein', tokens: 20_000_000, monthlyPrice: 100 },
  },
} as const

export type PricingDraft = {
  source: 'tarifs'
  collaborators: number
  capacity: AiCapacityId
  coCreators: number
  priceVersion: string
}

export type PricingDraftEnvelope = { id: string; draft: PricingDraft }

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

const CAPACITIES: AiCapacityId[] = ['byok', 'quarterTime', 'halfTime', 'fullTime']

function utcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

function after(date: Date, iso: string): boolean {
  return utcDay(date) > Date.parse(`${iso}T00:00:00Z`)
}

export function normalizePricingDraft(input: Partial<PricingDraft>): PricingDraft {
  const collaborators = Number.isFinite(input.collaborators)
    ? Math.min(unitalkPricing.aiCollaborator.max, Math.max(unitalkPricing.aiCollaborator.min, Math.floor(input.collaborators!)))
    : unitalkPricing.aiCollaborator.min
  const coCreators = Number.isFinite(input.coCreators)
    ? Math.min(unitalkPricing.aiCocreator.max, Math.max(unitalkPricing.aiCocreator.min, Math.floor(input.coCreators!)))
    : unitalkPricing.aiCocreator.min
  return {
    source: 'tarifs',
    collaborators,
    capacity: CAPACITIES.includes(input.capacity as AiCapacityId) ? input.capacity as AiCapacityId : 'quarterTime',
    coCreators,
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

export function organizationPriceAt(date: Date): number {
  return after(date, unitalkPricing.organization.freeUntil) ? unitalkPricing.organization.monthlyPrice : 0
}

export function capacityPriceAt(id: AiCapacityId, date: Date): number {
  const capacity = unitalkPricing.aiCapacity[id]
  return 'freeUntil' in capacity && !after(date, capacity.freeUntil) ? 0 : capacity.monthlyPrice
}

export function configurationBreakdownAt(collaborators: number, capacity: AiCapacityId, coCreators: number, date: Date): PricingBreakdown {
  const draft = normalizePricingDraft({ collaborators, capacity, coCreators })
  const organizationBase = unitalkPricing.organization.monthlyPrice
  const organizationDiscount = organizationBase - organizationPriceAt(date)
  const collaboratorsBase = draft.collaborators * unitalkPricing.aiCollaborator.monthlyPrice
  const capacityBase = draft.collaborators * unitalkPricing.aiCapacity[draft.capacity].monthlyPrice
  const capacityDiscount = capacityBase - draft.collaborators * capacityPriceAt(draft.capacity, date)
  const coCreatorsBase = draft.coCreators * unitalkPricing.aiCocreator.monthlyPrice
  const subtotal = organizationBase + collaboratorsBase + capacityBase + coCreatorsBase
  const promotions = organizationDiscount + capacityDiscount
  return { organizationBase, organizationDiscount, collaboratorsBase, capacityBase, capacityDiscount, coCreatorsBase, subtotal, promotions, total: subtotal - promotions }
}

export function configurationTotalAt(collaborators: number, capacity: AiCapacityId, coCreators: number, date: Date): number {
  return configurationBreakdownAt(collaborators, capacity, coCreators, date).total
}

// Compatibility adapters for existing pricing consumers.
export function configurationTotal(collaborators: number, capacity: AiCapacityId, _alma = false, cocreator = false, promotional = true): number {
  return configurationTotalAt(collaborators, capacity, cocreator ? 1 : 0, promotional ? new Date('2026-12-01T00:00:00Z') : new Date('2027-01-01T00:00:00Z'))
}

export function capacityMonthlyPrice(id: AiCapacityId, promotional = true): number {
  return capacityPriceAt(id, promotional ? new Date('2026-12-01T00:00:00Z') : new Date('2027-01-01T00:00:00Z'))
}

export function isPromotionalFree(freeUntil: string | undefined, now = new Date()): boolean {
  return Boolean(freeUntil && !after(now, freeUntil))
}

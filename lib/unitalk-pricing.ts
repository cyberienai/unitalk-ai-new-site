export type AiCapacityId = 'byok' | 'quarterTime' | 'halfTime' | 'fullTime'

export const unitalkPricing = {
  trial: { days: 7, tokens: 1_000_000 },
  organization: { monthlyPrice: 50, freeUntil: '2026-12-21' },
  aiCollaborator: { monthlyPrice: 49 },
  aiCocreator: { monthlyPrice: 50, optional: true },
  alma: { monthlyPricePerCollaborator: 50, freeUntil: '2026-12-21' },
  aiCapacity: {
    byok: { label: 'BYOK', tokens: 0, monthlyPrice: 0 },
    quarterTime: { label: 'Quart-temps', tokens: 5_000_000, monthlyPrice: 25, freeUntil: '2026-12-31' },
    halfTime: { label: 'Mi-temps', tokens: 10_000_000, monthlyPrice: 50 },
    fullTime: { label: 'Temps plein', tokens: 20_000_000, monthlyPrice: 100 },
  },
} as const

export function isPromotionalFree(freeUntil: string | undefined, now = new Date()): boolean {
  return Boolean(freeUntil && now <= new Date(`${freeUntil}T23:59:59Z`))
}

export function capacityMonthlyPrice(id: AiCapacityId, promotional = true): number {
  const capacity = unitalkPricing.aiCapacity[id]
  return promotional && 'freeUntil' in capacity && isPromotionalFree(capacity.freeUntil) ? 0 : capacity.monthlyPrice
}

export function configurationTotal(quantity: number, capacity: AiCapacityId, alma: boolean, cocreator: boolean, promotional = true): number {
  const organization = promotional && isPromotionalFree(unitalkPricing.organization.freeUntil) ? 0 : unitalkPricing.organization.monthlyPrice
  const collaborator = quantity * unitalkPricing.aiCollaborator.monthlyPrice
  const capacityTotal = quantity * capacityMonthlyPrice(capacity, promotional)
  const almaTotal = alma ? quantity * (promotional && isPromotionalFree(unitalkPricing.alma.freeUntil) ? 0 : unitalkPricing.alma.monthlyPricePerCollaborator) : 0
  const cocreatorTotal = cocreator ? unitalkPricing.aiCocreator.monthlyPrice : 0
  return organization + collaborator + capacityTotal + almaTotal + cocreatorTotal
}

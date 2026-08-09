/**
 * Centralized pricing configuration for the /tarifs page.
 *
 * SINGLE SOURCE OF TRUTH: every price, tier and pack shown on the pricing page
 * must come from here. If a value is not defined (or a pack is disabled), the
 * corresponding option is simply not rendered — never a fake or "to confirm"
 * placeholder.
 */

export type QuantityTier = {
  min: number
  /** Omitted for the open-ended top tier (e.g. 10+). */
  max?: number
  monthlyUnitPrice: number
  label: string
}

export type CreditPack = {
  id: string
  name: string
  price: number
  credits: number
  description: string
  enabled: boolean
}

export type BillingCycle = 'monthly' | 'annual'
export type UsageMode = 'credits' | 'byok' | 'hybrid'

export const pricingConfig = {
  /** Months offered on the annual plan (annual = (12 − annualFreeMonths) × monthly). */
  annualFreeMonths: 2,
  /** Reference single-unit monthly price, used as the "savings vs 1" baseline. */
  baseMonthlyPrice: 49,
  quantityTiers: [
    { min: 1, max: 1, monthlyUnitPrice: 49, label: '1' },
    { min: 2, max: 4, monthlyUnitPrice: 45, label: '2\u20134' },
    { min: 5, max: 9, monthlyUnitPrice: 39, label: '5\u20139' },
    { min: 10, monthlyUnitPrice: 35, label: '10+' },
  ] as QuantityTier[],
  /**
   * Credit packs. None are contractually validated yet, so the list is empty
   * and the UI shows "Aucun pack pour le moment". Add packs here with
   * enabled: true once prices and volumes are confirmed.
   * TODO(pricing): fill validated packs — do NOT surface unvalidated values.
   */
  creditPacks: [] as CreditPack[],
}

/** Clamp a raw quantity to the allowed range (minimum of 1). */
export function normalizeQuantity(qty: number): number {
  if (!Number.isFinite(qty)) return 1
  return Math.max(1, Math.floor(qty))
}

/** The tier that applies to a given quantity. */
export function tierForQuantity(qty: number): QuantityTier {
  const q = normalizeQuantity(qty)
  const tiers = pricingConfig.quantityTiers
  return (
    tiers.find((t) => q >= t.min && (t.max === undefined || q <= t.max)) ??
    tiers[tiers.length - 1]
  )
}

/** The next (cheaper) tier after the one that applies to `qty`, or null. */
export function nextTier(qty: number): QuantityTier | null {
  const current = tierForQuantity(qty)
  const idx = pricingConfig.quantityTiers.indexOf(current)
  return idx >= 0 && idx < pricingConfig.quantityTiers.length - 1
    ? pricingConfig.quantityTiers[idx + 1]
    : null
}

/** Recurring monthly subtotal = quantity × tier unit price. */
export function monthlySubtotal(qty: number): number {
  const q = normalizeQuantity(qty)
  return q * tierForQuantity(q).monthlyUnitPrice
}

/** Number of billed months on the annual plan (12 − offered months). */
export function billedMonthsPerYear(): number {
  return 12 - pricingConfig.annualFreeMonths
}

/** Total actually charged for a full year on the annual plan. */
export function annualTotal(qty: number): number {
  return monthlySubtotal(qty) * billedMonthsPerYear()
}

/** Annual plan expressed as an equivalent monthly amount. */
export function annualEquivalentMonthly(qty: number): number {
  return annualTotal(qty) / 12
}

/** Yearly savings from paying annually vs 12 monthly payments. */
export function annualSavings(qty: number): number {
  return monthlySubtotal(qty) * 12 - annualTotal(qty)
}

/** Monthly savings from the quantity discount vs the single-unit base price. */
export function quantitySavings(qty: number): number {
  const q = normalizeQuantity(qty)
  return q * pricingConfig.baseMonthlyPrice - monthlySubtotal(q)
}

/** Only the packs that are validated and enabled. */
export function enabledCreditPacks(): CreditPack[] {
  return pricingConfig.creditPacks.filter((p) => p.enabled)
}

/** A validated, enabled pack by id (or null). */
export function creditPackById(id: string | null | undefined): CreditPack | null {
  if (!id) return null
  return enabledCreditPacks().find((p) => p.id === id) ?? null
}

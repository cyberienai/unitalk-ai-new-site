/**
 * Pure pricing calculations for the /tarifs configurator.
 *
 * Every function is deterministic and side-effect free so it can be unit
 * tested in isolation. All money is expressed in euros as plain numbers.
 */

import { pricingConfig, type QuantityTier, type BillingCycle, type UsageMode } from './pricing-config'

/** Clamp a raw quantity to the allowed range (minimum of 1, integer). */
export function normalizeQuantity(qty: number): number {
  if (!Number.isFinite(qty)) return 1
  return Math.max(1, Math.floor(qty))
}

/** The tier that applies to a given quantity. */
export function getTierForQuantity(qty: number): QuantityTier {
  const q = normalizeQuantity(qty)
  const tiers = pricingConfig.quantityTiers
  return tiers.find((t) => q >= t.min && (t.max === undefined || q <= t.max)) ?? tiers[tiers.length - 1]
}

/** The next (cheaper) tier after the one that applies to `qty`, or null. */
export function getNextTier(qty: number): QuantityTier | null {
  const current = getTierForQuantity(qty)
  const idx = pricingConfig.quantityTiers.indexOf(current)
  return idx >= 0 && idx < pricingConfig.quantityTiers.length - 1
    ? pricingConfig.quantityTiers[idx + 1]
    : null
}

/** Recurring monthly subscription = quantity × tier unit price. */
export function calculateMonthlySubscription(qty: number): number {
  const q = normalizeQuantity(qty)
  return q * getTierForQuantity(q).monthlyUnitPrice
}

/** Monthly savings from the quantity discount vs the single-unit base price. */
export function calculateQuantitySavings(qty: number): number {
  const q = normalizeQuantity(qty)
  return q * pricingConfig.baseMonthlyPrice - calculateMonthlySubscription(q)
}

/** Number of billed months on the annual plan (12 − offered months). */
export function billedMonthsPerYear(): number {
  return 12 - pricingConfig.annualFreeMonths
}

/** Total actually charged for a full year on the annual plan. */
export function calculateAnnualSubscription(qty: number): number {
  return calculateMonthlySubscription(qty) * billedMonthsPerYear()
}

/** Annual plan expressed as an equivalent monthly amount. */
export function calculateAnnualEquivalentMonthly(qty: number): number {
  return calculateAnnualSubscription(qty) / 12
}

/** Yearly savings from paying annually vs 12 monthly payments. */
export function calculateAnnualSavings(qty: number): number {
  return calculateMonthlySubscription(qty) * 12 - calculateAnnualSubscription(qty)
}

/**
 * The monthly credit budget that counts toward the Unitalk total.
 * BYOK never contributes a credit budget; credits / hybrid use the selection.
 */
export function calculateMonthlyCreditBudget(usageMode: UsageMode | null, selectedCreditBudget: number | null): number {
  if (usageMode === 'byok') return 0
  return selectedCreditBudget ?? 0
}

/**
 * The estimated recurring monthly total (subscription expressed per month +
 * credit budget). Annual shows the plan's monthly equivalent, never the credits
 * discounted.
 */
export function calculateEstimatedMonthlyTotal(
  qty: number,
  billingCycle: BillingCycle,
  usageMode: UsageMode | null,
  selectedCreditBudget: number | null,
): number {
  const budget = calculateMonthlyCreditBudget(usageMode, selectedCreditBudget)
  const plan =
    billingCycle === 'annual' ? calculateAnnualEquivalentMonthly(qty) : calculateMonthlySubscription(qty)
  return plan + budget
}

/**
 * The amount actually charged after the trial. Annual bills the full year up
 * front (plus the first month of credits); monthly bills one month.
 */
export function calculateAmountDueAfterTrial(
  qty: number,
  billingCycle: BillingCycle,
  usageMode: UsageMode | null,
  selectedCreditBudget: number | null,
): number {
  const budget = calculateMonthlyCreditBudget(usageMode, selectedCreditBudget)
  const plan =
    billingCycle === 'annual' ? calculateAnnualSubscription(qty) : calculateMonthlySubscription(qty)
  return plan + budget
}

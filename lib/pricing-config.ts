/**
 * Centralized pricing configuration for the /tarifs page.
 *
 * SINGLE SOURCE OF TRUTH: every price, tier and credit budget shown on the
 * pricing page must come from here. No component may hardcode a price.
 */

export type QuantityTier = {
  min: number
  /** Omitted for the open-ended top tier (e.g. 10+). */
  max?: number
  monthlyUnitPrice: number
  label: string
}

export type CreditBudget = {
  amount: number
  enabled: boolean
}

export type BillingCycle = 'monthly' | 'annual'
export type UsageMode = 'unitalk_credits' | 'byok' | 'hybrid'

export const pricingConfig = {
  trialDays: 7,
  trialTokens: 1_000_000,
  monthlyIncludedTokens: 5_000_000,
  slaAvailability: 99.9,
  /** Months offered on the annual plan (annual = (12 − annualFreeMonths) × monthly). */
  annualFreeMonths: 2,
  /** Reference single-unit monthly price, used as the "savings vs 1" baseline. */
  baseMonthlyPrice: 49,
  quantityTiers: [
    { min: 1, monthlyUnitPrice: 49, label: '1+' },
  ] as QuantityTier[],
  /**
   * Prepaid monthly credit budgets, shared across all of a company's
   * Collaborateurs IA. 25 € is the minimum; 500 € is the maximum configurable
   * directly on this page. Budgets above 500 € are arranged with Unitalk.
   */
  creditBudgets: [
    { amount: 25, enabled: true },
    { amount: 50, enabled: true },
    { amount: 100, enabled: true },
    { amount: 250, enabled: true },
    { amount: 500, enabled: true },
  ] as CreditBudget[],
}

/** The validated, enabled credit-budget amounts, ascending. */
export function enabledCreditBudgets(): number[] {
  return pricingConfig.creditBudgets
    .filter((b) => b.enabled)
    .map((b) => b.amount)
    .sort((a, b) => a - b)
}

/** The minimum enabled budget (auto-selected when a credit mode is chosen). */
export function minimumCreditBudget(): number {
  const budgets = enabledCreditBudgets()
  return budgets[0] ?? 0
}

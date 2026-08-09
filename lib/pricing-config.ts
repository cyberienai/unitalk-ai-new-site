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
   * Prepaid monthly credit budgets, shared across all of a company's
   * Collaborateurs IA. 10 € is the minimum; 500 € is the maximum configurable
   * directly on this page. Budgets above 500 € are arranged with Unitalk.
   */
  creditBudgets: [
    { amount: 10, enabled: true },
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

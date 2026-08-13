import { describe, it, expect } from 'vitest'
import {
  pricingConfig,
  enabledCreditBudgets,
  minimumCreditBudget,
} from '@/lib/pricing-config'
import {
  normalizeQuantity,
  getTierForQuantity,
  getNextTier,
  calculateMonthlySubscription,
  calculateQuantitySavings,
  billedMonthsPerYear,
  calculateAnnualSubscription,
  calculateAnnualEquivalentMonthly,
  calculateAnnualSavings,
  calculateMonthlyCreditBudget,
  calculateEstimatedMonthlyTotal,
  calculateAmountDueAfterTrial,
} from '@/lib/pricing-calculator'

describe('normalizeQuantity — minimum of 1', () => {
  it('clamps zero and negatives to 1', () => {
    expect(normalizeQuantity(0)).toBe(1)
    expect(normalizeQuantity(-5)).toBe(1)
  })
  it('floors fractional quantities', () => {
    expect(normalizeQuantity(3.7)).toBe(3)
  })
  it('falls back to 1 for non-finite input', () => {
    expect(normalizeQuantity(Number.NaN)).toBe(1)
    expect(normalizeQuantity(Infinity)).toBe(1)
  })
})

describe('getTierForQuantity — correct tier and unit price', () => {
  it('maps quantities to the expected unit price', () => {
    expect(getTierForQuantity(1).monthlyUnitPrice).toBe(49)
    expect(getTierForQuantity(2).monthlyUnitPrice).toBe(49)
    expect(getTierForQuantity(100).monthlyUnitPrice).toBe(49)
  })
})

describe('getNextTier', () => {
  it('has no public discount tier', () => {
    expect(getNextTier(1)).toBeNull()
    expect(getNextTier(50)).toBeNull()
  })
})

describe('monthly subscription', () => {
  it('multiplies quantity by the tier unit price', () => {
    expect(calculateMonthlySubscription(1)).toBe(49)
    expect(calculateMonthlySubscription(3)).toBe(147)
    expect(calculateMonthlySubscription(7)).toBe(343)
    expect(calculateMonthlySubscription(10)).toBe(490)
  })
})

describe('quantity savings (monthly, vs single-unit base price)', () => {
  it('is zero for a single collaborator', () => {
    expect(calculateQuantitySavings(1)).toBe(0)
  })
  it('does not invent unconfigured volume discounts', () => {
    expect(calculateQuantitySavings(3)).toBe(0)
    expect(calculateQuantitySavings(10)).toBe(0)
  })
})

describe('annual calculation — 2 months free', () => {
  it('bills 10 months out of 12', () => {
    expect(pricingConfig.annualFreeMonths).toBe(2)
    expect(billedMonthsPerYear()).toBe(10)
  })
  it('matches the spec reference values', () => {
    // 1 collaborator
    expect(calculateAnnualSubscription(1)).toBe(490)
    expect(calculateAnnualEquivalentMonthly(1)).toBeCloseTo(40.83, 2)
    expect(calculateAnnualSavings(1)).toBe(98)
    // 3 collaborators
    expect(calculateAnnualSubscription(3)).toBe(1470)
    expect(calculateAnnualEquivalentMonthly(3)).toBeCloseTo(122.5, 2)
    expect(calculateAnnualSavings(3)).toBe(294)
    // 7 collaborators
    expect(calculateAnnualSubscription(7)).toBe(3430)
    expect(calculateAnnualEquivalentMonthly(7)).toBeCloseTo(285.83, 2)
    expect(calculateAnnualSavings(7)).toBe(686)
    // 10 collaborators
    expect(calculateAnnualSubscription(10)).toBe(4900)
    expect(calculateAnnualEquivalentMonthly(10)).toBeCloseTo(408.33, 2)
    expect(calculateAnnualSavings(10)).toBe(980)
  })
})

describe('credit budgets', () => {
  it('exposes 10/50/100/250/500 ascending', () => {
    expect(enabledCreditBudgets()).toEqual([10, 50, 100, 250, 500])
  })
  it('minimum budget is 10', () => {
    expect(minimumCreditBudget()).toBe(10)
  })
})

describe('monthly credit budget by usage mode', () => {
  it('BYOK never contributes a budget', () => {
    expect(calculateMonthlyCreditBudget('byok', 100)).toBe(0)
    expect(calculateMonthlyCreditBudget('byok', null)).toBe(0)
  })
  it('credits / hybrid use the selected budget', () => {
    expect(calculateMonthlyCreditBudget('unitalk_credits', 10)).toBe(10)
    expect(calculateMonthlyCreditBudget('hybrid', 250)).toBe(250)
  })
  it('null budget contributes 0', () => {
    expect(calculateMonthlyCreditBudget('unitalk_credits', null)).toBe(0)
  })
})

describe('estimated monthly total — 7 collaborators with credit budgets', () => {
  const cases: [number, number][] = [
    [10, 353],
    [50, 393],
    [100, 443],
    [250, 593],
    [500, 843],
  ]
  it.each(cases)('%d € credits → %d € / month', (budget, expected) => {
    expect(calculateEstimatedMonthlyTotal(7, 'monthly', 'unitalk_credits', budget)).toBe(expected)
  })
})

describe('estimated total — annual shows monthly equivalent + full credits', () => {
  it('7 collaborators annual with 50 € credits', () => {
    expect(calculateEstimatedMonthlyTotal(7, 'annual', 'unitalk_credits', 50)).toBeCloseTo(335.83, 2)
  })
  it('credits are never discounted by the annual cycle', () => {
    const monthlyBudget = calculateMonthlyCreditBudget('unitalk_credits', 100)
    expect(monthlyBudget).toBe(100)
    const annual = calculateEstimatedMonthlyTotal(3, 'annual', 'unitalk_credits', 100)
    expect(annual).toBeCloseTo(calculateAnnualEquivalentMonthly(3) + 100, 2)
  })
})

describe('amount due after trial', () => {
  it('monthly = one month subscription + credits', () => {
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'unitalk_credits', 50)).toBe(393)
  })
  it('annual = full-year subscription + one month of credits', () => {
    expect(calculateAmountDueAfterTrial(7, 'annual', 'unitalk_credits', 50)).toBe(3480)
  })
  it('BYOK bills only the plan', () => {
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'byok', null)).toBe(343)
    expect(calculateAmountDueAfterTrial(7, 'annual', 'byok', null)).toBe(3430)
  })
})

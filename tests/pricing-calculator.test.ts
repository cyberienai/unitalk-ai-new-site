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
    expect(getTierForQuantity(2).monthlyUnitPrice).toBe(45)
    expect(getTierForQuantity(4).monthlyUnitPrice).toBe(45)
    expect(getTierForQuantity(5).monthlyUnitPrice).toBe(39)
    expect(getTierForQuantity(9).monthlyUnitPrice).toBe(39)
    expect(getTierForQuantity(10).monthlyUnitPrice).toBe(35)
    expect(getTierForQuantity(100).monthlyUnitPrice).toBe(35)
  })
})

describe('getNextTier', () => {
  it('returns the next cheaper tier', () => {
    expect(getNextTier(1)?.monthlyUnitPrice).toBe(45)
    expect(getNextTier(4)?.monthlyUnitPrice).toBe(39)
    expect(getNextTier(5)?.monthlyUnitPrice).toBe(35)
    expect(getNextTier(7)?.min).toBe(10)
  })
  it('returns null on the top tier', () => {
    expect(getNextTier(10)).toBeNull()
    expect(getNextTier(50)).toBeNull()
  })
})

describe('monthly subscription', () => {
  it('multiplies quantity by the tier unit price', () => {
    expect(calculateMonthlySubscription(1)).toBe(49)
    expect(calculateMonthlySubscription(3)).toBe(135)
    expect(calculateMonthlySubscription(7)).toBe(273)
    expect(calculateMonthlySubscription(10)).toBe(350)
  })
})

describe('quantity savings (monthly, vs single-unit base price)', () => {
  it('is zero for a single collaborator', () => {
    expect(calculateQuantitySavings(1)).toBe(0)
  })
  it('reflects the degressive tiers', () => {
    expect(calculateQuantitySavings(3)).toBe(12) // 3×49 − 135
    expect(calculateQuantitySavings(7)).toBe(70) // 7×49 − 273
    expect(calculateQuantitySavings(10)).toBe(140) // 10×49 − 350
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
    expect(calculateAnnualSubscription(3)).toBe(1350)
    expect(calculateAnnualEquivalentMonthly(3)).toBeCloseTo(112.5, 2)
    expect(calculateAnnualSavings(3)).toBe(270)
    // 7 collaborators
    expect(calculateAnnualSubscription(7)).toBe(2730)
    expect(calculateAnnualEquivalentMonthly(7)).toBeCloseTo(227.5, 2)
    expect(calculateAnnualSavings(7)).toBe(546)
    // 10 collaborators
    expect(calculateAnnualSubscription(10)).toBe(3500)
    expect(calculateAnnualEquivalentMonthly(10)).toBeCloseTo(291.67, 2)
    expect(calculateAnnualSavings(10)).toBe(700)
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
    [10, 283],
    [50, 323],
    [100, 373],
    [250, 523],
    [500, 773],
  ]
  it.each(cases)('%d € credits → %d € / month', (budget, expected) => {
    expect(calculateEstimatedMonthlyTotal(7, 'monthly', 'unitalk_credits', budget)).toBe(expected)
  })
})

describe('estimated total — annual shows monthly equivalent + full credits', () => {
  it('7 collaborators annual with 50 € credits', () => {
    // 227.50 (plan equivalent) + 50 (credits, never discounted)
    expect(calculateEstimatedMonthlyTotal(7, 'annual', 'unitalk_credits', 50)).toBeCloseTo(277.5, 2)
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
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'unitalk_credits', 50)).toBe(323)
  })
  it('annual = full-year subscription + one month of credits', () => {
    // 2730 + 50 = 2780
    expect(calculateAmountDueAfterTrial(7, 'annual', 'unitalk_credits', 50)).toBe(2780)
  })
  it('BYOK bills only the plan', () => {
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'byok', null)).toBe(273)
    expect(calculateAmountDueAfterTrial(7, 'annual', 'byok', null)).toBe(2730)
  })
})

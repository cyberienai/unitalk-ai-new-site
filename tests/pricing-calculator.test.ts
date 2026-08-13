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
    expect(getTierForQuantity(1).monthlyUnitPrice).toBe(98)
    expect(getTierForQuantity(2).monthlyUnitPrice).toBe(98)
    expect(getTierForQuantity(100).monthlyUnitPrice).toBe(98)
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
    expect(calculateMonthlySubscription(1)).toBe(98)
    expect(calculateMonthlySubscription(3)).toBe(294)
    expect(calculateMonthlySubscription(7)).toBe(686)
    expect(calculateMonthlySubscription(10)).toBe(980)
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
    expect(calculateAnnualSubscription(1)).toBe(980)
    expect(calculateAnnualEquivalentMonthly(1)).toBeCloseTo(81.67, 2)
    expect(calculateAnnualSavings(1)).toBe(196)
    // 3 collaborators
    expect(calculateAnnualSubscription(3)).toBe(2940)
    expect(calculateAnnualEquivalentMonthly(3)).toBeCloseTo(245, 2)
    expect(calculateAnnualSavings(3)).toBe(588)
    // 7 collaborators
    expect(calculateAnnualSubscription(7)).toBe(6860)
    expect(calculateAnnualEquivalentMonthly(7)).toBeCloseTo(571.67, 2)
    expect(calculateAnnualSavings(7)).toBe(1372)
    // 10 collaborators
    expect(calculateAnnualSubscription(10)).toBe(9800)
    expect(calculateAnnualEquivalentMonthly(10)).toBeCloseTo(816.67, 2)
    expect(calculateAnnualSavings(10)).toBe(1960)
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
    [10, 696],
    [50, 736],
    [100, 786],
    [250, 936],
    [500, 1186],
  ]
  it.each(cases)('%d € credits → %d € / month', (budget, expected) => {
    expect(calculateEstimatedMonthlyTotal(7, 'monthly', 'unitalk_credits', budget)).toBe(expected)
  })
})

describe('estimated total — annual shows monthly equivalent + full credits', () => {
  it('7 collaborators annual with 50 € credits', () => {
    expect(calculateEstimatedMonthlyTotal(7, 'annual', 'unitalk_credits', 50)).toBeCloseTo(621.67, 2)
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
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'unitalk_credits', 50)).toBe(736)
  })
  it('annual = full-year subscription + one month of credits', () => {
    expect(calculateAmountDueAfterTrial(7, 'annual', 'unitalk_credits', 50)).toBe(6910)
  })
  it('BYOK bills only the plan', () => {
    expect(calculateAmountDueAfterTrial(7, 'monthly', 'byok', null)).toBe(686)
    expect(calculateAmountDueAfterTrial(7, 'annual', 'byok', null)).toBe(6860)
  })
})

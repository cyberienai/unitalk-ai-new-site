import { describe, it, expect } from 'vitest'
import {
  pricingConfig,
  normalizeQuantity,
  tierForQuantity,
  nextTier,
  monthlySubtotal,
  billedMonthsPerYear,
  annualTotal,
  annualEquivalentMonthly,
  annualSavings,
  quantitySavings,
  enabledCreditPacks,
  creditPackById,
} from '@/lib/pricing-config'

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

describe('tierForQuantity — correct tier per quantity', () => {
  it('maps quantities to the expected unit price', () => {
    expect(tierForQuantity(1).monthlyUnitPrice).toBe(49)
    expect(tierForQuantity(2).monthlyUnitPrice).toBe(45)
    expect(tierForQuantity(4).monthlyUnitPrice).toBe(45)
    expect(tierForQuantity(5).monthlyUnitPrice).toBe(39)
    expect(tierForQuantity(9).monthlyUnitPrice).toBe(39)
    expect(tierForQuantity(10).monthlyUnitPrice).toBe(35)
    expect(tierForQuantity(100).monthlyUnitPrice).toBe(35)
  })
})

describe('nextTier', () => {
  it('returns the next cheaper tier', () => {
    expect(nextTier(1)?.monthlyUnitPrice).toBe(45)
    expect(nextTier(4)?.monthlyUnitPrice).toBe(39)
    expect(nextTier(5)?.monthlyUnitPrice).toBe(35)
  })
  it('returns null on the top tier', () => {
    expect(nextTier(10)).toBeNull()
    expect(nextTier(50)).toBeNull()
  })
})

describe('monthly calculation', () => {
  it('multiplies quantity by the tier unit price', () => {
    expect(monthlySubtotal(1)).toBe(49)
    expect(monthlySubtotal(3)).toBe(135)
    expect(monthlySubtotal(5)).toBe(195)
    expect(monthlySubtotal(10)).toBe(350)
  })
})

describe('annual calculation — 2 months free', () => {
  it('bills 10 months out of 12', () => {
    expect(pricingConfig.annualFreeMonths).toBe(2)
    expect(billedMonthsPerYear()).toBe(10)
  })
  it('computes the annual total', () => {
    expect(annualTotal(1)).toBe(490)
    expect(annualTotal(3)).toBe(1350)
  })
  it('computes the monthly equivalent', () => {
    expect(annualEquivalentMonthly(1)).toBeCloseTo(40.83, 2)
    expect(annualEquivalentMonthly(3)).toBeCloseTo(112.5, 2)
  })
})

describe('annual savings', () => {
  it('equals two monthly payments', () => {
    expect(annualSavings(1)).toBe(98)
    expect(annualSavings(3)).toBe(270)
    // savings must equal annualFreeMonths × monthlySubtotal
    expect(annualSavings(5)).toBe(monthlySubtotal(5) * pricingConfig.annualFreeMonths)
  })
})

describe('quantity savings (monthly, vs single-unit base price)', () => {
  it('is zero for a single collaborator', () => {
    expect(quantitySavings(1)).toBe(0)
  })
  it('reflects the degressive tiers', () => {
    expect(quantitySavings(3)).toBe(12) // 3×49 − 135
    expect(quantitySavings(5)).toBe(50) // 5×49 − 195
    expect(quantitySavings(10)).toBe(140) // 10×49 − 350
  })
})

describe('no annual discount applies to credits', () => {
  it('annual total is exactly the plan subtotal × billed months, nothing else', () => {
    for (const q of [1, 2, 5, 12]) {
      expect(annualTotal(q)).toBe(monthlySubtotal(q) * billedMonthsPerYear())
    }
  })
})

describe('credit packs — only validated/enabled packs are exposed', () => {
  it('exposes no pack while none are validated', () => {
    expect(enabledCreditPacks()).toHaveLength(0)
  })
  it('never resolves an unknown or empty pack id', () => {
    expect(creditPackById(null)).toBeNull()
    expect(creditPackById(undefined)).toBeNull()
    expect(creditPackById('does-not-exist')).toBeNull()
  })
})

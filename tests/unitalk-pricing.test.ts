import { describe, expect, it } from 'vitest'
import { configurationBreakdownAt, configurationTotal, configurationTotalAt, normalizePricingDraft, unitalkPricing } from '@/lib/unitalk-pricing'

describe('Unitalk configurable pricing', () => {
  it('matches the default promotional configuration', () => {
    expect(configurationTotal(1, 'quarterTime', true, false, true)).toBe(49)
  })
  it('adds the optional co-creator license', () => {
    expect(configurationTotal(1, 'quarterTime', true, true, true)).toBe(99)
  })
  it('calculates future prices from selected options', () => {
    expect(configurationTotal(1, 'quarterTime', false, false, false)).toBe(124)
    expect(configurationTotal(1, 'quarterTime', false, true, false)).toBe(174)
  })
  it('keeps the catalog values canonical', () => {
    expect(unitalkPricing.aiCollaborator.monthlyPrice).toBe(49)
    expect(unitalkPricing.aiCocreator.monthlyPrice).toBe(50)
    expect(unitalkPricing.aiCapacity.quarterTime.tokens).toBe(5_000_000)
  })
  it('calculates the two promotions on their boundary dates', () => {
    expect(configurationTotalAt(2, 'quarterTime', 0, new Date('2026-12-21T12:00:00Z'))).toBe(98)
    expect(configurationTotalAt(2, 'quarterTime', 0, new Date('2026-12-22T12:00:00Z'))).toBe(148)
    expect(configurationTotalAt(2, 'quarterTime', 0, new Date('2026-12-31T12:00:00Z'))).toBe(148)
    expect(configurationTotalAt(2, 'quarterTime', 0, new Date('2027-01-01T12:00:00Z'))).toBe(198)
  })
  it('matches the half-time example', () => {
    expect(configurationTotalAt(2, 'halfTime', 1, new Date('2026-12-21T12:00:00Z'))).toBe(248)
    expect(configurationTotalAt(2, 'halfTime', 1, new Date('2026-12-22T12:00:00Z'))).toBe(298)
    expect(configurationTotalAt(2, 'halfTime', 1, new Date('2027-01-01T12:00:00Z'))).toBe(298)
  })
  it.each([
    ['byok', 49],
    ['quarterTime', 49],
    ['halfTime', 99],
    ['fullTime', 149],
  ] as const)('calculates one collaborator with %s before promotions end', (capacity, expected) => {
    expect(configurationTotalAt(1, capacity, 0, new Date('2026-12-21T12:00:00Z'))).toBe(expected)
  })
  it.each([1, 2, 3, unitalkPricing.aiCollaborator.max])('calculates quantity %d', collaborators => {
    expect(configurationTotalAt(collaborators, 'byok', 0, new Date('2026-12-21T12:00:00Z'))).toBe(collaborators * 49)
  })
  it.each([0, 1, 2])('adds %d co-creators', coCreators => {
    expect(configurationTotalAt(1, 'byok', coCreators, new Date('2026-12-21T12:00:00Z'))).toBe(49 + coCreators * 50)
  })
  it('makes both promotional discounts explicit in the breakdown', () => {
    expect(configurationBreakdownAt(1, 'quarterTime', 0, new Date('2026-12-21T12:00:00Z'))).toMatchObject({
      subtotal: 124,
      organizationDiscount: 50,
      capacityDiscount: 25,
      promotions: 75,
      total: 49,
    })
  })
  it('normalizes draft quantities, capacity and source', () => {
    expect(normalizePricingDraft({ collaborators: 999, coCreators: -2, capacity: 'invalid' as never })).toEqual({
      source: 'tarifs',
      collaborators: 20,
      capacity: 'quarterTime',
      coCreators: 0,
      priceVersion: unitalkPricing.version,
    })
  })
})

import { describe, expect, it } from 'vitest'
import { configurationTotal, configurationTotalAt, unitalkPricing } from '@/lib/unitalk-pricing'

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
})

import { describe, expect, it } from 'vitest'
import { configurationTotal, unitalkPricing } from '@/lib/unitalk-pricing'

describe('Unitalk configurable pricing', () => {
  it('matches the default promotional configuration', () => {
    expect(configurationTotal(1, 'quarterTime', true, false, true)).toBe(49)
  })
  it('adds the optional co-creator license', () => {
    expect(configurationTotal(1, 'quarterTime', true, true, true)).toBe(99)
  })
  it('calculates future prices from selected options', () => {
    expect(configurationTotal(1, 'quarterTime', true, false, false)).toBe(124)
    expect(configurationTotal(1, 'quarterTime', true, true, false)).toBe(174)
  })
  it('keeps the catalog values canonical', () => {
    expect(unitalkPricing.aiCollaborator.monthlyPrice).toBe(49)
    expect(unitalkPricing.aiCocreator.monthlyPrice).toBe(50)
    expect(unitalkPricing.aiCapacity.quarterTime.tokens).toBe(5_000_000)
  })
})

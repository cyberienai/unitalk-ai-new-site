import { describe, expect, it } from 'vitest'
import { normalizePricingDraft, organizationMonthlyPrice, recurringMonthlyTotal, unitalkPricing } from '@/lib/unitalk-pricing'

describe('Unitalk pricing', () => {
  it('uses flat organization tiers rather than per-seat pricing', () => {
    expect(organizationMonthlyPrice('solo')).toBe(0)
    expect(organizationMonthlyPrice('team')).toBe(49)
    expect(organizationMonthlyPrice('business')).toBe(299)
  })

  it('charges 49 euros per AI Collaborator', () => {
    expect(unitalkPricing.aiCollaborator.monthlyPrice).toBe(49)
    expect(recurringMonthlyTotal('solo', 1)).toBe(49)
    expect(recurringMonthlyTotal('team', 2)).toBe(147)
    expect(recurringMonthlyTotal('business', 3)).toBe(446)
  })

  it('stores included resources and the minimum top-up', () => {
    expect(unitalkPricing.aiCollaborator.includedTokens).toBe(1_000_000)
    expect(unitalkPricing.aiCollaborator.includedPhoneMinutes).toBe(60)
    expect(unitalkPricing.credits.minimumTopUp).toBe(25)
    expect(unitalkPricing.organization.team.includedCredits).toBe(2_500)
    expect(unitalkPricing.organization.business.includedCredits).toBe(20_000)
  })

  it('normalizes the checkout draft', () => {
    expect(normalizePricingDraft({ organizationTier: 'team', collaborators: 999, usageMode: 'byok', creditBudget: 50 })).toEqual({
      source: 'tarifs', organizationTier: 'team', collaborators: 100, usageMode: 'byok', creditBudget: 0, capacity: 'byok', coCreators: 0, priceVersion: unitalkPricing.version,
    })
    expect(normalizePricingDraft({})).toEqual({
      source: 'tarifs', organizationTier: 'solo', collaborators: 0, usageMode: 'credits', creditBudget: 25, capacity: 'quarterTime', coCreators: 0, priceVersion: unitalkPricing.version,
    })
  })
})

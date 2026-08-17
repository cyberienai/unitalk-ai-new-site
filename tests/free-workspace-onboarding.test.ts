import { describe, expect, it } from 'vitest'
import { onboardingComplete, type PurchaseDraft } from '@/lib/purchase-draft'

const base: PurchaseDraft = {
  id: 'draft',
  updatedAt: '2026-08-17T00:00:00.000Z',
  onboarding: {
    company: [
      { key: 'name', label: { fr: 'Entreprise', en: 'Company' }, value: 'Acme', uncertain: false },
      { key: 'domain', label: { fr: 'Domaine', en: 'Domain' }, value: 'acme.fr', uncertain: false },
    ],
    mission: { title: 'Qualifier les prospects', target: 'PME françaises', criteria: '', sources: '', exclusions: '', result: 'Une liste qualifiée', rule: '', validation: 'Validation avant contact' },
    profile: { fr: 'Commercial', en: 'Sales' },
    collaboratorName: 'Hugo',
    confirmedAt: '2026-08-17T00:00:00.000Z',
  },
}

describe('free Workspace onboarding confirmation', () => {
  it('requires explicit confirmation', () => {
    expect(onboardingComplete(base)).toBe(true)
    expect(onboardingComplete({ ...base, onboarding: { ...base.onboarding!, confirmedAt: '' } })).toBe(false)
  })

  it('requires a reviewable mission frame', () => {
    expect(onboardingComplete({ ...base, onboarding: { ...base.onboarding!, mission: { ...base.onboarding!.mission, validation: '' } } })).toBe(false)
  })
})

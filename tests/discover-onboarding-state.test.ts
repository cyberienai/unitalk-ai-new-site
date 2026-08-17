import { describe, expect, it } from 'vitest'
import { buildInitialOnboardingState } from '@/lib/discover-onboarding-state'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS } from '@/lib/missions-catalog'
import type { PurchaseDraft } from '@/lib/purchase-draft'

const persisted: PurchaseDraft = {
  id: 'old-draft',
  updatedAt: '2026-08-17T00:00:00.000Z',
  onboarding: {
    company: [
      { key: 'name', label: { fr: 'Entreprise', en: 'Company' }, value: 'Acme' },
      { key: 'domain', label: { fr: 'Domaine', en: 'Domain' }, value: 'acme.fr' },
    ],
    mission: { title: 'Ancienne mission finance', target: 'Ancienne cible', criteria: 'Ancien critère', sources: 'Ancienne source', exclusions: '', result: 'Ancien résultat', rule: '', validation: 'Ancienne validation' },
    profile: ROLE_DETAILS.emma.role,
    collaboratorName: 'Emma',
    collaboratorTemplateSlug: 'emma',
    confirmedAt: '2026-08-17T00:00:00.000Z',
  },
}

describe('explicit discovery intent', () => {
  it('lets an explicit profile override the previous onboarding cookie', () => {
    const state = buildInitialOnboardingState({ lang: 'fr', initialPurchaseDraft: persisted, requestedDomain: '', requestedCollaborator: ROLE_DETAILS.arthur, hasExplicitDraft: true })
    expect(state.profile).toEqual(ROLE_DETAILS.arthur.role)
    expect(state.collaboratorName).toBe('Arthur')
    expect(state.collaboratorTemplateSlug).toBe('arthur')
    expect(state.mission).toEqual({ title: '', target: '', criteria: '', sources: '', exclusions: '', result: '', rule: '', validation: '' })
  })

  it('creates a fresh structured mission for a new catalog entry', () => {
    const catalogMission = MISSIONS.find(mission => mission.collaboratorSlug === 'arthur')!
    const state = buildInitialOnboardingState({ lang: 'fr', initialPurchaseDraft: persisted, requestedDomain: '', requestedCollaborator: ROLE_DETAILS.arthur, catalogMission, hasExplicitDraft: false })
    expect(state.mission.title).toBe(catalogMission.title.fr)
    expect(state.mission.result).toBe(catalogMission.result.fr)
    expect(state.mission.validation).toBe(catalogMission.validation.fr)
    expect(state.mission.target).not.toBe('Ancienne cible')
    expect(state.missionDefined).toBe(true)
  })

  it('lets an explicit domain replace stale company identity', () => {
    const state = buildInitialOnboardingState({ lang: 'fr', initialPurchaseDraft: persisted, requestedDomain: 'nouvelle.fr', requestedCollaborator: ROLE_DETAILS.arthur, hasExplicitDraft: true })
    expect(state.company.find(fact => fact.key === 'domain')?.value).toBe('nouvelle.fr')
    expect(state.company.find(fact => fact.key === 'name')?.value).toBe('Nouvelle')
  })
})

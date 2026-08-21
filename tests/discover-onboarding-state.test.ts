import { describe, expect, it } from 'vitest'
import { buildInitialOnboardingState, collaboratorFromDraft, missionFromDraft } from '@/lib/discover-onboarding-state'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS } from '@/lib/missions-catalog'
import type { PurchaseDraft } from '@/lib/purchase-draft'
import { getStoreItemBySlug } from '@/lib/store-catalog'

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
  it('prepares prospect qualification from the homepage wording', () => {
    const mission = missionFromDraft('Qualifier mes prospects', 'fr')
    expect(mission.title).toBe('Qualifier mes prospects')
    expect(mission.target).toContain('prospects entrants')
    expect(mission.criteria).toBe('')
    expect(mission.result).toContain('priorisé')
    expect(mission.validation).toContain('Validation humaine')
    expect(collaboratorFromDraft('Qualifier mes prospects')?.slug).toBe('hugo')
    expect(collaboratorFromDraft('Qualifier mes prospects')?.role.fr).toBe('Commercial')
  })

  it('lets an explicit profile override the previous onboarding cookie', () => {
    const state = buildInitialOnboardingState({ lang: 'fr', initialPurchaseDraft: persisted, requestedDomain: '', requestedCollaborator: ROLE_DETAILS.arthur, hasExplicitDraft: true })
    expect(state.profile).toEqual(ROLE_DETAILS.arthur.role)
    expect(state.collaboratorName).toBe('Arthur')
    expect(state.collaboratorTemplateSlug).toBe('arthur')
    expect(state.organizationalPlacement).toBe('team')
    expect(state.mission).toEqual({ title: '', target: '', criteria: '', sources: '', exclusions: '', result: '', rule: '', validation: '' })
  })

  it('keeps a Store job profile selected through onboarding', () => {
    const requestedProfile = getStoreItemBySlug('commercial')!
    const state = buildInitialOnboardingState({ lang: 'fr', initialPurchaseDraft: persisted, requestedDomain: '', requestedStoreItem: requestedProfile, hasExplicitDraft: true })
    expect(state.profile).toEqual(requestedProfile.name)
    expect(state.mission.title).toBe(requestedProfile.exampleMissions?.[0]?.fr)
    expect(state.mission.result).toContain(requestedProfile.name.fr)
    expect(state.missionDefined).toBe(true)
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

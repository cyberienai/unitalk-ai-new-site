import type { MockSession } from '@/lib/mock-auth'
import type { PurchaseDraft } from '@/lib/purchase-draft'
import type { Mission } from '@/lib/missions-catalog'
import type { RoleDetail } from '@/lib/collaborators-catalog'
import { emailDomain, isProfessionalEmail } from '@/lib/professional-email'
import { initialOnboardingState, type CompanyFact, type MissionInfo, type OnboardingState } from '@/components/discover/types'

export function emptyMission(title = ''): MissionInfo {
  return { title, target: '', criteria: '', sources: '', exclusions: '', result: '', rule: '', validation: '' }
}

export function missionFromCatalog(mission: Mission, lang: 'fr' | 'en'): MissionInfo {
  return {
    title: mission.title[lang],
    target: mission.objective[lang],
    criteria: mission.description[lang],
    sources: mission.tools.join(' · '),
    exclusions: '',
    result: mission.result[lang],
    rule: '',
    validation: mission.validation[lang],
  }
}

function withDomain(company: CompanyFact[], domain: string, replaceName: boolean): CompanyFact[] {
  if (!domain) return company
  const inferredName = domain.split('.')[0]
  return company.map((fact) => fact.key === 'domain'
    ? { ...fact, value: domain, uncertain: false }
    : fact.key === 'name' && (replaceName || !fact.value.trim())
      ? { ...fact, value: inferredName.charAt(0).toUpperCase() + inferredName.slice(1), uncertain: false }
      : fact)
}

export function buildInitialOnboardingState({
  lang,
  initialSession,
  initialPurchaseDraft,
  requestedDomain,
  requestedCollaborator,
  catalogMission,
  hasExplicitDraft,
}: {
  lang: 'fr' | 'en'
  initialSession?: MockSession | null
  initialPurchaseDraft?: PurchaseDraft | null
  requestedDomain: string
  requestedCollaborator?: RoleDetail
  catalogMission?: Mission
  hasExplicitDraft: boolean
}): OnboardingState {
  const init = initialOnboardingState()
  const persisted = initialPurchaseDraft?.onboarding
  const selectedCollaborator = requestedCollaborator
  const sessionDomain = initialSession && isProfessionalEmail(initialSession.email) ? emailDomain(initialSession.email) : ''
  const explicitMission = Boolean(catalogMission || hasExplicitDraft)
  const mission = catalogMission
    ? missionFromCatalog(catalogMission, lang)
    : hasExplicitDraft
      ? emptyMission()
      : persisted?.mission ?? init.mission

  return {
    ...init,
    authenticated: Boolean(initialSession),
    firstName: initialSession?.firstName?.trim() ?? '',
    lastName: initialSession?.lastName?.trim() ?? '',
    company: withDomain(persisted?.company ?? init.company, requestedDomain || sessionDomain, Boolean(requestedDomain)),
    mission,
    missionDefined: catalogMission ? true : explicitMission ? false : Boolean(persisted?.mission.title),
    profile: selectedCollaborator?.role ?? persisted?.profile ?? init.profile,
    collaboratorName: selectedCollaborator?.name ?? persisted?.collaboratorName ?? init.collaboratorName,
    collaboratorTemplateSlug: selectedCollaborator?.slug ?? persisted?.collaboratorTemplateSlug,
  }
}

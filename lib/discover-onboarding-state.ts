import type { MockSession } from '@/lib/mock-auth'
import type { PurchaseDraft } from '@/lib/purchase-draft'
import type { Mission } from '@/lib/missions-catalog'
import { ROLE_DETAILS, type RoleDetail } from '@/lib/collaborators-catalog'
import { emailDomain, isProfessionalEmail } from '@/lib/professional-email'
import { initialOnboardingState, type CompanyFact, type MissionInfo, type OnboardingState } from '@/components/discover/types'
import type { StoreItem } from '@/lib/store-catalog'
import type { AiModel } from '@/lib/ai-models-catalog'

export function emptyMission(title = ''): MissionInfo {
  return { title, target: '', criteria: '', sources: '', exclusions: '', result: '', rule: '', validation: '' }
}

export function missionFromDraft(text: string, lang: 'fr' | 'en'): MissionInfo {
  const normalized = text.trim().toLocaleLowerCase(lang)
  const isProspectQualification = /prospect|lead/.test(normalized) && /qualif/.test(normalized)

  if (isProspectQualification) return lang === 'fr'
    ? {
        title: 'Qualifier mes prospects',
        target: 'Les prospects entrants et les contacts à évaluer avant prise de contact',
        criteria: '',
        sources: 'CRM et sources publiques autorisées',
        exclusions: 'Clients existants et contacts ayant demandé à ne pas être sollicités',
        result: 'Chaque prospect est enrichi, évalué et priorisé avec une justification claire.',
        rule: 'Ne jamais contacter un prospect ni modifier le CRM sans les autorisations définies.',
        validation: 'Validation humaine avant toute prise de contact ou modification sensible.',
      }
    : {
        title: 'Qualify my prospects',
        target: 'Inbound prospects and contacts to assess before outreach',
        criteria: '',
        sources: 'CRM and authorized public sources',
        exclusions: 'Existing customers and contacts who opted out of outreach',
        result: 'Each prospect is enriched, assessed and prioritized with a clear rationale.',
        rule: 'Never contact a prospect or update the CRM without the defined permissions.',
        validation: 'Human approval before any outreach or sensitive update.',
      }

  return {
    title: text.trim(),
    target: lang === 'fr' ? 'À préciser dans le Workspace' : 'To be refined in the Workspace',
    criteria: '',
    sources: '',
    exclusions: '',
    result: lang === 'fr' ? 'Un résultat utile et vérifiable, à préciser dans le Workspace.' : 'A useful, verifiable outcome to refine in the Workspace.',
    rule: '',
    validation: lang === 'fr' ? 'Validation humaine avant toute action sensible.' : 'Human approval before any sensitive action.',
  }
}

export function collaboratorFromDraft(text: string): RoleDetail | undefined {
  const normalized = text.trim().toLocaleLowerCase()
  return /prospect|lead/.test(normalized) && /qualif/.test(normalized) ? ROLE_DETAILS.hugo : undefined
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

function missionFromStoreItem(item: StoreItem, lang: 'fr' | 'en'): MissionInfo {
  const itemName = item.name[lang]
  const isProfile = item.type === 'profil'
  return {
    title: item.exampleMissions?.[0]?.[lang] ?? item.uses?.[0]?.[lang] ?? item.contexts?.[0]?.[lang] ?? (lang === 'fr' ? `Ajouter ${itemName}` : `Add ${itemName}`),
    target: item.roleInOrg?.[lang] ?? item.description[lang],
    criteria: '',
    sources: '',
    exclusions: '',
    result: isProfile
      ? (lang === 'fr' ? `Le profil ${itemName} est adapté puis attribué au Collaborateur IA choisi.` : `The ${itemName} profile is adapted and assigned to the selected AI Collaborator.`)
      : item.produces?.[0]?.[lang] ?? item.actions?.[0]?.[lang] ?? item.enables?.[0]?.[lang] ?? item.description[lang],
    rule: '',
    validation: lang === 'fr' ? 'Validation humaine avant toute activation ou action sensible.' : 'Human approval before any activation or sensitive action.',
  }
}

function missionFromModel(model: AiModel, lang: 'fr' | 'en'): MissionInfo {
  return {
    title: lang === 'fr' ? `Autoriser ${model.title}` : `Authorize ${model.title}`,
    target: model.description[lang],
    criteria: '',
    sources: model.maker,
    exclusions: '',
    result: lang === 'fr' ? `${model.title} est disponible pour les missions autorisées.` : `${model.title} is available for authorized missions.`,
    rule: lang === 'fr' ? 'Utiliser ce modèle uniquement pour les missions et données autorisées.' : 'Use this model only for authorized missions and data.',
    validation: lang === 'fr' ? 'Validation humaine avant l’activation du modèle.' : 'Human approval before enabling the model.',
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
  requestedStoreItem,
  requestedModel,
  catalogMission,
  hasExplicitDraft,
}: {
  lang: 'fr' | 'en'
  initialSession?: MockSession | null
  initialPurchaseDraft?: PurchaseDraft | null
  requestedDomain: string
  requestedCollaborator?: RoleDetail
  requestedStoreItem?: StoreItem
  requestedModel?: AiModel
  catalogMission?: Mission
  hasExplicitDraft: boolean
}): OnboardingState {
  const init = initialOnboardingState()
  const persisted = initialPurchaseDraft?.onboarding
  const selectedCollaborator = requestedCollaborator
  const sessionDomain = initialSession && isProfessionalEmail(initialSession.email) ? emailDomain(initialSession.email) : ''
  const explicitMission = Boolean(catalogMission || requestedStoreItem || requestedModel || hasExplicitDraft)
  const mission = catalogMission
    ? missionFromCatalog(catalogMission, lang)
    : requestedStoreItem
      ? missionFromStoreItem(requestedStoreItem, lang)
    : requestedModel
      ? missionFromModel(requestedModel, lang)
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
    missionDefined: catalogMission || requestedStoreItem || requestedModel ? true : explicitMission ? false : Boolean(persisted?.mission.title),
    profile: requestedStoreItem?.type === 'profil' ? requestedStoreItem.name : selectedCollaborator?.role ?? persisted?.profile ?? init.profile,
    collaboratorName: selectedCollaborator?.name ?? persisted?.collaboratorName ?? init.collaboratorName,
    collaboratorTemplateSlug: selectedCollaborator?.slug ?? persisted?.collaboratorTemplateSlug,
    organizationalPlacement: persisted?.organizationalPlacement ?? init.organizationalPlacement,
  }
}

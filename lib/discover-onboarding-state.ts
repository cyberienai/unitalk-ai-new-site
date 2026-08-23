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
  if (mission.slug === 'trouver-de-nouveaux-clients') return lang === 'fr'
    ? {
        title: mission.title.fr,
        target: 'Prospects entrants et entreprises correspondant à votre cible',
        criteria: 'Secteur, taille, zone, budget ou signaux d’intérêt à préciser',
        sources: 'CRM, sites des entreprises et sources publiques autorisées',
        exclusions: 'Clients existants, concurrents et contacts opposés à la prospection',
        result: 'Une liste qualifiée avec sources, justification et points à vérifier.',
        rule: 'Ne jamais contacter un prospect ni modifier le CRM sans les autorisations définies.',
        validation: 'Validation humaine avant toute prise de contact ou modification sensible du CRM.',
      }
    : {
        title: mission.title.en,
        target: 'Inbound prospects and companies matching your target',
        criteria: 'Industry, size, region, budget or intent signals to define',
        sources: 'CRM, company websites and authorized public sources',
        exclusions: 'Existing customers, competitors and opted-out contacts',
        result: 'A qualified list with sources, rationale and points to verify.',
        rule: 'Never contact a prospect or update the CRM without the defined permissions.',
        validation: 'Human approval before any outreach or sensitive CRM update.',
      }

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
  requestedIntention,
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
  requestedIntention?: string | null
  catalogMission?: Mission
  hasExplicitDraft: boolean
}): OnboardingState {
  const init = initialOnboardingState()
  const persisted = initialPurchaseDraft?.onboarding
  const selectedCollaborator = requestedCollaborator
  const sessionDomain = initialSession && isProfessionalEmail(initialSession.email) ? emailDomain(initialSession.email) : ''
  const isProfileCreation = requestedIntention === 'nouveau-profil-metier'
  const isSkillCreation = requestedIntention === 'nouvelle-competence'
  const isApplicationCreation = requestedIntention === 'nouvelle-application'
  const isModelCreation = requestedIntention === 'nouveau-modele-ia'
  const isServerCreation = requestedIntention === 'nouveau-serveur-ia'
  const explicitMission = Boolean(catalogMission || requestedStoreItem || requestedModel || isProfileCreation || isSkillCreation || isApplicationCreation || isModelCreation || isServerCreation || hasExplicitDraft)
  const mission = catalogMission
    ? missionFromCatalog(catalogMission, lang)
    : requestedStoreItem
      ? missionFromStoreItem(requestedStoreItem, lang)
    : requestedModel
      ? missionFromModel(requestedModel, lang)
    : isProfileCreation
      ? {
          title: lang === 'fr' ? 'Créer un profil métier sur mesure' : 'Create a custom job profile',
          target: lang === 'fr' ? 'Responsabilités et périmètre à définir avec Alma' : 'Responsibilities and scope to define with Alma',
          criteria: '', sources: '', exclusions: '',
          result: lang === 'fr' ? 'Un profil métier clair, testable et réutilisable.' : 'A clear, testable and reusable job profile.',
          rule: '',
          validation: lang === 'fr' ? 'Validation humaine avant attribution au Collaborateur IA.' : 'Human approval before assignment to the AI Collaborator.',
        }
    : isSkillCreation
      ? {
          title: lang === 'fr' ? 'Créer une compétence sur mesure' : 'Create a custom skill',
          target: lang === 'fr' ? 'Contexte et résultat attendu à définir avec Alma' : 'Context and expected outcome to define with Alma',
          criteria: '', sources: '', exclusions: '',
          result: lang === 'fr' ? 'Une compétence claire, testable et réutilisable.' : 'A clear, testable and reusable skill.',
          rule: '',
          validation: lang === 'fr' ? 'Validation humaine avant ajout au Collaborateur IA.' : 'Human approval before adding it to the AI Collaborator.',
        }
    : isApplicationCreation
      ? { title: lang === 'fr' ? 'Étudier une nouvelle application' : 'Assess a new application', target: lang === 'fr' ? 'Application et usage à préciser avec Alma' : 'Application and use to define with Alma', criteria: '', sources: '', exclusions: '', result: lang === 'fr' ? 'Une intégration cadrée avec ses accès, actions et validations.' : 'A scoped integration with its access, actions and approvals.', rule: '', validation: lang === 'fr' ? 'Validation humaine avant toute connexion.' : 'Human approval before any connection.' }
    : isModelCreation
      ? { title: lang === 'fr' ? 'Étudier un nouveau modèle IA' : 'Assess a new AI model', target: lang === 'fr' ? 'Modèle ou fournisseur à préciser avec Alma' : 'Model or provider to define with Alma', criteria: '', sources: '', exclusions: '', result: lang === 'fr' ? 'Une étude de compatibilité, coût et conditions d’accès.' : 'An assessment of compatibility, cost and access conditions.', rule: '', validation: lang === 'fr' ? 'Validation humaine avant autorisation.' : 'Human approval before authorization.' }
    : isServerCreation
      ? { title: lang === 'fr' ? 'Étudier une infrastructure IA' : 'Assess AI infrastructure', target: lang === 'fr' ? 'Charge, région et ressources à préciser' : 'Workload, region and resources to define', criteria: '', sources: '', exclusions: '', result: lang === 'fr' ? 'Une configuration chiffrée et validée avant déploiement.' : 'A priced configuration approved before deployment.', rule: '', validation: lang === 'fr' ? 'Validation humaine avant commande ou déploiement.' : 'Human approval before ordering or deployment.' }
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
    missionDefined: catalogMission || requestedStoreItem || requestedModel || isProfileCreation || isSkillCreation || isApplicationCreation || isModelCreation || isServerCreation ? true : explicitMission ? false : Boolean(persisted?.mission.title),
    profile: isProfileCreation
      ? { fr: 'Profil métier à définir', en: 'Job profile to define' }
      : isSkillCreation
        ? { fr: 'Profil métier à choisir', en: 'Job profile to choose' }
      : requestedStoreItem?.type === 'profil' ? requestedStoreItem.name : selectedCollaborator?.role ?? persisted?.profile ?? init.profile,
    collaboratorName: selectedCollaborator?.name ?? persisted?.collaboratorName ?? init.collaboratorName,
    collaboratorTemplateSlug: selectedCollaborator?.slug ?? persisted?.collaboratorTemplateSlug,
    organizationalPlacement: persisted?.organizationalPlacement ?? init.organizationalPlacement,
  }
}

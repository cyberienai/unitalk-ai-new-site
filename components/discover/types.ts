import type { Lang } from '@/lib/language-context'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { normalizeDomain } from '@/lib/discover-profiles'

// Five visible steps. Savoir-faire is NOT a separate screen: Alma determines the
// job profile and skills while adapting the mission, so it is folded into the
// mission → affectation flow. The user starts from the mission, Alma understands
// the company, chooses who carries it, authorizes tools, then opens the Workspace.
export type Step = 'mission' | 'entreprise' | 'affectation' | 'acces' | 'workspace'
export type Entry = 'company' | 'mission' | 'profile'

export const STEP_ORDER: Step[] = ['mission', 'entreprise', 'affectation', 'acces', 'workspace']

// Canonical step labels used by the thin stepper.
export const STEP_LABELS: Record<Step, { fr: string; en: string }> = {
  mission: { fr: 'Mission', en: 'Mission' },
  entreprise: { fr: 'Entreprise', en: 'Company' },
  affectation: { fr: 'Affectation', en: 'Assignment' },
  acces: { fr: 'Accès', en: 'Access' },
  workspace: { fr: 'Workspace', en: 'Workspace' },
}

// Entry-specific label used for the first step of the stepper.
export const ENTRY_STEP_LABELS: Record<Entry, { fr: string; en: string }> = {
  company: { fr: 'Votre besoin', en: 'Your need' },
  mission: { fr: 'Mission', en: 'Mission' },
  profile: { fr: 'Profil métier', en: 'Job profile' },
}

// The assignment decision made on the "affectation" step.
export type Assignment = 'existing' | 'new'

// Number of "context" items that fill the right column in step 2.
export const CONTEXT_ITEMS_TOTAL = 6

export type FlowState = {
  step: Step
  entry: Entry | null
  domain: string
  missionSlug: string
  // Id of the mission draft built on /missions, handed off via the URL.
  // '' when the user starts fresh (company/profile entry, no draft).
  draftId: string
  // 0..CONTEXT_ITEMS_TOTAL — how much of the company context is built.
  contextProgress: number
  // Whether the mission is assigned to an existing Collaborateur IA or a new one.
  assignment: Assignment
  // Slug of the Collaborateur IA that will carry the mission (existing persona).
  assignedSlug: string
}

export const INITIAL_STATE: FlowState = {
  step: 'mission',
  entry: 'company',
  domain: '',
  missionSlug: 'trouver-de-nouveaux-clients',
  draftId: '',
  contextProgress: 0,
  assignment: 'existing',
  assignedSlug: '',
}

// The entry point is already chosen on the previous page and arrives via the
// URL. We resolve it server-side so /decouvrir opens directly on activation.
// Falls back to the "company" entry (Alma asks for the domain in-conversation).
export function resolveInitialState(
  params: Record<string, string | string[] | undefined>,
): FlowState {
  const get = (k: string) => {
    const v = params[k]
    return (Array.isArray(v) ? v[0] : v) ?? ''
  }
  const entryParam = get('entry').toLowerCase()
  const domain = normalizeDomain(get('domain') || get('site'))
  const missionParam = get('mission')
  const profileParam = get('profil') || get('profile')
  // The draft id handed off from /missions (read client-side in the flow).
  const draftId = get('draft')

  if (entryParam === 'mission' || missionParam) {
    const m = missionParam ? MISSIONS.find((x) => x.slug === missionParam) : undefined
    const slug = m?.slug ?? INITIAL_STATE.missionSlug
    // The work is already defined → show it as State 1 (preloaded, editable),
    // then the mission CTA advances to the Company step.
    return {
      ...INITIAL_STATE,
      step: 'mission',
      entry: 'mission',
      missionSlug: slug,
      assignedSlug: getMission(slug).collaboratorSlug,
      domain,
      draftId,
    }
  }
  if (entryParam === 'profile' || entryParam === 'profil' || profileParam) {
    const p = JOB_PROFILES.find((x) => x.key === profileParam)
    const slug = p?.missionSlug ?? INITIAL_STATE.missionSlug
    // No mission yet → start on the "mission" node (Alma helps define it).
    return {
      ...INITIAL_STATE,
      step: 'mission',
      entry: 'profile',
      missionSlug: slug,
      assignedSlug: getMission(slug).collaboratorSlug,
      domain,
      draftId,
    }
  }
  return {
    ...INITIAL_STATE,
    step: 'mission',
    entry: 'company',
    assignedSlug: getMission(INITIAL_STATE.missionSlug).collaboratorSlug,
    domain,
    draftId,
  }
}

// Category badge labels (kept in sync with the catalog categories used below).
export const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  ventes: { fr: 'Ventes', en: 'Sales' },
  support: { fr: 'Relation client', en: 'Customer relations' },
  marketing: { fr: 'Marketing', en: 'Marketing' },
  reunions: { fr: 'Réunions', en: 'Meetings' },
  analyse: { fr: 'Analyse', en: 'Analysis' },
  automatisation: { fr: 'Automatisation', en: 'Automation' },
  developpement: { fr: 'Développement', en: 'Development' },
}

// Curated shortlist of missions surfaced on the "Une mission" entry.
// Each maps to a real catalog slug so the proposal reuses verified copy.
export const CURATED_MISSION_SLUGS: string[] = [
  'trouver-de-nouveaux-clients',
  'repondre-a-mes-clients',
  'creer-mes-contenus',
  'preparer-et-suivre-mes-reunions',
  'preparer-mon-reporting-financier',
  'automatiser-mes-operations',
]

export function getMission(slug: string): Mission {
  return MISSIONS.find((m) => m.slug === slug) ?? MISSIONS[0]
}

export function curatedMissions(): Mission[] {
  return CURATED_MISSION_SLUGS.map(getMission)
}

// Job profiles surfaced on the "Un profil métier" entry. Each proposes a
// default first mission (a real catalog slug) so path 3 lands on a proposal.
export type JobProfile = {
  key: string
  label: { fr: string; en: string }
  summary: { fr: string; en: string }
  skills: { fr: string; en: string }[]
  category: string
  missionSlug: string
}

export const JOB_PROFILES: JobProfile[] = [
  {
    key: 'assistanat',
    label: { fr: 'Assistanat de direction', en: 'Executive assistance' },
    summary: {
      fr: 'Organiser, préparer et suivre le quotidien de la direction.',
      en: 'Organize, prepare and follow up the leadership’s day-to-day.',
    },
    skills: [
      { fr: 'Organisation', en: 'Organization' },
      { fr: 'Comptes rendus', en: 'Minutes' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    category: 'reunions',
    missionSlug: 'preparer-et-suivre-mes-reunions',
  },
  {
    key: 'commercial',
    label: { fr: 'Développement commercial', en: 'Business development' },
    summary: {
      fr: 'Identifier les opportunités, qualifier les prospects et préparer les prises de contact.',
      en: 'Spot opportunities, qualify prospects and prepare outreach.',
    },
    skills: [
      { fr: 'Ciblage', en: 'Targeting' },
      { fr: 'Prospection', en: 'Prospecting' },
      { fr: 'Qualification', en: 'Qualification' },
    ],
    category: 'ventes',
    missionSlug: 'trouver-de-nouveaux-clients',
  },
  {
    key: 'relation-client',
    label: { fr: 'Relation client', en: 'Customer relations' },
    summary: {
      fr: 'Répondre aux demandes, résoudre les problèmes et fidéliser.',
      en: 'Answer requests, solve problems and build loyalty.',
    },
    skills: [
      { fr: 'Réponses', en: 'Replies' },
      { fr: 'Priorisation', en: 'Prioritization' },
      { fr: 'Suivi', en: 'Follow-up' },
    ],
    category: 'support',
    missionSlug: 'repondre-a-mes-clients',
  },
  {
    key: 'contenu',
    label: { fr: 'Stratégie de contenu', en: 'Content strategy' },
    summary: {
      fr: 'Produire des contenus réguliers, alignés sur votre voix et vos objectifs.',
      en: 'Produce regular content aligned with your voice and goals.',
    },
    skills: [
      { fr: 'Rédaction', en: 'Writing' },
      { fr: 'Planification', en: 'Planning' },
      { fr: 'Ligne éditoriale', en: 'Editorial line' },
    ],
    category: 'marketing',
    missionSlug: 'creer-mes-contenus',
  },
  {
    key: 'pilotage',
    label: { fr: 'Analyse et pilotage', en: 'Analysis and steering' },
    summary: {
      fr: 'Suivre les chiffres, expliquer les écarts et préparer les décisions.',
      en: 'Track the numbers, explain variances and prepare decisions.',
    },
    skills: [
      { fr: 'Analyse', en: 'Analysis' },
      { fr: 'Reporting', en: 'Reporting' },
      { fr: 'Synthèse', en: 'Synthesis' },
    ],
    category: 'analyse',
    missionSlug: 'preparer-mon-reporting-financier',
  },
  {
    key: 'developpement',
    label: { fr: 'Développement logiciel', en: 'Software development' },
    summary: {
      fr: 'Construire des fonctionnalités et corriger les anomalies, à votre rythme.',
      en: 'Build features and fix issues, at your own pace.',
    },
    skills: [
      { fr: 'Développement', en: 'Development' },
      { fr: 'Tests', en: 'Testing' },
      { fr: 'Revue', en: 'Review' },
    ],
    category: 'developpement',
    missionSlug: 'automatiser-mes-operations',
  },
]

export function pick<T>(dict: { fr: T; en: T }, lang: Lang): T {
  return dict[lang]
}

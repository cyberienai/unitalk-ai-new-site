import type { Lang } from '@/lib/language-context'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'

export type Step = 'start' | 'context' | 'proposal' | 'connect' | 'workspace'
export type Entry = 'company' | 'mission' | 'profile'

export const STEP_ORDER: Step[] = ['start', 'context', 'proposal', 'connect', 'workspace']

export const STEP_LABELS: Record<Step, { fr: string; en: string }> = {
  start: { fr: 'Commencer', en: 'Start' },
  context: { fr: 'Contexte', en: 'Context' },
  proposal: { fr: 'Proposition', en: 'Proposal' },
  connect: { fr: 'Connexion', en: 'Sign in' },
  workspace: { fr: 'Workspace', en: 'Workspace' },
}

// Number of "context" items that fill the right column in step 2.
export const CONTEXT_ITEMS_TOTAL = 6

export type FlowState = {
  step: Step
  entry: Entry | null
  domain: string
  missionSlug: string
  // 0..CONTEXT_ITEMS_TOTAL — how much of the Organization context is built.
  contextProgress: number
}

export const INITIAL_STATE: FlowState = {
  step: 'start',
  entry: null,
  domain: '',
  missionSlug: 'trouver-de-nouveaux-clients',
  contextProgress: 0,
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

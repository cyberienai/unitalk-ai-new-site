import type { Lang } from '@/lib/language-context'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'

// -------------------------------------------------------------------------- //
// Onboarding model — a simple, premium account-creation flow.                //
//                                                                            //
// Account (no stepper) → then three visible steps:                           //
//   Entreprise → Mission → Collaborateur IA                                  //
//                                                                            //
// Everything lives in ONE shared state so the mission never changes between  //
// steps and the chosen first name appears immediately in the CTA. Demo data  //
// is coherent and persistent across screens.                                 //
// -------------------------------------------------------------------------- //

export type OnboardingStep = 'entreprise' | 'mission' | 'collaborateur'

export const STEP_ORDER: OnboardingStep[] = ['entreprise', 'mission', 'collaborateur']

export const STEP_LABELS: Record<OnboardingStep, { fr: string; en: string }> = {
  entreprise: { fr: 'Entreprise', en: 'Company' },
  mission: { fr: 'Mission', en: 'Mission' },
  collaborateur: { fr: 'Collaborateur IA', en: 'AI Collaborator' },
}

// A single company fact. `uncertain` renders as "À confirmer" — Alma never
// invents an information she isn't sure about.
export type CompanyFact = {
  key: 'name' | 'domain' | 'activity' | 'offer' | 'clients'
  label: { fr: string; en: string }
  value: string
  uncertain?: boolean
}

// The structured mission, kept intentionally short (four fields only).
export type MissionInfo = {
  title: string
  result: string
  rule: string
  validation: string
}

export type OnboardingState = {
  authenticated: boolean
  firstName: string
  lastName: string
  firstNameKnown: boolean
  lastNameKnown: boolean
  company: CompanyFact[]
  mission: MissionInfo
  // Whether the user has defined the mission yet (drives step 2 → 3 gating).
  missionDefined: boolean
  // Recommended job profile for the first Collaborateur (e.g. "Finance").
  profile: { fr: string; en: string }
  // The chosen first name of the first AI Collaborator ('' until named).
  collaboratorName: string
}

// The one example surfaced on the Mission step (concrete, not decorative).
export const MISSION_EXAMPLE = {
  fr: 'Relancer les factures impayées sans contacter les clients ayant un litige.',
  en: 'Chase unpaid invoices without contacting customers who have a dispute.',
}

// The structured mission Alma proposes from the example / a free description.
// Demo data, coherent with the example and the Finance profile.
export const MISSION_SEED: MissionInfo = {
  title: 'Relancer les factures impayées',
  result: 'Chaque facture en retard est relancée au bon moment, sauf litige en cours.',
  rule: 'Ne jamais contacter un client ayant un litige ouvert.',
  validation: 'Validation humaine requise avant tout envoi.',
}

const MISSION_SEED_EN: MissionInfo = {
  title: 'Chase unpaid invoices',
  result: 'Every overdue invoice is chased at the right time, except open disputes.',
  rule: 'Never contact a customer with an open dispute.',
  validation: 'Human approval required before any send.',
}

export function seededMission(lang: Lang): MissionInfo {
  return lang === 'fr' ? { ...MISSION_SEED } : { ...MISSION_SEED_EN }
}

// The initial shared state — Alma's prepared first context (demo company).
export function initialOnboardingState(): OnboardingState {
  return {
    authenticated: false,
    firstName: '',
    lastName: '',
    firstNameKnown: false,
    lastNameKnown: false,
    company: [
      { key: 'name', label: { fr: 'Entreprise', en: 'Company' }, value: 'Solvea' },
      { key: 'domain', label: { fr: 'Domaine', en: 'Domain' }, value: 'solvea.fr' },
      {
        key: 'activity',
        label: { fr: 'Activité', en: 'Activity' },
        value: 'Logiciel de facturation et de trésorerie pour PME.',
      },
      {
        key: 'offer',
        label: { fr: 'Offre', en: 'Offer' },
        value: 'Abonnement mensuel à une plateforme de gestion financière.',
      },
      // Left uncertain on purpose — Alma isn't sure, so she asks to confirm.
      { key: 'clients', label: { fr: 'Clients', en: 'Customers' }, value: '', uncertain: true },
    ],
    mission: { title: '', result: '', rule: '', validation: '' },
    missionDefined: false,
    profile: { fr: 'Finance', en: 'Finance' },
    collaboratorName: '',
  }
}

// -------------------------------------------------------------------------- //
// Kept helpers — imported by home components (alma-panel, section-missions).  //
// -------------------------------------------------------------------------- //

export function getMission(slug: string): Mission {
  return MISSIONS.find((m) => m.slug === slug) ?? MISSIONS[0]
}

export function pick<T>(dict: { fr: T; en: T }, lang: Lang): T {
  return dict[lang]
}

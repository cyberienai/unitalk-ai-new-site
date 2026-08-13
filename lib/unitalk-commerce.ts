export type LicenseType = 'ai-collaborator' | 'ai-cocreator' | 'alma'
export type CreditType = 'ai' | 'assistance' | 'mission'
export type MissionExecutor = 'alma' | 'ai-cocreator' | 'ai-engineer' | 'unitalk-team' | 'customer-ai-collaborator'

export type CreditProduct = {
  id: string
  stripePriceId: string
  creditType: CreditType
  creditsGranted: number
  amount: number
  currency: 'EUR'
  active: boolean
}

export type UnitalkMissionCommerce = {
  subcategory: string
  executor: MissionExecutor
  outcome: string
  deliverables: string[]
  prerequisites: string[]
  exclusions: string[]
  applications: string[]
  humanValidations: string[]
  pricing: {
    missionCredits?: number
    assistanceCredits?: number
    estimatedAiCredits?: { min: number; max: number }
  }
  canBeCustomized: boolean
  requiresQuote: boolean
}

// No Stripe SKU is configured in this repository. Products must only become
// active after a server-owned price ID and verified webhook ledger exist.
export const CREDIT_PRODUCTS: readonly CreditProduct[] = []

export const UNITAlK_SUBCATEGORIES = [
  ['demarrage', 'Démarrage'],
  ['identite', 'Identité'],
  ['profils-competences', 'Profils et compétences'],
  ['missions', 'Missions'],
  ['applications', 'Applications'],
  ['desktop', 'Desktop'],
  ['terminal', 'Terminal'],
  ['ai-gateway', 'AI Gateway'],
  ['hebergement', 'Hébergement'],
  ['migration', 'Migration'],
  ['collaboration', 'Collaboration'],
] as const

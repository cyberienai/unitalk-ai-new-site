// Modèle tarifaire du bon de commande.
// NOTE: toutes les valeurs chiffrées ci-dessous sont des EXEMPLES à ajuster
// (paliers dégressifs, packs de crédits, tokens inclus). La structure est prête ;
// remplacez les montants par les tarifs officiels quand ils seront arrêtés.

export type Lang = 'fr' | 'en'
export type Bilingual = { fr: string; en: string }

// --- Paliers dégressifs sur le nombre de Collaborateurs IA -------------------
// unit = prix mensuel par Collaborateur IA (EXEMPLE).
export type PricingTier = {
  min: number
  max: number | null // null = et plus
  unit: number | null // null = sur devis
  label: Bilingual
}

export const COLLABORATOR_TIERS: PricingTier[] = [
  { min: 1, max: 1, unit: 49, label: { fr: '1 Collaborateur IA', en: '1 AI Collaborator' } },
  { min: 2, max: 4, unit: 44, label: { fr: '2 à 4', en: '2 to 4' } },
  { min: 5, max: 9, unit: 39, label: { fr: '5 à 9', en: '5 to 9' } },
  { min: 10, max: null, unit: null, label: { fr: '10 et plus', en: '10 and up' } },
]

export function tierForCount(count: number): PricingTier {
  const safe = Math.max(1, count)
  return (
    COLLABORATOR_TIERS.find((t) => safe >= t.min && (t.max === null || safe <= t.max)) ??
    COLLABORATOR_TIERS[COLLABORATOR_TIERS.length - 1]
  )
}

// Prix unitaire dégressif pour un nombre donné de Collaborateurs IA.
// Retourne null si le palier est "sur devis".
export function unitPriceForCount(count: number): number | null {
  return tierForCount(count).unit
}

// --- Modes de consommation ---------------------------------------------------
export type ConsumptionModeId = 'subscription' | 'credits' | 'byok'

export type ConsumptionMode = {
  id: ConsumptionModeId
  name: Bilingual
  tagline: Bilingual
  description: Bilingual
  // Ajout mensuel par organisation (EXEMPLE). 0 = inclus / à votre charge.
  monthlyAddon: number
  priceLabel: Bilingual
}

export const CONSUMPTION_MODES: ConsumptionMode[] = [
  {
    id: 'subscription',
    name: { fr: 'Abonnement', en: 'Subscription' },
    tagline: { fr: 'Recommandé', en: 'Recommended' },
    description: {
      fr: '10 millions de tokens inclus par mois et par Collaborateur IA. Rien à gérer.',
      en: '10 million tokens included per month per AI Collaborator. Nothing to manage.',
    },
    monthlyAddon: 0,
    priceLabel: { fr: 'Inclus', en: 'Included' },
  },
  {
    id: 'credits',
    name: { fr: 'Crédits prépayés', en: 'Prepaid credits' },
    tagline: { fr: 'À l’usage', en: 'Pay as you go' },
    description: {
      fr: 'Un pack de crédits que vous consommez à l’usage, sans engagement mensuel.',
      en: 'A pack of credits you spend as you go, with no monthly commitment.',
    },
    monthlyAddon: 20, // EXEMPLE: pack de départ
    priceLabel: { fr: 'dès 20€ / pack', en: 'from €20 / pack' },
  },
  {
    id: 'byok',
    name: { fr: 'BYOK', en: 'BYOK' },
    tagline: { fr: 'Vos propres clés', en: 'Your own keys' },
    description: {
      fr: 'Connectez vos propres clés API. La consommation des modèles est facturée par votre fournisseur.',
      en: 'Connect your own API keys. Model usage is billed directly by your provider.',
    },
    monthlyAddon: 0,
    priceLabel: { fr: 'À votre charge', en: 'On your side' },
  },
]

export function consumptionMode(id: ConsumptionModeId): ConsumptionMode {
  return CONSUMPTION_MODES.find((m) => m.id === id) ?? CONSUMPTION_MODES[0]
}

// --- Calcul du récapitulatif -------------------------------------------------
export type OrderSummary = {
  count: number
  unit: number | null
  collaboratorsTotal: number | null
  addon: number
  total: number | null // null = sur devis
  isQuote: boolean
}

export function computeOrder(count: number, mode: ConsumptionModeId): OrderSummary {
  const safe = Math.max(1, count)
  const unit = unitPriceForCount(safe)
  const addon = consumptionMode(mode).monthlyAddon
  if (unit === null) {
    return { count: safe, unit: null, collaboratorsTotal: null, addon, total: null, isQuote: true }
  }
  const collaboratorsTotal = unit * safe
  return {
    count: safe,
    unit,
    collaboratorsTotal,
    addon,
    total: collaboratorsTotal + addon,
    isQuote: false,
  }
}

export function formatEuro(value: number, lang: Lang): string {
  return lang === 'fr' ? `${value}€` : `€${value}`
}

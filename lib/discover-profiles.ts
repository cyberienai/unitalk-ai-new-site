// Simulated "company analysis" profiles for the /decouvrir experience.
//
// IMPORTANT — honesty: this is a *demonstration*. We do not fetch or analyze
// the real website. From the domain, we pick a plausible profile-type and
// present a proposed organization to *confirm*, never a factual audit.
// The UI must always label the result as "Aperçu de démonstration à confirmer".

import type { Bilingual } from './collaborators-catalog'

export type DiscoverFunction = {
  key: string
  label: Bilingual
  // slug of the recommended AI Collaborator from the real roster (ROLE_DETAILS)
  recommended: string
}

export type CompanyProfile = {
  key: string
  label: Bilingual
  tagline: Bilingual
  functions: DiscoverFunction[]
}

// Real roster slugs available: emma, lea, arthur, hugo, nadia, ines
export const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  saas: {
    key: 'saas',
    label: { fr: 'Éditeur de logiciel (SaaS)', en: 'Software company (SaaS)' },
    tagline: {
      fr: 'Produit en ligne, croissance rapide, équipes tech et marketing au cœur.',
      en: 'Online product, fast growth, tech and marketing at the core.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'marketing', label: { fr: 'Marketing', en: 'Marketing' }, recommended: 'lea' },
      { key: 'engineering', label: { fr: 'Développement', en: 'Engineering' }, recommended: 'arthur' },
      { key: 'sales', label: { fr: 'Ventes', en: 'Sales' }, recommended: 'hugo' },
      { key: 'support', label: { fr: 'Relation client', en: 'Customer Relations' }, recommended: 'ines' },
    ],
  },
  agence: {
    key: 'agence',
    label: { fr: 'Agence', en: 'Agency' },
    tagline: {
      fr: 'Prestations créatives et marketing pour des clients, au rythme des projets.',
      en: 'Creative and marketing services for clients, project after project.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'marketing', label: { fr: 'Contenu & création', en: 'Content & creative' }, recommended: 'lea' },
      { key: 'sales', label: { fr: 'Développement commercial', en: 'Business development' }, recommended: 'hugo' },
      { key: 'support', label: { fr: 'Relation client', en: 'Client relations' }, recommended: 'ines' },
    ],
  },
  conseil: {
    key: 'conseil',
    label: { fr: 'Cabinet de conseil', en: 'Consulting firm' },
    tagline: {
      fr: 'Expertise et accompagnement, pilotage financier et relation client soignée.',
      en: 'Expertise and advisory, financial steering and careful client care.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'finance', label: { fr: 'Finance', en: 'Finance' }, recommended: 'nadia' },
      { key: 'sales', label: { fr: 'Développement commercial', en: 'Business development' }, recommended: 'hugo' },
      { key: 'support', label: { fr: 'Relation client', en: 'Client relations' }, recommended: 'ines' },
    ],
  },
  ecommerce: {
    key: 'ecommerce',
    label: { fr: 'E-commerce', en: 'E-commerce' },
    tagline: {
      fr: 'Boutique en ligne : acquisition, service client et logistique au quotidien.',
      en: 'Online store: acquisition, customer service and daily operations.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'marketing', label: { fr: 'Marketing', en: 'Marketing' }, recommended: 'lea' },
      { key: 'support', label: { fr: 'Service client', en: 'Customer service' }, recommended: 'ines' },
      { key: 'finance', label: { fr: 'Finance', en: 'Finance' }, recommended: 'nadia' },
    ],
  },
  pme: {
    key: 'pme',
    label: { fr: 'PME', en: 'SMB' },
    tagline: {
      fr: 'Une équipe polyvalente : direction, commerce, finance et relation client.',
      en: 'A versatile team: leadership, sales, finance and customer relations.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'sales', label: { fr: 'Ventes', en: 'Sales' }, recommended: 'hugo' },
      { key: 'finance', label: { fr: 'Finance', en: 'Finance' }, recommended: 'nadia' },
      { key: 'support', label: { fr: 'Relation client', en: 'Customer Relations' }, recommended: 'ines' },
    ],
  },
  default: {
    key: 'default',
    label: { fr: 'Organisation', en: 'Organization' },
    tagline: {
      fr: 'Une base solide pour démarrer, à adapter à votre réalité.',
      en: 'A solid starting point, to adapt to your reality.',
    },
    functions: [
      { key: 'direction', label: { fr: 'Direction', en: 'Leadership' }, recommended: 'emma' },
      { key: 'marketing', label: { fr: 'Marketing', en: 'Marketing' }, recommended: 'lea' },
      { key: 'sales', label: { fr: 'Ventes', en: 'Sales' }, recommended: 'hugo' },
      { key: 'support', label: { fr: 'Relation client', en: 'Customer Relations' }, recommended: 'ines' },
    ],
  },
}

// Deterministic keyword-based guess from a domain string.
// Purely heuristic (and honest about it): used only to pick a demo profile.
export function guessProfileKey(domain: string): string {
  const d = domain.toLowerCase()
  if (/(shop|store|boutique|commerce|cart|market)/.test(d)) return 'ecommerce'
  if (/(agence|agency|studio|creative|media)/.test(d)) return 'agence'
  if (/(conseil|consulting|advisory|partners|avocat|law|legal)/.test(d)) return 'conseil'
  if (/(app|io|ai|cloud|tech|labs|software|saas|data)/.test(d)) return 'saas'
  return 'pme'
}

export function getProfile(key: string): CompanyProfile {
  return COMPANY_PROFILES[key] ?? COMPANY_PROFILES.default
}

// Normalizes a user-typed domain/URL into a bare hostname (or '' if invalid).
export function normalizeDomain(input: string): string {
  let s = input.trim().toLowerCase()
  if (!s) return ''
  s = s.replace(/^https?:\/\//, '').replace(/^www\./, '')
  s = s.split('/')[0].split('?')[0].split('#')[0]
  // must look like a domain: label(.label)+
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(s)) return ''
  return s
}

// Store taxonomy + semantic search for the Missions marketplace.
// Reuses the real catalog facets (sectors, zones, deliverable types) so nothing
// is invented — the sidebar filters map onto data that actually exists.

import {
  MISSIONS,
  missionFacets,
  SECTOR_LABELS,
  ZONE_LABELS,
  MODALITY_LABELS,
  type Mission,
} from '@/lib/missions-catalog'
import type { Bilingual } from '@/lib/collaborators-catalog'
import type { Lang } from '@/lib/language-context'

export type Facet = { key: string; label: Bilingual }

// --- NEED (top-level sidebar group) -> maps onto real catalog categories. ---
export type NeedGroup = { key: string; label: Bilingual; cats: string[] }

export const NEEDS: NeedGroup[] = [
  { key: 'grow', label: { fr: 'Développer l’activité', en: 'Grow the business' }, cats: ['ventes'] },
  { key: 'serve', label: { fr: 'Servir les clients', en: 'Serve customers' }, cats: ['support'] },
  { key: 'produce', label: { fr: 'Produire et communiquer', en: 'Produce and communicate' }, cats: ['marketing'] },
  { key: 'steer', label: { fr: 'Piloter l’Organisation', en: 'Steer the organization' }, cats: ['reunions', 'analyse', 'finance'] },
  { key: 'automate', label: { fr: 'Automatiser les opérations', en: 'Automate operations' }, cats: ['automatisation'] },
  { key: 'build', label: { fr: 'Développer les produits', en: 'Build products' }, cats: ['developpement'] },
]

export function needOf(category: string): string {
  return NEEDS.find((n) => n.cats.includes(category))?.key ?? 'grow'
}

// --- Facet lists derived from the missions actually present in the catalog. ---
function facetsPresent(pick: (m: Mission) => string[], labels: Record<string, Bilingual>): Facet[] {
  const seen = new Set<string>()
  for (const m of MISSIONS) for (const v of pick(m)) seen.add(v)
  return Object.keys(labels)
    .filter((k) => seen.has(k))
    .map((k) => ({ key: k, label: labels[k] }))
}

export const SECTORS: Facet[] = facetsPresent((m) => missionFacets(m).sectors, SECTOR_LABELS)
export const ZONES: Facet[] = facetsPresent((m) => missionFacets(m).zones, ZONE_LABELS)
// Modality replaces the old "deliverable" facet: how the Collaborator works, not a technical output.
export const MODALITIES: Facet[] = facetsPresent((m) => [missionFacets(m).modality], MODALITY_LABELS)

export type StoreFilters = {
  need: string | 'all'
  sector: string | 'all'
  zone: string | 'all'
  modalite: string | 'all'
}

export const EMPTY_FILTERS: StoreFilters = { need: 'all', sector: 'all', zone: 'all', modalite: 'all' }

export function activeFilterCount(f: StoreFilters): number {
  return [f.need, f.sector, f.zone, f.modalite].filter((v) => v !== 'all').length
}

// --- Sort ------------------------------------------------------------------
export type SortKey = 'recommended' | 'recent' | 'az'
export const DEFAULT_SORT: SortKey = 'recommended'

export const SORT_OPTIONS: { key: SortKey; label: Bilingual }[] = [
  { key: 'recommended', label: { fr: 'Recommandées', en: 'Recommended' } },
  { key: 'recent', label: { fr: 'Plus récentes', en: 'Most recent' } },
  { key: 'az', label: { fr: 'Ordre alphabétique', en: 'Alphabetical' } },
]

// Catalog index = authoring order. Later in the array == more recently added.
const ORDER = new Map(MISSIONS.map((m, i) => [m.slug, i]))

export function sortMissions(list: Mission[], sort: SortKey, lang: Lang): Mission[] {
  if (sort === 'recommended') return list
  const copy = [...list]
  if (sort === 'recent') {
    copy.sort((a, b) => (ORDER.get(b.slug) ?? 0) - (ORDER.get(a.slug) ?? 0))
  } else if (sort === 'az') {
    copy.sort((a, b) => a.title[lang].localeCompare(b.title[lang], lang))
  }
  return copy
}

// --- URL <-> state ---------------------------------------------------------
// Query keys are French-facing, per the product URLs (?besoin=, ?secteur=, …).
export function filtersFromParams(params: URLSearchParams): StoreFilters {
  return {
    need: params.get('besoin') || 'all',
    sector: params.get('secteur') || 'all',
    zone: params.get('zone') || 'all',
    modalite: params.get('modalite') || 'all',
  }
}

export function sortFromParams(params: URLSearchParams): SortKey {
  const v = params.get('tri')
  return v === 'recent' || v === 'az' ? v : DEFAULT_SORT
}

// Builds the query string for the given state, omitting defaults so URLs stay clean.
export function buildParams(query: string, filters: StoreFilters, sort: SortKey): string {
  const p = new URLSearchParams()
  if (query.trim()) p.set('q', query.trim())
  if (filters.need !== 'all') p.set('besoin', filters.need)
  if (filters.sector !== 'all') p.set('secteur', filters.sector)
  if (filters.zone !== 'all') p.set('zone', filters.zone)
  if (filters.modalite !== 'all') p.set('modalite', filters.modalite)
  if (sort !== DEFAULT_SORT) p.set('tri', sort)
  return p.toString()
}

// --- Editorial selection when no org context is known ("Pour commencer"). ---
export const HIGH_IMPACT_SLUGS = [
  'trouver-de-nouveaux-clients',
  'repondre-a-mes-clients',
  'preparer-et-suivre-mes-reunions',
]
const HIGH_IMPACT_SET = new Set(HIGH_IMPACT_SLUGS)
export function isHighImpact(slug: string): boolean {
  return HIGH_IMPACT_SET.has(slug)
}

// How many catalog cards to reveal per "show more" click.
export const PAGE_SIZE = 12

// --- Semantic search -------------------------------------------------------
// Lightweight synonym expansion per mission so a described goal matches the
// right result — and a query never surfaces unrelated missions.
const SYNONYMS: Record<string, string[]> = {
  'trouver-de-nouveaux-clients': ['prospect', 'prospection', 'lead', 'client', 'vente', 'commercial', 'pipeline', 'cible', 'demarchage'],
  'relancer-les-opportunites': ['relance', 'opportunite', 'dormant', 'reactiver', 'pipeline', 'suivi', 'closing'],
  'repondre-a-mes-clients': ['support', 'ticket', 'reclamation', 'demande', 'sav', 'reponse', 'assistance', 'client'],
  'construire-ma-faq': ['faq', 'reponse type', 'macro', 'canned', 'base de connaissance', 'aide'],
  'creer-mes-contenus': ['contenu', 'article', 'blog', 'campagne', 'redaction', 'newsletter', 'communication'],
  'animer-mes-reseaux-sociaux': ['reseaux sociaux', 'social', 'publication', 'post', 'linkedin', 'instagram', 'calendrier editorial'],
  'ameliorer-mon-referencement': ['seo', 'referencement', 'mots cles', 'google', 'trafic', 'optimisation', 'ranking'],
  'preparer-et-suivre-mes-reunions': ['reunion', 'compte rendu', 'meeting', 'ordre du jour', 'decision', 'action', 'suivi', 'revue'],
  'preparer-mon-reporting-financier': ['reporting', 'finance', 'financier', 'kpi', 'tableau de bord', 'comptable', 'mensuel', 'chiffre'],
  'automatiser-mes-operations': ['automatiser', 'automatisation', 'workflow', 'repetitif', 'operation', 'process', 'tache'],
  'developper-une-fonctionnalite': ['fonctionnalite', 'feature', 'developpement', 'code', 'produit', 'implementer'],
  'corriger-un-lot-de-bugs': ['bug', 'anomalie', 'correction', 'incident', 'qa', 'ticket technique', 'fix'],
  'qualifier-les-leads-entrants': ['lead', 'qualification', 'entrant', 'inbound', 'scoring', 'tri', 'prospect'],
  'prospection-telephonique': ['telephone', 'appel', 'cold call', 'phoning', 'prospection', 'script', 'appels'],
  'preparer-mes-rendez-vous-commerciaux': ['rendez-vous', 'meeting', 'commercial', 'dossier', 'preparation', 'closing'],
  'rediger-mes-devis': ['devis', 'quote', 'chiffrage', 'proposition', 'prix', 'tarif'],
  'traiter-les-avis-clients': ['avis', 'review', 'note', 'commentaire', 'reputation', 'feedback'],
  'assurer-le-support-telephonique': ['telephone', 'appel', 'hotline', 'support', 'standard', 'call'],
  'suivre-la-satisfaction-client': ['satisfaction', 'nps', 'csat', 'enquete', 'sondage', 'retour client'],
  'rediger-ma-newsletter': ['newsletter', 'email', 'infolettre', 'emailing', 'abonnes', 'diffusion'],
  'produire-mes-fiches-produits': ['fiche produit', 'catalogue', 'ecommerce', 'description', 'produit', 'seo'],
  'preparer-mes-campagnes-emailing': ['emailing', 'campagne', 'email', 'segmentation', 'newsletter', 'envoi'],
  'transcrire-mes-reunions': ['transcription', 'transcrire', 'reunion', 'notes', 'compte rendu', 'audio'],
  'coordonner-les-agendas': ['agenda', 'calendrier', 'planning', 'creneau', 'rendez-vous', 'disponibilite'],
  'organiser-un-evenement-interne': ['evenement', 'event', 'seminaire', 'logistique', 'organisation', 'reunion'],
  'analyser-mes-donnees': ['analyse', 'donnees', 'data', 'statistiques', 'tendance', 'insight'],
  'produire-un-tableau-de-bord': ['tableau de bord', 'dashboard', 'kpi', 'indicateur', 'reporting', 'bi'],
  'realiser-une-veille-concurrentielle': ['veille', 'concurrence', 'concurrentielle', 'marche', 'benchmark', 'competitor'],
  'suivre-ma-tresorerie': ['tresorerie', 'cash', 'cashflow', 'liquidite', 'finance', 'flux'],
  'relancer-les-factures-impayees': ['facture', 'impaye', 'relance', 'recouvrement', 'paiement', 'retard'],
  'preparer-mes-notes-de-frais': ['note de frais', 'frais', 'depense', 'justificatif', 'remboursement', 'expense'],
  'etablir-mes-previsions-budgetaires': ['budget', 'prevision', 'previsionnel', 'forecast', 'ecart', 'planification'],
  'connecter-mes-applications': ['integration', 'connecter', 'api', 'application', 'outil', 'synchronisation'],
  'synchroniser-mon-crm': ['crm', 'synchronisation', 'sync', 'donnees', 'integration', 'nettoyage'],
  'automatiser-la-saisie-de-donnees': ['saisie', 'donnees', 'ocr', 'extraction', 'automatiser', 'ressaisie'],
  'surveiller-mes-processus': ['surveillance', 'monitoring', 'alerte', 'processus', 'panne', 'supervision'],
  'reviser-le-code': ['revue', 'review', 'code', 'relecture', 'qualite', 'pull request'],
  'rediger-la-documentation-technique': ['documentation', 'doc', 'technique', 'api', 'readme', 'redaction'],
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function haystack(m: Mission, lang: Lang): string {
  const syn = SYNONYMS[m.slug] ?? []
  return normalize(
    [m.title[lang], m.result[lang], m.objective[lang], m.deliverable[lang], ...syn].join(' '),
  )
}

export type Scored = { mission: Mission; score: number }

// Returns missions ranked by relevance. Empty query -> score 0 for all (caller
// keeps catalog order). A query only keeps missions that actually match a token.
export function searchMissions(query: string, lang: Lang): Scored[] {
  const q = normalize(query)
  if (!q) return MISSIONS.map((mission) => ({ mission, score: 0 }))
  const tokens = q.split(' ').filter((t) => t.length > 2)
  if (tokens.length === 0) return MISSIONS.map((mission) => ({ mission, score: 0 }))

  const scored: Scored[] = []
  for (const mission of MISSIONS) {
    const hay = haystack(mission, lang)
    const title = normalize(mission.title[lang])
    let score = 0
    for (const tok of tokens) {
      if (title.includes(tok)) score += 3
      else if (hay.includes(tok)) score += 1
    }
    if (score > 0) scored.push({ mission, score })
  }
  return scored.sort((a, b) => b.score - a.score)
}

// Search suggestions grouped for the dropdown panel.
export function searchSuggestions(query: string, lang: Lang, limit = 3): Mission[] {
  return searchMissions(query, lang)
    .slice(0, limit)
    .map((s) => s.mission)
}

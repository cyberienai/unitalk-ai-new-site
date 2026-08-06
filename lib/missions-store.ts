// Store taxonomy + semantic search for the Missions marketplace.
// Reuses the real catalog facets (sectors, zones, deliverable types) so nothing
// is invented — the sidebar filters map onto data that actually exists.

import {
  MISSIONS,
  missionFacets,
  SECTOR_LABELS,
  ZONE_LABELS,
  DELIVERABLE_TYPE_LABELS,
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
export const DELIVERABLES: Facet[] = facetsPresent(
  (m) => [missionFacets(m).deliverableType],
  DELIVERABLE_TYPE_LABELS,
)

export type StoreFilters = {
  need: string | 'all'
  sector: string | 'all'
  zone: string | 'all'
  deliverable: string | 'all'
}

export const EMPTY_FILTERS: StoreFilters = { need: 'all', sector: 'all', zone: 'all', deliverable: 'all' }

export function activeFilterCount(f: StoreFilters): number {
  return [f.need, f.sector, f.zone, f.deliverable].filter((v) => v !== 'all').length
}

// --- Editorial selection when no org context is known ("Pour commencer"). ---
export const HIGH_IMPACT_SLUGS = [
  'trouver-de-nouveaux-clients',
  'repondre-a-mes-clients',
  'preparer-et-suivre-mes-reunions',
]

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

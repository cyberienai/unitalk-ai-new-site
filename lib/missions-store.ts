// Store taxonomy + semantic search for the Missions marketplace.
// Maps the 144-mission catalog onto the marketplace navigation: 12 categories
// (single-select), 7 editorial collections (single-select) and multi-select
// facet filters (secteur, zone, langue, modalité) plus a disponibilité filter.

import {
  MISSIONS,
  MISSION_CATEGORIES,
  MISSION_COLLECTIONS,
  SECTOR_LABELS,
  ZONE_LABELS,
  LANGUAGE_LABELS,
  MODALITY_LABELS,
  STATUS_LABELS,
  SEARCH_SYNONYMS,
  type Mission,
  type MissionStatus,
} from '@/lib/missions-catalog'
import type { Bilingual } from '@/lib/collaborators-catalog'
import type { Lang } from '@/lib/language-context'

export type Facet = { key: string; label: Bilingual }

// --- Facet lists (only values actually present in the catalog, in label order) ---
function facetsPresent(pick: (m: Mission) => string[], labels: Record<string, Bilingual>): Facet[] {
  const seen = new Set<string>()
  for (const m of MISSIONS) for (const v of pick(m)) seen.add(v)
  return Object.keys(labels)
    .filter((k) => seen.has(k))
    .map((k) => ({ key: k, label: labels[k] }))
}

export const SECTORS: Facet[] = facetsPresent((m) => m.sectors, SECTOR_LABELS)
export const ZONES: Facet[] = facetsPresent((m) => m.zones, ZONE_LABELS)
export const LANGUAGES: Facet[] = facetsPresent((m) => m.languages, LANGUAGE_LABELS)
export const MODALITIES: Facet[] = facetsPresent((m) => m.modalities, MODALITY_LABELS)
export const AVAILABILITIES: Facet[] = (['available', 'on-setup', 'coming-soon'] as MissionStatus[]).map((k) => ({
  key: k,
  label: STATUS_LABELS[k],
}))

export const CATEGORY_FACETS: Facet[] = MISSION_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))
export const COLLECTION_FACETS: Facet[] = MISSION_COLLECTIONS.map((c) => ({ key: c.key, label: c.label }))

// --- Filter state ----------------------------------------------------------
export type StoreFilters = {
  categorie: string | 'all'
  collection: string | 'all'
  secteur: string[]
  zone: string[]
  langue: string[]
  modalite: string[]
  disponibilite: string | 'all'
}

export const EMPTY_FILTERS: StoreFilters = {
  categorie: 'all',
  collection: 'all',
  secteur: [],
  zone: [],
  langue: [],
  modalite: [],
  disponibilite: 'all',
}

// Count used for the "Effacer les filtres" affordance and active chips.
export function activeFilterCount(f: StoreFilters): number {
  return (
    (f.categorie !== 'all' ? 1 : 0) +
    (f.collection !== 'all' ? 1 : 0) +
    f.secteur.length +
    f.zone.length +
    f.langue.length +
    f.modalite.length +
    (f.disponibilite !== 'all' ? 1 : 0)
  )
}

// Count for the mobile "Filtres" button: only the advanced facet groups.
export function advancedFilterCount(f: StoreFilters): number {
  return f.secteur.length + f.zone.length + f.langue.length + f.modalite.length + (f.disponibilite !== 'all' ? 1 : 0)
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// --- Filtering -------------------------------------------------------------
export function matchesFilters(m: Mission, f: StoreFilters): boolean {
  if (f.categorie !== 'all' && m.category !== f.categorie) return false
  if (f.collection !== 'all' && !m.collections.includes(f.collection)) return false
  if (f.secteur.length && !f.secteur.some((s) => m.sectors.includes(s))) return false
  if (f.zone.length && !f.zone.some((z) => m.zones.includes(z))) return false
  if (f.langue.length && !f.langue.some((l) => m.languages.includes(l))) return false
  if (f.modalite.length && !f.modalite.some((mo) => m.modalities.includes(mo))) return false
  if (f.disponibilite !== 'all' && m.status !== f.disponibilite) return false
  return true
}

// --- Sort ------------------------------------------------------------------
export type SortKey = 'recommended' | 'recent' | 'az'
export const DEFAULT_SORT: SortKey = 'recommended'

export const SORT_OPTIONS: { key: SortKey; label: Bilingual }[] = [
  { key: 'recommended', label: { fr: 'Recommandées', en: 'Recommended' } },
  { key: 'recent', label: { fr: 'Plus récentes', en: 'Most recent' } },
  { key: 'az', label: { fr: 'Ordre alphabétique', en: 'Alphabetical' } },
]

export function sortMissions(list: Mission[], sort: SortKey, lang: Lang): Mission[] {
  if (sort === 'recommended') return [...list].sort((a, b) => a.order - b.order)
  const copy = [...list]
  if (sort === 'recent') {
    copy.sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : a.order - b.order))
  } else if (sort === 'az') {
    copy.sort((a, b) => a.title[lang].localeCompare(b.title[lang], lang))
  }
  return copy
}

// --- View ------------------------------------------------------------------
export type ViewKey = 'featured' | 'recent' | null

// --- URL <-> state ---------------------------------------------------------
function multi(params: URLSearchParams, key: string): string[] {
  const v = params.get(key)
  return v ? v.split(',').filter(Boolean) : []
}

export function filtersFromParams(params: URLSearchParams): StoreFilters {
  return {
    categorie: params.get('categorie') || 'all',
    collection: params.get('collection') || 'all',
    secteur: multi(params, 'secteur'),
    zone: multi(params, 'zone'),
    langue: multi(params, 'langue'),
    modalite: multi(params, 'modalite'),
    disponibilite: params.get('disponibilite') || 'all',
  }
}

export function sortFromParams(params: URLSearchParams): SortKey {
  const v = params.get('tri')
  return v === 'recent' || v === 'az' ? v : DEFAULT_SORT
}

export function viewFromParams(params: URLSearchParams): ViewKey {
  const v = params.get('vue')
  return v === 'featured' || v === 'recent' ? v : null
}

// Builds a clean query string, omitting defaults so URLs stay tidy.
export function buildParams(query: string, filters: StoreFilters, sort: SortKey, view: ViewKey): string {
  const p = new URLSearchParams()
  if (query.trim()) p.set('q', query.trim())
  if (filters.categorie !== 'all') p.set('categorie', filters.categorie)
  if (filters.collection !== 'all') p.set('collection', filters.collection)
  if (filters.secteur.length) p.set('secteur', filters.secteur.join(','))
  if (filters.zone.length) p.set('zone', filters.zone.join(','))
  if (filters.langue.length) p.set('langue', filters.langue.join(','))
  if (filters.modalite.length) p.set('modalite', filters.modalite.join(','))
  if (filters.disponibilite !== 'all') p.set('disponibilite', filters.disponibilite)
  if (sort !== DEFAULT_SORT) p.set('tri', sort)
  if (view) p.set('vue', view)
  return p.toString()
}

// How many catalog cards to reveal per "show more" click.
export const PAGE_SIZE = 12

// Human, honest relative date for "Ajoutées récemment". Uses the real dateAdded.
export function relativeDate(iso: string, lang: Lang): string {
  const then = new Date(iso + 'T00:00:00')
  if (Number.isNaN(then.getTime())) return ''
  const today = new Date()
  const days = Math.round((today.getTime() - then.getTime()) / 86_400_000)
  if (days <= 0) return lang === 'fr' ? "Ajoutée aujourd'hui" : 'Added today'
  if (days === 1) return lang === 'fr' ? 'Ajoutée hier' : 'Added yesterday'
  if (days < 30) return lang === 'fr' ? `Ajoutée il y a ${days} jours` : `Added ${days} days ago`
  const label = then.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return lang === 'fr' ? `Ajoutée le ${label}` : `Added on ${label}`
}

// --- Semantic search -------------------------------------------------------
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const NORM_SYNONYMS: string[][] = SEARCH_SYNONYMS.map((g) => g.map(normalize))

// Base text a mission is searchable on: title, result, category, collections,
// sectors, modalities and authored keywords.
function baseHaystack(m: Mission, lang: Lang): string {
  const cat = MISSION_CATEGORIES.find((c) => c.key === m.category)?.label[lang] ?? ''
  const cols = m.collections.map((k) => MISSION_COLLECTIONS.find((c) => c.key === k)?.label[lang] ?? '')
  const secs = m.sectors.map((k) => SECTOR_LABELS[k]?.[lang] ?? '')
  const mods = m.modalities.map((k) => MODALITY_LABELS[k]?.[lang] ?? '')
  return normalize([m.title[lang], m.result[lang], cat, ...cols, ...secs, ...mods, ...m.keywords].join(' '))
}

// Expand the haystack with synonym groups it already touches, so "lead" finds
// missions written with "prospect", etc.
function haystack(m: Mission, lang: Lang): string {
  const base = baseHaystack(m, lang)
  const extra: string[] = []
  for (const group of NORM_SYNONYMS) {
    if (group.some((term) => base.includes(term))) extra.push(...group)
  }
  return extra.length ? `${base} ${extra.join(' ')}` : base
}

export type Scored = { mission: Mission; score: number }

// Ranks missions by relevance. Empty query -> score 0 for all (caller keeps
// catalog order). A query only keeps missions that actually match a token, so
// weak searches never get padded with unrelated missions.
export function searchMissions(query: string, lang: Lang): Scored[] {
  const q = normalize(query)
  if (!q) return MISSIONS.map((mission) => ({ mission, score: 0 }))
  const tokens = q.split(' ').filter((t) => t.length > 2)
  if (tokens.length === 0) return MISSIONS.map((mission) => ({ mission, score: 0 }))

  const scored: Scored[] = []
  for (const mission of MISSIONS) {
    const title = normalize(mission.title[lang])
    const hay = haystack(mission, lang)
    let score = 0
    for (const tok of tokens) {
      if (title.includes(tok)) score += 3
      else if (hay.includes(tok)) score += 1
    }
    if (score > 0) scored.push({ mission, score })
  }
  return scored.sort((a, b) => b.score - a.score || a.mission.order - b.mission.order)
}

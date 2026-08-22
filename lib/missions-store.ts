// Store taxonomy + semantic search for the Missions marketplace.
// Maps the 144-mission catalog onto the marketplace navigation: 12 categories
// (single-select), 7 editorial collections (single-select) and multi-select
// facet filters (secteur, zone, langue and modalité).

import {
  MISSIONS,
  MISSION_CATEGORIES,
  MISSION_COLLECTIONS,
  SECTOR_LABELS,
  ZONE_LABELS,
  LANGUAGE_LABELS,
  MODALITY_LABELS,
  ORIGIN_LABELS,
  SEARCH_SYNONYMS,
  type Mission,
  type MissionOrigin,
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
export const CATEGORY_FACETS: Facet[] = MISSION_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))
export const COLLECTION_FACETS: Facet[] = MISSION_COLLECTIONS.map((c) => ({ key: c.key, label: c.label }))

// Origin (type) options for the "Type" switcher that replaces the Discover nav.
export const ORIGIN_FACETS: Facet[] = (['all', 'native', 'external'] as (MissionOrigin | 'all')[]).map((k) => ({
  key: k,
  label: ORIGIN_LABELS[k],
}))

// --- Filter state ----------------------------------------------------------
export type StoreFilters = {
  type: MissionOrigin | 'all'
  categorie: string | 'all'
  collection: string | 'all'
  secteur: string[]
  zone: string[]
  langue: string[]
  modalite: string[]
}

export const EMPTY_FILTERS: StoreFilters = {
  type: 'all',
  categorie: 'all',
  collection: 'all',
  secteur: [],
  zone: [],
  langue: [],
  modalite: [],
}

// Count used for the "Effacer les filtres" affordance and active chips.
export function activeFilterCount(f: StoreFilters): number {
  return (
    (f.type !== 'all' ? 1 : 0) +
    (f.categorie !== 'all' ? 1 : 0) +
    (f.collection !== 'all' ? 1 : 0) +
    f.secteur.length +
    f.zone.length +
    f.langue.length +
    f.modalite.length
  )
}

// Count for the mobile "Filtres" button: only the advanced facet groups.
export function advancedFilterCount(f: StoreFilters): number {
  return f.secteur.length + f.zone.length + f.langue.length + f.modalite.length
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// --- Filtering -------------------------------------------------------------
export function matchesFilters(m: Mission, f: StoreFilters): boolean {
  if (f.type !== 'all' && m.origin !== f.type) return false
  if (f.categorie !== 'all' && m.category !== f.categorie) return false
  if (f.collection !== 'all' && !m.collections.includes(f.collection)) return false
  if (f.secteur.length && !f.secteur.some((s) => m.sectors.includes(s))) return false
  if (f.zone.length && !f.zone.some((z) => m.zones.includes(z))) return false
  if (f.langue.length && !f.langue.some((l) => m.languages.includes(l))) return false
  if (f.modalite.length && !f.modalite.some((mo) => m.modalities.includes(mo))) return false
  return true
}

// --- Sort ------------------------------------------------------------------
export type SortKey = 'recommended' | 'recent' | 'az' | 'duration'
export const DEFAULT_SORT: SortKey = 'recommended'

export const SORT_OPTIONS: { key: SortKey; label: Bilingual }[] = [
  { key: 'recommended', label: { fr: 'Recommandées', en: 'Recommended' } },
  { key: 'recent', label: { fr: 'Plus récentes', en: 'Most recent' } },
  { key: 'az', label: { fr: 'Ordre alphabétique', en: 'Alphabetical' } },
  { key: 'duration', label: { fr: 'Durée croissante', en: 'Shortest duration' } },
]

const CATEGORY_DURATION: Record<string, number> = {
  ventes: 30,
  'relation-client': 20,
  marketing: 45,
  reunions: 20,
  administration: 30,
  finance: 45,
  rh: 40,
  direction: 60,
  documents: 35,
  analyse: 60,
  operations: 45,
  produit: 60,
}

export function estimatedDurationMinutes(mission: Mission): number {
  return CATEGORY_DURATION[mission.category] ?? 30
}

export function sortMissions(list: Mission[], sort: SortKey, lang: Lang): Mission[] {
  if (sort === 'recommended') return [...list].sort((a, b) => a.order - b.order)
  const copy = [...list]
  if (sort === 'recent') {
    copy.sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : a.order - b.order))
  } else if (sort === 'az') {
    copy.sort((a, b) => a.title[lang].localeCompare(b.title[lang], lang))
  } else if (sort === 'duration') {
    copy.sort((a, b) => estimatedDurationMinutes(a) - estimatedDurationMinutes(b) || a.order - b.order)
  }
  return copy
}

// --- URL <-> state ---------------------------------------------------------
function multi(params: URLSearchParams, key: string): string[] {
  const v = params.get(key)
  return v ? v.split(',').filter(Boolean) : []
}

export function filtersFromParams(params: URLSearchParams): StoreFilters {
  const type = params.get('type')
  return {
    type: type === 'native' || type === 'external' ? type : 'all',
    categorie: params.get('categorie') || 'all',
    collection: params.get('collection') || 'all',
    secteur: multi(params, 'secteur'),
    zone: multi(params, 'zone'),
    langue: multi(params, 'langue'),
    modalite: multi(params, 'modalite'),
  }
}

export function sortFromParams(params: URLSearchParams): SortKey {
  const v = params.get('tri')
  return v === 'recent' || v === 'az' || v === 'duration' ? v : DEFAULT_SORT
}

// Builds a clean query string, omitting defaults so URLs stay tidy.
export function buildParams(query: string, filters: StoreFilters, sort: SortKey): string {
  const p = new URLSearchParams()
  if (query.trim()) p.set('q', query.trim())
  if (filters.type !== 'all') p.set('type', filters.type)
  if (filters.categorie !== 'all') p.set('categorie', filters.categorie)
  if (filters.collection !== 'all') p.set('collection', filters.collection)
  if (filters.secteur.length) p.set('secteur', filters.secteur.join(','))
  if (filters.zone.length) p.set('zone', filters.zone.join(','))
  if (filters.langue.length) p.set('langue', filters.langue.join(','))
  if (filters.modalite.length) p.set('modalite', filters.modalite.join(','))
  if (sort !== DEFAULT_SORT) p.set('tri', sort)
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

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  MISSION_CATEGORIES,
  featuredMissions,
  recentMissions,
  categoryCount,
  FEATURED_SLUGS,
  type Mission,
} from '@/lib/missions-catalog'
import {
  CATEGORY_FACETS,
  SECTORS,
  ZONES,
  LANGUAGES,
  MODALITIES,
  AVAILABILITIES,
  searchMissions,
  matchesFilters,
  activeFilterCount,
  advancedFilterCount,
  toggleValue,
  sortMissions,
  filtersFromParams,
  sortFromParams,
  buildParams,
  ORIGIN_FACETS,
  SORT_OPTIONS,
  DEFAULT_SORT,
  EMPTY_FILTERS,
  PAGE_SIZE,
  type Facet,
  type SortKey,
  type StoreFilters,
} from '@/lib/missions-store'
import { useLanguage } from '@/lib/language-context'
import { StoreSidebar, type MultiKey } from '@/components/missions/store-sidebar'
import { StoreCard, FeaturedCard, RecentCard, AlmaCard, AlmaBand } from '@/components/missions/store-card'
import { PreviewDrawer } from '@/components/missions/preview-drawer'
import { FilterSheet } from '@/components/missions/filter-sheet'

const FACET_SOURCES: Record<MultiKey, Facet[]> = {
  secteur: SECTORS,
  zone: ZONES,
  langue: LANGUAGES,
  modalite: MODALITIES,
}

function facetLabel(group: MultiKey, value: string, lang: 'fr' | 'en'): string {
  return FACET_SOURCES[group].find((f) => f.key === value)?.label[lang] ?? value
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize from the URL so a reload / shared link restores everything.
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<StoreFilters>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString())),
  )
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))

  const [focused, setFocused] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [preview, setPreview] = useState<Mission | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [phIndex, setPhIndex] = useState(0)

  const searchRef = useRef<HTMLInputElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)
  const previewTrigger = useRef<HTMLElement | null>(null)

  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0
  const filterCount = activeFilterCount(filters)
  const advCount = advancedFilterCount(filters)
  const hasAnyRefinement = hasQuery || filterCount > 0
  const showEditorial = !hasAnyRefinement

  // Reflect state into the URL (defaults omitted).
  useEffect(() => {
    const qs = buildParams(query, filters, sort)
    const next = qs ? `${pathname}?${qs}` : pathname
    const current = `${pathname}${window.location.search}`
    if (next !== current) router.replace(next, { scroll: false })
  }, [query, filters, sort, pathname, router])

  // Reset pagination whenever the result set changes.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [trimmed, filters, sort])

  // ⌘K / Ctrl+K focuses the search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Rotate example goals in the placeholder while the field is idle and empty.
  useEffect(() => {
    if (focused) return
    const id = setInterval(() => setPhIndex((i) => i + 1), 3200)
    return () => clearInterval(id)
  }, [focused])

  // Editorial data (stable).
  const featured = useMemo(() => featuredMissions(), [])
  const recent = useMemo(() => recentMissions(6), [])

  // Ranked + filtered list over all 144 missions.
  const results = useMemo(() => {
    const ranked = searchMissions(trimmed, lang)
    const list = ranked.filter((s) => matchesFilters(s.mission, filters)).map((s) => s.mission)
    // Keep relevance order for a text query on the default sort; otherwise sort.
    if (hasQuery && sort === 'recommended') return list
    return sortMissions(list, sort, lang)
  }, [trimmed, hasQuery, lang, filters, sort])

  // Without any refinement, the first cards should not repeat the editorial rows.
  const editorialSet = useMemo(() => {
    const s = new Set<string>(FEATURED_SLUGS)
    for (const m of recent) s.add(m.slug)
    return s
  }, [recent])

  const catalog = useMemo(
    () => (showEditorial ? results.filter((m) => !editorialSet.has(m.slug)) : results),
    [results, showEditorial, editorialSet],
  )

  // Counter reflects the true matching total (e.g. 144 with no filter). The grid
  // paginates over `catalog`, which excludes the editorial rows so they don't
  // repeat immediately — the two can legitimately differ by the excluded count.
  const total = results.length
  const poolTotal = catalog.length
  const visible = catalog.slice(0, visibleCount)
  const hasMore = visibleCount < poolTotal

  // --- state mutators --------------------------------------------------------
  const openPreview = useCallback((m: Mission, trigger: HTMLElement | null) => {
    previewTrigger.current = trigger
    setPreview(m)
  }, [])

  const closePreview = useCallback(() => {
    setPreview(null)
    previewTrigger.current?.focus()
  }, [])

  function selectType(key: string) {
    setFilters((p) => ({ ...p, type: key as StoreFilters['type'] }))
  }
  function selectCategory(key: string) {
    setFilters((p) => ({ ...p, categorie: p.categorie === key ? 'all' : key }))
  }
  function toggleFacet(group: MultiKey, value: string) {
    setFilters((p) => ({ ...p, [group]: toggleValue(p[group], value) }))
  }
  function selectDisponibilite(value: string) {
    setFilters((p) => ({ ...p, disponibilite: value }))
  }
  function clearAll() {
    setFilters(EMPTY_FILTERS)
    setQuery('')
  }

  // --- copy ------------------------------------------------------------------
  const t = {
    eyebrow: 'Missions',
    title: lang === 'fr' ? 'Qu’aimeriez-vous confier ?' : 'What would you like to hand off?',
    lead:
      lang === 'fr'
        ? 'Choisissez une mission ou décrivez votre objectif. Chaque mission prépare un Collaborateur IA avec son profil métier, ses compétences, ses applications et le contexte de votre organisation.'
        : 'Choose a mission or describe your goal. Each mission prepares an AI Collaborator with its job profile, skills, applications and your organization’s context.',
    placeholder:
      lang === 'fr' ? 'Décrivez votre objectif ou recherchez une mission…' : 'Describe your goal or search a mission…',
    placeholderExamples:
      lang === 'fr'
        ? [
            'Trouver des prospects qualifiés…',
            'Répondre aux demandes clients…',
            'Préparer mes publications LinkedIn…',
            'Relancer mes factures impayées…',
            'Rédiger des fiches produit…',
          ]
        : [
            'Find qualified prospects…',
            'Answer customer requests…',
            'Prepare my LinkedIn posts…',
            'Chase unpaid invoices…',
            'Write product descriptions…',
          ],
    clearSearch: lang === 'fr' ? 'Effacer la recherche' : 'Clear search',
    almaHint: lang === 'fr' ? 'Vous ne savez pas comment le formuler ?' : 'Not sure how to phrase it?',
    almaLink: lang === 'fr' ? 'Parlez à Alma' : 'Talk to Alma',
    featuredTitle: lang === 'fr' ? 'Pour commencer' : 'To get started',
    featuredDesc:
      lang === 'fr'
        ? 'Une sélection de missions aux résultats immédiatement compréhensibles.'
        : 'A selection of missions with immediately understandable results.',
    recentTitle: lang === 'fr' ? 'Nouvelles missions' : 'New missions',
    recentDesc:
      lang === 'fr'
        ? 'Une sélection des dernières missions publiées dans le catalogue.'
        : 'A selection of the latest missions published in the catalog.',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    results: lang === 'fr' ? 'Résultats' : 'Results',
    count: (n: number) => `${n} mission${n > 1 ? 's' : ''}`,
    showMore: (n: number) =>
      hasAnyRefinement
        ? lang === 'fr'
          ? `Afficher ${n} résultats supplémentaires`
          : `Show ${n} more results`
        : lang === 'fr'
          ? `Afficher ${n} missions supplémentaires`
          : `Show ${n} more missions`,
    sortLabel: lang === 'fr' ? 'Trier' : 'Sort',
    clear: lang === 'fr' ? 'Effacer les filtres' : 'Clear filters',
    searchChip: lang === 'fr' ? 'Recherche' : 'Search',
    filters: lang === 'fr' ? 'Filtres' : 'Filters',
  }

  // Active-filter chips (query + categorie + collection + facets + disponibilité).
  type Chip = { id: string; label: string; onRemove: () => void }
  const chips: Chip[] = []
  if (hasQuery) chips.push({ id: 'q', label: `${t.searchChip}: “${trimmed}”`, onRemove: () => setQuery('') })
  if (filters.type !== 'all')
    chips.push({
      id: 'type',
      label: ORIGIN_FACETS.find((o) => o.key === filters.type)?.label[lang] ?? filters.type,
      onRemove: () => setFilters((p) => ({ ...p, type: 'all' })),
    })
  if (filters.categorie !== 'all')
    chips.push({
      id: 'cat',
      label: CATEGORY_FACETS.find((c) => c.key === filters.categorie)?.label[lang] ?? filters.categorie,
      onRemove: () => setFilters((p) => ({ ...p, categorie: 'all' })),
    })
  ;(['secteur', 'zone', 'langue', 'modalite'] as MultiKey[]).forEach((g) =>
    filters[g].forEach((v) =>
      chips.push({ id: `${g}-${v}`, label: facetLabel(g, v, lang), onRemove: () => toggleFacet(g, v) }),
    ),
  )
  if (filters.disponibilite !== 'all')
    chips.push({
      id: 'dispo',
      label: AVAILABILITIES.find((a) => a.key === filters.disponibilite)?.label[lang] ?? filters.disponibilite,
      onRemove: () => selectDisponibilite('all'),
    })

  const sortControl = (
    <label className="inline-flex items-center gap-2 text-sm text-[var(--store-muted)]">
      <span className="hidden sm:inline">{t.sortLabel}</span>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        className="rounded-lg border border-[var(--store-line)] bg-[var(--store-surface)] px-2.5 py-1.5 text-sm font-medium text-[var(--store-text)] outline-none transition-colors focus-visible:border-[#D10E63]/60 focus-visible:ring-2 focus-visible:ring-[#D10E63]/30"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label[lang]}
          </option>
        ))}
      </select>
    </label>
  )

  return (
    <main className="min-h-screen bg-[var(--store-page)] text-[var(--store-text)]">
      {/* ------------------------------ HEADER ------------------------------ */}
      <header className="mx-auto max-w-[1240px] px-6 pb-6 pt-9">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-balance font-sf text-[clamp(1.625rem,3.6vw,2.375rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--store-text)]">
          {t.title}
        </h1>
        <p className="mt-2.5 max-w-[720px] text-pretty text-[15px] leading-relaxed text-[var(--store-muted)]">{t.lead}</p>
      </header>

      {/* ------------------------ SIDEBAR + MAIN ------------------------ */}
      <div className="mx-auto max-w-[1240px] px-6 pb-24">
        <div className="flex gap-8 lg:gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[232px]">
            <div className="sticky top-24">
              <StoreSidebar
                filters={filters}
                lang={lang}
                onType={selectType}
                onCategory={selectCategory}
                onToggleFacet={toggleFacet}
                onDisponibilite={selectDisponibilite}
              />
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0 flex-1">
            {/* Search */}
            <div className="relative">
              <div className="flex h-12 items-center gap-3 rounded-lg border border-[var(--store-line)] bg-[var(--store-surface)] px-4 transition-colors focus-within:border-[#D10E63]/60 focus-within:ring-2 focus-within:ring-[#D10E63]/20">
                <Search className="h-5 w-5 shrink-0 text-[var(--store-muted)]" aria-hidden="true" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder={focused ? t.placeholder : t.placeholderExamples[phIndex % t.placeholderExamples.length]}
                  aria-label={t.placeholder}
                  className="w-full bg-transparent text-sm text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
                />
                {hasQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      searchRef.current?.focus()
                    }}
                    aria-label={t.clearSearch}
                    className="shrink-0 rounded p-0.5 text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-[var(--store-line)] bg-[var(--store-page)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--store-muted)] sm:inline-flex">
                    ⌘K
                  </kbd>
                )}
              </div>

              {focused && hasQuery && total === 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] p-3 shadow-[0_16px_48px_-24px_rgba(36,31,29,0.5)]">
                  <p className="text-[13px] leading-relaxed text-[var(--store-muted)]">
                    {lang === 'fr'
                      ? 'Aucune mission exacte. Alma peut la préparer pour votre organisation.'
                      : 'No exact mission. Alma can prepare it for your organization.'}
                  </p>
                </div>
              )}
            </div>

            {!hasQuery && (
              <p className="mt-2.5 text-[13px] text-[var(--store-muted)]">
                {t.almaHint}{' '}
                <a href="/decouvrir" className="font-semibold text-[#D10E63] hover:underline">
                  {t.almaLink} →
                </a>
              </p>
            )}

            {/* Mobile: Type switcher + categories row + count + Filters */}
            <div className="mt-4 lg:hidden">
              <div
                className="mb-3 inline-flex rounded-lg border border-[var(--store-line)] bg-[var(--store-surface)] p-0.5"
                role="group"
                aria-label={lang === 'fr' ? 'Type' : 'Type'}
              >
                {ORIGIN_FACETS.map((o) => {
                  const active = filters.type === o.key
                  return (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => selectType(o.key)}
                      aria-pressed={active}
                      className={`min-h-[32px] whitespace-nowrap rounded-[6px] px-3 py-1 text-xs font-semibold transition-colors ${
                        active ? 'bg-[#FCEAF2] text-[#AD0C53]' : 'text-[var(--store-muted)]'
                      }`}
                    >
                      {o.label[lang]}
                    </button>
                  )
                })}
              </div>
              <div
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ scrollSnapType: 'x proximity' }}
                role="group"
                aria-label={lang === 'fr' ? 'Catégories' : 'Categories'}
              >
                <button
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, categorie: 'all' }))}
                  aria-pressed={filters.categorie === 'all'}
                  style={{ scrollSnapAlign: 'start' }}
                  className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    filters.categorie === 'all'
                      ? 'bg-[#FCEAF2] text-[#AD0C53]'
                      : 'border border-[var(--store-line)] text-[var(--store-text)]'
                  }`}
                >
                  {t.all}
                </button>
                {CATEGORY_FACETS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => selectCategory(c.key)}
                    aria-pressed={filters.categorie === c.key}
                    style={{ scrollSnapAlign: 'start' }}
                    className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      filters.categorie === c.key
                        ? 'bg-[#FCEAF2] text-[#AD0C53]'
                        : 'border border-[var(--store-line)] text-[var(--store-text)]'
                    }`}
                  >
                    {c.label[lang]}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--store-muted)]">{t.count(total)}</span>
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[var(--store-line)] px-3 py-1.5 text-xs font-semibold text-[var(--store-text)]"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {t.filters}
                  {advCount > 0 && (
                    <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D10E63] px-1 text-[10px] font-bold text-[#FBF9F3]">
                      {advCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Editorial sections */}
            {showEditorial && (
              <>
                <section className="mt-8 scroll-mt-24">
                  <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                    {t.featuredTitle}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--store-muted)]">{t.featuredDesc}</p>
                  <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2">
                    {featured.map((m) => (
                      <FeaturedCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} />
                    ))}
                  </div>
                </section>

                {recent.length > 0 && (
                  <section className="mt-10 scroll-mt-24">
                    <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                      {t.recentTitle}
                    </h2>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--store-muted)]">{t.recentDesc}</p>
                    <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {recent.map((m) => (
                        <RecentCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* Catalog */}
            <section ref={catalogRef} className={`scroll-mt-24 ${showEditorial ? 'mt-10' : 'mt-6'}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                    {hasAnyRefinement ? t.results : t.all}
                  </h2>
                  <span className="text-sm font-medium text-[var(--store-muted)]">{t.count(total)}</span>
                </div>
                {sortControl}
              </div>

              {chips.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {chips.map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D10E63]/25 bg-[#FCEAF2]/60 py-1 pl-3 pr-1.5 text-xs font-medium text-[#AD0C53]"
                    >
                      {c.label}
                      <button
                        type="button"
                        onClick={c.onRemove}
                        aria-label={`${lang === 'fr' ? 'Retirer' : 'Remove'} ${c.label}`}
                        className="rounded-full p-0.5 transition-colors hover:bg-[#D10E63]/15"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="ml-1 text-xs font-semibold text-[var(--store-muted)] underline-offset-2 transition-colors hover:text-[#D10E63] hover:underline"
                  >
                    {t.clear}
                  </button>
                </div>
              )}

              {total === 0 ? (
                // No result: the Alma band replaces the grid entirely.
                <AlmaBand lang={lang} query={hasQuery ? trimmed : undefined} />
              ) : (
                <>
                  <div className="grid auto-rows-fr gap-4 min-[900px]:grid-cols-2 min-[1400px]:grid-cols-3">
                    {visible.map((m) => (
                      <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={openPreview} />
                    ))}
                    {/* General (unfiltered) view: keep Alma as the 13th card after the first 12. */}
                    {!hasAnyRefinement && hasMore && (
                      <div className="flex">
                        <AlmaCard lang={lang} />
                      </div>
                    )}
                  </div>

                  {hasMore ? (
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        className="inline-flex items-center gap-2 rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                      >
                        {t.showMore(Math.min(PAGE_SIZE, poolTotal - visibleCount))}
                      </button>
                    </div>
                  ) : (
                    // Everything shown (typically a filtered set): full-width Alma band below.
                    <div className="mt-4">
                      <AlmaBand lang={lang} />
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </div>

      <PreviewDrawer mission={preview} categories={MISSION_CATEGORIES} lang={lang} onClose={closePreview} />
      <FilterSheet
        open={sheetOpen}
        filters={filters}
        lang={lang}
        onToggleFacet={toggleFacet}
        onDisponibilite={selectDisponibilite}
        onClear={clearAll}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  )
}

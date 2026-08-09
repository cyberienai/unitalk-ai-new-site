'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, Mic, SlidersHorizontal, X } from 'lucide-react'
import { featuredMissions, FEATURED_SLUGS, type Mission } from '@/lib/missions-catalog'
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
import { StoreCard, AlmaBand } from '@/components/missions/store-card'
import { AlmaSurface, type LoadRequest } from '@/components/missions/alma-surface'
import { FilterSheet } from '@/components/missions/filter-sheet'
import { ExpertDoor } from '@/components/experts/expert-door'

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
  const reduce = useReducedMotion()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // The catalog is browsed with the left-hand filters and categories only — the
  // text field is a conversational entry to Alma, not a live catalog search.
  // `query` is kept internal (always empty) so downstream logic stays intact.
  const [query, setQuery] = useState('')
  // Conversational field sent to Alma. Prefilled from ?q= for a returning link.
  // Prefill the work table from ?q= on a returning/shared link.
  const almaText = searchParams.get('q') ?? ''
  const [filters, setFilters] = useState<StoreFilters>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString())),
  )
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))

  const [sheetOpen, setSheetOpen] = useState(false)

  // A picked mission is loaded straight into Alma (no cold detail page).
  const [loadRequest, setLoadRequest] = useState<LoadRequest | null>(null)
  // Flying "ghost" card played during the handoff to Alma.
  const [ghost, setGhost] = useState<{ mission: Mission; from: DOMRect; to: { top: number; left: number } } | null>(
    null,
  )

  // Two-panel bureau: either side can collapse to a rail for the session, and
  // both never collapse at once — collapsing one always restores the other.
  const ALMA_HIDDEN_KEY = 'unitalk_missions_alma_hidden'
  const CATALOG_HIDDEN_KEY = 'unitalk_missions_catalog_hidden'
  const [almaHidden, setAlmaHidden] = useState(false)
  const [catalogHidden, setCatalogHidden] = useState(false)
  // Mobile shows a single panel at a time via a segmented control.
  const [mobilePane, setMobilePane] = useState<'alma' | 'catalog'>('alma')
  const almaPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // Prefer Alma if a stale session somehow marked both collapsed.
      if (sessionStorage.getItem(ALMA_HIDDEN_KEY) === '1') setAlmaHidden(true)
      else if (sessionStorage.getItem(CATALOG_HIDDEN_KEY) === '1') setCatalogHidden(true)
    } catch {}
  }, [])

  const hideAlma = useCallback(() => {
    setAlmaHidden(true)
    setCatalogHidden(false)
    try {
      sessionStorage.setItem(ALMA_HIDDEN_KEY, '1')
      sessionStorage.removeItem(CATALOG_HIDDEN_KEY)
    } catch {}
  }, [])

  const showAlma = useCallback(() => {
    setAlmaHidden(false)
    try {
      sessionStorage.removeItem(ALMA_HIDDEN_KEY)
    } catch {}
    requestAnimationFrame(() => almaPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [])

  const hideCatalog = useCallback(() => {
    setCatalogHidden(true)
    setAlmaHidden(false)
    try {
      sessionStorage.setItem(CATALOG_HIDDEN_KEY, '1')
      sessionStorage.removeItem(ALMA_HIDDEN_KEY)
    } catch {}
  }, [])

  const showCatalog = useCallback(() => {
    setCatalogHidden(false)
    try {
      sessionStorage.removeItem(CATALOG_HIDDEN_KEY)
    } catch {}
  }, [])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const catalogRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

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

  // The 6 imposed missions that open the grid (stable order).
  const featured = useMemo(() => featuredMissions(), [])

  // Ranked + filtered list over all 144 missions.
  const results = useMemo(() => {
    const ranked = searchMissions(trimmed, lang)
    const list = ranked.filter((s) => matchesFilters(s.mission, filters)).map((s) => s.mission)
    // Keep relevance order for a text query on the default sort; otherwise sort.
    if (hasQuery && sort === 'recommended') return list
    return sortMissions(list, sort, lang)
  }, [trimmed, hasQuery, lang, filters, sort])

  // A single grid: with no refinement, the 6 featured missions lead, then the
  // rest of the catalog (deduplicated). Under filters/search, plain results.
  const catalog = useMemo(() => {
    if (!showEditorial) return results
    const featuredSet = new Set<string>(FEATURED_SLUGS)
    return [...featured, ...results.filter((m) => !featuredSet.has(m.slug))]
  }, [results, showEditorial, featured])

  const total = results.length
  const poolTotal = catalog.length
  const visible = catalog.slice(0, visibleCount)
  const hasMore = visibleCount < poolTotal

  // Auto-load the next batch when the sentinel scrolls into view (no manual click).
  // Re-attaching on visibleCount lets it fire again as the sentinel moves down.
  useEffect(() => {
    if (!hasMore) return
    const el = loadMoreRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisibleCount((n) => n + PAGE_SIZE)
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, visibleCount])

  // --- card → Alma handoff ---------------------------------------------------
  // Clicking a card loads the mission into Alma. A short "flying card" bridges
  // the two so the move reads as continuous; reduced motion skips straight to
  // the load. If Alma was collapsed, it is restored first.
  const loadIntoAlma = useCallback(
    (m: Mission) => {
      // Return to the balanced two-panel view: Alma shows the loaded mission and
      // the catalog stays visible for continued browsing.
      setAlmaHidden(false)
      setCatalogHidden(false)
      setMobilePane('alma')
      try {
        sessionStorage.removeItem(ALMA_HIDDEN_KEY)
        sessionStorage.removeItem(CATALOG_HIDDEN_KEY)
      } catch {}
      setLoadRequest({ mission: m, key: Date.now() })
      requestAnimationFrame(() => almaPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    },
    [],
  )

  const selectMission = useCallback(
    (m: Mission, trigger: HTMLElement | null) => {
      if (reduce || !trigger) {
        loadIntoAlma(m)
        return
      }
      const from = trigger.getBoundingClientRect()
      const panel = almaPanelRef.current?.getBoundingClientRect()
      // Aim the flying card at the left-hand Alma panel; fall back to up-left.
      const to = panel
        ? { top: Math.max(96, panel.top + 120), left: panel.left + panel.width / 2 - 90 }
        : { top: Math.max(96, from.top - 240), left: from.left + from.width / 2 - 90 }
      setGhost({ mission: m, from, to })
      loadIntoAlma(m)
      // Clear the ghost once its flight is over.
      window.setTimeout(() => setGhost(null), 620)
    },
    [reduce, loadIntoAlma],
  )

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

  // Short category labels used only in the left rail (not the global taxonomy).
  const railCategoryLabels = useMemo<Record<string, string>>(
    () =>
      lang === 'fr'
        ? {
            ventes: 'Ventes et prospection',
            'relation-client': 'Service client',
            marketing: 'Marketing et communication',
            reunions: 'Réunions et coordination',
            administration: 'Assistanat et organisation',
            finance: 'Finance et administration',
            rh: 'RH et recrutement',
            direction: 'Direction et pilotage',
            documents: 'Documents et connaissances',
            analyse: 'Analyse et veille',
            operations: 'Opérations et automatisation',
            produit: 'Produit et technologie',
          }
        : {
            ventes: 'Sales & prospecting',
            'relation-client': 'Customer service',
            marketing: 'Marketing & communication',
            reunions: 'Meetings & coordination',
            administration: 'Assistance & organization',
            finance: 'Finance & admin',
            rh: 'HR & recruiting',
            direction: 'Leadership & steering',
            documents: 'Documents & knowledge',
            analyse: 'Analysis & monitoring',
            operations: 'Operations & automation',
            produit: 'Product & technology',
          },
    [lang],
  )

  // --- copy ------------------------------------------------------------------
  const t = {
    recallText: lang === 'fr' ? 'Vous préférez décrire votre besoin ?' : 'Prefer to describe your need?',
    recallCta: lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma',
    paneAlma: 'Alma',
    paneCatalog: lang === 'fr' ? 'Missions' : 'Missions',
    almaLabel: 'ALMA',
    catalogLabel: lang === 'fr' ? 'MISSIONS' : 'MISSIONS',
    railAlma: 'Alma',
    railCatalog: lang === 'fr' ? 'Missions' : 'Missions',
    showAlma: lang === 'fr' ? 'Afficher Alma' : 'Show Alma',
    hideCatalog: lang === 'fr' ? 'Réduire les missions' : 'Collapse missions',
    showCatalog: lang === 'fr' ? 'Afficher les missions' : 'Show missions',
    catalogTitle: lang === 'fr' ? 'Ou choisissez une mission prête à adapter' : 'Or choose a mission ready to adapt',
    catalogSubtitle:
      lang === 'fr'
        ? 'Alma l’adaptera à votre entreprise. Affinez avec les filtres si besoin.'
        : 'Alma will adapt it to your company. Refine with the filters if needed.',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    results: lang === 'fr' ? 'Résultats' : 'Results',
    count: (n: number) => (lang === 'fr' ? `${n} mission${n > 1 ? 's' : ''}` : `${n} mission${n > 1 ? 's' : ''}`),
    allBrowsed: lang === 'fr' ? 'Vous avez parcouru toutes les missions.' : 'You’ve browsed all missions.',
    proposeQuestion:
      lang === 'fr'
        ? 'Vous avez conçu une mission utile à d’autres entreprises ?'
        : 'Have you designed a mission useful to other companies?',
    proposeCta: lang === 'fr' ? 'Proposer une mission' : 'Propose a mission',
    complexQuestion:
      lang === 'fr'
        ? 'Une mission trop large pour une seule fiche ? Un expert peut la cadrer avec vous.'
        : 'A mission too broad for a single card? An expert can frame it with you.',
    complexCta: lang === 'fr' ? 'Être accompagné' : 'Get support',
    sortLabel: lang === 'fr' ? 'Trier' : 'Sort',
    clear: lang === 'fr' ? 'Effacer les filtres' : 'Clear filters',
    searchChip: lang === 'fr' ? 'Recherche' : 'Search',
    filters: lang === 'fr' ? 'Filtres' : 'Filters',
  }

  // Active-filter chips (query + categorie + collection + facets + disponibilité).
  type Chip = { id: string; label: string; onRemove: () => void }
  const chips: Chip[] = []
  if (hasQuery) chips.push({ id: 'q', label: `${t.searchChip}: “${trimmed}”`, onRemove: () => setQuery('') })
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
      <span>{t.sortLabel}</span>
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
      {/* Mobile: one panel at a time via a segmented control. */}
      <div className="px-4 pt-24 sm:px-6 sm:pt-28 lg:hidden">
        <div
          role="tablist"
          aria-label={lang === 'fr' ? 'Basculer entre Alma et les missions' : 'Switch between Alma and missions'}
          className="flex gap-1 rounded-full border border-[var(--store-line)] bg-[var(--store-surface)] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobilePane === 'alma'}
            onClick={() => setMobilePane('alma')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mobilePane === 'alma' ? 'bg-[#D10E63] text-[#FBF9F3]' : 'text-[var(--store-muted)]'
            }`}
          >
            {t.paneAlma}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobilePane === 'catalog'}
            onClick={() => setMobilePane('catalog')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mobilePane === 'catalog' ? 'bg-[#D10E63] text-[#FBF9F3]' : 'text-[var(--store-muted)]'
            }`}
          >
            {t.paneCatalog}
          </button>
        </div>
      </div>

      {/* Desktop: two-panel bureau under the fixed 76px navbar. */}
      <div className="lg:mt-[76px] lg:flex lg:h-[calc(100dvh-76px)]">
        {/* --------------------------- LEFT — Alma --------------------------- */}
        <section
          ref={almaPanelRef}
          aria-label={t.paneAlma}
          className={`${mobilePane === 'alma' ? 'block' : 'hidden'} lg:block lg:h-full lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-[var(--store-line)] ${
            almaHidden ? 'lg:w-14' : catalogHidden ? 'lg:flex-1' : 'lg:w-[42%] xl:w-[40%]'
          }`}
        >
          {almaHidden ? (
            <button
              type="button"
              onClick={showAlma}
              aria-label={t.showAlma}
              title={t.showAlma}
              className="hidden h-full w-14 flex-col items-center gap-3 bg-[var(--store-surface)] py-5 text-[var(--store-muted)] transition-colors hover:text-[#D10E63] lg:flex"
            >
              <Mic className="h-4 w-4" />
              <span className="rotate-180 text-xs font-bold uppercase tracking-[0.14em] [writing-mode:vertical-rl]">
                {t.railAlma}
              </span>
            </button>
          ) : (
            <div className="px-4 pb-10 pt-6 sm:px-6 lg:pt-8">
              <div className="mb-4 hidden lg:block">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--store-muted)]">
                  {t.almaLabel}
                </span>
              </div>
              <AlmaSurface lang={lang} initialQuery={almaText} onHide={hideAlma} loadRequest={loadRequest} />
            </div>
          )}
        </section>

        {/* --------------------- RIGHT — Missions catalog --------------------- */}
        <section
          aria-label={t.paneCatalog}
          className={`${mobilePane === 'catalog' ? 'block' : 'hidden'} lg:block lg:h-full lg:overflow-y-auto ${
            catalogHidden ? 'lg:w-14 lg:shrink-0' : 'lg:flex-1'
          }`}
        >
          {catalogHidden ? (
            <button
              type="button"
              onClick={showCatalog}
              aria-label={t.showCatalog}
              title={t.showCatalog}
              className="hidden h-full w-14 flex-col items-center gap-3 bg-[var(--store-surface)] py-5 text-[var(--store-muted)] transition-colors hover:text-[#D10E63] lg:flex"
            >
              <span className="rotate-180 text-xs font-bold uppercase tracking-[0.14em] [writing-mode:vertical-rl]">
                {t.railCatalog}
              </span>
            </button>
          ) : (
            <div className="px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-[var(--store-muted)] lg:inline">
                  {t.catalogLabel}
                </span>
                <button
                  type="button"
                  onClick={hideCatalog}
                  aria-label={t.hideCatalog}
                  title={t.hideCatalog}
                  className="ml-auto hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--store-line)] text-[var(--store-muted)] transition-colors hover:border-[#D10E63]/40 hover:text-[#D10E63] lg:inline-flex"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <header className="mb-8">
                <h2 className="font-sf text-2xl font-bold tracking-[-0.01em] text-[var(--store-text)] sm:text-[1.75rem]">
                  {t.catalogTitle}
                </h2>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-[var(--store-muted)]">{t.catalogSubtitle}</p>
              </header>
              <div className="flex gap-8 lg:gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden w-[220px] shrink-0 xl:block xl:w-[232px]">
            <div className="sticky top-4">
              <StoreSidebar
                filters={filters}
                lang={lang}
                onCategory={selectCategory}
                onToggleFacet={toggleFacet}
                categoryLabels={railCategoryLabels}
              />
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0 flex-1">
            {/* Narrow panel + mobile: categories row + count + Filters */}
            <div className="mt-4 xl:hidden">
              <div
                className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

            {/* Catalog — a single grid, led by the 6 featured missions. */}
            <section ref={catalogRef} className="mt-6 scroll-mt-24">
              <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                    {hasAnyRefinement ? t.results : t.all}
                  </h2>
                  {/* Count already appears in the narrow-panel filter row (<xl);
                      only show it here on wide layouts, where that row is hidden. */}
                  <span className="hidden text-sm font-medium text-[var(--store-muted)] xl:inline">
                    {t.count(total)}
                  </span>
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
                  <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {visible.map((m) => (
                      <StoreCard key={m.slug} mission={m} lang={lang} onSelect={selectMission} />
                    ))}
                  </div>

                  {hasMore ? (
                    // Sentinel: crossing it (ahead of the fold) auto-loads the next batch.
                    <div ref={loadMoreRef} aria-hidden="true" className="h-4" />
                  ) : (
                    // End of the list: confirm the browse is complete, then invite Alma.
                    <>
                      <div className="mt-10 flex items-center gap-4" role="status">
                        <span className="h-px flex-1 bg-[var(--store-line)]" aria-hidden="true" />
                        <p className="text-sm font-medium text-[var(--store-muted)]">{t.allBrowsed}</p>
                        <span className="h-px flex-1 bg-[var(--store-line)]" aria-hidden="true" />
                      </div>
                      <div className="mt-6">
                        <AlmaBand lang={lang} />
                      </div>

                      {/* Creator entry point — a thin, tinted band placed only at
                          the very end, for people who already grasp the format.
                          Not in the hero, filters, or next to "Parler à Alma". */}
                      <Link
                        href="/missions/proposer"
                        className="group mt-4 flex flex-col gap-2 rounded-xl border border-[var(--store-line)] bg-[#FCEAF2] px-5 py-4 transition-colors hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                      >
                        <span className="text-sm leading-relaxed text-[var(--store-text)]">{t.proposeQuestion}</span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#AD0C53]">
                          {t.proposeCta}
                          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </Link>

                      {/* Complex mission → the Experts pillar. Discreet, at the very
                          end, carrying any drafted description so /experts can
                          prefill Alma. Never competes with "Parler à Alma". */}
                      <div className="mt-4">
                        <ExpertDoor
                          lang={lang}
                          href={`/experts?entry=mission${
                            almaText.trim() ? `&draft=${encodeURIComponent(almaText.trim())}` : ''
                          }`}
                          title={t.complexQuestion}
                          cta={t.complexCta}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </section>
          </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <FilterSheet
        open={sheetOpen}
        filters={filters}
        lang={lang}
        onToggleFacet={toggleFacet}
        onDisponibilite={selectDisponibilite}
        onClear={clearAll}
        onClose={() => setSheetOpen(false)}
      />

      {/* Flying card: a brief ghost that lifts from the clicked card and glides
          up toward Alma, so the handoff reads as one continuous motion. */}
      <AnimatePresence>
        {ghost && (
          <motion.div
            aria-hidden="true"
            initial={{
              position: 'fixed',
              top: ghost.from.top,
              left: ghost.from.left,
              width: ghost.from.width,
              height: ghost.from.height,
              opacity: 1,
              scale: 1,
              zIndex: 60,
            }}
            animate={{
              top: ghost.to.top,
              left: ghost.to.left,
              width: 180,
              height: 84,
              opacity: 0,
              scale: 0.7,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none overflow-hidden rounded-[10px] border border-[#D10E63]/40 bg-[var(--store-surface)] p-4 shadow-[0_18px_40px_-12px_rgba(209,14,99,0.4)]"
          >
            <p className="line-clamp-2 font-sf text-sm font-bold leading-snug text-[var(--store-text)]">
              {ghost.mission.title[lang]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

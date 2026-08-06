'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mic, SlidersHorizontal, X } from 'lucide-react'
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
  const [ghost, setGhost] = useState<{ mission: Mission; from: DOMRect } | null>(null)

  // Alma can be collapsed for the session; it returns next visit.
  const ALMA_HIDDEN_KEY = 'unitalk_missions_alma_hidden'
  const [almaHidden, setAlmaHidden] = useState(false)
  const almaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(ALMA_HIDDEN_KEY) === '1') setAlmaHidden(true)
    } catch {}
  }, [])

  const hideAlma = useCallback(() => {
    setAlmaHidden(true)
    try {
      sessionStorage.setItem(ALMA_HIDDEN_KEY, '1')
    } catch {}
  }, [])

  const showAlma = useCallback(() => {
    setAlmaHidden(false)
    try {
      sessionStorage.removeItem(ALMA_HIDDEN_KEY)
    } catch {}
    requestAnimationFrame(() => almaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
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
      setAlmaHidden(false)
      try {
        sessionStorage.removeItem(ALMA_HIDDEN_KEY)
      } catch {}
      setLoadRequest({ mission: m, key: Date.now() })
      requestAnimationFrame(() => almaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    },
    [],
  )

  const selectMission = useCallback(
    (m: Mission, trigger: HTMLElement | null) => {
      if (reduce || !trigger) {
        loadIntoAlma(m)
        return
      }
      setGhost({ mission: m, from: trigger.getBoundingClientRect() })
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
    catalogTitle: lang === 'fr' ? 'Choisissez une mission' : 'Choose a mission',
    catalogSubtitle:
      lang === 'fr'
        ? 'Parcourez les missions prêtes à confier, ou affinez avec les filtres.'
        : 'Browse ready-to-hand-off missions, or refine with the filters.',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    results: lang === 'fr' ? 'Résultats' : 'Results',
    count: (n: number) => `${n} mission${n > 1 ? 's' : ''}`,
    allBrowsed: lang === 'fr' ? 'Vous avez parcouru toutes les missions.' : 'You’ve browsed all missions.',
    proposeQuestion:
      lang === 'fr'
        ? 'Vous avez conçu une mission utile à d’autres entreprises ?'
        : 'Have you designed a mission useful to other companies?',
    proposeCta: lang === 'fr' ? 'Proposer une mission' : 'Propose a mission',
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
      {/* ---------------------- ALMA SURFACE (primary) ---------------------- */}
      {/* Voice-first entry: talk to Alma, watch the mission fiche build live.
          It can be collapsed for the session (returns next visit). */}
      <AnimatePresence initial={false}>
        {!almaHidden && (
          <motion.div
            key="alma-surface"
            ref={almaRef}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Fixed navbar is 76px tall; keep the same top offset as before. */}
            <div className="mx-auto max-w-[1240px] px-6 pt-28 sm:pt-[124px] lg:pt-[144px]">
              <AlmaSurface lang={lang} initialQuery={almaText} onHide={hideAlma} loadRequest={loadRequest} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------ CATALOG (always visible) ------------------------ */}
      <div className={`mx-auto max-w-[1240px] px-6 pb-24 ${almaHidden ? 'pt-28 sm:pt-[124px] lg:pt-[144px]' : 'pt-14 sm:pt-16'}`}>
        {/* Recall line — restore Alma once collapsed. */}
        {almaHidden && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-[var(--store-line)] bg-[var(--store-surface)] px-5 py-4 text-center">
            <p className="text-sm text-[var(--store-muted)]">{t.recallText}</p>
            <button
              type="button"
              onClick={showAlma}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#D10E63] px-4 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
            >
              <Mic className="h-4 w-4" />
              {t.recallCta}
            </button>
          </div>
        )}
        <header className={`mb-8 pt-8 ${almaHidden ? '' : 'border-t border-[var(--store-line)]'}`}>
          <h2 className="font-sf text-2xl font-bold tracking-[-0.01em] text-[var(--store-text)] sm:text-[1.75rem]">
            {t.catalogTitle}
          </h2>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-[var(--store-muted)]">{t.catalogSubtitle}</p>
        </header>
        <div className="flex gap-8 lg:gap-10">
          {/* Sidebar (desktop) */}
          <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[232px]">
            <div className="sticky top-24">
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
            {/* Mobile: Type switcher + categories row + count + Filters */}
            <div className="mt-4 lg:hidden">
              <div
                className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  {/* Count already appears in the mobile filter row (<lg); only show
                      it here on desktop, where that row is hidden. */}
                  <span className="hidden text-sm font-medium text-[var(--store-muted)] lg:inline">
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
                  <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    </>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
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
              top: Math.max(96, ghost.from.top - 260),
              left: ghost.from.left + ghost.from.width / 2 - 90,
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

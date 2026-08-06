'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { MISSIONS, MISSION_CATEGORIES, missionFacets, type Mission } from '@/lib/missions-catalog'
import {
  NEEDS,
  SECTORS,
  ZONES,
  MODALITIES,
  needOf,
  searchMissions,
  searchSuggestions,
  activeFilterCount,
  sortMissions,
  filtersFromParams,
  sortFromParams,
  buildParams,
  SORT_OPTIONS,
  DEFAULT_SORT,
  EMPTY_FILTERS,
  HIGH_IMPACT_SLUGS,
  isHighImpact,
  PAGE_SIZE,
  type Facet,
  type SortKey,
  type StoreFilters,
} from '@/lib/missions-store'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'
import { StoreSidebar } from '@/components/missions/store-sidebar'
import { StoreCard, CustomCard } from '@/components/missions/store-card'
import { PreviewDrawer } from '@/components/missions/preview-drawer'
import { FilterSheet } from '@/components/missions/filter-sheet'

type GroupKey = keyof StoreFilters

// Resolve a facet value to its human label for the active-filter chips.
function facetLabel(key: GroupKey, val: string, lang: 'fr' | 'en'): string {
  const src: Facet[] = key === 'need' ? NEEDS : key === 'sector' ? SECTORS : key === 'zone' ? ZONES : MODALITIES
  return src.find((f) => f.key === val)?.label[lang] ?? val
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const { openAlma, setLauncherSuppressed } = useAlma()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize state from the URL so a reload / shared link restores everything.
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<StoreFilters>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString())),
  )
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))

  const [focused, setFocused] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [preview, setPreview] = useState<Mission | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const customCardRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0

  // Reflect state into the URL (?q=&besoin=&secteur=&zone=&modalite=&tri=).
  useEffect(() => {
    const qs = buildParams(query, filters, sort)
    const next = qs ? `${pathname}?${qs}` : pathname
    const current = `${pathname}${window.location.search}`
    if (next !== current) router.replace(next, { scroll: false })
  }, [query, filters, sort, pathname, router])

  // A query neutralizes the implicit category and keeps only explicit filters.
  const filtered = useMemo(() => {
    const ranked = searchMissions(trimmed, lang)
    const list = ranked
      .filter(({ mission }) => {
        const f = missionFacets(mission)
        if (filters.need !== 'all' && needOf(mission.category) !== filters.need) return false
        if (filters.sector !== 'all' && !f.sectors.includes(filters.sector)) return false
        if (filters.zone !== 'all' && !f.zones.includes(filters.zone)) return false
        if (filters.modalite !== 'all' && f.modality !== filters.modalite) return false
        return true
      })
      .map((s) => s.mission)
    return sortMissions(list, sort, lang)
  }, [trimmed, lang, filters, sort])

  const suggestions = useMemo(
    () => (hasQuery ? searchSuggestions(trimmed, lang, 3) : []),
    [hasQuery, trimmed, lang],
  )

  const editorial = useMemo(
    () => HIGH_IMPACT_SLUGS.map((slug) => MISSIONS.find((m) => m.slug === slug)).filter(Boolean) as Mission[],
    [],
  )

  const filterCount = activeFilterCount(filters)
  const showEditorial = !hasQuery && filterCount === 0
  const hasAnyRefinement = hasQuery || filterCount > 0

  // When the editorial row is shown, exclude those 3 missions from the catalog so
  // they don't repeat immediately. When refining, everything matching is eligible.
  const catalog = useMemo(
    () => (showEditorial ? filtered.filter((m) => !isHighImpact(m.slug)) : filtered),
    [filtered, showEditorial],
  )

  const total = catalog.length
  const visible = catalog.slice(0, visibleCount)
  const hasMore = visibleCount < total
  const allShown = !hasMore

  // Reset pagination whenever the result set changes (search, filters, sort).
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [trimmed, filters, sort])

  // Suppress the floating Alma launcher while a preview is open (it would overlap
  // the preview CTA) or while the tailored card is on screen (redundant with it).
  // On small screens the page already surfaces Alma CTAs, so keep it suppressed too.
  useEffect(() => {
    if (preview) {
      setLauncherSuppressed(true)
      return () => setLauncherSuppressed(false)
    }
    const mql = window.matchMedia('(max-width: 767px)')
    const el = customCardRef.current
    let cardVisible = false

    const sync = () => setLauncherSuppressed(mql.matches || cardVisible)
    sync()

    const io = el
      ? new IntersectionObserver(
          ([entry]) => {
            cardVisible = entry.isIntersecting
            sync()
          },
          { rootMargin: '0px 0px -80px 0px' },
        )
      : null
    if (io && el) io.observe(el)
    mql.addEventListener('change', sync)

    return () => {
      io?.disconnect()
      mql.removeEventListener('change', sync)
      setLauncherSuppressed(false)
    }
  }, [preview, setLauncherSuppressed, visible.length, allShown, hasAnyRefinement])

  // Active filters (excluding 'all') for the removable chips row.
  const activeChips = (Object.keys(filters) as GroupKey[])
    .filter((k) => filters[k] !== 'all')
    .map((k) => ({ key: k, value: filters[k], label: facetLabel(k, filters[k], lang) }))

  function selectFilter(key: GroupKey, val: string) {
    setFilters((prev) => ({ ...prev, [key]: val }))
  }
  function clearFilters() {
    setFilters(EMPTY_FILTERS)
    setQuery('')
  }

  const t = {
    eyebrow: lang === 'fr' ? 'Missions' : 'Missions',
    title: lang === 'fr' ? 'Qu’aimeriez-vous confier ?' : 'What would you like to hand off?',
    lead:
      lang === 'fr'
        ? 'Trouvez une mission prête à être adaptée au contexte de votre organisation.'
        : 'Find a mission ready to be adapted to your organization’s context.',
    placeholder:
      lang === 'fr' ? 'Décrivez votre objectif ou recherchez une mission…' : 'Describe your goal or search a mission…',
    almaHint: lang === 'fr' ? 'Vous ne savez pas comment le formuler ?' : 'Not sure how to phrase it?',
    almaLink: lang === 'fr' ? 'Parlez à Alma' : 'Talk to Alma',
    editorialEyebrow: lang === 'fr' ? 'Pour commencer' : 'To get started',
    editorialTitle: lang === 'fr' ? 'Missions à fort impact' : 'High-impact missions',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    results: lang === 'fr' ? 'Résultats' : 'Results',
    count: (n: number) => (lang === 'fr' ? `${n} mission${n > 1 ? 's' : ''}` : `${n} mission${n > 1 ? 's' : ''}`),
    showMore: (n: number) =>
      lang === 'fr' ? `Afficher ${n} missions supplémentaires` : `Show ${n} more missions`,
    sortLabel: lang === 'fr' ? 'Trier' : 'Sort',
    clear: lang === 'fr' ? 'Effacer les filtres' : 'Clear filters',
    searchChip: lang === 'fr' ? 'Recherche' : 'Search',
    filters: lang === 'fr' ? 'Filtres' : 'Filters',
    suggMissions: lang === 'fr' ? 'Missions' : 'Missions',
    almaSuggest:
      lang === 'fr'
        ? 'Votre objectif est plus spécifique ? Alma prépare une mission adaptée.'
        : 'Is your goal more specific? Alma prepares a tailored mission.',
    describe: lang === 'fr' ? 'Décrire mon besoin' : 'Describe my need',
    noResult:
      lang === 'fr'
        ? 'Aucune mission exacte. Alma peut la cadrer pour votre organisation.'
        : 'No exact mission. Alma can scope it for your organization.',
  }

  const chips = [{ key: 'all', label: t.all }, ...NEEDS.map((n) => ({ key: n.key, label: n.label[lang] }))]

  // Reusable sort control (native select = fully keyboard/ARIA friendly).
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
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="px-4 pb-8 pt-12 sm:pt-[72px]">
        <div className="mx-auto max-w-[1200px]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
          <h1 className="mt-3 font-sf text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--store-text)]">
            {t.title}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-[var(--store-muted)]">{t.lead}</p>

          {/* Dominant search */}
          <div ref={searchWrapRef} className="relative mt-7 max-w-2xl">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] px-4 py-3.5 transition-colors focus-within:border-[#D10E63]/60">
              <Search className="h-5 w-5 shrink-0 text-[var(--store-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                className="w-full bg-transparent text-sm text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
              />
              {hasQuery && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                  className="shrink-0 rounded p-0.5 text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Suggestions panel */}
            {focused && hasQuery && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] shadow-[0_16px_48px_-24px_rgba(36,31,29,0.5)]">
                {suggestions.length > 0 && (
                  <div className="p-2">
                    <p className="px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--store-muted)]">
                      {t.suggMissions}
                    </p>
                    {suggestions.map((m) => (
                      <button
                        key={m.slug}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setPreview(m)}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-[var(--store-text)] transition-colors hover:bg-[var(--store-text)]/[0.04]"
                      >
                        {m.title[lang]}
                        <ArrowRight className="h-3.5 w-3.5 text-[var(--store-muted)]" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="border-t border-[var(--store-line)] bg-[#FCEAF2]/40 p-3">
                  <p className="text-[13px] leading-relaxed text-[var(--store-muted)]">{t.almaSuggest}</p>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={openAlma}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63]"
                  >
                    {t.describe}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-3 text-[13px] text-[var(--store-muted)]">
            {t.almaHint}{' '}
            <button type="button" onClick={openAlma} className="font-semibold text-[#D10E63] hover:underline">
              {t.almaLink} →
            </button>
          </p>
        </div>
      </section>

      {/* Mobile category chips + filters trigger */}
      <div className="px-4 lg:hidden">
        <div className="mx-auto max-w-[1200px]">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x proximity' }}>
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => selectFilter('need', c.key)}
                style={{ scrollSnapAlign: 'start' }}
                className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  filters.need === c.key
                    ? 'bg-[#FCEAF2] text-[#AD0C53]'
                    : 'border border-[var(--store-line)] text-[var(--store-text)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--store-muted)]">{t.count(total)}</span>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--store-line)] px-3 py-1.5 text-xs font-semibold text-[var(--store-text)]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {t.filters}
              {filterCount > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D10E63] px-1 text-[10px] font-bold text-[#FBF9F3]">
                  {filterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------ SIDEBAR + CATALOG ------------------------ */}
      <div className="px-4 pb-20 pt-6 sm:pt-8">
        <div className="mx-auto flex max-w-[1200px] gap-10">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20">
              <StoreSidebar filters={filters} lang={lang} onSelect={selectFilter} />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {/* Editorial selection (only when nothing is searched/filtered) */}
            {showEditorial && (
              <div className="mb-12">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">
                  {t.editorialEyebrow}
                </p>
                <h2 className="mt-2 font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                  {t.editorialTitle}
                </h2>
                <div className="mt-5 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {editorial.map((m) => (
                    <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={setPreview} />
                  ))}
                </div>
              </div>
            )}

            {/* Results toolbar: title + count (left) + sort (right). The count is a
                sibling of the h2, never part of its accessible name. */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2">
                <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                  {hasAnyRefinement ? t.results : t.all}
                </h2>
                <span className="text-sm font-medium text-[var(--store-muted)]">{t.count(total)}</span>
              </div>
              {sortControl}
            </div>

            {/* Active-filter chips + clear */}
            {hasAnyRefinement && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {hasQuery && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--store-line)] bg-[var(--store-surface)] py-1 pl-3 pr-1.5 text-xs font-medium text-[var(--store-text)]">
                    <span className="text-[var(--store-muted)]">{t.searchChip}:</span> “{trimmed}”
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label={lang === 'fr' ? 'Retirer la recherche' : 'Remove search'}
                      className="rounded-full p-0.5 text-[var(--store-muted)] transition-colors hover:bg-[var(--store-text)]/[0.08] hover:text-[var(--store-text)]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {activeChips.map((c) => (
                  <span
                    key={`${c.key}-${c.value}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D10E63]/25 bg-[#FCEAF2]/60 py-1 pl-3 pr-1.5 text-xs font-medium text-[#AD0C53]"
                  >
                    {c.label}
                    <button
                      type="button"
                      onClick={() => selectFilter(c.key, 'all')}
                      aria-label={`${lang === 'fr' ? 'Retirer' : 'Remove'} ${c.label}`}
                      className="rounded-full p-0.5 transition-colors hover:bg-[#D10E63]/15"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs font-semibold text-[var(--store-muted)] underline-offset-2 transition-colors hover:text-[#D10E63] hover:underline"
                >
                  {t.clear}
                </button>
              </div>
            )}

            {total === 0 ? (
              /* No result at all → the tailored card replaces the entire grid. */
              <>
                {hasQuery && (
                  <div className="mb-5 rounded-xl border border-[#D10E63]/25 bg-[#FCEAF2]/50 p-5">
                    <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {lang === 'fr' ? 'Préparée par Alma' : 'Prepared by Alma'}
                    </p>
                    <h3 className="mt-2 font-sf text-lg font-bold text-[var(--store-text)]">“{trimmed}”</h3>
                    <p className="mt-1 text-sm text-[var(--store-muted)]">{t.noResult}</p>
                  </div>
                )}
                <div ref={customCardRef} className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  <CustomCard lang={lang} onDescribe={openAlma} />
                </div>
              </>
            ) : (
              <>
                <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((m) => (
                    <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={setPreview} />
                  ))}
                  {/* Tailored card sits right after the first page while more remain,
                      as the natural exit for an unsatisfied browse. */}
                  {hasMore && (
                    <div ref={customCardRef} className="flex">
                      <CustomCard lang={lang} onDescribe={openAlma} />
                    </div>
                  )}
                </div>

                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                    >
                      {t.showMore(Math.min(PAGE_SIZE, total - visibleCount))}
                    </button>
                  </div>
                )}

                {/* When everything is visible, keep the tailored card at the very end. */}
                {allShown && (
                  <div ref={customCardRef} className="mt-5 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    <CustomCard lang={lang} onDescribe={openAlma} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <PreviewDrawer mission={preview} categories={MISSION_CATEGORIES} lang={lang} onClose={() => setPreview(null)} />
      <FilterSheet
        open={sheetOpen}
        filters={filters}
        lang={lang}
        onSelect={selectFilter}
        onClear={clearFilters}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  )
}

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowUp, Mic, Paperclip, SlidersHorizontal, X } from 'lucide-react'
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
import { StoreCard, FeaturedCard, RecentCard, AlmaBand } from '@/components/missions/store-card'
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

  // The catalog is browsed with the left-hand filters and categories only — the
  // text field is a conversational entry to Alma, not a live catalog search.
  // `query` is kept internal (always empty) so downstream logic stays intact.
  const [query, setQuery] = useState('')
  // Conversational field sent to Alma. Prefilled from ?q= for a returning link.
  const [almaText, setAlmaText] = useState(() => searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<StoreFilters>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString())),
  )
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))

  const [focused, setFocused] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [preview, setPreview] = useState<Mission | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [phIndex, setPhIndex] = useState(0)
  const [phVisible, setPhVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
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

  // Honor the user's reduced-motion preference for the placeholder cross-fade.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Rotate example goals in the placeholder (every 4s) with a fade transition,
  // only while the field is idle and empty.
  useEffect(() => {
    if (focused || almaText.trim()) return
    if (reduceMotion) {
      const id = setInterval(() => setPhIndex((i) => i + 1), 4000)
      return () => clearInterval(id)
    }
    let hideTimer: ReturnType<typeof setTimeout>
    const id = setInterval(() => {
      setPhVisible(false)
      hideTimer = setTimeout(() => {
        setPhIndex((i) => i + 1)
        setPhVisible(true)
      }, 350)
    }, 4000)
    return () => {
      clearInterval(id)
      clearTimeout(hideTimer)
    }
  }, [focused, almaText, reduceMotion])

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

  // --- state mutators --------------------------------------------------------
  const openPreview = useCallback((m: Mission, trigger: HTMLElement | null) => {
    previewTrigger.current = trigger
    setPreview(m)
  }, [])

  const closePreview = useCallback(() => {
    setPreview(null)
    previewTrigger.current?.focus()
  }, [])

  // The conversational field hands the objective to Alma on /decouvrir.
  const askAlma = useCallback(() => {
    const text = almaText.trim()
    router.push(text ? `/decouvrir?q=${encodeURIComponent(text)}` : '/decouvrir')
  }, [almaText, router])

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
        ? 'Choisissez une mission ou décrivez votre objectif à Alma. Elle prépare le Collaborateur IA capable de l’accomplir dans votre Organisation.'
        : 'Choose a mission or describe your goal to Alma. She prepares the AI Collaborator able to accomplish it in your Organization.',
    askAlma: lang === 'fr' ? 'Demandez à Alma' : 'Ask Alma',
    send: lang === 'fr' ? 'Envoyer à Alma' : 'Send to Alma',
    attach: lang === 'fr' ? 'Joindre un fichier' : 'Attach a file',
    mic: lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma',
    placeholder:
      lang === 'fr' ? 'Décrivez ce que vous souhaitez confier…' : 'Describe what you’d like to hand off…',
    placeholderExamples:
      lang === 'fr'
        ? [
            'Ex. Trouver des prospects correspondant à mes critères',
            'Ex. Préparer mon prochain comité de direction',
            'Ex. Répondre aux demandes reçues par email',
            'Ex. Automatiser le suivi des factures en retard',
            'Ex. Produire chaque lundi un rapport d’activité',
          ]
        : [
            'e.g. Find prospects matching my criteria',
            'e.g. Prepare my next leadership meeting',
            'e.g. Reply to requests received by email',
            'e.g. Automate follow-up on overdue invoices',
            'e.g. Produce a weekly activity report every Monday',
          ],
    featuredTitle: lang === 'fr' ? 'Missions recommandées' : 'Recommended missions',
    featuredDesc:
      lang === 'fr'
        ? 'Des missions prêtes à être adaptées à votre Organisation par Alma.'
        : 'Missions ready to be adapted to your Organization by Alma.',
    recentTitle: lang === 'fr' ? 'Nouvelles missions' : 'New missions',
    recentDesc:
      lang === 'fr'
        ? 'Une sélection des dernières missions publiées dans le catalogue.'
        : 'A selection of the latest missions published in the catalog.',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    results: lang === 'fr' ? 'Résultats' : 'Results',
    count: (n: number) => `${n} mission${n > 1 ? 's' : ''}`,
    allBrowsed: lang === 'fr' ? 'Vous avez parcouru toutes les missions.' : 'You’ve browsed all missions.',
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
      {/* Fixed navbar is 76px tall; padding-top = 76px + the requested nav→title gap
          (mobile ~36px, tablet 48px, desktop 68px). */}
      <header className="mx-auto max-w-[1240px] px-6 pb-6 pt-28 sm:pt-[124px] lg:pt-[144px]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#D10E63]">{t.eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-balance font-sf text-[clamp(1.625rem,3.6vw,2.375rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--store-text)]">
          {t.title}
        </h1>
        <p className="mt-2.5 max-w-[720px] text-pretty text-[15px] leading-relaxed text-[var(--store-muted)]">{t.lead}</p>
      </header>

      {/* Divider marking the transition from the hero to the search tool. */}
      <div className="mx-auto max-w-[1240px] px-6">
        <hr className="border-t border-[var(--store-line)]" />
      </div>

      {/* ------------------------ SIDEBAR + MAIN ------------------------ */}
      <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-8">
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
              />
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0 flex-1">
            {/* Ask Alma — a conversational entry, not a live catalog search.
                The catalog is browsed with the filters and categories below. */}
            <div className="rounded-2xl border border-[var(--store-line)] bg-[var(--store-surface)] p-3 shadow-[0_1px_2px_rgba(36,31,29,0.04)] transition-colors focus-within:border-[#D10E63]/60 focus-within:ring-2 focus-within:ring-[#D10E63]/15">
              <label htmlFor="ask-alma" className="mb-2 flex items-center gap-2 px-1">
                <img
                  src="/alma-avatar.png"
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-[#D10E63]/40"
                />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
                  {t.askAlma}
                </span>
              </label>
              <div className="relative px-1">
                <input
                  id="ask-alma"
                  ref={searchRef}
                  type="text"
                  value={almaText}
                  onChange={(e) => setAlmaText(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                      e.preventDefault()
                      askAlma()
                    }
                  }}
                  placeholder={focused ? t.placeholder : ''}
                  aria-label={t.placeholder}
                  className="w-full bg-transparent text-[15px] text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
                />
                {!focused && !almaText.trim() && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
                  >
                    <span
                      className="truncate text-[15px] text-[var(--store-muted)] transition-opacity duration-300"
                      style={{ opacity: phVisible ? 1 : 0 }}
                    >
                      {t.placeholderExamples[phIndex % t.placeholderExamples.length]}
                    </span>
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={askAlma}
                    aria-label={t.attach}
                    title={t.attach}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)]"
                  >
                    <Paperclip className="h-[18px] w-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={askAlma}
                    aria-label={t.mic}
                    title={t.mic}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)]"
                  >
                    <Mic className="h-[18px] w-[18px]" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={askAlma}
                  aria-label={t.send}
                  title={t.send}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#D10E63] px-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
                >
                  {t.send}
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile: Type switcher + categories row + count + Filters */}
            <div className="mt-4 lg:hidden">
              <div
                className="mb-3 inline-flex rounded-lg border border-[var(--store-line)] bg-[var(--store-surface)] p-0.5"
                role="group"
                aria-label={lang === 'fr' ? 'Créées par' : 'Created by'}
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
                  <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    <div className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((m) => (
                      <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={openPreview} />
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
                    </>
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

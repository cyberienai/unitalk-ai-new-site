'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, MessageSquare, LayoutGrid, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import {
  STORE_ITEMS,
  TYPE_FACETS,
  CREATOR_FACETS,
  CREATOR_LABELS,
  TYPE_LABELS_PLURAL,
  facetLabels,
  editorFacets,
  searchStore,
  matchesStoreFilters,
  activeStoreFilterCount,
  advancedStoreFilterCount,
  sortStoreItems,
  storeFiltersFromParams,
  sortFromParams,
  buildStoreParams,
  SORT_OPTIONS,
  DEFAULT_SORT,
  EMPTY_STORE_FILTERS,
  PAGE_SIZE,
  type StoreFilters as Filters,
  type SortKey,
  type StoreType,
} from '@/lib/store-catalog'
import { StoreFilters } from '@/components/store/store-filters'
import { StoreFilterSheet } from '@/components/store/store-filter-sheet'
import { StoreItemCard, StoreCardSkeleton } from '@/components/store/store-item-card'
import { StoreAlmaConsole } from '@/components/store/store-alma-console'

type TabKey = 'alma' | 'catalog'

export function StoreContent({ initialType }: { initialType?: StoreType }) {
  const { lang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const almaText = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(almaText)
  const [filters, setFilters] = useState<Filters>(() => {
    const base = storeFiltersFromParams(new URLSearchParams(searchParams.toString()))
    return initialType ? { ...base, type: initialType } : base
  })
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))

  // Land on the catalog tab when the URL already carries a refinement or a type.
  const initiallyCatalog =
    Boolean(almaText) || activeStoreFilterCount(filters) > 0 || Boolean(initialType) || searchParams.has('tab')
  const [tab, setTab] = useState<TabKey>(
    initiallyCatalog && searchParams.get('tab') !== 'alma' ? 'catalog' : initiallyCatalog ? 'alma' : 'alma',
  )

  const [sheetOpen, setSheetOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0
  const filterCount = activeStoreFilterCount(filters)
  const advCount = advancedStoreFilterCount(filters)
  const hasAnyRefinement = hasQuery || filterCount > 0

  // Reflect state into the URL (defaults omitted). Keep filters on back/forward.
  useEffect(() => {
    const qs = buildStoreParams(query, filters, sort)
    const tabQs = tab === 'alma' ? (qs ? `${qs}&tab=alma` : 'tab=alma') : qs
    const next = tabQs ? `${pathname}?${tabQs}` : pathname
    const current = `${pathname}${window.location.search}`
    if (next !== current) router.replace(next, { scroll: false })
  }, [query, filters, sort, tab, pathname, router])

  // Brief skeleton whenever the result set changes (section 18).
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 260)
    return () => clearTimeout(id)
  }, [trimmed, filters, sort])

  // Ranked + filtered list over all Store items.
  const results = useMemo(() => {
    const ranked = searchStore(trimmed, lang)
    const list = ranked.filter((s) => matchesStoreFilters(s.item, filters)).map((s) => s.item)
    if (hasQuery && sort === 'recommended') return list
    return sortStoreItems(list, sort, lang)
  }, [trimmed, hasQuery, lang, filters, sort])

  const total = results.length
  const visible = results.slice(0, visibleCount)
  const hasMore = visibleCount < total

  useEffect(() => {
    if (!hasMore || loading) return
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
  }, [hasMore, visibleCount, loading])

  // --- mutators --------------------------------------------------------------
  function selectType(key: string) {
    // Switching type resets the contextual facets that no longer apply.
    setFilters((p) => ({ ...p, type: key as Filters['type'], facet: 'all', editor: 'all' }))
  }
  function selectCreator(key: string) {
    setFilters((p) => ({ ...p, creator: key as Filters['creator'] }))
  }
  function selectFacet(key: string) {
    setFilters((p) => ({ ...p, facet: key }))
  }
  function selectEditor(key: string) {
    setFilters((p) => ({ ...p, editor: key }))
  }
  function clearAll() {
    setFilters(EMPTY_STORE_FILTERS)
    setQuery('')
  }
  const composeWithAlma = useCallback((q: string) => {
    setQuery(q)
    setTab('catalog')
  }, [])

  // --- copy ------------------------------------------------------------------
  const singleType = filters.type !== 'all' ? (filters.type as StoreType) : null
  const heads = {
    all: {
      title: lang === 'fr' ? 'Le catalogue' : 'The catalog',
      desc:
        lang === 'fr'
          ? 'Des profils métier, des compétences et des applications pour équiper vos Collaborateurs IA.'
          : 'Job profiles, skills and applications to equip your AI Collaborators.',
    },
    profil: {
      title: lang === 'fr' ? 'Profils métier' : 'Job profiles',
      desc:
        lang === 'fr'
          ? 'Des rôles et des savoir-faire durables adaptés au travail de votre Organisation.'
          : 'Durable roles and know-how suited to your Organization’s work.',
    },
    competence: {
      title: lang === 'fr' ? 'Compétences' : 'Skills',
      desc:
        lang === 'fr'
          ? 'Des savoir-faire précis à ajouter à vos Collaborateurs IA selon leurs missions.'
          : 'Precise know-how to add to your AI Collaborators for their missions.',
    },
    application: {
      title: lang === 'fr' ? 'Applications' : 'Applications',
      desc:
        lang === 'fr'
          ? 'Les services dans lesquels vos Collaborateurs IA peuvent travailler avec les autorisations de votre Organisation.'
          : 'The services your AI Collaborators can work in, with your Organization’s permissions.',
    },
  }
  const head = singleType ? heads[singleType] : heads.all
  const countLabel = lang === 'fr' ? `${total} élément${total > 1 ? 's' : ''}` : `${total} item${total > 1 ? 's' : ''}`

  const t = {
    tabAlma: lang === 'fr' ? 'Parlez à Alma' : 'Talk to Alma',
    tabCatalog: lang === 'fr' ? 'Explorer le catalogue' : 'Explore the catalog',
    sortLabel: lang === 'fr' ? 'Trier' : 'Sort',
    clear: lang === 'fr' ? 'Effacer les filtres' : 'Clear filters',
    searchChip: lang === 'fr' ? 'Recherche' : 'Search',
    filters: lang === 'fr' ? 'Filtres' : 'Filters',
    browsed: lang === 'fr' ? 'Vous avez parcouru tout le catalogue.' : 'You’ve browsed the whole catalog.',
    emptyTitle: lang === 'fr' ? 'Aucun élément ne correspond exactement' : 'No item matches exactly',
    emptyDesc:
      lang === 'fr'
        ? 'Décrivez à Alma ce que votre Collaborateur IA doit savoir faire. Elle composera le profil métier, les compétences et les applications adaptés.'
        : 'Describe to Alma what your AI Collaborator needs to do. She’ll compose the right job profile, skills and applications.',
    compose: lang === 'fr' ? 'Préparer avec Alma' : 'Prepare with Alma',
    endInvite:
      lang === 'fr'
        ? 'Vous ne trouvez pas ce dont votre Collaborateur IA a besoin ?'
        : 'Can’t find what your AI Collaborator needs?',
    askAlma: lang === 'fr' ? 'Demandez à Alma' : 'Ask Alma',
  }

  // Hand-off to Alma carries the query, type and active filters (section 17).
  const almaHref = useMemo(() => {
    const qs = buildStoreParams(query, filters, DEFAULT_SORT)
    return qs ? `/decouvrir?${qs}` : '/decouvrir'
  }, [query, filters])

  // Active-filter chips.
  type Chip = { id: string; label: string; onRemove: () => void }
  const chips: Chip[] = []
  if (hasQuery) chips.push({ id: 'q', label: `${t.searchChip}: “${trimmed}”`, onRemove: () => setQuery('') })
  if (filters.type !== 'all')
    chips.push({
      id: 'type',
      label: TYPE_FACETS.find((o) => o.key === filters.type)?.label[lang] ?? filters.type,
      onRemove: () => selectType('all'),
    })
  if (filters.creator !== 'all')
    chips.push({
      id: 'creator',
      label: CREATOR_LABELS[filters.creator][lang],
      onRemove: () => selectCreator('all'),
    })
  if (singleType && filters.facet !== 'all')
    chips.push({
      id: 'facet',
      label: facetLabels(singleType)[filters.facet]?.[lang] ?? filters.facet,
      onRemove: () => selectFacet('all'),
    })
  if (filters.editor !== 'all')
    chips.push({ id: 'editor', label: filters.editor, onRemove: () => selectEditor('all') })

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

  const tabButton = (key: TabKey, label: string, Icon: typeof MessageSquare) => {
    const active = tab === key
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => setTab(key)}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
          active
            ? 'bg-[var(--store-surface)] text-[var(--store-text)] shadow-[0_0_0_1px_rgba(36,31,29,0.09),0_1px_2px_rgba(36,31,29,0.04)]'
            : 'text-[var(--store-muted)] hover:text-[var(--store-text)]'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--store-page)] text-[var(--store-text)]">
      {/* ------------------------------ HERO ------------------------------ */}
      <div className="mx-auto max-w-[1240px] px-6 pt-28 sm:pt-[124px] lg:pt-[136px]">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#AD0C53]">
          {lang === 'fr' ? 'Collaborateurs IA' : 'AI Collaborators'}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-[var(--store-text)] sm:text-4xl lg:text-[44px]">
          {lang === 'fr' ? 'De quoi votre Collaborateur IA a-t-il besoin ?' : 'What does your AI Collaborator need?'}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[var(--store-muted)] sm:text-base">
          {lang === 'fr'
            ? 'Explorez les profils métier, les compétences et les applications. Alma les assemble selon sa mission et le contexte de votre Organisation.'
            : 'Explore the job profiles, skills and applications. Alma assembles them for its mission and your Organization’s context.'}
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label={lang === 'fr' ? 'Modes d’exploration' : 'Browse modes'}
          className="mt-7 inline-flex gap-1 rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] p-1"
        >
          {tabButton('alma', t.tabAlma, MessageSquare)}
          {tabButton('catalog', t.tabCatalog, LayoutGrid)}
        </div>
      </div>

      {/* ------------------------------ ALMA TAB ------------------------------ */}
      {tab === 'alma' && (
        <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-6">
          <StoreAlmaConsole lang={lang} initialQuery={query} onCompose={composeWithAlma} />
        </div>
      )}

      {/* ------------------------------ CATALOG TAB ------------------------------ */}
      {tab === 'catalog' && (
        <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-8">
          <div className="flex gap-8 lg:gap-10">
            {/* Sidebar (desktop) — sticky, no inner scrollbar (section 4) */}
            <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[232px]">
              <div className="sticky top-24">
                <StoreFilters
                  filters={filters}
                  lang={lang}
                  onType={selectType}
                  onCreator={selectCreator}
                  onFacet={selectFacet}
                  onEditor={selectEditor}
                />
              </div>
            </aside>

            {/* Main column */}
            <div className="min-w-0 flex-1">
              {/* Mobile: type switcher + count + Filters button */}
              <div className="lg:hidden">
                <div
                  className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  role="group"
                  aria-label={lang === 'fr' ? 'Type' : 'Type'}
                >
                  {TYPE_FACETS.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => selectType(o.key)}
                      aria-pressed={filters.type === o.key}
                      className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        filters.type === o.key
                          ? 'bg-[#FCEAF2] text-[#AD0C53]'
                          : 'border border-[var(--store-line)] text-[var(--store-text)]'
                      }`}
                    >
                      {o.label[lang]}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--store-muted)]">{countLabel}</span>
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

              {/* Result header */}
              <section className="mt-4 lg:mt-0">
                <div className="mb-1 flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
                      {head.title}
                    </h2>
                    <span className="text-sm font-medium text-[var(--store-muted)]">{countLabel}</span>
                  </div>
                  {sortControl}
                </div>
                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--store-muted)]">{head.desc}</p>

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

                {loading ? (
                  <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <StoreCardSkeleton key={i} />
                    ))}
                  </div>
                ) : total === 0 ? (
                  <StoreEmptyState
                    title={t.emptyTitle}
                    desc={t.emptyDesc}
                    action={t.compose}
                    href={almaHref}
                    onCompose={() => setTab('alma')}
                  />
                ) : (
                  <>
                    <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {visible.map((item) => (
                        <StoreItemCard key={`${item.type}-${item.slug}`} item={item} lang={lang} />
                      ))}
                    </div>

                    {hasMore ? (
                      <div ref={loadMoreRef} aria-hidden="true" className="h-4" />
                    ) : (
                      <div className="mt-10">
                        <div className="flex items-center gap-4" role="status">
                          <span className="h-px flex-1 bg-[var(--store-line)]" aria-hidden="true" />
                          <p className="text-sm font-medium text-[var(--store-muted)]">{t.browsed}</p>
                          <span className="h-px flex-1 bg-[var(--store-line)]" aria-hidden="true" />
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
                          <p className="text-sm text-[var(--store-muted)]">{t.endInvite}</p>
                          <button
                            type="button"
                            onClick={() => setTab('alma')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#AD0C53] transition-colors hover:text-[#D10E63]"
                          >
                            {t.askAlma}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      <StoreFilterSheet
        open={sheetOpen}
        filters={filters}
        lang={lang}
        onType={selectType}
        onCreator={selectCreator}
        onFacet={selectFacet}
        onEditor={selectEditor}
        onClear={clearAll}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  )
}

function StoreEmptyState({
  title,
  desc,
  action,
  href,
  onCompose,
}: {
  title: string
  desc: string
  action: string
  href: string
  onCompose: () => void
}) {
  return (
    <div className="rounded-2xl border border-[var(--store-line)] bg-[var(--store-surface)] p-8 text-center">
      <h3 className="mx-auto max-w-md text-balance font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-[var(--store-muted)]">{desc}</p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onCompose}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
        >
          {action}
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          href={href}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[var(--store-line)] px-5 py-2.5 text-sm font-semibold text-[var(--store-text)] transition-colors hover:border-[#D10E63]/40"
        >
          {action}
        </Link>
      </div>
    </div>
  )
}

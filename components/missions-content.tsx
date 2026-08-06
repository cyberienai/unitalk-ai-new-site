'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { MISSIONS, MISSION_CATEGORIES, missionFacets, type Mission } from '@/lib/missions-catalog'
import {
  NEEDS,
  needOf,
  searchMissions,
  searchSuggestions,
  activeFilterCount,
  EMPTY_FILTERS,
  HIGH_IMPACT_SLUGS,
  type StoreFilters,
} from '@/lib/missions-store'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/lib/alma-context'
import { StoreSidebar } from '@/components/missions/store-sidebar'
import { StoreCard, CustomCard } from '@/components/missions/store-card'
import { PreviewDrawer } from '@/components/missions/preview-drawer'
import { FilterSheet } from '@/components/missions/filter-sheet'

type GroupKey = keyof StoreFilters

export function MissionsContent() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()

  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [filters, setFilters] = useState<StoreFilters>(EMPTY_FILTERS)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [preview, setPreview] = useState<Mission | null>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0

  // A query neutralizes the implicit category and keeps only explicit filters.
  const filtered = useMemo(() => {
    const ranked = searchMissions(trimmed, lang)
    return ranked
      .filter(({ mission }) => {
        const f = missionFacets(mission)
        if (filters.need !== 'all' && needOf(mission.category) !== filters.need) return false
        if (filters.sector !== 'all' && !f.sectors.includes(filters.sector)) return false
        if (filters.zone !== 'all' && !f.zones.includes(filters.zone)) return false
        if (filters.deliverable !== 'all' && f.deliverableType !== filters.deliverable) return false
        return true
      })
      .map((s) => s.mission)
  }, [trimmed, lang, filters])

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

  function selectFilter(key: GroupKey, val: string) {
    setFilters((prev) => ({ ...prev, [key]: val }))
  }
  function clearFilters() {
    setFilters(EMPTY_FILTERS)
  }

  const t = {
    eyebrow: lang === 'fr' ? 'Missions' : 'Missions',
    title: lang === 'fr' ? 'Qu’aimeriez-vous confier ?' : 'What would you like to hand off?',
    lead:
      lang === 'fr'
        ? 'Trouvez une mission prête à être adaptée au contexte de votre Organisation.'
        : 'Find a mission ready to be adapted to your organization’s context.',
    placeholder:
      lang === 'fr' ? 'Décrivez votre objectif ou recherchez une mission…' : 'Describe your goal or search a mission…',
    almaHint: lang === 'fr' ? 'Vous ne savez pas comment le formuler ?' : 'Not sure how to phrase it?',
    almaLink: lang === 'fr' ? 'Parlez à Alma' : 'Talk to Alma',
    editorialEyebrow: lang === 'fr' ? 'Pour commencer' : 'To get started',
    editorialTitle: lang === 'fr' ? 'Missions à fort impact' : 'High-impact missions',
    all: lang === 'fr' ? 'Toutes les missions' : 'All missions',
    count: (n: number) => (lang === 'fr' ? `${n} mission${n > 1 ? 's' : ''}` : `${n} mission${n > 1 ? 's' : ''}`),
    filters: lang === 'fr' ? 'Filtres' : 'Filters',
    suggMissions: lang === 'fr' ? 'Missions' : 'Missions',
    almaSuggest:
      lang === 'fr'
        ? 'Votre objectif est plus spécifique ? Alma prépare une mission adaptée.'
        : 'Is your goal more specific? Alma prepares a tailored mission.',
    describe: lang === 'fr' ? 'Décrire mon besoin' : 'Describe my need',
    noResult:
      lang === 'fr'
        ? 'Aucune mission exacte. Alma peut la cadrer pour votre Organisation.'
        : 'No exact mission. Alma can scope it for your organization.',
  }

  const chips = [{ key: 'all', label: t.all }, ...NEEDS.map((n) => ({ key: n.key, label: n.label[lang] }))]

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
              <kbd className="hidden shrink-0 rounded border border-[var(--store-line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--store-muted)] sm:inline">
                ⌘K
              </kbd>
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
            <span className="text-sm font-semibold text-[var(--store-muted)]">{t.count(filtered.length)}</span>
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
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {editorial.map((m) => (
                    <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={setPreview} />
                  ))}
                </div>
              </div>
            )}

            {/* Catalog */}
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 className="font-sf text-xl font-bold tracking-[-0.01em] text-[var(--store-text)]">{t.all}</h2>
              <span className="hidden text-sm font-medium text-[var(--store-muted)] lg:inline">
                {t.count(filtered.length)}
              </span>
            </div>

            {hasQuery && filtered.length === 0 && (
              <div className="mb-5 rounded-xl border border-[#D10E63]/25 bg-[#FCEAF2]/50 p-5">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {lang === 'fr' ? 'Préparée par Alma' : 'Prepared by Alma'}
                </p>
                <h3 className="mt-2 font-sf text-lg font-bold text-[var(--store-text)]">“{trimmed}”</h3>
                <p className="mt-1 text-sm text-[var(--store-muted)]">{t.noResult}</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((m) => (
                <StoreCard key={m.slug} mission={m} categories={MISSION_CATEGORIES} lang={lang} onOpen={setPreview} />
              ))}
              <CustomCard lang={lang} onDescribe={openAlma} />
            </div>
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

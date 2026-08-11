'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Mic, Search, Square, X } from 'lucide-react'
import {
  MISSIONS,
  MISSION_CATEGORIES,
  type Mission,
} from '@/lib/missions-catalog'
import {
  CATEGORY_FACETS,
  SECTORS,
  ZONES,
  LANGUAGES,
  MODALITIES,
  searchMissions,
  matchesFilters,
  activeFilterCount,
  sortMissions,
  filtersFromParams,
  sortFromParams,
  buildParams,
  SORT_OPTIONS,
  EMPTY_FILTERS,
  type Facet,
  type SortKey,
  type StoreFilters,
} from '@/lib/missions-store'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'

type FilterKey = 'secteur' | 'zone' | 'langue' | 'modalite'

const FILTERS: { key: FilterKey; label: { fr: string; en: string }; options: Facet[] }[] = [
  { key: 'secteur', label: { fr: 'Secteur', en: 'Industry' }, options: SECTORS },
  { key: 'zone', label: { fr: 'Zone', en: 'Region' }, options: ZONES },
  { key: 'langue', label: { fr: 'Langue', en: 'Language' }, options: LANGUAGES },
  { key: 'modalite', label: { fr: 'Modalité', en: 'Format' }, options: MODALITIES },
]

export function MissionsContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [need, setNeed] = useState('')
  const [sort, setSort] = useState<SortKey>(() => sortFromParams(new URLSearchParams(searchParams.toString())))
  const [filters, setFilters] = useState<StoreFilters>(() =>
    filtersFromParams(new URLSearchParams(searchParams.toString())),
  )
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : undefined
    if (!SpeechRecognition) return
    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => {
      try {
        recognition.abort()
      } catch {}
    }
  }, [lang])

  useEffect(() => {
    const qs = buildParams(query, filters, sort)
    const next = qs ? `${pathname}?${qs}` : pathname
    if (`${pathname}${window.location.search}` !== next) router.replace(next, { scroll: false })
  }, [filters, pathname, query, router, sort])

  const missions = useMemo(() => {
    const matching = searchMissions(query.trim(), lang)
      .map((result) => result.mission)
      .filter((mission) => matchesFilters(mission, filters))
    return sortMissions(matching, sort, lang)
  }, [filters, lang, query, sort])

  const counts = useMemo(
    () => new Map(MISSION_CATEGORIES.map((category) => [category.key, MISSIONS.filter((mission) => mission.category === category.key).length])),
    [],
  )

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  function submitNeed() {
    if (!need.trim()) return
    router.push(`/decouvrir?q=${encodeURIComponent(need.trim())}`)
  }

  function selectCategory(category: string) {
    setFilters((current) => ({ ...current, categorie: category }))
  }

  function selectFilter(key: FilterKey, value: string) {
    setFilters((current) => ({ ...current, [key]: value ? [value] : [] }))
  }

  const t = COPY[lang]
  const hasFilters = activeFilterCount(filters) > 0 || query.trim().length > 0

  return (
    <main className="min-h-screen bg-[#F3EFE6] pb-20 pt-24 text-[#1C1A17] sm:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#B00C54]">Unitalk</p>
          <h1 className="mt-3 font-sf text-[clamp(2.3rem,6vw,4.5rem)] font-semibold tracking-[-0.055em]">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.subtitle}</p>

          <div className="relative mx-auto mt-7 max-w-2xl">
            <input
              type="text"
              value={need}
              onChange={(event) => setNeed(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.nativeEvent.isComposing) submitNeed()
              }}
              placeholder={t.needPlaceholder}
              aria-label={t.needPlaceholder}
              className="h-14 w-full rounded-2xl border border-[#D8D0C2] bg-white pl-5 pr-14 text-left text-[15px] shadow-sm outline-none placeholder:text-[#6E665A] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={!voiceSupported}
              aria-label={listening ? t.stop : t.talk}
              className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63] text-white transition-colors hover:bg-[#E51872] disabled:opacity-40"
            >
              <span aria-hidden className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
              {listening ? <Square className="relative h-4 w-4" fill="currentColor" /> : <Mic className="relative h-4 w-4" />}
            </button>
          </div>
        </header>

        <section className="mt-12">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">{t.categories}</span>
            <CategoryButton active={filters.categorie === 'all'} onClick={() => selectCategory('all')}>
              {t.all} <span className="opacity-70">{MISSIONS.length}</span>
            </CategoryButton>
            {CATEGORY_FACETS.map((category) => (
              <CategoryButton
                key={category.key}
                active={filters.categorie === category.key}
                onClick={() => selectCategory(category.key)}
              >
                {shortCategory(category.key, lang)} <span className="opacity-70">{counts.get(category.key)}</span>
              </CategoryButton>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E665A]">{t.filters}</span>
            {FILTERS.map((filter) => (
              <FilterSelect
                key={filter.key}
                label={filter.label[lang]}
                allLabel={t.all}
                value={filters[filter.key][0] ?? ''}
                options={filter.options}
                lang={lang}
                onChange={(value) => selectFilter(filter.key, value)}
              />
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setFilters(EMPTY_FILTERS)
                  setQuery('')
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-[12px] font-semibold text-[#6E665A] hover:text-[#D10E63]"
              >
                <X className="h-3.5 w-3.5" />
                {t.reset}
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#DED5C5] pt-5 md:flex-row md:items-center">
            <p className="font-sf text-lg font-bold">{t.count(missions.length)}</p>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row md:justify-end">
              <label className="relative">
                <span className="sr-only">{t.sort}</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  className="h-10 appearance-none rounded-xl border border-[#D8D0C2] bg-white pl-3 pr-9 text-[12px] font-semibold text-[#4E483F] outline-none focus:border-[#D10E63]/50"
                >
                  {SORT_OPTIONS.map((option) => <option key={option.key} value={option.key}>{t.sort}: {option.label[lang]}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#6E665A]" />
              </label>
              <label className="relative min-w-0 sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#6E665A]" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.search}
                  className="h-10 w-full rounded-xl border border-[#D8D0C2] bg-white pl-9 pr-3 text-[13px] outline-none placeholder:text-[#6E665A] focus:border-[#D10E63]/50 focus:ring-3 focus:ring-[#D10E63]/10"
                />
              </label>
            </div>
          </div>

          {missions.length ? (
            <div className="mt-5 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
              {missions.map((mission) => <StoreCard key={mission.slug} mission={mission} lang={lang} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-[#DED5C5] bg-white px-6 py-12 text-center text-[#4E483F]">{t.empty}</div>
          )}
        </section>
      </div>
    </main>
  )
}

function CategoryButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold transition-colors ${
        active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F] hover:border-[#D10E63]/45'
      }`}
    >
      {children}
    </button>
  )
}

function FilterSelect({ label, allLabel, value, options, lang, onChange }: { label: string; allLabel: string; value: string; options: Facet[]; lang: 'fr' | 'en'; onChange: (value: string) => void }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 appearance-none rounded-xl border border-[#D8D0C2] bg-white pl-3 pr-8 text-[12px] font-semibold text-[#4E483F] outline-none focus:border-[#D10E63]/50"
      >
        <option value="">{label}: {allLabel}</option>
        {options.map((option) => <option key={option.key} value={option.key}>{label}: {option.label[lang]}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-[#6E665A]" />
    </label>
  )
}

function shortCategory(key: string, lang: 'fr' | 'en'): string {
  const labels: Record<string, { fr: string; en: string }> = {
    ventes: { fr: 'Ventes', en: 'Sales' },
    'relation-client': { fr: 'Service client', en: 'Customer service' },
    marketing: { fr: 'Marketing', en: 'Marketing' },
    reunions: { fr: 'Réunions', en: 'Meetings' },
    administration: { fr: 'Assistanat', en: 'Assistance' },
    finance: { fr: 'Finance', en: 'Finance' },
    rh: { fr: 'RH', en: 'HR' },
    direction: { fr: 'Direction', en: 'Leadership' },
    documents: { fr: 'Documents', en: 'Documents' },
    analyse: { fr: 'Analyse', en: 'Analysis' },
    operations: { fr: 'Opérations', en: 'Operations' },
    produit: { fr: 'Produit', en: 'Product' },
  }
  return labels[key]?.[lang] ?? key
}

const COPY = {
  fr: {
    title: 'Missions',
    subtitle: 'Découvrez les missions prêtes à confier à votre Collaborateur IA. Ou décrivez directement votre besoin ci-dessous.',
    needPlaceholder: 'Décrivez votre mission…',
    talk: 'Dicter la mission',
    stop: 'Arrêter la dictée',
    categories: 'Catégories',
    filters: 'Filtres',
    all: 'Tous',
    reset: 'Réinitialiser',
    sort: 'Trier',
    search: 'Chercher une mission…',
    count: (count: number) => `${count} mission${count > 1 ? 's' : ''}`,
    empty: 'Aucune mission ne correspond à ces critères.',
  },
  en: {
    title: 'Missions',
    subtitle: 'Discover ready-to-assign missions for your AI Collaborator, or describe your need directly below.',
    needPlaceholder: 'Describe your mission…',
    talk: 'Dictate the mission',
    stop: 'Stop dictation',
    categories: 'Categories',
    filters: 'Filters',
    all: 'All',
    reset: 'Reset',
    sort: 'Sort',
    search: 'Search missions…',
    count: (count: number) => `${count} mission${count > 1 ? 's' : ''}`,
    empty: 'No mission matches these criteria.',
  },
} as const

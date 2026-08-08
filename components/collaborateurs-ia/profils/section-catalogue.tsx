'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { STORE_ITEMS, DOMAIN_LABELS, type StoreItem } from '@/lib/store-catalog'
import { ProfilCard } from './profil-card'

const COPY = {
  fr: {
    kicker: 'Profils métier',
    title: 'Choisissez une responsabilité durable.',
    lead: 'Chaque profil peut être adapté à votre entreprise et ajouté à un Collaborateur IA existant lorsque son rôle évolue.',
    search: 'Rechercher un rôle ou une responsabilité',
    all: 'Tous les domaines',
    empty: 'Aucun profil ne correspond à votre recherche.',
  },
  en: {
    kicker: 'Job profiles',
    title: 'Choose a durable responsibility.',
    lead: 'Each profile can be adapted to your company and added to an existing AI Collaborator when its role evolves.',
    search: 'Search a role or responsibility',
    all: 'All domains',
    empty: 'No profile matches your search.',
  },
} as const

const PROFILS: StoreItem[] = STORE_ITEMS.filter((i) => i.type === 'profil')

export function SectionCatalogue() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [query, setQuery] = useState('')
  const [domain, setDomain] = useState<string>('all')

  // Only domains that actually have a profil, in DOMAIN_LABELS order.
  const domains = useMemo(() => {
    const present = new Set(PROFILS.map((p) => p.facet))
    return Object.keys(DOMAIN_LABELS).filter((k) => present.has(k))
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROFILS.filter((p) => {
      if (domain !== 'all' && p.facet !== domain) return false
      if (!q) return true
      const hay = [p.name[lang], p.description[lang], ...(p.knowHow ?? []).map((k) => k[lang]), ...p.keywords]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, domain, lang])

  return (
    <section id="catalogue" className="border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        {/* Search + domain filter — the only two controls */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="relative w-full max-w-xl">
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A89C88]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              aria-label={t.search}
              className="h-12 w-full rounded-full border border-[#E1D9C9] bg-[#FBF9F3] pl-11 pr-4 text-[15px] text-[#1C1A17] placeholder:text-[#A89C88] focus:border-[#D10E63]/40 focus:outline-none focus:ring-2 focus:ring-[#D10E63]/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip label={t.all} active={domain === 'all'} onClick={() => setDomain('all')} />
            {domains.map((d) => (
              <FilterChip key={d} label={DOMAIN_LABELS[d][lang]} active={domain === d} onClick={() => setDomain(d)} />
            ))}
          </div>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <ProfilCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-[15px] text-[#6B6459]">{t.empty}</p>
        )}
      </div>
    </section>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] ${
        active
          ? 'border-[#1C1A17] bg-[#1C1A17] text-[#FBF9F3]'
          : 'border-[#E1D9C9] bg-[#FBF9F3] text-[#6B6459] hover:border-[#C7BDAC] hover:text-[#1C1A17]'
      }`}
    >
      {label}
    </button>
  )
}

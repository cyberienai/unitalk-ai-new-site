'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ACME_MEMBERS, getAcmeMember, type AcmeMember } from '@/lib/acme-demo'
import { Breadcrumb, InternalBanner, Monogram } from '@/components/acme/acme-shared'

type Filter = 'all' | 'human' | 'ai'

export function AcmeDirectory() {
  const { lang } = useLanguage()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const t = useT({
    fr: {
      home: 'Acme',
      directory: 'Annuaire',
      back: "← Retour au profil d'Emma",
      title: 'Annuaire Acme',
      subtitle: 'Membres de l’équipe et leurs Collaborateurs IA',
      profiles: 'profils',
      results: 'résultats',
      searchPlaceholder: 'Rechercher un nom, un rôle, un département...',
      all: 'Tous',
      human: 'Équipe',
      ai: 'Collaborateurs IA',
      teamTag: 'ÉQUIPE',
      aiTag: 'COLLABORATEUR IA',
      linkedF: 'rattachée à',
      linkedM: 'rattaché à',
      empty: 'Aucun profil ne correspond à votre recherche.',
    },
    en: {
      home: 'Acme',
      directory: 'Directory',
      back: "← Back to Emma's profile",
      title: 'Acme Directory',
      subtitle: 'Team members and their AI Collaborators',
      profiles: 'profiles',
      results: 'results',
      searchPlaceholder: 'Search a name, role, department...',
      all: 'All',
      human: 'Team',
      ai: 'AI Collaborators',
      teamTag: 'TEAM',
      aiTag: 'AI COLLABORATOR',
      linkedF: 'reports to',
      linkedM: 'reports to',
      empty: 'No profile matches your search.',
    },
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ACME_MEMBERS.filter((m) => {
      if (filter !== 'all' && m.kind !== filter) return false
      if (!q) return true
      const haystack = [m.name, m.role[lang], m.department[lang]].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [query, filter, lang])

  const secondary = (m: AcmeMember): string => {
    if (m.kind === 'human') return `${m.role[lang]} — ${m.department[lang]}`
    const boss = m.linkedTo ? getAcmeMember(m.linkedTo) : undefined
    const verb = t.linkedF
    return boss ? `${m.role[lang]} — ${verb} ${boss.name}` : m.role[lang]
  }

  const filters: Filter[] = ['all', 'human', 'ai']
  const filterLabel: Record<Filter, string> = { all: t.all, human: t.human, ai: t.ai }

  return (
    <main className="w-full bg-[#FBF9F3]">
      <InternalBanner />
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-[#E4DDCE] py-6">
          <Breadcrumb items={[{ label: t.home, href: '/team/annuaire' }, { label: t.directory }]} />
          <a href="/team/emma/profil" className="font-mono text-sm text-[#857C6E] transition-colors hover:text-[#D10E63]">
            {t.back}
          </a>
        </div>

        <header className="pt-14">
          <h1 className="font-serif text-4xl font-semibold tracking-[-0.02em] text-[#1C1A17] md:text-5xl">{t.title}</h1>
          <p className="mt-3 text-lg text-[#6B6560]">
            {t.subtitle} — {ACME_MEMBERS.length} {t.profiles}
          </p>
        </header>

        <div className="mt-8">
          <label className="relative block">
            <span className="sr-only">{t.searchPlaceholder}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A09789]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="min-h-14 w-full rounded-2xl border border-[#E4DDCE] bg-[#F8F5EC] pl-12 pr-4 text-base text-[#1C1A17] placeholder:text-[#A09789] focus:border-[#D10E63] focus:outline-none focus:ring-2 focus:ring-[#D10E63]/20"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`min-h-9 rounded-full px-4 text-sm font-semibold transition-colors ${
                  filter === f
                    ? 'bg-[#1C1A17] text-[#FBF9F3]'
                    : 'border border-[#E4DDCE] bg-[#FBF9F3] text-[#4E483F] hover:border-[#1C1A17]/40'
                }`}
              >
                {filterLabel[f]}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-sm text-[#857C6E]">
          {filtered.length} {t.results}
        </p>

        <ul className="mt-2 pb-20">
          {filtered.map((m) => {
            const linkedAi = m.kind === 'human' && m.linkedTo ? getAcmeMember(m.linkedTo) : undefined
            const href = m.kind === 'ai' && m.slug ? `/team/${m.slug}/profil` : undefined
            const RowTag = href ? 'a' : 'div'
            return (
              <li key={m.id} className="border-b border-[#E4DDCE]">
                <RowTag
                  {...(href ? { href } : {})}
                  className={`flex items-center gap-4 py-5 ${href ? 'group cursor-pointer' : ''}`}
                >
                  <Monogram name={m.name} color={m.color} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{m.name}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] ${
                          m.kind === 'ai' ? 'bg-[#DCEAE2] text-[#2F5D50]' : 'bg-[#EAE3D4] text-[#6B6560]'
                        }`}
                      >
                        {m.kind === 'ai' ? t.aiTag : t.teamTag}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[#857C6E]">{secondary(m)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {linkedAi && <Monogram name={linkedAi.name} color={linkedAi.color} size="sm" />}
                    {href && (
                      <ArrowRight className="h-4 w-4 text-[#A09789] transition-transform group-hover:translate-x-0.5 group-hover:text-[#D10E63]" />
                    )}
                  </div>
                </RowTag>
              </li>
            )
          })}
          {filtered.length === 0 && <li className="py-10 text-center text-[#857C6E]">{t.empty}</li>}
        </ul>
      </div>
    </main>
  )
}

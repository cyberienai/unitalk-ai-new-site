'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Plus, Search, Sparkles, Star } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { DEPARTMENTS, ROLE_DETAILS, type CatalogRole } from '@/lib/collaborators-catalog'
import { useMyTeam } from '@/lib/my-team-context'

// Lightweight presentation data for featured (detailed) profiles.
const FEATURED_META: Record<string, { rating: number; reviews: number }> = {
  emma: { rating: 4.9, reviews: 128 },
  alex: { rating: 4.8, reviews: 94 },
  marcus: { rating: 4.7, reviews: 76 },
  sophia: { rating: 4.9, reviews: 152 },
}

// Business-domain quick filters. Each maps to a search term that matches roles.
const DOMAINS: { label: { fr: string; en: string }; term: string }[] = [
  { label: { fr: 'E-commerce', en: 'E-commerce' }, term: 'vente' },
  { label: { fr: 'Agence', en: 'Agency' }, term: 'marketing' },
  { label: { fr: 'SaaS', en: 'SaaS' }, term: 'support' },
  { label: { fr: 'Cabinet', en: 'Firm' }, term: 'direction' },
  { label: { fr: 'Startup', en: 'Startup' }, term: 'dev' },
]

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function TeamDirectory() {
  const { lang } = useLanguage()
  const [dept, setDept] = useState<string>('all')
  const [query, setQuery] = useState('')

  const t = useT({
    fr: {
      eyebrow: 'L’équipe Unitalk',
      title: 'Voici les Collaborateurs IA qui font tourner Unitalk.',
      subtitle: 'Ils travaillent déjà chez nous, chaque jour. Explorez leur profil public — et ajoutez-les à votre propre équipe.',
      searchPlaceholder: 'Rechercher par métier ou par domaine d’entreprise…',
      all: 'Tous les métiers',
      departments: 'Départements',
      domains: 'Domaines',
      available: 'Disponible',
      soon: 'Bientôt',
      viewProfile: 'Voir le profil',
      add: 'Ajouter',
      added: 'Ajouté',
      results: 'résultat',
      resultsPlural: 'résultats',
      empty: 'Aucun Collaborateur ne correspond à votre recherche.',
    },
    en: {
      eyebrow: 'The Unitalk team',
      title: 'Meet the AI Collaborators who run Unitalk.',
      subtitle: 'They already work here, every day. Explore their public profile — and add them to your own team.',
      searchPlaceholder: 'Search by role or by business domain…',
      all: 'All roles',
      departments: 'Departments',
      domains: 'Domains',
      available: 'Available',
      soon: 'Soon',
      viewProfile: 'View profile',
      add: 'Add',
      added: 'Added',
      results: 'result',
      resultsPlural: 'results',
      empty: 'No Collaborator matches your search.',
    },
  })

  // Flatten roles with their department label for filtering + display.
  const allRoles = useMemo(
    () =>
      DEPARTMENTS.flatMap((d) =>
        d.roles.map((role) => ({ role, deptKey: d.key, deptLabel: d.label })),
      ),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allRoles.filter(({ role, deptKey, deptLabel }) => {
      if (dept !== 'all' && deptKey !== dept) return false
      if (!q) return true
      const haystack = [
        role.name,
        role.title.fr,
        role.title.en,
        deptLabel.fr,
        deptLabel.en,
        deptKey,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [allRoles, dept, query])

  const count = filtered.length

  return (
    <main className="w-full bg-[#F3EFE6]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Product header — no marketing hero */}
        <header className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D10E63]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
            {t.eyebrow}
          </p>
          <h1 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-[#4E483F]">{t.subtitle}</p>
        </header>

        {/* Search */}
        <div className="mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#857C6E]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full rounded-full border border-[#DDD5CA] bg-[#FBF9F3] py-3.5 pl-12 pr-4 text-[#1C1A17] outline-none transition-colors placeholder:text-[#857C6E] focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20"
            />
          </div>
          {/* Domain quick filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.domains}</span>
            {DOMAINS.map((d) => (
              <button
                key={d.term}
                type="button"
                onClick={() => setQuery(d.label[lang])}
                className="rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-3.5 py-1.5 text-sm font-medium text-[#4E483F] transition-colors hover:border-[#D10E63] hover:text-[#D10E63]"
              >
                {d.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{t.departments}</p>
            <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
              <SidebarButton active={dept === 'all'} onClick={() => setDept('all')} label={t.all} />
              {DEPARTMENTS.map((d) => (
                <SidebarButton
                  key={d.key}
                  active={dept === d.key}
                  onClick={() => setDept(d.key)}
                  label={d.label[lang]}
                  count={d.roles.length}
                />
              ))}
            </nav>
          </aside>

          {/* Grid */}
          <section aria-label={t.departments}>
            <p className="mb-5 text-sm text-[#857C6E]">
              {count} {count > 1 ? t.resultsPlural : t.results}
            </p>

            {count === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#DDD5CA] bg-[#FBF9F3] p-12 text-center text-[#6B6560]">
                {t.empty}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map(({ role, deptLabel }, index) => (
                  <RoleCard
                    key={`${role.name}-${index}`}
                    role={role}
                    deptLabel={deptLabel[lang]}
                    lang={lang}
                    labels={{ available: t.available, soon: t.soon, viewProfile: t.viewProfile, add: t.add, added: t.added }}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

function SidebarButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-2 rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded-xl ${
        active
          ? 'bg-[#1C1A17] text-[#FBF9F3]'
          : 'bg-[#FBF9F3] text-[#4E483F] hover:bg-[#EAE3D4]'
      }`}
    >
      <span>{label}</span>
      {typeof count === 'number' && (
        <span className={`text-xs ${active ? 'text-[#FBF9F3]/60' : 'text-[#857C6E]'}`}>{count}</span>
      )}
    </button>
  )
}

function RoleCard({
  role,
  deptLabel,
  lang,
  labels,
  index,
}: {
  role: CatalogRole
  deptLabel: string
  lang: 'fr' | 'en'
  labels: { available: string; soon: string; viewProfile: string; add: string; added: string }
  index: number
}) {
  const detail = role.slug ? ROLE_DETAILS[role.slug] : undefined
  const meta = role.slug ? FEATURED_META[role.slug] : undefined
  const { has, toggle } = useMyTeam()
  const inTeam = detail ? has(detail.slug) : false

  const body = (
    <>
      <div className="flex items-start gap-3">
        {detail ? (
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/20">
            <Image src={detail.avatar || '/placeholder.svg'} alt={role.name} fill className="object-cover" sizes="48px" />
          </span>
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAE3D4] font-sf text-sm font-bold text-[#857C6E]">
            {initials(role.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-sf text-lg font-bold text-[#1C1A17]">{role.name}</h3>
            {role.slug ? (
              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#D10E63]" />
            ) : (
              <span className="shrink-0 rounded-full bg-[#EAE3D4] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#857C6E]">
                {labels.soon}
              </span>
            )}
          </div>
          <p className="truncate text-sm text-[#6B6560]">{role.title[lang]}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-[#EAE3D4] px-2.5 py-1 text-[11px] font-medium text-[#4E483F]">{deptLabel}</span>
        {meta ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#1C1A17]">
            <Star className="h-3.5 w-3.5 fill-[#D10E63] text-[#D10E63]" />
            {meta.rating.toFixed(1)}
            <span className="font-normal text-[#857C6E]">({meta.reviews})</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-[#857C6E]">
            <Sparkles className="h-3.5 w-3.5" />
            {labels.soon}
          </span>
        )}
      </div>
    </>
  )

  const cardClass = 'flex h-full flex-col rounded-2xl border bg-[#FBF9F3] p-5 transition-all'

  if (role.slug && detail) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
        className={`${cardClass} border-[#D10E63]/25 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(209,14,99,0.14)]`}
      >
        <Link href={`/@${role.slug}`} className="group flex flex-1 flex-col">
          {body}
          <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#D10E63]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {labels.available} · {labels.viewProfile}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => toggle({ slug: detail.slug, name: detail.name, role: detail.role[lang], avatar: detail.avatar })}
          aria-pressed={inTeam}
          className={`mt-4 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full text-sm font-bold transition-colors ${
            inTeam
              ? 'bg-[#1C1A17] text-[#FBF9F3]'
              : 'border border-[#D10E63]/40 text-[#D10E63] hover:bg-[#D10E63]/[0.06]'
          }`}
        >
          {inTeam ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {inTeam ? labels.added : labels.add}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04 }}
      className={`${cardClass} border-[#DDD5CA]`}
    >
      {body}
    </motion.div>
  )
}

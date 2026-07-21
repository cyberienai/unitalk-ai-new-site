'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, MessageCircle, Plus, Search, UserRound } from 'lucide-react'
import { useLanguage, useT } from '@/lib/language-context'
import { ROLE_DETAILS, TEAM_HUMANS, TEAM_PAIRS, type Human, type RoleDetail } from '@/lib/collaborators-catalog'
import { useMyTeam } from '@/lib/my-team-context'

type FilterKey = 'all' | 'team' | 'ai'

export function TeamDirectory() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')

  const t = useT({
    fr: {
      eyebrow: 'Unitalk / Notre équipe',
      title: 'Notre équipe augmentée',
      subtitle:
        'Chez Unitalk, nous utilisons nos propres Collaborateurs IA au quotidien. Voici notre équipe — des humains et leurs partenaires IA qui travaillent ensemble.',
      searchPlaceholder: 'Rechercher un nom, un rôle, un département…',
      all: 'Tous',
      team: 'Équipe',
      ai: 'Collaborateurs IA',
      team_tag: 'Équipe',
      ai_tag: 'Collaborateur IA',
      results: 'résultat',
      resultsPlural: 'résultats',
      profiles: 'profils',
      empty: 'Aucun membre ne correspond à votre recherche.',
      profile: 'Profil',
      add: 'Ajouter',
      added: 'Ajouté',
      reportsToF: 'rattachée à',
      reportsToM: 'rattaché à',
      pairedWith: 'en binôme avec',
      bannerTitle: 'Nous utilisons ce que nous construisons.',
      bannerBody:
        "Chaque Collaborateur IA chez Unitalk travaille au quotidien avec son binôme humain. C'est notre façon de prouver que ça marche — parce que nous ne vendons rien que nous n'utilisons pas nous-mêmes.",
      bannerAlma: 'Parlez à Alma — elle vous présentera chaque membre de l’équipe.',
    },
    en: {
      eyebrow: 'Unitalk / Our team',
      title: 'Our augmented team',
      subtitle:
        'At Unitalk, we use our own AI Collaborators every day. This is our team — humans and their AI partners working together.',
      searchPlaceholder: 'Search a name, a role, a department…',
      all: 'All',
      team: 'Team',
      ai: 'AI Collaborators',
      team_tag: 'Team',
      ai_tag: 'AI Collaborator',
      results: 'result',
      resultsPlural: 'results',
      profiles: 'profiles',
      empty: 'No member matches your search.',
      profile: 'Profile',
      add: 'Add',
      added: 'Added',
      reportsToF: 'reporting to',
      reportsToM: 'reporting to',
      pairedWith: 'paired with',
      bannerTitle: 'We use what we build.',
      bannerBody:
        "Every AI Collaborator at Unitalk works daily with its human partner. It's how we prove it works — because we don't sell anything we don't use ourselves.",
      bannerAlma: 'Talk to Alma — she will introduce you to every team member.',
    },
  })

  const q = query.trim().toLowerCase()

  const matchesHuman = (h: Human) =>
    !q ||
    [h.name, h.role.fr, h.role.en, h.department.fr, h.department.en].join(' ').toLowerCase().includes(q)
  const matchesAi = (r: RoleDetail) =>
    !q ||
    [r.name, r.role.fr, r.role.en, r.department.fr, r.department.en, r.manager.name]
      .join(' ')
      .toLowerCase()
      .includes(q)

  const pairs = useMemo(
    () =>
      TEAM_PAIRS.map(({ humanHandle, aiSlug }) => ({
        human: TEAM_HUMANS[humanHandle],
        ai: ROLE_DETAILS[aiSlug],
      })),
    [],
  )

  const visiblePairs = pairs.filter(({ human, ai }) => {
    const humanOk = filter !== 'ai' && matchesHuman(human)
    const aiOk = filter !== 'team' && matchesAi(ai)
    return humanOk || aiOk
  })

  // Count of visible cards for the results line
  const count = visiblePairs.reduce((acc, { human, ai }) => {
    let n = 0
    if (filter !== 'ai' && matchesHuman(human)) n += 1
    if (filter !== 'team' && matchesAi(ai)) n += 1
    return acc + n
  }, 0)

  const totalProfiles = pairs.length * 2

  return (
    <main className="w-full bg-[#F3EFE6]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Product header */}
        <header className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#857C6E]">{t.eyebrow}</p>
          <h1 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-[#4E483F]">{t.subtitle}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">
            {totalProfiles} {t.profiles}
          </p>
        </header>

        {/* Search + segmented filter */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
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
          <div className="inline-flex rounded-full border border-[#DDD5CA] bg-[#FBF9F3] p-1">
            {([
              { key: 'all' as const, label: t.all },
              { key: 'team' as const, label: t.team },
              { key: 'ai' as const, label: t.ai },
            ]).map((seg) => (
              <button
                key={seg.key}
                type="button"
                onClick={() => setFilter(seg.key)}
                aria-pressed={filter === seg.key}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === seg.key ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#4E483F] hover:text-[#1C1A17]'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-[#857C6E]">
          {count} {count > 1 ? t.resultsPlural : t.results}
        </p>

        {/* Pairs grid */}
        {count === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#DDD5CA] bg-[#FBF9F3] p-12 text-center text-[#6B6560]">
            {t.empty}
          </div>
        ) : (
          <div className="mt-6 grid gap-5">
            {visiblePairs.map(({ human, ai }, index) => (
              <PairRow
                key={human.handle}
                human={filter !== 'ai' && matchesHuman(human) ? human : undefined}
                ai={filter !== 'team' && matchesAi(ai) ? ai : undefined}
                lang={lang}
                labels={t}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Banner: we use what we build */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-[#1C1A17] bg-[#1C1A17] p-8 text-[#FBF9F3] sm:p-12">
          <h2 className="text-balance font-sf text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{t.bannerTitle}</h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-[#D8D0C2]">{t.bannerBody}</p>
          <Link
            href="/alma"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#A80B50]"
          >
            <MessageCircle className="h-4 w-4" />
            {t.bannerAlma}
          </Link>
        </section>
      </div>
    </main>
  )
}

function PairRow({
  human,
  ai,
  lang,
  labels,
  index,
}: {
  human?: Human
  ai?: RoleDetail
  lang: 'fr' | 'en'
  labels: Record<string, string>
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
      className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]"
    >
      {human ? <HumanCard human={human} lang={lang} labels={labels} /> : <span className="hidden md:block" />}

      {human && ai ? (
        <div className="hidden items-center justify-center md:flex" aria-hidden="true">
          <div className="flex flex-col items-center gap-1 text-[#857C6E]">
            <span className="h-6 w-px bg-[#D10E63]/30" />
            <span className="h-2 w-2 rounded-full bg-[#D10E63]" />
            <span className="h-6 w-px bg-[#D10E63]/30" />
          </div>
        </div>
      ) : (
        <span className="hidden md:block" />
      )}

      {ai ? <AiCard ai={ai} lang={lang} labels={labels} /> : <span className="hidden md:block" />}
    </motion.div>
  )
}

function HumanCard({ human, lang, labels }: { human: Human; lang: 'fr' | 'en'; labels: Record<string, string> }) {
  return (
    <Link
      href={`/@${human.handle}`}
      className="group flex items-center gap-4 rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-5 transition-all hover:-translate-y-0.5 hover:border-[#1C1A17]/40 hover:shadow-[0_16px_40px_rgba(28,26,23,0.08)]"
    >
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/10">
        <Image src={human.avatar || '/placeholder.svg'} alt={human.name} fill className="object-cover" sizes="56px" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#857C6E]">{labels.team_tag}</p>
        <h3 className="mt-0.5 truncate font-sf text-lg font-bold text-[#1C1A17]">{human.name}</h3>
        <p className="truncate text-sm text-[#6B6560]">
          {human.role[lang]} <span className="text-[#A09789]">· {human.department[lang]}</span>
        </p>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-[#857C6E] transition-colors group-hover:text-[#1C1A17]" />
    </Link>
  )
}

function AiCard({ ai, lang, labels }: { ai: RoleDetail; lang: 'fr' | 'en'; labels: Record<string, string> }) {
  const { has, toggle } = useMyTeam()
  const inTeam = has(ai.slug)
  const isFemale = ['emma', 'lea', 'ines'].includes(ai.slug)
  const reportsTo = lang === 'fr' ? (isFemale ? labels.reportsToF : labels.reportsToM) : labels.reportsToF

  return (
    <div className="flex flex-col rounded-2xl border border-[#D10E63]/25 bg-[#FBF9F3] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(209,14,99,0.14)]">
      <div className="flex items-start gap-4">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#D10E63]/20">
          <Image src={ai.avatar || '/placeholder.svg'} alt={ai.name} fill className="object-cover" sizes="56px" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#FBF9F3] bg-emerald-500" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">{labels.ai_tag}</p>
          <h3 className="mt-0.5 truncate font-sf text-lg font-bold text-[#1C1A17]">{ai.name}</h3>
          <p className="truncate text-sm text-[#6B6560]">
            {ai.role[lang]} <span className="text-[#A09789]">· {reportsTo} {ai.manager.name}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/@${ai.slug}`}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
        >
          <UserRound className="h-4 w-4" />
          {labels.profile}
        </Link>
        <button
          type="button"
          onClick={() => toggle({ slug: ai.slug, name: ai.name, role: ai.role[lang], avatar: ai.avatar })}
          aria-pressed={inTeam}
          className={`inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-bold transition-colors ${
            inTeam ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'border border-[#D10E63]/40 text-[#D10E63] hover:bg-[#D10E63]/[0.06]'
          }`}
        >
          {inTeam ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {inTeam ? labels.added : labels.add}
        </button>
      </div>
    </div>
  )
}

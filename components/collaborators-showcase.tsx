'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, MessageCircle } from 'lucide-react'
import { useT, type Lang } from '@/lib/language-context'
import { ROLE_DETAILS, collaboratorHref } from '@/lib/collaborators-catalog'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const
const PAGE_SIZE = 3

type ShowcaseEntry = {
  slug: string
  role: { fr: string; en: string }
  segments: { fr: string; en: string }
  defaultProfile: { fr: string; en: string }
  skills: { fr: string; en: string }
  pitch: { fr: string; en: string }
}

// Les six Collaborateurs IA de l'illustration, en cartes statiques (fiables au chargement).
const SHOWCASE: ShowcaseEntry[] = [
  {
    slug: 'emma',
    role: { fr: 'Collaboratrice IA', en: 'AI Collaborator' },
    segments: { fr: 'PME • Startups • Indépendants', en: 'SMBs • Startups • Freelancers' },
    defaultProfile: { fr: 'Assistanat de direction', en: 'Executive assistant' },
    skills: { fr: 'Agenda · Réunions · Reporting', en: 'Calendar · Meetings · Reporting' },
    pitch: {
      fr: 'Gère vos priorités, prépare vos réunions et suit les décisions.',
      en: 'Manages your priorities, prepares your meetings and tracks decisions.',
    },
  },
  {
    slug: 'lea',
    role: { fr: 'Collaboratrice IA', en: 'AI Collaborator' },
    segments: { fr: 'PME • Startups • Agences', en: 'SMBs • Startups • Agencies' },
    defaultProfile: { fr: 'Stratégie de contenu', en: 'Content strategist' },
    skills: { fr: 'Contenus · Réseaux sociaux · SEO', en: 'Content · Social · SEO' },
    pitch: {
      fr: 'Rédige vos contenus, planifie vos publications et travaille votre référencement.',
      en: 'Writes your content, schedules your posts and improves your search ranking.',
    },
  },
  {
    slug: 'arthur',
    role: { fr: 'Collaborateur IA', en: 'AI Collaborator' },
    segments: { fr: 'Startups • SaaS • Studios', en: 'Startups • SaaS • Studios' },
    defaultProfile: { fr: 'Développement', en: 'Developer' },
    skills: { fr: 'Code · Intégrations · Data', en: 'Code · Integrations · Data' },
    pitch: {
      fr: 'Écrit votre code, connecte vos outils et exploite vos données.',
      en: 'Writes your code, connects your tools and leverages your data.',
    },
  },
  {
    slug: 'hugo',
    role: { fr: 'Collaborateur IA', en: 'AI Collaborator' },
    segments: { fr: 'PME • Startups • ETI', en: 'SMBs • Startups • Mid-market' },
    defaultProfile: { fr: 'Développement commercial', en: 'Sales development' },
    skills: { fr: 'Prospection · CRM · Relances', en: 'Prospecting · CRM · Follow-ups' },
    pitch: {
      fr: 'Identifie vos prospects, qualifie les contacts et prépare vos relances.',
      en: 'Identifies your prospects, qualifies contacts and prepares your follow-ups.',
    },
  },
  {
    slug: 'nadia',
    role: { fr: 'Collaboratrice IA', en: 'AI Collaborator' },
    segments: { fr: 'PME • Startups • ETI', en: 'SMBs • Startups • Mid-market' },
    defaultProfile: { fr: 'Analyse financière', en: 'Financial analyst' },
    skills: { fr: 'Trésorerie · Facturation · Reporting', en: 'Cash flow · Billing · Reporting' },
    pitch: {
      fr: 'Suit votre trésorerie, prépare vos factures et analyse vos résultats.',
      en: 'Tracks your cash flow, prepares your invoices and analyzes your results.',
    },
  },
  {
    slug: 'ines',
    role: { fr: 'Collaboratrice IA', en: 'AI Collaborator' },
    segments: { fr: 'E-commerce • SaaS • PME', en: 'E-commerce • SaaS • SMBs' },
    defaultProfile: { fr: 'Support client', en: 'Customer support' },
    skills: { fr: 'Demandes · Réponses · Suivi', en: 'Requests · Replies · Follow-up' },
    pitch: {
      fr: 'Répond à vos clients, traite les demandes courantes et escalade ce qui compte.',
      en: 'Answers your customers, handles routine requests and escalates what matters.',
    },
  },
]

function CollaboratorCard({
  entry,
  lang,
  labels,
}: {
  entry: ShowcaseEntry
  lang: Lang
  labels: {
    available: string
    defaultProfileLabel: string
    talk: string
    profiles: string
  }
}) {
  const ai = ROLE_DETAILS[entry.slug]
  if (!ai) return null
  const skillChips = entry.skills[lang].split('·').map((s) => s.trim()).filter(Boolean)

  return (
    <article
      id={`collab-${entry.slug}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_24px_60px_rgba(28,26,23,0.10)]"
    >
      {/* Accent bar revealed on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#D10E63] transition-transform duration-300 group-hover:scale-x-100"
      />

      {/* Header: avatar + availability */}
      <div className="flex items-start justify-between">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08]">
          <Image
            src={ai.avatar || '/placeholder.svg'}
            alt={ai.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="64px"
          />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF9F3] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4E7C59]">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {labels.available}
        </span>
      </div>

      {/* Identity */}
      <div className="mt-5">
        <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{ai.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-[#D10E63]">{entry.role[lang]}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#6B6560]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#A09789]" aria-hidden="true" />
          {entry.segments[lang]}
        </p>
      </div>

      {/* Default profile + skill chips */}
      <div className="mt-5 rounded-2xl border border-[#E4DCCF] bg-[#FBF9F3] p-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
          {labels.defaultProfileLabel}
        </p>
        <p className="mt-1 text-[15px] font-bold text-[#1C1A17]">{entry.defaultProfile[lang]}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skillChips.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#E4DCCF] bg-[#F3EFE6] px-2.5 py-1 text-[11px] font-semibold text-[#4E483F]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#4E483F]">{entry.pitch[lang]}</p>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2">
        <Link
          href={collaboratorHref(entry.slug)}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-4 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{`${labels.talk} ${ai.name}`}</span>
        </Link>
        <Link
          href={collaboratorHref(entry.slug)}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] px-4 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
        >
          {labels.profiles}
        </Link>
      </div>
    </article>
  )
}

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = useT({
    fr: {
      eyebrow: 'Par expertise',
      title: 'Découvrez les Collaborateurs IA de votre organisation.',
      subtitle:
        'Choisissez le Collaborateur IA qui rejoindra votre équipe, selon l’expertise dont vous avez besoin. Alma personnalise ensuite ses profils, ses connaissances et ses missions.',
      available: 'Disponible',
      defaultProfileLabel: 'Profil par défaut',
      talk: 'Recruter',
      profiles: 'Voir ses profils',
      allCta: 'Voir tous les Collaborateurs IA',
      prevPage: 'Collaborateurs précédents',
      nextPage: 'Collaborateurs suivants',
      goToPage: 'Voir le groupe de Collaborateurs IA',
    },
    en: {
      eyebrow: 'By expertise',
      title: 'Meet the AI Collaborators of your organization.',
      subtitle:
        'Choose the AI Collaborator that will join your team, based on the expertise you need. Alma then personalizes its profiles, knowledge, and missions.',
      available: 'Available',
      defaultProfileLabel: 'Default profile',
      talk: 'Hire',
      profiles: 'See its profiles',
      allCta: 'See all AI Collaborators',
      prevPage: 'Previous collaborators',
      nextPage: 'Next collaborators',
      goToPage: 'Go to AI Collaborator group',
    },
  })

  const reduceMotion = useReducedMotion()
  const totalPages = Math.ceil(SHOWCASE.length / PAGE_SIZE)
  const [page, setPage] = useState(0)
  const goTo = (p: number) => setPage(((p % totalPages) + totalPages) % totalPages)
  const nextPage = () => setPage((cur) => (cur + 1) % totalPages)
  const prevPage = () => setPage((cur) => (cur - 1 + totalPages) % totalPages)
  const pageEntries = SHOWCASE.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const labels = {
    available: t.available,
    defaultProfileLabel: t.defaultProfileLabel,
    talk: t.talk,
    profiles: t.profiles,
  }

  return (
    <section className="w-full border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </header>

        {/* Paginated carousel (arrows + dots), like the missions section */}
        <div className="mt-14 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pageEntries.map((entry) => (
                <CollaboratorCard key={entry.slug} entry={entry} lang={lang} labels={labels} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevPage}
              aria-label={t.prevPage}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#F3EFE6] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t.goToPage} ${i + 1}`}
                  aria-current={i === page ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3] ${
                    i === page ? 'w-6 bg-[#D10E63]' : 'w-2 bg-[#C9BFAF] hover:bg-[#D10E63]/60'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextPage}
              aria-label={t.nextPage}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8D0C2] bg-[#F3EFE6] text-[#3F3A33] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* All CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/collaborateurs-ia/roles"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DDD5CA] bg-[#FBF9F3] px-6 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
          >
            {t.allCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, MessageCircle, Layers } from 'lucide-react'
import { useT, type Lang } from '@/lib/language-context'
import { ROLE_DETAILS, collaboratorHref } from '@/lib/collaborators-catalog'

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

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = useT({
    fr: {
      eyebrow: 'Les Collaborateurs IA',
      title: 'Choisissez celui qui rejoindra votre organisation.',
      subtitle:
        'Chaque Collaborateur IA commence avec un profil métier. Ajoutez-lui ensuite les savoir-faire nécessaires à ses nouvelles missions.',
      available: 'Disponible',
      defaultProfileLabel: 'Profil par défaut',
      talk: 'Parler avec',
      profiles: 'Voir ses profils',
      tagline: 'Une identité. Plusieurs profils métier.',
      allCta: 'Voir tous les Collaborateurs IA',
    },
    en: {
      eyebrow: 'The AI Collaborators',
      title: 'Choose the one that will join your organization.',
      subtitle:
        'Every AI Collaborator starts with a job profile. Then add the skills its new missions require.',
      available: 'Available',
      defaultProfileLabel: 'Default profile',
      talk: 'Talk with',
      profiles: 'See its profiles',
      tagline: 'One identity. Several job profiles.',
      allCta: 'See all AI Collaborators',
    },
  })

  return (
    <section className="w-full bg-[#FBF9F3] py-20 sm:py-28">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </header>

        {/* Three static cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE.map((entry) => {
            const ai = ROLE_DETAILS[entry.slug]
            if (!ai) return null
            return (
              <article
                key={entry.slug}
                id={`collab-${entry.slug}`}
                className="group flex scroll-mt-28 flex-col rounded-3xl border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_24px_60px_rgba(28,26,23,0.10)] target:border-[#D10E63] target:ring-2 target:ring-[#D10E63]/60 target:ring-offset-2 target:ring-offset-[#FBF9F3]"
              >
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
                    {t.available}
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

                {/* Default profile */}
                <div className="mt-5 rounded-2xl border border-[#E4DCCF] bg-[#FBF9F3] p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8175]">
                    {t.defaultProfileLabel}
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-[#1C1A17]">{entry.defaultProfile[lang]}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#4E483F]">
                    <Layers className="h-3.5 w-3.5 shrink-0 text-[#A09789]" aria-hidden="true" />
                    {entry.skills[lang]}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#4E483F]">{entry.pitch[lang]}</p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href={collaboratorHref(entry.slug)}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#D10E63] px-4 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span className="truncate">{`${t.talk} ${ai.name}`}</span>
                  </Link>
                  <Link
                    href={collaboratorHref(entry.slug)}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] px-4 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
                  >
                    {t.profiles}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Tagline + all CTA */}
        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-2xl">{t.tagline}</p>
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

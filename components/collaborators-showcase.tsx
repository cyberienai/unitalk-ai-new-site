'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Check, MapPin, MessageCircle, Star } from 'lucide-react'
import { useT, type Lang } from '@/lib/language-context'
import { ROLE_DETAILS, collaboratorHref, type Bilingual } from '@/lib/collaborators-catalog'
import { useMyTeam } from '@/lib/my-team-context'

// Ordre d'affichage du catalogue + fiche courte par Collaborateur IA
const SHOWCASE: { slug: string; role: Bilingual; segments: Bilingual; pitch: Bilingual }[] = [
  {
    slug: 'emma',
    role: { fr: 'Assistante de direction IA', en: 'AI Executive Assistant' },
    segments: { fr: 'PME • Startups • Indépendants', en: 'SMBs • Startups • Freelancers' },
    pitch: {
      fr: 'Gère votre agenda, prépare vos réunions et filtre vos emails prioritaires.',
      en: 'Manages your calendar, prepares your meetings and filters your priority emails.',
    },
  },
  {
    slug: 'hugo',
    role: { fr: 'Commercial IA', en: 'AI Sales Rep' },
    segments: { fr: 'PME • Startups • ETI', en: 'SMBs • Startups • Mid-market' },
    pitch: {
      fr: 'Qualifie vos prospects, relance vos opportunités et prépare vos propositions commerciales.',
      en: 'Qualifies your leads, follows up on opportunities and prepares your sales proposals.',
    },
  },
  {
    slug: 'ines',
    role: { fr: 'Support client IA', en: 'AI Customer Support' },
    segments: { fr: 'E-commerce • SaaS • PME', en: 'E-commerce • SaaS • SMBs' },
    pitch: {
      fr: 'Répond à vos clients, traite les demandes courantes et escalade ce qui compte.',
      en: 'Answers your customers, handles routine requests and escalates what matters.',
    },
  },
  {
    slug: 'lea',
    role: { fr: 'Créatrice de contenu IA', en: 'AI Content Strategist' },
    segments: { fr: 'Startups • Agences • PME', en: 'Startups • Agencies • SMBs' },
    pitch: {
      fr: 'Planifie votre calendrier éditorial, rédige vos contenus et publie sur vos canaux.',
      en: 'Plans your content calendar, writes your content and publishes on your channels.',
    },
  },
  {
    slug: 'arthur',
    role: { fr: 'Développeur IA', en: 'AI Developer' },
    segments: { fr: 'SaaS • Startups • Agences', en: 'SaaS • Startups • Agencies' },
    pitch: {
      fr: 'Corrige vos bugs, développe de nouvelles fonctionnalités et relit votre code.',
      en: 'Fixes your bugs, builds new features and reviews your code.',
    },
  },
  {
    slug: 'nadia',
    role: { fr: 'Analyste financière IA', en: 'AI Financial Analyst' },
    segments: { fr: 'PME • Cabinets • ETI', en: 'SMBs • Firms • Mid-market' },
    pitch: {
      fr: 'Analyse votre trésorerie, prépare vos tableaux de bord et répond à vos questions financières.',
      en: 'Analyzes your cash flow, prepares your dashboards and answers your financial questions.',
    },
  },
]

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = useT({
    fr: {
      eyebrow: 'Les Collaborateurs IA',
      title: 'Trouvez le Collaborateur IA qu’il vous faut.',
      subtitle:
        'Explorez des centaines de Collaborateurs IA spécialisés par métier, secteur d’activité, mission et expertise. Parlez avec eux, testez-les et recrutez celui qui correspond à votre entreprise.',
      available: 'Disponible',
      profile: 'Voir le profil',
      add: 'Ajouter à mon équipe',
      added: 'Ajouté à mon équipe',
      talk: 'Parler avec',
      recruit: 'Recruter',
      recruited: 'Recruté',
      rating: '5,0',
      allCta: 'Voir tous les Collaborateurs IA',
      prev: 'Précédent',
      next: 'Suivant',
    },
    en: {
      eyebrow: 'The AI Collaborators',
      title: 'Find the AI Collaborator you need.',
      subtitle:
        'Explore hundreds of AI Collaborators specialized by role, industry, mission and expertise. Talk with them, test them and recruit the one that fits your company.',
      available: 'Available',
      profile: 'View profile',
      add: 'Add to my team',
      added: 'Added to my team',
      talk: 'Talk with',
      recruit: 'Recruit',
      recruited: 'Recruited',
      rating: '5.0',
      allCta: 'See all AI Collaborators',
      prev: 'Previous',
      next: 'Next',
    },
  })

  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-[#FBF9F3] py-20 sm:py-28">
      <div className="editorial-shell">
        <header className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D10E63]"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]"
          >
            {t.subtitle}
          </motion.p>
        </header>

        {/* Slider controls */}
        <div className="mt-10 flex justify-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label={t.prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD5CA] bg-[#FBF9F3] text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label={t.next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD5CA] bg-[#FBF9F3] text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slider track */}
        <div
          ref={trackRef}
          className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label={t.title}
        >
          {SHOWCASE.map(({ slug, role, segments, pitch }, index) => {
            const ai = ROLE_DETAILS[slug]
            if (!ai) return null
            return (
              <ShowcaseCard
                key={slug}
                slug={slug}
                name={ai.name}
                avatar={ai.avatar}
                role={role[lang]}
                segments={segments[lang]}
                pitch={pitch[lang]}
                labels={t}
                index={index}
              />
            )
          })}
        </div>

        <div className="mt-12 flex justify-center">
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

function ShowcaseCard({
  slug,
  name,
  avatar,
  role,
  segments,
  pitch,
  labels,
  index,
}: {
  slug: string
  name: string
  avatar: string
  role: string
  segments: string
  pitch: string
  labels: Record<string, string>
  index: number
}) {
  const { has, toggle } = useMyTeam()
  const inTeam = has(slug)

  return (
    <motion.article
      data-card
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.07 }}
      className="group flex w-[85vw] shrink-0 snap-start flex-col rounded-3xl border border-[#E4DCCF] bg-[#F3EFE6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D10E63]/30 hover:shadow-[0_24px_60px_rgba(28,26,23,0.10)] sm:w-[20rem] lg:w-[22rem]"
    >
      {/* Header: avatar + availability */}
      <div className="flex items-start justify-between">
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#1C1A17]/[0.08]">
          <Image
            src={avatar || '/placeholder.svg'}
            alt={name}
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
        <h3 className="font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17]">{name}</h3>
        <p className="mt-0.5 text-sm font-medium text-[#D10E63]">{role}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#6B6560]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#A09789]" aria-hidden="true" />
          {segments}
        </p>
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-1.5" aria-label="5 / 5">
        <span className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#D10E63] text-[#D10E63]" />
          ))}
        </span>
        <span className="font-mono text-[11px] font-semibold text-[#857C6E]">{labels.rating}</span>
      </div>

      {/* Description */}
      <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#4E483F]">{pitch}</p>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2">
        <Link
          href={collaboratorHref(slug)}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#DDD5CA] px-3 text-sm font-semibold text-[#4E483F] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{`${labels.talk} ${name}`}</span>
        </Link>
        <button
          type="button"
          onClick={() => toggle({ slug, name, role, avatar })}
          aria-pressed={inTeam}
          className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors ${
            inTeam
              ? 'bg-[#1C1A17] text-[#FBF9F3]'
              : 'border border-[#D10E63]/40 text-[#D10E63] hover:bg-[#D10E63]/[0.06]'
          }`}
        >
          {inTeam ? <Check className="h-4 w-4" /> : null}
          {inTeam ? labels.recruited : labels.recruit}
        </button>
      </div>
    </motion.article>
  )
}

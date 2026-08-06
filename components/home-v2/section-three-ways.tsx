'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe, Target, UserRound } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Par où commencer',
    title: 'Commencez comme vous voulez.',
    subtitle: 'À partir de votre entreprise, d’une mission ou d’un Collaborateur IA. Alma prépare le reste.',
    cards: [
      {
        icon: Globe,
        badge: 'Le plus rapide',
        label: 'À partir de votre entreprise',
        desc: 'Vous avez déjà un site web. Alma analyse votre entreprise, construit son contexte et prépare le Collaborateur IA le plus adapté à vos besoins.',
        cta: 'Analyser mon entreprise',
        href: '/decouvrir',
      },
      {
        icon: Target,
        label: 'À partir d’une mission',
        desc: 'Vous savez déjà ce que vous souhaitez déléguer. Choisissez une mission prête à l’emploi et Alma prépare le Collaborateur IA capable de l’exécuter.',
        cta: 'Explorer les missions',
        href: '/missions',
      },
      {
        icon: UserRound,
        label: 'À partir d’un Collaborateur IA',
        desc: 'Vous recherchez un métier ou une expertise. Choisissez un Collaborateur IA et Alma l’adapte à votre organisation, à vos applications et à vos méthodes de travail.',
        roles: ['Commercial', 'Marketing', 'Assistante', 'Support', 'RH', 'Finance', 'Direction'],
        cta: 'Explorer les Collaborateurs IA',
        href: '/collaborateurs-ia',
      },
    ],
    preview: {
      analyzeSource: 'solvea.fr',
      analyzeStatus: 'Analyse…',
      analyzeChips: ['Produits', 'Tarifs', 'FAQ'],
      missionSteps: ['Contexte préparé', 'Compétences réunies', 'Mission prête'],
      collabName: 'Emma',
      collabRole: 'Commerciale · prête',
    },
  },
  en: {
    eyebrow: 'Where to start',
    title: 'Start however you want.',
    subtitle: 'From your company, a mission or an AI Collaborator. Alma prepares the rest.',
    cards: [
      {
        icon: Globe,
        badge: 'Fastest',
        label: 'From your company',
        desc: 'You already have a website. Alma analyzes your company, builds its context and prepares the AI Collaborator best suited to your needs.',
        cta: 'Analyze my company',
        href: '/decouvrir',
      },
      {
        icon: Target,
        label: 'From a mission',
        desc: 'You already know what you want to delegate. Pick a ready-to-use mission and Alma prepares the AI Collaborator able to run it.',
        cta: 'Explore missions',
        href: '/missions',
      },
      {
        icon: UserRound,
        label: 'From an AI Collaborator',
        desc: 'You are looking for a role or an expertise. Choose an AI Collaborator and Alma adapts it to your organization, your applications and your ways of working.',
        roles: ['Sales', 'Marketing', 'Assistant', 'Support', 'HR', 'Finance', 'Leadership'],
        cta: 'Explore AI Collaborators',
        href: '/collaborateurs-ia',
      },
    ],
    preview: {
      analyzeSource: 'solvea.com',
      analyzeStatus: 'Analyzing…',
      analyzeChips: ['Products', 'Pricing', 'FAQ'],
      missionSteps: ['Context ready', 'Skills gathered', 'Mission ready'],
      collabName: 'Emma',
      collabRole: 'Sales rep · ready',
    },
  },
} as const

type Preview = {
  analyzeSource: string
  analyzeStatus: string
  analyzeChips: readonly string[]
  missionSteps: readonly string[]
  collabName: string
  collabRole: string
}

/* Analysis preview — a scanning bar that fills on hover, source chips reveal. */
function AnalyzePreview({ p }: { p: Preview }) {
  return (
    <div className="mt-4 flex-1 rounded-xl border border-[#E4DCCF] bg-[#FDFCF9] p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#D10E63]" aria-hidden="true" />
        <span className="font-mono text-[10px] text-[#8A8378]">{p.analyzeSource}</span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.14em] text-[#B7B0A4] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
          {p.analyzeStatus}
        </span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE9DD]">
        <div className="h-full w-[32%] rounded-full bg-[#D10E63] transition-[width] duration-[900ms] ease-out group-hover:w-full motion-reduce:w-full motion-reduce:transition-none" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {p.analyzeChips.map((c, idx) => (
          <span
            key={c}
            className="rounded-md border border-[#E4DCCF] bg-[#FBF9F3] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#8A8378] transition-colors duration-300 group-hover:border-[#D10E63]/30 group-hover:bg-[#F5E1EA] group-hover:text-[#AD0C53] motion-reduce:transition-none"
            style={{ transitionDelay: `${idx * 110}ms` }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Mission preview — a 3-step checklist that ticks off on hover, staggered. */
function MissionPreview({ p }: { p: Preview }) {
  const widths = ['w-3/4', 'w-full', 'w-2/3']
  return (
    <div className="mt-4 flex flex-1 flex-col gap-2.5 rounded-xl border border-[#E4DCCF] bg-[#FDFCF9] p-3">
      {p.missionSteps.map((step, idx) => (
        <div key={step} className="flex items-center gap-2">
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] text-transparent transition-colors duration-300 group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-white motion-reduce:border-[#D10E63] motion-reduce:bg-[#D10E63] motion-reduce:text-white motion-reduce:transition-none"
            style={{ transitionDelay: `${idx * 160}ms` }}
            aria-hidden="true"
          >
            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
          </span>
          <span className="truncate font-mono text-[10px] text-[#8A8378]">{step}</span>
          <span className={`ml-auto h-1.5 ${widths[idx]} max-w-[40%] rounded-full bg-[#EFE9DD]`} aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

/* Collaborator preview — Emma's profile chip slides in above the role list. */
function CollabPreview({ p, roles }: { p: Preview; roles: readonly string[] }) {
  return (
    <div className="mt-4 flex flex-1 flex-col gap-2.5">
      <div className="flex items-center gap-2.5 rounded-xl border border-[#E4DCCF] bg-[#FDFCF9] p-2.5 opacity-0 transition-all duration-300 group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] font-sf text-sm font-bold text-white">
          {p.collabName.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold leading-none text-[#1C1A17]">{p.collabName}</p>
          <p className="mt-1 truncate font-mono text-[9px] text-[#8A8378]">{p.collabRole}</p>
        </div>
        <Check className="ml-auto h-4 w-4 shrink-0 text-[#3FBF6E]" strokeWidth={3} aria-hidden="true" />
      </div>
      <ul className="flex flex-wrap content-start gap-1.5">
        {roles.map((role, idx) => (
          <li
            key={role}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300 motion-reduce:transition-none ${
              idx === 0
                ? 'border-[#D10E63]/30 bg-[#F5E1EA] text-[#AD0C53]'
                : 'border-[#E4DCCF] bg-[#FBF9F3] text-[#5A544A]'
            }`}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SectionThreeWays({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 sm:mt-14 md:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              >
                <Link
                  href={card.href}
                  className="group relative flex h-full flex-col rounded-[1.5rem] border border-[#E4DCCF] bg-[#F3EFE6] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#D10E63]/45 hover:shadow-[0_30px_72px_-30px_rgba(28,26,23,0.66)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/45"
                >
                  {'badge' in card && card.badge ? (
                    <span className="absolute right-6 top-6 rounded-full bg-[#D10E63] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                      {card.badge}
                    </span>
                  ) : null}
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D10E63]/[0.1] text-[#D10E63] transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
                    <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{card.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5A544A]">{card.desc}</p>

                  {i === 0 ? (
                    <AnalyzePreview p={t.preview} />
                  ) : i === 1 ? (
                    <MissionPreview p={t.preview} />
                  ) : 'roles' in card && card.roles ? (
                    <CollabPreview p={t.preview} roles={card.roles} />
                  ) : (
                    <span className="flex-1" aria-hidden="true" />
                  )}

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#D10E63] transition-colors group-hover:text-[#AD0C53]">
                    {card.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

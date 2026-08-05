'use client'

import Link from 'next/link'
import { CtaButton } from '@/components/ui/cta-button'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  MessageSquare,
  Mail,
  BarChart3,
  FileText,
  Repeat,
} from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

// Chaque mission mène au Collaborateur IA qui la prépare avec Alma.
const MISSIONS = [
  { slug: 'hugo', icon: Users },
  { slug: 'ines', icon: MessageSquare },
  { slug: 'lea', icon: Mail },
  { slug: 'nadia', icon: BarChart3 },
  { slug: 'emma', icon: FileText },
  { slug: 'arthur', icon: Repeat },
] as const

const T: Record<
  Lang,
  {
    kicker: string
    headline1: string
    headline2: string
    subtitle: string
    exploreAll: string
    missions: string[]
  }
> = {
  fr: {
    kicker: 'Commencez par une mission',
    headline1: 'Que souhaitez-vous',
    headline2: 'accomplir\u00A0?',
    subtitle:
      'Choisissez une mission. Alma prépare le profil métier et les compétences nécessaires à votre Collaborateur\u00A0IA.',
    exploreAll: 'Explorer toutes les missions',
    missions: [
      'Trouver des prospects qualifiés',
      'Répondre aux demandes des clients',
      'Préparer une newsletter',
      'Analyser les ventes du mois',
      'Produire le compte rendu d’une réunion',
      'Automatiser une tâche répétitive',
    ],
  },
  en: {
    kicker: 'Start with a mission',
    headline1: 'What do you want',
    headline2: 'to accomplish?',
    subtitle:
      'Choose a mission. Alma prepares the business profile and skills your AI\u00A0Collaborator needs.',
    exploreAll: 'Explore every mission',
    missions: [
      'Find qualified prospects',
      'Answer customer requests',
      'Prepare a newsletter',
      'Analyze the month’s sales',
      'Produce a meeting summary',
      'Automate a repetitive task',
    ],
  },
}

export function SectionMissions({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section
      id="missions"
      className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#F3EFE6] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Kicker>{t.kicker}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.headline1}
            <br />
            <span className="text-[#D10E63]">{t.headline2}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[#5F594F]">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:mt-14 lg:grid-cols-3"
        >
          {MISSIONS.map(({ slug, icon: Icon }, i) => (
            <li key={t.missions[i]} className="flex">
              <Link
                href={collaboratorHref(slug)}
                className="group flex w-full flex-col justify-between gap-6 rounded-3xl border border-[#D8D0C2] bg-[#FBF9F3] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#D10E63] hover:shadow-[0_20px_48px_rgba(28,26,23,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6]"
              >
                <span className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D10E63]/[0.08] text-[#D10E63] transition-colors group-hover:bg-[#D10E63] group-hover:text-[#FBF9F3]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[#B8AF9F] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D10E63]" />
                </span>
                <span className="text-pretty font-sf text-lg font-semibold leading-snug text-[#1C1A17]">
                  {t.missions[i]}
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-14 text-center"
        >
          <CtaButton href="/collaborateurs-ia">
            {t.exploreAll}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </motion.div>
      </div>
    </section>
  )
}

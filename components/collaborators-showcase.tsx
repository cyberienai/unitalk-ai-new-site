'use client'

import Link from 'next/link'
import { CtaButton } from '@/components/ui/cta-button'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Briefcase, PenLine, Code2 } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

// Trois profils métier par défaut = trois portes d'entrée simples.
// Le parcours d'adaptation (domaine → missions → validation) se déroule ensuite avec Alma.
const PROFILES = [
  {
    key: 'assistanat',
    icon: Briefcase,
    name: { fr: 'Assistanat de direction', en: 'Executive assistant' },
    desc: {
      fr: 'Organiser les réunions, préparer les décisions et coordonner les priorités.',
      en: 'Organize meetings, prepare decisions and coordinate priorities.',
    },
  },
  {
    key: 'contenu',
    icon: PenLine,
    name: { fr: 'Stratégie de contenu', en: 'Content strategy' },
    desc: {
      fr: 'Planifier, produire et analyser les contenus de votre organisation.',
      en: "Plan, produce and analyze your organization's content.",
    },
  },
  {
    key: 'developpement',
    icon: Code2,
    name: { fr: 'Développement logiciel', en: 'Software development' },
    desc: {
      fr: 'Développer des fonctionnalités, corriger des erreurs et documenter le code.',
      en: 'Build features, fix issues and document the code.',
    },
  },
] as const

const T: Record<
  Lang,
  { kicker: string; headline1: string; headline2: string; subtitle: string; choose: string; allCta: string }
> = {
  fr: {
    kicker: 'Commencez par un profil métier',
    headline1: 'De quel savoir-faire',
    headline2: 'avez-vous besoin\u00A0?',
    subtitle:
      'Choisissez un profil métier. Alma l’adapte à votre activité et prépare les premières missions de votre Collaborateur\u00A0IA.',
    choose: 'Choisir ce profil',
    allCta: 'Explorer tous les profils métier',
  },
  en: {
    kicker: 'Start with a business profile',
    headline1: 'Which know-how',
    headline2: 'do you need?',
    subtitle:
      'Choose a business profile. Alma tailors it to your activity and prepares the first missions of your AI\u00A0Collaborator.',
    choose: 'Choose this profile',
    allCta: 'Explore all business profiles',
  },
}

export function CollaboratorsShowcase({ lang }: { lang: Lang }) {
  const t = T[lang]

  return (
    <section
      id="collaborateurs-ia"
      className="scroll-mt-20 border-t border-[#E9E2D4] bg-[#FBF9F3] px-5 py-24 sm:px-8 sm:py-32"
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
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROFILES.map(({ key, icon: Icon, name, desc }) => (
            <li key={key} className="flex">
              <Link
                href={`/decouvrir?profil=${key}`}
                className="group flex w-full flex-col gap-5 rounded-3xl border border-[#D8D0C2] bg-[#F3EFE6] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#D10E63] hover:shadow-[0_20px_48px_rgba(28,26,23,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3]"
              >
                <span className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D10E63]/[0.08] text-[#D10E63] transition-colors group-hover:bg-[#D10E63] group-hover:text-[#FBF9F3]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[#B8AF9F] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D10E63]" />
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-sf text-lg font-semibold leading-snug text-[#1C1A17]">
                    {name[lang]}
                  </span>
                  <span className="text-pretty text-[14px] leading-relaxed text-[#5F594F]">
                    {desc[lang]}
                  </span>
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 font-sf text-sm font-semibold text-[#D10E63]">
                  {t.choose}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
          className="mt-14 flex justify-center"
        >
          <CtaButton href="/collaborateurs-ia/roles">
            {t.allCta}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </motion.div>
      </div>
    </section>
  )
}

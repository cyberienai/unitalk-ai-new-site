'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { Kicker } from '@/components/home/section-kicker'
import { LucasCard, SpecCard, Conclusion, type SpecRow } from '../lucas-card'

const COPY = {
  fr: {
    kicker: 'Profils métier',
    title: 'Quel rôle votre Collaborateur IA doit-il exercer ?',
    lead: 'Un profil métier définit une responsabilité durable. Il réunit le cadre, les savoir-faire et les règles nécessaires pour l’exercer dans votre entreprise.',
    cta: 'Parler à Alma',
    secondary: 'Explorer les profils métier',
    micro: 'Vous ne choisissez pas un personnage. Vous définissez un rôle dans votre entreprise.',
    role: 'Collaborateur IA · Solvea',
    aiLabel: 'IA',
    rows: [
      { label: 'Profil actuel', value: 'Conseiller relation client' },
      { label: 'Chargé de fidélisation', status: 'À valider', tone: 'pending', added: true },
    ] as SpecRow[],
    incomingEyebrow: 'Nouvelle responsabilité',
    incoming: 'Prendre en charge la fidélisation après la résolution des réclamations.',
    proposalEyebrow: 'Alma propose · profil métier supplémentaire',
    proposalTitle: 'Chargé de fidélisation',
    proposalRows: [
      { label: 'Organiser le suivi après résolution', value: '' },
      { label: 'Détecter les signes de départ', value: '' },
      { label: 'Préparer les actions de fidélisation', value: '' },
    ] as SpecRow[],
    conclusion: 'Un nouveau rôle. Toujours le même Lucas.',
  },
  en: {
    kicker: 'Job profiles',
    title: 'What role should your AI Collaborator hold?',
    lead: 'A job profile defines a durable responsibility. It brings together the scope, the know-how and the rules needed to hold it inside your company.',
    cta: 'Talk to Alma',
    secondary: 'Explore job profiles',
    micro: 'You are not picking a character. You are defining a role inside your company.',
    role: 'AI Collaborator · Solvea',
    aiLabel: 'AI',
    rows: [
      { label: 'Current profile', value: 'Customer relations advisor' },
      { label: 'Retention officer', status: 'To validate', tone: 'pending', added: true },
    ] as SpecRow[],
    incomingEyebrow: 'New responsibility',
    incoming: 'Take on retention after complaints are resolved.',
    proposalEyebrow: 'Alma proposes · additional job profile',
    proposalTitle: 'Retention officer',
    proposalRows: [
      { label: 'Organize follow-up after resolution', value: '' },
      { label: 'Detect signs of churn', value: '' },
      { label: 'Prepare retention actions', value: '' },
    ] as SpecRow[],
    conclusion: 'A new role. Still the same Lucas.',
  },
} as const

export function ProfilsHero() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — the question */}
        <div>
          <Kicker>{t.kicker}</Kicker>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl md:text-[3.3rem]"
          >
            {t.title}
          </motion.h1>
          <p className="mt-6 max-w-lg text-pretty text-[17px] leading-relaxed text-[#5A5348] md:text-[18px]">{t.lead}</p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#catalogue"
              className="group inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
            >
              {t.secondary}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <p className="mt-6 max-w-md text-pretty text-[14px] leading-relaxed text-[#857C6E]">{t.micro}</p>
        </div>

        {/* Right — the evolving Lucas fiche + Alma's proposal */}
        <div className="flex flex-col items-center gap-4 lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full max-w-sm rounded-2xl border border-dashed border-[#D10E63]/40 bg-[#FBF3F7] px-4 py-3"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.incomingEyebrow}</p>
            <p className="mt-1 text-[14px] font-medium leading-snug text-[#1C1A17]">{t.incoming}</p>
          </motion.div>

          <LucasCard role={t.role} aiLabel={t.aiLabel} rows={t.rows} />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-sm"
          >
            <SpecCard eyebrow={t.proposalEyebrow} title={t.proposalTitle} rows={t.proposalRows} accent />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="w-full max-w-sm"
          >
            <Conclusion>{t.conclusion}</Conclusion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

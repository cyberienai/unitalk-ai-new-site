'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { Kicker } from '@/components/home/section-kicker'
import { LucasCard, Conclusion, type SpecRow } from './lucas-card'

const COPY = {
  fr: {
    kicker: 'Collaborateurs IA',
    title: 'Des Collaborateurs IA qui progressent avec votre entreprise.',
    lead: 'Confiez-leur des missions. Ils travaillent avec vos équipes et développent des savoir-faire que votre entreprise peut conserver, réutiliser et partager.',
    cta: 'Parler à Alma',
    secondary: 'Voir Lucas accomplir une mission',
    role: 'Collaborateur IA · Relation client',
    aiLabel: 'IA',
    incoming: 'Une mission arrive',
    mission: 'Suivre les réclamations après chaque appel.',
    rows: [
      { label: 'Entreprise', value: 'Solvea' },
      { label: 'Équipe', value: 'Relation client' },
      { label: 'Responsable humaine', value: 'Sophie' },
      { label: 'Profil métier', value: 'Conseiller relation client' },
      { label: 'Suivre une réclamation', status: 'Ajouté', tone: 'added', added: true },
      { label: 'Agenda partagé', status: 'Ajouté', tone: 'added', added: true },
      { label: 'Email · Téléphone', status: 'Actifs', tone: 'active' },
    ] as SpecRow[],
    conclusion: 'Même Lucas. Une compétence et un accès de plus.',
  },
  en: {
    kicker: 'AI Collaborators',
    title: 'AI Collaborators that progress with your company.',
    lead: 'Give them missions. They work with your teams and build know-how your company can keep, reuse and share.',
    cta: 'Talk to Alma',
    secondary: 'Watch Lucas carry out a mission',
    role: 'AI Collaborator · Customer relations',
    aiLabel: 'AI',
    incoming: 'A mission arrives',
    mission: 'Follow up on complaints after every call.',
    rows: [
      { label: 'Company', value: 'Solvea' },
      { label: 'Team', value: 'Customer relations' },
      { label: 'Human lead', value: 'Sophie' },
      { label: 'Job profile', value: 'Customer relations advisor' },
      { label: 'Follow up on a complaint', status: 'Added', tone: 'added', added: true },
      { label: 'Shared calendar', status: 'Added', tone: 'added', added: true },
      { label: 'Email · Phone', status: 'Active', tone: 'active' },
    ] as SpecRow[],
    conclusion: 'Same Lucas. One more skill and one more access.',
  },
} as const

export function CollabHero() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — promise */}
        <div>
          <Kicker>{t.kicker}</Kicker>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl md:text-[3.4rem]"
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
              href="#collaboration"
              className="group inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
            >
              {t.secondary}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right — the evolving Lucas fiche */}
        <div className="flex flex-col items-center gap-4 lg:items-end">
          {/* Incoming mission chip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full max-w-sm rounded-2xl border border-dashed border-[#D10E63]/40 bg-[#FBF3F7] px-4 py-3"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.incoming}</p>
            <p className="mt-1 text-[14px] font-medium leading-snug text-[#1C1A17]">{t.mission}</p>
          </motion.div>

          <LucasCard role={t.role} aiLabel={t.aiLabel} rows={t.rows} />

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full max-w-sm"
          >
            <Conclusion>{t.conclusion}</Conclusion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

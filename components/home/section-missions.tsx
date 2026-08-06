'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Users, MessageSquare, Mail, BarChart3, FileText, Repeat, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CtaButton } from '@/components/ui/cta-button'
import type { Lang } from '@/lib/language-context'
import { collaboratorHref } from '@/lib/collaborators-catalog'
import { Kicker } from './section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

type MissionCopy = {
  mission: string
  profile: string
  department: string
  skills: [string, string, string]
  tools: [string, string, string]
}

type Mission = {
  slug: string
  icon: LucideIcon
  fr: MissionCopy
  en: MissionCopy
}

// Each mission maps to the business profile Alma prepares (not an identity).
const MISSIONS: Mission[] = [
  {
    slug: 'hugo',
    icon: Users,
    fr: {
      mission: 'Trouver des prospects qualifiés',
      profile: 'Développement commercial',
      department: 'Ventes',
      skills: ['Prospection ciblée', 'Qualification des leads', 'Prise de rendez-vous'],
      tools: ['CRM', 'LinkedIn', 'Email'],
    },
    en: {
      mission: 'Find qualified prospects',
      profile: 'Business development',
      department: 'Sales',
      skills: ['Targeted prospecting', 'Lead qualification', 'Meeting booking'],
      tools: ['CRM', 'LinkedIn', 'Email'],
    },
  },
  {
    slug: 'ines',
    icon: MessageSquare,
    fr: {
      mission: 'Répondre aux demandes des clients',
      profile: 'Relation client',
      department: 'Support',
      skills: ['Réponses instantanées', 'Suivi des tickets', 'Escalade intelligente'],
      tools: ['Helpdesk', 'Email', 'Chat'],
    },
    en: {
      mission: 'Answer customer requests',
      profile: 'Customer relations',
      department: 'Support',
      skills: ['Instant replies', 'Ticket tracking', 'Smart escalation'],
      tools: ['Helpdesk', 'Email', 'Chat'],
    },
  },
  {
    slug: 'lea',
    icon: Mail,
    fr: {
      mission: 'Préparer une newsletter',
      profile: 'Stratégie de contenu',
      department: 'Marketing',
      skills: ['Rédaction éditoriale', 'Ligne éditoriale', 'Segmentation'],
      tools: ['Email', 'CMS', 'Analytics'],
    },
    en: {
      mission: 'Prepare a newsletter',
      profile: 'Content strategy',
      department: 'Marketing',
      skills: ['Editorial writing', 'Editorial voice', 'Segmentation'],
      tools: ['Email', 'CMS', 'Analytics'],
    },
  },
  {
    slug: 'nadia',
    icon: BarChart3,
    fr: {
      mission: 'Analyser les ventes du mois',
      profile: 'Analyse financière',
      department: 'Finance',
      skills: ['Tableaux de bord', 'Analyse des écarts', 'Prévisions'],
      tools: ['Tableur', 'ERP', 'BI'],
    },
    en: {
      mission: 'Analyze the month’s sales',
      profile: 'Financial analysis',
      department: 'Finance',
      skills: ['Dashboards', 'Variance analysis', 'Forecasts'],
      tools: ['Spreadsheet', 'ERP', 'BI'],
    },
  },
  {
    slug: 'emma',
    icon: FileText,
    fr: {
      mission: 'Produire le compte rendu d’une réunion',
      profile: 'Assistanat de direction',
      department: 'Direction',
      skills: ['Prise de notes', 'Synthèse claire', 'Plan d’actions'],
      tools: ['Agenda', 'Docs', 'Email'],
    },
    en: {
      mission: 'Produce a meeting summary',
      profile: 'Executive assistance',
      department: 'Leadership',
      skills: ['Note taking', 'Clear synthesis', 'Action plan'],
      tools: ['Calendar', 'Docs', 'Email'],
    },
  },
  {
    slug: 'arthur',
    icon: Repeat,
    fr: {
      mission: 'Automatiser une tâche répétitive',
      profile: 'Développement logiciel',
      department: 'Développement',
      skills: ['Scripts & intégrations', 'Connexion d’outils', 'Fiabilité'],
      tools: ['API', 'Zapier', 'Webhooks'],
    },
    en: {
      mission: 'Automate a repetitive task',
      profile: 'Software development',
      department: 'Engineering',
      skills: ['Scripts & integrations', 'Tool wiring', 'Reliability'],
      tools: ['API', 'Zapier', 'Webhooks'],
    },
  },
]

const T = {
  fr: {
    kicker: 'Si vous avez une mission en tête',
    headline1: 'Que souhaitez-vous',
    headline2: 'accomplir\u00A0?',
    subtitle:
      'Choisissez une mission. Alma prépare le profil métier et les compétences nécessaires à votre Collaborateur\u00A0IA.',
    prepares: 'Alma prépare',
    profileLabel: 'Profil métier',
    skillsLabel: 'Compétences clés',
    toolsLabel: 'Outils',
    ready: 'Prêt en quelques minutes',
    cta: 'Préparer avec Alma',
    exploreAll: 'Explorer toutes les missions',
    groupLabel: 'Choisir une mission',
  },
  en: {
    kicker: 'If you have a mission in mind',
    headline1: 'What do you want',
    headline2: 'to accomplish?',
    subtitle:
      'Choose a mission. Alma prepares the business profile and skills your AI\u00A0Collaborator needs.',
    prepares: 'Alma prepares',
    profileLabel: 'Business profile',
    skillsLabel: 'Key skills',
    toolsLabel: 'Tools',
    ready: 'Ready in minutes',
    cta: 'Prepare with Alma',
    exploreAll: 'Explore every mission',
    groupLabel: 'Choose a mission',
  },
} as const

export function SectionMissions({ lang }: { lang: Lang }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const panelId = useId()

  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? selected

  const mission = MISSIONS[active]
  const copy = mission[lang]

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

        {/* Mission tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          role="group"
          aria-label={t.groupLabel}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 sm:mt-14 sm:gap-3"
        >
          {MISSIONS.map((m, i) => {
            const Icon = m.icon
            const isActive = i === selected
            return (
              <motion.button
                key={m.slug}
                type="button"
                aria-pressed={isActive}
                aria-controls={panelId}
                onClick={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2, ease }}
                className={`group inline-flex items-center gap-2 rounded-full border py-2 pl-2 pr-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] ${
                  isActive
                    ? 'border-[#D10E63] bg-[#D10E63] text-[#FBF9F3] shadow-[0_10px_28px_rgba(209,14,99,0.28)]'
                    : 'border-[#D8D0C2] bg-[#FBF9F3] text-[#3F3A33] hover:border-[#D10E63]/45 hover:text-[#1C1A17]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-[#FBF9F3]/20 text-[#FBF9F3]' : 'bg-[#D10E63]/[0.08] text-[#D10E63]'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {m[lang].mission}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Live preview panel — Alma prepares the business profile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          id={panelId}
          className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[28px] border border-[#E4DCCF] bg-[#FBF9F3] shadow-[0_30px_80px_-40px_rgba(28,26,23,0.4)] sm:mt-10"
        >
          {/* reasoning scan bar (retriggers on change) */}
          {!reduceMotion && (
            <motion.span
              key={active}
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0.9 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-[#D10E63] to-transparent"
            />
          )}

          {/* header: Alma + profile title */}
          <div className="flex items-center gap-3 border-b border-[#EFE8DA] px-5 py-4 sm:px-7">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src="/alma-avatar.png"
                alt="Alma"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#D10E63]/35" />
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full ring-2 ring-[#D10E63]/40"
                  animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#D10E63]">
                {t.prepares}
              </p>
              <div className="mt-0.5 flex min-h-[1.6rem] items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h3
                    key={copy.profile}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease }}
                    className="truncate font-sf text-lg font-bold leading-tight tracking-[-0.01em] text-[#1C1A17]"
                  >
                    {copy.profile}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <span className="hidden shrink-0 rounded-full border border-[#E4DCCF] bg-[#F3EFE6] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B6459] sm:inline-block">
              {copy.department}
            </span>
          </div>

          {/* body: skills + tools, animated per selection */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mission.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-7 sm:py-7"
            >
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9184]">
                  {t.skillsLabel}
                </p>
                <ul className="mt-3 space-y-2">
                  {copy.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.06 + i * 0.07, ease }}
                      className="flex items-center gap-2.5 text-sm font-medium text-[#3F3A33]"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/[0.1] text-[#D10E63]">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9184]">
                  {t.toolsLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {copy.tools.map((tool, i) => (
                    <motion.li
                      key={tool}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.12 + i * 0.07, ease }}
                      className="rounded-lg border border-[#E4DCCF] bg-[#F3EFE6] px-3 py-1.5 text-xs font-semibold text-[#4E483F]"
                    >
                      {tool}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* footer: reassurance + CTA */}
          <div className="flex flex-col gap-3 border-t border-[#EFE8DA] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C8477]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22A06B]" aria-hidden="true" />
              {t.ready}
            </span>
            <CtaButton href={collaboratorHref(mission.slug)} size="sm">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </CtaButton>
          </div>
        </motion.div>

        <div className="mt-10 flex justify-center">
                <CtaButton href="/missions" variant="secondary" size="sm">
                  {t.exploreAll}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

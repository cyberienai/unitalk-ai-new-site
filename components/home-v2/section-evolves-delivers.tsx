'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  FileText,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react'
import { CtaButton } from '@/components/ui/cta-button'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Une identité qui reste, un savoir-faire qui grandit',
    title: 'Votre Collaborateur IA évolue, et livre dans le workspace.',
    subtitle:
      'Son identité ne change pas. Son savoir-faire, lui, s’enrichit : Alma ajoute un profil, une expertise, une nouvelle mission — et le résultat arrive dans votre workspace.',
    // Carte identité
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    ficheStatus: 'En poste',
    ficheContact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Agenda connecté' },
    ],
    expertisesLabel: 'Expertises',
    baseExpertises: ['Assistanat', 'Agenda', 'Réunions'],
    newExpertise: 'Relation client',
    newTag: 'nouveau',
    evolveLabel: 'Savoir-faire ajouté par Alma',
    newMissionLabel: 'Nouvelle mission',
    newMission: 'Préparer la revue trimestrielle',
    closing: [
      'Il appartient à votre organisation.',
      'Il apprend avec votre entreprise.',
      'Il travaille aux côtés de vos équipes.',
    ],
    // Workspace / livraison
    wsEyebrow: 'Dans le workspace',
    deliveryTitle: 'Revue trimestrielle',
    deliverySteps: ['Analyse des données', 'Rédaction du compte-rendu', 'Mise en forme'],
    deliveryDone: 'Livrable prêt',
    deliveryFile: 'revue-trimestrielle.pdf',
    imageAlt: 'Le workspace Unitalk où humains et Collaborateurs IA travaillent ensemble',
    cta: 'Découvrir le workspace',
  },
  en: {
    eyebrow: 'An identity that stays, a know-how that grows',
    title: 'Your AI Collaborator evolves, and delivers in the workspace.',
    subtitle:
      'Its identity never changes. Its know-how grows: Alma adds a profile, an expertise, a new mission — and the result lands in your workspace.',
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    ficheStatus: 'On duty',
    ficheContact: [
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    baseExpertises: ['Assistant', 'Calendar', 'Meetings'],
    newExpertise: 'Customer relations',
    newTag: 'new',
    evolveLabel: 'Know-how added by Alma',
    newMissionLabel: 'New mission',
    newMission: 'Prepare the quarterly review',
    closing: [
      'It belongs to your organization.',
      'It learns with your company.',
      'It works alongside your teams.',
    ],
    wsEyebrow: 'In the workspace',
    deliveryTitle: 'Quarterly review',
    deliverySteps: ['Data analysis', 'Report writing', 'Formatting'],
    deliveryDone: 'Deliverable ready',
    deliveryFile: 'quarterly-review.pdf',
    imageAlt: 'The Unitalk workspace where humans and AI Collaborators work together',
    cta: 'Discover the workspace',
  },
} as const

export function SectionEvolvesDelivers({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  // Reveals appear via opacity/transform only — elements always occupy their
  // space, so nothing shifts the layout when the animation plays.
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease, delay },
  })

  return (
    <section className="border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell">
        {/* En-tête */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl"
        >
          <div className="mb-4">
            <Kicker>{t.eyebrow}</Kicker>
          </div>
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
            {t.title}
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
        </motion.header>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Colonne gauche — identité qui reste, savoir-faire qui grandit */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#E4DCCF] bg-[#F3EFE6]"
          >
            {/* Identité (reste) */}
            <div className="flex items-center gap-3 border-b border-[#E4DCCF] bg-[#FBF9F3] p-5">
              <div className="relative shrink-0">
                <Image
                  src="/images/emma-avatar.png"
                  alt=""
                  width={52}
                  height={52}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D10E63]/25"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#FBF9F3] bg-[#2E7D4F]"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <p className="font-sf text-lg font-bold leading-tight text-[#1C1A17]">{t.ficheName}</p>
                <p className="truncate text-[12px] font-medium leading-tight text-[#6B6560]">{t.ficheRole}</p>
              </div>
              <span className="ml-auto rounded-full bg-[#2E7D4F]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2E7D4F]">
                {t.ficheStatus}
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5">
              <ul className="flex flex-col gap-2">
                {t.ficheContact.map((c) => {
                  const Icon = c.icon
                  return (
                    <li
                      key={c.label}
                      className="flex items-center gap-2.5 rounded-xl border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2 text-[12px] font-medium text-[#3F3A33]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
                      <span className="truncate">{c.label}</span>
                    </li>
                  )
                })}
              </ul>

              {/* Savoir-faire (grandit) */}
              <div>
                <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                  {t.expertisesLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.baseExpertises.map((e) => (
                    <span
                      key={e}
                      className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#A80B50]"
                    >
                      {e}
                    </span>
                  ))}
                  <motion.span
                    {...reveal(0.5)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#D10E63] bg-[#D10E63] px-2.5 py-1 text-[11px] font-semibold text-[#FBF9F3]"
                  >
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t.newExpertise}
                    <span className="ml-0.5 rounded-full bg-[#FBF9F3]/25 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em]">
                      {t.newTag}
                    </span>
                  </motion.span>
                </div>
                <motion.p
                  {...reveal(0.65)}
                  className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#8A8175]"
                >
                  <Sparkles className="h-3 w-3 text-[#D10E63]" aria-hidden="true" />
                  {t.evolveLabel}
                </motion.p>
              </div>

              {/* Nouvelle mission */}
              <motion.div
                {...reveal(0.8)}
                className="flex items-center gap-2.5 rounded-xl border border-[#D10E63]/25 bg-[#D10E63]/[0.05] px-3 py-2.5"
              >
                <Brain className="h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#A80B50]">
                    {t.newMissionLabel}
                  </p>
                  <p className="text-[13px] font-semibold leading-tight text-[#1C1A17]">{t.newMission}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Colonne droite — le workspace reprend la mission jusqu'au livrable */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="premium-shadow overflow-hidden rounded-[1.75rem] border border-[#E4DCCF] bg-[#FBF9F3]">
              <Image
                src="/images/unitalk-collaborative-workspace.png"
                alt={t.imageAlt}
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Carte livraison : la mission devient un livrable */}
            <div className="rounded-[1.5rem] border border-[#E4DCCF] bg-[#F3EFE6] p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                  {t.wsEyebrow}
                </span>
                <span className="font-sf text-[13px] font-bold text-[#1C1A17]">{t.deliveryTitle}</span>
              </div>

              <ul className="flex flex-col gap-1.5">
                {t.deliverySteps.map((step, i) => (
                  <motion.li
                    key={step}
                    {...reveal(0.3 + i * 0.2)}
                    className="flex items-center gap-2.5 text-[12px] font-medium text-[#3F3A33]"
                  >
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2E7D4F]/12"
                      aria-hidden="true"
                    >
                      <Check className="h-2.5 w-2.5 text-[#2E7D4F]" strokeWidth={3.5} />
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                {...reveal(0.95)}
                className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#2E7D4F]/25 bg-[#2E7D4F]/[0.08] px-3 py-2.5"
              >
                <FileText className="h-4 w-4 shrink-0 text-[#2E7D4F]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight text-[#1C6B3F]">{t.deliveryDone}</p>
                  <p className="truncate font-mono text-[11px] leading-tight text-[#3F3A33]">{t.deliveryFile}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Clôture + CTA */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[#E4DCCF] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            {t.closing.map((line) => (
              <p key={line} className="font-sf text-[15px] font-semibold text-[#1C1A17]">
                {line}
              </p>
            ))}
          </div>
          <CtaButton href="/workspace">
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

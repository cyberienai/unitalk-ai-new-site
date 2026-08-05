'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Brain,
  Calendar,
  Infinity as InfinityIcon,
  Mail,
  Mic,
  Phone,
  Puzzle,
  Target,
  UserCircle,
  Workflow,
  Wrench,
} from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Bien plus qu’un assistant',
    title: 'Plus que des assistants IA. De véritables Collaborateurs IA.',
    subtitle: 'Chaque Collaborateur IA possède une identité complète et travaille aux côtés de vos équipes.',
    attributes: [
      { icon: UserCircle, label: 'une identité' },
      { icon: Mic, label: 'une voix' },
      { icon: Mail, label: 'un email' },
      { icon: Phone, label: 'un téléphone' },
      { icon: Calendar, label: 'un calendrier' },
      { icon: Brain, label: 'une mémoire' },
      { icon: BadgeCheck, label: 'des rôles' },
      { icon: InfinityIcon, label: 'des expertises illimitées' },
      { icon: Puzzle, label: 'des compétences illimitées' },
      { icon: Target, label: 'des missions' },
      { icon: Wrench, label: 'des outils' },
      { icon: Workflow, label: 'des automatisations' },
    ],
    closing: [
      'Ils appartiennent à votre organisation.',
      'Ils apprennent avec votre entreprise.',
      'Ils travaillent aux côtés de vos équipes.',
    ],
    // Fiche
    ficheName: 'Emma',
    ficheRole: 'Collaboratrice IA · Assistante de direction',
    ficheStatus: 'Active',
    ficheContact: [
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Calendar, label: 'Agenda connecté' },
    ],
    expertisesLabel: 'Expertises',
    expertises: ['Assistanat', 'Agenda', 'Réunions', 'Reporting', 'Emails'],
    memoryLabel: 'Mémoire d’organisation',
    memoryValue: 'Active · apprend en continu',
  },
  en: {
    eyebrow: 'Far more than an assistant',
    title: 'More than AI assistants. True AI Collaborators.',
    subtitle: 'Every AI Collaborator has a complete identity and works alongside your teams.',
    attributes: [
      { icon: UserCircle, label: 'an identity' },
      { icon: Mic, label: 'a voice' },
      { icon: Mail, label: 'an email' },
      { icon: Phone, label: 'a phone number' },
      { icon: Calendar, label: 'a calendar' },
      { icon: Brain, label: 'a memory' },
      { icon: BadgeCheck, label: 'roles' },
      { icon: InfinityIcon, label: 'unlimited expertise' },
      { icon: Puzzle, label: 'unlimited skills' },
      { icon: Target, label: 'missions' },
      { icon: Wrench, label: 'tools' },
      { icon: Workflow, label: 'automations' },
    ],
    closing: [
      'They belong to your organization.',
      'They learn with your company.',
      'They work alongside your teams.',
    ],
    // Fiche
    ficheName: 'Emma',
    ficheRole: 'AI Collaborator · Executive assistant',
    ficheStatus: 'Active',
    ficheContact: [
      { icon: Phone, label: '+33 1 84 80 24 12' },
      { icon: Mail, label: 'emma@solvea.fr' },
      { icon: Calendar, label: 'Calendar connected' },
    ],
    expertisesLabel: 'Expertise',
    expertises: ['Assistant', 'Calendar', 'Meetings', 'Reporting', 'Emails'],
    memoryLabel: 'Organization memory',
    memoryValue: 'Active · learns continuously',
  },
} as const

export function SectionCollaboratorIdentity({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="border-t border-[#E9E2D4] bg-[#FBF9F3] py-24 sm:py-32">
      <div className="editorial-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="mb-4">
              <Kicker>{t.eyebrow}</Kicker>
            </div>
            <h2 className="text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-[#1C1A17] sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#5F594F]">{t.subtitle}</p>
          </motion.div>

          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3">
            {t.attributes.map((attr, i) => {
              const Icon = attr.icon
              return (
                <motion.li
                  key={attr.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, ease, delay: (i % 6) * 0.05 }}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-[#3F3A33]"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#D10E63]" strokeWidth={2} aria-hidden="true" />
                  {attr.label}
                </motion.li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-2 border-t border-[#E4DCCF] pt-6">
            {t.closing.map((line) => (
              <p key={line} className="font-sf text-[15px] font-semibold text-[#1C1A17]">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Fiche détaillée d'un Collaborateur IA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="premium-shadow mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-[#E4DCCF] bg-[#F3EFE6]"
        >
          <div className="flex items-center gap-3 border-b border-[#E4DCCF] bg-[#FBF9F3] p-5">
            <div className="relative shrink-0">
              <Image src="/images/emma-avatar.png" alt="" width={52} height={52} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D10E63]/25" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#FBF9F3] bg-[#2E7D4F]" aria-hidden="true" />
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
                  <li key={c.label} className="flex items-center gap-2.5 rounded-xl border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2 text-[12px] font-medium text-[#3F3A33]">
                    <Icon className="h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
                    <span className="truncate">{c.label}</span>
                  </li>
                )
              })}
            </ul>

            <div>
              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.expertisesLabel}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.expertises.map((e) => (
                  <span key={e} className="rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#A80B50]">
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-2.5">
              <Brain className="h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold leading-tight text-[#1C1A17]">{t.memoryLabel}</p>
                <p className="text-[11px] leading-tight text-[#6B6560]">{t.memoryValue}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

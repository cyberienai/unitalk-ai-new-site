'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { Kicker } from '@/components/home/section-kicker'
import { SpecCard, type SpecRow } from './lucas-card'
import { ThreadTurn } from './mission-thread'

const COPY = {
  fr: {
    kicker: 'Alma · Missions',
    title: 'Tout commence par le travail à accomplir.',
    lead: 'Expliquez votre besoin à Alma. Elle précise le résultat attendu, les règles et les validations, puis vérifie quel Collaborateur IA peut prendre la mission en charge.',
    sophie: { name: 'Sophie', role: 'Responsable relation client', text: 'Nous voulons suivre chaque réclamation jusqu’à sa résolution.' },
    alma: { name: 'Alma', role: 'Customer success IA', text: 'Je prépare la mission et je vérifie les Collaborateurs IA de l’équipe relation client.' },
    missionEyebrow: 'Mission',
    missionTitle: 'Suivre les réclamations',
    rows: [
      { label: 'Résultat', value: 'Chaque dossier a un état et une relance' },
      { label: 'Règles', value: 'Vérifier après chaque appel · relancer sous 3 jours' },
      { label: 'Validation', value: 'Sophie avant tout geste commercial' },
    ] as SpecRow[],
    assign: 'Lucas peut prendre cette mission.',
    assignRole: 'Collaborateur IA · Relation client',
    cta: 'Explorer les missions',
    talk: 'Parler à Alma',
  },
  en: {
    kicker: 'Alma · Missions',
    title: 'It all starts with the work to be done.',
    lead: 'Explain your need to Alma. She clarifies the expected outcome, the rules and the validations, then checks which AI Collaborator can take the mission on.',
    sophie: { name: 'Sophie', role: 'Customer relations lead', text: 'We want to follow every complaint through to resolution.' },
    alma: { name: 'Alma', role: 'AI Customer success', text: 'I’m preparing the mission and checking the AI Collaborators on the customer relations team.' },
    missionEyebrow: 'Mission',
    missionTitle: 'Follow up on complaints',
    rows: [
      { label: 'Outcome', value: 'Every case has a status and a follow-up' },
      { label: 'Rules', value: 'Check after each call · follow up within 3 days' },
      { label: 'Validation', value: 'Sophie before any commercial gesture' },
    ] as SpecRow[],
    assign: 'Lucas can take this mission.',
    assignRole: 'AI Collaborator · Customer relations',
    cta: 'Explore missions',
    talk: 'Talk to Alma',
  },
} as const

export function SectionAlmaMissions() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="border-b border-[#E7E0D2] bg-[#EFE9DD] px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-32">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/missions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3 text-[15px] font-semibold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-semibold text-[#A80B50] transition-colors hover:text-[#D10E63]"
            >
              {t.talk}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Demo column */}
        <div className="flex flex-col gap-3">
          <ThreadTurn name={t.sophie.name} role={t.sophie.role}>{t.sophie.text}</ThreadTurn>
          <ThreadTurn name={t.alma.name} role={t.alma.role} ai>{t.alma.text}</ThreadTurn>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <SpecCard eyebrow={t.missionEyebrow} title={t.missionTitle} rows={t.rows} accent />
          </motion.div>

          {/* Assignment */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex items-center gap-3 rounded-2xl border border-[#22A06B]/30 bg-[#22A06B]/[0.07] p-4"
          >
            <Image src="/images/lucas-avatar.png" alt="Lucas" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-[#22A06B]/25" />
            <div>
              <p className="text-[15px] font-semibold text-[#1C1A17]">{t.assign}</p>
              <p className="text-[13px] text-[#6B6459]">{t.assignRole}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

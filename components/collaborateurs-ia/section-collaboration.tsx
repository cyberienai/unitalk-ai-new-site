'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { MissionThread, ThreadTurn, type ThreadStep } from './mission-thread'

const COPY = {
  fr: {
    kicker: 'Espace de travail collaboratif',
    title: 'Les bonnes personnes et les bons Collaborateurs IA, réunis par la mission.',
    lead: 'Humains et Collaborateurs IA travaillent dans le même espace, avec les documents, les accès et les validations nécessaires à leur rôle.',
    missionEyebrow: 'Mission',
    missionTitle: 'Résoudre la réclamation de Claire Martin',
    sophie: { name: 'Sophie', role: 'Responsable humaine', text: 'Lucas, vérifie la livraison et prépare une solution avant 15 h.' },
    lucas: { name: 'Lucas', role: 'Collaborateur IA', text: 'Le colis est bloqué depuis deux jours. Une réexpédition est possible. Le geste commercial nécessite votre décision.' },
    emma: { name: 'Emma', role: 'Collaboratrice IA', text: 'Deux créneaux sont disponibles pour le rendez-vous de suivi.' },
    gateEyebrow: 'Décision humaine',
    gateQuestion: 'Accorder 10 % sur la prochaine commande ?',
    actions: ['Refuser', 'Modifier', 'Valider'],
    resultEyebrow: 'Après validation',
    results: [
      'Lucas a contacté Claire.',
      'Emma a mis à jour le rendez-vous.',
      'Le CRM a été actualisé.',
      'La décision reste attachée à la mission.',
    ],
    conclusion1: 'Chacun intervient au bon moment.',
    conclusion2: 'Le travail reste au même endroit.',
    surfaces: 'Desktop, web, messageries compatibles et terminal donnent accès au même contexte de travail.',
    cta: 'Découvrir l’espace de travail collaboratif',
  },
  en: {
    kicker: 'Collaborative workspace',
    title: 'The right people and the right AI Collaborators, brought together by the mission.',
    lead: 'Humans and AI Collaborators work in the same space, with the documents, accesses and validations their role requires.',
    missionEyebrow: 'Mission',
    missionTitle: 'Resolve Claire Martin’s complaint',
    sophie: { name: 'Sophie', role: 'Human lead', text: 'Lucas, check the delivery and prepare a solution before 3 p.m.' },
    lucas: { name: 'Lucas', role: 'AI Collaborator', text: 'The parcel has been stuck for two days. A reshipment is possible. The commercial gesture needs your decision.' },
    emma: { name: 'Emma', role: 'AI Collaborator', text: 'Two slots are available for the follow-up appointment.' },
    gateEyebrow: 'Human decision',
    gateQuestion: 'Grant 10% on the next order?',
    actions: ['Decline', 'Adjust', 'Approve'],
    resultEyebrow: 'After approval',
    results: [
      'Lucas contacted Claire.',
      'Emma updated the appointment.',
      'The CRM was refreshed.',
      'The decision stays attached to the mission.',
    ],
    conclusion1: 'Everyone steps in at the right moment.',
    conclusion2: 'The work stays in one place.',
    surfaces: 'Desktop, web, compatible messaging apps and the terminal all reach the same working context.',
    cta: 'Explore the collaborative workspace',
  },
} as const

export function SectionCollaboration() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const steps: ThreadStep[] = [
    { id: 'sophie', content: <ThreadTurn name={t.sophie.name} role={t.sophie.role}>{t.sophie.text}</ThreadTurn> },
    { id: 'lucas', content: <ThreadTurn name={t.lucas.name} role={t.lucas.role} ai>{t.lucas.text}</ThreadTurn> },
    { id: 'emma', content: <ThreadTurn name={t.emma.name} role={t.emma.role} ai>{t.emma.text}</ThreadTurn> },
    {
      id: 'gate',
      gate: true,
      content: (
        <div className="rounded-2xl border-2 border-[#D10E63]/35 bg-[#FBF3F7] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.gateEyebrow}</p>
          <p className="mt-2 text-[16px] font-semibold text-[#1C1A17]">{t.gateQuestion}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.actions.map((a, i) => (
              <span
                key={a}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold ${
                  i === 2 ? 'bg-[#D10E63] text-[#FBF9F3]' : 'border border-[#D8CFC0] text-[#5A5348]'
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'result',
      content: (
        <div className="rounded-2xl border border-[#22A06B]/30 bg-[#22A06B]/[0.06] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1C8A5B]">{t.resultEyebrow}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {t.results.map((r) => (
              <li key={r} className="flex items-start gap-2 text-[14px] leading-relaxed text-[#3A4A40]">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#22A06B]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ]

  return (
    <section id="collaboration" className="scroll-mt-24 border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-5 max-w-md text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

          <div className="mt-8 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
            <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">{t.conclusion1}</p>
            <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">{t.conclusion2}</p>
            <p className="mt-4 text-pretty text-[14px] leading-relaxed text-[#6B6459]">{t.surfaces}</p>
          </div>

          <Link
            href="/workspace"
            className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#A80B50] transition-colors hover:text-[#D10E63]"
          >
            {t.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* The thread */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-6 sm:p-8"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A89C88]">{t.missionEyebrow}</p>
          <p className="mb-6 mt-1.5 text-[17px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{t.missionTitle}</p>
          <MissionThread steps={steps} />
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { MapPin, KeyRound, CircleCheck, Server } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Conçu pour votre organisation',
    title: 'Vous gardez le contrôle.',
    intro: 'Vos données restent les vôtres. Votre Collaborateur IA travaille dans un cadre maîtrisé.',
    cards: [
      {
        title: 'Hébergé en France',
        desc: 'L’environnement Unitalk et les données couvertes par l’offre sont hébergés en France.',
      },
      {
        title: 'Gouvernance des accès',
        desc: 'Votre organisation définit les outils, les données et les actions autorisés pour chaque Collaborateur IA.',
      },
      {
        title: 'Validations maîtrisées',
        desc: 'Vous choisissez les actions qui nécessitent votre accord avant leur exécution.',
      },
      {
        title: 'Serveur IA privé disponible',
        desc: 'Vos applications, vos automatisations et vos données sensibles peuvent fonctionner dans un environnement privé.',
      },
    ],
  },
  en: {
    eyebrow: 'Built for your organization',
    title: 'You stay in control.',
    intro: 'Your data stays yours. Your AI Collaborator works within a controlled environment.',
    cards: [
      {
        title: 'Hosted in France',
        desc: 'The Unitalk environment and the data covered by the plan are hosted in France.',
      },
      {
        title: 'Access governance',
        desc: 'Your organization defines the tools, data and actions each AI Collaborator is allowed to use.',
      },
      {
        title: 'Controlled approvals',
        desc: 'You choose which actions require your approval before they run.',
      },
      {
        title: 'Private AI server available',
        desc: 'Your applications, automations and sensitive data can run in a private environment.',
      },
    ],
  },
} as const

const ICONS = [MapPin, KeyRound, CircleCheck, Server] as const

export function SectionTrust({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative overflow-hidden bg-[#FBF9F3] py-20 sm:py-28">
      <div className="editorial-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="text-balance font-sf text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17]">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#4E483F]">
            {t.intro}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map((card, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease, delay: 0.08 * i }}
                className="rounded-[1.5rem] border border-[#D8D0C2] bg-[#F3EFE6] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-base font-bold text-[#1C1A17]">{card.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

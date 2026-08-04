'use client'

import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Server } from 'lucide-react'

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
        title: 'Gouvernance & conformité',
        desc: 'Des outils de gouvernance facilitent le respect de vos obligations RGPD et AI Act, avec un contrôle clair de vos accès.',
      },
      {
        title: 'Serveur IA privé disponible',
        desc: 'Pour les organisations qui le souhaitent, un environnement isolé, dédié à vos seules données.',
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
        title: 'Governance & compliance',
        desc: 'Governance tools help you meet your GDPR and EU AI Act obligations, with clear control over your access.',
      },
      {
        title: 'Private AI server available',
        desc: 'For organizations that need it, an isolated environment dedicated to your data only.',
      },
    ],
  },
} as const

const ICONS = [MapPin, ShieldCheck, Server] as const

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

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
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

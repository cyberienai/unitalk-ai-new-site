'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'

/**
 * THE DIFFERENCE — no crosses vs checks, the most generic SaaS comparison there
 * is. Four lines that TRANSFORM from left to right: a warm, inert column becomes
 * an anthracite, owned one, with the magenta mission thread crossing each line.
 * No pictograms.
 */

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Une mission accomplie.',
    titleAccent: 'Une expérience qui reste.',
    lead: 'Un agent IA générique produit un résultat. Votre Collaborateur IA conserve l’expérience que vous validez et peut la réutiliser dans ses prochaines missions.',
    beforeTitle: 'Agent IA générique',
    afterTitle: 'Collaborateur IA Unitalk',
    conclusionTitle: 'Un résultat aujourd’hui.',
    conclusionAccent: 'La capacité de le reproduire demain.',
    conclusionSub: 'Les méthodes que vous validez restent dans votre entreprise. Elles peuvent être conservées, versionnées et transformées en compétences réutilisables pour vos prochaines missions.',
    rows: [
      ['Identité définie par un usage', 'Identité persistante, plusieurs profils métier'],
      ['Compétence générique', 'Compétences testées et versionnées'],
      ['Mémoire dépendante de l’outil', 'Mémoire gouvernée par votre entreprise'],
      ['Résultat isolé', 'Expérience validée et réutilisable'],
      ['Modèle lié à la plateforme', 'Modèles autorisés, Collaborateur inchangé'],
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'A mission accomplished.',
    titleAccent: 'An experience that stays.',
    lead: 'A generic AI agent produces a result. Your AI Collaborator keeps the experience you validate and can reuse it in its next missions.',
    beforeTitle: 'Generic AI agent',
    afterTitle: 'Unitalk AI Collaborator',
    conclusionTitle: 'A result today.',
    conclusionAccent: 'The ability to reproduce it tomorrow.',
    conclusionSub: 'The methods you validate stay in your company. They can be kept, versioned and turned into reusable skills for your next missions.',
    rows: [
      ['Identity defined by a use case', 'Persistent identity, multiple job profiles'],
      ['A generic skill', 'Tested and versioned skills'],
      ['Memory dependent on the tool', 'Memory governed by your company'],
      ['An isolated result', 'Validated and reusable experience'],
      ['Model tied to the platform', 'Authorized models, Collaborator unchanged'],
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title} <span className="block text-[#D10E63]">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        {/* The transforming lines */}
        <div className="mt-10 overflow-hidden rounded-lg border border-[#E4DDCE]">
          {/* Column headers */}
          <div className="grid grid-cols-2">
            <div className="bg-[#EDE7DA] px-5 py-3.5 text-right">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9184]">{t.beforeTitle}</span>
            </div>
            <div className="bg-[#1C1A17] px-5 py-3.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8A0BE]">{t.afterTitle}</span>
            </div>
          </div>

          {t.rows.map(([before, after], i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="relative grid grid-cols-2 border-t border-[#E4DDCE]"
            >
              {/* left — warm, inert (text kept clear of the central seam) */}
              <div className="flex items-center justify-end bg-[#EDE7DA]/70 py-5 pl-5 pr-10 text-right sm:pl-7 sm:pr-12">
                <p className="text-[14px] leading-snug text-[#857C6E] sm:text-[15px]">{before}</p>
              </div>
              {/* right — anthracite, owned (text kept clear of the central seam) */}
              <div className="flex items-center bg-[#1C1A17] py-5 pl-10 pr-5 sm:pl-12 sm:pr-7">
                <p className="text-[14px] font-medium leading-snug text-[#F4F1EA] sm:text-[15px]">{after}</p>
              </div>

              {/* the mission thread node sitting on the seam — short ticks only */}
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex items-center">
                  <span className="block h-px w-3 bg-gradient-to-r from-transparent to-[#D10E63]" />
                  <span className="block h-[10px] w-[10px] rounded-full bg-[#D10E63] ring-2 ring-[#F4F1EA]" />
                  <span className="block h-px w-3 bg-gradient-to-r from-[#D10E63] to-transparent" />
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Section chute — sober conclusion, no CTA (the previous section's
            "Parler à Alma" already carries conversion). This section only
            demonstrates why Unitalk accrues value over time. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mt-10 max-w-3xl text-balance text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-[#1C1A17] sm:text-2xl"
        >
          {t.conclusionTitle} <span className="text-[#D10E63]">{t.conclusionAccent}</span>
        </motion.p>
        <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.conclusionSub}</p>
      </div>
    </section>
  )
}

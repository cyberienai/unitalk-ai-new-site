'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    kicker: 'Le modèle',
    title: 'Un profil métier n’est ni une mission ni une compétence.',
    lead: 'Quatre objets distincts, un seul Collaborateur IA pour les réunir.',
    rows: [
      ['Mission', 'Le travail à accomplir maintenant'],
      ['Profil métier', 'La responsabilité durable exercée par le Collaborateur IA'],
      ['Compétence', 'La méthode précise qu’il sait appliquer'],
      ['Application', 'L’outil ou la donnée dans lesquels il peut agir'],
    ],
    exampleEyebrow: 'Exemple',
    example: [
      ['Mission', 'Rappeler les clients insatisfaits cette semaine'],
      ['Profil métier', 'Chargé de fidélisation'],
      ['Compétence', 'Préparer un suivi personnalisé'],
      ['Application', 'CRM'],
    ],
  },
  en: {
    kicker: 'The model',
    title: 'A job profile is neither a mission nor a skill.',
    lead: 'Four distinct objects, one AI Collaborator to bring them together.',
    rows: [
      ['Mission', 'The work to do right now'],
      ['Job profile', 'The durable responsibility held by the AI Collaborator'],
      ['Skill', 'The precise method it knows how to apply'],
      ['Application', 'The tool or data it can act within'],
    ],
    exampleEyebrow: 'Example',
    example: [
      ['Mission', 'Call back unhappy customers this week'],
      ['Job profile', 'Retention officer'],
      ['Skill', 'Prepare a personalized follow-up'],
      ['Application', 'CRM'],
    ],
  },
} as const

export function SectionDistinction() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="distinction" className="border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Definitions */}
          <div className="overflow-hidden rounded-2xl border border-[#E1D9C9] bg-[#FBF9F3]">
            {t.rows.map(([obj, def], i) => (
              <motion.div
                key={obj}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={`grid grid-cols-[130px_1fr] gap-4 px-5 py-4 sm:grid-cols-[160px_1fr] ${
                  i > 0 ? 'border-t border-[#EDE6D9]' : ''
                } ${obj === 'Profil métier' || obj === 'Job profile' ? 'bg-[#D10E63]/[0.05]' : ''}`}
              >
                <span className="text-[14px] font-semibold text-[#1C1A17]">{obj}</span>
                <span className="text-[14px] leading-snug text-[#6B6459]">{def}</span>
              </motion.div>
            ))}
          </div>

          {/* Compact worked example */}
          <div className="rounded-2xl border border-[#E4DDCE] bg-[#211E1B] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8E877C]">{t.exampleEyebrow}</p>
            <div className="mt-3 flex flex-col gap-3">
              {t.example.map(([obj, val]) => (
                <div key={obj} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8E877C]">{obj}</span>
                  <span className="text-[14px] font-medium text-[#F4F1EA]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

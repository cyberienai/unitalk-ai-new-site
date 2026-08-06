'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'

const T = {
  fr: {
    eyebrow: 'La différence',
    title: 'Pourquoi Unitalk ?',
    subtitle: 'Les plateformes IA vous donnent des outils. Unitalk vous donne une organisation qui travaille.',
    oldTitle: 'Les plateformes IA',
    oldTag: 'Ailleurs',
    newTitle: 'Unitalk',
    newTag: 'Chez vous',
    rows: [
      { old: 'Des assistants IA', neo: 'Des Collaborateurs IA' },
      { old: 'Des conversations', neo: 'Du travail réalisé' },
      { old: 'Des prompts', neo: 'Des missions' },
      { old: 'Des outils séparés', neo: 'Un seul workspace' },
      { old: 'Une IA isolée', neo: 'Une équipe hybride' },
      { old: 'Une mémoire par conversation', neo: 'Une mémoire d’entreprise' },
    ],
  },
  en: {
    eyebrow: 'The difference',
    title: 'Why Unitalk?',
    subtitle: 'AI platforms give you tools. Unitalk gives you an organization that works.',
    oldTitle: 'AI platforms',
    oldTag: 'Elsewhere',
    newTitle: 'Unitalk',
    newTag: 'With you',
    rows: [
      { old: 'AI assistants', neo: 'AI Collaborators' },
      { old: 'Conversations', neo: 'Work actually done' },
      { old: 'Prompts', neo: 'Missions' },
      { old: 'Separate tools', neo: 'A single workspace' },
      { old: 'An isolated AI', neo: 'A hybrid team' },
      { old: 'One memory per conversation', neo: 'A company memory' },
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionVersus({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-[#1C1A17] py-24 sm:py-32">
      <div className="editorial-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="flex justify-center">
            <Kicker dark>{t.eyebrow}</Kicker>
          </div>
          <h2 className="mt-4 text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-[#F3EFE6] sm:text-4xl md:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#B8B0A4]">{t.subtitle}</p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-5">
          {/* Old world */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8175]">{t.oldTag}</p>
            <h3 className="mt-2 font-sf text-2xl font-bold tracking-[-0.02em] text-[#B8B0A4]">{t.oldTitle}</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {t.rows.map((row) => (
                <li key={row.old} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#9B9388]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#B8B0A4]">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="line-through decoration-white/20">{row.old}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* New world */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[#D10E63]/40 bg-[#D10E63]/[0.08] p-6 shadow-[0_0_60px_-15px_rgba(209,14,99,0.5)] sm:p-8"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D10E63]/25 blur-3xl" />
            <p className="relative font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0658F]">{t.newTag}</p>
            <h3 className="relative mt-2 font-sf text-2xl font-bold tracking-[-0.02em] text-[#F3EFE6]">{t.newTitle}</h3>
            <ul className="relative mt-6 flex flex-col gap-4">
              {t.rows.map((row, i) => (
                <motion.li
                  key={row.neo}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-[#F3EFE6]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{row.neo}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

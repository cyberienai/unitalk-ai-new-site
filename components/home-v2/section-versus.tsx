'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const T = {
  fr: {
    eyebrow: 'La différence',
    title: 'Tout le monde vend un logiciel. Nous livrons un collègue.',
    subtitle: 'La catégorie « assistant IA » est saturée d’outils qui se ressemblent. Un Collaborateur IA joue dans une autre catégorie.',
    oldTitle: 'Un logiciel IA',
    oldTag: 'Ce que tout le monde vend',
    newTitle: 'Un Collaborateur IA',
    newTag: 'Ce que vous obtenez',
    rows: [
      { old: 'Vous payez par siège, par utilisateur', neo: 'Un seul abonnement pour toute l’organisation' },
      { old: 'Repart de zéro à chaque conversation', neo: 'Garde une identité et une mémoire durables' },
      { old: 'Appartient à l’éditeur du logiciel', neo: 'Appartient à votre organisation' },
      { old: 'Vous devez tout lui réexpliquer', neo: 'Connaît déjà votre métier et vos outils' },
      { old: 'Un outil de plus à piloter', neo: 'Un collègue à qui confier des missions' },
    ],
  },
  en: {
    eyebrow: 'The difference',
    title: 'Everyone sells software. We deliver a colleague.',
    subtitle: 'The “AI assistant” category is crowded with tools that all look alike. An AI Collaborator plays in a different league.',
    oldTitle: 'AI software',
    oldTag: 'What everyone sells',
    newTitle: 'An AI Collaborator',
    newTag: 'What you get',
    rows: [
      { old: 'You pay per seat, per user', neo: 'One subscription for the whole organization' },
      { old: 'Starts from scratch every conversation', neo: 'Keeps a lasting identity and memory' },
      { old: 'Belongs to the software vendor', neo: 'Belongs to your organization' },
      { old: 'You have to re-explain everything', neo: 'Already knows your business and tools' },
      { old: 'One more tool to operate', neo: 'A colleague you hand missions to' },
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionVersus({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-[#1C1A17] py-20 sm:py-28">
      <div className="editorial-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F0658F]">{t.eyebrow}</p>
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

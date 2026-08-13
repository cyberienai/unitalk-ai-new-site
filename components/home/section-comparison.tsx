'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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
    cta: 'Confier une mission',
    rows: [
      ['Exécute une tâche', 'Apprend votre façon de travailler'],
      ['Fonctionne dans son outil', 'Travaille avec vos applications'],
      ['Résultat ponctuel', 'Expérience conservée'],
      ['Un usage par agent', 'Une identité, plusieurs profils métier'],
      ['Décide seul ou s’arrête', 'Soumet les étapes sensibles à vos équipes'],
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'A mission accomplished.',
    titleAccent: 'An experience that stays.',
    lead: 'A generic AI agent produces a result. Your AI Collaborator keeps the experience you validate and can reuse it in its next missions.',
    beforeTitle: 'Generic AI agent',
    afterTitle: 'Unitalk AI Collaborator',
    cta: 'Assign a mission',
    rows: [
      ['Executes a task', 'Learns how your company works'],
      ['Works inside its own tool', 'Works with your applications'],
      ['One-off result', 'Experience retained'],
      ['One use case per agent', 'One identity, multiple job profiles'],
      ['Decides alone or stops', 'Submits sensitive steps to your teams'],
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

        {/* Discreet secondary CTA — channels the interest built by the table
            without competing with the hero's primary conversion. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mt-10"
        >
          <Link
            href="/decouvrir"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#B00C54] underline-offset-4 outline-none transition-colors hover:text-[#8F0A44] hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
          >
            {t.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

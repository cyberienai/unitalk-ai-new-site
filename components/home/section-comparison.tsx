'use client'

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
    lead: 'Un assistant IA vous aide à travailler. Votre Collaborateur IA réalise des missions pour votre entreprise, réutilise les méthodes validées et agit dans les outils autorisés.',
    statement: 'Vous ne construisez pas un assistant. Vous faites progresser votre Collaborateur IA.',
    beforeTitle: 'Assistant IA généraliste',
    afterTitle: 'Collaborateur IA Unitalk',
    cta: 'Décrire ma mission',
    rows: [
      ['Une conversation ponctuelle', 'Une identité professionnelle durable'],
      ['Une mémoire de session', 'Des méthodes validées réutilisables'],
      ['Un outil à piloter', 'Des missions suivies dans votre Workspace'],
      ['Des instructions à répéter', 'Des règles et validations enregistrées'],
      ['Des actions isolées', 'Une activité visible par votre équipe'],
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'A mission accomplished.',
    titleAccent: 'An experience that stays.',
    lead: 'An AI assistant helps you work. Your AI Collaborator completes missions for your company, reuses approved methods and acts inside authorized tools.',
    statement: 'You are not building an assistant. You are developing your AI Collaborator.',
    beforeTitle: 'General-purpose AI assistant',
    afterTitle: 'Unitalk AI Collaborator',
    cta: 'Describe my mission',
    rows: [
      ['A one-off conversation', 'A durable professional identity'],
      ['Session memory', 'Reusable approved methods'],
      ['A tool to operate', 'Missions tracked in your Workspace'],
      ['Instructions to repeat', 'Recorded rules and approvals'],
      ['Isolated actions', 'Activity visible to your team'],
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title} <span className="block text-[#D10E63]">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>
        <p className="mt-6 max-w-3xl border-l-2 border-[#D10E63] pl-5 font-sf text-xl font-semibold leading-8 tracking-[-0.025em] text-[#1C1A17] sm:text-2xl">{t.statement}</p>

        {/* The transforming lines */}
        <div className="mt-8 overflow-hidden rounded-lg border border-[#E4DDCE]">
          {/* Column headers */}
          <div className="hidden grid-cols-2 sm:grid">
            <div className="bg-[#EDE7DA] px-5 py-3.5 text-right">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#625B50]">{t.beforeTitle}</span>
            </div>
            <div className="bg-[#1C1A17] px-5 py-3.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#F3B4CF]">{t.afterTitle}</span>
            </div>
          </div>

          {t.rows.map(([before, after], i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="relative grid border-t border-[#E4DDCE] sm:grid-cols-2"
            >
              {/* left — warm, inert (text kept clear of the central seam) */}
              <div className="bg-[#EDE7DA]/70 px-5 py-4 sm:flex sm:items-center sm:justify-end sm:py-5 sm:pl-7 sm:pr-12 sm:text-right">
                <div><span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#625B50] sm:hidden">{t.beforeTitle}</span><p className="mt-1 text-[14px] leading-snug text-[#625B50] sm:mt-0 sm:text-[15px]">{before}</p></div>
              </div>
              {/* right — anthracite, owned (text kept clear of the central seam) */}
              <div className="bg-[#1C1A17] px-5 py-4 sm:flex sm:items-center sm:py-5 sm:pl-12 sm:pr-7">
                <div><span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#F3B4CF] sm:hidden">{t.afterTitle}</span><p className="mt-1 text-[14px] font-medium leading-snug text-[#F4F1EA] sm:mt-0 sm:text-[15px]">{after}</p></div>
              </div>

              {/* the mission thread node sitting on the seam — short ticks only */}
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
                <span className="relative flex items-center">
                  <span className="block h-px w-3 bg-gradient-to-r from-transparent to-[#D10E63]" />
                  <span className="block h-[10px] w-[10px] rounded-full bg-[#D10E63] ring-2 ring-[#F4F1EA]" />
                  <span className="block h-px w-3 bg-gradient-to-r from-[#D10E63] to-transparent" />
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Same Alma action, same visual language across the homepage. */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-home-alma'))}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-[15px] font-bold text-white outline-none transition-colors hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]"
          >
            {t.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { getMission, pick } from '@/components/discover/types'
import { useAlma } from '@/components/home/alma-panel-context'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const HOMEPAGE_SLUGS = ['relancer-les-factures-impayees', 'repondre-a-mes-clients', 'preparer-un-comite-de-direction']

/** One distinct outcome line per card — replaces the old duplicated
 *  description / "résultat attendu" pair. */
const BLURBS: Record<string, { fr: string; en: string }> = {
  'relancer-les-factures-impayees': {
    fr: 'Relances contextualisées, réponses classées et situations bloquées transmises à l’équipe.',
    en: 'Contextual reminders, filed replies, and blocked cases handed to your team.',
  },
  'repondre-a-mes-clients': {
    fr: 'Réponses rédigées dans votre ton, priorisées et cas délicats remontés avant envoi.',
    en: 'Replies drafted in your tone, prioritized, and tricky cases raised before sending.',
  },
  'preparer-un-comite-de-direction': {
    fr: 'Indicateurs réunis, dossier de décision préparé et points d’arbitrage signalés.',
    en: 'Indicators gathered, a decision file prepared, and trade-off points flagged.',
  },
}

const COPY = {
  fr: {
    kicker: 'Missions',
    title: 'Commencez par ce qu’il faut accomplir.',
    lead: 'Chaque mission part d’un besoin concret. Choisissez-en une : Alma la cadre avec vous, puis l’adapte à votre entreprise.',
    all: 'Explorer toutes les missions',
    precise: 'Confier cette mission',
  },
  en: {
    kicker: 'Missions',
    title: 'Start from what needs to get done.',
    lead: 'Every mission starts from a concrete need. Pick one: Alma frames it with you, then adapts it to your company.',
    all: 'Explore every mission',
    precise: 'Take on this mission',
  },
}

export function SectionMissions() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]
  const missions = HOMEPAGE_SLUGS.map((slug) => getMission(slug)).filter(Boolean)

  return (
    <section id="missions" className="border-t border-[#E7E0D2] bg-[#EFE9DD] px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Kicker>{t.kicker}</Kicker>
            <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>
          </div>
          <Link
            href="/missions"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#A80B50] transition-colors hover:text-[#D10E63]"
          >
            {t.all}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {missions.map((m, i) => {
            if (!m) return null
            return (
              <motion.button
                key={m.slug}
                type="button"
                onClick={() => openAlma(m.slug)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group flex h-full flex-col rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-7 text-left transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D10E63]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE9DD]"
              >
                <h3 className="text-balance text-xl font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
                  {pick(m.title, lang)}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-[#5A5348]">
                  {BLURBS[m.slug]?.[lang] ?? pick(m.description, lang)}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#A80B50]">
                  {t.precise}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

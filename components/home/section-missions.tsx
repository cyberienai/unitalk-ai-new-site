'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { getMission, pick } from '@/components/discover/types'
import { MISSION_CATEGORIES } from '@/lib/missions-catalog'
import { useAlma } from '@/components/home/alma-panel-context'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const HOMEPAGE_SLUGS = ['relancer-les-factures-impayees', 'repondre-a-mes-clients', 'preparer-un-comite-de-direction']

const COPY = {
  fr: {
    kicker: 'Missions',
    title: 'Commencez par ce qu’il faut accomplir.',
    lead: 'Chaque mission part d’un besoin concret. Choisissez-en une : Alma la cadre avec vous, puis l’adapte à votre entreprise.',
    all: 'Explorer toutes les missions',
    precise: 'Préciser avec Alma',
    result: 'Résultat attendu',
  },
  en: {
    kicker: 'Missions',
    title: 'Start from what needs to get done.',
    lead: 'Every mission starts from a concrete need. Pick one: Alma frames it with you, then adapts it to your company.',
    all: 'Explore every mission',
    precise: 'Refine with Alma',
    result: 'Expected outcome',
  },
}

function categoryLabel(key: string, lang: 'fr' | 'en') {
  const cat = MISSION_CATEGORIES.find((c) => c.key === key)
  return cat ? pick(cat.label, lang) : key
}

export function SectionMissions() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]
  const missions = HOMEPAGE_SLUGS.map((slug) => getMission(slug)).filter(Boolean)

  return (
    <section id="missions" className="border-t border-[#E7E0D2] bg-[#EFE9DD] px-6 py-24 sm:py-32">
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
                className="group flex h-full flex-col rounded-3xl border border-[#E4DDCE] bg-[#F7F4ED] p-7 text-left transition-all hover:-translate-y-1 hover:border-[#D10E63]/40 hover:shadow-[0_20px_40px_-28px_rgba(28,26,23,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE9DD]"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#A80B50]">
                  {categoryLabel(m.category, lang)}
                </span>
                <h3 className="mt-4 text-balance text-xl font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">
                  {pick(m.title, lang)}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-[14px] leading-relaxed text-[#6B6459]">
                  {pick(m.description, lang)}
                </p>
                <span className="mt-6 border-t border-[#E7E0D2] pt-4">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9184]">
                    {t.result}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-snug text-[#3B362F]">{pick(m.result, lang)}</span>
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#A80B50]">
                  {t.precise}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

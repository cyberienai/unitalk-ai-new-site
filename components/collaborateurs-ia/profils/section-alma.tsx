'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { Kicker } from '@/components/home/section-kicker'
import { SpecCard, type SpecRow } from '../lucas-card'

const COPY = {
  fr: {
    kicker: 'Alma',
    title: 'Décrivez la responsabilité à confier.',
    lead: 'Alma clarifie le rôle, les résultats attendus et les décisions qui doivent rester humaines. Elle recherche ensuite le profil métier le plus proche ou prépare une variante adaptée à votre entreprise.',
    cta: 'Parler à Alma',
    write: 'Je préfère écrire',
    exampleEyebrow: 'Exemple',
    example: 'Je veux que Lucas prenne en charge la fidélisation des clients après une réclamation.',
    respTitle: 'Chargé de fidélisation',
    respEyebrow: 'Responsabilités',
    resp: [
      { label: 'Suivre les clients après résolution' },
      { label: 'Détecter les risques de départ' },
      { label: 'Préparer les actions de fidélisation' },
    ] as SpecRow[],
    resultEyebrow: 'Résultats attendus',
    result: [
      { label: 'Chaque client sensible a une prochaine action' },
      { label: 'Les cas à risque sont remontés à Sophie' },
    ] as SpecRow[],
    validEyebrow: 'Validations',
    valid: [{ label: 'Sophie valide tout geste commercial', status: 'Humain', tone: 'owner' }] as SpecRow[],
    adapt: 'Adapter à mon entreprise',
    demo: 'Voir Alma en action · 45 s',
  },
  en: {
    kicker: 'Alma',
    title: 'Describe the responsibility to hand over.',
    lead: 'Alma clarifies the role, the expected outcomes and the decisions that must stay human. She then looks for the closest job profile or prepares a variant adapted to your company.',
    cta: 'Talk to Alma',
    write: 'I’d rather type',
    exampleEyebrow: 'Example',
    example: 'I want Lucas to take on customer retention after a complaint.',
    respTitle: 'Retention officer',
    respEyebrow: 'Responsibilities',
    resp: [
      { label: 'Follow up on customers after resolution' },
      { label: 'Detect churn risks' },
      { label: 'Prepare retention actions' },
    ] as SpecRow[],
    resultEyebrow: 'Expected outcomes',
    result: [
      { label: 'Every sensitive customer has a next action' },
      { label: 'At-risk cases are escalated to Sophie' },
    ] as SpecRow[],
    validEyebrow: 'Validations',
    valid: [{ label: 'Sophie approves any commercial gesture', status: 'Human', tone: 'owner' }] as SpecRow[],
    adapt: 'Adapt to my company',
    demo: 'Watch Alma in action · 45s',
  },
} as const

export function SectionAlma() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="alma" className="border-b border-[#E7E0D2] bg-[#EFE9DD] px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left — the ask */}
        <div>
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFE9DD]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => openAlma()}
              className="inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
            >
              {t.write}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#E4DDCE] bg-[#F7F4ED] px-4 py-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A89C88]">{t.exampleEyebrow}</p>
            <p className="mt-1 text-[15px] italic leading-relaxed text-[#4E483F]">{`“${t.example}”`}</p>
          </div>
        </div>

        {/* Right — the structured object, built live */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <SpecCard eyebrow={t.respEyebrow} title={t.respTitle} rows={t.resp} accent />
          <SpecCard eyebrow={t.resultEyebrow} rows={t.result} />
          <SpecCard eyebrow={t.validEyebrow} rows={t.valid} />
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54]"
            >
              {t.adapt}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => openAlma()}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
            >
              <Play className="h-3.5 w-3.5" />
              {t.demo}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

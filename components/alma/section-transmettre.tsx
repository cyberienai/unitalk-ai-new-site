'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { SpecCard, type SpecRow } from '@/components/collaborateurs-ia/lucas-card'

const COPY = {
  fr: {
    kicker: 'Support · Experts',
    title: 'Quand Alma atteint sa limite, un humain reprend avec le contexte.',
    lead: 'Une intégration complexe, un incident ou une transformation plus large peut nécessiter un expert ou le support Unitalk. Avec votre accord, Alma transmet les informations déjà confirmées.',
    fileEyebrow: 'Dossier transmis',
    rows: [
      { label: 'Besoin', value: 'Suivi complet des réclamations' },
      { label: 'Contexte confirmé', value: 'Méthode de Sophie · validation de Marc' },
      { label: 'Applications', value: 'CRM · agenda partagé' },
      { label: 'Blocage', value: 'Connexion au système de facturation privé' },
      { label: 'Action attendue', value: 'Vérifier l’intégration et les droits nécessaires' },
    ] as SpecRow[],
    handover: 'L’expert reçoit les éléments déjà validés et intervient sans vous demander de tout réexpliquer.',
    conclusion: 'Vous ne recommencez pas votre explication.',
    link: 'Découvrir les experts Unitalk',
  },
  en: {
    kicker: 'Support · Experts',
    title: 'When Alma reaches its limit, a human takes over with the context.',
    lead: 'A complex integration, an incident or a broader transformation may require an expert or Unitalk support. With your consent, Alma passes on the information already confirmed.',
    fileEyebrow: 'Handover file',
    rows: [
      { label: 'Need', value: 'End-to-end complaint tracking' },
      { label: 'Confirmed context', value: 'Sophie’s method · Marc’s validation' },
      { label: 'Applications', value: 'CRM · shared calendar' },
      { label: 'Blocker', value: 'Connection to the private billing system' },
      { label: 'Expected action', value: 'Check the integration and the required rights' },
    ] as SpecRow[],
    handover: 'The expert receives the elements already validated and steps in without asking you to explain everything again.',
    conclusion: 'You do not start your explanation over.',
    link: 'Discover Unitalk experts',
  },
} as const

export function SectionTransmettre() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="transmettre" className="scroll-mt-24 border-b border-black/20 bg-[#1C1A17] px-6 py-20 text-[#F4F1EA] sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#E4B96B]">{t.kicker}</p>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#F4F1EA] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#B8B0A4]">{t.lead}</p>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SpecCard eyebrow={t.fileEyebrow} rows={t.rows} dark accent />
          </motion.div>

          <div className="flex flex-col gap-6">
            <p className="text-pretty text-[16px] leading-relaxed text-[#D8D1C5]">{t.handover}</p>

            <p className="flex items-start gap-2 text-[17px] font-semibold leading-relaxed text-[#F4F1EA]">
              <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[#5FD3A0]" />
              <span className="text-pretty">{t.conclusion}</span>
            </p>

            <Link
              href="/experts"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#F2BCD3] transition-colors hover:text-[#F4F1EA]"
            >
              {t.link}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

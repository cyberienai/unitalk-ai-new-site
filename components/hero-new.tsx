'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { OrgChartMockup } from './product-mockups'

const T = {
  fr: {
    eyebrow: "L'IA entre dans votre organigramme.",
    headline: 'Augmentez les capacités de votre entreprise.',
    headlineAccent: ' Pas vos effectifs.',
    lead: [
      "La seule limite que les entreprises rencontrent : leurs capacités. Aujourd'hui, il existe une nouvelle façon de développer une entreprise sans recruter davantage.",
    ],
    heroCta: 'Ajouter mon Collaborateur IA',
    heroCtaSecondary: 'Analyse gratuite',
    heroProofs: ['Aucune configuration', 'Sans engagement', 'Prêt en quelques minutes'],
    orgTitle: 'Votre organisation',
  },
  en: {
    eyebrow: 'AI joins your org chart.',
    headline: 'Grow your company capabilities.',
    headlineAccent: ' Not your headcount.',
    lead: [
      'The only limit companies hit: their capacity. Today, there is a new way to grow a company without hiring more.',
    ],
    heroCta: 'Add my AI Collaborator',
    heroCtaSecondary: 'Free analysis',
    heroProofs: ['No setup', 'No commitment', 'Ready in minutes'],
    orgTitle: 'Your organization',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroNew({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#F3EFE6] pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div className="flex min-w-0 max-w-2xl flex-col items-start">
          <motion.p
            className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: 0.05 }}
          >
            {t.eyebrow}
          </motion.p>

          <motion.h1
            className="font-sf max-w-3xl text-balance font-bold text-[#1C1A17]"
            style={{ fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)', lineHeight: 1, letterSpacing: '-0.05em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.08 }}
          >
            {t.headline}
            <span className="text-[#D10E63]">{t.headlineAccent}</span>
          </motion.h1>

          <motion.div
            className="mt-6 flex max-w-xl flex-col gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
          >
            {t.lead.map((paragraph) => (
              <p key={paragraph} className="text-pretty font-sans text-base leading-relaxed text-[#4E483F]">{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-start gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.26 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 py-3 text-center text-sm font-bold text-[#FBF9F3] shadow-[0_12px_30px_rgba(209,14,99,0.2)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.heroCta}
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9C0B2] bg-[#FBF9F3] px-6 py-3 text-center text-sm font-bold text-[#1C1A17] transition-colors hover:border-[#D10E63] hover:text-[#D10E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
              >
                {t.heroCtaSecondary}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#6B6560]">
              {t.heroProofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          aria-label={t.orgTitle}
        >
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#D10E63]/[0.05] blur-2xl" />
          <div aria-hidden="true" className="bg-dots pointer-events-none absolute -right-4 -top-6 -z-10 h-28 w-28 rounded-2xl opacity-70" />
          <OrgChartMockup lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}

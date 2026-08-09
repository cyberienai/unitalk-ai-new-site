'use client'

import { useLanguage } from '@/lib/language-context'
import { motion } from 'framer-motion'

const COPY = {
  fr: {
    kicker: 'Mission après mission',
    title: 'Votre entreprise devient plus capable. Mission après mission.',
    ownTitle: 'Votre intelligence vous appartient.',
    ownBody:
      'Votre Collaborateur IA développe des compétences à partir des méthodes que vous validez. Votre mémoire, vos données et vos savoir-faire restent sous votre contrôle.',
  },
  en: {
    kicker: 'Mission after mission',
    title: 'Your company becomes more capable. Mission after mission.',
    ownTitle: 'Your intelligence belongs to you.',
    ownBody:
      'Your AI Collaborator builds skills from the methods you validate. Your memory, your data and your know-how stay under your control.',
  },
}

export function SectionVision() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-t border-[#2A2723] bg-[#161412] px-6 py-16 sm:py-24">
      {/* single quiet magenta thread anchoring the dark scene */}
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#D10E63] to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8A0BE]">{t.kicker}</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#F4F1EA] sm:text-5xl md:text-6xl"
        >
          {t.title}
        </motion.h2>

        <p className="mt-10 text-balance font-sf text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#F4F1EA] sm:text-3xl">
          <span className="text-[#E8A0BE]">{t.ownTitle}</span>
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#B8B0A4] sm:text-base">
          {t.ownBody}
        </p>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown, Mic } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { SpecCard, Conclusion, type SpecRow } from '@/components/collaborateurs-ia/lucas-card'

const COPY = {
  fr: {
    eyebrow: 'Alma · Unitalk',
    title: 'Parlez à Alma. Le travail prend forme.',
    lead: 'Alma comprend votre besoin, apprend comment votre entreprise travaille et prépare le Collaborateur IA, les savoir-faire et les accès nécessaires.',
    cta: 'Parler à Alma',
    secondary: 'Voir Alma préparer une mission',
    micro: 'Voix ou écrit · Aucun micro activé sans votre accord',
    speaker: 'Sophie',
    speakerRole: 'Responsable relation client',
    quote: 'Je veux que chaque réclamation client soit suivie jusqu’à sa résolution.',
    missionEyebrow: 'Alma structure la mission',
    rows: [
      { label: 'Mission', value: 'Suivre chaque réclamation jusqu’à sa résolution' },
      { label: 'Résultat attendu', value: 'Un état, une prochaine action, une date de relance' },
      { label: 'Règles', value: 'Vérifier le dossier après chaque appel · relancer sous 3 jours' },
      { label: 'Validation', value: 'Accord de Sophie avant tout geste commercial' },
    ] as SpecRow[],
    almaReply: 'La mission est claire. Je vérifie maintenant qui peut la prendre en charge.',
    conclusion: 'Un besoin exprimé. Une mission prête.',
  },
  en: {
    eyebrow: 'Alma · Unitalk',
    title: 'Talk to Alma. The work takes shape.',
    lead: 'Alma understands your need, learns how your company works and prepares the AI Collaborator, the know-how and the access it requires.',
    cta: 'Talk to Alma',
    secondary: 'See Alma prepare a mission',
    micro: 'Voice or text · No microphone activated without your consent',
    speaker: 'Sophie',
    speakerRole: 'Customer relations lead',
    quote: 'I want every customer complaint to be followed through to resolution.',
    missionEyebrow: 'Alma structures the mission',
    rows: [
      { label: 'Mission', value: 'Follow every complaint through to resolution' },
      { label: 'Expected outcome', value: 'A status, a next action, a follow-up date' },
      { label: 'Rules', value: 'Check the case after each call · follow up within 3 days' },
      { label: 'Validation', value: 'Sophie’s approval before any commercial gesture' },
    ] as SpecRow[],
    almaReply: 'The mission is clear. I’m now checking who can take it on.',
    conclusion: 'A need expressed. A mission ready.',
  },
} as const

export function AlmaHero() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-b border-[#E7E0D2] bg-[#F3EFE6] px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        {/* Left — the promise */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/images/alma-mark.png" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-lg" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.eyebrow}</span>
          </div>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl md:text-[3.3rem]"
          >
            {t.title}
          </motion.h1>
          <p className="mt-6 max-w-lg text-pretty text-[17px] leading-relaxed text-[#5A5348] md:text-[18px]">{t.lead}</p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#comprendre"
              className="group inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold text-[#4E483F] transition-colors hover:text-[#1C1A17]"
            >
              {t.secondary}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-[13px] text-[#857C6E]">
            <Mic aria-hidden className="h-3.5 w-3.5" />
            {t.micro}
          </p>
        </div>

        {/* Right — the demo: speech becomes a structured mission */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.speaker} · {t.speakerRole}</span>
            </div>
            <p className="mt-2 text-pretty text-[17px] font-medium leading-snug text-[#1C1A17]">“{t.quote}”</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SpecCard eyebrow={t.missionEyebrow} rows={t.rows} accent />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-start gap-2.5 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4"
          >
            <Image src="/images/alma-mark.png" alt="Alma" width={28} height={28} className="h-7 w-7 shrink-0 rounded-md" />
            <p className="text-[14px] leading-relaxed text-[#4E483F]">{t.almaReply}</p>
          </motion.div>

          <Conclusion>{t.conclusion}</Conclusion>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { SpecCard, Conclusion, type SpecRow } from '@/components/collaborateurs-ia/lucas-card'

const COPY = {
  fr: {
    kicker: 'Entreprise · Sources · Équipes',
    title: 'Votre entreprise sait plus que ce qu’elle a écrit.',
    lead: 'Alma analyse les sources que vous lui indiquez et échange avec les personnes concernées pour comprendre les méthodes, les exceptions et les décisions importantes.',
    procTitle: 'Ce que la procédure indique',
    proc: 'Relancer le client trois jours après l’ouverture d’une réclamation.',
    sophieTitle: 'Ce que Sophie précise',
    sophie: 'Nous vérifions d’abord si un geste commercial a déjà été proposé. Au-delà de 10 %, Marc doit valider.',
    structEyebrow: 'Ce qu’Alma structure',
    rows: [
      { label: 'Règle', value: 'Vérifier les gestes commerciaux déjà proposés' },
      { label: 'Limite', value: 'Aucun geste supérieur à 10 % sans validation' },
      { label: 'Valideur', value: 'Marc · Direction commerciale' },
    ] as SpecRow[],
    actions: ['Confirmer', 'Corriger', 'Ne pas conserver'],
    conclusion: 'Alma documente le travail, pas la performance des personnes.',
  },
  en: {
    kicker: 'Company · Sources · Teams',
    title: 'Your company knows more than it has written down.',
    lead: 'Alma analyzes the sources you point it to and talks with the people involved to understand the methods, the exceptions and the important decisions.',
    procTitle: 'What the procedure says',
    proc: 'Follow up with the customer three days after a complaint is opened.',
    sophieTitle: 'What Sophie clarifies',
    sophie: 'We first check whether a commercial gesture has already been offered. Above 10%, Marc must approve.',
    structEyebrow: 'What Alma structures',
    rows: [
      { label: 'Rule', value: 'Check commercial gestures already offered' },
      { label: 'Limit', value: 'No gesture above 10% without approval' },
      { label: 'Approver', value: 'Marc · Sales management' },
    ] as SpecRow[],
    actions: ['Confirm', 'Correct', 'Do not keep'],
    conclusion: 'Alma documents the work, not people’s performance.',
  },
} as const

export function SectionComprendre() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="comprendre" className="scroll-mt-24 border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#5A5348]">{t.lead}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.procTitle}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4E483F]">{t.proc}</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.sophieTitle}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#1C1A17]">{t.sophie}</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <SpecCard eyebrow={t.structEyebrow} rows={t.rows} accent />
          </motion.div>
        </div>

        {/* Non-functional, illustrative controls */}
        <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
          {t.actions.map((a, i) => (
            <span
              key={a}
              className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[13px] font-medium ${
                i === 0
                  ? 'border-[#D10E63]/30 bg-[#D10E63]/[0.06] text-[#B00C54]'
                  : 'border-[#E1D9C9] bg-[#FBF9F3] text-[#6B6459]'
              }`}
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-8 max-w-2xl">
          <Conclusion>{t.conclusion}</Conclusion>
        </div>
      </div>
    </section>
  )
}

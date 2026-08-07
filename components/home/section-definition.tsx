'use client'

import { motion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'

/**
 * DEFINITION — three large statements revealed in sequence as you scroll, each
 * with one minimal proof, closing on the line that the know-how stays inside
 * your company. Quiet typography; no decoration.
 */

const T = {
  fr: {
    lines: [
      { big: 'Vous parlez à Alma.', proof: 'Une mission structurée : objectif, rythme, validations.' },
      { big: 'Votre Collaborateur IA accomplit le travail.', proof: 'Dans votre Workspace, avec vos accès et vos règles.' },
      { big: 'Chaque mission développe son savoir-faire.', proof: 'Profils métier, compétences et applications qui s’accumulent.' },
    ],
    closing: 'Ce savoir-faire reste dans votre entreprise.',
  },
  en: {
    lines: [
      { big: 'You talk to Alma.', proof: 'A structured mission: objective, cadence, validations.' },
      { big: 'Your AI Collaborator does the work.', proof: 'In your Workspace, with your access and your rules.' },
      { big: 'Every mission grows its know-how.', proof: 'Job profiles, skills and applications that accumulate.' },
    ],
    closing: 'That know-how stays inside your company.',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  return (
    <section className="bg-[#F3EFE6] py-24 sm:py-32">
      <div className="editorial-shell max-w-3xl">
        <ol className="flex flex-col gap-16 sm:gap-20">
          {t.lines.map((line, i) => (
            <motion.li
              key={line.big}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="font-mono text-[13px] font-bold text-[#D10E63]">{`0${i + 1}`}</span>
              <p className="mt-3 text-balance font-sf text-[clamp(1.9rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[#1C1A17]">
                {line.big}
              </p>
              <p className="mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-[#4E483F]">{line.proof}</p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mt-16 border-t border-[#DcD4C4] pt-8 text-balance font-sf text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-snug tracking-[-0.02em] text-[#1C1A17] sm:mt-20"
        >
          {t.closing}
        </motion.p>
      </div>
    </section>
  )
}

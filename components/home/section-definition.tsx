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
      { big: 'Vous parlez à Alma.', proof: 'Elle précise l’objectif, les règles et les validations.' },
      { big: 'Votre Collaborateur IA accomplit le travail.', proof: 'Dans votre Workspace, avec les accès et les limites que vous avez définis.' },
      { big: 'Il développe son savoir-faire au fil des missions.', proof: 'Les méthodes validées peuvent devenir des compétences réutilisables.' },
    ],
    closing: 'Ce savoir-faire reste dans votre entreprise.',
  },
  en: {
    lines: [
      { big: 'You talk to Alma.', proof: 'She sets the objective, the rules and the validations.' },
      { big: 'Your AI Collaborator does the work.', proof: 'In your Workspace, with the access and limits you have defined.' },
      { big: 'It builds its know-how over the missions.', proof: 'Validated methods can become reusable skills.' },
    ],
    closing: 'That know-how stays inside your company.',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  return (
    <section className="bg-[#F3EFE6] py-16 sm:py-24">
      <div className="editorial-shell max-w-3xl">
        <ol className="flex flex-col gap-12 sm:gap-14">
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
          className="mt-12 border-t border-[#DcD4C4] pt-8 text-balance font-sf text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-snug tracking-[-0.02em] text-[#1C1A17] sm:mt-14"
        >
          {t.closing}
        </motion.p>
      </div>
    </section>
  )
}

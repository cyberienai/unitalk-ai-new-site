'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'

/**
 * THE DIFFERENCE — no crosses vs checks, the most generic SaaS comparison there
 * is. Four lines that TRANSFORM from left to right: a warm, inert column becomes
 * an anthracite, owned one, with the magenta mission thread crossing each line.
 * No pictograms.
 */

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Un agent applique une méthode standard.',
    titleAccent: 'Unitalk transforme la vôtre en compétence réutilisable.',
    lead: 'Les agents prêts à l’emploi sont devenus performants. La vraie différence ne se joue plus sur la capacité brute, mais sur ce qui vous appartient : la méthode, l’identité et l’expérience accumulée.',
    beforeTitle: 'Un agent prêt à l’emploi',
    afterTitle: 'Un Collaborateur IA Unitalk',
    rows: [
      ['Méthode standard', 'Méthode propre à votre entreprise'],
      ['Compétence identique pour tous', 'Compétence testée et versionnée'],
      ['Agent lié à une fonction', 'Identité persistante, profils évolutifs'],
      ['Résultat produit', 'Expérience conservée dans le Workspace'],
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'An off-the-shelf agent applies a standard method.',
    titleAccent: 'Unitalk turns yours into a reusable skill.',
    lead: 'Off-the-shelf agents have become capable. The real difference is no longer raw capability, but what belongs to you: the method, the identity and the experience you accumulate.',
    beforeTitle: 'An off-the-shelf agent',
    afterTitle: 'A Unitalk AI Collaborator',
    rows: [
      ['Standard method', 'A method specific to your company'],
      ['The same skill for everyone', 'A tested and versioned skill'],
      ['Agent tied to a function', 'Persistent identity, evolving profiles'],
      ['A result produced', 'Experience kept in your Workspace'],
    ],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title} <span className="text-[#D10E63]">{t.titleAccent}</span>
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        {/* The transforming lines */}
        <div className="mt-10 overflow-hidden rounded-lg border border-[#E4DDCE]">
          {/* Column headers */}
          <div className="grid grid-cols-2">
            <div className="bg-[#EDE7DA] px-5 py-3.5 text-right">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A9184]">{t.beforeTitle}</span>
            </div>
            <div className="bg-[#1C1A17] px-5 py-3.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8A0BE]">{t.afterTitle}</span>
            </div>
          </div>

          {t.rows.map(([before, after], i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              className="relative grid grid-cols-2 border-t border-[#E4DDCE]"
            >
              {/* left — warm, inert */}
              <div className="flex items-center justify-end bg-[#EDE7DA]/70 px-5 py-5 text-right sm:px-7">
                <p className="text-[14px] leading-snug text-[#857C6E] sm:text-[15px]">{before}</p>
              </div>
              {/* right — anthracite, owned */}
              <div className="flex items-center bg-[#1C1A17] px-5 py-5 sm:px-7">
                <p className="text-[14px] font-medium leading-snug text-[#F4F1EA] sm:text-[15px]">{after}</p>
              </div>

              {/* the mission thread crossing the line, node on the seam */}
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex items-center">
                  <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#D10E63] sm:w-12" />
                  <span className="block h-[9px] w-[9px] rounded-full bg-[#D10E63] ring-4 ring-[#1C1A17]/0" />
                  <span className="block h-px w-8 bg-gradient-to-r from-[#D10E63] to-[#D10E63]/30 sm:w-12" />
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

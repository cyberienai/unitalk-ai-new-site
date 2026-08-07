'use client'

import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const COPY = {
  fr: {
    kicker: 'La différence',
    title: 'Un outil s’utilise. Un Collaborateur IA s’en occupe.',
    lead: 'La plupart des IA attendent une consigne, produisent une réponse, puis oublient. Un Collaborateur IA garde le contexte, agit dans la durée et progresse à chaque mission.',
    beforeTitle: 'Un assistant classique',
    afterTitle: 'Un Collaborateur IA',
    before: [
      'Repart de zéro à chaque échange',
      'N’a aucun accès à vos outils',
      'Ne retient ni vos règles ni votre ton',
      'S’arrête dès que vous fermez la fenêtre',
    ],
    after: [
      'Garde le contexte de votre entreprise',
      'Agit dans vos outils, avec vos accès',
      'Applique vos règles et votre langage',
      'Accumule un savoir-faire mission après mission',
    ],
  },
  en: {
    kicker: 'The difference',
    title: 'A tool gets used. An AI Collaborator takes care of it.',
    lead: 'Most AIs wait for an instruction, produce an answer, then forget. An AI Collaborator keeps the context, acts over time, and grows with every mission.',
    beforeTitle: 'A classic assistant',
    afterTitle: 'An AI Collaborator',
    before: [
      'Starts from scratch every exchange',
      'Has no access to your tools',
      'Remembers neither your rules nor your tone',
      'Stops the moment you close the window',
    ],
    after: [
      'Keeps your company’s context',
      'Acts inside your tools, with your access',
      'Applies your rules and your language',
      'Builds know-how mission after mission',
    ],
  },
}

export function SectionComparison() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <section className="border-t border-[#E7E0D2] bg-[#F4F1EA] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl md:text-5xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#6B6459] sm:text-base">{t.lead}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Before — muted, inert */}
          <div className="rounded-3xl border border-[#E4DDCE] bg-[#EDE7DA]/60 p-7">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9A9184]">{t.beforeTitle}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {t.before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-[#857C6E]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#CFC6B4]">
                    <X className="h-3 w-3 text-[#9A9184]" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After — alive, magenta-accented */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[#1C1A17] bg-[#1C1A17] p-7"
          >
            <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] bg-[#D10E63]" />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8A0BE]">{t.afterTitle}</p>
            <ul className="mt-6 flex flex-col gap-4">
              {t.after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-snug text-[#F4F1EA]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

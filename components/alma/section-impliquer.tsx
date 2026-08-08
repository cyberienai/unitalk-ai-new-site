'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { Conclusion } from '@/components/collaborateurs-ia/lucas-card'

const COPY = {
  fr: {
    kicker: 'Information · Validation · Adoption',
    title: 'Chacun sait ce qui change et ce qui reste humain.',
    lead: 'Alma explique la mission aux personnes concernées, recueille leurs corrections et rend visibles les décisions qui devront toujours leur revenir.',
    cardEyebrow: 'Message préparé par Alma',
    missionLabel: 'Mission',
    mission: 'Suivre les réclamations jusqu’à leur résolution.',
    groups: [
      {
        title: 'Ce que Lucas pourra faire',
        tone: 'can',
        items: ['consulter le dossier client', 'classer la réclamation', 'préparer une réponse', 'planifier une relance'],
      },
      {
        title: 'Ce qu’il devra faire valider',
        tone: 'validate',
        items: ['tout geste commercial supérieur à 10 %', 'toute clôture d’un dossier litigieux'],
      },
      {
        title: 'Ce qui ne change pas',
        tone: 'stays',
        items: ['Sophie reste responsable de la relation client', 'Marc conserve les décisions commerciales sensibles'],
      },
    ],
    actions: ['Valider le cadre', 'Proposer une correction'],
    conclusion: 'L’IA prend en charge le travail. Les humains gardent les décisions importantes.',
  },
  en: {
    kicker: 'Information · Validation · Adoption',
    title: 'Everyone knows what changes and what stays human.',
    lead: 'Alma explains the mission to the people involved, gathers their corrections and makes visible the decisions that must always remain theirs.',
    cardEyebrow: 'Message prepared by Alma',
    missionLabel: 'Mission',
    mission: 'Follow complaints through to their resolution.',
    groups: [
      {
        title: 'What Lucas will be able to do',
        tone: 'can',
        items: ['view the customer case', 'classify the complaint', 'prepare a reply', 'schedule a follow-up'],
      },
      {
        title: 'What it will have to get validated',
        tone: 'validate',
        items: ['any commercial gesture above 10%', 'any closure of a disputed case'],
      },
      {
        title: 'What does not change',
        tone: 'stays',
        items: ['Sophie remains responsible for the customer relationship', 'Marc keeps sensitive commercial decisions'],
      },
    ],
    actions: ['Validate the scope', 'Suggest a correction'],
    conclusion: 'AI takes on the work. Humans keep the important decisions.',
  },
} as const

const TONE_DOT: Record<string, string> = {
  can: 'bg-[#22A06B]',
  validate: 'bg-[#C68A2E]',
  stays: 'bg-[#1C1A17]',
}

export function SectionImpliquer() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const t = COPY[lang]

  return (
    <section id="impliquer" className="scroll-mt-24 border-b border-[#E7E0D2] bg-[#F4F1EA] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Kicker>{t.kicker}</Kicker>
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#1C1A17] sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#5A5348]">{t.lead}</p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3]"
        >
          <div className="flex items-center gap-2.5 border-b border-[#EDE6D9] px-6 py-4">
            <Image src="/images/alma-mark.png" alt="Alma" width={26} height={26} className="h-[26px] w-[26px] rounded-md" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.cardEyebrow}</span>
          </div>

          <div className="px-6 py-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89C88]">{t.missionLabel}</p>
            <p className="mt-1 text-[16px] font-medium text-[#1C1A17]">{t.mission}</p>
          </div>

          <div className="grid gap-px bg-[#EDE6D9] md:grid-cols-3">
            {t.groups.map((g) => (
              <div key={g.title} className="bg-[#FBF9F3] px-6 py-5">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-[#1C1A17]">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[g.tone]}`} />
                  {g.title}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="text-[14px] leading-relaxed text-[#4E483F]">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

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

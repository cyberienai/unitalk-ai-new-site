'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Target, Sparkles, CalendarClock, ScrollText, ShieldCheck } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import type { MissionDraft } from '@/lib/mission-draft'

/**
 * The living mission fiche (right panel). It is never empty: at rest it shows a
 * mission "in preparation" with five ghosted sections; as Alma understands the
 * request, each section fills with a gentle fade + rose highlight. When the
 * essentials are known it flips to "ready to be adapted" with the handoff CTA.
 */

export type FicheShown = {
  objective?: boolean
  result?: boolean
  rythme?: boolean
  cadre?: number // number of visible cadre items
  validations?: number // number of visible validation items
}

type SectionDef = {
  key: 'objective' | 'result' | 'rythme' | 'cadre' | 'validations'
  label: { fr: string; en: string }
  help: { fr: string; en: string }
  icon: typeof Target
}

const SECTIONS: SectionDef[] = [
  {
    key: 'objective',
    label: { fr: 'Ce qu’il faut accomplir', en: 'What to accomplish' },
    help: { fr: 'L’objectif que vous souhaitez confier.', en: 'The goal you want to hand off.' },
    icon: Target,
  },
  {
    key: 'result',
    label: { fr: 'Résultat attendu', en: 'Expected result' },
    help: { fr: 'Ce qui devra être obtenu ou livré.', en: 'What must be achieved or delivered.' },
    icon: Sparkles,
  },
  {
    key: 'rythme',
    label: { fr: 'Rythme', en: 'Rhythm' },
    help: { fr: 'La fréquence ou l’échéance de la mission.', en: 'The mission’s frequency or deadline.' },
    icon: CalendarClock,
  },
  {
    key: 'cadre',
    label: { fr: 'Règles', en: 'Rules' },
    help: { fr: 'Les limites et modalités déjà connues.', en: 'The known boundaries and terms.' },
    icon: ScrollText,
  },
  {
    key: 'validations',
    label: { fr: 'Validations', en: 'Validations' },
    help: { fr: 'Les actions qui devront être confirmées par une personne.', en: 'Actions a person must confirm.' },
    icon: ShieldCheck,
  },
]

export function MissionDraftFiche({
  draft,
  shown,
  justAdded,
  ready,
  lang,
  onAdapt,
  onContinue,
}: {
  draft: MissionDraft | null
  shown: FicheShown
  justAdded: string | null
  ready: boolean
  lang: Lang
  onAdapt: () => void
  onContinue: () => void
}) {
  const reduce = useReducedMotion()

  const t = {
    prep: lang === 'fr' ? 'Mission en préparation' : 'Mission in preparation',
    prepTitle: lang === 'fr' ? 'Votre mission prendra forme ici.' : 'Your mission will take shape here.',
    ready: lang === 'fr' ? 'Mission prête à être adaptée' : 'Mission ready to be adapted',
    footnote:
      lang === 'fr'
        ? 'Parlez naturellement. Alma s’occupe de structurer le travail.'
        : 'Speak naturally. Alma takes care of structuring the work.',
    nextStep: lang === 'fr' ? 'Prochaine étape' : 'Next step',
    nextBody:
      lang === 'fr'
        ? 'Alma va adapter cette mission au contexte de votre entreprise.'
        : 'Alma will adapt this mission to your company’s context.',
    adapt: lang === 'fr' ? 'Adapter à mon entreprise' : 'Adapt to my company',
    keepGoing: lang === 'fr' ? 'Continuer à préciser avec Alma' : 'Keep refining with Alma',
  }

  // Enter animation for a value that has just appeared.
  const appear = (highlighted: boolean) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 7 },
          animate: {
            opacity: 1,
            y: 0,
            backgroundColor: highlighted
              ? ['rgba(209,14,99,0.12)', 'rgba(209,14,99,0)']
              : 'rgba(209,14,99,0)',
          },
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, backgroundColor: { duration: 1.25 } },
        }

  const hasValue = (key: string) => {
    if (!draft) return false
    if (key === 'objective') return !!shown.objective
    if (key === 'result') return !!shown.result
    if (key === 'rythme') return !!shown.rythme
    if (key === 'cadre') return (shown.cadre ?? 0) > 0
    if (key === 'validations') return (shown.validations ?? 0) > 0
    return false
  }

  return (
    <div className="flex h-full flex-col">
      {/* Eyebrow + status */}
      <div className="flex items-center gap-2">
        {ready ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E7D4F]/15" aria-hidden="true">
            <Check className="h-3 w-3 text-[#2E7D4F]" strokeWidth={3} />
          </span>
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" aria-hidden="true" />
        )}
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#AD0C53]">
          {ready ? t.ready : t.prep}
        </p>
      </div>

      <h3 className="mt-2 text-balance font-sf text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {draft ? draft.title[lang] : t.prepTitle}
      </h3>

      {/* Sections */}
      <div className="mt-5 flex flex-1 flex-col gap-4">
        {SECTIONS.map((section) => {
          const Icon = section.icon
          const filled = hasValue(section.key)
          return (
            <div key={section.key} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  filled ? 'bg-[#D10E63]/10 text-[#D10E63]' : 'bg-[var(--store-line)] text-[var(--store-muted)]'
                }`}
                aria-hidden="true"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">
                  {section.label[lang]}
                </p>

                {/* Single-value sections */}
                {(section.key === 'objective' || section.key === 'result' || section.key === 'rythme') &&
                  (filled && draft ? (
                    <motion.p
                      {...appear(justAdded === section.key)}
                      className="mt-1 rounded-md px-1 py-0.5 text-sm leading-relaxed text-[var(--store-text)]"
                      aria-live={justAdded === section.key ? 'polite' : undefined}
                    >
                      {draft[section.key][lang]}
                    </motion.p>
                  ) : (
                    <GhostHelp text={section.help[lang]} />
                  ))}

                {/* List sections */}
                {section.key === 'cadre' &&
                  (filled && draft ? (
                    <ul className="mt-1.5 flex flex-col gap-1">
                      {draft.cadre.slice(0, shown.cadre ?? 0).map((item, i) => (
                        <motion.li
                          key={item[lang]}
                          {...appear(justAdded === `cadre:${i}`)}
                          className="flex items-start gap-2 rounded-md px-1 py-0.5 text-sm leading-relaxed text-[var(--store-text)]"
                          aria-live={justAdded === `cadre:${i}` ? 'polite' : undefined}
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D10E63]" aria-hidden="true" />
                          {item[lang]}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <GhostHelp text={section.help[lang]} />
                  ))}

                {section.key === 'validations' &&
                  (filled && draft ? (
                    <ul className="mt-1.5 flex flex-col gap-1">
                      {draft.validations.slice(0, shown.validations ?? 0).map((item, i) => (
                        <motion.li
                          key={item[lang]}
                          {...appear(justAdded === `validations:${i}`)}
                          className="flex items-start gap-2 rounded-md px-1 py-0.5 text-sm leading-relaxed text-[var(--store-text)]"
                          aria-live={justAdded === `validations:${i}` ? 'polite' : undefined}
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
                          {item[lang]}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <GhostHelp text={section.help[lang]} />
                  ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer: footnote while building, handoff when ready */}
      {ready && draft ? (
        <motion.div
          {...(reduce ? { initial: false } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } })}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-2xl border border-[#D10E63]/15 bg-[#FCEAF2]/50 p-4"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">{t.nextStep}</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--store-text)]">{t.nextBody}</p>
          <button
            type="button"
            onClick={onAdapt}
            className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.adapt}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
          >
            {t.keepGoing}
          </button>
        </motion.div>
      ) : (
        <p className="mt-6 border-t border-[var(--store-line)] pt-4 text-xs leading-relaxed text-[var(--store-muted)]">
          {t.footnote}
        </p>
      )}
    </div>
  )
}

/** Very light ghost lines used for an incomplete section. */
function GhostHelp({ text }: { text: string }) {
  return (
    <div className="mt-1">
      <p className="text-sm leading-relaxed text-[var(--store-muted)]">{text}</p>
      <div className="mt-2 flex flex-col gap-1.5" aria-hidden="true">
        <span className="h-2 w-full rounded-full bg-[var(--store-line)]" />
        <span className="h-2 w-2/3 rounded-full bg-[var(--store-line)]" />
      </div>
    </div>
  )
}

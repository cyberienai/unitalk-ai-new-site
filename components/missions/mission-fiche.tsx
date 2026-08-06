'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Target, Sparkles, ClipboardCheck, UserRound, Wrench } from 'lucide-react'
import Link from 'next/link'
import type { Lang } from '@/lib/language-context'
import type { Mission } from '@/lib/missions-catalog'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'

/**
 * The living mission fiche. As Alma "materializes" a mission, fields arrive one
 * by one — driven by `revealed` (how many rows are visible). All data is real,
 * pulled from the matched catalog Mission; nothing here is invented.
 */

type Row = {
  key: string
  label: { fr: string; en: string }
  icon: typeof Target
  render: (m: Mission, lang: Lang) => React.ReactNode
}

// Ordered rows of the fiche. Each maps to a concrete Mission field.
const ROWS: Row[] = [
  {
    key: 'objective',
    label: { fr: 'Objectif', en: 'Objective' },
    icon: Target,
    render: (m, lang) => m.objective[lang],
  },
  {
    key: 'result',
    label: { fr: 'Résultat attendu', en: 'Expected result' },
    icon: Sparkles,
    render: (m, lang) => m.result[lang],
  },
  {
    key: 'validation',
    label: { fr: 'Validation', en: 'Validation' },
    icon: ClipboardCheck,
    render: (m, lang) => m.validation[lang],
  },
  {
    key: 'skills',
    label: { fr: 'Compétences mobilisées', en: 'Skills involved' },
    icon: Wrench,
    render: (m, lang) => (
      <span className="flex flex-wrap gap-1.5">
        {m.skills.slice(0, 4).map((s) => (
          <span
            key={s[lang]}
            className="rounded-full border border-[#E4DDCE] bg-white/60 px-2.5 py-0.5 text-xs font-medium text-[#3B362F]"
          >
            {s[lang]}
          </span>
        ))}
      </span>
    ),
  },
]

// Total reveal steps = header (1) + rows + collaborator (1).
export const FICHE_STEPS = ROWS.length + 2

export function MissionFiche({
  mission,
  revealed,
  lang,
}: {
  mission: Mission | null
  revealed: number
  lang: Lang
}) {
  const reduce = useReducedMotion()

  if (!mission) return <FicheSkeleton lang={lang} />

  const collaborator = ROLE_DETAILS[mission.collaboratorSlug]
  const rowVisible = (i: number) => revealed >= i + 2 // header is step 1, rows start at 2
  const collaboratorVisible = revealed >= FICHE_STEPS

  const reveal = (visible: boolean, i: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: visible ? 1 : 0.15 } }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: visible ? 1 : 0.15, y: visible ? 0 : 8 },
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const, delay: 0.02 * i },
        }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 sm:p-6">
      {/* Header — mission title + category */}
      <motion.div {...reveal(revealed >= 1, 0)} className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10"
          aria-hidden="true"
        >
          <Target className="h-4 w-4 text-[#D10E63]" strokeWidth={2.5} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
            {lang === 'fr' ? 'Mission' : 'Mission'}
          </p>
          <h3 className="mt-0.5 font-sf text-lg font-bold leading-snug tracking-[-0.01em] text-[#1C1A17]">
            {mission.title[lang]}
          </h3>
        </div>
      </motion.div>

      {/* Field rows */}
      <div className="mt-5 flex flex-col gap-4">
        {ROWS.map((row, i) => {
          const Icon = row.icon
          const visible = rowVisible(i)
          return (
            <motion.div key={row.key} {...reveal(visible, i + 1)} className="flex gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F1EADF]"
                aria-hidden="true"
              >
                <Icon className="h-3.5 w-3.5 text-[#8A8175]" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8175]">
                  {row.label[lang]}
                </p>
                <div className="mt-1 text-sm leading-relaxed text-[#3B362F]">{row.render(mission, lang)}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Collaborator proposal + CTA */}
      <motion.div
        {...reveal(collaboratorVisible, ROWS.length + 1)}
        className="mt-6 border-t border-[#EBE4D6] pt-5"
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17130F] text-sm font-bold text-[#FBF9F3]"
            aria-hidden="true"
          >
            {collaborator ? collaborator.name.charAt(0) : <UserRound className="h-4 w-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8175]">
              {lang === 'fr' ? 'Collaborateur IA proposé' : 'Proposed AI Collaborator'}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#1C1A17]">
              {collaborator ? `${collaborator.name} · ${mission.profile[lang]}` : mission.profile[lang]}
            </p>
          </div>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4ADE80]/15" aria-hidden="true">
            <Check className="h-3 w-3 text-[#3BA35F]" strokeWidth={3} />
          </span>
        </div>
        <Link
          href={`/decouvrir?mission=${mission.slug}`}
          className="group mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-4 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
        >
          {lang === 'fr' ? `Préparer ${collaborator?.name ?? 'le Collaborateur'}` : `Prepare ${collaborator?.name ?? 'the Collaborator'}`}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  )
}

/** Resting/empty state before the user says anything. */
function FicheSkeleton({ lang }: { lang: Lang }) {
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4DDCE] bg-[#FBF9F3]/60 p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D10E63]/10" aria-hidden="true">
        <Target className="h-5 w-5 text-[#D10E63]" strokeWidth={2} />
      </span>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#8A8175]">
        {lang === 'fr'
          ? 'Décrivez ce que vous souhaitez confier. Alma construit la mission ici, en direct.'
          : 'Describe what you want to hand off. Alma builds the mission here, live.'}
      </p>
    </div>
  )
}

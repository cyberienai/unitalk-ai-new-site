'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * PRODUCT THEATRE — an anthracite panel that plays ONE synchronized scenario at
 * a time. The parent (HeroHome) owns the active index so the rotating H1 action
 * and this panel are always the SAME mission — one state machine, never two
 * timers. Each scenario shows the full contract, top to bottom:
 *   human ask → structured mission → collaborator + skills → first action
 * Rejouer / Pause are functional; sound is never used. Static under
 * prefers-reduced-motion (scenario 0, no autoplay).
 */

export type Bi = { fr: string; en: string }
const p = (b: Bi, l: Lang) => b[l]

export type Scenario = {
  /** H1 tail, e.g. "relancer vos factures impayées". */
  action: Bi
  human: Bi
  mission: Bi
  validation: Bi
  skills: [Bi, Bi]
  firstAction: Bi
}

/** All scenarios equip the SAME durable Collaborator (Emma), on-doctrine: a
 *  Collaborateur IA accumulates capabilities across missions. */
export const SCENARIOS: Scenario[] = [
  {
    action: { fr: 'relancer vos factures impayées', en: 'chase your unpaid invoices' },
    human: { fr: '« Relance chaque semaine nos factures impayées. »', en: '“Chase our unpaid invoices every week.”' },
    mission: { fr: 'Relancer les factures impayées', en: 'Chase unpaid invoices' },
    validation: { fr: 'Marc valide avant tout contentieux', en: 'Marc approves before any collections' },
    skills: [
      { fr: 'Relance des factures', en: 'Invoice chasing' },
      { fr: 'Suivi des paiements', en: 'Payment tracking' },
    ],
    firstAction: { fr: 'Identifier les échéances dépassées', en: 'Identify overdue due dates' },
  },
  {
    action: { fr: 'préparer vos comités de direction', en: 'prepare your executive committees' },
    human: { fr: '« Prépare le dossier de notre prochain comité de direction. »', en: '“Prepare the file for our next executive committee.”' },
    mission: { fr: 'Préparer un comité de direction', en: 'Prepare an executive committee' },
    validation: { fr: 'Vous validez le dossier avant diffusion', en: 'You approve the file before it circulates' },
    skills: [
      { fr: 'Collecte des indicateurs', en: 'Indicator gathering' },
      { fr: 'Dossier de décision', en: 'Decision file' },
    ],
    firstAction: { fr: 'Demander les données aux responsables', en: 'Request the data from team leads' },
  },
  {
    action: { fr: 'rédiger vos comptes rendus', en: 'write your meeting notes' },
    human: { fr: '« Rédige les comptes rendus de nos réunions. »', en: '“Write the notes from our meetings.”' },
    mission: { fr: 'Rédiger les comptes rendus', en: 'Write meeting notes' },
    validation: { fr: 'Vous relisez avant partage', en: 'You review before sharing' },
    skills: [
      { fr: 'Synthèse de réunion', en: 'Meeting synthesis' },
      { fr: 'Diffusion structurée', en: 'Structured distribution' },
    ],
    firstAction: { fr: 'Récupérer l’ordre du jour et les notes', en: 'Collect the agenda and the notes' },
  },
]

const T = {
  fr: {
    context: 'Contexte Solvea actif',
    sophie: 'Sophie · Dirigeante',
    alma: 'Alma',
    emma: 'Emma',
    emmaRole: 'Assistante de direction',
    compatible: 'Collaboratrice existante',
    missionLabel: 'Mission',
    validationLabel: 'Validation humaine',
    skillsLabel: 'Compétences à ajouter',
    firstLabel: 'Première action',
    pause: 'Pause',
    play: 'Lecture',
    of: 'sur',
    almaFrames: 'Alma structure la mission et recommande Emma.',
  },
  en: {
    context: 'Solvea context active',
    sophie: 'Sophie · Founder',
    alma: 'Alma',
    emma: 'Emma',
    emmaRole: 'Executive assistant',
    compatible: 'Existing Collaborator',
    missionLabel: 'Mission',
    validationLabel: 'Human validation',
    skillsLabel: 'Skills to add',
    firstLabel: 'First action',
    pause: 'Pause',
    play: 'Play',
    of: 'of',
    almaFrames: 'Alma frames the mission and recommends Emma.',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroTheatre({
  lang = 'fr',
  index,
  playing,
  onTogglePlay,
  onSelect,
}: {
  lang?: Lang
  index: number
  playing: boolean
  onTogglePlay: () => void
  onSelect: (i: number) => void
}) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const s = SCENARIOS[index]

  // Staggered reveal of the four thread nodes on each scenario change.
  const nodeAnim = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease, delay } }

  return (
    <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#1C1A17] text-[#F3EFE6] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9AE6B4]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" />
          {t.context}
        </span>
        <div className="flex items-center gap-1.5">
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.mission.en}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`${i + 1} ${t.of} ${SCENARIOS.length} — ${p(sc.mission, lang)}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#E51872]' : 'w-1.5 bg-white/25 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Stage — one scenario, four synced nodes on the magenta thread */}
      <div className="px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            {/* Human ask */}
            <motion.div {...nodeAnim(0.02)} className="flex items-start gap-2.5">
              <Image src="/images/sophie-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-white/15" />
              <div>
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8A0BF]">{t.sophie}</p>
                <p className="inline-block rounded-2xl rounded-tl-sm bg-white/[0.08] px-3.5 py-2 text-[13.5px] leading-relaxed text-[#EFE9DE]">{p(s.human, lang)}</p>
              </div>
            </motion.div>

            {/* Alma framing note */}
            <motion.p {...nodeAnim(0.1)} className="mt-3 flex items-center gap-2 pl-[38px] text-[12px] text-white/45">
              <Image src="/alma-avatar.png" alt="" width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
              {t.almaFrames}
            </motion.p>

            {/* The mission thread */}
            <div className="relative mt-3 pl-[38px]">
              <span aria-hidden className="absolute left-[46px] top-2 bottom-2 w-px bg-gradient-to-b from-[#D10E63]/60 via-[#D10E63]/40 to-[#2E9E5B]/60" />

              {/* Node: mission + validation */}
              <motion.div {...nodeAnim(0.16)} className="relative flex gap-3 pb-3">
                <span className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#D10E63]" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{t.missionLabel}</p>
                  <p className="text-[14px] font-semibold text-[#F3EFE6]">{p(s.mission, lang)}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-white/55">
                    <span className="h-2 w-2 shrink-0 rounded-full border-[1.5px] border-[#E8A0BF]" /> {p(s.validation, lang)}
                  </p>
                </div>
              </motion.div>

              {/* Node: collaborator + skills */}
              <motion.div {...nodeAnim(0.24)} className="relative flex gap-3 pb-3">
                <span className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1C1A17] ring-2 ring-[#D10E63]/60">
                  <Image src="/images/emma-avatar.png" alt="" width={16} height={16} className="h-4 w-4 rounded-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-[14px] font-semibold text-[#F3EFE6]">{t.emma}</span>
                    <span className="text-[12px] text-white/45">{t.emmaRole}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#153D28] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#7FE0A6]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" /> {t.compatible}
                    </span>
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#E8A0BF]">{t.skillsLabel}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {s.skills.map((sk) => (
                      <span key={sk.en} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#D10E63]/50 px-2.5 py-0.5 text-[12px] text-[#F3C6DB]">
                        <span aria-hidden className="font-mono text-[11px] leading-none text-[#D10E63]">+</span> {p(sk, lang)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Node: first action */}
              <motion.div {...nodeAnim(0.32)} className="relative flex gap-3">
                <span className="relative z-10 mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#2E9E5B]" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">{t.firstLabel}</p>
                  <p className="text-[14px] font-medium text-[#F3EFE6]">{p(s.firstAction, lang)}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
        <button
          type="button"
          onClick={onTogglePlay}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-[#F3EFE6] transition-colors hover:bg-white/10"
        >
          {playing ? (
            <>
              <Pause className="h-4 w-4" /> {t.pause}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" fill="currentColor" /> {t.play}
            </>
          )}
        </button>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
          {index + 1} {t.of} {SCENARIOS.length}
        </span>
      </div>
    </div>
  )
}

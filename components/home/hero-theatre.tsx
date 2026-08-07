'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Pause, Play, RotateCcw, ShieldCheck, Sparkles, UserCheck, UserRound } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * PRODUCT THEATRE — an anthracite screen that plays the founding scene in five
 * scripted states: Sophie asks → Alma frames the mission → Alma checks the
 * Workspace → a durable Collaborator (Emma) gains two skills → Emma is on the
 * mission. No CTA lives here; it is a demonstration, not a pitch. Rejouer /
 * Pause are functional; sound is never used. Fully navigable, and static, under
 * prefers-reduced-motion.
 */

type Bi = { fr: string; en: string }
const p = (b: Bi, l: Lang) => b[l]

const STATE_COUNT = 5
const STATE_MS = 4600

const CAPTIONS: Bi[] = [
  { fr: 'Sophie confie une mission', en: 'Sophie hands over a mission' },
  { fr: 'Alma précise le cadre', en: 'Alma frames it' },
  { fr: 'Alma examine le Workspace', en: 'Alma checks the Workspace' },
  { fr: 'Emma gagne un savoir-faire', en: 'Emma gains know-how' },
  { fr: 'Emma est en mission', en: 'Emma is on the mission' },
]

const T = {
  fr: {
    context: 'Contexte Solvea actif',
    sophie: 'Sophie · Dirigeante',
    alma: 'Alma',
    emma: 'Emma · Collaboratrice IA',
    sophieLine: '« Emma, relance nos factures impayées chaque semaine. »',
    almaLine1: '« Première relance 7 jours après l’échéance. Marc valide avant tout contentieux. »',
    almaLine2: '« Emma peut prendre cette mission. Il lui manque deux compétences. »',
    missionLabel: 'Mission',
    missionTitle: 'Relancer les factures impayées',
    fObjective: 'Objectif',
    fObjectiveV: 'Obtenir le règlement des factures échues',
    fCadence: 'Rythme',
    fCadenceV: 'Chaque semaine',
    fValidation: 'Validation',
    fValidationV: 'Marc (comptable) avant contentieux',
    profile: 'Profil métier',
    profileName: 'Assistante de direction',
    compatible: 'Profil compatible',
    missing: 'Compétences à ajouter',
    skill1: 'Relance des factures',
    skill2: 'Suivi des paiements',
    steps: ['Méthode', 'Test', 'Validée', 'Ajoutée'],
    added: 'Ajoutée',
    onMission: 'En mission',
    onMissionSub: 'Emma relance les factures de Solvea. Chaque relance sensible passe par Marc.',
    replay: 'Rejouer',
    pause: 'Pause',
    play: 'Lecture',
    of: 'sur',
  },
  en: {
    context: 'Solvea context active',
    sophie: 'Sophie · Founder',
    alma: 'Alma',
    emma: 'Emma · AI Collaborator',
    sophieLine: '“Emma, chase our unpaid invoices every week.”',
    almaLine1: '“First reminder 7 days after the due date. Marc approves before any collections.”',
    almaLine2: '“Emma can take this mission. She is missing two skills.”',
    missionLabel: 'Mission',
    missionTitle: 'Chase unpaid invoices',
    fObjective: 'Objective',
    fObjectiveV: 'Get overdue invoices paid',
    fCadence: 'Cadence',
    fCadenceV: 'Every week',
    fValidation: 'Validation',
    fValidationV: 'Marc (accountant) before collections',
    profile: 'Job profile',
    profileName: 'Executive assistant',
    compatible: 'Compatible profile',
    missing: 'Skills to add',
    skill1: 'Invoice chasing',
    skill2: 'Payment tracking',
    steps: ['Method', 'Test', 'Validated', 'Added'],
    added: 'Added',
    onMission: 'On mission',
    onMissionSub: 'Emma chases Solvea’s invoices. Every sensitive reminder goes through Marc.',
    replay: 'Replay',
    pause: 'Pause',
    play: 'Play',
    of: 'of',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

function Bubble({
  avatar,
  who,
  children,
  align = 'left',
  reduce,
}: {
  avatar: string
  who: string
  children: React.ReactNode
  align?: 'left' | 'right'
  reduce: boolean
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className={`flex items-start gap-2.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}
    >
      <Image src={avatar} alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-white/15" />
      <div className={align === 'right' ? 'items-end' : ''}>
        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8A0BF]">{who}</p>
        <p
          className={`inline-block max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
            align === 'right' ? 'rounded-tr-sm bg-[#D10E63] text-[#FBF9F3]' : 'rounded-tl-sm bg-white/[0.08] text-[#EFE9DE]'
          }`}
        >
          {children}
        </p>
      </div>
    </motion.div>
  )
}

export function HeroTheatre({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()

  const [state, setState] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)
  const baseRef = useRef(0)

  // Reduced motion: show the final state, no autoplay.
  useEffect(() => {
    if (reduce) {
      setState(STATE_COUNT - 1)
      setPlaying(false)
    }
  }, [reduce])

  useEffect(() => {
    if (!playing || reduce) return
    startRef.current = performance.now()
    baseRef.current = progress
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const prog = Math.min(1, baseRef.current + elapsed / STATE_MS)
      setProgress(prog)
      if (prog >= 1) {
        setState((s) => (s + 1) % STATE_COUNT)
        setProgress(0)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, state, reduce])

  const goto = useCallback((s: number) => {
    setState(((s % STATE_COUNT) + STATE_COUNT) % STATE_COUNT)
    setProgress(0)
  }, [])

  const replay = useCallback(() => {
    setState(0)
    setProgress(0)
    setPlaying(true)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#1C1A17] text-[#F3EFE6] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
      {/* Ambient magenta thread motif — the recurring signature */}
      <div aria-hidden className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D10E63]/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9AE6B4]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E5B]" />
          {t.context}
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
          {state + 1} {t.of} {STATE_COUNT} · {p(CAPTIONS[state], lang)}
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 px-5 pt-3">
        {Array.from({ length: STATE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goto(i)}
            aria-label={`${i + 1} ${t.of} ${STATE_COUNT}`}
            className="h-1 flex-1 overflow-hidden rounded-full bg-white/12"
          >
            <div
              className="h-full rounded-full bg-[#E51872] transition-[width] duration-150"
              style={{ width: i < state ? '100%' : i === state ? `${Math.round(progress * 100)}%` : '0%' }}
            />
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="min-h-[340px] px-5 py-5 sm:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="flex flex-col gap-4"
          >
            {/* STATE 0 — Sophie asks */}
            {state === 0 && <Bubble avatar="/images/sophie-avatar.png" who={t.sophie} align="right" reduce={!!reduce}>{t.sophieLine}</Bubble>}

            {/* STATE 1 — Alma frames the mission */}
            {state === 1 && (
              <>
                <Bubble avatar="/alma-avatar.png" who={t.alma} reduce={!!reduce}>{t.almaLine1}</Bubble>
                <MissionCard t={t} reduce={!!reduce} />
              </>
            )}

            {/* STATE 2 — Alma checks the Workspace */}
            {state === 2 && (
              <>
                <Bubble avatar="/alma-avatar.png" who={t.alma} reduce={!!reduce}>{t.almaLine2}</Bubble>
                <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <Image src="/images/emma-avatar.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15" />
                    <div>
                      <p className="text-sm font-semibold text-[#F3EFE6]">Emma</p>
                      <p className="text-[12.5px] text-white/50">{t.profileName}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#153D28] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#7FE0A6]">
                      <Check className="h-3 w-3" /> {t.compatible}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8A0BF]">{t.missing}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[t.skill1, t.skill2].map((s) => (
                        <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#D10E63]/50 px-3 py-1 text-[12.5px] text-[#F3C6DB]">
                          <Sparkles className="h-3 w-3" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STATE 3 — Emma gains the two skills */}
            {state === 3 && (
              <div className="flex flex-col gap-3">
                {[t.skill1, t.skill2].map((s, si) => (
                  <div key={s} className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F3EFE6]">
                        <Sparkles className="h-4 w-4 text-[#E8A0BF]" /> {s}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#153D28] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#7FE0A6]">
                        <Check className="h-3 w-3" /> {t.added}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {t.steps.map((step, i) => (
                        <div key={step} className="flex flex-1 items-center gap-1.5">
                          <span className="flex items-center gap-1 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9AE6B4]">
                            <Check className="h-3 w-3" /> {step}
                          </span>
                          {i < t.steps.length - 1 && <span className="h-px flex-1 bg-[#2E9E5B]/40" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STATE 4 — Emma on the mission */}
            {state === 4 && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="relative">
                  <Image src="/images/emma-avatar.png" alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover ring-2 ring-[#2E9E5B]/50" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2E9E5B] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                    {t.onMission}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-[#F3EFE6]">{t.emma}</p>
                  <p className="mx-auto mt-1.5 max-w-xs text-pretty text-[13.5px] leading-relaxed text-white/60">{t.onMissionSub}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-[12.5px] text-white/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#7FE0A6]" /> {t.fValidationV}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
        <button
          type="button"
          onClick={() => (state === STATE_COUNT - 1 && !playing ? replay() : setPlaying((v) => !v))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-[#F3EFE6] transition-colors hover:bg-white/10"
        >
          {state === STATE_COUNT - 1 && !playing ? (
            <>
              <RotateCcw className="h-4 w-4" /> {t.replay}
            </>
          ) : playing ? (
            <>
              <Pause className="h-4 w-4" /> {t.pause}
            </>
          ) : (
            <>
              <Play className="h-4 w-4" fill="currentColor" /> {t.play}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={replay}
          aria-label={t.replay}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#F3EFE6] transition-colors hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function MissionCard({ t, reduce }: { t: (typeof T)['fr']; reduce: boolean }) {
  const rows = [
    { icon: UserRound, k: t.fObjective, v: t.fObjectiveV },
    { icon: Sparkles, k: t.fCadence, v: t.fCadenceV },
    { icon: UserCheck, k: t.fValidation, v: t.fValidationV },
  ]
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D10E63]/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#F3C6DB]">
          {t.missionLabel}
        </span>
        <h3 className="text-sm font-semibold text-[#F3EFE6]">{t.missionTitle}</h3>
      </div>
      <dl className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r.k}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 + i * 0.12 }}
            className="flex items-start gap-2.5"
          >
            <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#E8A0BF]" />
            <div>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">{r.k}</dt>
              <dd className="text-[13px] leading-snug text-[#EFE9DE]">{r.v}</dd>
            </div>
          </motion.div>
        ))}
      </dl>
    </div>
  )
}

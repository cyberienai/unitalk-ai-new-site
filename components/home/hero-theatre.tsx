'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Pause, Play } from 'lucide-react'
import type { Lang } from '@/lib/language-context'

/**
 * PRODUCT THEATRE — one single story, not a carousel of scenarios.
 *
 * The hero no longer shows many different Collaborators. It shows ONE — Iris —
 * being given a new responsibility, to make the proprietary Unitalk mechanic
 * legible in five frames:
 *
 *   01 Besoin → 02 Mission → 03 Affectation (+ préparation) → 04 Action → 05 Au travail
 *
 * The persistent signature under the card ("La même identité. Une nouvelle
 * responsabilité.") is the thesis: you don't buy an agent, you give a new
 * responsibility to someone who is already part of your company.
 *
 * Light operational register (warm white, AA text, no glow). Self-contained:
 * owns its own frame timer + play/pause. Freezes on the first frame under
 * prefers-reduced-motion.
 */

type Bi = { fr: string; en: string }
const p = (b: Bi, l: Lang) => b[l]

const FRAME_MS = 3200
const RESUME_AFTER_MS = 14000
const ease = [0.22, 1, 0.36, 1] as const

const IRIS_AVATAR = '/images/iris-avatar.png'

const T = {
  fr: {
    almaLine: 'Alma prépare la mission.',
    almaLineIris: 'Alma prépare Iris pour cette nouvelle responsabilité.',
    almaIdentity: 'Collaboratrice IA · Coordinatrice de missions',
    frames: ['Besoin', 'Mission', 'Affectation', 'Action', 'Au travail'],
    // 01
    human: 'J’ai besoin que quelqu’un réponde aux appels entrants et qualifie les demandes.',
    almaReply: 'Je prépare la mission.',
    // 02
    missionLabel: 'Mission',
    mission: 'Répondre et qualifier les appels entrants',
    ruleLabel: 'Règle',
    rule: 'Transférer les demandes sensibles à un membre de l’équipe.',
    // 03 — one idea only: the same identity gains a new job profile.
    affectationLine: 'Iris peut prendre cette nouvelle responsabilité.',
    irisRole: 'Collaboratrice IA · Solvea',
    existingProfile: 'Commercial',
    addedProfile: 'Support client',
    addedProfileLabel: 'Profil métier ajouté',
    ready: 'Prête pour la mission.',
    irisProof: 'iris@solvea.fr · Profil public · Agenda',
    // 04
    actionLabel: 'Au travail',
    flow: ['Appel entrant', 'Iris répond', 'Demande qualifiée', 'CRM mis à jour', 'Rendez-vous proposé'],
    validation: 'Validation humaine requise',
    // 05
    domain: 'Commercial · Support client',
    atWork: 'Au travail',
    status1: 'Mission en cours',
    status2: 'Première action accomplie',
    // signature + controls
    signature: 'La même identité. Une nouvelle responsabilité.',
    pause: 'Pause',
    play: 'Rejouer',
    frameWord: 'Étape',
    of: 'sur',
  },
  en: {
    almaLine: 'Alma prepares the mission.',
    almaLineIris: 'Alma prepares Iris for this new responsibility.',
    almaIdentity: 'AI Collaborator · Mission coordinator',
    frames: ['Need', 'Mission', 'Assignment', 'Action', 'At work'],
    human: 'I need someone to answer inbound calls and qualify the requests.',
    almaReply: 'I’m preparing the mission.',
    missionLabel: 'Mission',
    mission: 'Answer and qualify inbound calls',
    ruleLabel: 'Rule',
    rule: 'Transfer sensitive requests to a team member.',
    affectationLine: 'Iris can take on this new responsibility.',
    irisRole: 'AI Collaborator · Solvea',
    existingProfile: 'Sales',
    addedProfile: 'Customer support',
    addedProfileLabel: 'Job profile added',
    ready: 'Ready for the mission.',
    irisProof: 'iris@solvea.fr · Public profile · Calendar',
    actionLabel: 'At work',
    flow: ['Inbound call', 'Iris answers', 'Request qualified', 'CRM updated', 'Meeting proposed'],
    validation: 'Human validation required',
    domain: 'Sales · Customer support',
    atWork: 'At work',
    status1: 'Mission in progress',
    status2: 'First action completed',
    signature: 'The same identity. A new responsibility.',
    pause: 'Pause',
    play: 'Replay',
    frameWord: 'Step',
    of: 'of',
  },
} as const

const FRAME_COUNT = 5

export function HeroTheatre({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()

  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduce) setPlaying(false)
  }, [reduce])

  useEffect(() => {
    if (!playing || reduce) return
    const id = setTimeout(() => setFrame((v) => (v + 1) % FRAME_COUNT), FRAME_MS)
    return () => clearTimeout(id)
  }, [playing, frame, reduce])

  useEffect(() => () => { if (resumeRef.current) clearTimeout(resumeRef.current) }, [])

  const select = useCallback(
    (i: number) => {
      setFrame(i)
      setPlaying(false)
      if (resumeRef.current) clearTimeout(resumeRef.current)
      if (!reduce) resumeRef.current = setTimeout(() => setPlaying(true), RESUME_AFTER_MS)
    },
    [reduce],
  )

  const togglePlay = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current)
    setPlaying((v) => !v)
  }, [])

  const node = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease, delay } }

  return (
    <div className="w-full">
      <motion.div
        className="group relative w-full overflow-hidden rounded-[22px] border border-[#E4DCCE] bg-[#FFFDF9] text-[#1C1A17] transition-colors duration-300 hover:border-[#D9B9C8]"
        style={{ boxShadow: '0 1px 1px rgba(48,37,28,0.04), 0 8px 20px -8px rgba(48,37,28,0.10), 0 34px 64px -24px rgba(48,37,28,0.16)' }}
        initial={false}
        whileHover={
          reduce
            ? undefined
            : { y: -6, boxShadow: '0 2px 2px rgba(48,37,28,0.05), 0 14px 30px -10px rgba(176,12,84,0.14), 0 46px 80px -28px rgba(48,37,28,0.24)', transition: { duration: 0.4, ease } }
        }
      >
        {/* Hairline top edge with a magenta signature that sweeps across on hover. */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1C1A17]/25 to-transparent" />
        <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-[#B00C54] transition-[width] duration-500 ease-out group-hover:w-full" />

        {/* Header — Alma + frame progress + play/pause */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-b border-[#EFE8DB] px-4 pb-3.5 pt-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image src="/alma-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
            <div className="min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={frame >= 2 ? 'iris' : 'mission'}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease }}
                  className="max-w-[34ch] text-[12.5px] font-medium leading-snug text-[#4E483F] sm:text-[13px]"
                >
                  {frame >= 2 ? t.almaLineIris : t.almaLine}
                </motion.p>
              </AnimatePresence>
              {/* Persistent identity: says who Alma is, so the header is never
                  an anonymous voice. */}
              <p className="mt-0.5 truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#AFA695]">{t.almaIdentity}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {t.frames.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`${t.frameWord} ${i + 1} ${t.of} ${FRAME_COUNT} : ${label}`}
                  aria-current={i === frame}
                  className={`h-1 rounded-full transition-all duration-300 ${i === frame ? 'w-7 bg-[#B00C54]' : 'w-1.5 bg-[#DED6C8] hover:bg-[#BDB3A1]'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? t.pause : t.play}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E4DCCE] bg-[#FCFAF4] text-[#6B6459] transition-colors hover:border-[#D3C9B7] hover:text-[#1C1A17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B00C54] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF9]"
            >
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" fill="currentColor" />}
            </button>
          </div>
        </div>

        {/* Stage — fixed min-height so the card never jumps between frames */}
        <div className="relative min-h-[356px] px-4 py-5 sm:px-6 sm:py-6">
          {/* Frame kicker */}
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AFA695]">
            {String(frame + 1).padStart(2, '0')} · {t.frames[frame]}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={frame}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease }}
            >
              {/* ── 01 · Besoin ── */}
              {frame === 0 && (
                <div>
                  <motion.div {...node(0.02)} className="flex items-end justify-end gap-2.5">
                    <p className="max-w-[85%] rounded-[16px] rounded-br-[5px] border border-[#F3D9E5] bg-[#FBEAF1] px-4 py-2.5 text-left text-[14px] leading-relaxed text-[#3A2530]">{t.human}</p>
                    <Image src="/images/sophie-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
                  </motion.div>
                  <motion.div {...node(0.14)} className="mt-3 flex items-end gap-2.5">
                    <Image src="/alma-avatar.png" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0 rounded-full object-cover ring-1 ring-[#EAE1D2]" />
                    <p className="rounded-[16px] rounded-bl-[5px] border border-[#EBE3D5] bg-[#F6F1E8] px-4 py-2.5 text-[15px] font-semibold leading-relaxed text-[#1C1A17]">{t.almaReply}</p>
                  </motion.div>
                </div>
              )}

              {/* ── 02 · Mission ── */}
              {frame === 1 && (
                <div>
                  <motion.div {...node(0.04)}>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AFA695]">{t.missionLabel}</p>
                    <p className="mt-1.5 text-balance font-sf text-[20px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17]">{t.mission}</p>
                  </motion.div>
                  <motion.div {...node(0.18)} className="mt-5 rounded-2xl border border-[#EAF0F5] bg-[#F4F8FB] p-4">
                    <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6C8DA8]">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-[#2C5F8A]" />
                      {t.ruleLabel}
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#2C4257]">{t.rule}</p>
                  </motion.div>
                </div>
              )}

              {/* ── 03 · Affectation + préparation ── */}
              {frame === 2 && (
                <div>
                  <motion.div {...node(0.02)} className="flex items-center gap-3">
                    <Image src={IRIS_AVATAR} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#EAD7DF]" />
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-semibold tracking-[-0.005em] text-[#1C1A17]">{t.affectationLine}</p>
                      <p className="mt-0.5 text-[12.5px] text-[#6B6459]">Iris · {t.irisRole}</p>
                    </div>
                  </motion.div>

                  <motion.div {...node(0.16)} className="mt-4 rounded-2xl border border-[#EFE8DB] bg-[#FCFAF4] p-4">
                    {/* The whole point of the frame: the SAME identity keeps its
                        existing profile and gains one new job profile. */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#E4DCCE] bg-[#F3EEE4] px-3 py-1 text-[12.5px] font-medium text-[#6B6459]">{t.existingProfile}</span>
                      <span aria-hidden className="text-[15px] font-semibold text-[#B00C54]">+</span>
                      <span className="rounded-full bg-[#FBE7F0] px-3 py-1 text-[12.5px] font-semibold text-[#AD0C53]">{t.addedProfile}</span>
                    </div>
                    <ul className="mt-3 flex flex-col gap-2">
                      {[t.addedProfileLabel, t.ready].map((item, i) => (
                        <motion.li
                          key={item}
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.32, ease, delay: reduce ? 0 : 0.3 + i * 0.14 }}
                          className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#3E3830]"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#B00C54]">
                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Professional proof — Iris exists like a real teammate. */}
                  <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease, delay: reduce ? 0 : 0.85 }}
                    className="mt-3.5 font-mono text-[11.5px] tracking-[0.01em] text-[#6B6459]"
                  >
                    {t.irisProof}
                  </motion.p>
                </div>
              )}

              {/* ── 04 · Action ── */}
              {frame === 3 && (
                <div>
                  <ol className="relative flex flex-col gap-0 pl-7">
                    <span
                      aria-hidden
                      className="absolute left-[9px] top-2 bottom-2 w-px"
                      style={{ backgroundImage: 'linear-gradient(to bottom, #DCD3C4 0 3px, transparent 3px 7px)', backgroundSize: '1px 7px' }}
                    />
                    {t.flow.map((step, i) => {
                      const last = i === t.flow.length - 1
                      return (
                        <motion.li
                          key={step}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.32, ease, delay: reduce ? 0 : i * 0.14 }}
                          className="relative pb-3.5 last:pb-0"
                        >
                          <span className={`absolute -left-[27px] top-1 h-[11px] w-[11px] rounded-full ring-[3px] ring-[#FFFDF9] ${last ? 'bg-[#2C5F8A]' : 'bg-[#B00C54]'}`} />
                          <p className={`text-[14.5px] ${last ? 'font-semibold text-[#1C1A17]' : 'text-[#3E3830]'}`}>{step}</p>
                        </motion.li>
                      )
                    })}
                  </ol>
                  <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease, delay: reduce ? 0 : 0.8 }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#EAF0F5] px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.01em] text-[#2C5F8A]"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#2C5F8A]" />
                    {t.validation}
                  </motion.p>
                </div>
              )}

              {/* ── 05 · Au travail ── */}
              {frame === 4 && (
                <motion.div {...node(0.02)} className="flex flex-col items-center rounded-2xl border border-[#EFE8DB] bg-[#FCFAF4] px-6 py-7 text-center">
                  <Image src={IRIS_AVATAR} alt="" width={64} height={64} className="h-16 w-16 rounded-full object-cover ring-2 ring-[#EAD7DF]" />
                  <p className="mt-3.5 font-sf text-[20px] font-semibold tracking-[-0.01em] text-[#1C1A17]">Iris</p>
                  <p className="mt-0.5 text-[13px] text-[#6B6459]">{t.irisRole}</p>
                  <p className="mt-0.5 text-[13px] font-medium text-[#4E483F]">{t.domain}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#CFE8D8] bg-[#EBF6EF] px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1F7A4D]">
                    <span className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full rounded-full bg-[#1F9D57] ${reduce ? '' : 'animate-ping'} opacity-75`} />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F9D57]" />
                    </span>
                    {t.atWork}
                  </span>
                  <div className="mt-4 flex flex-col items-center gap-1 text-[13px] text-[#4E483F]">
                    <span>{t.status1}</span>
                    <span className="text-[#6B6459]">{t.status2}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Signature — the thesis of the animation. Deliberately withheld until
          the final frame so it reads as the conclusion, not a preview. Height
          is reserved so revealing it never shifts the layout. Always shown
          under reduced motion (the animation is frozen on frame 01). */}
      <div className="mt-5 flex min-h-[3.2em] items-start justify-center sm:min-h-[1.7em]">
        <AnimatePresence>
          {(frame === 4 || reduce) && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-balance text-center font-sf text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#1C1A17] sm:text-[18px]"
            >
              {t.signature}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

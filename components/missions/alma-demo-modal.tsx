'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Volume2, VolumeX, X, Check } from 'lucide-react'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }

/** One field row that appears in the "mission built" panel during the demo. */
type FieldReveal = {
  label: Bi
  value: Bi
  /** Scene index (0-based) at which this row becomes visible. */
  from: number
  /** Highlight (rose) when it first appears. */
}

const SCENE_COUNT = 5
const SCENE_MS = 8000

const T: Record<Lang, Record<string, string>> = {
  fr: {
    open_eyebrow: 'ALMA EN ACTION',
    open_title: 'Une demande devient une mission.',
    open_text:
      'Découvrez comment Alma transforme quelques phrases en travail structuré avant de l’adapter au contexte de votre entreprise.',
    open_cta: 'Lancer la démo',
    open_note: '45 secondes · Le son reste désactivé tant que vous ne l’activez pas.',
    open_muted: 'Voir sans le son',
    close: 'Fermer',
    closeDemo: 'Fermer la démo',
    you: 'Vous',
    alma: 'Alma',
    building: 'MISSION EN PRÉPARATION',
    ready: 'MISSION PRÊTE À ÊTRE ADAPTÉE',
    prev: 'Étape précédente',
    next: 'Étape suivante',
    play: 'Lecture',
    pause: 'Pause',
    replay: 'Revoir',
    sound_on: 'Activer le son',
    sound_off: 'Couper le son',
    of: 'sur',
    finalLead: 'Alma va maintenant adapter cette mission au contexte de votre entreprise.',
    finalCta: 'Essayer avec ma propre demande',
    finalSecondary: 'Revoir la démo',
    missionTitle: 'Relancer les factures impayées',
  },
  en: {
    open_eyebrow: 'ALMA IN ACTION',
    open_title: 'A request becomes a mission.',
    open_text:
      'See how Alma turns a few sentences into structured work before adapting it to your company’s context.',
    open_cta: 'Start the demo',
    open_note: '45 seconds · Sound stays off until you turn it on.',
    open_muted: 'Watch without sound',
    close: 'Close',
    closeDemo: 'Close the demo',
    you: 'You',
    alma: 'Alma',
    building: 'MISSION IN PREPARATION',
    ready: 'MISSION READY TO BE ADAPTED',
    prev: 'Previous step',
    next: 'Next step',
    play: 'Play',
    pause: 'Pause',
    replay: 'Replay',
    sound_on: 'Turn on sound',
    sound_off: 'Mute',
    of: 'of',
    finalLead: 'Alma will now adapt this mission to your company’s context.',
    finalCta: 'Try with my own request',
    finalSecondary: 'Replay the demo',
    missionTitle: 'Chase unpaid invoices',
  },
}

/** Scene captions shown in the progress line, e.g. "2 sur 5 · Alma précise le délai". */
const SCENE_CAPTIONS: Bi[] = [
  { fr: 'La demande', en: 'The request' },
  { fr: 'Alma précise le délai', en: 'Alma clarifies the delay' },
  { fr: 'Alma précise la validation', en: 'Alma clarifies the validation' },
  { fr: 'Mission structurée', en: 'Structured mission' },
  { fr: 'Suite du parcours', en: 'Next steps' },
]

/** Simulated conversation turns, each tied to the scene it belongs to. */
const TURNS: { who: 'you' | 'alma'; scene: number; text: Bi }[] = [
  {
    who: 'you',
    scene: 0,
    text: {
      fr: 'Je voudrais relancer chaque semaine les clients dont les factures sont arrivées à échéance.',
      en: 'I’d like to chase, every week, the clients whose invoices are past due.',
    },
  },
  {
    who: 'alma',
    scene: 1,
    text: {
      fr: 'À partir de combien de jours après l’échéance souhaitez-vous envoyer la première relance ?',
      en: 'How many days after the due date would you like to send the first reminder?',
    },
  },
  { who: 'you', scene: 1, text: { fr: 'Sept jours.', en: 'Seven days.' } },
  {
    who: 'alma',
    scene: 2,
    text: {
      fr: 'Souhaitez-vous valider la dernière relance avant son envoi ?',
      en: 'Would you like to approve the last reminder before it’s sent?',
    },
  },
  {
    who: 'you',
    scene: 2,
    text: {
      fr: 'Oui, avant toute transmission au contentieux.',
      en: 'Yes, before any transfer to collections.',
    },
  },
]

const FIELDS: FieldReveal[] = [
  { label: { fr: 'Rythme', en: 'Cadence' }, value: { fr: 'Chaque semaine', en: 'Every week' }, from: 0 },
  {
    label: { fr: 'Résultat attendu', en: 'Expected result' },
    value: { fr: 'À préciser', en: 'To be specified' },
    from: 0,
  },
  {
    label: { fr: 'Délai', en: 'Delay' },
    value: { fr: 'Première relance : 7 jours après l’échéance', en: 'First reminder: 7 days after the due date' },
    from: 1,
  },
  {
    label: { fr: 'Validation', en: 'Validation' },
    value: { fr: 'Validation humaine avant contentieux', en: 'Human approval before collections' },
    from: 2,
  },
  {
    label: { fr: 'Objectif', en: 'Goal' },
    value: {
      fr: 'Obtenir le règlement des factures arrivées à échéance',
      en: 'Get past-due invoices paid',
    },
    from: 3,
  },
  {
    label: { fr: 'Résultat attendu', en: 'Expected result' },
    value: {
      fr: 'Relances effectuées, réponses classées, situations bloquées transmises',
      en: 'Reminders sent, replies filed, blocked situations escalated',
    },
    from: 3,
  },
  {
    label: { fr: 'Ton', en: 'Tone' },
    value: { fr: 'Professionnel et courtois', en: 'Professional and courteous' },
    from: 3,
  },
]

export function AlmaDemoModal({
  open,
  onClose,
  onTry,
  lang,
}: {
  open: boolean
  onClose: () => void
  onTry: () => void
  lang: Lang
}) {
  const t = T[lang]
  const reduce = useReducedMotion()

  const [started, setStarted] = useState(false)
  const [scene, setScene] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [sound, setSound] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1 within the current scene

  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const baseRef = useRef<number>(0)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Reset everything whenever the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setStarted(false)
      setScene(0)
      setPlaying(true)
      setSound(false)
      setProgress(0)
    }
  }, [open])

  // Escape to close + focus trap entry.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (started) {
        if (e.key === 'ArrowRight') setScene((s) => Math.min(SCENE_COUNT - 1, s + 1))
        if (e.key === 'ArrowLeft') setScene((s) => Math.max(0, s - 1))
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, started])

  // Autoplay progression through scenes (visual only; never audio).
  useEffect(() => {
    if (!open || !started || !playing || reduce) return
    startRef.current = performance.now()
    baseRef.current = progress
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const p = Math.min(1, baseRef.current + elapsed / SCENE_MS)
      setProgress(p)
      if (p >= 1) {
        if (scene < SCENE_COUNT - 1) {
          setScene((s) => s + 1)
          setProgress(0)
        } else {
          setPlaying(false)
        }
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, started, playing, scene, reduce])

  // When reduced motion: hold each scene without auto-advancing.
  const gotoScene = useCallback((s: number) => {
    setScene(Math.max(0, Math.min(SCENE_COUNT - 1, s)))
    setProgress(0)
  }, [])

  const replay = useCallback(() => {
    setScene(0)
    setProgress(0)
    setPlaying(true)
  }, [])

  const visibleTurns = useMemo(() => TURNS.filter((x) => x.scene <= scene), [scene])
  const visibleFields = useMemo(() => FIELDS.filter((f) => f.from <= scene), [scene])
  const isReady = scene >= 3

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1A17]/55 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t.open_title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative flex max-h-[calc(100svh-24px)] w-full max-w-[min(1200px,calc(100vw-32px))] flex-col overflow-hidden rounded-[26px] border border-[#E7DFD0] bg-[#F8F6F1] shadow-[0_40px_120px_-40px_rgba(28,26,23,0.55)] sm:max-h-[calc(100svh-48px)] sm:rounded-[30px]"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 items-center gap-1.5 rounded-full border border-[#E7DFD0] bg-[#FBF9F3]/90 px-3 text-[13px] font-semibold text-[var(--store-text,#2A2622)] transition-colors hover:bg-[#FBF9F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">{t.close}</span>
        </button>

        {!started ? (
          /* ---- Opening screen (§16) ---- */
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#AD0C53]">
              {t.open_eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-balance font-sf text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#1C1A17]">
              {t.open_title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-[#5B534A]">{t.open_text}</p>
            <button
              type="button"
              onClick={() => {
                setStarted(true)
                setPlaying(true)
              }}
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D10E63] px-6 text-[15px] font-semibold text-[#FBF9F3] shadow-[0_12px_30px_-10px_rgba(209,14,99,0.6)] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              {t.open_cta}
            </button>
            <p className="mt-4 text-[12.5px] text-[#8A8073]">{t.open_note}</p>
            <div className="mt-3 flex items-center gap-4 text-[13px]">
              <button
                type="button"
                onClick={() => {
                  setSound(false)
                  setStarted(true)
                  setPlaying(true)
                }}
                className="font-semibold text-[#AD0C53] underline-offset-4 hover:underline"
              >
                {t.open_muted}
              </button>
              <button type="button" onClick={onClose} className="text-[#8A8073] hover:text-[#5B534A]">
                {t.close}
              </button>
            </div>
          </div>
        ) : (
          /* ---- Player ---- */
          <>
            {/* Progress bar */}
            <div className="flex shrink-0 items-center gap-2 px-4 pt-4 sm:px-6">
              {Array.from({ length: SCENE_COUNT }).map((_, i) => (
                <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[#E7DFD0]">
                  <div
                    className="h-full rounded-full bg-[#D10E63] transition-[width]"
                    style={{ width: i < scene ? '100%' : i === scene ? `${Math.round(progress * 100)}%` : '0%' }}
                  />
                </div>
              ))}
            </div>
            <p className="shrink-0 px-4 pt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8073] sm:px-6">
              {scene + 1} {t.of} {SCENE_COUNT} · {SCENE_CAPTIONS[scene][lang]}
            </p>

            {/* Body: conversation (left) + mission (right) */}
            <div className="grid flex-1 grid-rows-[auto_1fr] gap-0 overflow-y-auto md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:grid-rows-1">
              {/* Conversation */}
              <div className="flex flex-col gap-3 border-b border-[#EAE2D5] p-4 sm:p-6 md:border-b-0 md:border-r">
                <AnimatePresence initial={false}>
                  {visibleTurns.map((turn, i) => (
                    <motion.div
                      key={`${turn.scene}-${i}`}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={turn.who === 'you' ? 'self-end text-right' : 'self-start'}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                          turn.who === 'you' ? 'text-[#AD0C53]' : 'text-[#8A8073]'
                        }`}
                      >
                        {turn.who === 'you' ? t.you : t.alma}
                      </p>
                      <p
                        className={`mt-1 inline-block max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          turn.who === 'you'
                            ? 'rounded-br-sm bg-[#D10E63] text-[#FBF9F3]'
                            : 'rounded-tl-sm bg-[#F1EADF] text-[#2A2622]'
                        }`}
                      >
                        {turn.text[lang]}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Mission built */}
              <div className="flex flex-col p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isReady ? 'ready' : 'building'}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                        isReady ? 'bg-[#E7F5EC] text-[#1F7A46]' : 'bg-[#F1EADF] text-[#8A8073]'
                      }`}
                    >
                      {isReady && <Check className="h-3 w-3" />}
                      {isReady ? t.ready : t.building}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <h3 className="mt-3 font-sf text-xl font-semibold tracking-[-0.02em] text-[#1C1A17]">
                  {t.missionTitle}
                </h3>

                <dl className="mt-4 space-y-2.5">
                  <AnimatePresence initial={false}>
                    {visibleFields.map((f, i) => (
                      <motion.div
                        key={`${f.label.fr}-${f.from}-${i}`}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl border border-[#EAE2D5] bg-[#FBF9F3] px-3.5 py-2.5"
                      >
                        <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8073]">
                          {f.label[lang]}
                        </dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-[#2A2622]">{f.value[lang]}</dd>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </dl>

                {/* Scene 5 — next steps */}
                <AnimatePresence>
                  {scene >= 4 && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mt-4 rounded-2xl border border-[#F3D3E0] bg-[#FCEAF2]/70 p-4"
                    >
                      <p className="text-sm leading-relaxed text-[#7A2247]">{t.finalLead}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={onTry}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
                        >
                          {t.finalCta}
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={replay}
                          className="text-sm font-semibold text-[#AD0C53] underline-offset-4 hover:underline"
                        >
                          {t.finalSecondary}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#EAE2D5] bg-[#F3EFE6]/60 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => gotoScene(scene - 1)}
                  disabled={scene === 0}
                  aria-label={t.prev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFD0] bg-[#FBF9F3] text-[#5B534A] transition-colors hover:bg-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? t.pause : t.play}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1C1A17] px-3.5 text-[13px] font-semibold text-[#FBF9F3] transition-colors hover:bg-[#332F2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
                  <span className="hidden sm:inline">{playing ? t.pause : t.play}</span>
                </button>
                <button
                  type="button"
                  onClick={() => gotoScene(scene + 1)}
                  disabled={scene === SCENE_COUNT - 1}
                  aria-label={t.next}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFD0] bg-[#FBF9F3] text-[#5B534A] transition-colors hover:bg-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={replay}
                  aria-label={t.replay}
                  className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFD0] bg-[#FBF9F3] text-[#5B534A] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSound((s) => !s)}
                aria-pressed={sound}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#E7DFD0] bg-[#FBF9F3] px-3.5 text-[13px] font-semibold text-[#5B534A] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
              >
                {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span className="hidden sm:inline">{sound ? t.sound_off : t.sound_on}</span>
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

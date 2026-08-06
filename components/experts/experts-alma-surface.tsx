'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Mic, Paperclip, Pencil, Square, RotateCcw, ArrowRight, Check, Info } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import {
  buildAccompaniment,
  type Accompaniment,
  type AccompanimentLevel,
  type Bi,
} from '@/lib/experts'

type Stage = 'intro' | 'listening' | 'brief'

/** A project seed loaded into Alma from a domain card or a mission handoff. */
export type ExpertsSeed = {
  text: Bi
  level?: AccompanimentLevel
  /** A short note shown above the brief (e.g. mission handoff provenance). */
  note?: Bi
  key: number
}

// One rotating example (brief §6) — deliberately a single canonical phrase.
const EXAMPLE: Bi = {
  fr: 'Nous devons connecter nos outils métier et organiser les validations de trois Collaborateurs IA.',
  en: 'We need to connect our business tools and organize the validations of three AI Collaborators.',
}

/* Minimal Web Speech API shape (typed locally; not all DOM libs include it). */
type SpeechResult = { 0: { transcript: string }; isFinal: boolean }
type SpeechEvent = { resultIndex: number; results: ArrayLike<SpeechResult> }
type SpeechErrorEvent = { error: string }
type SpeechRec = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onstart: (() => void) | null
  onresult: ((e: SpeechEvent) => void) | null
  onerror: ((e: SpeechErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

function getSpeechRecognition(): (new () => SpeechRec) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec
    webkitSpeechRecognition?: new () => SpeechRec
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function ExpertsAlmaSurface({
  lang,
  seed,
  onFindExpert,
}: {
  lang: Lang
  seed?: ExpertsSeed | null
  /** Called with the built brief when the visitor asks to find the right expert. */
  onFindExpert?: (brief: Accompaniment) => void
}) {
  const fr = lang === 'fr'
  const reduce = useReducedMotion()

  const [stage, setStage] = useState<Stage>('intro')
  const [text, setText] = useState('')
  const [writing, setWriting] = useState(false)

  // Voice transient state.
  const [typed, setTyped] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  const [micRequesting, setMicRequesting] = useState(false)

  // Brief state.
  const [brief, setBrief] = useState<Accompaniment | null>(null)
  const [note, setNote] = useState<Bi | null>(null)
  const [reveal, setReveal] = useState(0) // number of brief fields revealed

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervals = useRef<ReturnType<typeof setInterval>[]>([])
  const writeFieldRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRec | null>(null)
  const finalTranscriptRef = useRef('')
  const wantListeningRef = useRef(false)
  const lastSeedKey = useRef<number | null>(null)

  const t = {
    title: fr ? 'Décrivez votre projet à Alma.' : 'Describe your project to Alma.',
    subtitle: fr
      ? 'Elle clarifie votre besoin et identifie l’expertise humaine nécessaire avant la mise en relation.'
      : 'She clarifies your need and identifies the human expertise required before any introduction.',
    name: 'Alma',
    talk: fr ? 'Parler à Alma' : 'Talk to Alma',
    write: fr ? 'Je préfère écrire' : 'I’d rather write',
    backToVoice: fr ? 'Revenir à la voix' : 'Back to voice',
    micHint: fr ? 'Le micro ne s’active qu’après votre autorisation.' : 'The mic only turns on after you allow it.',
    micRequesting: fr ? 'Autoriser le micro pour parler à Alma' : 'Allow the mic to talk to Alma',
    micDenied: fr
      ? 'Le micro n’est pas disponible. Vous pouvez écrire votre projet à Alma.'
      : 'The mic isn’t available. You can type your project to Alma.',
    micUnsupported: fr
      ? 'La reconnaissance vocale n’est pas disponible sur ce navigateur. Écrivez votre projet à Alma.'
      : 'Speech recognition isn’t available in this browser. Type your project to Alma instead.',
    writePh: fr ? 'Décrivez votre projet d’accompagnement…' : 'Describe your support project…',
    tryPrefix: fr ? 'Essayez :' : 'Try:',
    prepare: fr ? 'Préparer le brief' : 'Prepare the brief',
    attach: fr ? 'Joindre un document' : 'Attach a document',
    listening: fr ? 'Alma vous écoute' : 'Alma is listening',
    micOn: fr ? 'Micro actif' : 'Mic on',
    finish: fr ? 'Terminer' : 'Finish',
    toWrite: fr ? 'Passer à l’écrit' : 'Switch to writing',
    transcript: fr ? 'Transcription' : 'Transcript',
    listeningPrompt: fr ? 'Décrivez votre projet, à voix haute.' : 'Describe your project, out loud.',
    sayHint: fr ? 'Vous pouvez dire :' : 'You can say:',
    briefTitle: fr ? 'Brief d’accompagnement' : 'Support brief',
    briefIntro: fr
      ? 'Alma structure votre besoin. Rien n’est transmis sans votre accord.'
      : 'Alma structures your need. Nothing is shared without your consent.',
    findExpert: fr ? 'Trouver l’expert adapté' : 'Find the right expert',
    restart: fr ? 'Recommencer' : 'Start over',
    // Brief field labels
    lObjective: fr ? 'Objectif' : 'Objective',
    lPerimeter: fr ? 'Périmètre' : 'Scope',
    lCollaborators: fr ? 'Collaborateurs IA' : 'AI Collaborators',
    lApplications: fr ? 'Applications citées' : 'Applications named',
    lConstraints: fr ? 'Contraintes' : 'Constraints',
    lLevel: fr ? 'Niveau d’accompagnement' : 'Level of support',
    lDeadline: fr ? 'Échéance' : 'Timeline',
    lToConfirm: fr ? 'À confirmer ensemble' : 'To confirm together',
    almaSaid: fr ? 'Alma a structuré votre besoin.' : 'Alma structured your need.',
  }

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    intervals.current.forEach(clearInterval)
    timers.current = []
    intervals.current = []
  }, [])

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  const stopMic = useCallback(() => {
    wantListeningRef.current = false
    const rec = recognitionRef.current
    if (rec) {
      rec.onend = null
      rec.onresult = null
      rec.onerror = null
      try {
        rec.stop()
      } catch {
        /* already stopped */
      }
      recognitionRef.current = null
    }
  }, [])

  // Build the brief and reveal its fields one by one.
  const materialize = useCallback(
    (spoken: string, level?: AccompanimentLevel, provenance?: Bi | null) => {
      clearAll()
      const b = buildAccompaniment(spoken, lang, level)
      setBrief(b)
      setNote(provenance ?? null)
      setStage('brief')
      setReveal(0)
      const total = 8
      if (reduce) {
        setReveal(total)
        return
      }
      for (let i = 1; i <= total; i++) {
        after(140 * i, () => setReveal(i))
      }
    },
    [lang, reduce, clearAll, after],
  )

  const start = useCallback(
    (spoken: string, level?: AccompanimentLevel, provenance?: Bi | null) => {
      stopMic()
      materialize(spoken, level, provenance)
    },
    [materialize, stopMic],
  )

  // React to an external seed (domain card / mission handoff).
  useEffect(() => {
    if (!seed || seed.key === lastSeedKey.current) return
    lastSeedKey.current = seed.key
    start(seed.text[lang], seed.level, seed.note ?? null)
  }, [seed, lang, start])

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      clearAll()
      stopMic()
    }
  }, [clearAll, stopMic])

  // --- voice mode ------------------------------------------------------------
  const openWriteFallback = useCallback(() => {
    setStage('intro')
    setTyped('')
    setSeconds(0)
    setWriting(true)
    requestAnimationFrame(() => writeFieldRef.current?.focus())
  }, [])

  const buildRecognition = useCallback((): SpeechRec | null => {
    const SR = getSpeechRecognition()
    if (!SR) return null
    const rec = new SR()
    rec.lang = fr ? 'fr-FR' : 'en-US'
    rec.continuous = true
    rec.interimResults = true
    rec.onstart = () => setMicRequesting(false)
    rec.onresult = (e: SpeechEvent) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]
        if (res.isFinal) finalTranscriptRef.current += res[0].transcript + ' '
        else interim += res[0].transcript
      }
      setTyped((finalTranscriptRef.current + interim).replace(/\s+/g, ' ').trim())
    }
    rec.onerror = (e: SpeechErrorEvent) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        setMicRequesting(false)
        stopMic()
        setMicError(t.micDenied)
        openWriteFallback()
      }
    }
    rec.onend = () => {
      if (wantListeningRef.current) {
        try {
          rec.start()
        } catch {
          /* transient restart race */
        }
      }
    }
    return rec
  }, [fr, stopMic, t.micDenied, openWriteFallback])

  const requestMic = useCallback(() => {
    setMicError(null)
    const rec = buildRecognition()
    if (!rec) {
      setMicError(t.micUnsupported)
      openWriteFallback()
      return
    }
    finalTranscriptRef.current = ''
    setTyped('')
    setSeconds(0)
    setMicRequesting(true)
    wantListeningRef.current = true
    setStage('listening')
    const clock = setInterval(() => setSeconds((s) => s + 1), 1000)
    intervals.current.push(clock)
    recognitionRef.current = rec
    try {
      rec.start()
    } catch {
      setMicRequesting(false)
    }
  }, [buildRecognition, t.micUnsupported, openWriteFallback])

  const finishListening = useCallback(() => {
    wantListeningRef.current = false
    const said = (finalTranscriptRef.current || typed).replace(/\s+/g, ' ').trim()
    clearAll()
    stopMic()
    if (said) start(said)
    else {
      setStage('intro')
      setTyped('')
      setSeconds(0)
    }
  }, [typed, clearAll, stopMic, start])

  const switchToWrite = useCallback(() => {
    clearAll()
    stopMic()
    openWriteFallback()
  }, [clearAll, stopMic, openWriteFallback])

  const submitWritten = useCallback(() => {
    const q = text.trim()
    if (!q) return
    start(q)
  }, [text, start])

  const reset = useCallback(() => {
    clearAll()
    stopMic()
    setBrief(null)
    setNote(null)
    setText('')
    setTyped('')
    setWriting(false)
    setStage('intro')
  }, [clearAll, stopMic])

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div>
      <header className="mb-4 text-center sm:mb-5">
        <h2 className="mx-auto max-w-2xl text-balance font-sf text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--store-text)] sm:text-[2rem]">
          {t.title}
        </h2>
        <p className="mx-auto mt-2.5 max-w-xl text-pretty text-[15px] leading-relaxed text-[var(--store-muted)]">
          {t.subtitle}
        </p>
      </header>

      {stage !== 'brief' ? (
        <section
          className="relative mx-auto max-w-[720px] rounded-[28px] border border-[#E7DFD0] bg-[#FBF7F2] p-6 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_32px_-24px_rgba(28,26,23,0.25)] sm:p-8"
          aria-label={t.talk}
        >
          {stage === 'intro' && (
            <IntroPanel
              reduce={!!reduce}
              t={t}
              text={text}
              setText={setText}
              onSubmitText={submitWritten}
              onTalk={requestMic}
              micError={micError}
              micRequesting={micRequesting}
              example={EXAMPLE}
              lang={lang}
              writing={writing}
              setWriting={setWriting}
              writeRef={writeFieldRef}
            />
          )}
          {stage === 'listening' && (
            <ListeningPanel
              reduce={!!reduce}
              t={t}
              typed={typed}
              mmss={mmss}
              onFinish={finishListening}
              onWrite={switchToWrite}
              example={EXAMPLE}
              lang={lang}
            />
          )}
        </section>
      ) : (
        <section
          className="relative overflow-hidden rounded-[28px] border border-[#E7DFD0] bg-[#FBF7F2] shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_32px_-24px_rgba(28,26,23,0.25)]"
          aria-label={t.briefTitle}
        >
          <div className="grid lg:min-h-[420px] lg:grid-cols-[40%_60%]">
            {/* LEFT — Alma confirmation */}
            <div className="flex flex-col justify-between border-b border-[#EBE3D6] bg-[#FBF3F1] p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex items-center gap-2.5">
                  <img src="/alma-avatar.png" alt="Alma" className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/30" />
                  <span className="font-sf text-base font-bold text-[var(--store-text)]">{t.name}</span>
                </div>
                <p className="mt-4 flex items-start gap-2 text-[15px] leading-relaxed text-[var(--store-text)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t.almaSaid}
                </p>
                {note && (
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-[#D10E63]/[0.06] px-3 py-2 text-[13px] leading-snug text-[#AD0C53]">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {note[lang]}
                  </p>
                )}
                <p className="mt-4 text-[13px] leading-relaxed text-[var(--store-muted)]">{t.briefIntro}</p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-lg px-2 py-1 text-sm font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors hover:text-[var(--store-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
              >
                <RotateCcw className="h-4 w-4" />
                {t.restart}
              </button>
            </div>

            {/* RIGHT — living accompaniment brief */}
            <div className="bg-[#FBF9F3] p-5 sm:p-6">
              {brief && (
                <BriefPanel reduce={!!reduce} t={t} brief={brief} reveal={reveal} lang={lang} onFind={() => onFindExpert?.(brief)} />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

type Copy = Record<string, string>

function IntroPanel({
  reduce,
  t,
  text,
  setText,
  onSubmitText,
  onTalk,
  micError,
  micRequesting,
  example,
  lang,
  writing,
  setWriting,
  writeRef,
}: {
  reduce: boolean
  t: Copy
  text: string
  setText: (v: string) => void
  onSubmitText: () => void
  onTalk: () => void
  micError: string | null
  micRequesting: boolean
  example: Bi
  lang: Lang
  writing: boolean
  setWriting: (v: boolean) => void
  writeRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  const [micHover, setMicHover] = useState(false)
  const openWriting = () => {
    setWriting(true)
    requestAnimationFrame(() => writeRef.current?.focus())
  }
  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      <img src="/alma-avatar.png" alt="Alma" className="h-16 w-16 rounded-full object-cover ring-2 ring-[#D10E63]/30" />
      <p className="mt-3 font-sf text-lg font-bold text-[var(--store-text)]">{t.name}</p>

      <div className="relative mt-6 w-full max-w-[380px]">
        <button
          type="button"
          onClick={onTalk}
          onMouseEnter={() => setMicHover(true)}
          onMouseLeave={() => setMicHover(false)}
          onFocus={() => setMicHover(true)}
          onBlur={() => setMicHover(false)}
          aria-describedby="experts-mic-hint"
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-[#D10E63] px-6 py-3.5 text-base font-bold text-[#FBF9F3] shadow-[0_10px_28px_-12px_rgba(209,14,99,0.75)] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2]"
        >
          <Mic className="h-5 w-5" />
          {t.talk}
        </button>
        <AnimatePresence>
          {micHover && !micRequesting && (
            <motion.span
              id="experts-mic-hint"
              role="tooltip"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.14 }}
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[260px] -translate-x-1/2 rounded-lg border border-[#E7DFD0] bg-[#2A2622] px-2.5 py-1.5 text-center text-xs font-medium text-[#FBF9F3] shadow-[0_8px_20px_-10px_rgba(28,26,23,0.5)]"
            >
              {t.micHint}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {micRequesting && <p className="mt-2 text-xs font-semibold text-[#AD0C53]">{t.micRequesting}</p>}
      {micError && <p className="mt-2 max-w-[420px] text-pretty text-xs font-medium text-[#B00B52]">{micError}</p>}

      {!writing ? (
        <button
          type="button"
          onClick={openWriting}
          className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors hover:text-[var(--store-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          <Pencil className="h-4 w-4" />
          {t.write}
        </button>
      ) : (
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 w-full max-w-[440px] overflow-hidden text-left"
        >
          <div className="rounded-2xl border border-[#E7DFD0] bg-[#FBF9F3] p-2.5 transition-colors focus-within:border-[#D10E63]/50 focus-within:ring-2 focus-within:ring-[#D10E63]/15">
            <textarea
              ref={writeRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  onSubmitText()
                }
              }}
              rows={2}
              placeholder={t.writePh}
              aria-label={t.writePh}
              className="max-h-[132px] min-h-[48px] w-full resize-none bg-transparent px-1.5 py-1 text-[15px] leading-relaxed text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
            />
            <div className="mt-1 flex items-center justify-between">
              <button
                type="button"
                aria-label={t.attach}
                title={t.attach}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F1EADF] hover:text-[var(--store-text)]"
              >
                <Paperclip className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                onClick={onSubmitText}
                disabled={!text.trim()}
                aria-label={t.prepare}
                title={t.prepare}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3]"
              >
                <ArrowUp className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setWriting(false)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors hover:text-[var(--store-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
          >
            <Mic className="h-3.5 w-3.5" />
            {t.backToVoice}
          </button>
        </motion.div>
      )}

      <button
        type="button"
        onClick={() => {
          setText(example[lang])
          setWriting(true)
          requestAnimationFrame(() => writeRef.current?.focus())
        }}
        aria-label={`${t.tryPrefix} ${example[lang]}`}
        className="group mt-5 inline-flex min-h-[40px] max-w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-center transition-colors hover:bg-[#D10E63]/8 focus-visible:bg-[#D10E63]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
      >
        <span className="shrink-0 text-xs font-bold uppercase tracking-[0.06em] text-[#AD0C53]" aria-hidden="true">
          {t.tryPrefix}
        </span>
        <span className="min-w-0 text-pretty text-sm leading-snug text-[var(--store-text)]" aria-hidden="true">
          {`« ${example[lang]} »`}
        </span>
      </button>
    </div>
  )
}

function ListeningPanel({
  reduce,
  t,
  typed,
  mmss,
  onFinish,
  onWrite,
  example,
  lang,
}: {
  reduce: boolean
  t: Copy
  typed: string
  mmss: string
  onFinish: () => void
  onWrite: () => void
  example: Bi
  lang: Lang
}) {
  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      <div className="flex items-center gap-2" aria-live="polite">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63]/60" />}
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D10E63]" />
        </span>
        <p className="font-sf text-lg font-bold text-[var(--store-text)]">{t.listening}</p>
      </div>
      <span className="mt-2 rounded-full bg-[#D10E63]/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#AD0C53]">
        {t.micOn} · {mmss}
      </span>

      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3]" aria-hidden="true">
          <Mic className="h-5 w-5" />
        </span>
        <div className="flex items-end gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-[#D10E63]"
              initial={{ height: 8 }}
              animate={reduce ? { height: 12 } : { height: [8, 8 + ((i % 3) + 1) * 12, 8] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 min-h-[92px] w-full rounded-2xl bg-[#FBF9F3]/70 p-4 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">{t.transcript}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--store-text)]" aria-live="polite">
          {typed ? (
            <>
              {typed}
              {!reduce && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#D10E63] align-middle" />}
            </>
          ) : (
            <span className="text-[var(--store-muted)]">{t.listeningPrompt}</span>
          )}
        </p>
      </div>

      <p className="mt-3 text-pretty text-xs text-[var(--store-muted)]">
        <span className="font-semibold text-[#AD0C53]">{t.sayHint} </span>
        {`« ${example[lang]} »`}
      </p>

      <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onFinish}
          className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2]"
        >
          <Square className="h-3.5 w-3.5" />
          {t.finish}
        </button>
        <button
          type="button"
          onClick={onWrite}
          className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          <Pencil className="h-4 w-4" />
          {t.toWrite}
        </button>
      </div>
    </div>
  )
}

function BriefPanel({
  reduce,
  t,
  brief,
  reveal,
  lang,
  onFind,
}: {
  reduce: boolean
  t: Copy
  brief: Accompaniment
  reveal: number
  lang: Lang
  onFind: () => void
}) {
  // Ordered fields; index drives the staggered reveal.
  const rows: { label: string; value: string | null; list?: string[] }[] = [
    { label: t.lObjective, value: brief.objective[lang] },
    { label: t.lPerimeter, value: brief.perimeter[lang] },
    { label: t.lCollaborators, value: brief.collaborators[lang] },
    { label: t.lApplications, value: null, list: brief.applications.map((a) => a[lang]) },
    { label: t.lConstraints, value: null, list: brief.constraints.map((c) => c[lang]) },
    { label: t.lLevel, value: brief.level[lang] },
    { label: t.lDeadline, value: brief.deadline[lang] },
    { label: t.lToConfirm, value: null, list: brief.toConfirm.map((c) => c[lang]) },
  ]

  return (
    <div className="flex h-full flex-col">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">{t.briefTitle}</p>
      <dl className="mt-3 flex-1 space-y-3">
        {rows.map((row, i) => {
          const isVisible = reveal > i
          const isEmptyList = row.list && row.list.length === 0
          return (
            <motion.div
              key={row.label}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-[#EFE7D9] pb-3 last:border-b-0"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--store-muted)]">{row.label}</dt>
              {row.list ? (
                isEmptyList ? (
                  <dd className="mt-1 text-[13px] italic leading-snug text-[var(--store-muted)]">
                    {lang === 'fr' ? 'À préciser avec l’expert' : 'To specify with the expert'}
                  </dd>
                ) : (
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {row.list.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-md bg-[#D10E63]/[0.07] px-2 py-0.5 text-[12px] font-medium text-[#AD0C53]"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                )
              ) : (
                <dd className="mt-1 text-pretty text-[14px] leading-snug text-[var(--store-text)]">{row.value}</dd>
              )}
            </motion.div>
          )
        })}
      </dl>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reveal >= 8 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4"
      >
        <button
          type="button"
          onClick={onFind}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF9F3]"
        >
          {t.findExpert}
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  )
}

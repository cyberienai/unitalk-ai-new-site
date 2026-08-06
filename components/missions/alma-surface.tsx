'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Mic, Pause, Paperclip, Pencil, Play, Square, RotateCcw, X } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import type { Mission } from '@/lib/missions-catalog'
import { getMission } from '@/lib/missions-catalog'
import { searchMissions } from '@/lib/missions-store'
import {
  buildDraft,
  getClarifications,
  saveDraft,
  buildDecouvirHref,
  type MissionDraft,
  type Clarification,
  type Bi,
} from '@/lib/mission-draft'
import { MissionDraftFiche, type FicheShown } from './mission-draft-fiche'
import { AlmaDemoModal } from './alma-demo-modal'

const CANONICAL_SLUG = 'relancer-les-factures-impayees'

type Stage = 'intro' | 'listening' | 'clarifying' | 'ready'

/** A clarification the user has confirmed, tracked so it can be revised in place. */
type AnsweredClar = {
  key: string
  spoken: string
  value: Bi
  section: 'cadre' | 'validations'
  itemIndex: number
}

// Four conversation starters — real, matchable objectives.
const STARTERS: { text: { fr: string; en: string }; slug: string }[] = [
  { text: { fr: 'Relance chaque semaine les factures impayées.', en: 'Chase unpaid invoices every week.' }, slug: CANONICAL_SLUG },
  { text: { fr: 'Prépare mon prochain comité de direction.', en: 'Prepare my next leadership meeting.' }, slug: 'preparer-les-reunions' },
  { text: { fr: 'Réponds aux demandes reçues par email.', en: 'Answer the requests received by email.' }, slug: 'traiter-les-demandes-clients' },
  { text: { fr: 'Trouve des prospects correspondant à ces critères.', en: 'Find prospects matching these criteria.' }, slug: 'trouver-de-nouveaux-clients' },
]

function resolveMission(slug: string, query: string, lang: Lang): Mission {
  return getMission(slug) ?? searchMissions(query, lang)[0]?.mission ?? getMission(CANONICAL_SLUG)!
}

/* Minimal shape of the Web Speech API we rely on (typed locally so the build
   doesn't depend on DOM lib variants that omit SpeechRecognition). */
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

/** Native browser speech recognition, if available (Chrome/Edge/Safari; not Firefox). */
function getSpeechRecognition(): (new () => SpeechRec) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec
    webkitSpeechRecognition?: new () => SpeechRec
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export type LoadRequest = { mission: Mission; key: number }

export function AlmaSurface({
  lang,
  initialQuery = '',
  loadRequest,
  onHide,
}: {
  lang: Lang
  initialQuery?: string
  loadRequest?: LoadRequest | null
  onHide?: () => void
}) {
  const reduce = useReducedMotion()

  const [stage, setStage] = useState<Stage>('intro')
  const [text, setText] = useState(initialQuery)
  const [demoOpen, setDemoOpen] = useState(false)
  // Confirm popover shown only when a draft is under way.
  const [confirmHide, setConfirmHide] = useState(false)

  const [draft, setDraft] = useState<MissionDraft | null>(null)
  const [shown, setShown] = useState<FicheShown>({})
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  // Title of a mission picked from the catalog — drives Alma's opening line.
  const [loadedTitle, setLoadedTitle] = useState<string | null>(null)

  const [clarifications, setClarifications] = useState<Clarification[]>([])
  const [clarIndex, setClarIndex] = useState(0)
  const [lastAnswer, setLastAnswer] = useState<string | null>(null)
  const [answerText, setAnswerText] = useState('')
  // Each confirmed clarification, so a single answer can be revised without redoing all.
  const [answers, setAnswers] = useState<AnsweredClar[]>([])
  const [editingKey, setEditingKey] = useState<string | null>(null)
  // "Last meter" handoff feedback.
  const [adapting, setAdapting] = useState(false)

  // Voice-mode transient state.
  const [typed, setTyped] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  // True while the browser permission prompt is up (between click and grant).
  const [micRequesting, setMicRequesting] = useState(false)
  // Written composer visibility is lifted here so the voice fallback can open it.
  const [introWriting, setIntroWriting] = useState(initialQuery.trim().length > 0)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervals = useRef<ReturnType<typeof setInterval>[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const demoTriggerRef = useRef<HTMLButtonElement>(null)
  const writeFieldRef = useRef<HTMLTextAreaElement>(null)
  const ranInitial = useRef(false)
  const lastLoadKey = useRef<number | null>(null)
  // Live speech recognition + its accumulating final transcript.
  const recognitionRef = useRef<SpeechRec | null>(null)
  const finalTranscriptRef = useRef('')
  const wantListeningRef = useRef(false)

  const t = {
    title:
      lang === 'fr'
        ? 'Dites à Alma ce que votre Collaborateur IA doit accomplir.'
        : 'Tell Alma what your AI Collaborator should accomplish.',
    name: 'Alma',
    zoneTitle: lang === 'fr' ? 'Quelle mission souhaitez-vous confier ?' : 'Which mission would you like to hand off?',
    talk: lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma',
    micHint:
      lang === 'fr'
        ? 'Le micro ne s’active qu’après votre autorisation.'
        : 'The mic only turns on after you allow it.',
    micRequesting:
      lang === 'fr' ? 'Autoriser le micro pour parler à Alma' : 'Allow the mic to talk to Alma',
    writeToggle: lang === 'fr' ? 'Écrire à Alma' : 'Write to Alma',
    backToVoice: lang === 'fr' ? 'Revenir à la voix' : 'Back to voice',
    watch: lang === 'fr' ? 'Voir la démo · 45 s' : 'Watch the demo · 45 s',
    hideAria: lang === 'fr' ? 'Masquer Alma' : 'Hide Alma',
    hideConfirmTitle: lang === 'fr' ? 'Masquer Alma ?' : 'Hide Alma?',
    hideConfirmBody: lang === 'fr' ? 'Votre brouillon reste enregistré.' : 'Your draft stays saved.',
    hideConfirmYes: lang === 'fr' ? 'Masquer' : 'Hide',
    hideConfirmNo: lang === 'fr' ? 'Annuler' : 'Cancel',
    writePh: lang === 'fr' ? 'Décrivez la mission à confier…' : 'Describe the mission to hand off…',
    tryPrefix: lang === 'fr' ? 'Essayez :' : 'Try:',
    listening: lang === 'fr' ? 'Alma vous écoute' : 'Alma is listening',
    micOn: lang === 'fr' ? 'Micro actif' : 'Mic on',
    pause: lang === 'fr' ? 'Pause' : 'Pause',
    resume: lang === 'fr' ? 'Reprendre' : 'Resume',
    finish: lang === 'fr' ? 'Terminer' : 'Finish',
    toWrite: lang === 'fr' ? 'Passer à l’écrit' : 'Switch to writing',
    toVoice: lang === 'fr' ? 'Revenir au mode vocal' : 'Back to voice mode',
    understood: lang === 'fr' ? 'Compris' : 'Understood',
    placeholder: lang === 'fr' ? 'Décrivez ce que vous aimeriez confier…' : 'Describe what you’d like to hand off…',
    prepare: lang === 'fr' ? 'Préparer la mission' : 'Prepare the mission',
    attach: lang === 'fr' ? 'Joindre un document' : 'Attach a document',
    you: lang === 'fr' ? 'Vous' : 'You',
    // Alma's opening line when a mission is loaded from the catalog. Split so the
    // mission title can be emphasised between the two halves.
    handoffPre: lang === 'fr' ? 'Vous souhaitez confier « ' : 'You’d like to hand off "',
    handoffPost:
      lang === 'fr' ? ' ». Précisons ensemble le résultat attendu.' : '". Let’s define the expected result together.',
    almaAsks: lang === 'fr' ? 'Alma vous demande' : 'Alma asks',
    answerPh: lang === 'fr' ? 'Répondez à Alma…' : 'Answer Alma…',
    send: lang === 'fr' ? 'Envoyer' : 'Send',
    readyTitle: lang === 'fr' ? 'Votre mission est claire.' : 'Your mission is clear.',
    readyBody:
      lang === 'fr'
        ? 'Adaptons-la maintenant à votre entreprise.'
        : 'Let’s adapt it to your company now.',
    yourAnswers: lang === 'fr' ? 'Vos réponses' : 'Your answers',
    edit: lang === 'fr' ? 'Modifier' : 'Edit',
    cancelEdit: lang === 'fr' ? 'Annuler la modification' : 'Cancel edit',
    restart: lang === 'fr' ? 'Recommencer' : 'Start over',
    micDenied:
      lang === 'fr'
        ? 'Le micro n’est pas disponible. Vous pouvez écrire votre demande à Alma.'
        : 'The mic isn’t available. You can type your request to Alma.',
    micUnsupported:
      lang === 'fr'
        ? 'La reconnaissance vocale n’est pas disponible sur ce navigateur. Écrivez votre demande à Alma.'
        : 'Speech recognition isn’t available in this browser. Type your request to Alma instead.',
    sayHint: lang === 'fr' ? 'Vous pouvez dire :' : 'You can say:',
    listeningPrompt:
      lang === 'fr' ? 'Décrivez la mission à confier, à voix haute.' : 'Describe the mission to hand off, out loud.',
  }

  // A draft is "under way" once Alma has started or the visitor has typed.
  const draftInProgress = stage !== 'intro' || text.trim().length > 0

  const requestHide = useCallback(() => {
    if (!onHide) return
    if (draftInProgress) setConfirmHide(true)
    else onHide()
  }, [onHide, draftInProgress])

  // --- timing helpers --------------------------------------------------------
  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    intervals.current.forEach(clearInterval)
    timers.current = []
    intervals.current = []
  }, [])

  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  const flash = useCallback((key: string) => {
    setJustAdded(key)
    after(1300, () => setJustAdded((k) => (k === key ? null : k)))
  }, [after])

  const stopMic = useCallback(() => {
    streamRef.current?.getTracks().forEach((tr) => tr.stop())
    streamRef.current = null
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

  // Materialize a mission draft, then reveal it field by field into the fiche.
  const materialize = useCallback(
    (mission: Mission, request?: { fr: string; en: string }) => {
      clearAll()
      const d = buildDraft(mission, lang, request)
      const clars = getClarifications(mission, lang)
      setDraft(d)
      setClarifications(clars)
      setClarIndex(0)
      setReady(false)
      setLastAnswer(null)
      setShown({})

      const startClarify = () => setStage(clars.length > 0 ? 'clarifying' : 'ready')

      if (reduce) {
        setShown({ objective: true, result: true, rythme: true, cadre: d.cadre.length, validations: 0 })
        startClarify()
        if (clars.length === 0) setReady(true)
        return
      }

      after(120, () => {
        setShown((s) => ({ ...s, objective: true }))
        flash('objective')
      })
      after(600, () => {
        setShown((s) => ({ ...s, result: true }))
        flash('result')
      })
      after(1080, () => {
        setShown((s) => ({ ...s, rythme: true }))
        flash('rythme')
      })
      d.cadre.forEach((_, i) => {
        after(1560 + i * 440, () => {
          setShown((s) => ({ ...s, cadre: i + 1 }))
          flash(`cadre:${i}`)
        })
      })
      after(1560 + d.cadre.length * 440 + 500, () => {
        startClarify()
        if (clars.length === 0) setReady(true)
      })
    },
    [lang, reduce, clearAll, after, flash],
  )

  // Start a mission from a starter/text/loaded card.
  const start = useCallback(
    (mission: Mission, request: { fr: string; en: string }) => {
      stopMic()
      setStage('clarifying') // fiche building; will be corrected by materialize
      materialize(mission, request)
    },
    [materialize, stopMic],
  )

  // --- initial query + external load ----------------------------------------
  useEffect(() => {
    if (ranInitial.current) return
    ranInitial.current = true
    const q = initialQuery.trim()
    if (!q) return
    const m = searchMissions(q, lang)[0]?.mission
    if (m) start(m, { fr: q, en: q })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loadRequest || loadRequest.key === lastLoadKey.current) return
    lastLoadKey.current = loadRequest.key
    setLoadedTitle(loadRequest.mission.title[lang])
    start(loadRequest.mission, loadRequest.mission.title)
  }, [loadRequest, start, lang])

  // Persist the draft as it evolves so /decouvrir can pick it up.
  useEffect(() => {
    if (draft && stage !== 'intro') saveDraft(draft)
  }, [draft, stage])

  // Cleanup: stop timers + mic on unmount.
  useEffect(() => {
    return () => {
      clearAll()
      stopMic()
    }
  }, [clearAll, stopMic])

  // Suspend animations + release mic when the tab is hidden.
  useEffect(() => {
    const onHidden = () => {
      if (document.hidden && stage === 'listening') {
        clearAll()
        stopMic()
        setStage('intro')
        setTyped('')
        setSeconds(0)
      }
    }
    document.addEventListener('visibilitychange', onHidden)
    return () => document.removeEventListener('visibilitychange', onHidden)
  }, [stage, clearAll, stopMic])

  // --- voice mode (real transcription via the Web Speech API) ----------------
  const openWriteFallback = useCallback(() => {
    setStage('intro')
    setTyped('')
    setSeconds(0)
    setIntroWriting(true)
    requestAnimationFrame(() => writeFieldRef.current?.focus())
  }, [])

  // Build a recognition instance that appends finals to a ref and streams the
  // interim text into the visible transcript. Chrome ends the session on a
  // pause, so we transparently restart while the user still wants to listen.
  const buildRecognition = useCallback((): SpeechRec | null => {
    const SR = getSpeechRecognition()
    if (!SR) return null
    const rec = new SR()
    rec.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
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
          /* transient restart race — ignore */
        }
      }
    }
    return rec
  }, [lang, stopMic, t.micDenied, openWriteFallback])

  const requestMic = useCallback(() => {
    setMicError(null)
    const rec = buildRecognition()
    if (!rec) {
      // Unsupported browser (e.g. Firefox): fall straight back to writing.
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
    if (said) {
      const m = searchMissions(said, lang)[0]?.mission ?? getMission(CANONICAL_SLUG)!
      start(m, { fr: said, en: said })
    } else {
      // Nothing captured — return to the intro rather than faking a mission.
      setStage('intro')
      setTyped('')
      setSeconds(0)
    }
  }, [typed, lang, clearAll, stopMic, start])

  const switchToWrite = useCallback(() => {
    clearAll()
    stopMic()
    openWriteFallback()
  }, [clearAll, stopMic, openWriteFallback])

  // --- write mode ------------------------------------------------------------
  const submitWritten = useCallback(() => {
    const q = text.trim()
    if (!q) return
    const m = searchMissions(q, lang)[0]?.mission ?? getMission(CANONICAL_SLUG)!
    start(m, { fr: q, en: q })
  }, [text, lang, start])

  // Suggestion click: prefill the written composer (opening it) instead of
  // auto-launching a mission — one conversation, never a faked one.
  const pickExample = useCallback(
    (s: (typeof STARTERS)[number]) => {
      setText(s.text[lang])
      setIntroWriting(true)
      requestAnimationFrame(() => writeFieldRef.current?.focus())
    },
    [lang],
  )

  // --- clarifications --------------------------------------------------------
  const answerClarification = useCallback(
    (c: Clarification, spoken: string, replyIndex?: number) => {
      if (!draft) return
      setLastAnswer(spoken)
      setAnswerText('')

      // Resolve the value that lands in the draft: per-reply value if the picked
      // quick reply defines one, otherwise the clarification's fallback value.
      const value =
        replyIndex != null && c.replyValues && c.replyValues[replyIndex]
          ? c.replyValues[replyIndex]
          : c.add.value

      // --- Revision path: replace an already-confirmed answer in place. --------
      if (editingKey) {
        const existing = answers.find((a) => a.key === editingKey)
        if (existing) {
          setDraft((d) => {
            if (!d) return d
            const next = { ...d }
            if (existing.section === 'cadre') {
              const arr = [...d.cadre]
              arr[existing.itemIndex] = value
              next.cadre = arr
            } else {
              const arr = [...d.validations]
              arr[existing.itemIndex] = value
              next.validations = arr
            }
            return next
          })
          setAnswers((prev) => prev.map((a) => (a.key === editingKey ? { ...a, spoken, value } : a)))
          flash(`${existing.section}:${existing.itemIndex}`)
        }
        setEditingKey(null)
        after(reduce ? 0 : 300, () => {
          setReady(true)
          setStage('ready')
        })
        return
      }

      // --- Normal path: append a new confirmed answer. -------------------------
      const idx = c.add.section === 'cadre' ? draft.cadre.length : draft.validations.length
      setDraft((d) => {
        if (!d) return d
        const next = { ...d }
        if (c.add.section === 'cadre') next.cadre = [...d.cadre, value]
        else next.validations = [...d.validations, value]
        if (c.resolves) next.toClarify = d.toClarify.filter((h) => h.fr !== c.resolves)
        return next
      })
      setAnswers((prev) => [...prev, { key: c.key, spoken, value, section: c.add.section, itemIndex: idx }])
      if (c.add.section === 'cadre') {
        setShown((s) => ({ ...s, cadre: (s.cadre ?? 0) + 1 }))
        flash(`cadre:${idx}`)
      } else {
        setShown((s) => ({ ...s, validations: (s.validations ?? 0) + 1 }))
        flash(`validations:${idx}`)
      }

      const isLast = clarIndex >= clarifications.length - 1
      if (isLast) {
        after(reduce ? 0 : 900, () => {
          setReady(true)
          setStage('ready')
        })
      } else {
        setClarIndex((i) => i + 1)
      }
    },
    [draft, editingKey, answers, clarIndex, clarifications.length, flash, after, reduce],
  )

  // Re-ask a single confirmed clarification without redoing the whole mission.
  const startEdit = useCallback((key: string) => {
    setEditingKey(key)
    setLastAnswer(null)
    setStage('clarifying')
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingKey(null)
    setLastAnswer(null)
    setStage('ready')
  }, [])

  const reset = useCallback(() => {
    clearAll()
    stopMic()
    setStage('intro')
    setDraft(null)
    setShown({})
    setReady(false)
    setLoadedTitle(null)
    setJustAdded(null)
    setClarifications([])
    setClarIndex(0)
    setLastAnswer(null)
    setAnswers([])
    setEditingKey(null)
    setAdapting(false)
    setText('')
    setTyped('')
    setSeconds(0)
    setMicError(null)
    setIntroWriting(false)
  }, [clearAll, stopMic])

  // Handoff. The CTA is a real anchor (guaranteed navigation); this only saves
  // the draft for read-your-writes and surfaces a brief loading state.
  const adaptHref = draft ? buildDecouvirHref(draft) : '/decouvrir'
  const onAdapt = useCallback(() => {
    if (!draft) return
    setAdapting(true)
    saveDraft(draft)
  }, [draft])

  const currentClar = editingKey
    ? clarifications.find((c) => c.key === editingKey) ?? null
    : clarifications[clarIndex] ?? null

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  // Hide-Alma control — reused across the entry block and the conversation view.
  const hideControl = onHide ? (
    <div className="absolute right-3 top-3 z-30 sm:right-4 sm:top-4">
      <button
        type="button"
        onClick={requestHide}
        aria-label={t.hideAria}
        title={t.hideAria}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E7DFD0] bg-[#FBF9F3]/85 text-[var(--store-muted)] backdrop-blur-sm transition-colors hover:bg-[#FBF9F3] hover:text-[var(--store-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
      >
        <X className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {confirmHide && (
          <motion.div
            role="dialog"
            aria-label={t.hideConfirmTitle}
            initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-11 w-64 rounded-2xl border border-[#E7DFD0] bg-[#FBF9F3] p-4 text-left shadow-[0_12px_32px_-16px_rgba(28,26,23,0.35)]"
          >
            <p className="font-sf text-sm font-bold text-[var(--store-text)]">{t.hideConfirmTitle}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-[var(--store-muted)]">{t.hideConfirmBody}</p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmHide(false)}
                className="rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
              >
                {t.hideConfirmNo}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmHide(false)
                  onHide()
                }}
                className="rounded-lg bg-[#D10E63] px-3 py-1.5 text-[13px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
              >
                {t.hideConfirmYes}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null

  const entryStage = stage === 'intro' || stage === 'listening'

  return (
    <div>
      {/* Header — title only; the action sits directly beneath it. */}
      <header className="mb-4 text-center sm:mb-5">
        <h1 className="mx-auto max-w-2xl text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--store-text)] sm:text-[2.5rem]">
          {t.title}
        </h1>
      </header>

      {entryStage ? (
        // Single, centered Alma space — voice-first. No right column, no divider.
        <section
          className="relative mx-auto max-w-[720px] rounded-[28px] border border-[#E7DFD0] bg-[#FBF7F2] p-6 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_32px_-24px_rgba(28,26,23,0.25)] sm:p-8"
          aria-label={lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma'}
        >
          {hideControl}
          {stage === 'intro' && (
            <IntroPresence
              reduce={!!reduce}
              t={t}
              text={text}
              setText={setText}
              onSubmitText={submitWritten}
              onTalk={requestMic}
              onDemo={() => setDemoOpen(true)}
              demoTriggerRef={demoTriggerRef}
              micError={micError}
              micRequesting={micRequesting}
              example={STARTERS[0]}
              lang={lang}
              writing={introWriting}
              setWriting={setIntroWriting}
              writeRef={writeFieldRef}
              onPickExample={pickExample}
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
              example={STARTERS[0]}
              lang={lang}
            />
          )}
        </section>
      ) : (
        // Conversation view — two-panel surface with the living mission fiche.
        <section
          className="relative overflow-hidden rounded-[28px] border border-[#E7DFD0] bg-[#FBF7F2] shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_32px_-24px_rgba(28,26,23,0.25)]"
          aria-label={lang === 'fr' ? 'Préparer une mission avec Alma' : 'Prepare a mission with Alma'}
        >
          {hideControl}
          <div className="grid lg:min-h-[400px] lg:grid-cols-[42%_58%]">
            {/* LEFT — Alma + conversation */}
            <div className="relative flex flex-col border-b border-[#EBE3D6] bg-[#FBF3F1] p-5 sm:p-5 lg:border-b-0 lg:border-r">
              <ConversePanel
                t={t}
                stage={stage}
                clar={currentClar}
                lastAnswer={lastAnswer}
                answerText={answerText}
                setAnswerText={setAnswerText}
                onQuick={(spoken, ri) => currentClar && answerClarification(currentClar, spoken, ri)}
                onSend={() => {
                  if (currentClar && answerText.trim()) answerClarification(currentClar, answerText.trim())
                }}
                answers={answers}
                editing={!!editingKey}
                onEdit={startEdit}
                onCancelEdit={cancelEdit}
                onReset={reset}
                loadedTitle={loadedTitle}
                lang={lang}
              />
            </div>

            {/* RIGHT — living mission fiche */}
            <div className="bg-[#FBF9F3] p-5 sm:p-5">
              <MissionDraftFiche
                draft={draft}
                shown={shown}
                justAdded={justAdded}
                ready={ready}
                lang={lang}
                adaptHref={adaptHref}
                adapting={adapting}
                onAdapt={onAdapt}
                onContinue={() => {
                  setReady(false)
                  setStage('clarifying')
                }}
              />
            </div>
          </div>
        </section>
      )}

      <AlmaDemoModal
        open={demoOpen}
        lang={lang}
        onClose={() => {
          setDemoOpen(false)
          demoTriggerRef.current?.focus()
        }}
        onTry={() => {
          setDemoOpen(false)
          demoTriggerRef.current?.focus()
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Left-panel sub-views                                                        */
/* -------------------------------------------------------------------------- */

type Copy = Record<string, string>

/** One canonical suggestion — a phrase to say or to prefill the composer with. */
function SuggestionLine({
  example,
  lang,
  prefix,
  onPick,
}: {
  example: (typeof STARTERS)[number]
  lang: Lang
  prefix: string
  onPick: (s: (typeof STARTERS)[number]) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(example)}
      aria-label={`${prefix} ${example.text[lang]}`}
      className="group mt-5 inline-flex min-h-[40px] max-w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-center transition-colors hover:bg-[#D10E63]/8 focus-visible:bg-[#D10E63]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
    >
      <span className="shrink-0 text-xs font-bold uppercase tracking-[0.06em] text-[#AD0C53]" aria-hidden="true">
        {prefix}
      </span>
      <span className="min-w-0 text-pretty text-sm leading-snug text-[var(--store-text)]" aria-hidden="true">
        {`« ${example.text[lang]} »`}
      </span>
    </button>
  )
}

function IntroPresence({
  reduce,
  t,
  text,
  setText,
  onSubmitText,
  onTalk,
  onDemo,
  demoTriggerRef,
  micError,
  micRequesting,
  example,
  lang,
  writing,
  setWriting,
  writeRef,
  onPickExample,
}: {
  reduce: boolean
  t: Copy
  text: string
  setText: (v: string) => void
  onSubmitText: () => void
  onTalk: () => void
  onDemo: () => void
  demoTriggerRef: React.RefObject<HTMLButtonElement | null>
  micError: string | null
  micRequesting: boolean
  example: (typeof STARTERS)[number]
  lang: Lang
  writing: boolean
  setWriting: (v: boolean) => void
  writeRef: React.RefObject<HTMLTextAreaElement | null>
  onPickExample: (s: (typeof STARTERS)[number]) => void
}) {
  const [micHover, setMicHover] = useState(false)

  const openWriting = () => {
    setWriting(true)
    requestAnimationFrame(() => writeRef.current?.focus())
  }

  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      {/* 1. Alma, slightly larger */}
      <img
        src="/alma-avatar.png"
        alt="Alma"
        className="h-16 w-16 rounded-full object-cover ring-2 ring-[#D10E63]/30"
      />
      {/* 2. Name */}
      <p className="mt-3 font-sf text-lg font-bold text-[var(--store-text)]">{t.name}</p>
      {/* 3. Secondary demo link */}
      <button
        ref={demoTriggerRef}
        type="button"
        onClick={onDemo}
        className="group mt-1.5 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-1.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]" aria-hidden="true">
          <Play className="h-2.5 w-2.5" fill="currentColor" />
        </span>
        <span className="text-xs font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors group-hover:text-[var(--store-text)] group-hover:underline">
          {t.watch}
        </span>
      </button>

      {/* 4. Main question */}
      <h2 className="mt-5 text-balance font-sf text-2xl font-bold leading-tight tracking-[-0.01em] text-[var(--store-text)] sm:text-[1.75rem]">
        {t.zoneTitle}
      </h2>

      {/* 5. Dominant voice action. Reassurance is on-demand (tooltip on
          hover/focus); the permission message shows only while the prompt is up. */}
      <div className="relative mt-6 w-full max-w-[380px]">
        <button
          type="button"
          onClick={onTalk}
          onMouseEnter={() => setMicHover(true)}
          onMouseLeave={() => setMicHover(false)}
          onFocus={() => setMicHover(true)}
          onBlur={() => setMicHover(false)}
          aria-describedby="alma-mic-hint"
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-[#D10E63] px-6 py-3.5 text-base font-bold text-[#FBF9F3] shadow-[0_10px_28px_-12px_rgba(209,14,99,0.75)] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2]"
        >
          <Mic className="h-5 w-5" />
          {t.talk}
        </button>
        <AnimatePresence>
          {micHover && !micRequesting && (
            <motion.span
              id="alma-mic-hint"
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

      {/* 6. Secondary write link — deliberately not a second primary CTA. */}
      {!writing ? (
        <button
          type="button"
          onClick={openWriting}
          className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors hover:text-[var(--store-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          <Pencil className="h-4 w-4" />
          {t.writeToggle}
        </button>
      ) : (
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 w-full max-w-[420px] overflow-hidden text-left"
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
              rows={1}
              placeholder={t.writePh}
              aria-label={t.writePh}
              className="max-h-[112px] min-h-[24px] w-full resize-none bg-transparent px-1.5 py-1 text-[15px] leading-relaxed text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
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

      {/* 7. One canonical suggestion. */}
      <SuggestionLine example={example} lang={lang} prefix={t.tryPrefix} onPick={onPickExample} />
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
  example: (typeof STARTERS)[number]
  lang: Lang
}) {
  return (
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      {/* Status — announced to assistive tech. */}
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

      {/* Mic + waveform (static bars when reduced motion is preferred). */}
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

      {/* Live transcript */}
      <div className="mt-6 min-h-[92px] w-full rounded-2xl bg-[#FBF9F3]/70 p-4 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">
          {lang === 'fr' ? 'Transcription' : 'Transcript'}
        </p>
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

      {/* Suggestion to pronounce — guidance, never an auto-launch. */}
      <p className="mt-3 text-pretty text-xs text-[var(--store-muted)]">
        <span className="font-semibold text-[#AD0C53]">{t.sayHint} </span>
        {`« ${example.text[lang]} »`}
      </p>

      {/* Controls: validate (finish) or switch to writing. */}
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

function ConversePanel({
  t,
  stage,
  clar,
  lastAnswer,
  answerText,
  setAnswerText,
  onQuick,
  onSend,
  answers,
  editing,
  onEdit,
  onCancelEdit,
  onReset,
  loadedTitle,
  lang,
}: {
  t: Copy
  stage: Stage
  clar: Clarification | null
  lastAnswer: string | null
  answerText: string
  setAnswerText: (v: string) => void
  onQuick: (spoken: string, replyIndex: number) => void
  onSend: () => void
  answers: AnsweredClar[]
  editing: boolean
  onEdit: (key: string) => void
  onCancelEdit: () => void
  onReset: () => void
  loadedTitle: string | null
  lang: Lang
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <img src="/alma-avatar.png" alt="Alma" className="h-9 w-9 rounded-full object-cover ring-1 ring-[#D10E63]/30" />
        <p className="font-sf text-sm font-bold text-[var(--store-text)]">{t.name}</p>
      </div>

      {/* Opening line when the mission came from the catalog. */}
      {loadedTitle && (
        <p className="mt-4 rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--store-text)]">
          {t.handoffPre}
          <span className="font-semibold">{loadedTitle}</span>
          {t.handoffPost}
        </p>
      )}

      {lastAnswer && (
        <div className="mt-4 self-end rounded-2xl rounded-br-sm bg-[#D10E63] px-3.5 py-2 text-sm text-[#FBF9F3]">
          <span className="sr-only">{t.you}: </span>
          {lastAnswer}
        </div>
      )}

      {stage === 'clarifying' && clar ? (
        <div className="mt-4">
          {editing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="mb-2 inline-flex min-h-[32px] items-center gap-1 rounded-lg text-xs font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors hover:text-[var(--store-text)] hover:underline"
            >
              {t.cancelEdit}
            </button>
          )}
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">{t.almaAsks}</p>
          <p className="mt-1.5 rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--store-text)]">
            {clar.question[lang]}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {clar.quickReplies.map((r, ri) => {
              // Spoken answer shown in the bubble: per-reply answer if provided,
              // otherwise the picked reply label itself.
              const spoken = clar.replyAnswers?.[ri]?.[lang] ?? r[lang]
              return (
                <button
                  key={r[lang]}
                  type="button"
                  onClick={() => onQuick(spoken, ri)}
                  className="min-h-[40px] rounded-full border border-[#D10E63]/30 bg-[#FCEAF2]/60 px-3.5 py-1.5 text-sm font-semibold text-[#AD0C53] transition-colors hover:bg-[#FCEAF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                >
                  {r[lang]}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-full border border-[#E7DFD0] bg-[#FBF9F3] px-2 py-1">
            <input
              type="text"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  onSend()
                }
              }}
              placeholder={t.answerPh}
              aria-label={t.answerPh}
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
            />
            <button
              type="button"
              onClick={onSend}
              aria-label={t.send}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--store-text)]">
            {t.readyTitle} {t.readyBody}
          </p>

          {answers.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">{t.yourAnswers}</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {answers.map((a) => (
                  <li
                    key={a.key}
                    className="flex items-start justify-between gap-2 rounded-xl border border-[#E7DFD0] bg-[#FBF9F3] px-3 py-2"
                  >
                    <span className="min-w-0 flex-1 text-sm leading-snug text-[var(--store-text)]">{a.value[lang]}</span>
                    <button
                      type="button"
                      onClick={() => onEdit(a.key)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-semibold text-[#AD0C53] underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      {t.edit}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
        >
          <RotateCcw className="h-4 w-4" />
          {t.restart}
        </button>
      </div>
    </div>
  )
}

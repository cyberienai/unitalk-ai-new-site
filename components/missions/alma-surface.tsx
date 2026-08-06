'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Mic, Pause, Paperclip, Pencil, Play, Square, RotateCcw } from 'lucide-react'
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

// Understood cues surfaced during the canonical voice transcript.
const VOICE_TRANSCRIPT = {
  fr: 'Je voudrais relancer automatiquement chaque semaine les clients dont les factures sont arrivées à échéance…',
  en: 'I’d like to automatically chase, every week, the customers whose invoices are past due…',
}
const UNDERSTOOD = [
  { fr: 'chaque semaine', en: 'every week' },
  { fr: 'clients', en: 'customers' },
  { fr: 'factures à échéance', en: 'invoices past due' },
  { fr: 'relancer', en: 'follow up' },
]

function resolveMission(slug: string, query: string, lang: Lang): Mission {
  return getMission(slug) ?? searchMissions(query, lang)[0]?.mission ?? getMission(CANONICAL_SLUG)!
}

export type LoadRequest = { mission: Mission; key: number }

export function AlmaSurface({
  lang,
  initialQuery = '',
  loadRequest,
}: {
  lang: Lang
  initialQuery?: string
  loadRequest?: LoadRequest | null
}) {
  const reduce = useReducedMotion()

  const [stage, setStage] = useState<Stage>('intro')
  const [text, setText] = useState(initialQuery)
  const [demoOpen, setDemoOpen] = useState(false)

  const [draft, setDraft] = useState<MissionDraft | null>(null)
  const [shown, setShown] = useState<FicheShown>({})
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

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
  const [cues, setCues] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [paused, setPaused] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervals = useRef<ReturnType<typeof setInterval>[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const demoTriggerRef = useRef<HTMLButtonElement>(null)
  const ranInitial = useRef(false)
  const lastLoadKey = useRef<number | null>(null)

  const t = {
    title: lang === 'fr' ? 'Dites à Alma ce que vous souhaitez confier.' : 'Tell Alma what you’d like to hand off.',
    name: 'Alma',
    zoneTitle: lang === 'fr' ? 'Qu’est-ce qu’il faut faire ?' : 'What needs doing?',
    talk: lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma',
    consent: lang === 'fr' ? 'Le micro s’active uniquement avec votre accord.' : 'The mic only turns on with your consent.',
    watch: lang === 'fr' ? 'Voir la démo · 45 s' : 'Watch the demo · 45 s',
    writePh: lang === 'fr' ? 'Ou écrivez-le ici…' : 'Or write it here…',
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
  }

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
    start(loadRequest.mission, loadRequest.mission.title)
  }, [loadRequest, start])

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

  // --- voice mode ------------------------------------------------------------
  const runListening = useCallback(() => {
    setStage('listening')
    setTyped('')
    setCues(0)
    setSeconds(0)
    setPaused(false)

    const full = VOICE_TRANSCRIPT[lang]
    const words = full.split(' ')
    let wi = 0

    if (reduce) {
      setTyped(full)
      setCues(UNDERSTOOD.length)
      after(400, () => {
        stopMic()
        start(getMission(CANONICAL_SLUG)!, STARTERS[0].text)
      })
      return
    }

    const typer = setInterval(() => {
      wi += 1
      setTyped(words.slice(0, wi).join(' '))
      if (wi >= words.length) clearInterval(typer)
    }, 130)
    intervals.current.push(typer)

    const clock = setInterval(() => setSeconds((s) => s + 1), 1000)
    intervals.current.push(clock)

    UNDERSTOOD.forEach((_, i) => after(900 + i * 700, () => setCues(i + 1)))

    // After the sentence lands, stop the mic and build the mission.
    after(words.length * 130 + 900, () => {
      clearInterval(clock)
      stopMic()
      start(getMission(CANONICAL_SLUG)!, STARTERS[0].text)
    })
  }, [lang, reduce, after, stopMic, start])

  const requestMic = useCallback(async () => {
    setMicError(null)
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setMicError(t.micDenied)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      runListening()
    } catch {
      setMicError(t.micDenied)
    }
  }, [runListening, t.micDenied])

  const togglePause = useCallback(() => {
    setPaused((p) => {
      const next = !p
      if (next) {
        clearAll()
      } else {
        // resume clock only; transcript already visible enough
        const clock = setInterval(() => setSeconds((s) => s + 1), 1000)
        intervals.current.push(clock)
      }
      return next
    })
  }, [clearAll])

  const finishListening = useCallback(() => {
    clearAll()
    stopMic()
    start(getMission(CANONICAL_SLUG)!, STARTERS[0].text)
  }, [clearAll, stopMic, start])

  const switchToWrite = useCallback(() => {
    clearAll()
    stopMic()
    setStage('intro')
    setTyped('')
    setSeconds(0)
  }, [clearAll, stopMic])

  // --- write mode ------------------------------------------------------------
  const submitWritten = useCallback(() => {
    const q = text.trim()
    if (!q) return
    const m = searchMissions(q, lang)[0]?.mission ?? getMission(CANONICAL_SLUG)!
    start(m, { fr: q, en: q })
  }, [text, lang, start])

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

  return (
    <div>
      {/* Header — title only; the action sits directly beneath it. */}
      <header className="mb-4 text-center sm:mb-5">
        <h1 className="mx-auto max-w-2xl text-balance font-sf text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--store-text)] sm:text-[2.5rem]">
          {t.title}
        </h1>
      </header>

      {/* Continuous two-panel surface */}
      <section
        className="overflow-hidden rounded-[28px] border border-[#E7DFD0] bg-[#FBF7F2] shadow-[0_1px_2px_rgba(28,26,23,0.04),0_12px_32px_-24px_rgba(28,26,23,0.25)]"
        aria-label={lang === 'fr' ? 'Préparer une mission avec Alma' : 'Prepare a mission with Alma'}
      >
        <div className="grid lg:min-h-[440px] lg:grid-cols-[42%_58%]">
          {/* LEFT — Alma + conversation */}
          <div className="relative flex flex-col border-b border-[#EBE3D6] bg-[#FBF3F1] p-5 sm:p-6 lg:border-b-0 lg:border-r">
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
                starters={STARTERS}
                lang={lang}
                onStarter={(s) => start(resolveMission(s.slug, s.text[lang], lang), s.text)}
              />
            )}

            {stage === 'listening' && (
              <ListeningPanel
                reduce={!!reduce}
                t={t}
                typed={typed}
                cues={cues}
                mmss={mmss}
                paused={paused}
                onPause={togglePause}
                onFinish={finishListening}
                onWrite={switchToWrite}
                lang={lang}
              />
            )}

            {(stage === 'clarifying' || stage === 'ready') && (
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
                lang={lang}
              />
            )}
          </div>

          {/* RIGHT — living mission fiche */}
          <div className="bg-[#FBF9F3] p-5 sm:p-6">
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

/**
 * A single suggestion that fades between four real objectives every 5 s. It
 * stops the moment the visitor engages (hover, focus, typing) and, with
 * reduced motion, shows only the first line without rotating.
 */
function RotatingExample({
  starters,
  lang,
  reduce,
  paused,
  prefix,
  onPick,
}: {
  starters: typeof STARTERS
  lang: Lang
  reduce: boolean
  paused: boolean
  prefix: string
  onPick: (s: (typeof STARTERS)[number]) => void
}) {
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  const stopped = reduce || paused || hover

  useEffect(() => {
    if (stopped) return
    const id = setInterval(() => setI((n) => (n + 1) % starters.length), 5000)
    return () => clearInterval(id)
  }, [stopped, starters.length])

  const current = starters[i]
  return (
    <button
      type="button"
      onClick={() => onPick(current)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${prefix} ${current.text[lang]}`}
      className="group mt-3 inline-flex min-h-[40px] w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-[#D10E63]/8 focus-visible:bg-[#D10E63]/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
    >
      <span className="shrink-0 text-xs font-bold uppercase tracking-[0.06em] text-[#AD0C53]" aria-hidden="true">
        {prefix}
      </span>
      <motion.span
        key={current.slug}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-w-0 text-pretty text-sm leading-snug text-[var(--store-text)]"
        aria-hidden="true"
      >
        {`« ${current.text[lang]} »`}
      </motion.span>
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
  starters,
  lang,
  onStarter,
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
  starters: typeof STARTERS
  lang: Lang
  onStarter: (s: (typeof STARTERS)[number]) => void
}) {
  const [focused, setFocused] = useState(false)
  const examplePaused = focused || text.trim().length > 0

  return (
    <div className="flex h-full flex-col">
      {/* Internal header line: identity on the left, quiet demo link on the right. */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src="/alma-avatar.png" alt="Alma" className="h-9 w-9 rounded-full object-cover ring-2 ring-[#D10E63]/30" />
          <p className="font-sf text-base font-bold text-[var(--store-text)]">{t.name}</p>
        </div>
        <button
          ref={demoTriggerRef}
          type="button"
          onClick={onDemo}
          className="group inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-1.5 py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/12 text-[#D10E63]" aria-hidden="true">
            <Play className="h-2.5 w-2.5" fill="currentColor" />
          </span>
          <span className="text-xs font-semibold text-[var(--store-muted)] underline-offset-4 transition-colors group-hover:text-[var(--store-text)] group-hover:underline">
            {t.watch}
          </span>
        </button>
      </div>

      {/* Prompt + voice-first action */}
      <h2 className="mt-5 text-balance font-sf text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--store-text)]">
        {t.zoneTitle}
      </h2>

      <button
        type="button"
        onClick={onTalk}
        className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-sm font-bold text-[#FBF9F3] shadow-[0_8px_24px_-12px_rgba(209,14,99,0.7)] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF3F1]"
      >
        <Mic className="h-[18px] w-[18px]" />
        {t.talk}
      </button>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--store-muted)]">{t.consent}</p>
      {micError && <p className="mt-1 text-xs font-medium text-[#B00B52]">{micError}</p>}

      {/* Always-visible written composer — same draft as the voice. */}
      <div className="mt-3 rounded-2xl border border-[#E7DFD0] bg-[#FBF9F3] p-2.5 transition-colors focus-within:border-[#D10E63]/50 focus-within:ring-2 focus-within:ring-[#D10E63]/15">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
          <div className="flex items-center gap-1">
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
              onClick={onTalk}
              aria-label={t.talk}
              title={t.talk}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F1EADF] hover:text-[var(--store-text)]"
            >
              <Mic className="h-[18px] w-[18px]" />
            </button>
          </div>
          <button
            type="button"
            onClick={onSubmitText}
            disabled={!text.trim()}
            aria-label={t.prepare}
            title={t.prepare}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF3F1]"
          >
            <ArrowUp className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* A single, rotating suggestion. */}
      <RotatingExample
        starters={starters}
        lang={lang}
        reduce={reduce}
        paused={examplePaused}
        prefix={t.tryPrefix}
        onPick={onStarter}
      />
    </div>
  )
}

function ListeningPanel({
  reduce,
  t,
  typed,
  cues,
  mmss,
  paused,
  onPause,
  onFinish,
  onWrite,
  lang,
}: {
  reduce: boolean
  t: Copy
  typed: string
  cues: number
  mmss: string
  paused: boolean
  onPause: () => void
  onFinish: () => void
  onWrite: () => void
  lang: Lang
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63]/60" />}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D10E63]" />
          </span>
          <p className="font-sf text-base font-bold text-[var(--store-text)]">{t.listening}</p>
        </div>
        <span className="rounded-full bg-[#D10E63]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#AD0C53]">
          {t.micOn} · {mmss}
        </span>
      </div>

      {/* Reactive waveform */}
      <div className="mt-5 flex items-end justify-center gap-1" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-[#D10E63]"
            initial={{ height: 8 }}
            animate={reduce || paused ? { height: 12 } : { height: [8, 8 + ((i % 3) + 1) * 12, 8] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Continuous transcript */}
      <div className="mt-5 min-h-[92px] rounded-2xl bg-[#FBF9F3]/70 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">
          {lang === 'fr' ? 'Transcription' : 'Transcript'}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--store-text)]" aria-live="polite">
          {typed}
          {!reduce && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#D10E63] align-middle" />}
        </p>
      </div>

      {/* Understood cues */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {UNDERSTOOD.slice(0, cues).map((u) => (
          <motion.span
            key={u[lang]}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-[#D10E63]/25 bg-[#FCEAF2]/70 px-2.5 py-0.5 text-xs font-medium text-[#AD0C53]"
          >
            {u[lang]}
          </motion.span>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <button
          type="button"
          onClick={onPause}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[#E7DFD0] px-3 py-2 text-sm font-semibold text-[var(--store-text)] transition-colors hover:bg-[#F1EADF]"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {paused ? t.resume : t.pause}
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#D10E63] px-3 py-2 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
        >
          <Square className="h-3.5 w-3.5" />
          {t.finish}
        </button>
        <button
          type="button"
          onClick={onWrite}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--store-muted)] transition-colors hover:text-[var(--store-text)]"
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
  lang: Lang
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <img src="/alma-avatar.png" alt="Alma" className="h-9 w-9 rounded-full object-cover ring-1 ring-[#D10E63]/30" />
        <p className="font-sf text-sm font-bold text-[var(--store-text)]">{t.name}</p>
      </div>

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

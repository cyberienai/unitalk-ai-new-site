'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Mic, Paperclip, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { searchMissions } from '@/lib/missions-store'
import type { Mission } from '@/lib/missions-catalog'
import { MissionFiche, FICHE_STEPS } from './mission-fiche'

type Phase = 'idle' | 'listening' | 'analyzing' | 'materializing' | 'ready'

// Suggestion chips seed the field with real, matchable objectives.
const SUGGESTIONS: { fr: string; en: string }[] = [
  { fr: 'Relancer mes factures impayées', en: 'Chase my unpaid invoices' },
  { fr: 'Trouver de nouveaux clients', en: 'Find new customers' },
  { fr: 'Répondre à mes clients', en: 'Answer my customers' },
  { fr: 'Publier sur mes réseaux sociaux', en: 'Post on my social media' },
]

/** Resolve the closest catalog mission to a free-text objective. */
function matchMission(text: string, lang: Lang): Mission | null {
  const results = searchMissions(text, lang)
  return results.length > 0 ? results[0].mission : null
}

export function WorkTable({ lang, initialQuery = '' }: { lang: Lang; initialQuery?: string }) {
  const reduce = useReducedMotion()
  const [text, setText] = useState(initialQuery)
  const [phase, setPhase] = useState<Phase>('idle')
  const [mission, setMission] = useState<Mission | null>(null)
  const [revealed, setRevealed] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const ranInitial = useRef(false)

  const t = {
    fr: {
      eyebrow: 'Table de travail',
      title: 'Décrivez ce que vous souhaitez confier',
      subtitle: 'Alma construit la mission en direct et prépare le Collaborateur IA capable de l’accomplir.',
      placeholder: 'Ex. : relancer mes factures impayées chaque semaine…',
      ask: 'Demandez à Alma',
      send: 'Envoyer à Alma',
      attach: 'Joindre un fichier',
      mic: 'Parler à Alma',
      stop: 'Arrêter',
      suggestionsLabel: 'Ou essayez :',
      listening: 'Alma vous écoute…',
      analyzing: 'Alma analyse votre demande…',
      materializing: 'Alma construit la mission…',
      ready: 'Voici la mission qu’Alma a préparée.',
    },
    en: {
      eyebrow: 'Work table',
      title: 'Describe what you want to hand off',
      subtitle: 'Alma builds the mission live and prepares the AI Collaborator able to accomplish it.',
      placeholder: 'E.g.: chase my unpaid invoices every week…',
      ask: 'Ask Alma',
      send: 'Send to Alma',
      attach: 'Attach a file',
      mic: 'Talk to Alma',
      stop: 'Stop',
      suggestionsLabel: 'Or try:',
      listening: 'Alma is listening…',
      analyzing: 'Alma is analyzing your request…',
      materializing: 'Alma is building the mission…',
      ready: 'Here is the mission Alma prepared.',
    },
  }[lang]

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  // Core sequence: analyze → materialize the matched mission field by field.
  const materialize = useCallback(
    (value: string) => {
      const query = value.trim()
      if (!query) return
      clearTimers()
      const match = matchMission(query, lang)
      setMission(match)
      setRevealed(0)

      if (reduce) {
        setPhase('ready')
        setRevealed(FICHE_STEPS)
        return
      }

      setPhase('analyzing')
      const push = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms))

      push(() => setPhase('materializing'), 900)
      // Reveal each fiche step on a stagger once materializing begins.
      for (let i = 1; i <= FICHE_STEPS; i++) {
        push(() => setRevealed(i), 900 + i * 520)
      }
      push(() => setPhase('ready'), 900 + (FICHE_STEPS + 1) * 520)
    },
    [lang, reduce, clearTimers],
  )

  // Auto-run when arriving with ?q=.
  useEffect(() => {
    if (ranInitial.current) return
    ranInitial.current = true
    if (initialQuery.trim()) materialize(initialQuery)
  }, [initialQuery, materialize])

  useEffect(() => () => clearTimers(), [clearTimers])

  const submit = useCallback(() => materialize(text), [materialize, text])

  // Simulated voice: briefly "listen", drop a canned transcript, then materialize.
  const toggleMic = useCallback(() => {
    if (phase === 'listening') {
      clearTimers()
      setPhase('idle')
      return
    }
    clearTimers()
    setPhase('listening')
    const spoken = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)][lang]
    timers.current.push(
      setTimeout(() => {
        setText(spoken)
        materialize(spoken)
      }, 1600),
    )
  }, [phase, lang, materialize, clearTimers])

  const statusText =
    phase === 'listening'
      ? t.listening
      : phase === 'analyzing'
        ? t.analyzing
        : phase === 'materializing'
          ? t.materializing
          : phase === 'ready'
            ? t.ready
            : null

  const busy = phase === 'analyzing' || phase === 'materializing'

  return (
    <section className="rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-5 sm:p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
        {/* Left — conversational entry */}
        <div className="flex flex-col">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">{t.eyebrow}</p>
          <h1 className="mt-3 text-balance font-sf text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--store-text)] sm:text-3xl">
            {t.title}
          </h1>
          <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-[var(--store-muted)]">{t.subtitle}</p>

          {/* Ask Alma field */}
          <div className="mt-6 rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] p-3 transition-colors focus-within:border-[#D10E63]/60 focus-within:ring-2 focus-within:ring-[#D10E63]/15">
            <label htmlFor="work-ask" className="mb-2 flex items-center gap-2 px-1">
              <img
                src="/alma-avatar.png"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 rounded-full object-cover ring-1 ring-[#D10E63]/40"
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
                {t.ask}
              </span>
            </label>
            <input
              id="work-ask"
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="w-full bg-transparent px-1 text-[15px] text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
            />
            <div className="mt-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={submit}
                  aria-label={t.attach}
                  title={t.attach}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)]"
                >
                  <Paperclip className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={phase === 'listening' ? t.stop : t.mic}
                  title={phase === 'listening' ? t.stop : t.mic}
                  aria-pressed={phase === 'listening'}
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    phase === 'listening'
                      ? 'bg-[#D10E63] text-[#FBF9F3]'
                      : 'text-[var(--store-muted)] hover:bg-[#F3F0E9] hover:text-[var(--store-text)]'
                  }`}
                >
                  {phase === 'listening' ? <Square className="h-4 w-4" /> : <Mic className="h-[18px] w-[18px]" />}
                  {phase === 'listening' && (
                    <span className="absolute inset-0 animate-ping rounded-lg bg-[#D10E63]/40" aria-hidden="true" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={submit}
                aria-label={t.send}
                title={t.send}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#D10E63] px-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
              >
                {t.send}
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Voice waveform + status */}
          {statusText && (
            <div className="mt-4 flex items-center gap-3" role="status" aria-live="polite">
              {(phase === 'listening' || busy) && (
                <div className="flex items-end gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1 rounded-full bg-[#D10E63]"
                      initial={{ height: 6 }}
                      animate={reduce ? { height: 10 } : { height: [6, 16, 6] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              )}
              <span className="text-sm font-medium text-[var(--store-muted)]">{statusText}</span>
            </div>
          )}

          {/* Suggestions */}
          {phase === 'idle' && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--store-muted)]">
                {t.suggestionsLabel}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s[lang]}
                    type="button"
                    onClick={() => {
                      setText(s[lang])
                      materialize(s[lang])
                    }}
                    className="rounded-full border border-[var(--store-line)] bg-[var(--store-page)] px-3.5 py-1.5 text-sm font-medium text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#AD0C53]"
                  >
                    {s[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — live fiche */}
        <MissionFiche mission={phase === 'idle' ? null : mission} revealed={revealed} lang={lang} />
      </div>
    </section>
  )
}

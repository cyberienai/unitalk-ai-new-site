'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Mic, Paperclip, Square, Sparkles, ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { ALMA_EXAMPLES, searchStore, TYPE_LABELS_PLURAL, type StoreType } from '@/lib/store-catalog'

// Suggestions that seed the field with real, matchable needs.
const SUGGESTIONS = ALMA_EXAMPLES

/** Count matched items per type for the live recommendation panel. */
function tally(query: string, lang: Lang): Record<StoreType, number> {
  const out: Record<StoreType, number> = { profil: 0, competence: 0, application: 0 }
  if (!query.trim()) return out
  for (const { item } of searchStore(query, lang)) out[item.type] += 1
  return out
}

export function StoreAlmaConsole({
  lang,
  initialQuery = '',
  onCompose,
}: {
  lang: Lang
  initialQuery?: string
  onCompose: (query: string) => void
}) {
  const reduce = useReducedMotion()
  const [text, setText] = useState(initialQuery)
  const [focused, setFocused] = useState(false)
  const [listening, setListening] = useState(false)
  const [exampleIndex, setExampleIndex] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const t = {
    fr: {
      eyebrow: 'Demandez à Alma',
      title: 'Décrivez ce que votre Collaborateur IA doit savoir faire',
      subtitle:
        'Alma identifie les profils métier, les compétences et les applications adaptés, puis les assemble selon votre Organisation.',
      send: 'Envoyer le message',
      attach: 'Joindre un document',
      mic: 'Parler à Alma',
      stop: 'Arrêter',
      suggestionsLabel: 'Ou essayez :',
      listening: 'Alma vous écoute…',
      panelIdle: 'Décrivez un besoin pour qu’Alma prépare une recommandation.',
      panelFound: 'Alma a repéré pour votre Collaborateur IA :',
      compose: 'Préparer avec Alma',
      units: {
        profil: (n: number) => `${n} profil${n > 1 ? 's' : ''} métier`,
        competence: (n: number) => `${n} compétence${n > 1 ? 's' : ''}`,
        application: (n: number) => `${n} application${n > 1 ? 's' : ''}`,
      },
      none: 'Aucun élément exact — Alma composera un équipement sur mesure.',
    },
    en: {
      eyebrow: 'Ask Alma',
      title: 'Describe what your AI Collaborator needs to know how to do',
      subtitle:
        'Alma identifies the right job profiles, skills and applications, then assembles them for your Organization.',
      send: 'Send the message',
      attach: 'Attach a document',
      mic: 'Talk to Alma',
      stop: 'Stop',
      suggestionsLabel: 'Or try:',
      listening: 'Alma is listening…',
      panelIdle: 'Describe a need and Alma will prepare a recommendation.',
      panelFound: 'Alma found for your AI Collaborator:',
      compose: 'Prepare with Alma',
      units: {
        profil: (n: number) => `${n} job profile${n > 1 ? 's' : ''}`,
        competence: (n: number) => `${n} skill${n > 1 ? 's' : ''}`,
        application: (n: number) => `${n} application${n > 1 ? 's' : ''}`,
      },
      none: 'No exact match — Alma will compose tailored equipment.',
    },
  }[lang]

  // Scroll through concrete examples while the field is empty and unfocused.
  useEffect(() => {
    if (focused || text) return
    const id = setInterval(() => setExampleIndex((i) => (i + 1) % SUGGESTIONS.length), 2600)
    return () => clearInterval(id)
  }, [focused, text])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const counts = useMemo(() => tally(text, lang), [text, lang])
  const totalFound = counts.profil + counts.competence + counts.application
  const hasText = text.trim().length > 0

  const submit = useCallback(() => {
    if (text.trim()) onCompose(text.trim())
  }, [text, onCompose])

  const toggleMic = useCallback(() => {
    if (listening) {
      timers.current.forEach(clearTimeout)
      setListening(false)
      return
    }
    setListening(true)
    const spoken = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)][lang]
    timers.current.push(
      setTimeout(() => {
        setListening(false)
        setText(spoken)
        inputRef.current?.focus()
      }, 1600),
    )
  }, [listening, lang])

  const placeholder =
    lang === 'fr'
      ? `Décrivez ce que votre Collaborateur IA doit savoir faire… ${SUGGESTIONS[exampleIndex].fr}`
      : `Describe what your AI Collaborator needs to do… ${SUGGESTIONS[exampleIndex].en}`

  const entries: { type: StoreType; label: string }[] = [
    { type: 'profil', label: t.units.profil(counts.profil) },
    { type: 'competence', label: t.units.competence(counts.competence) },
    { type: 'application', label: t.units.application(counts.application) },
  ]

  return (
    <section className="rounded-3xl border border-[var(--store-line)] bg-[var(--store-surface)] p-5 sm:p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8">
        {/* Left — conversational entry */}
        <div className="flex flex-col">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">{t.eyebrow}</p>
          <h2 className="mt-3 text-balance font-sf text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--store-text)] sm:text-[27px]">
            {t.title}
          </h2>
          <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-[var(--store-muted)]">{t.subtitle}</p>

          <div className="mt-6 rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] p-3 transition-colors focus-within:border-[#D10E63]/60 focus-within:ring-2 focus-within:ring-[#D10E63]/15">
            <label htmlFor="store-ask" className="mb-2 flex items-center gap-2 px-1">
              <img
                src="/alma-avatar.png"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 rounded-full object-cover ring-1 ring-[#D10E63]/40"
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
                {t.eyebrow}
              </span>
            </label>
            <input
              id="store-ask"
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder={placeholder}
              aria-label={lang === 'fr' ? 'Décrivez ce que votre Collaborateur IA doit savoir faire' : 'Describe what your AI Collaborator needs to do'}
              className="w-full bg-transparent px-1 text-[15px] text-[var(--store-text)] outline-none placeholder:text-[var(--store-muted)]"
            />
            <div className="mt-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  aria-label={t.attach}
                  title={t.attach}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--store-muted)] transition-colors hover:bg-[#F3F0E9] hover:text-[var(--store-text)]"
                >
                  <Paperclip className="h-[18px] w-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={listening ? t.stop : t.mic}
                  title={listening ? t.stop : t.mic}
                  aria-pressed={listening}
                  className={`relative inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
                    listening
                      ? 'bg-[#D10E63] text-[#FBF9F3]'
                      : 'text-[var(--store-muted)] hover:bg-[#F3F0E9] hover:text-[var(--store-text)]'
                  }`}
                >
                  {listening ? <Square className="h-4 w-4" /> : <Mic className="h-[18px] w-[18px]" />}
                  {listening && (
                    <span className="absolute inset-0 animate-ping rounded-lg bg-[#D10E63]/40" aria-hidden="true" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={submit}
                aria-label={t.send}
                title={t.send}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-[#D10E63] px-4 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B60C56]"
              >
                {t.send}
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          {listening && (
            <div className="mt-4 flex items-center gap-3" role="status" aria-live="polite">
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
              <span className="text-sm font-medium text-[var(--store-muted)]">{t.listening}</span>
            </div>
          )}

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
                    inputRef.current?.focus()
                  }}
                  className="rounded-full border border-[var(--store-line)] bg-[var(--store-page)] px-3.5 py-1.5 text-sm font-medium text-[var(--store-text)] transition-colors hover:border-[#D10E63]/50 hover:text-[#AD0C53]"
                >
                  {s[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — live recommendation panel */}
        <div className="flex flex-col rounded-2xl border border-[var(--store-line)] bg-[var(--store-page)] p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#D10E63]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#AD0C53]">
              {lang === 'fr' ? 'Recommandation' : 'Recommendation'}
            </span>
          </div>

          {!hasText ? (
            <p className="mt-4 text-sm leading-relaxed text-[var(--store-muted)]">{t.panelIdle}</p>
          ) : totalFound === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-[var(--store-muted)]">{t.none}</p>
          ) : (
            <>
              <p className="mt-4 text-sm font-medium text-[var(--store-text)]">{t.panelFound}</p>
              <ul className="mt-3 flex flex-col gap-2" aria-live="polite">
                {entries.map((e) => (
                  <li
                    key={e.type}
                    className="flex items-center justify-between rounded-xl border border-[var(--store-line)] bg-[var(--store-surface)] px-3.5 py-2.5"
                  >
                    <span className="text-sm font-semibold text-[var(--store-text)]">
                      {TYPE_LABELS_PLURAL[e.type][lang]}
                    </span>
                    <span className="text-sm font-medium text-[var(--store-muted)]">{e.label}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!hasText}
            className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#241F1D] px-4 py-3 text-sm font-bold text-[#F3EFE6] transition-colors hover:bg-[#332C29] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.compose}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

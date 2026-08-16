'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, Send, X } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, pick } from '@/components/discover/types'
import { track } from '@vercel/analytics'

/**
 * ALMA PANEL — the interactive surface behind every "Parler à Alma" CTA.
 *
 * The user describes a need in plain language. Alma recognises the closest
 * mission from the catalog and structures it live (objective, cadence, human
 * validation) — then hands off to /decouvrir carrying that mission, where the
 * real six-step flow adapts it to the company. Voice transcription starts only
 * after an explicit click and falls back to writing when unsupported.
 */

type Bi = { fr: string; en: string }
type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string }; isFinal?: boolean }>; resultIndex?: number }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

// Lightweight intent recognition: keywords → a real catalog mission slug.
const INTENTS: { slug: string; kw: string[] }[] = [
  { slug: 'relancer-les-factures-impayees', kw: ['factur', 'impay', 'relanc', 'paiement', 'invoice', 'unpaid', 'overdue', 'payment'] },
  { slug: 'repondre-a-mes-clients', kw: ['email', 'mail', 'répond', 'repond', 'client', 'demande', 'message', 'reply', 'support', 'inbox'] },
  { slug: 'preparer-un-comite-de-direction', kw: ['comité', 'comite', 'codir', 'réunion', 'reunion', 'direction', 'meeting', 'board', 'committee'] },
  { slug: 'trouver-de-nouveaux-clients', kw: ['prospect', 'client', 'vente', 'commercial', 'lead', 'sales', 'nouveaux'] },
  { slug: 'creer-mes-contenus', kw: ['contenu', 'content', 'article', 'post', 'réseau', 'reseau', 'social', 'newsletter', 'marketing'] },
  { slug: 'preparer-mon-reporting-financier', kw: ['reporting', 'financ', 'chiffre', 'budget', 'kpi', 'tableau', 'report'] },
]

function matchMission(text: string): string {
  const low = text.toLowerCase()
  let best = { slug: 'trouver-de-nouveaux-clients', score: 0 }
  for (const intent of INTENTS) {
    const score = intent.kw.reduce((n, k) => (low.includes(k) ? n + 1 : n), 0)
    if (score > best.score) best = { slug: intent.slug, score }
  }
  return best.slug
}

const T: Record<Lang, Record<string, string>> = {
  fr: {
    title: 'Parler à Alma',
    subtitle: 'Décrivez ce dont vous avez besoin. Alma structure la mission.',
    written: 'Écrit',
    voice: 'Voix',
    voiceNote: 'Appuyez sur le micro et décrivez votre besoin. Alma transforme votre voix en une première mission structurée.',
    voiceListening: 'Alma vous écoute… Appuyez à nouveau pour terminer.',
    voiceUnsupported: 'La voix n’est pas prise en charge par ce navigateur. Vous pouvez décrire votre besoin par écrit.',
    placeholder: 'Ex : relancer chaque semaine mes factures impayées…',
    send: 'Envoyer',
    suggestionsLabel: 'Ou partez d’un exemple',
    almaName: 'Alma',
    you: 'Vous',
    building: 'Mission en préparation',
    structured: 'Mission structurée',
    objective: 'Objectif',
    cadence: 'Rythme',
    validation: 'Validation',
    followup: 'J’ai structuré une première version. On l’adapte à votre entreprise ?',
    adapt: 'Adapter à mon entreprise',
    restart: 'Recommencer',
    close: 'Fermer',
  },
  en: {
    title: 'Talk to Alma',
    subtitle: 'Describe what you need. Alma structures the mission.',
    written: 'Written',
    voice: 'Voice',
    voiceNote: 'Press the microphone and describe your need. Alma turns your voice into a first structured mission.',
    voiceListening: 'Alma is listening… Press again to finish.',
    voiceUnsupported: 'Voice is not supported by this browser. You can describe your need in writing.',
    placeholder: 'E.g. chase my unpaid invoices every week…',
    send: 'Send',
    suggestionsLabel: 'Or start from an example',
    almaName: 'Alma',
    you: 'You',
    building: 'Mission in preparation',
    structured: 'Structured mission',
    objective: 'Objective',
    cadence: 'Cadence',
    validation: 'Validation',
    followup: 'I’ve structured a first version. Shall we adapt it to your company?',
    adapt: 'Adapt to my company',
    restart: 'Start over',
    close: 'Close',
  },
}

const SUGGESTIONS: Bi[] = [
  { fr: 'Relancer mes factures impayées', en: 'Chase my unpaid invoices' },
  { fr: 'Répondre aux emails de mes clients', en: 'Answer my customers’ emails' },
  { fr: 'Préparer mon comité de direction', en: 'Prepare my executive committee' },
]

const ease = [0.22, 1, 0.36, 1] as const

export function AlmaPanel({
  open,
  onClose,
  lang,
  initialSlug = null,
}: {
  open: boolean
  onClose: () => void
  lang: Lang
  initialSlug?: string | null
}) {
  const t = T[lang]
  const router = useRouter()
  const reduce = useReducedMotion()

  const [mode, setMode] = useState<'written' | 'voice'>('written')
  const [input, setInput] = useState('')
  const initialMission = initialSlug ? getMission(initialSlug) : null
  const [sent, setSent] = useState<string | null>(initialMission ? pick(initialMission.title, lang) : null)
  const [slug, setSlug] = useState<string | null>(initialSlug ?? null)
  const [voiceSupported] = useState(() => Boolean(getSpeechRecognition()))
  const [listening, setListening] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setInput(transcript.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.clearTimeout(id)
    }
  }, [open, onClose])

  const mission = useMemo(() => (slug ? getMission(slug) : null), [slug])

  function submit(text: string) {
    const clean = text.trim()
    if (!clean) return
    setSent(clean)
    setSlug(matchMission(clean))
    track('alma_need_submitted', { mode, mission: matchMission(clean) })
    setInput('')
  }

  function handoff() {
    if (!slug) return
    track('alma_mission_structured', { mission: slug })
    onClose()
    router.push(`/decouvrir?entry=mission&mission=${slug}&draft=alma`)
  }

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setInput('')
    setListening(true)
    track('alma_voice_started', { source: 'homepage' })
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#1C1A17]/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease }}
        className="relative flex max-h-[92svh] w-full max-w-[min(920px,calc(100vw-24px))] flex-col overflow-hidden rounded-t-[26px] border border-[#E7DFD0] bg-[#F8F6F1] shadow-[0_40px_120px_-40px_rgba(28,26,23,0.55)] sm:max-h-[calc(100svh-48px)] sm:rounded-[28px]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-[#EAE2D5] px-5 py-4 sm:px-6">
          <Image
            src="/alma-avatar.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-[#D10E63]/25"
          />
          <div className="min-w-0 flex-1">
            <p className="font-sf text-[15px] font-semibold leading-tight text-[#1C1A17]">{t.title}</p>
            <p className="truncate text-[13px] leading-tight text-[#857C6E]">{t.subtitle}</p>
          </div>

          {/* Mode toggle */}
          <div className="hidden items-center rounded-full border border-[#E4DDCE] bg-[#FBF9F3] p-0.5 sm:flex">
            {(['written', 'voice'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                  mode === m ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#6B6459] hover:text-[#1C1A17]'
                }`}
              >
                {m === 'voice' && <Mic className="h-3.5 w-3.5" />}
                {m === 'written' ? t.written : t.voice}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E7DFD0] bg-[#FBF9F3] text-[#2A2622] transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid flex-1 grid-rows-[1fr_auto] overflow-hidden md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:grid-rows-1">
          {/* Conversation */}
          <div className="flex min-h-0 flex-col overflow-y-auto p-5 sm:p-6 md:border-r md:border-[#EAE2D5]">
            {mode === 'voice' && (
              <div className="mb-4 rounded-2xl border border-[#F3D3E0] bg-[#FCEAF2]/70 p-4 text-[13px] leading-relaxed text-[#7A2247]">
                <p>{voiceSupported ? (listening ? t.voiceListening : t.voiceNote) : t.voiceUnsupported}</p>
                {voiceSupported && (
                  <button type="button" onClick={toggleListening} aria-pressed={listening} className={`mt-3 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold ${listening ? 'bg-[#1C1A17] text-white' : 'bg-[#D10E63] text-white'}`}>
                    <Mic className={`size-4 ${listening ? 'animate-pulse' : ''}`} />
                    {listening ? (lang === 'fr' ? 'Terminer' : 'Finish') : (lang === 'fr' ? 'Parler à Alma' : 'Talk to Alma')}
                  </button>
                )}
              </div>
            )}

            {/* Alma opening line */}
            <div className="flex items-start gap-2.5">
              <Image src="/alma-avatar.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/20" />
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-sm leading-relaxed text-[#2A2622]">
                {t.subtitle}
              </p>
            </div>

            {/* User message */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 self-end text-right"
                >
                  <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#AD0C53]">{t.you}</p>
                  <p className="inline-block max-w-[85%] rounded-2xl rounded-br-sm bg-[#D10E63] px-3.5 py-2.5 text-left text-sm leading-relaxed text-[#FBF9F3]">
                    {sent}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alma follow-up */}
            <AnimatePresence>
              {mission && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : 0.15 }}
                  className="mt-3 flex items-start gap-2.5"
                >
                  <Image src="/alma-avatar.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-[#D10E63]/20" />
                  <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F1EADF] px-3.5 py-2.5 text-sm leading-relaxed text-[#2A2622]">
                    {t.followup}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Suggestions (before first send) */}
            {!sent && (
              <div className="mt-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E655A]">{t.suggestionsLabel}</p>
                <div className="mt-2 flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.fr}
                      type="button"
                      onClick={() => submit(pick(s, lang))}
                      className="group inline-flex items-center justify-between gap-2 rounded-xl border border-[#E4DDCE] bg-[#FBF9F3] px-3.5 py-2.5 text-left text-sm font-medium text-[#3B362F] transition-colors hover:border-[#D10E63]/40 hover:text-[#A80B50]"
                    >
                      {pick(s, lang)}
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#B7AE9E] transition-colors group-hover:text-[#A80B50]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mission taking shape */}
          <div className="flex min-h-0 flex-col overflow-y-auto bg-[#FBF9F3] p-5 sm:p-6">
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                mission ? 'bg-[#E7F5EC] text-[#1F7A46]' : 'bg-[#F1EADF] text-[#6E655A]'
              }`}
            >
              {mission && <Check className="h-3 w-3" />}
              {mission ? t.structured : t.building}
            </span>

            <AnimatePresence mode="wait">
              {mission ? (
                <motion.div
                  key={slug}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="mt-4"
                >
                  <h3 className="text-balance font-sf text-xl font-semibold leading-tight tracking-[-0.02em] text-[#1C1A17]">
                    {pick(mission.title, lang)}
                  </h3>
                  <p className="mt-1.5 text-pretty text-[13.5px] leading-relaxed text-[#5B534A]">
                    {pick(mission.result, lang)}
                  </p>

                  <dl className="mt-4 space-y-2.5">
                    {[
                      { k: t.objective, v: pick(mission.objective, lang) },
                      { k: t.cadence, v: pick(mission.deliveryTime, lang) },
                      { k: t.validation, v: pick(mission.validation, lang) },
                    ].map((f, i) => (
                      <motion.div
                        key={f.k}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 + i * 0.1 }}
                        className="rounded-xl border border-[#EAE2D5] bg-white/60 px-3.5 py-2.5"
                      >
                        <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E655A]">{f.k}</dt>
                        <dd className="mt-0.5 text-[13.5px] leading-relaxed text-[#2A2622]">{f.v}</dd>
                      </motion.div>
                    ))}
                  </dl>

                  <button
                    type="button"
                    onClick={handoff}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 py-3 text-[15px] font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
                  >
                    {t.adapt}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(null)
                      setSlug(null)
                      inputRef.current?.focus()
                    }}
                    className="mt-2 w-full text-center text-[13px] font-medium text-[#857C6E] underline decoration-[#D8D0C2] underline-offset-4 hover:text-[#A80B50]"
                  >
                    {t.restart}
                  </button>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={false}
                  className="mt-4 text-pretty text-[13.5px] leading-relaxed text-[#857C6E]"
                >
                  {t.subtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex shrink-0 items-end gap-2 border-t border-[#EAE2D5] bg-[#F8F6F1] p-3 sm:p-4"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                submit(input)
              }
            }}
            rows={1}
            placeholder={listening ? t.voiceListening : t.placeholder}
            className="max-h-32 min-h-[46px] flex-1 resize-none rounded-2xl border border-[#E4DDCE] bg-white px-4 py-3 text-sm text-[#1C1A17] outline-none placeholder:text-[#B7AE9E] focus:border-[#D10E63]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label={t.send}
            className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#B00B52] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </motion.div>
    </div>
  )
}

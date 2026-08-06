'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mic, Paperclip, Send, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { getMission, type Entry } from './types'

type VoiceState = 'idle' | 'listening' | 'analyzing' | 'preparing'
type Turn = { role: 'alma' | 'user'; text: string }

const BAR_COUNT = 32

export function VoiceConsole({
  lang,
  entry,
  missionSlug,
  onActivate,
}: {
  lang: Lang
  entry: Entry
  missionSlug: string
  onActivate: () => void
}) {
  const reduce = useReducedMotion()
  const t = COPY[lang]
  const mission = getMission(missionSlug)
  const script = buildScript(lang, entry, mission.title[lang])

  const [voice, setVoice] = useState<VoiceState>('idle')
  const [thread, setThread] = useState<Turn[]>([{ role: 'alma', text: script.opening }])
  const [live, setLive] = useState('')
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const threadEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    threadEnd.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'end' })
  }, [thread, live, reduce])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // Complete a turn: push the user message, run Alma's "analyze → prepare → reply".
  function completeTurn(userText: string) {
    setThread((prev) => [...prev, { role: 'user', text: userText }])
    setLive('')
    setVoice('analyzing')
    timers.current.push(
      setTimeout(() => setVoice('preparing'), 850),
      setTimeout(() => {
        setThread((prev) => [...prev, { role: 'alma', text: script.reply }])
        setVoice('idle')
        setReady(true)
      }, 1750),
    )
  }

  // Simulated voice capture: stream the scripted sentence word by word.
  function startListening() {
    if (voice === 'listening') {
      stopListening()
      return
    }
    clearTimers()
    setReady(false)
    setVoice('listening')
    setLive('')
    if (reduce) {
      completeTurn(script.spoken)
      return
    }
    const words = script.spoken.split(' ')
    words.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setLive(words.slice(0, i + 1).join(' '))
          if (i === words.length - 1) {
            timers.current.push(setTimeout(() => completeTurn(script.spoken), 550))
          }
        }, 230 * (i + 1)),
      )
    })
  }

  function stopListening() {
    clearTimers()
    if (live.trim()) {
      completeTurn(live.trim())
    } else {
      setVoice('idle')
      setLive('')
    }
  }

  function submitText(e: React.FormEvent) {
    e.preventDefault()
    const value = input.trim()
    if (!value || voice === 'analyzing' || voice === 'preparing') return
    clearTimers()
    setInput('')
    setVoice('idle')
    completeTurn(value)
  }

  const statusText =
    voice === 'listening'
      ? t.listening
      : voice === 'analyzing'
        ? t.analyzing
        : voice === 'preparing'
          ? t.preparing
          : t.online
  const active = voice === 'listening'
  const busy = voice === 'analyzing' || voice === 'preparing'

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#17130F] text-[#FBF9F3] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
      {/* Identity + live status */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <span className="relative flex">
          {active && !reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#D10E63]/40"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <AlmaHead className="relative h-11 w-11" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-sf text-base font-bold leading-tight">{t.name}</p>
          <p className="text-xs font-medium text-[#B7AFA3]">{t.role}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
          <span
            className={[
              'h-1.5 w-1.5 rounded-full',
              active ? 'bg-[#D10E63]' : busy ? 'bg-[#F5A524]' : 'bg-[#4ADE80]',
            ].join(' ')}
          />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#D6CFC3]">
            {statusText}
          </span>
        </span>
      </div>

      {/* Waveform hero + mic */}
      <div className="flex flex-col items-center gap-5 px-6 pt-7">
        <Waveform state={voice} reduce={!!reduce} />
        <button
          type="button"
          onClick={startListening}
          aria-pressed={active}
          aria-label={active ? t.stop : t.talk}
          className={[
            'relative flex h-16 w-16 items-center justify-center rounded-full transition-colors',
            active
              ? 'bg-[#D10E63] text-[#FBF9F3]'
              : 'bg-white/10 text-[#FBF9F3] hover:bg-white/[0.16]',
          ].join(' ')}
        >
          {active && !reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full ring-2 ring-[#D10E63]"
              animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          {active ? <Square className="h-6 w-6" fill="currentColor" /> : <Mic className="h-6 w-6" />}
        </button>
        <p className="min-h-[1.25rem] text-center text-xs font-medium text-[#8E867A]">
          {active ? t.tapToStop : ready ? t.readyHint : t.hint}
        </p>
      </div>

      {/* Unified thread (voice + written) */}
      <div className="mt-6 flex max-h-64 flex-col gap-3 overflow-y-auto px-6 scrollbar-hide">
        {thread.map((turn, i) => (
          <div
            key={i}
            className={turn.role === 'user' ? 'flex justify-end' : 'flex items-start gap-2.5'}
          >
            {turn.role === 'alma' && <AlmaHead className="mt-0.5 h-7 w-7" />}
            <p
              className={[
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                turn.role === 'user'
                  ? 'bg-[#D10E63] text-[#FBF9F3]'
                  : 'bg-white/[0.06] text-[#E7E1D6]',
              ].join(' ')}
            >
              {turn.text}
            </p>
          </div>
        ))}

        {/* Live transcription while listening */}
        <AnimatePresence>
          {active && live && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-end"
            >
              <p className="max-w-[85%] rounded-2xl border border-[#D10E63]/40 bg-[#D10E63]/[0.12] px-3.5 py-2.5 text-sm leading-relaxed text-[#FBF9F3]">
                {live}
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-[#FF7DAC]" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={threadEnd} />
      </div>

      {/* Written input, ChatGPT-style */}
      <form onSubmit={submitText} className="mt-5 border-t border-white/10 p-4">
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-[#D10E63]/60">
          <button
            type="button"
            aria-label={t.attach}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#B7AFA3] transition-colors hover:bg-white/[0.08] hover:text-[#FBF9F3]"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-[#FBF9F3] outline-none placeholder:text-[#8E867A]"
          />
          <button
            type="button"
            onClick={startListening}
            aria-label={active ? t.stop : t.talk}
            className={[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
              active ? 'bg-[#D10E63] text-[#FBF9F3]' : 'text-[#B7AFA3] hover:bg-white/[0.08] hover:text-[#FBF9F3]',
            ].join(' ')}
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label={t.send}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63] text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-[#8E867A]"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2.5 px-1 text-[11px] leading-relaxed text-[#8E867A]">{t.consent}</p>
      </form>

      {/* Advance to context once a first exchange happened */}
      <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-white/10 p-4"
          >
            <button
              type="button"
              onClick={onActivate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBF9F3] px-5 py-3.5 text-sm font-bold text-[#17130F] transition-transform hover:-translate-y-0.5"
            >
              {t.build}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Reactive audio bars. Amplitude follows the voice state. */
function Waveform({ state, reduce }: { state: VoiceState; reduce: boolean }) {
  const amp = state === 'listening' ? 1 : state === 'preparing' || state === 'analyzing' ? 0.55 : 0.28
  const color = state === 'listening' ? '#FF7DAC' : state === 'idle' ? '#5A5148' : '#F5A524'
  return (
    <div className="flex h-16 items-center justify-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        // A soft bell curve so the middle bars are tallest.
        const center = 1 - Math.abs(i - (BAR_COUNT - 1) / 2) / ((BAR_COUNT - 1) / 2)
        const base = 0.18 + center * 0.5
        const peak = base * amp
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full"
            style={{ backgroundColor: color, height: 56 }}
            initial={false}
            animate={
              reduce
                ? { scaleY: Math.max(0.08, peak) }
                : { scaleY: [Math.max(0.08, peak * 0.35), Math.max(0.12, peak), Math.max(0.08, peak * 0.5)] }
            }
            transition={
              reduce
                ? { duration: 0.3 }
                : { duration: 0.7 + (i % 5) * 0.12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            }
          />
        )
      })}
    </div>
  )
}

function buildScript(lang: Lang, entry: Entry, missionTitle: string) {
  if (lang === 'fr') {
    const openings: Record<Entry, string> = {
      company: 'Bonjour, je suis Alma. Parlez-moi de votre entreprise : votre activité, vos clients, ce qui vous prend le plus de temps.',
      mission: `Bonjour, je suis Alma. Vous voulez confier « ${missionTitle} ». Racontez-moi comment cela se passe chez vous aujourd’hui.`,
      profile: `Bonjour, je suis Alma. Vous cherchez ce savoir-faire pour « ${missionTitle} ». Dites-m’en plus sur votre besoin.`,
    }
    const spokens: Record<Entry, string> = {
      company: 'Nous aidons les PME à digitaliser leur relation client, et le suivi des demandes nous prend un temps fou.',
      mission: 'Aujourd’hui c’est très manuel, on perd des demandes et les délais de réponse sont trop longs.',
      profile: 'J’ai besoin de quelqu’un de fiable pour tenir ce périmètre sans que je repasse tout derrière.',
    }
    return {
      opening: openings[entry],
      spoken: spokens[entry],
      reply: 'Merci, c’est très clair. J’ai de quoi commencer à construire le contexte de votre Organisation.',
    }
  }
  const openings: Record<Entry, string> = {
    company: 'Hi, I’m Alma. Tell me about your company: what you do, your customers, and what takes the most of your time.',
    mission: `Hi, I’m Alma. You want to hand off “${missionTitle}”. Tell me how it works at your place today.`,
    profile: `Hi, I’m Alma. You’re looking for this know-how for “${missionTitle}”. Tell me more about your need.`,
  }
  const spokens: Record<Entry, string> = {
    company: 'We help SMBs digitize their customer relations, and tracking requests eats up a huge amount of time.',
    mission: 'Right now it’s very manual, we lose requests and our response times are too long.',
    profile: 'I need someone reliable to own this scope without me having to redo everything behind them.',
  }
  return {
    opening: openings[entry],
    spoken: spokens[entry],
    reply: 'Thanks, that’s very clear. I have enough to start building your Organization context.',
  }
}

const COPY = {
  fr: {
    name: 'Alma',
    role: 'Conseillère IA',
    online: 'En ligne',
    listening: 'Alma vous écoute',
    analyzing: 'Alma analyse',
    preparing: 'Alma prépare',
    talk: 'Parler à Alma',
    stop: 'Arrêter',
    hint: 'Appuyez sur le micro et présentez votre activité — ou écrivez ci-dessous.',
    tapToStop: 'Appuyez de nouveau pour arrêter.',
    readyHint: 'Vous pouvez continuer, ou préciser encore un point.',
    attach: 'Joindre un document',
    placeholder: 'Écrivez à Alma…',
    send: 'Envoyer',
    consent: 'Le micro est activé uniquement avec votre accord. Alma cite ses sources et vous gardez la main.',
    build: 'Construire le contexte de mon Organisation',
  },
  en: {
    name: 'Alma',
    role: 'AI advisor',
    online: 'Online',
    listening: 'Alma is listening',
    analyzing: 'Alma is analyzing',
    preparing: 'Alma is preparing',
    talk: 'Talk to Alma',
    stop: 'Stop',
    hint: 'Tap the mic and introduce your business — or type below.',
    tapToStop: 'Tap again to stop.',
    readyHint: 'You can continue, or clarify one more point.',
    attach: 'Attach a document',
    placeholder: 'Write to Alma…',
    send: 'Send',
    consent: 'The mic turns on only with your consent. Alma cites its sources and you stay in control.',
    build: 'Build my Organization context',
  },
} as const

'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mic, Pencil, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { MISSION_EXAMPLE, seededMission, type MissionInfo } from './types'

// Step 2 — Mission. The user describes the first work by voice (when available)
// or in writing; Alma reveals a short, structured, editable mission. Only four
// fields: Mission, Expected result, Main rule, Human approval. No chat log, no
// black console — the mission itself is the surface.
type MissionField = keyof MissionInfo

export function ScreenMission({
  lang,
  mission,
  defined,
  onChange,
  onDefine,
  onContinue,
}: {
  lang: Lang
  mission: MissionInfo
  defined: boolean
  onChange: (next: MissionInfo) => void
  onDefine: (next: MissionInfo) => void
  onContinue: () => void
}) {
  const reduce = useReducedMotion()
  const t = COPY[lang]

  const [mode, setMode] = useState<'voice' | 'write'>('voice')
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [text, setText] = useState('')
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SR =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : undefined
    if (SR) {
      setVoiceSupported(true)
      const rec = new SR()
      rec.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
      rec.continuous = false
      rec.interimResults = true
      rec.onresult = (e: any) => {
        let full = ''
        for (let i = 0; i < e.results.length; i++) full += e.results[i][0].transcript
        setTranscript(full)
      }
      rec.onend = () => {
        setListening(false)
        setTranscript((current) => {
          if (current.trim()) reveal(current.trim())
          return current
        })
      }
      rec.onerror = () => setListening(false)
      recognitionRef.current = rec
    } else {
      setVoiceSupported(false)
      setMode('write')
    }
    return () => {
      try {
        recognitionRef.current?.abort?.()
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // Reveal a structured mission. Demo: any free description resolves to the
  // coherent seeded mission (Finance / unpaid invoices) so the flow stays whole,
  // but the user's own words lead the title when they clearly differ.
  function reveal(input: string) {
    const seed = seededMission(lang)
    const clean = input.replace(/\s+/g, ' ').trim()
    const usesExample = clean.toLowerCase().includes(lang === 'fr' ? 'factur' : 'invoice')
    const title = usesExample ? seed.title : clean.charAt(0).toUpperCase() + clean.slice(1)
    onDefine({ ...seed, title })
  }

  function toggleListening() {
    const rec = recognitionRef.current
    if (!rec) return
    if (listening) {
      rec.stop()
      return
    }
    setTranscript('')
    setListening(true)
    try {
      rec.start()
    } catch {
      setListening(false)
    }
  }

  function submitText(e: React.FormEvent) {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    reveal(value)
    setText('')
  }

  function useExample() {
    if (mode === 'write') setText(MISSION_EXAMPLE[lang])
    else reveal(MISSION_EXAMPLE[lang])
  }

  function updateField(field: MissionField, value: string) {
    onChange({ ...mission, [field]: value })
  }

  return (
    <div className={defined ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-12' : 'mx-auto w-full max-w-[600px]'}>
      {/* Left — Alma + the guided ask */}
      <div className="min-w-0">
        <AlmaIdentity lang={lang} />

        <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#B4327E]">{t.kicker}</p>
        <h1 className="mt-3 text-balance font-sf text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1C1A17]">
          {t.title}
        </h1>
        <p className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.lead}</p>

        <div className="mt-7 rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-6 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.4)] sm:p-7">
          <div className="flex items-start gap-3">
            <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#D10E63]" />
            <p className="text-[15px] italic leading-relaxed text-[#5A544A]">{t.alma}</p>
          </div>

          <div className="mt-6 border-t border-[#EEE7D9] pt-6">
            {mode === 'voice' && voiceSupported ? (
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={toggleListening}
                    aria-pressed={listening}
                    aria-label={listening ? t.stop : t.talk}
                    className={[
                      'relative flex h-14 w-14 items-center justify-center rounded-full transition-colors',
                      listening ? 'bg-[#D10E63] text-[#FBF9F3]' : 'bg-[#D10E63]/10 text-[#B4327E] hover:bg-[#D10E63]/16',
                    ].join(' ')}
                  >
                    {listening && !reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full ring-2 ring-[#D10E63]"
                        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    {listening ? <Square className="h-5 w-5" fill="currentColor" /> : <Mic className="h-5 w-5" />}
                  </button>
                  {listening ? (
                    <ThinWave reduce={!!reduce} />
                  ) : (
                    <span className="text-sm font-semibold text-[#1C1A17]">{t.talk}</span>
                  )}
                </div>

                {(transcript || listening) && (
                  <p className="min-h-[1.5rem] max-w-xl text-[15px] leading-relaxed text-[#3B362F]">
                    {transcript || <span className="text-[#9A9184]">{t.listening}</span>}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setMode('write')}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6E665A] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:text-[#1C1A17]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  {t.preferWrite}
                </button>
              </div>
            ) : (
              <form onSubmit={submitText} className="flex flex-col gap-3">
                <label htmlFor="mission-input" className="sr-only">
                  {t.title}
                </label>
                <textarea
                  id="mission-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      (e.metaKey || e.ctrlKey) &&
                      !e.nativeEvent.isComposing &&
                      (e as any).keyCode !== 229
                    ) {
                      submitText(e)
                    }
                  }}
                  rows={3}
                  placeholder={t.placeholder}
                  className="w-full resize-none rounded-2xl border border-[#E4DDCE] bg-white px-4 py-3.5 text-[15px] leading-relaxed text-[#1C1A17] outline-none transition-colors placeholder:text-[#9A9184] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#D10E63] px-5 py-2.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#E4DDCE] disabled:text-[#9A9184]"
                  >
                    {t.structure}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {voiceSupported && (
                    <button
                      type="button"
                      onClick={() => setMode('voice')}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6E665A] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:text-[#1C1A17]"
                    >
                      <Mic className="h-3.5 w-3.5" />
                      {t.preferVoice}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* One clickable example */}
          <button
            type="button"
            onClick={useExample}
            className="mt-6 block w-full rounded-2xl border border-dashed border-[#D8D0C2] bg-[#F6F1E7] px-4 py-3.5 text-left text-[13px] leading-relaxed text-[#6E665A] transition-colors hover:border-[#D10E63]/40 hover:bg-[#F3EDE1] hover:text-[#3B362F]"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9184]">
              {t.exampleLabel}
            </span>
            <span className="mt-1.5 block">“{MISSION_EXAMPLE[lang]}”</span>
          </button>
        </div>
      </div>

      {/* Right — the mission taking shape, revealed progressively */}
      <AnimatePresence>
        {defined && (
          <motion.aside
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-1"
          >
            <div className="lg:sticky lg:top-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                {t.panelTitle}
              </p>

              <div className="mt-4 flex flex-col divide-y divide-[#EBE4D6] border-t border-[#EBE4D6]">
                <DraftRow label={t.fTitle} value={mission.title} onChange={(v) => updateField('title', v)} strong delay={0} reduce={!!reduce} />
                <DraftRow label={t.fResult} value={mission.result} onChange={(v) => updateField('result', v)} multiline delay={0.08} reduce={!!reduce} />
                <DraftRow label={t.fRule} value={mission.rule} onChange={(v) => updateField('rule', v)} multiline delay={0.16} reduce={!!reduce} />
                <DraftRow label={t.fValidation} value={mission.validation} onChange={(v) => updateField('validation', v)} multiline delay={0.24} reduce={!!reduce} />
              </div>

              <button
                type="button"
                onClick={onContinue}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[12px] leading-relaxed text-[#8A8175]">{t.ctaNote}</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Alma as a discrete professional identity — portrait + role. */
function AlmaIdentity({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-3">
      <AlmaHead className="h-11 w-11" />
      <div className="leading-tight">
        <p className="font-sf text-[15px] font-bold text-[#1C1A17]">Alma</p>
        <p className="text-[13px] text-[#8A8175]">{COPY[lang].almaRole}</p>
      </div>
    </div>
  )
}

/** A single editable mission field, revealed with a soft stagger. */
function DraftRow({
  label,
  value,
  onChange,
  strong,
  multiline,
  delay,
  reduce,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  strong?: boolean
  multiline?: boolean
  delay: number
  reduce: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState(value)
  useEffect(() => setLocal(value), [value])

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="py-3"
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9184]">{label}</p>
      {editing ? (
        multiline ? (
          <textarea
            autoFocus
            value={local}
            rows={2}
            onChange={(e) => setLocal(e.target.value)}
            onBlur={() => {
              setEditing(false)
              if (local.trim() && local !== value) onChange(local.trim())
            }}
            className="mt-1 w-full resize-none rounded-lg border border-[#D10E63]/40 bg-white px-2.5 py-1.5 text-[14px] leading-relaxed text-[#1C1A17] outline-none"
          />
        ) : (
          <input
            autoFocus
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            onBlur={() => {
              setEditing(false)
              if (local.trim() && local !== value) onChange(local.trim())
            }}
            className="mt-1 w-full rounded-lg border border-[#D10E63]/40 bg-white px-2.5 py-1.5 text-[14px] text-[#1C1A17] outline-none"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={[
            'mt-1 block w-full rounded-lg px-1 py-0.5 text-left transition-colors hover:bg-[#EFE8DA]/60',
            strong ? 'font-sf text-[15px] font-bold text-[#1C1A17]' : 'text-[14px] leading-relaxed text-[#3B362F]',
          ].join(' ')}
        >
          {value}
        </button>
      )}
    </motion.div>
  )
}

/** A restrained listening indicator — a fine wave. */
function ThinWave({ reduce }: { reduce: boolean }) {
  const bars = 5
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-[#D10E63]"
          style={{ height: 18 }}
          initial={false}
          animate={reduce ? { scaleY: 0.5 } : { scaleY: [0.3, 1, 0.4] }}
          transition={
            reduce
              ? { duration: 0.2 }
              : { duration: 0.7 + i * 0.1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
          }
        />
      ))}
    </span>
  )
}

const COPY = {
  fr: {
    almaRole: 'Conseillère en transformation IA',
    kicker: 'Mission',
    title: 'Quelle première mission souhaitez-vous confier ?',
    lead: 'Décrivez le travail à accomplir. Alma le transforme en une mission claire, avec son résultat, sa règle et sa validation.',
    alma: 'Bonjour. Quel travail aimeriez-vous faire avancer en premier ?',
    talk: 'Parler à Alma',
    stop: 'Arrêter',
    listening: 'À l’écoute…',
    preferWrite: 'Je préfère écrire',
    preferVoice: 'Utiliser la voix',
    placeholder: 'Décrivez la mission en quelques mots…',
    structure: 'Structurer la mission',
    exampleLabel: 'Exemple',
    panelTitle: 'La mission prend forme',
    fTitle: 'Mission',
    fResult: 'Résultat attendu',
    fRule: 'Règle principale',
    fValidation: 'Validation humaine',
    cta: 'Confier cette mission',
    ctaNote: 'Vous pourrez tout ajuster ensuite.',
  },
  en: {
    almaRole: 'AI transformation advisor',
    kicker: 'Mission',
    title: 'Which first mission would you like to assign?',
    lead: 'Describe the work to be done. Alma turns it into a clear mission, with its result, its rule and its approval.',
    alma: 'Hello. Which work would you like to move forward first?',
    talk: 'Talk to Alma',
    stop: 'Stop',
    listening: 'Listening…',
    preferWrite: 'I’d rather write',
    preferVoice: 'Use voice',
    placeholder: 'Describe the mission in a few words…',
    structure: 'Structure the mission',
    exampleLabel: 'Example',
    panelTitle: 'The mission takes shape',
    fTitle: 'Mission',
    fResult: 'Expected result',
    fRule: 'Main rule',
    fValidation: 'Human approval',
    cta: 'Assign this mission',
    ctaNote: 'You can adjust everything afterwards.',
  },
} as const

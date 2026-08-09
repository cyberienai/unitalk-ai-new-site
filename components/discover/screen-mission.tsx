'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, Pencil, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { getMission, type Entry } from './types'

// State 1 — Mission. The heart of the onboarding: the user describes the work
// (by voice when the browser allows it, otherwise in writing) and Alma turns it
// into a structured, editable mission draft. No black console, no chat bubbles
// duplicating the mission object — the mission itself is the surface.

type DraftField = 'title' | 'objective' | 'result' | 'cadence' | 'rules' | 'validations'
type Draft = Record<DraftField, string>

const TODO = { fr: 'À préciser avec Alma', en: 'To clarify with Alma' } as const

export function ScreenMission({
  lang,
  entry,
  missionSlug,
  hasDraft,
  onActivate,
}: {
  lang: Lang
  entry: Entry
  missionSlug: string
  hasDraft: boolean
  onActivate: () => void
}) {
  const reduce = useReducedMotion()
  const t = COPY[lang]
  const mission = getMission(missionSlug)

  // A mission is preloaded when the user arrived from the catalog / a job profile
  // (Cas 2) or handed a draft off from /missions.
  const preloaded = entry !== 'company' || hasDraft

  const seededDraft = useMemo<Draft>(
    () => ({
      title: mission.title[lang],
      objective: mission.objective[lang],
      result: mission.result[lang],
      cadence: mission.cadence[lang] || mission.deliveryTime[lang],
      rules: TODO[lang],
      validations: mission.validation[lang],
    }),
    [mission, lang],
  )

  const [draft, setDraft] = useState<Draft | null>(preloaded ? seededDraft : null)
  const [mode, setMode] = useState<'voice' | 'write'>('voice')
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(preloaded)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Detect Web Speech API without simulating recognition when absent.
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
          if (current.trim()) buildDraftFrom(current.trim())
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
      if (savedTimer.current) clearTimeout(savedTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  function flashSaved() {
    setSaved(false)
    if (savedTimer.current) clearTimeout(savedTimer.current)
    savedTimer.current = setTimeout(() => setSaved(true), 400)
  }

  // Build a first structured draft from a free-text request. Alma keeps the
  // user's own words as the title and leaves the rest to clarify — she never
  // invents rules or validations.
  function buildDraftFrom(input: string) {
    const clean = input.replace(/\s+/g, ' ').trim()
    const title = clean.charAt(0).toUpperCase() + clean.slice(1)
    setDraft({
      title,
      objective: clean,
      result: TODO[lang],
      cadence: TODO[lang],
      rules: TODO[lang],
      validations: TODO[lang],
    })
    setSaved(true)
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
    buildDraftFrom(value)
    setText('')
  }

  function useExample() {
    if (mode === 'write') {
      setText(t.example)
    } else {
      buildDraftFrom(t.example)
    }
  }

  function updateField(field: DraftField, value: string) {
    setDraft((d) => (d ? { ...d, [field]: value } : d))
    flashSaved()
  }

  const twoZone = !!draft

  return (
    <div className={twoZone ? '' : 'mx-auto w-full max-w-[720px]'}>
      <div
        className={
          twoZone
            ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12'
            : ''
        }
      >
        {/* Left — Alma + the guided ask */}
        <div className="min-w-0">
          <AlmaIdentity lang={lang} />

          <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#B4327E]">
            {t.kicker}
          </p>
          <h1 className="mt-3 text-balance font-sf text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1C1A17]">
            {preloaded ? t.titlePreloaded : t.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">
            {preloaded ? t.leadPreloaded : t.lead}
          </p>

          {/* Alma's single opening line — not a chat log. */}
          <p className="mt-6 border-l-2 border-[#D10E63]/30 pl-4 text-[15px] italic leading-relaxed text-[#5A544A]">
            {preloaded ? t.almaPreloaded : t.alma}
          </p>

          {/* Capture: voice (when available) or writing */}
          {!preloaded && (
            <div className="mt-7">
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
                        listening
                          ? 'bg-[#D10E63] text-[#FBF9F3]'
                          : 'bg-[#D10E63]/10 text-[#B4327E] hover:bg-[#D10E63]/16',
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
                      {listening ? (
                        <Square className="h-5 w-5" fill="currentColor" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
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
                    className="w-full resize-none rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] px-4 py-3.5 text-[15px] leading-relaxed text-[#1C1A17] outline-none transition-colors placeholder:text-[#9A9184] focus:border-[#D10E63]/60"
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

              {/* One clickable example — concrete, not decorative. */}
              <button
                type="button"
                onClick={useExample}
                className="mt-6 block max-w-xl rounded-xl border border-dashed border-[#D8D0C2] bg-transparent px-4 py-3 text-left text-[13px] leading-relaxed text-[#6E665A] transition-colors hover:border-[#D10E63]/40 hover:text-[#3B362F]"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A9184]">
                  {t.exampleLabel}
                </span>
                <span className="mt-1.5 block">“{t.example}”</span>
              </button>
            </div>
          )}
        </div>

        {/* Right — the mission taking shape */}
        <AnimatePresence>
          {twoZone && draft && (
            <motion.aside
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:pt-1"
            >
              <div className="lg:sticky lg:top-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
                    {t.panelTitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1F7A45]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={saved ? 'saved' : 'saving'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        {saved ? (
                          <>
                            <Check className="h-3 w-3" strokeWidth={3} />
                            {t.saved}
                          </>
                        ) : (
                          <span className="text-[#8A8175]">{t.saving}</span>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>

                <div className="mt-4 flex flex-col divide-y divide-[#EBE4D6] border-t border-[#EBE4D6]">
                  <DraftRow label={t.fTitle} value={draft.title} onChange={(v) => updateField('title', v)} strong />
                  <DraftRow label={t.fObjective} value={draft.objective} onChange={(v) => updateField('objective', v)} multiline />
                  <DraftRow label={t.fResult} value={draft.result} onChange={(v) => updateField('result', v)} multiline />
                  <DraftRow label={t.fCadence} value={draft.cadence} onChange={(v) => updateField('cadence', v)} />
                  <DraftRow label={t.fRules} value={draft.rules} onChange={(v) => updateField('rules', v)} multiline />
                  <DraftRow label={t.fValidations} value={draft.validations} onChange={(v) => updateField('validations', v)} multiline />
                </div>

                <button
                  type="button"
                  onClick={onActivate}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3.5 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
                >
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[12px] leading-relaxed text-[#8A8175]">{t.ctaNote}</p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Alma as a discrete professional identity — no "Online", no chatbot orb. */
function AlmaIdentity({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/alma-avatar.png"
        alt="Alma"
        className="h-11 w-11 rounded-full object-cover ring-1 ring-[#E4DDCE]"
      />
      <div className="leading-tight">
        <p className="font-sf text-[15px] font-bold text-[#1C1A17]">Alma</p>
        <p className="text-[13px] text-[#8A8175]">{COPY[lang].almaRole}</p>
      </div>
    </div>
  )
}

/** A single editable mission field. Click to edit inline; blur to save. */
function DraftRow({
  label,
  value,
  onChange,
  strong,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  strong?: boolean
  multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState(value)
  useEffect(() => setLocal(value), [value])
  const empty = value.startsWith('À préciser') || value.startsWith('To clarify')

  return (
    <div className="py-3">
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
            strong ? 'font-sf text-[15px] font-bold text-[#1C1A17]' : 'text-[14px] leading-relaxed',
            empty ? 'italic text-[#B4AC9E]' : strong ? '' : 'text-[#3B362F]',
          ].join(' ')}
        >
          {value}
        </button>
      )}
    </div>
  )
}

/** A restrained listening indicator — a fine wave, never a big black bar. */
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
    kicker: 'Mission · Étape 1 sur 5',
    title: 'Qu’aimeriez-vous confier ?',
    titlePreloaded: 'Voici la mission choisie.',
    lead: 'Décrivez le travail à accomplir. Alma le transforme en une mission claire, avec son résultat, ses règles et ses validations.',
    leadPreloaded: 'Vous pouvez encore la modifier avant de l’adapter à votre entreprise. Chaque champ reste éditable.',
    alma: 'Bonjour. Quel travail aimeriez-vous faire avancer ?',
    almaPreloaded: 'J’ai préparé cette mission. Ajustez-la si besoin, puis nous l’adapterons à votre entreprise.',
    talk: 'Parler à Alma',
    stop: 'Arrêter',
    listening: 'Alma vous écoute…',
    preferWrite: 'Je préfère écrire',
    preferVoice: 'Utiliser la voix',
    placeholder: 'Ex. Relancer les factures impayées, sans contacter les clients en litige…',
    structure: 'Structurer la mission',
    exampleLabel: 'Exemple',
    example: 'Relancer les factures impayées sans contacter les clients ayant un litige.',
    panelTitle: 'Mission en préparation',
    saved: 'Brouillon enregistré',
    saving: 'Enregistrement…',
    fTitle: 'Intitulé',
    fObjective: 'Objectif',
    fResult: 'Résultat attendu',
    fCadence: 'Rythme',
    fRules: 'Règles connues',
    fValidations: 'Validations humaines',
    cta: 'Adapter cette mission à mon entreprise',
    ctaNote: 'Alma partira du contexte réel de votre entreprise.',
  },
  en: {
    almaRole: 'AI transformation advisor',
    kicker: 'Mission · Step 1 of 5',
    title: 'What would you like to hand off?',
    titlePreloaded: 'Here is the mission you chose.',
    lead: 'Describe the work to be done. Alma turns it into a clear mission, with its result, rules and approvals.',
    leadPreloaded: 'You can still edit it before adapting it to your company. Every field stays editable.',
    alma: 'Hello. What work would you like to move forward?',
    almaPreloaded: 'I prepared this mission. Adjust it if needed, then we will adapt it to your company.',
    talk: 'Talk to Alma',
    stop: 'Stop',
    listening: 'Alma is listening…',
    preferWrite: 'I’d rather write',
    preferVoice: 'Use voice',
    placeholder: 'e.g. Chase unpaid invoices, without contacting customers in dispute…',
    structure: 'Structure the mission',
    exampleLabel: 'Example',
    example: 'Chase unpaid invoices without contacting customers who have a dispute.',
    panelTitle: 'Mission in progress',
    saved: 'Draft saved',
    saving: 'Saving…',
    fTitle: 'Title',
    fObjective: 'Objective',
    fResult: 'Expected result',
    fCadence: 'Cadence',
    fRules: 'Known rules',
    fValidations: 'Human approvals',
    cta: 'Adapt this mission to my company',
    ctaNote: 'Alma will start from your company’s real context.',
  },
} as const

'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Check, Mic, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { seededMission, type CompanyFact, type MissionInfo } from './types'

export function ScreenMission({
  lang,
  company,
  mission,
  onDefine,
  onContinue,
}: {
  lang: Lang
  company: CompanyFact[]
  mission: MissionInfo
  onDefine: (next: MissionInfo) => void
  onContinue: () => void
}) {
  const reduce = useReducedMotion()
  const t = COPY[lang]
  const [text, setText] = useState(mission.title)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const recognitionRef = useRef<any>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const companyName = company.find((fact) => fact.key === 'name')?.value || t.companyFallback
  const activity = company.find((fact) => fact.key === 'activity')?.value || t.activityFallback
  const suggestions = getSuggestions(activity, lang)
  const hasMission = text.trim().length > 0

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : undefined
    if (!SpeechRecognition) return

    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setText(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition

    return () => {
      try {
        recognition.abort()
      } catch {}
    }
  }, [lang])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition || submitting) return
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  function submitMission() {
    const clean = text.trim()
    if (!clean || submitting) return
    setSubmitting(true)
    const seed = seededMission(lang)
    onDefine({ ...seed, title: clean.charAt(0).toUpperCase() + clean.slice(1) })
    onContinue()
  }

  function selectSuggestion(suggestion: string) {
    setText(suggestion)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(suggestion.length, suggestion.length)
    })
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-7 text-white sm:px-8 lg:min-h-[24rem] lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">{t.almaRole}</p>
            </div>
          </div>

          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{t.alma}”</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-sf text-[16px] font-bold text-white">{companyName}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#BDB5AC]">{activity}</p>
          </div>

          <div className="mt-auto pt-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#E9E2D9]">
              <Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />
              {t.stepOneDone}
            </span>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-col justify-center px-6 py-7 sm:px-9 lg:px-10">
        <div className="relative">
          <label htmlFor="mission-input" className="sr-only">{t.placeholder}</label>
          <textarea
            ref={inputRef}
            id="mission-input"
            rows={2}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault()
                submitMission()
              }
            }}
            placeholder={t.placeholder}
            className="min-h-16 w-full resize-none rounded-2xl border border-[#D8D0C2] bg-white py-3.5 pl-4 pr-14 text-[15px] leading-relaxed text-[#1C1A17] shadow-sm outline-none transition-colors placeholder:text-[#6E665A] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
          />
          <button
            type="button"
            onClick={hasMission ? submitMission : toggleListening}
            disabled={submitting || (!hasMission && !voiceSupported)}
            aria-label={hasMission ? t.send : t.talk}
            aria-pressed={!hasMission && listening}
            className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-white transition-colors duration-200 hover:bg-[#B90C58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={hasMission ? 'send' : listening ? 'stop' : 'mic'}
                initial={reduce ? false : { opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.82 }}
                transition={{ duration: reduce ? 0 : 0.17 }}
                className="flex items-center justify-center"
              >
                {hasMission ? (
                  <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
                ) : listening ? (
                  <Square className="h-3.5 w-3.5" fill="currentColor" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-[12px] font-semibold text-[#4E483F]">{t.suggestions}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                  text === suggestion
                    ? 'border-[#D10E63] bg-[#D10E63] text-white'
                    : 'border-[#DED5C5] bg-white text-[#4E483F] hover:border-[#D10E63]/45 hover:bg-[#F8EFF3]'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}

function getSuggestions(activity: string, lang: Lang): readonly string[] {
  const normalized = activity.toLowerCase()
  const category = /factur|trésor|finance|comptab|payment|billing|account/.test(normalized)
    ? 'finance'
    : /recrut|rh|ressources humaines|talent|human resources/.test(normalized)
      ? 'hr'
      : /commerce|vente|commercial|retail|sales|e-commerce/.test(normalized)
        ? 'sales'
        : 'general'
  return SUGGESTIONS[lang][category]
}

const SUGGESTIONS = {
  fr: {
    finance: ['Relancer les factures impayées', 'Préparer le suivi de trésorerie', 'Contrôler les écarts de paiement'],
    hr: ['Présélectionner les candidatures', 'Préparer les entretiens', 'Répondre aux questions RH fréquentes'],
    sales: ['Qualifier les demandes entrantes', 'Préparer les relances commerciales', 'Analyser les retours clients'],
    general: ['Trier les demandes entrantes', 'Préparer un rapport hebdomadaire', 'Répondre aux questions fréquentes'],
  },
  en: {
    finance: ['Follow up on unpaid invoices', 'Prepare cash flow monitoring', 'Review payment discrepancies'],
    hr: ['Pre-screen applications', 'Prepare interviews', 'Answer common HR questions'],
    sales: ['Qualify inbound requests', 'Prepare sales follow-ups', 'Analyze customer feedback'],
    general: ['Sort incoming requests', 'Prepare a weekly report', 'Answer frequently asked questions'],
  },
} as const

const COPY = {
  fr: {
    alma: 'Définissons votre première mission.',
    almaRole: 'Conseillère IA · Unitalk',
    stepOneDone: 'Étape 1 validée',
    companyFallback: 'Votre entreprise',
    activityFallback: 'Activité à préciser',
    placeholder: 'Décrivez votre mission…',
    talk: 'Dicter la mission',
    send: 'Envoyer la mission',
    suggestions: 'Suggestions',
  },
  en: {
    alma: 'Let’s define your first mission.',
    almaRole: 'AI advisor · Unitalk',
    stepOneDone: 'Step 1 complete',
    companyFallback: 'Your company',
    activityFallback: 'Activity to be specified',
    placeholder: 'Describe your mission…',
    talk: 'Dictate the mission',
    send: 'Send the mission',
    suggestions: 'Suggestions',
  },
} as const

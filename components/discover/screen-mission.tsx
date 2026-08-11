'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, Square } from 'lucide-react'
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
  const recognitionRef = useRef<any>(null)

  const companyName = company.find((fact) => fact.key === 'name')?.value || t.companyFallback
  const activity = company.find((fact) => fact.key === 'activity')?.value || t.activityFallback
  const suggestions = getSuggestions(activity, lang)
  const proposal = text.trim() ? summarizeMission(text.trim(), lang) : ''

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
    if (!recognition) return
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

  function launchMission() {
    if (!proposal) return
    const seed = seededMission(lang)
    onDefine({ ...seed, title: proposal })
    onContinue()
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:min-h-[31rem] lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-7 text-white sm:px-8 lg:px-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <AlmaHead className="h-11 w-11 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">Unitalk</p>
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

      <section className="min-w-0 px-6 py-7 sm:px-9 lg:px-10">
        <div className="relative">
          <label htmlFor="mission-input" className="sr-only">{t.placeholder}</label>
          <input
            id="mission-input"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && proposal && !event.nativeEvent.isComposing) launchMission()
            }}
            placeholder={t.placeholder}
            className="h-14 w-full rounded-2xl border border-[#D8D0C2] bg-white pl-4 pr-14 text-[15px] text-[#1C1A17] shadow-sm outline-none transition-colors placeholder:text-[#6E665A] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
          />
          <button
            type="button"
            onClick={toggleListening}
            disabled={!voiceSupported}
            aria-label={listening ? t.stop : t.talk}
            aria-pressed={listening}
            className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63] text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!reduce && !listening && <span aria-hidden className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />}
            {listening ? <Square className="relative h-4 w-4" fill="currentColor" /> : <Mic className="relative h-4 w-4" />}
          </button>
        </div>

        <div className="mt-4">
          <p className="text-[12px] font-semibold text-[#4E483F]">{t.suggestions}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setText(suggestion)}
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

        <motion.div
          animate={proposal ? { opacity: 1 } : { opacity: 0.7 }}
          className="mt-6 rounded-2xl border border-[#E3DACB] bg-white px-5 py-5 shadow-[0_18px_45px_-38px_rgba(28,26,23,0.55)]"
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.proposes}</p>
          <p className="mt-3 text-pretty font-sf text-[17px] font-semibold leading-relaxed text-[#1C1A17]">
            “{proposal || t.proposalPlaceholder}”
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-[#6E665A]">{t.workspaceNote}</p>
        </motion.div>

        <div className="mt-5 flex flex-col items-end">
          <button
            type="button"
            onClick={launchMission}
            disabled={!proposal}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#D8D0C2] disabled:text-[#6E665A]"
          >
            {t.launch}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="mt-2 text-[11px] text-[#6E665A]">{t.ctaNote}</p>
        </div>
      </section>
    </div>
  )
}

function summarizeMission(input: string, lang: Lang): string {
  const clean = input.replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '')
  if (!clean) return ''
  return clean.charAt(0).toUpperCase() + clean.slice(1) + (lang === 'fr' ? '.' : '.')
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
    stepOneDone: 'Étape 1 validée',
    companyFallback: 'Votre entreprise',
    activityFallback: 'Activité à préciser',
    placeholder: 'Décrivez votre mission…',
    talk: 'Dicter la mission',
    stop: 'Arrêter la dictée',
    suggestions: 'Suggestions',
    proposes: 'Alma propose',
    proposalPlaceholder: 'Votre proposition apparaîtra ici.',
    workspaceNote: 'Vous pourrez préciser les règles et validations dans le Workspace.',
    launch: 'Lancer ma première mission',
    ctaNote: 'Alma prépare votre Collaborateur IA.',
  },
  en: {
    alma: 'Let’s define your first mission.',
    stepOneDone: 'Step 1 complete',
    companyFallback: 'Your company',
    activityFallback: 'Activity to be specified',
    placeholder: 'Describe your mission…',
    talk: 'Dictate the mission',
    stop: 'Stop dictation',
    suggestions: 'Suggestions',
    proposes: 'Alma suggests',
    proposalPlaceholder: 'Your proposal will appear here.',
    workspaceNote: 'You can refine rules and approvals later in the Workspace.',
    launch: 'Launch my first mission',
    ctaNote: 'Alma is preparing your AI Collaborator.',
  },
} as const

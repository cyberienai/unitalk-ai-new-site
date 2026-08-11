'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mic, Pencil, Square } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { AlmaHead } from './context-column'
import { seededMission, type CompanyFact, type MissionInfo } from './types'

type MissionField = keyof MissionInfo

export function ScreenMission({
  lang,
  company,
  mission,
  defined,
  onChange,
  onDefine,
  onContinue,
  stepper,
}: {
  lang: Lang
  company: CompanyFact[]
  mission: MissionInfo
  defined: boolean
  onChange: (next: MissionInfo) => void
  onDefine: (next: MissionInfo) => void
  onContinue: () => void
  stepper: React.ReactNode
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

  function defineMission() {
    const input = text.trim()
    if (!input) return
    const seed = seededMission(lang)
    const title = input.charAt(0).toUpperCase() + input.slice(1)
    onDefine({ ...seed, title })
  }

  function updateField(field: MissionField, value: string) {
    onChange({ ...mission, [field]: value })
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#DED5C5] bg-[#FBF9F3] shadow-[0_30px_80px_-42px_rgba(28,26,23,0.5)] lg:min-h-[34rem] lg:grid-cols-[minmax(17rem,1fr)_minmax(0,2fr)]">
      <aside className="relative flex min-w-0 flex-col overflow-hidden bg-[#211E1A] px-6 py-8 text-white sm:px-8 lg:px-9 lg:py-9">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D10E63]/15 blur-3xl" />
        <div className="relative flex h-full flex-col">
          <div className="mb-7 hidden md:block">{stepper}</div>

          <div className="flex items-center gap-3">
            <AlmaHead className="h-12 w-12 shrink-0 ring-1 ring-white/15" />
            <div>
              <p className="font-sf text-[15px] font-bold">Alma</p>
              <p className="mt-0.5 text-[12px] text-[#BDB5AC]">{t.almaRole}</p>
            </div>
          </div>

          <p className="mt-8 text-pretty font-sf text-xl font-medium leading-relaxed text-[#F4EFE8]">“{t.alma}”</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#E38AB4]">{t.context}</p>
            <p className="mt-3 font-sf text-[16px] font-bold text-white">{companyName}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#BDB5AC]">{activity}</p>
          </div>

          <div className="mt-auto pt-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-[#E9E2D9]">
              <Check className="h-3.5 w-3.5 text-[#E38AB4]" strokeWidth={3} />
              {t.stepOneDone}
            </span>
          </div>
        </div>
      </aside>

      <section className="min-w-0 px-6 py-8 sm:px-9 lg:px-10 lg:py-9">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#B00C54]">{t.kicker}</p>
        <h1 className="mt-2 font-sf text-[clamp(1.8rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.04em] text-[#1C1A17]">
          {t.title}
        </h1>

        <div className="relative mt-6">
          <label htmlFor="mission-input" className="sr-only">{t.placeholder}</label>
          <input
            id="mission-input"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && text.trim() && !event.nativeEvent.isComposing) defineMission()
            }}
            placeholder={t.placeholder}
            className="h-14 w-full rounded-2xl border border-[#D8D0C2] bg-white pl-4 pr-14 text-[15px] text-[#1C1A17] shadow-sm outline-none transition-colors placeholder:text-[#766E63] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
          />
          <button
            type="button"
            onClick={toggleListening}
            disabled={!voiceSupported}
            aria-label={listening ? t.stop : t.talk}
            aria-pressed={listening}
            className={[
              'group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-35',
              listening ? 'bg-[#D10E63] text-white' : 'bg-[#F3E9EE] text-[#B00C54] hover:bg-[#EBCFD9]',
            ].join(' ')}
          >
            {!reduce && !listening && <span aria-hidden className="absolute inset-1 rounded-lg bg-[#D10E63]/10 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100" />}
            {listening ? <Square className="relative h-4 w-4" fill="currentColor" /> : <Mic className="relative h-4 w-4" />}
          </button>
        </div>

        <div className="mt-4">
          <p className="text-[12px] font-semibold text-[#5F584E]">{t.suggestions}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setText(suggestion)}
                className="rounded-full border border-[#DED5C5] bg-white px-3 py-1.5 text-[12px] font-medium text-[#5F584E] transition-colors hover:border-[#D10E63]/45 hover:bg-[#F8EFF3] hover:text-[#9F0B4D]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3DACB] bg-white shadow-[0_18px_45px_-38px_rgba(28,26,23,0.55)]">
          <div className="border-b border-[#EEE7D9] bg-[#F7F3EB] px-5 py-3">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#6E665A]">{t.preview}</p>
            <p className="mt-1 text-[13px] text-[#3B362F]">{text.trim() || t.rawPlaceholder}</p>
          </div>

          {defined ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid divide-y divide-[#EEE7D9] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-0"
            >
              <div className="sm:divide-y sm:divide-[#EEE7D9]">
                <DraftField label={t.fTitle} value={mission.title} onChange={(value) => updateField('title', value)} />
                <DraftField label={t.fResult} value={mission.result} onChange={(value) => updateField('result', value)} />
              </div>
              <div className="divide-y divide-[#EEE7D9]">
                <DraftField label={t.fRule} value={mission.rule} onChange={(value) => updateField('rule', value)} />
                <DraftField label={t.fValidation} value={mission.validation} onChange={(value) => updateField('validation', value)} />
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {[t.fTitle, t.fResult, t.fRule, t.fValidation].map((label) => (
                <div key={label} className="rounded-xl bg-[#F7F3EB] px-4 py-3">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#766E63]">{label}</p>
                  <div className="mt-2 h-1.5 w-4/5 rounded-full bg-[#E2DACE]" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={defined ? onContinue : defineMission}
            disabled={!defined && !text.trim()}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D10E63] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#D8D0C2] disabled:text-[#766E63]"
          >
            {defined ? t.continue : t.define}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </div>
  )
}

function DraftField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => setDraft(value), [value])

  function save() {
    setEditing(false)
    if (draft.trim()) onChange(draft.trim())
  }

  return (
    <div className="p-4">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#766E63]">{label}</p>
      {editing ? (
        <textarea
          autoFocus
          rows={2}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={save}
          className="mt-1.5 w-full resize-none rounded-lg border border-[#D10E63]/45 bg-white px-2.5 py-2 text-[12px] leading-relaxed text-[#1C1A17] outline-none focus:ring-3 focus:ring-[#D10E63]/10"
        />
      ) : (
        <button type="button" onClick={() => setEditing(true)} className="group mt-1.5 flex w-full items-start justify-between gap-2 text-left">
          <span className="text-[12px] leading-relaxed text-[#3B362F]">{value}</span>
          <Pencil className="mt-0.5 h-3 w-3 shrink-0 text-[#B00C54] opacity-50 group-hover:opacity-100" />
        </button>
      )}
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
    almaRole: 'Conseillère en transformation IA',
    alma: 'Maintenant que je connais votre entreprise, définissons le premier travail à faire avancer.',
    context: 'Contexte entreprise',
    stepOneDone: 'Étape 1 validée',
    companyFallback: 'Votre entreprise',
    activityFallback: 'Activité à préciser',
    kicker: 'Mission',
    title: 'Votre première mission',
    placeholder: 'Décrivez ce que vous voulez accomplir…',
    talk: 'Dicter la mission',
    stop: 'Arrêter la dictée',
    suggestions: 'Suggestions adaptées à votre activité',
    preview: 'De votre idée à une mission claire',
    rawPlaceholder: 'Votre phrase apparaîtra ici.',
    fTitle: 'Mission',
    fResult: 'Résultat attendu',
    fRule: 'Règle principale',
    fValidation: 'Validation humaine',
    define: 'Définir la mission',
    continue: 'Continuer vers le Collaborateur IA',
  },
  en: {
    almaRole: 'AI transformation advisor',
    alma: 'Now that I know your company, let’s define the first piece of work to move forward.',
    context: 'Company context',
    stepOneDone: 'Step 1 complete',
    companyFallback: 'Your company',
    activityFallback: 'Activity to be specified',
    kicker: 'Mission',
    title: 'Your first mission',
    placeholder: 'Describe what you want to accomplish…',
    talk: 'Dictate the mission',
    stop: 'Stop dictation',
    suggestions: 'Suggestions tailored to your activity',
    preview: 'From your idea to a clear mission',
    rawPlaceholder: 'Your sentence will appear here.',
    fTitle: 'Mission',
    fResult: 'Expected result',
    fRule: 'Main rule',
    fValidation: 'Human approval',
    define: 'Define the mission',
    continue: 'Continue to the AI Collaborator',
  },
} as const

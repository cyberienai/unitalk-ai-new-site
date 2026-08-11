'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, Square } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'

const PRIMARY_CATEGORIES = ['ventes', 'relation-client', 'marketing', 'finance', 'rh'] as const
const SECONDARY_CATEGORIES = ['reunions', 'administration', 'direction', 'documents', 'analyse', 'operations', 'produit'] as const

export function MissionsContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [category, setCategory] = useState('all')
  const [showOthers, setShowOthers] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

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
      setNeed(transcript)
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

  const missions = useMemo(
    () => (category === 'all' ? MISSIONS : MISSIONS.filter((mission) => mission.category === category)),
    [category],
  )

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

  function handToAlma(value: string) {
    const clean = value.trim()
    if (clean) router.push(`/decouvrir?q=${encodeURIComponent(clean)}`)
  }

  function selectOther() {
    setShowOthers((open) => !open)
    if (SECONDARY_CATEGORIES.includes(category as (typeof SECONDARY_CATEGORIES)[number])) setCategory('all')
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] pb-20 pt-20 text-[#1C1A17] sm:pt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance font-sf text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
            {t.title}
          </h1>

          <div className="relative mx-auto mt-6 max-w-2xl">
            <input
              type="text"
              value={need}
              onChange={(event) => setNeed(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.nativeEvent.isComposing) handToAlma(need)
              }}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="h-14 w-full rounded-2xl border border-[#D8D0C2] bg-white pl-5 pr-14 text-left text-[15px] shadow-sm outline-none placeholder:text-[#6E665A] focus:border-[#D10E63]/60 focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={!voiceSupported}
              aria-label={listening ? t.stop : t.talk}
              className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63] text-white transition-colors hover:bg-[#E51872] disabled:opacity-40"
            >
              <span aria-hidden className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
              {listening ? <Square className="relative h-4 w-4" fill="currentColor" /> : <Mic className="relative h-4 w-4" />}
            </button>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="font-sf text-xl font-bold tracking-[-0.02em] sm:text-2xl">{t.readyTitle}</h2>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryButton active={category === 'all'} onClick={() => setCategory('all')}>{t.all}</CategoryButton>
            {PRIMARY_CATEGORIES.map((key) => (
              <CategoryButton key={key} active={category === key} onClick={() => setCategory(key)}>
                {CATEGORY_LABELS[key][lang]}
              </CategoryButton>
            ))}
            <CategoryButton active={showOthers} onClick={selectOther}>{t.others}</CategoryButton>
          </div>

          {showOthers && (
            <div className="mt-2 flex flex-wrap gap-2">
              {SECONDARY_CATEGORIES.map((key) => (
                <CategoryButton key={key} active={category === key} onClick={() => setCategory(key)}>
                  {CATEGORY_LABELS[key][lang]}
                </CategoryButton>
              ))}
            </div>
          )}

          <div className="mt-5 grid auto-rows-fr gap-4 md:grid-cols-2">
            {missions.map((mission) => (
              <StoreCard key={mission.slug} mission={mission} lang={lang} onSelect={(selected) => handToAlma(selected.title[lang])} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function CategoryButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold transition-colors ${
        active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F] hover:border-[#D10E63]/45'
      }`}
    >
      {children}
    </button>
  )
}

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  ventes: { fr: 'Ventes', en: 'Sales' },
  'relation-client': { fr: 'Service client', en: 'Customer service' },
  marketing: { fr: 'Marketing', en: 'Marketing' },
  finance: { fr: 'Finance', en: 'Finance' },
  rh: { fr: 'RH', en: 'HR' },
  reunions: { fr: 'Réunions', en: 'Meetings' },
  administration: { fr: 'Assistanat', en: 'Assistance' },
  direction: { fr: 'Direction', en: 'Leadership' },
  documents: { fr: 'Documents', en: 'Documents' },
  analyse: { fr: 'Analyse', en: 'Analysis' },
  operations: { fr: 'Opérations', en: 'Operations' },
  produit: { fr: 'Produit', en: 'Product' },
}

const COPY = {
  fr: {
    title: 'Dites à Alma ce que votre Collaborateur IA doit accomplir.',
    placeholder: 'Décrivez le travail à faire…',
    talk: 'Dicter le travail à faire',
    stop: 'Arrêter la dictée',
    readyTitle: 'Ou partez d’une mission prête à adapter',
    all: 'Toutes',
    others: 'Autres',
  },
  en: {
    title: 'Tell Alma what your AI Collaborator needs to accomplish.',
    placeholder: 'Describe the work to be done…',
    talk: 'Dictate the work to be done',
    stop: 'Stop dictation',
    readyTitle: 'Or start with a ready-to-adapt mission',
    all: 'All',
    others: 'More',
  },
} as const

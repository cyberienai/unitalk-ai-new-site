'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Mic, Square } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

type SpeechEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean
  onresult: ((event: SpeechEvent) => void) | null
  onend: (() => void) | null; onerror: (() => void) | null
  start: () => void; stop: () => void; abort: () => void
}

function speechRecognition(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null
  const w = window as typeof window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

const COPY = {
  fr: {
    title: 'Votre savoir-faire devrait travailler même quand vous ne travaillez pas.',
    lead: 'Pas un chatbot. Un Collaborateur IA qui accomplit une mission avec vos méthodes, vos outils, vos règles.',
    placeholder: 'Quel travail ne voulez-vous plus faire seul ?',
    voiceLabel: 'Dicter', stopLabel: 'Arrêter',
    cta: 'Confier cette mission',
    free: '7 jours gratuits. Sans CB.',
    thesis: 'Un logiciel vous donne un outil. Unitalk vous donne une capacité de travail.',
    almaNote: 'Alma ne réalise pas la mission. Elle prépare le Collaborateur IA qui va l\'accomplir.',
    almaRole: 'Coordinatrice de missions',
    how: 'Comment ça marche',
  },
  en: {
    title: 'Your know-how should work even when you\'re not working.',
    lead: 'Not a chatbot. An AI Collaborator that performs a mission with your methods, tools and rules.',
    placeholder: 'What work do you no longer want to handle alone?',
    voiceLabel: 'Dictate', stopLabel: 'Stop',
    cta: 'Assign this mission',
    free: '7 days free. No credit card.',
    thesis: 'Software gives you a tool. Unitalk gives you a work capability.',
    almaNote: 'Alma does not perform the mission. She prepares the AI Collaborator that will carry it out.',
    almaRole: 'Mission coordinator',
    how: 'How it works',
  },
} as const

export function PaulGrahamHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const router = useRouter()
  const [need, setNeed] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<Recognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = speechRecognition()
    if (!SpeechRecognition) return
    setVoiceSupported(true)
    const r = new SpeechRecognition()
    r.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    r.continuous = false; r.interimResults = true
    r.onresult = e => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; setNeed(t) }
    r.onend = () => setListening(false); r.onerror = () => setListening(false)
    recognitionRef.current = r
    return () => r.abort()
  }, [lang])

  function toggleListening() {
    const r = recognitionRef.current; if (!r) return
    if (listening) { r.stop(); return }
    setListening(true)
    try { r.start() } catch { setListening(false) }
  }

  function submit() {
    const clean = need.trim(); if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    router.push(`/decouvrir?source=paul-graham&draft=${encodeURIComponent(draftId)}`)
  }

  return (
    <main>
      {/* HERO — 3 lines, 1 input, 1 CTA */}
      <section className="px-5 pb-12 pt-[18vh] sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-balance text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-7 text-[#4E483F]">{t.lead}</p>

          <div className="mx-auto mt-8 max-w-[560px]">
            <div className="relative rounded-[22px] border border-[#D8D0C2] bg-[#FFFDF9] p-2 shadow-[0_22px_60px_-36px_rgba(28,26,23,0.5)] sm:p-2.5">
              <textarea
                value={need}
                onChange={e => setNeed(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit() } }}
                rows={3}
                placeholder={t.placeholder}
                className="w-full resize-none rounded-[16px] bg-[#F3EFE6] px-4 py-3.5 pr-12 text-[15px] leading-6 outline-none placeholder:text-[#A79E8E] focus:ring-2 focus:ring-[#D10E63]/20"
              />
              {voiceSupported && (
                <button type="button" onClick={toggleListening} aria-label={listening ? t.stopLabel : t.voiceLabel} className={`absolute right-4 top-4 flex size-9 items-center justify-center rounded-full transition-colors ${listening ? 'bg-[#D10E63] text-white' : 'bg-white text-[#B00C54] hover:bg-[#FCEBF2]'}`}>
                  {listening ? <Square className="size-3" fill="currentColor" /> : <Mic className="size-3.5" />}
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={submit} disabled={!need.trim()} className="inline-flex w-full min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-8 text-sm font-bold text-white shadow-[0_8px_28px_-12px_rgba(209,14,99,.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_rgba(209,14,99,.7)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 sm:w-auto">
                {t.cta}<ArrowRight className="ml-2 size-4" />
              </button>
              <p className="text-xs font-semibold text-[#857C6E]">{t.free}</p>
            </div>
          </div>
        </div>
      </section>

      {/* THEOREM + ALMA — 2 blocks, no filler */}
      <section className="border-y border-[#D8D0C2] bg-[#FFFDF9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(1.7rem,3.8vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.04em]">{t.thesis}</p>

          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-8 rounded-[24px] border border-[#D8D0C2] bg-[#F3EFE6] p-8 sm:flex-row sm:p-10">
            <Image src="/alma-avatar.png" alt="Alma" width={96} height={96} className="size-[72px] shrink-0 rounded-full object-cover ring-1 ring-[#D8D0C2] sm:size-24" />
            <div className="text-center sm:text-left">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#D10E63]">Alma · {t.almaRole}</p>
              <p className="mt-2 text-lg leading-7 text-[#4E483F]">{t.almaNote}</p>
              <Link href="/decouvrir" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#B00C54] hover:underline">
                {t.how}<ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
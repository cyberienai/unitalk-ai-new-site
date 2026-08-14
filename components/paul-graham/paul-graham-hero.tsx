'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Mic, Square } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

type SpeechEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function speechRecognition(): (new () => Recognition) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => Recognition
    webkitSpeechRecognition?: new () => Recognition
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const STARTERS = {
  fr: ['Relancer mes factures impayées', 'Répondre aux demandes clients', 'Préparer mon CODIR chaque lundi'],
  en: ['Follow up unpaid invoices', 'Answer customer requests', 'Prepare my executive meeting every Monday'],
}

const COPY = {
  fr: {
    founder: 'Une conviction de Patrick Chassany — fondateur d’Amen.fr et cofondateur de Fotolia',
    title: 'Votre savoir-faire devrait travailler même quand vous ne travaillez pas.',
    lead: 'Pas un chatbot. Un Collaborateur IA qui accomplit une mission précise avec vos méthodes, vos outils et vos règles.',
    label: 'Quel travail voulez-vous ne plus faire seul ?',
    placeholder: 'Ex. qualifier les demandes entrantes et préparer la réponse…',
    domain: 'Votre site, facultatif',
    voice: 'Dicter ma demande',
    stop: 'Arrêter la dictée',
    listening: 'Alma vous écoute…',
    cta: 'Confier cette mission',
    proofs: ['7 jours gratuits', 'Sans carte bancaire', 'Vous validez avant toute action sensible', 'Escalade vers un ingénieur IA si nécessaire'],
    examples: 'Ou partez d’un exemple',
    thesis: 'Le logiciel vous donne un outil. Unitalk vous donne une capacité de travail.',
    steps: [
      ['Vous décrivez le résultat.', 'Pas besoin de connaître le bon profil, modèle ou connecteur.'],
      ['Alma prépare la mission.', 'Elle cadre les sources, les règles, les droits et le Collaborateur adapté.'],
      ['Le Collaborateur exécute.', 'Vous suivez le travail. Si Alma ne parvient pas à préparer ou débloquer la mission, elle l’escalade vers un ingénieur IA.'],
    ],
    almaRole: 'Coordinatrice de missions',
    roleNote: 'Alma ne réalise pas la mission. Elle prépare le Collaborateur IA qui va l’accomplir pour votre entreprise et l’escalade vers un ingénieur IA lorsqu’une expertise humaine est nécessaire.',
    why: 'Pourquoi Unitalk',
    pricing: 'Voir les tarifs',
  },
  en: {
    founder: 'A conviction by Patrick Chassany — founder of Amen.fr and co-founder of Fotolia',
    title: 'Your know-how should work even when you are not working.',
    lead: 'Not a chatbot. An AI Collaborator that performs one precise mission using your methods, tools and rules.',
    label: 'What work do you no longer want to handle alone?',
    placeholder: 'E.g. qualify inbound requests and prepare the reply…',
    domain: 'Your website, optional',
    voice: 'Dictate my request',
    stop: 'Stop dictation',
    listening: 'Alma is listening…',
    cta: 'Assign this mission',
    proofs: ['7 days free', 'No credit card', 'You approve every sensitive action', 'Escalation to an AI engineer when needed'],
    examples: 'Or start from an example',
    thesis: 'Software gives you a tool. Unitalk gives you a work capability.',
    steps: [
      ['You describe the outcome.', 'No need to know the right profile, model or connector.'],
      ['Alma prepares the mission.', 'She scopes sources, rules, permissions and the right Collaborator.'],
      ['The Collaborator executes.', 'You follow the work. If Alma cannot prepare or unblock the mission, she escalates it to an AI engineer.'],
    ],
    almaRole: 'Mission coordinator',
    roleNote: 'Alma does not perform the mission. She prepares the AI Collaborator that will carry it out for your company and escalates to an AI engineer when human expertise is needed.',
    why: 'Why Unitalk',
    pricing: 'View pricing',
  },
} as const

export function PaulGrahamHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const router = useRouter()
  const [need, setNeed] = useState('')
  const [domain, setDomain] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<Recognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = speechRecognition()
    if (!SpeechRecognition) return
    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = event => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => recognition.abort()
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

  function submit() {
    const clean = need.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try {
      localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, domain: domain.trim(), createdAt: Date.now() }))
    } catch {}
    const query = new URLSearchParams({ source: 'paul-graham', draft: draftId })
    if (domain.trim()) query.set('domain', domain.trim())
    router.push(`/decouvrir?${query}`)
  }

  return (
    <main>
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mx-auto max-w-xl font-mono text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-[#857C6E]">{t.founder}</p>
          <h1 className="mt-8 text-balance text-[clamp(3rem,7.4vw,6.6rem)] font-semibold leading-[0.91] tracking-[-0.072em]">{t.title}</h1>
          <p className="mx-auto mt-7 max-w-2xl text-[19px] leading-8 text-[#4E483F]">{t.lead}</p>

          <div className="mx-auto mt-10 max-w-2xl rounded-[26px] border border-[#D8D0C2] bg-[#FFFDF9] p-3 text-left shadow-[0_28px_80px_-48px_rgba(28,26,23,0.55)] sm:p-4">
            <label htmlFor="pg-need" className="block px-2 pb-2 text-xs font-bold text-[#625B50]">{t.label}</label>
            <div className="relative">
              <textarea
                id="pg-need"
                value={need}
                onChange={event => setNeed(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault()
                    submit()
                  }
                }}
                rows={3}
                placeholder={listening ? t.listening : t.placeholder}
                className="w-full resize-none rounded-2xl bg-[#F3EFE6] p-4 pr-14 text-[15px] leading-6 outline-none placeholder:text-[#A79E8E] focus:ring-2 focus:ring-[#D10E63]/20"
              />
              {voiceSupported && (
                <button type="button" onClick={toggleListening} aria-label={listening ? t.stop : t.voice} aria-pressed={listening} className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full transition-colors ${listening ? 'bg-[#D10E63] text-white' : 'bg-white text-[#B00C54] hover:bg-[#FCEBF2]'}`}>
                  {listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-4" />}
                </button>
              )}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input value={domain} onChange={event => setDomain(event.target.value)} placeholder={t.domain} className="h-12 rounded-full border border-[#D8D0C2] bg-white px-4 text-sm outline-none focus:border-[#D10E63]" />
              <button type="button" onClick={submit} disabled={!need.trim()} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0">{t.cta}<ArrowRight className="ml-2 size-4" /></button>
            </div>
          </div>

          <p className="mt-5 text-xs font-bold text-[#857C6E]">{t.examples}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">{STARTERS[lang].map(item => <button key={item} type="button" onClick={() => setNeed(item)} className="rounded-full border border-[#D8D0C2] bg-white px-3.5 py-2 text-xs font-semibold text-[#4E483F] transition-colors hover:border-[#D10E63]/50 hover:text-[#B00C54]">{item}</button>)}</div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-[#625B50]">{t.proofs.map(item => <li key={item} className="flex items-center gap-1.5"><Check className="size-3.5 text-[#D10E63]" />{item}</li>)}</ul>
        </div>
      </section>

      {/* FUSION: steps + Alma role — single section */ }
      <section className="border-y border-[#D8D0C2] bg-[#FFFDF9] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[clamp(1.8rem,4vw,3.3rem)] font-semibold leading-[1.08] tracking-[-0.045em]">{t.thesis}</p>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[#D8D0C2] bg-[#D8D0C2] md:grid-cols-3">{t.steps.map(([title, body], index) => <li key={title} className="bg-[#F3EFE6] p-7 sm:p-8"><span className="font-mono text-[10px] font-black text-[#D10E63]">0{index + 1}</span><h2 className="mt-7 text-xl font-bold tracking-[-0.025em]">{title}</h2><p className="mt-3 text-sm leading-7 text-[#625B50]">{body}</p></li>)}</ol>
          {/* Alma role note — inline after steps, no separate section */}
          <div className="mx-auto mt-16 grid max-w-3xl gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <Image src="/alma-avatar.png" alt="Alma" width={140} height={140} className="mx-auto size-28 rounded-full object-cover ring-1 ring-[#D8D0C2] lg:size-32" />
            <div className="text-center lg:text-left">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#D10E63]">Alma · {t.almaRole}</p>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.025em] text-[#1C1A17]">{t.roleNote}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link href="/unitalk/@alma" className="inline-flex min-h-10 items-center rounded-full bg-[#1C1A17] px-5 text-sm font-bold text-white">Alma<ArrowRight className="ml-2 size-4" /></Link>
                <Link href="/collaborateurs-ia/pourquoi-unitalk" className="inline-flex min-h-10 items-center text-sm font-bold text-[#B00C54]">{t.why}</Link>
                <Link href="/tarifs" className="inline-flex min-h-10 items-center text-sm font-bold text-[#4E483F]">{t.pricing}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
